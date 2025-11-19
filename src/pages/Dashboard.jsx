import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className={`flex min-h-screen ${isDark ? "dark" : ""} bg-gray-100`}>
      {/* SIDEBAR */}
      <Sidebar />

      {/* PANEL PRINCIPAL */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <Header isDark={isDark} setIsDark={setIsDark} />

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8 mt-24">
          {/* SALUDO Y CERRAR SESIÓN */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              👋 Hola, {usuario?.displayName || "Administradora"}!
            </h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
            >
              Cerrar sesión
            </button>
          </div>

          {/* CONTENIDO DINÁMICO SEGÚN RUTA */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
