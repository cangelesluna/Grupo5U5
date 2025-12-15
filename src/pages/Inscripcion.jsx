import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";

const Inscripcion = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    edad: "",
    genero: "",
    plan: "",
    duracion: "",
    objetivo: "",
    condicion: "",
    preferencias: "",
  });

  const [mensaje, setMensaje] = useState("");

  const precios = {
    basico: 250,
    estandar: 300,
    intensivo: 370,
    online: 150,
  };

  const descuentos = {
    "3_meses": 0.1,
    "6_meses": 0.2,
    "12_meses": 0.3,
  };

  const planes = [
    {
      nombre: "Plan Básico",
      descripcion:
        "✔️ Incluye 2 entrenamientos por semana (2h cada uno), consejos de alimentación y bienestar general. Modalidad presencial.",
      color: "bg-pink-200 dark:bg-pink-600",
    },
    {
      nombre: "Plan Estándar",
      descripcion:
        "✔️ Incluye 3 entrenamientos por semana (2h cada uno), monitoreo semanal y recetario de recetas saludables. Modalidad presencial.",
      color: "bg-pink-300 dark:bg-pink-400 border dark:border-pink-400",
    },
    {
      nombre: "Plan Intensivo",
      descripcion:
        "✔️ Incluye 4 entrenamientos por semana (3h cada uno), acceso a asesorías, planes avanzados y comunidad exclusiva de bienestar. Modalidad presencial.",
      color: "bg-pink-200 dark:bg-pink-600",
    },
    {
      nombre: "Plan Online 100%",
      descripcion:
        "✔️ Incluye 2 entrenamientos por semana (2h cada uno), clases grabadas, recetario saludable digital, asesorías virtuales y acceso a comunidad online.",
      color: "bg-pink-300 dark:bg-pink-400 ",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombre,
      correo,
      edad,
      genero,
      plan,
      duracion,
      objetivo,
      condicion,
      preferencias,
    } = formData;

    // Validar campos
    if (
      !nombre ||
      !correo ||
      !edad ||
      !genero ||
      !plan ||
      !duracion ||
      !objetivo ||
      !condicion ||
      !preferencias
    ) {
      setMensaje("Por favor completa todos los campos 🌿");
      return;
    }

    const edadNum = parseInt(edad, 10);
    if (edadNum <= 18) {
      setMensaje(
        "Lo sentimos 😔, debes ser mayor de 18 años para inscribirte."
      );
      return;
    }

    // Calcular precio
    const precioBase = precios[plan];
    const descuento = descuentos[duracion] || 0;

    // Número de meses
    const meses = {
      "1_mes": 1,
      "3_meses": 3,
      "6_meses": 6,
      "12_meses": 12,
      indefinido: 0,
    }[duracion];

    let precioFinal;
    let textoPago;

    if (meses > 1) {
      const totalSinDescuento = precioBase * meses;
      const totalConDescuento =
        totalSinDescuento - totalSinDescuento * descuento;
      precioFinal = totalConDescuento;
      textoPago = ` 🟣Pago total por ${meses} meses con ${
        descuento * 100
      }% de descuento.`;
    } else if (duracion === "indefinido") {
      precioFinal = precioBase;
      textoPago = " 🟣 Pago mensual sin descuento (duración indefinida).";
    } else {
      precioFinal = precioBase;
      textoPago = " 🟣(Pago mensual sin descuento.)";
    }

    const duracionTexto = {
      "1_mes": "1 mes",
      "3_meses": "3 meses",
      "6_meses": "6 meses",
      "12_meses": "12 meses",
      indefinido: "tiempo indefinido",
    }[duracion];

    try {
      await addDoc(collection(db, "inscripciones"), {
        nombre,
        correo,
        edad: parseInt(edad),
        genero,
        plan,
        duracion,
        objetivo,
        condicion,
        preferencias,
        precioFinal,
        fecha: Timestamp.now(),
        estado: "pendiente",
      });
    } catch (error) {
      console.error("Error al guardar inscripción:", error);
      setMensaje("❌ Ocurrió un error al registrar tu inscripción");
      return;
    }

    setMensaje(
      `¡Gracias por inscribirte, ${nombre}! 💚
 🟣Has elegido el plan ${
        plan.charAt(0).toUpperCase() + plan.slice(1)
      } (${duracionTexto}).
 🟣Costo mensual: S/ ${precioBase}.
${textoPago}
💸 Monto a pagar: S/ ${precioFinal.toFixed(2)}.`
    );

    // Limpiar formulario
    setFormData({
      nombre: "",
      correo: "",
      edad: "",
      genero: "",
      plan: "",
      duracion: "",
      objetivo: "",
      condicion: "",
      preferencias: "",
    });
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-fuchsia-200 dark:bg-gray-900 px-6 pt-16 pb-60 -mb-40 gap-10 transition-colors duration-500">
      {/* Formulario */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-fuchsia-900 dark:text-pink-400 mb-6 text-center">
          Formulario de Inscripción
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ej. correo@ejemplo.com"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Edad */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              min="0"
              placeholder="Ej. 22"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Género */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Género
            </label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Seleccione una opción</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="otro">Otro género</option>
            </select>
          </div>

          {/* Plan */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Selecciona plan
            </label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Selecciona --</option>
              <option value="basico">Básico (2x semana)</option>
              <option value="estandar">Estándar (3x semana)</option>
              <option value="intensivo">Intensivo (4x semana)</option>
              <option value="online">Online</option>
            </select>
          </div>

          {/* Duración */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Duración del plan
            </label>
            <select
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Selecciona --</option>
              <option value="1_mes">1 mes</option>
              <option value="3_meses">3 meses</option>
              <option value="6_meses">6 meses</option>
              <option value="12_meses">12 meses</option>
              <option value="indefinido">Indefinido</option>
            </select>
          </div>

          {/* Objetivo */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Objetivo principal
            </label>
            <select
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Selecciona --</option>
              <option value="perder_peso">Perder peso</option>
              <option value="ganar_musculo">Ganar músculo</option>
              <option value="mejorar_resistencia">Mejorar resistencia</option>
              <option value="mantener_salud">Mantener salud</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Condición */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Condición física
            </label>
            <select
              name="condicion"
              value={formData.condicion}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Selecciona --</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
              <option value="atleta">Atleta</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Preferencias */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Preferencias de entrenamiento
            </label>
            <select
              name="preferencias"
              value={formData.preferencias}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Selecciona --</option>
              <option value="cardio">Cardio</option>
              <option value="fuerza">Fuerza</option>
              <option value="flexibilidad">Flexibilidad</option>
              <option value="mixto">Mixto</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-fuchsia-800 hover:bg-fuchsia-600 dark:bg-pink-700 dark:hover:bg-pink-600 text-white py-2 rounded-lg font-medium shadow-md transition"
          >
            Enviar inscripción
          </button>
        </form>

        {mensaje && (
          <p
        className={`text-left whitespace-pre-line mt-4 font-semibold ${
        mensaje.includes("Gracias")
        ? "text-green-600 dark:text-green-400"
        : "text-red-500 dark:text-red-400"
            }`}
>
          {mensaje}
            </p>

        )}
      </div>

      {/* Planes */}
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-bold text-fuchsia-900 dark:text-pink-400 mb-4 text-center">
          Nuestros Planes
        </h3>

        <div className="space-y-4">
          {planes.map((plan, i) => (
            <div
              key={i}
              className={`${plan.color} rounded-xl shadow-md p-5 border border-pink-200 dark:border-pink-600 hover:shadow-lg transition`}
            >
              <h4 className="text-xl font-semibold text-fuchsia-800 dark:text-gray-300">
                {plan.nombre}
              </h4>
              <p className="text-gray-700 dark:text-gray-200 mt-1">
                {plan.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inscripcion;
