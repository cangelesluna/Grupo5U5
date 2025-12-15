import { useState } from "react";

const habitos = [
  {
    titulo: "🌿 Hábito Verde",
    descripcion: "Te gusta cuidar tu cuerpo poco a poco y mantener equilibrio.",
  },
  {
    titulo: "🔥 Hábito Activo",
    descripcion: "Eres energía pura, siempre buscas moverte y superarte.",
  },
  {
    titulo: "💧 Hábito Salud",
    descripcion: "Priorizas tu bienestar físico y mental todos los días.",
  },
  {
    titulo: "🧠 Hábito Consciente",
    descripcion: "Te enfocas en hábitos sostenibles y autocuidado.",
  },
];

const Juego = ({ onClose }) => {
  const [resultado, setResultado] = useState(null);

  const jugar = () => {
    const random = Math.floor(Math.random() * habitos.length);
    setResultado(habitos[random]);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ❌
        </button>

        <h3 className="text-2xl font-bold text-fuchsia-900 dark:text-pink-400 mb-4">
          🎲 ¿Qué hábito saludable eres?
        </h3>

        {!resultado ? (
          <button
            onClick={jugar}
            className="bg-fuchsia-800 hover:bg-fuchsia-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Jugar
          </button>
        ) : (
          <div className="mt-4">
            <h4 className="text-xl font-bold mb-2">{resultado.titulo}</h4>
            <p className="text-gray-700 dark:text-gray-200">
              {resultado.descripcion}
            </p>

            <button
              onClick={jugar}
              className="mt-4 bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg transition"
            >
              Volver a jugar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Juego;
