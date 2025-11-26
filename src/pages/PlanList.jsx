import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ========================================================
  // 🔹 Cargar todos los planes
  // ========================================================
  useEffect(() => {
    async function loadPlans() {
      try {
        const colRef = collection(db, "plans");
        const snap = await getDocs(colRef);

        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setPlans(data);
      } catch (err) {
        console.error("Error cargando planes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  // ========================================================
  // 🔹 Navegación
  // ========================================================
  const handleCrearPlan = () => navigate("/admin/crear-plan");
  const handleEditarPlan = (id) => navigate(`/admin/editar-plan/${id}`);

  // ========================================================
  // 🔹 Eliminar plan
  // ========================================================
  const handleEliminarPlan = async (id) => {
    const confirmacion = window.confirm(
      "¿Seguro que quieres eliminar este plan?"
    );
    if (!confirmacion) return;

    await deleteDoc(doc(db, "plans", id));
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  // ========================================================
  // 🔹 Fallback para imágenes
  // ========================================================
  const validarImagen = (url) => {
    if (!url || typeof url !== "string") return false;
    if (url.trim() === "") return false;
    return true;
  };

  return (
    <div className="text-gray-900 dark:text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          📌 Planes de entrenamiento y dieta
        </h2>
        <button
          onClick={handleCrearPlan}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          ➕ Agregar Plan
        </button>
      </div>

      {/* Contenido */}
      {loading ? (
        <div>Cargando planes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900 hover:shadow-lg dark:hover:shadow-gray-700 transition overflow-hidden"
            >
              {/* 🔹 Imagen */}
              <div className="h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={
                    validarImagen(p.imagen)
                      ? p.imagen
                      : "https://via.placeholder.com/400x200?text=Sin+Imagen"
                  }
                  alt={p.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x200?text=Sin+Imagen";
                  }}
                />
              </div>

              {/* 🔹 Contenido */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  {p.titulo}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {p.descripcion}
                </p>

                {/* Etiquetas */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.tipo && (
                    <span className="text-xs bg-pink-100 dark:bg-pink-700 text-pink-600 dark:text-white px-2 py-1 rounded-full">
                      {p.tipo}
                    </span>
                  )}
                  {p.nivel && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white px-2 py-1 rounded-full">
                      {p.nivel}
                    </span>
                  )}
                  {p.duracion && (
                    <span className="text-xs bg-green-100 dark:bg-green-700 text-green-600 dark:text-white px-2 py-1 rounded-full">
                      {p.duracion}
                    </span>
                  )}
                  {p.dieta && (
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-white px-2 py-1 rounded-full">
                      {p.dieta}
                    </span>
                  )}
                </div>

                {/* Botones */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditarPlan(p.id)}
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleEliminarPlan(p.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
