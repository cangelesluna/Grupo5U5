import { createContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [planAlimentacion, setPlanAlimentacion] = useState(null);
  const [planEjercicio, setPlanEjercicio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUsuario(null);
        setCliente(null);
        setPlanAlimentacion(null);
        setPlanEjercicio(null);
        setLoading(false);
        return;
      }

      setUsuario(user);

      // USERS
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const { clienteId, rol } = userSnap.data();

      // CLIENTE
      const clienteRef = doc(db, "clientes", clienteId);
      const clienteSnap = await getDoc(clienteRef);
      const clienteData = clienteSnap.data();
      setCliente({ ...clienteData, rol });

      // PLAN ALIMENTACIÓN
      const planARef = doc(
        db,
        "planesAlimentacion",
        clienteData.planAlimentacionId
      );
      const planASnap = await getDoc(planARef);
      setPlanAlimentacion(planASnap.data());

      // PLAN EJERCICIO
      const planERef = doc(db, "planesEjercicio", clienteData.planEjercicioId);
      const planESnap = await getDoc(planERef);
      setPlanEjercicio(planESnap.data());

      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cliente,
        planAlimentacion,
        planEjercicio,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
