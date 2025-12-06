import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";

// Páginas normales
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MisionVision from "./pages/MisionVision";
import Inscripcion from "./pages/Inscripcion";
import Catalog from "./pages/Catalog";
import LaunchCampaign from "./pages/LaunchCampaign";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

// Rutas de cliente y admin
import ClienteHome from "./components/ProtectedRoute";
import AdminRoute from "./pages/AdminRoute";
import Dashboard from "./pages/Dashboard";
import PlanList from "./pages/PlanList";
import PlanEditor from "./pages/PlanEditor";

import "./index.css";

// ---------------------------
//   RUTAS CONFIGURADAS
// ---------------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout principal con Header + Footer
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/mision-vision", element: <MisionVision /> },
      { path: "/inscripcion", element: <Inscripcion /> },
      { path: "/catalogo", element: <Catalog /> }, // Catálogo normal
      { path: "/login", element: <Login /> },
      { path: "/perfil", element: <Profile /> },
      { path: "/promociones", element: <LaunchCampaign /> },

      // Rutas de cliente
      { path: "/cliente", element: <ClienteHome /> },
    ],
  },

  // 🔐 RUTAS ADMIN
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Dashboard /> {/* Dashboard con sidebar y Outlet */}
      </AdminRoute>
    ),
    children: [
      { path: "dashboard", element: <PlanList /> }, // contenido inicial
      { path: "planes", element: <PlanList /> },
      { path: "crear-plan", element: <PlanEditor /> },
      { path: "editar-plan/:id", element: <PlanEditor /> },
      // Aquí puedes agregar más secciones del admin
    ],
  },
]);

// ---------------------------
//   RENDER PRINCIPAL
// ---------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
