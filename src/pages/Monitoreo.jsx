
// src/pages/Monitoreo.jsx
import React, { useEffect, useState } from "react";
import { listenMonitoreo, addMonitoreo, deleteMonitoreo } from "../lib/service";
import { Timestamp } from "firebase/firestore";

export default function Monitoreo() {
  const [actividades, setActividades] = useState([]);
  const [actividad, setActividad] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    const unsub = listenMonitoreo(
      (arr) => {
        setActividades(arr);
        setLoading(false);
      },
      (err) => {
        setErrorMsg("Error leyendo datos: " + (err?.message || err));
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const handleAgregar = async () => {
    if (!actividad.trim() || !usuario.trim()) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await addMonitoreo({ actividad: actividad.trim(), usuario: usuario.trim() });
      setActividad("");
      setUsuario("");
      // no hace falta recargar: onSnapshot traerá el nuevo doc
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar: " + (err?.message || err));
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este registro?")) return;
    try {
      await deleteMonitoreo(id);
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar: " + (err?.message || err));
    }
  };

  const formatFecha = (f) => {
    if (!f) return "-";
    // Timestamp -> Date
    if (f instanceof Timestamp || (f?.seconds && f?.nanoseconds)) {
      try {
        return f.toDate().toLocaleString();
      } catch {
        return "-";
      }
    }
    if (typeof f === "string") return f;
    if (f instanceof Date) return f.toLocaleString();
    return "-";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Monitoreo</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Agregar Actividad</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Actividad"
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <button
            onClick={handleAgregar}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Agregar
          </button>
        </div>

        {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Historial</h2>

        {loading ? (
          <p className="p-4">Cargando...</p>
        ) : actividades.length === 0 ? (
          <p className="p-4 text-gray-500">No hay actividades registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Actividad</th>
                  <th className="p-2">Usuario</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actividades.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.actividad}</td>
                    <td className="p-2">{item.usuario}</td>
                    <td className="p-2">{formatFecha(item.fecha)}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEliminar(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
