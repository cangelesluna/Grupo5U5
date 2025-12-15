import React from "react";
import misionImg from "../assets/mision.png";
import visionImg from "../assets/vision.png";

function MisionVision() {
  return (
    <section className="relative bg-gradient-to-b from-fuchsia-200 via-purple-100 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 px-6 pt-20 pb-40 overflow-hidden">
      {/* Glow decorativo */}

      <div className="relative max-w-4xl mx-auto space-y-24">
        {/* HERO */}
        <div className="text-center animate-fade-up">
          <h1 className="relative inline-block mb-6">
            <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 via-pink-600 to-purple-600 dark:from-fuchsia-400 dark:via-pink-400 dark:to-purple-400 tracking-tight">
              Nuestra Misión y Visión
            </span>
            <span className="absolute -inset-3 bg-gradient-to-r from-fuchsia-400/30 to-pink-400/30 blur-2xl opacity-60 -z-10" />
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            FitLife, tu aliado para comenzar una vida saludable, equilibrada y
            sostenible.
          </p>
        </div>

        {/* MISIÓN */}
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur p-10 rounded-3xl shadow-xl animate-fade-up">
          <img
            src={misionImg}
            alt="Misión FitLife"
            className="w-36 h-36 mx-auto mb-6 rounded-2xl object-contain ring-4 ring-fuchsia-300 hover:ring-fuchsia-500 transition"
          />

          <h2 className="relative inline-block text-3xl font-extrabold text-fuchsia-900 dark:text-fuchsia-500 mb-6">
            Nuestra Misión
            <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full" />
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Promover un estilo de vida saludable brindando herramientas
            prácticas y personalizadas para mejorar el bienestar físico, mental
            y emocional. A través de recursos como el cálculo del IMC, planes de
            alimentación equilibrada y rutinas de ejercicio adaptadas, buscamos
            empoderar a nuestros usuarios para que alcancen su mejor versión.
          </p>

          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
            Para lograrlo nos enfocamos en:
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Personalización de planes de alimentación y entrenamiento</li>
            <li>Gestión eficiente del tiempo con rutinas adaptadas</li>
            <li>Desarrollo de hábitos saludables y sostenibles</li>
          </ul>
        </div>

        {/* VISIÓN */}
        <div className="bg-white/70 dark:bg-gray-800/80 backdrop-blur p-10 rounded-3xl shadow-xl animate-fade-up delay-100">
          <img
            src={visionImg}
            alt="Visión FitLife"
            className="w-36 h-36 mx-auto mb-6 rounded-2xl object-contain ring-4 ring-fuchsia-300 hover:ring-fuchsia-500 transition"
          />

          <h2 className="relative inline-block text-3xl font-extrabold text-fuchsia-900 dark:text-fuchsia-500 mb-6">
            Nuestra Visión
            <span className="absolute left-0 -bottom-2 w-1/2 h-1 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full" />
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Ser la plataforma líder en bienestar integral, reconocida por su
            innovación y efectividad, convirtiéndonos en el aliado ideal para
            iniciar una vida saludable. Aspiramos a construir una comunidad
            global que comparta conocimientos, experiencias y motivación.
          </p>

          <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
            Hacia 2040 queremos:
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Ser la plataforma de bienestar integral más confiable del mundo
            </li>
            <li>Innovar constantemente en tecnología y contenido</li>
            <li>Ofrecer soluciones accesibles y personalizadas</li>
            <li>Fomentar una comunidad global activa y comprometida</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MisionVision;
