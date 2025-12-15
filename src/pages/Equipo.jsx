import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Equipo() {
  const [equipo, setEquipo] = useState([]);
  const [editData, setEditData] = useState(null);
  const [nuevo, setNuevo] = useState(false);

  const [dataForm, setDataForm] = useState({
    nombre: "",
    rol: "",
    desc: "",
    img: "",
  });

  const cargarEquipo = async () => {
    const data = await getDocs(collection(db, "equipo"));
    setEquipo(data.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    cargarEquipo();
  }, []);

  const guardarCambios = async () => {
    if (!editData) return;

    const ref = doc(db, "equipo", editData.id);

    const dataLimpia = {
      nombre: editData.nombre ?? "",
      rol: editData.rol ?? "",
      desc: editData.desc ?? "",
      img: editData.img ?? "",
    };

    await updateDoc(ref, dataLimpia);

    alert("Perfil actualizado ✨");
    setEditData(null);
    cargarEquipo();
  };

  const agregarPerfil = async () => {
    if (!dataForm.nombre || !dataForm.rol || !dataForm.img) {
      alert("Completa nombre, rol e imagen");
      return;
    }

    await addDoc(collection(db, "equipo"), dataForm);

    alert("Nuevo perfil añadido 🎉");

    setNuevo(false);
    setDataForm({
      nombre: "",
      rol: "",
      desc: "",
      img: "",
    });

    cargarEquipo();
  };

  const eliminarPerfil = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este perfil?")) return;

    await deleteDoc(doc(db, "equipo", id));

    alert("Perfil eliminado ❌");
    cargarEquipo();
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          👥 Equipo FitLife
        </h1>

        <button
          onClick={() => setNuevo(true)}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl hover:bg-pink-600 transition"
        >
          ➕ Añadir Perfil
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipo.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
          >
            <img
              src={p.img}
              alt={p.nombre}
              className="w-24 h-24 rounded-full mb-4 border-4 border-pink-300 object-cover bg-gray-100 dark:bg-gray-700"
            />

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {p.nombre}
            </h2>

            <p className="text-pink-600 font-medium">{p.rol}</p>

            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              {p.desc}
            </p>

            <div className="flex gap-3 w-full mt-4">
              <button
                className="w-1/2 bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition"
                onClick={() =>
                  setEditData({
                    id: p.id,
                    nombre: p.nombre ?? "",
                    rol: p.rol ?? "",
                    desc: p.desc ?? "",
                    img: p.img ?? "",
                  })
                }
              >
                Editar
              </button>

              <button
                className="w-1/2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                onClick={() => eliminarPerfil(p.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDITAR */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Editar Perfil
            </h3>

            {["nombre", "rol", "img"].map((field) => (
              <input
                key={field}
                type="text"
                value={editData[field]}
                onChange={(e) =>
                  setEditData({ ...editData, [field]: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={field.toUpperCase()}
              />
            ))}

            <textarea
              value={editData.desc}
              onChange={(e) =>
                setEditData({ ...editData, desc: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Descripción"
            ></textarea>

            <div className="flex gap-4 mt-4">
              <button
                className="w-1/2 bg-gray-300 dark:bg-gray-600 dark:text-white py-2 rounded-lg"
                onClick={() => setEditData(null)}
              >
                Cancelar
              </button>

              <button
                className="w-1/2 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                onClick={guardarCambios}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVO */}
      {nuevo && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Añadir Nuevo Perfil
            </h3>

            {["nombre", "rol", "img"].map((field) => (
              <input
                key={field}
                type="text"
                value={dataForm[field]}
                onChange={(e) =>
                  setDataForm({ ...dataForm, [field]: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={field.toUpperCase()}
              />
            ))}

            <textarea
              value={dataForm.desc}
              onChange={(e) =>
                setDataForm({ ...dataForm, desc: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Descripción"
            ></textarea>

            <div className="flex gap-4 mt-4">
              <button
                className="w-1/2 bg-gray-300 dark:bg-gray-600 dark:text-white py-2 rounded-lg"
                onClick={() => setNuevo(false)}
              >
                Cancelar
              </button>

              <button
                className="w-1/2 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
                onClick={agregarPerfil}
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
