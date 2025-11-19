import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white p-6 shadow flex flex-col">
      {/* PERFIL */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center">
          CR
        </div>
        <div>
          <div className="font-semibold">Bianca</div>
          <div className="text-xs">Sistema Admin</div>
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="flex flex-col gap-2 mt-4">
        <NavLink
          to="/admin/planes"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive ? "bg-pink-100 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          Planes de ejercicios y dietas
        </NavLink>
        <NavLink
          to="/admin/equipo"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive ? "bg-pink-100 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          Equipo
        </NavLink>
        <NavLink
          to="/admin/monitoreo"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive ? "bg-pink-100 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          Monitoreo
        </NavLink>
        <NavLink
          to="/admin/ajustes"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive ? "bg-pink-100 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          Ajustes
        </NavLink>
        <NavLink
          to="/admin/comunidad"
          className={({ isActive }) =>
            `px-3 py-2 rounded ${
              isActive ? "bg-pink-100 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          Comunidad
        </NavLink>
      </nav>
    </aside>
  );
}
