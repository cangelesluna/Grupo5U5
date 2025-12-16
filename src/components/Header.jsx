import { Link, NavLink } from "react-router-dom";
import { useState, useContext, useEffect, useMemo } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { path: "/", label: "Inicio" },
  { path: "/about", label: "Sobre nosotras" },
  { path: "/mision-vision", label: "Misión y Visión" },
  { path: "/inscripcion", label: "Inscripción" },
  { path: "/catalogo", label: "Catálogo" },
  { path: "/contact", label: "Contacto" },
  { path: "/promociones", label: "Promociones" },
];

function Header({ isDark, setIsDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    usuario = null,
    cliente = null,
    loading = true,
  } = useContext(AuthContext) || {};

  const isAdmin = cliente?.rol === "admin";

  /* 🌙 Sincronizar dark mode con <html> */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  /* 🔹 Botón según estado del usuario */
  const actionButton = useMemo(() => {
    if (loading) return null;

    if (!usuario) {
      return { to: "/login", label: "Iniciar sesión" };
    }

    if (isAdmin) {
      return { to: "/admin/dashboard", label: "Panel Admin" };
    }

    return { to: "/perfil", label: "Mi Perfil" };
  }, [usuario, isAdmin, loading]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 
      bg-gradient-to-r from-pink-500 to-fuchsia-500
      dark:from-gray-900 dark:to-gray-800
      text-white shadow-lg transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="FitLife Logo"
            className="h-16 w-auto drop-shadow-md hover:scale-105 transition-transform"
          />
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative transition-all duration-300
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0
                 after:bg-white after:origin-left after:transition-transform
                 ${
                   isActive
                     ? "after:scale-x-100 font-semibold"
                     : "hover:after:scale-x-100"
                 }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Acción usuario */}
          {actionButton && (
            <Link
              to={actionButton.to}
              className="ml-2 px-4 py-2 rounded-lg font-semibold
                bg-white text-pink-600 shadow
                hover:bg-gray-200 transition
                dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              {actionButton.label}
            </Link>
          )}

          {/* Toggle dark mode */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-3 p-2 rounded-full bg-white text-black shadow
              hover:scale-110 transition-transform
              dark:bg-gray-700 dark:text-yellow-300"
          >
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </nav>

        {/* Botón menú móvil */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Abrir menú</span>
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen && "rotate-45 translate-y-1.5"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen && "opacity-0"
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition ${
                menuOpen && "-rotate-45 -translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className="bg-gradient-to-br from-pink-400 to-fuchsia-400
          dark:from-gray-900 dark:to-gray-800
          text-center py-6 space-y-4 shadow-inner"
        >
          {NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block text-lg hover:underline underline-offset-4"
            >
              {label}
            </NavLink>
          ))}

          {actionButton && (
            <Link
              to={actionButton.to}
              onClick={() => setMenuOpen(false)}
              className="inline-block mt-2 px-5 py-2 rounded-lg font-semibold
                bg-white text-pink-600 shadow
                dark:bg-gray-700 dark:text-white"
            >
              {actionButton.label}
            </Link>
          )}

          <button
            onClick={() => setIsDark(!isDark)}
            className="block mx-auto mt-4 p-2 rounded-full bg-white shadow
              dark:bg-gray-700 dark:text-yellow-300"
          >
            {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
