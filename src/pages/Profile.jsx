import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { getUserPlans } from "./services/userPlans";
import catalogo from "../data/catalogo.json";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          setUserData(null);
          setLoading(false);
          return;
        }

        const data = docSnap.data();
        setUserData(data);

        if (data.rol === "admin") {
          navigate("/admin/dashboard");
          return;
        }

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

  const planesInfo = planes
    .map((id) => catalogo.find((p) => p.id === id))
    .filter(Boolean);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-700 dark:text-gray-300">
        Cargando perfil...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Datos del usuario */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Mi Perfil
            </h1>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-900 transition text-sm font-semibold"
            >
              Cerrar Sesión
            </button>
          </div>

          {userData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Nombre
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {userData.nombre || "Sin nombre"}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Correo
                </p>
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {auth.currentUser?.email}
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">Rol</p>
                <p className="text-lg font-medium text-gray-800 dark:text-white capitalize">
                  {userData.rol || "Cliente"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              No se encontró información personal.
            </p>
          )}
        </div>

        {/* Planes del usuario */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
            Mis Planes Contratados
          </h2>

          {planesInfo.length === 0 ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-300">
              <p>No tienes planes activos actualmente.</p>
              <button
                onClick={() => navigate("/catalogo")}
                className="mt-4 text-pink-600 dark:text-pink-400 hover:underline"
              >
                Ver catálogo de planes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planesInfo.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition bg-white dark:bg-gray-800"
                >
                  <h3 className="font-bold text-lg text-pink-600 dark:text-pink-400">
                    {plan.titulo}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {plan.descripcion}
                  </p>
                  <div className="mt-3 inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full font-semibold capitalize">
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

export default Profile;
