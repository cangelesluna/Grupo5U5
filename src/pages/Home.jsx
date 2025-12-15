import { useState } from "react";
import Calculadora from "../components/Calculadora.jsx";
import Contenedores from "../components/Contenedores.jsx";
import Planes from "../components/Planes.jsx";
import Portada from "../components/Portada.jsx";
import Valoracion from "../components/Valoracion.jsx";
import Juego from "../components/Juego.jsx";

function Home() {
  const [mostrarJuego, setMostrarJuego] = useState(false);
  const [mostrarValoracion, setMostrarValoracion] = useState(false);

  return (
    <div>
      <Portada />

      <Contenedores />
      <Calculadora />
      <Planes />

      {/* BOTÓN DEL JUEGO */}
      <div className="flex justify-center mt-0 -mb-10">
        <button
          onClick={() => setMostrarJuego(true)}
          className="
            relative overflow-hidden
            bg-gradient-to-r from-fuchsia-700 to-pink-600
            dark:from-fuchsia-600 dark:to-pink-500
            text-white
            px-7 py-4
            rounded-2xl
            font-semibold
            shadow-xl dark:shadow-fuchsia-900/40
            transition-all duration-300
            hover:scale-110 hover:shadow-2xl
            animate-[pulse_2.5s_ease-in-out_infinite]
          "
        >
          <span
            className="
              absolute inset-0
              bg-gradient-to-r from-white/20 via-white/10 to-transparent
              opacity-0 hover:opacity-100
              transition-opacity duration-500
            "
          />

          <span className="relative z-10 flex items-center gap-2">
            🎮
            <span>Juega y descubre tu hábito saludable</span>
          </span>
        </button>
      </div>

      {/* JUEGO */}
      {mostrarJuego && (
        <Juego
          onClose={() => setMostrarJuego(false)}
          onFinish={() => setMostrarValoracion(true)}
        />
      )}

      {/* VALORACIÓN (solo después del juego) */}
      {mostrarValoracion && (
        <Valoracion onClose={() => setMostrarValoracion(false)} />
      )}
    </div>
  );
}

export default Home;
