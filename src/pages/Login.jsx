// src/pages/Login.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { AuthContext } from "../context/AuthContext"; // 🔹 IMPORTAR CONTEXTO

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState(""); // Solo para registro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUsuario } = useContext(AuthContext); // 🔹 OBTENER EL SETTER

  // --- Guardar usuario en Firestore ---
  const registerUserInFirestore = async (uid, email, name) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid,
        email,
        nombre: name || "Usuario",
        rol: "cliente",
        createdAt: new Date(),
      });
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let user;

      if (isRegistering) {
        // --- REGISTRO ---
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = cred.user;

        // Guardar en Firestore
        await registerUserInFirestore(user.uid, user.email, nombre);

        // Actualizar contexto
        setUsuario(user);

        // Redirigir
        navigate("/perfil");
      } else {
        // --- LOGIN ---
        const cred = await signInWithEmailAndPassword(auth, email, password);
        user = cred.user;

        // Actualizar contexto
        setUsuario(user);

        // Verificar rol
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) throw new Error("Usuario sin datos en DB");

        const data = userSnap.data();
        const role = data?.rol || "cliente";

        if (role === "admin") navigate("/admin");
        else navigate("/perfil");
      }
    } catch (err) {
      console.error("Auth error:", err);
      if (err.code === "auth/email-already-in-use")
        setError("Este correo ya está registrado.");
      else if (err.code === "auth/weak-password")
        setError("La contraseña debe tener al menos 6 caracteres.");
      else if (err.code === "auth/wrong-password")
        setError("Contraseña incorrecta.");
      else if (err.code === "auth/user-not-found")
        setError("Usuario no encontrado.");
      else setError("Ocurrió un error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar/Actualizar en Firestore
      await registerUserInFirestore(user.uid, user.email, user.displayName);

      // Actualizar contexto
      setUsuario(user);

      // Redirigir según rol
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const data = userSnap.data();
      const role = data?.rol || "cliente";

      if (role === "admin") navigate("/admin");
      else navigate("/perfil");
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Error al iniciar con Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          {isRegistering ? "Crear cuenta" : "Iniciar sesión"}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          {isRegistering && (
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-semibold disabled:opacity-60 transition"
          >
            {loading
              ? "Procesando..."
              : isRegistering
              ? "Registrarse"
              : "Entrar"}
          </button>
        </form>

        {/* Separador */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
              O continúa con
            </span>
          </div>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-white"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Google</span>
        </button>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          {isRegistering ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="text-pink-500 hover:underline font-semibold"
          >
            {isRegistering ? "Inicia sesión" : "Regístrate aquí"}
          </button>
        </div>

        {!isRegistering && (
          <div className="mt-2 text-center text-sm">
            <a
              href="/recover"
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
