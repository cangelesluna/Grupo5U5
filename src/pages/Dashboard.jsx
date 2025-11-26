import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../pages/Sidebar";
import Header from "../components/Header";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  // 🔥 MODO OSCURO LOCAL PARA ADMIN
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col text-gray-900 dark:text-gray-200">
        {/* 🔥 AHORA Header recibe los props correctos */}
        <Header isDark={isDark} setIsDark={setIsDark} />

        <main className="flex-1 p-8 mt-24">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              👋 Hola, {usuario?.displayName || "Administradora"}!
            </h1>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
