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
    duracion: "",
    imagen: "",
  });

  const esEdicion = Boolean(id);

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

  async function guardarCambios(e) {
    e.preventDefault();

    if (esEdicion) {
      // ⭐ ACTUALIZA
      await updateDoc(doc(db, "plans", id), plan);
      alert("Plan actualizado correctamente");
    } else {
      // ⭐ CREA NUEVO
      const ref = doc(collection(db, "plans")); // YA FUNCIONA
      await setDoc(ref, plan);
      alert("Plan agregado correctamente");
    }

    navigate("/admin/planes");
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{esEdicion ? "Editar plan" : "Crear plan"}</h1>

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

        <input
          className="border p-2 w-full"
          placeholder="Duración"
          value={plan.duracion}
          onChange={(e) => setPlan({ ...plan, duracion: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="URL de imagen"
          value={plan.imagen}
          onChange={(e) => setPlan({ ...plan, imagen: e.target.value })}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {esEdicion ? "Guardar cambios" : "Crear plan"}
        </button>
      </form>
    </div>
  );
}
