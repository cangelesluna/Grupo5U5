import { useState, useEffect, useCallback } from "react";
import colaboradoras from "../data/colaboradoras.json";
import testimonios from "../data/testimonios.json";

import integrante1 from "../assets/integrante1.jpg";
import integrante2 from "../assets/integrante2.png";
import integrante3 from "../assets/integrante3.png";
import integrante4 from "../assets/integrante4.png";

const imagenes = {
  integrante1,
  integrante2,
  integrante3,
  integrante4,
};

function AboutUs() {
  const [index, setIndex] = useState(0);
  const total = testimonios.length;

  /* Auto-play */
  useEffect(() => {
    if (!total) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 4500);
    return () => clearInterval(id);
  }, [total]);

  const siguiente = useCallback(
    () => setIndex((i) => (i + 1) % total),
    [total]
  );

  const anterior = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  return (
    <section className="relative bg-gradient-to-b from-fuchsia-200 via-purple-100 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-20 pb-40 -mb-40 px-6 overflow-hidden">
      {/* Glow decorativo */}
      <div className="hidden md:block absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-fuchsia-400/30 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center space-y-20">
        {/* TÍTULO */}
        <div className="animate-fade-up">
          <h2 className="relative inline-block mb-6">
            <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-600 dark:from-fuchsia-400 dark:via-pink-400 dark:to-purple-400 tracking-tight">
              Sobre Nosotras
            </span>

            <span className="absolute -inset-3 bg-gradient-to-r from-fuchsia-400/30 to-pink-400/30 blur-2xl opacity-60 -z-10" />
          </h2>

          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            En <span className="font-semibold text-fuchsia-800">FitLife</span>,
            creamos un espacio donde el bienestar, la tecnología y la comunidad
            se unen para acompañarte en tu crecimiento personal.
          </p>
        </div>

        {/* HISTORIA */}
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur p-10 rounded-3xl shadow-xl animate-fade-up">
          <h3 className="relative inline-block text-3xl md:text-4xl font-extrabold text-fuchsia-900 dark:text-fuchsia-500 mb-8 tracking-tight">
            <span className="relative z-10">Nuestra Historia</span>
            <span className="absolute left-0 -bottom-2 w-1/3 h-1 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full opacity-80" />
          </h3>

          <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            FitLife nació como un proyecto universitario con una idea clara:
            acompañar a más chicas en el desarrollo de hábitos saludables reales
            y sostenibles.
          </p>

          <p className="text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mt-4 leading-relaxed">
            Hoy somos una comunidad que integra mente, cuerpo y tecnología,
            convencidas de que el bienestar se construye mejor juntas.
          </p>
        </div>

        {/* EQUIPO */}
        <div className="animate-fade-up">
          <h3 className="relative text-4xl md:text-5xl font-black text-fuchsia-900 dark:text-fuchsia-500 mb-14">
            Nuestro Equipo
            <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {colaboradoras.map((c) => (
              <div
                key={c.name}
                className="group bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <img
                  src={imagenes[c.img]}
                  alt={c.name}
                  className="w-44 h-44 mx-auto rounded-full object-cover mb-4 ring-4 ring-fuchsia-300 group-hover:ring-fuchsia-500 transition-all"
                />

                <h4 className="text-lg font-bold text-fuchsia-800 dark:text-white">
                  {c.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {c.role}
                </p>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIOS */}
        <div className="animate-fade-up pt-10">
          <h3 className="relative inline-block text-3xl md:text-4xl font-extrabold text-fuchsia-900 dark:text-fuchsia-500 mb-1 md:mb-40 tracking-tight">
            <span className="relative z-10">Lo que dicen de FitLife</span>
            <span className="absolute left-0 -bottom-3 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-pulse" />
          </h3>

          <div className="relative flex justify-center items-center perspective-[1200px] h-[380px]">
            {testimonios.map((t, i) => {
              const offset = i - index;
              if (Math.abs(offset) > 2) return null;

              return (
                <div
                  key={t.nombre}
                  className="absolute transition-all duration-700 ease-out transform-gpu"
                  style={{
                    transform: `
                      translateX(${offset * 260}px)
                      scale(${offset === 0 ? 1 : 0.85})
                      rotateY(${offset * -25}deg)
                    `,
                    opacity: offset === 0 ? 1 : 0.5,
                    zIndex: 10 - Math.abs(offset),
                  }}
                >
                  <div className="group w-[300px] sm:w-[340px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center transition-all duration-500 hover:scale-105 hover:-translate-y-3 -mt-40">
                    <img
                      src={t.imagen}
                      alt={t.nombre}
                      className="w-24 h-24 mx-auto rounded-full object-cover mb-4 ring-4 ring-fuchsia-300 group-hover:ring-fuchsia-500 transition-all"
                    />

                    <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                      “{t.texto}”
                    </p>

                    <h4 className="font-semibold text-fuchsia-800 dark:text-gray-200">
                      {t.nombre}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INDICADORES */}
          <div className="flex justify-center mt-0 gap-2">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index ? "bg-fuchsia-700 scale-125" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
