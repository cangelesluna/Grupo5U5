import React, { useEffect, useState } from "react";
import PROMO1 from "../assets/PROMO1.mp4";
import PROMO2 from "../assets/PROMO2.mp4";
import PROMO3 from "../assets/PROMO3.mp4";
import BANNER from "../assets/banner2.png";
import promo from "../assets/promo.jpg";

// =======================================================
// COMPONENTE VIDEO DEL CARRUSEL
// =======================================================
const PromoVideo = ({ src, title, text }) => {
  return (
    <div className="relative min-w-[280px] sm:min-w-[360px] md:min-w-[420px] lg:min-w-[480px]">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full rounded-3xl shadow-xl object-cover aspect-[4/5]"
      />

      {/* TEXTO SOBRE EL VIDEO */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md text-white p-4 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm mt-1 opacity-90">{text}</p>
      </div>
    </div>
  );
};

// =======================================================
// PÁGINA COMPLETA
// =======================================================
const LaunchCampaign = () => {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    setShowPromo(true);
  }, []);

  return (
    <>
      {/* POPUP */}
      {showPromo && (
        <div className="fixed inset-0 bg-[#2B1A30]/70 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="relative bg-white rounded-3xl shadow-2xl p-0 max-w-[450px] w-[90%] overflow-hidden">
            <button
              onClick={() => setShowPromo(false)}
              className="absolute -top-3 -right-3 bg-[#FF4F9A] text-white w-10 h-10 rounded-full text-xl flex items-center justify-center hover:scale-110 transition-all"
            >
              ✕
            </button>

            <div
              onClick={() => (window.location.href = "#promociones")}
              className="cursor-pointer"
            >
              <img src={promo} alt="Promo" className="w-full h-auto" />
            </div>

            <p className="text-center py-4 text-xl font-bold text-[#5A2B81]">
              🎉 ¡Nueva promoción disponible!
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="relative w-full h-screen flex items-center justify-end overflow-hidden">
        <img
          src={BANNER}
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <section className="w-full py-20 px-8 bg-[#FFD1E8] dark:bg-[#2B1A30]">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-3xl shadow-xl bg-white dark:bg-[#3A2442] border-2 border-[#FF4F9A]">
          <h3 className="text-3xl font-semibold text-[#5A2B81] dark:text-[#A785FF]">
            📣 Lanzamiento oficial de FitLife
          </h3>

          <p className="mt-4 text-lg text-[#5A2B81] dark:text-[#E9D6FF] leading-relaxed">
            Hoy presentamos <strong className="text-[#FF4F9A]">FitLife</strong>,
            tu nueva plataforma de bienestar diseñada para ayudarte a entrenar,
            comer mejor y transformar tu energía sin complicaciones.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 px-8 py-4 bg-[#FF4F9A] text-white rounded-full text-lg font-medium hover:scale-105 transition-all shadow-lg"
          >
            Ver más sobre FitLife
          </button>
        </div>
      </section>

      {/* SECCIÓN PROMOCIONES - CARRUSEL */}
      <section
        id="promociones"
        className="w-full bg-[#FFD1E8] dark:bg-[#2B1A30] py-24 px-4 sm:px-8"
      >
        <h2 className="text-center text-4xl font-semibold text-[#5A2B81] dark:text-[#A785FF] mb-12">
          Descubre FitLife en acción
        </h2>

        <div className="w-full overflow-x-auto no-scrollbar flex gap-6 px-2 pb-4">
          <PromoVideo
            src={PROMO1}
            title="Transforma tu día desde casa"
            text="Entrena con rutinas cortas y efectivas diseñadas para ti."
          />

          <PromoVideo
            src={PROMO2}
            title="Pequeños pasos, grandes cambios"
            text="FitLife te guía con hábitos reales que sí funcionan."
          />

          <PromoVideo
            src={PROMO3}
            title="Un estilo de vida que se siente bien"
            text="Motivación diaria, rutinas simples y acompañamiento constante."
          />
        </div>
      </section>
    </>
  );
};

export default LaunchCampaign;
