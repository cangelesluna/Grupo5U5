import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, setDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function EditarPlan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [plan, setPlan] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
    nivel: "",
    dieta: "", // ⭐ AGREGADO
    duracion: "",
    imagen: "",
  });

  const esEdicion = Boolean(id);

  // ========================================================
  // 🔹 Cargar dato del plan si es edición
  // ========================================================
  useEffect(() => {
    if (!esEdicion) {
      setLoading(false);
      return;
    }

    async function cargarPlan() {
      const ref = doc(db, "plans", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPlan(snap.data());
      }

      setLoading(false);
    }

    cargarPlan();
  }, [id, esEdicion]);

  // ========================================================
  // 🔹 Subir imagen a Cloudinary (NO Firebase Storage)
  // ========================================================
  const uploadImageCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "planes_unsigned");
    data.append("cloud_name", "dxjihoxka");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxjihoxka/image/upload",
      { method: "POST", body: data }
    );

    const json = await res.json();
    return json.secure_url;
  };

  // ========================================================
  // 🔹 Manejar cambio de archivo → subir a Cloudinary
  // ========================================================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = await uploadImageCloudinary(file);

    setPlan((prev) => ({ ...prev, imagen: imageUrl }));
  };

  // ========================================================
  // 🔹 Guardar plan en Firestore
  // ========================================================
  async function guardarCambios(e) {
    e.preventDefault();

    if (esEdicion) {
      await updateDoc(doc(db, "plans", id), plan);
      alert("Plan actualizado correctamente");
    } else {
      const ref = doc(collection(db, "plans"));
      await setDoc(ref, plan);
      alert("Plan agregado correctamente");
    }

    navigate("/admin/planes");
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {esEdicion ? "Editar plan" : "Crear plan"}
      </h1>

      <form onSubmit={guardarCambios} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Título"
          value={plan.titulo}
          onChange={(e) => setPlan({ ...plan, titulo: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Descripción"
          value={plan.descripcion}
          onChange={(e) => setPlan({ ...plan, descripcion: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Tipo"
          value={plan.tipo}
          onChange={(e) => setPlan({ ...plan, tipo: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Nivel"
          value={plan.nivel}
          onChange={(e) => setPlan({ ...plan, nivel: e.target.value })}
        />

        {/* ⭐ NUEVO CAMPO DIETA */}
        <input
          className="border p-2 w-full"
          placeholder="Dieta (solo si es un plan de comida)"
          value={plan.dieta}
          onChange={(e) => setPlan({ ...plan, dieta: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Duración"
          value={plan.duracion}
          onChange={(e) => setPlan({ ...plan, duracion: e.target.value })}
        />

        {/* ⭐ Subir imagen a Cloudinary */}
        <div>
          <label className="block mb-1 font-semibold">Imagen</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full"
            onChange={handleFileChange}
          />
        </div>

        {/* Mostrar la URL */}
        <input
          className="border p-2 w-full"
          placeholder="URL de imagen"
          value={plan.imagen}
          onChange={(e) => setPlan({ ...plan, imagen: e.target.value })}
        />

        {/* Preview de imagen */}
        {plan.imagen && (
          <img
            src={plan.imagen}
            alt="preview"
            className="w-32 h-32 object-cover rounded border"
          />
        )}

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {esEdicion ? "Guardar cambios" : "Crear plan"}
        </button>
      </form>
    </div>
  );
}
