

import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../lib/firebase.js";

const AdminRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default AdminRoute;