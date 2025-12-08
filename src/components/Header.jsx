import { Link, NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Header({ isDark, setIsDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    usuario = null,
    cliente = null,
    loading = true,
  } = useContext(AuthContext) || {};

  const isAdmin = cliente?.rol === "admin";

  // 🔹 Sincronizar la clase 'dark' en el <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-500 to-pink-400 dark:from-gray-900 dark:to-gray-800 text-white shadow-md transition-colors duration-500">
      <div className="container mx-auto flex items-center justify-between px-4 py-0">
        {/* Logo */}
        <Link to="/">
          <img
            src="/src/assets/logo.png"
            alt="FitLife Logo"
            className="h-20 w-auto object-contain drop-shadow-lg"
          />
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          {[
            "/",
            "/about",
            "/mision-vision",
            "/inscripcion",
            "/catalogo",
            "/contact",
            "/promociones",
          ].map((path, i) => {
            const labels = [
              "Inicio",
              "Sobre nosotras",
              "Misión y Visión",
              "Inscripción",
              "Catálogo",
              "Contacto",
              "Promociones",
            ];
            return (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold underline underline-offset-4"
                    : "hover:underline underline-offset-4"
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}

          {/* LOGIN / PERFIL / ADMIN */}
          {!loading &&
            (usuario ? (
              isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  className="ml-4 px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition
                  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Panel Admin
                </Link>
              ) : (
                <Link
                  to="/perfil"
                  className="ml-4 px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition
                  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Mi Perfil
                </Link>
              )
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition
                dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Iniciar sesión
              </Link>
            ))}

          {/* Botón modo oscuro */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-4 p-2 rounded-full bg-white dark:bg-gray-700 text-black dark:text-yellow-300 transition-transform duration-300 hover:scale-110 shadow-md"
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </nav>

        {/* Botón menú móvil */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-br from-pink-400 to-pink-300 dark:from-gray-900 dark:to-gray-800 text-center py-4 space-y-3 transition-colors duration-500 shadow-lg">
          {[
            "/",
            "/about",
            "/mision-vision",
            "/inscripcion",
            "/catalogo",
            "/contact",
            "/promociones",
          ].map((path, i) => {
            const labels = [
              "Inicio",
              "Sobre nosotras",
              "Misión y Visión",
              "Inscripción",
              "Catálogo",
              "Contacto",
              "Promociones",
            ];
            return (
              <NavLink
                key={i}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="block hover:underline underline-offset-4"
              >
                {labels[i]}
              </NavLink>
            );
          })}

          {/* LOGIN / PERFIL / ADMIN móvil */}
          {!loading &&
            (usuario ? (
              isAdmin ? (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-2 px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition
                  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Panel Admin
                </Link>
              ) : (
                <Link
                  to="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-2 px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition
                  dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Mi Perfil
                </Link>
              )
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block mt-2 px-4 py-2 bg-white text-pink-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition
                dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Iniciar sesión
              </Link>
            ))}

          {/* Botón modo oscuro móvil */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="mt-3 p-2 rounded-full bg-white dark:bg-gray-700 text-black dark:text-yellow-300 transition-transform duration-300 hover:scale-110 shadow-md"
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;


