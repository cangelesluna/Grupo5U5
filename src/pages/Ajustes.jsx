
import { useState, useEffect } from "react";

export default function Ajustes() {
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    adminName: "Administradora FITLIFE",
    adminEmail: "proyectofitlife404@gmail.com",
  });

  // 🔹 Al cargar, leer ajustes guardados
  useEffect(() => {
    const saved = localStorage.getItem("fitlife-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      applyDarkMode(parsed.darkMode); // Aplicar modo oscuro al iniciar
    }
  }, []);

  // 🔹 Función para aplicar modo oscuro
  const applyDarkMode = (isDark) => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  };

  // 🔹 Cambios en inputs
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setSettings((prev) => {
      const updated = { ...prev, [name]: newValue };

      // Aplicar modo oscuro al instante
      if (name === "darkMode") applyDarkMode(newValue);

      return updated;
    });
  };

  // 🔹 Guardar ajustes en localStorage
  const saveSettings = () => {
    localStorage.setItem("fitlife-settings", JSON.stringify(settings));
    alert("Ajustes guardados ✔");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">⚙ Ajustes</h2>

      {/* Información de la cuenta */}
      <div className="p-4 border dark:border-gray-700 rounded mb-6">
        <h3 className="font-semibold mb-3">Información de la cuenta</h3>

        <div className="mb-3">
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            name="adminName"
            value={settings.adminName}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1">Correo electrónico</label>
          <input
            type="email"
            name="adminEmail"
            value={settings.adminEmail}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      {/* Preferencias */}
      <div className="p-4 border dark:border-gray-700 rounded mb-6">
        <h3 className="font-semibold mb-3">Preferencias</h3>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Activar modo oscuro
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Recibir notificaciones por correo
        </label>
      </div>

      <button
        onClick={saveSettings}
        className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Guardar cambios
      </button>
    </div>
  );
}