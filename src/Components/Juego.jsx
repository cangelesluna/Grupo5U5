import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

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

// Configuración
const DURACION_JUEGO = 2200;
const INTERVALO_PREVIEW = 120;
const INTERVALO_BARRA = 100;

const Juego = ({ onClose, onFinish }) => {
  const [resultado, setResultado] = useState(null);
  const [preview, setPreview] = useState(habitos[0]);
  const [jugando, setJugando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [yaJugo, setYaJugo] = useState(false);

  const intervaloPreview = useRef(null);
  const intervaloBarra = useRef(null);
  const timeoutFinal = useRef(null);

  const limpiarTimers = () => {
    clearInterval(intervaloPreview.current);
    clearInterval(intervaloBarra.current);
    clearTimeout(timeoutFinal.current);
  };

  useEffect(() => {
    return () => limpiarTimers();
  }, []);

  const lanzarConfeti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#d946ef", "#f472b6", "#a855f7"],
    });
  };

  const jugar = () => {
    limpiarTimers();

    setResultado(null);
    setJugando(true);
    setProgreso(0);
    setYaJugo(false);

    intervaloPreview.current = setInterval(() => {
      setPreview(habitos[Math.floor(Math.random() * habitos.length)]);
    }, INTERVALO_PREVIEW);

    intervaloBarra.current = setInterval(() => {
      setProgreso((p) => Math.min(p + 5, 100));
    }, INTERVALO_BARRA);

    timeoutFinal.current = setTimeout(() => {
      limpiarTimers();

      const final = habitos[Math.floor(Math.random() * habitos.length)];

      setResultado(final);
      setPreview(final);
      setJugando(false);
      setYaJugo(true);

      lanzarConfeti();
    }, DURACION_JUEGO);
  };

  const cerrarJuego = () => {
    limpiarTimers();
    onClose();

    // 👉 SOLO muestra valoración si ya jugó
    if (yaJugo) {
      onFinish?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl relative">
        {/* Cerrar */}
        <button
          onClick={cerrarJuego}
          className="absolute top-3 right-3 text-xl hover:scale-110 transition"
        >
          ❌
        </button>

        <h3 className="text-2xl font-bold text-fuchsia-900 dark:text-pink-400 mb-4">
          🎲 ¿Qué hábito saludable eres?
        </h3>

        {/* CARTA */}
        <div
          className={`rounded-xl border p-4 mb-4 transition-all duration-300
            ${jugando ? "animate-pulse scale-105" : "scale-100"}
          `}
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

        {/* BARRA */}
        {jugando && (
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-fuchsia-600 transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
        )}

        {/* BOTÓN */}
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
