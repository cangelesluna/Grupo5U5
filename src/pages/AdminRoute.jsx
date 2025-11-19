import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { usuario, cliente, loading } = useContext(AuthContext);

  // Mientras se cargan los datos, no mostramos nada
  if (loading) return null;

  // Si no hay usuario o el rol no es admin, redirigimos
  if (!usuario || cliente?.rol !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
