import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 p-6 shadow dark:shadow-gray-800 flex flex-col text-gray-900 dark:text-gray-200">
      {/* PERFIL */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center">
          CR
        </div>
        <div>
          <div className="font-semibold">Bianca</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Sistema Admin
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex flex-col gap-2 mt-4">
        <NavLink
          to="/admin/planes"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition
            ${
              isActive
                ? "bg-pink-200 dark:bg-pink-700 font-semibold text-pink-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          Planes de ejercicios y dietas
        </NavLink>

        <NavLink
          to="/admin/equipo"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition
            ${
              isActive
                ? "bg-pink-200 dark:bg-pink-700 font-semibold text-pink-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          Equipo
        </NavLink>

        <NavLink
          to="/admin/monitoreo"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition
            ${
              isActive
                ? "bg-pink-200 dark:bg-pink-700 font-semibold text-pink-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          Monitoreo
        </NavLink>

        <NavLink
          to="/admin/ajustes"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition
            ${
              isActive
                ? "bg-pink-200 dark:bg-pink-700 font-semibold text-pink-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          Ajustes
        </NavLink>

        <NavLink
          to="/admin/comunidad"
          className={({ isActive }) =>
            `px-3 py-2 rounded transition
            ${
              isActive
                ? "bg-pink-200 dark:bg-pink-700 font-semibold text-pink-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          Comunidad
        </NavLink>
      </nav>
    </aside>
  );
}
