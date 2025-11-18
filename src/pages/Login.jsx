// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1) Autenticar
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // 2) Leer documento del usuario en Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // No hay doc: cerrar sesión y mostrar error
        await auth.signOut();
        setError("Usuario no encontrado en la base de datos (sin rol). Contacta con soporte.");
        setLoading(false);
        return;
      }

      const data = userSnap.data();
      const role = data.rol || data.role || data.tipo || null; // por si usan otro campo

      // 3) Redirigir según rol (ajusta nombres si tu BD usa 'client' en vez de 'cliente')
      if (role === "admin" || role === "administrator") {
        navigate("/admin");
      } else if (role === "editor") {
        navigate("/editor");
      } else {
        // Por defecto asumimos cliente
        navigate("/cliente");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Mensajes amigables según error
      if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Correo o contraseña incorrectos.");
      } else if (err.code === "auth/invalid-email") {
        setError("Correo inválido.");
      } else {
        setError("Error al iniciar sesión. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          ¿Olvidaste tu contraseña? <a href="/recover" className="text-pink-500 hover:underline">Recuperarla</a>
        </div>
      </div>
    </div>
  );
}