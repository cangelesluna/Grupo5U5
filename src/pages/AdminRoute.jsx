import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { usuario, cliente, loading } = useContext(AuthContext);

  // Si está cargando usuario o cliente, no renderizar ni redirigir
  if (loading || (usuario && !cliente)) return null;

  // Si ya cargó todo y el usuario no es admin → redirigir
  if (!usuario || cliente?.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
