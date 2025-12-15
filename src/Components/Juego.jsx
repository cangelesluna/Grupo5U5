import { useEffect, useState } from "react";

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
  const [preview, setPreview] = useState(habitos[0]);
  const [jugando, setJugando] = useState(false);
  const [progreso, setProgreso] = useState(0);

  const jugar = () => {
    setResultado(null);
    setJugando(true);
    setProgreso(0);

    let ticks = 0;

    const intervalo = setInterval(() => {
      setPreview(habitos[Math.floor(Math.random() * habitos.length)]);
      ticks++;
    }, 120);

    const barra = setInterval(() => {
      setProgreso((p) => Math.min(p + 5, 100));
    }, 100);

    setTimeout(() => {
      clearInterval(intervalo);
      clearInterval(barra);

      const final = habitos[Math.floor(Math.random() * habitos.length)];
      setResultado(final);
      setJugando(false);
      setPreview(final);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative">
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl hover:scale-110 transition"
        >
          ❌
        </button>

        <h3 className="text-2xl font-bold text-fuchsia-900 dark:text-pink-400 mb-4">
          🎲 ¿Qué hábito saludable eres?
        </h3>

        {/* CARTA CENTRAL */}
        <div
          className={`rounded-xl border p-4 mb-4 transition-all duration-300
          ${jugando ? "animate-pulse scale-105" : "scale-100"}`}
        >
          <h4 className="text-xl font-bold mb-2">{preview.titulo}</h4>

          <p className="text-gray-600 dark:text-gray-300">
            {resultado
              ? resultado.descripcion
              : jugando
              ? "Analizando tu energía saludable..."
              : "Presiona jugar para descubrirlo"}
          </p>
        </div>

        {/* BARRA DE PROGRESO */}
        {jugando && (
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-fuchsia-600 transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
        )}

        {/* BOTONES */}
        {!jugando && (
          <button
            onClick={jugar}
            className="bg-fuchsia-800 hover:bg-fuchsia-600 text-white px-6 py-2 rounded-lg font-semibold transition hover:scale-105"
          >
            {resultado ? "Volver a jugar" : "Jugar"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Juego;
