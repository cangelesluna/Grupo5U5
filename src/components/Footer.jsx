import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

/* 🔹 Datos centralizados */
const FOOTER_LINKS = [
  {
    title: "Información",
    links: [
      { label: "Inicio", to: "/" },
      { label: "Sobre nosotras", to: "/about" },
      { label: "Programas", to: "/programas" },
      { label: "Contacto", to: "/contact" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Consejos de salud", to: "/salud" },
      { label: "Guías de entrenamiento", to: "/guias" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF />,
    href: "https://facebook.com",
    color: "hover:text-blue-400",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    href: "https://instagram.com",
    color: "hover:text-pink-400",
    label: "Instagram",
  },
  {
    icon: <FaTwitter />,
    href: "https://twitter.com",
    color: "hover:text-sky-400",
    label: "Twitter",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com",
    color: "hover:text-red-500",
    label: "YouTube",
  },
];

function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Fondo decorativo */}
      <div className="absolute inset-x-0 -top-20 h-32 bg-gradient-to-t from-pink-400/40 to-transparent dark:from-gray-900/60 pointer-events-none" />

      {/* Footer principal */}
      <div
        className="relative z-10
        bg-gradient-to-r from-pink-400 to-fuchsia-500
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        text-white pt-20 pb-8
        rounded-t-3xl shadow-inner transition-colors duration-500"
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Marca */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-200 to-purple-200">
              FitLife
            </h2>
            <p className="text-sm leading-relaxed text-gray-100 dark:text-gray-400">
              Vive saludable, entrena con pasión y alcanza tus metas. Tu
              bienestar es nuestra prioridad.
            </p>
          </div>

          {/* Links dinámicos */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-3">{title}</h3>
              <ul className="space-y-2 text-sm text-gray-100 dark:text-gray-400">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="relative inline-block transition
                      after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                      after:w-full after:scale-x-0 after:bg-white
                      after:origin-left after:transition-transform
                      hover:after:scale-x-100"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Redes */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
            <div className="flex gap-4 text-xl">
              {SOCIAL_LINKS.map(({ icon, href, color, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`p-3 rounded-full bg-white/10 backdrop-blur-sm
                    transition-transform duration-300 hover:scale-110 ${color}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-white/20 dark:border-gray-700 text-center text-sm text-gray-100 dark:text-gray-400">
          © {new Date().getFullYear()} FitLife. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
