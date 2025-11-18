import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { getUserPlans } from "../../pages/services/userPlans";
import catalogo from "../../data/catalogo.json";

export default function ClientePerfil() {
  const user = auth.currentUser;
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    if (!user) return;
    getUserPlans(user.uid).then(setPlanes);
  }, [user]);

  // Convertir IDs guardados → objetos del JSON
  const planesInfo = planes
    .map((id) => catalogo.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Mi Perfil</h1>

      <div className="mt-4">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>UID:</strong> {user?.uid}
        </p>
      </div>

      <h2 className="text-lg mt-6 font-semibold">Planes Seleccionados</h2>

      {planesInfo.length === 0 ? (
        <p className="text-gray-600 mt-2">
          Aún no has seleccionado ningún plan.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {planesInfo.map((plan) => (
            <div
              key={plan.id}
              className="p-4 border rounded-xl shadow bg-white dark:bg-gray-800"
            >
              <h3 className="font-bold">{plan.titulo}</h3>
              <p>{plan.descripcion}</p>
              <p className="text-sm mt-2 opacity-70">{plan.tipo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
