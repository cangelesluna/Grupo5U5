import React, { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function PlanEditor({ plan = null }) {
  const navigate = useNavigate();

  const [data, setData] = useState(
    plan || {
      titulo: "",
      descripcion: "",
      tipo: "entrenamiento",
      nivel: "Principiante",
      duracion: "",
      precio: "",
      categoria: "",
      modalidad: "online",
      imagen: "",
      color: "bg-gray-100",
      caracteristicas: [], // nuevo campo
    }
  );

  const [caracteristicaInput, setCaracteristicaInput] = useState("");
  const [loading, setLoading] = useState(false);

  // actualizar campos normales
  const handleChange = (key) => (e) =>
    setData({ ...data, [key]: e.target.value });

  // agregar característica al array
  const agregarCaracteristica = () => {
    if (!caracteristicaInput.trim()) return;
    setData({
      ...data,
      caracteristicas: [...data.caracteristicas, caracteristicaInput.trim()],
    });
    setCaracteristicaInput("");
  };

  // eliminar característica
  const eliminarCaracteristica = (i) => {
    const lista = data.caracteristicas.filter((_, index) => index !== i);
    setData({ ...data, caracteristicas: lista });
  };

  // guardar en Firestore
  const handleSave = async () => {
    setLoading(true);
    try {
      if (plan && plan.id) {
        await setDoc(doc(db, "plans", plan.id), data);
      } else {
        await addDoc(collection(db, "plans"), data);
      }
      navigate("/admin/planes");
    } catch (error) {
      console.error("Error guardando plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {plan ? "Editar Plan" : "Crear Plan"}
        </h2>

        {/* TITULO */}
        <input
          className="border w-full p-2 mb-2"
          placeholder="Título del plan"
          value={data.titulo}
          onChange={handleChange("titulo")}
        />

        {/* TIPO */}
        <select
          className="border w-full p-2 mb-2"
          value={data.tipo}
          onChange={handleChange("tipo")}
        >
          <option value="entrenamiento">Entrenamiento</option>
          <option value="dieta">Dieta</option>
          <option value="mixto">Mixto</option>
        </select>

        {/* DESCRIPCION */}
        <textarea
          className="border w-full p-2 mb-2"
          placeholder="Descripción"
          value={data.descripcion}
          onChange={handleChange("descripcion")}
        />

        {/* NIVEL */}
        <select
          className="border w-full p-2 mb-2"
          value={data.nivel}
          onChange={handleChange("nivel")}
        >
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>

        {/* DURACION */}
        <input
          className="border w-full p-2 mb-2"
          placeholder="Duración (ej: 10 semanas)"
          value={data.duracion}
          onChange={handleChange("duracion")}
        />

        {/* PRECIO */}
        <input
          className="border w-full p-2 mb-2"
          placeholder="Precio (ej: 49.90)"
          value={data.precio}
          onChange={handleChange("precio")}
        />

        {/* CATEGORIA */}
        <input
          className="border w-full p-2 mb-2"
          placeholder="Categoría"
          value={data.categoria}
          onChange={handleChange("categoria")}
        />

        {/* MODALIDAD */}
        <select
          className="border w-full p-2 mb-2"
          value={data.modalidad}
          onChange={handleChange("modalidad")}
        >
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
        </select>

        {/* IMAGEN */}
        <input
          className="border w-full p-2 mb-2"
          placeholder="URL de la imagen"
          value={data.imagen}
          onChange={handleChange("imagen")}
        />

        {/* CARACTERISTICAS */}
        <div className="border rounded p-3 mb-3">
          <p className="font-semibold mb-2">Características</p>

          {/* Lista de características */}
          {data.caracteristicas.map((c, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gray-100 p-2 rounded mb-1"
            >
              <span>{c}</span>
              <button
                onClick={() => eliminarCaracteristica(idx)}
                className="text-red-500 font-bold"
              >
                ✖
              </button>
            </div>
          ))}

          {/* Input para añadir */}
          <div className="flex gap-2 mt-2">
            <input
              className="border flex-1 p-2"
              placeholder="Agregar característica"
              value={caracteristicaInput}
              onChange={(e) => setCaracteristicaInput(e.target.value)}
            />
            <button
              onClick={agregarCaracteristica}
              className="bg-blue-500 text-white px-3 rounded"
            >
              ➕
            </button>
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => navigate("/admin/planes")}
            className="border px-4 py-2 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-pink-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
