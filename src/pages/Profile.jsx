import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { getUserPlans } from "./services/userPlans";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [planesInfo, setPlanesInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Obtener info de los planes
  const fetchPlansInfo = async (ids) => {
    if (!ids || ids.length === 0) {
      setPlanesInfo([]);
      return;
    }

    const plansRef = collection(db, "plans");
    const snap = await getDocs(plansRef);
    const allPlans = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const filtered = allPlans.filter((p) => ids.includes(p.id));
    setPlanesInfo(filtered);
  };

  // 🔹 Obtener comunicados visibles
  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, "post"),
        where("visible", "==", true),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(data);
    } catch (err) {
      console.error("Error cargando comunicados:", err);
    }
  };

  // 🔹 Cargar datos del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setUserData(null);
          setLoading(false);
          return;
        }

        const data = userSnap.data();
        setUserData(data);

        if (data.rol === "admin") {
          navigate("/admin/dashboard");
          return;
        }

        const misPlanesIds = await getUserPlans(currentUser.uid);
        await fetchPlansInfo(misPlanesIds);
        await fetchPosts();
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

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-700 dark:text-gray-300">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= COMUNICADOS ================= */}
        <aside className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 transition lg:col-span-1 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">
            📢 Comunicados
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              No hay comunicados por el momento.
            </p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                    {post.authorName} ·{" "}
                    {post.createdAt?.toDate().toLocaleDateString()}
                  </p>

                  <p className="text-gray-800 dark:text-white text-sm mb-2">
                    {post.text}
                  </p>

                  {/* Renderizar media */}
                  {post.media?.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {post.media.map((m, i) =>
                        m.type === "image" ? (
                          <img
                            key={i}
                            src={m.url}
                            alt=""
                            className="rounded-md w-full h-40 object-cover hover:scale-105 transition-transform"
                          />
                        ) : (
                          <video
                            key={i}
                            src={m.url}
                            controls // Para poder pausar/reproducir
                            autoPlay // Reproduce automáticamente
                            muted // Necesario para autoplay
                            loop // Se repite automáticamente
                            className="rounded-md w-full h-40 object-cover hover:scale-105 transition-transform"
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* ================= PERFIL + PLANES ================= */}
        <main className="lg:col-span-2 space-y-6">
          {/* PERFIL */}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <p className="text-sm font-medium text-gray-800 dark:text-white break-all">
                    {auth.currentUser?.email}
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Rol
                  </p>
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

          {/* PLANES */}
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
                    {plan.imagen && (
                      <img
                        src={plan.imagen}
                        alt={plan.titulo}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                    )}

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
        </main>
      </div>
    </div>
  );
}

export default Profile;
