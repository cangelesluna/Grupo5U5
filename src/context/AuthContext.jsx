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
  const [metas, setMetas] = useState(null);
  const [rol, setRol] = useState("cliente"); // ✅ rol por defecto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUsuario(null);
        setCliente(null);
        setPlanAlimentacion(null);
        setPlanEjercicio(null);
        setMetas(null);
        setRol("cliente");
        setLoading(false);
        return;
      }

      setUsuario(user);

      try {
        // --- Datos del usuario en Firestore ---
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        const userRol = userData.rol || "cliente";
        setRol(userRol);

        const clienteId = userData.clienteId || user.uid;

        // --- Datos del cliente ---
        const clienteRef = doc(db, "clientes", clienteId);
        const clienteSnap = await getDoc(clienteRef);
        const clienteData = clienteSnap.exists() ? clienteSnap.data() : {};
        setCliente({ ...clienteData, rol: userRol });

        // --- Plan de alimentación ---
        if (clienteData.planAlimentacionId) {
          const planARef = doc(
            db,
            "planesAlimentacion",
            clienteData.planAlimentacionId
          );
          const planASnap = await getDoc(planARef);
          setPlanAlimentacion(planASnap.exists() ? planASnap.data() : null);
        } else setPlanAlimentacion(null);

        // --- Plan de ejercicio ---
        if (clienteData.planEjercicioId) {
          const planERef = doc(
            db,
            "planesEjercicio",
            clienteData.planEjercicioId
          );
          const planESnap = await getDoc(planERef);
          setPlanEjercicio(planESnap.exists() ? planESnap.data() : null);
        } else setPlanEjercicio(null);

        // --- Metas ---
        if (clienteData.metasId) {
          const metasRef = doc(db, "metas", clienteData.metasId);
          const metasSnap = await getDoc(metasRef);
          setMetas(metasSnap.exists() ? metasSnap.data() : null);
        } else setMetas(null);
      } catch (error) {
        console.error("Error cargando datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        cliente,
        planAlimentacion,
        planEjercicio,
        metas,
        rol, // ✅ exponemos el rol directamente
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
