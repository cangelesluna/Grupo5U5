import { useState } from "react";
import Calculadora from "../components/Calculadora.jsx";
import Contenedores from "../components/Contenedores.jsx";
import Planes from "../components/Planes.jsx";
import Portada from "../components/Portada.jsx";
import Valoracion from "../Components/Valoracion.jsx";
import Juego from "../Components/Juego.jsx";

function Home() {
  const [mostrarJuego, setMostrarJuego] = useState(false);

  return (
     <div>
      <Valoracion />
      <Portada />
      <div>
        <Contenedores />
      </div>
      <div>
        <Calculadora />
      </div>
      <div>
        <Planes />
      </div>
      {/* BOTÓN DEL JUEGO */}
      <div className="flex justify-center mt-0">
        <button
          onClick={() => setMostrarJuego(true)}
          className="bg-fuchsia-700 hover:bg-fuchsia-600 text-white px-6 py-4 rounded-xl shadow-lg transition"
        >
          🎮 Juega y descubre tu hábito saludable
        </button>
      </div>

      {mostrarJuego && (
        <Juego onClose={() => setMostrarJuego(false)} />
      )}
    </div>
  );
}

export default Home;
