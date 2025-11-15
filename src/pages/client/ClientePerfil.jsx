import { auth } from "../../lib/firebase";

export default function ClientePerfil() {
  const user = auth.currentUser;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Mi Perfil</h1>

      <div className="mt-4">
        <p>
          <strong>Nombre:</strong> {user?.displayName || "Sin nombre"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>UID:</strong> {user?.uid}
        </p>
      </div>

      <button className="btn mt-4" onClick={() => auth.signOut()}>
        Cerrar sesión
      </button>
    </div>
  );
}
