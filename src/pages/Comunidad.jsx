import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Comunidad() {
  const [announcement, setAnnouncement] = useState("");
  const [files, setFiles] = useState([]);
  const [posts, setPosts] = useState([]);

  // 🔹 Cargar publicaciones desde Firestore
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "post"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setPosts(data);
    } catch (error) {
      console.error("Error cargando publicaciones:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🔹 Manejar archivos (solo preview por ahora)
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // 🔹 Función para subir archivos a Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TU_UPLOAD_PRESET"); // <- tu preset
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url; // URL pública
  };

  // 🔹 Publicar comunicado
  const publish = async () => {
    if (!announcement.trim() && files.length === 0) {
      alert("Escribe un anuncio o adjunta un archivo.");
      return;
    }

    try {
      // Subir archivos y obtener URLs
      const mediaUrls = [];
      for (const file of files) {
        const url = await uploadToCloudinary(file);
        mediaUrls.push(url);
      }

      // Guardar post en Firestore
      await addDoc(collection(db, "post"), {
        authorName: "FitLife",
        text: announcement,
        media: mediaUrls,
        visible: true,
        createdAt: serverTimestamp(),
      });

      setAnnouncement("");
      setFiles([]);
      document.getElementById("fileInput").value = "";

      fetchPosts();
    } catch (error) {
      console.error("Error publicando:", error);
    }
  };

  // 🔹 Eliminar publicación
  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, "post", id));
      fetchPosts();
    } catch (error) {
      console.error("Error eliminando publicación:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Comunidad</h2>
      <p className="text-gray-600 mb-6">
        Gestiona anuncios, fotos, videos y publicaciones para los usuarios.
      </p>

      {/* PUBLICAR */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-6 rounded-lg shadow mb-10">
        <h3 className="text-xl font-semibold mb-3">Publicar anuncio</h3>

        <textarea
          className="w-full border dark:border-gray-700 dark:bg-gray-800 p-3 rounded mb-4"
          rows="3"
          placeholder="Escribe un anuncio para la comunidad..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        />

        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Seleccionar archivos
          </label>

          <input
            id="fileInput"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 dark:text-gray-300"
          />

          {/* Previsualización */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-2 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-32 rounded"
                      controls
                    />
                  )}
                  <p className="text-xs mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={publish}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded transition"
        >
          Publicar
        </button>
      </div>

      {/* PUBLICACIONES */}
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Publicaciones recientes</h3>

        {posts.length === 0 ? (
          <p className="text-gray-500">No hay publicaciones aún.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="mb-6 border-b pb-4 dark:border-gray-700"
            >
              <p className="text-sm text-gray-500 mb-1">
                {post.authorName} ·{" "}
                {post.createdAt?.toDate().toLocaleDateString()}
              </p>

              <p className="mb-3">{post.text}</p>

              {/* Renderizar media */}
              {post.media?.map((url, idx) =>
                url.endsWith(".mp4") ? (
                  <video
                    key={idx}
                    src={url}
                    controls
                    className="w-full h-32 rounded mb-2"
                  />
                ) : (
                  <img
                    key={idx}
                    src={url}
                    alt=""
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )
              )}

              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
