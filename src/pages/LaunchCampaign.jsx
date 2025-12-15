import React, { useEffect, useState, useRef } from "react";
import PROMO1 from "../assets/PROMO1.mp4";
import PROMO2 from "../assets/PROMO2.mp4";
import PROMO3 from "../assets/PROMO3.mp4";
import promo7 from "../assets/promo7.mp4";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import PROMOCIONAL2 from "../assets/PROMOCIONAL2.png";

// =======================================================
// VIDEO CARD (ESTILO iTUNES) — OPTIMIZADO
// =======================================================
const PromoVideo = ({ src, title, text, active }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <div
      className={`transition-all duration-500 ease-out flex-shrink-0
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-60 blur-[1px]"}
      `}
    >
      <div className="relative w-[260px] sm:w-[320px] md:w-[360px]">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl"
        />

        <div className="absolute bottom-3 left-3 right-3 bg-black/50 dark:bg-zinc-900/70 backdrop-blur-md text-white p-3 rounded-2xl">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm opacity-90">{text}</p>
        </div>
      </div>
    </div>
  );
};

// =======================================================
// LANZAMIENTO FITLIFE
// =======================================================
const LaunchCampaign = () => {
  const [showPromo, setShowPromo] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const ticking = useRef(false);

  const videos = [
    {
      src: video1,
      title: "Entrenamiento guiado",
      text: "Videos claros y fáciles de seguir.",
    },
    {
      src: PROMO1,
      title: "Rutinas accesibles",
      text: "Entrena desde casa, sin equipos.",
    },
    {
      src: PROMO2,
      title: "Hábitos saludables",
      text: "Pequeños cambios que sí se mantienen.",
    },
    {
      src: PROMO3,
      title: "Bienestar constante",
      text: "Motivación diaria para tu estilo de vida.",
    },
    {
      src: video2,
      title: "Progreso real",
      text: "Avanza a tu ritmo, sin presión.",
    },
  ];

  useEffect(() => {
    setShowPromo(true);
  }, []);

  const handleScroll = () => {
    if (!containerRef.current || ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const container = containerRef.current;
      const firstCard = container.firstChild;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 40;
      const index = Math.round(container.scrollLeft / cardWidth);

      setActiveIndex(index % videos.length);
      ticking.current = false;
    });
  };

  return (
    <>
      {/* POPUP PROMOCIONAL */}
      {showPromo && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-[90%] max-w-[420px] overflow-hidden">
            <button
              onClick={() => setShowPromo(false)}
              className="absolute top-3 right-3 bg-fuchsia-600 text-white w-9 h-9 rounded-full text-lg flex items-center justify-center"
            >
              ✕
            </button>

            <img
              src={PROMOCIONAL2}
              alt="Lanzamiento FitLife"
              className="w-full cursor-pointer"
              onClick={() =>
                document
                  .getElementById("promociones")
                  .scrollIntoView({ behavior: "smooth" })
              }
            />

            <p className="text-center py-4 text-lg font-bold text-fuchsia-800 dark:text-fuchsia-400">
              🎉 Lanzamiento oficial FitLife
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative w-full bg-gradient-to-br from-pink-200 via-fuchsia-200 to-purple-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[720px]">
          <div className="px-6 py-12 md:px-14 md:py-16 flex flex-col justify-center">
            <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold text-white bg-fuchsia-600 rounded-full">
              NUEVO · LANZAMIENTO
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-fuchsia-900 dark:text-fuchsia-400">
              🚀 FitLife ya está aquí
            </h1>

            <p className="mt-4 text-lg font-medium text-fuchsia-900 dark:text-zinc-300 max-w-xl">
              Bienestar real para personas reales. Sin dietas extremas, sin
              rutinas imposibles y sin presión.
            </p>

            <div className="mt-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-5 rounded-2xl text-sm text-gray-800 dark:text-zinc-300 max-w-xl shadow-sm leading-relaxed">
              <p className="font-semibold text-fuchsia-800 dark:text-fuchsia-400 mb-2">
                Empieza a cuidarte sin cambiar tu vida por completo.
              </p>

              <p className="mb-3">
                FitLife está diseñado para quienes quieren verse y sentirse
                mejor, pero no tienen tiempo, experiencia previa o motivación
                constante.
              </p>

              <p className="mb-3">
                Aquí no se trata de hacerlo perfecto, sino de hacerlo posible:
                entrenamientos simples, hábitos sostenibles y bienestar que se
                mantiene en el tiempo.
              </p>

              <p className="font-medium text-fuchsia-700 dark:text-fuchsia-300">
                Empieza hoy desde casa y nota el cambio paso a paso.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 max-w-xl">
              <span className="px-3 py-1 bg-white/80 dark:bg-gray-800 rounded-full text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300 shadow">
                🏠 Entrena en casa
              </span>
              <span className="px-3 py-1 bg-white/80 dark:bg-gray-800 rounded-full text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300 shadow">
                ⏱️ Rutinas cortas
              </span>
              <span className="px-3 py-1 bg-white/80 dark:bg-gray-800 rounded-full text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300 shadow">
                🧠 Hábitos sostenibles
              </span>
              <span className="px-3 py-1 bg-white/80 dark:bg-gray-800 rounded-full text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300 shadow">
                🚫 Sin extremos
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#promociones"
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white rounded-xl font-bold shadow-xl hover:scale-105 transition text-center"
              >
                Empezar ahora
              </a>

              <a
                href="/contact"
                className="px-6 py-3 border border-fuchsia-600 dark:border-fuchsia-400 text-fuchsia-700 dark:text-fuchsia-300 rounded-xl bg-white/80 dark:bg-gray-800 text-center"
              >
                Contactar
              </a>
            </div>
          </div>

          <div className="hidden md:block relative">
            <video
              src={promo7}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 dark:block hidden" />
          </div>
        </div>
      </section>

      {/* CARRUSEL iTUNES */}
      <section
        id="promociones"
        className="w-full bg-fuchsia-200 dark:bg-gray-900 py-24 -mb-40 pb-40"
      >
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-600 dark:from-fuchsia-400 dark:via-pink-400 dark:to-purple-400 mb-14 tracking-tight drop-shadow-sm">
          Descubre FitLife en acción
        </h2>

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-10 px-[calc(45vw-180px)] overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {videos.map((video, index) => (
            <PromoVideo key={index} {...video} active={index === activeIndex} />
          ))}
        </div>
      </section>
    </>
  );
};

export default LaunchCampaign;
