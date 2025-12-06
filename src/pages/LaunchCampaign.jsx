import React from "react";
import promo from "../assets/promo.jpg";

const LaunchCampaign = ({
  businessName = "FitLife",
  onExplore = () => window.scrollTo({ top: 0, behavior: "smooth" }),
  onContact = () => (window.location.href = "/contact"),
}) => {
  const socialPost = `¿Lista para transformar tu bienestar? En FitLife reunimos planes de alimentación simples, entrenamientos que realmente se ajustan a tu ritmo y hábitos que sí puedes sostener. No buscamos “vidas perfectas”: buscamos cambios reales. Más energía, mejor relación con tu comida y un cuerpo que se siente fuerte día a día. Este es el inicio de tu mejor versión. 💪🥗✨`;

  return (
    <section
      className="relative w-full bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      overflow-hidden rounded-3xl shadow-xl border border-white/40 dark:border-gray-700 min-h-[70vh]
      py-0"
    >
      {/* IMAGE FOR MOBILE – FULL WIDTH TOP */}
      <div className="block md:hidden w-full h-80">
        <img
          src={promo}
          alt="FitLife Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* DESKTOP GRID */}
      <div className="grid md:grid-cols-2 h-auto items-center">
        {/* LEFT — CONTENT */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-fuchsia-900 dark:text-fuchsia-300 leading-tight">
            Bienvenida al lanzamiento de{" "}
            <span className="text-fuchsia-700 dark:text-fuchsia-400">
              {businessName}
            </span>
          </h1>

          <p className="mt-6 text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
            FitLife transforma lo saludable en algo simple: recetas rápidas,
            entrenamientos accesibles y hábitos que realmente encajan en tu
            vida. Nada extremo, solo bienestar sostenible.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExplore}
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-fuchsia-600
              hover:from-pink-700 hover:to-fuchsia-700 text-white rounded-xl
              font-semibold shadow-md transition-all"
            >
              Descubrir FitLife
            </button>

            <button
              onClick={onContact}
              className="px-8 py-3 border border-fuchsia-600 text-fuchsia-700
              dark:text-fuchsia-300 rounded-xl bg-white/70 dark:bg-transparent 
              font-medium shadow-md hover:bg-white/90 transition-all"
            >
              Hablar con nosotros
            </button>
          </div>

          {/* SOCIAL POST */}
          <p
            className="mt-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md 
            p-4 rounded-xl text-sm text-gray-700 dark:text-gray-300 max-w-lg"
          >
            {socialPost}
          </p>
        </div>

        {/* RIGHT — IMAGE REDUCED, CENTERED, PROFESSIONAL */}
        <div className="hidden md:flex items-center justify-center py-10">
          <img
            src={promo}
            alt="FitLife Hero"
            className="max-h-[1020px] w-auto object-contain rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default LaunchCampaign;
