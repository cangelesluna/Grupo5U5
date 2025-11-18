import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase"; // Ajusta la ruta si es necesario
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

// --- IMPORTS DE TU LÓGICA DE PLANES ---
// Ajusta estas rutas según dónde tengas guardados estos archivos realmente
import { getUserPlans } from "./services/userPlans"; // Ejemplo: si está en pages/services/
import catalogo from "../data/catalogo.json"; // Ejemplo: si está en src/data/

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [planes, setPlanes] = useState([]); // Estado para los IDs de los planes
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Escuchar estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        // 1. Obtener datos del Usuario (Firestore)
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }

        // 2. Obtener planes del Usuario (Tu lógica importada)
        // Asumimos que getUserPlans devuelve una promesa con los IDs
        const misPlanesIds = await getUserPlans(currentUser.uid);
        setPlanes(misPlanesIds || []);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // --- Lógica para convertir IDs a Objetos del Catálogo ---
  const planesInfo = planes
    .map((id) => catalogo.find((p) => p.id === id))
    .filter(Boolean);

  if (loading)
    return <div className="p-10 text-center">Cargando perfil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TARJETA 1: Datos del Usuario */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm font-semibold"
            >
              Cerrar Sesión
            </button>
          </div>

          {userData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="text-lg font-medium">
                  {userData.nombre || "Sin nombre"}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Correo</p>
                <p className="text-lg font-medium">{auth.currentUser?.email}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Rol</p>
                <p className="text-lg font-medium capitalize">
                  {userData.rol || "Cliente"}
                </p>
              </div>
            </div>
          ) : (
            <p>No se encontró información personal.</p>
          )}
        </div>

        {/* TARJETA 2: Planes/Cursos (Tu lógica de ClientePerfil) */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
            Mis Planes Contratados
          </h2>

          {planesInfo.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No tienes planes activos actualmente.</p>
              <button
                onClick={() => navigate("/catalogo")} // O a donde vendas los planes
                className="mt-4 text-pink-500 hover:underline"
              >
                Ver catálogo de planes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planesInfo.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 border rounded-xl hover:shadow-md transition bg-white"
                >
                  <h3 className="font-bold text-lg text-pink-600">
                    {plan.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {plan.descripcion}
                  </p>
                  <div className="mt-3 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold capitalize">
                    {plan.tipo}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
