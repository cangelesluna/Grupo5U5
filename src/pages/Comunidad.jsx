
import { useState, useEffect } from "react";

export default function Comunidad() {
  const [announcement, setAnnouncement] = useState("");
  const [files, setFiles] = useState([]);
  const [posts, setPosts] = useState([]);

  // 🔹 Cargar historial desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fitlife-community")) || [];
    setPosts(saved);
  }, []);

  // 🔹 Guardar historial
  const savePosts = (updated) => {
    localStorage.setItem("fitlife-community", JSON.stringify(updated));
    setPosts(updated);
  };

  // 🔹 Manejar archivos
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // 🔹 Publicar
  const publish = () => {
    if (!announcement.trim() && files.length === 0) {
      alert("Escribe un anuncio o adjunta un archivo.");
      return;
    }

    const newPost = {
      id: Date.now(),
      text: announcement,
      media: files.map((file) => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      })),
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    setAnnouncement("");
    setFiles([]);
    document.getElementById("fileInput").value = "";
  };

  // 🔹 ELIMINAR PUBLICACIÓN
  const deletePost = (id) => {
    const updated = posts.filter((post) => post.id !== id);
    savePosts(updated);
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
          <label className="block font-semibold mb-2">Seleccionar archivos</label>

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
              <p className="font-semibold">{post.date}</p>
              <p className="mb-3">{post.text}</p>

              {/* Media */}
              {post.media.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  {post.media.map((m, index) => (
                    <div
                      key={index}
                      className="rounded overflow-hidden border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    >
                      {m.type.startsWith("image/") ? (
                        <img src={m.url} alt="" className="h-32 w-full object-cover" />
                      ) : (
                        <video src={m.url} controls className="h-32 w-full" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/*  BOTÓN ELIMINAR */}
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
