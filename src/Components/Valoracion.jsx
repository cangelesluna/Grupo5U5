import { useState, useEffect } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

const Valoracion = () => {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [votado, setVotado] = useState(false);

  useEffect(() => {
    const yaValoro = localStorage.getItem("valoracion_enviada");
    if (!yaValoro) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const emojis = [
    { icono: "😍", texto: "Excelente" },
    { icono: "😀", texto: "Buena" },
    { icono: "😐", texto: "Regular" },
    { icono: "😞", texto: "Mala" },
  ];

  const manejarClick = async (valor) => {
    if (votado) return;

    try {
      await addDoc(collection(db, "valoraciones"), {
        experiencia: valor,
        fecha: Timestamp.now(),
      });

      localStorage.setItem("valoracion_enviada", "true");
      setMensaje("¡Gracias por valorar tu experiencia! 💚");
      setVotado(true);

      setTimeout(() => {
        setVisible(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setMensaje("Ocurrió un error 😔");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl">
        <button
          onClick={() => {
            localStorage.setItem("valoracion_enviada", "true");
            setVisible(false);
          }}
          className="absolute top-4 right-4 text-xl"
        >
          ❌
        </button>

        <h3 className="text-2xl font-bold text-fuchsia-900 dark:text-pink-400 mb-4">
          ¿Cómo fue tu experiencia en FitLife?
        </h3>

        <div className="flex justify-center gap-4 text-4xl mb-4">
          {emojis.map((item, index) => (
            <button
              key={index}
              onClick={() => manejarClick(item.texto)}
              disabled={votado}
              className="hover:scale-125 transition transform disabled:opacity-50"
            >
              {item.icono}
            </button>
          ))}
        </div>

        {mensaje && (
          <p className="text-green-600 dark:text-green-400 font-semibold">
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default Valoracion;