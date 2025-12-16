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
import Monitoreo from "./pages/Monitoreo";
import Equipo from "./pages/Equipo";
import Ajustes from "./pages/Ajustes";
import Comunidad from "./pages/Comunidad";

import "./index.css";

// ---------------------------
//   RUTAS CONFIGURADAS
// ---------------------------
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/mision-vision", element: <MisionVision /> },
        { path: "/inscripcion", element: <Inscripcion /> },
        { path: "/catalogo", element: <Catalog /> },
        { path: "/login", element: <Login /> },
        { path: "/perfil", element: <Profile /> },
        { path: "/promociones", element: <LaunchCampaign /> },
        { path: "/cliente", element: <ClienteHome /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      ),
      children: [
        { path: "dashboard", element: <PlanList /> },
        { path: "planes", element: <PlanList /> },
        { path: "crear-plan", element: <PlanEditor /> },
        { path: "editar-plan/:id", element: <PlanEditor /> },
        { path: "monitoreo", element: <Monitoreo /> },
        { path: "equipo", element: <Equipo /> },
        { path: "ajustes", element: <Ajustes /> },
        { path: "comunidad", element: <Comunidad /> },
      ],
    },
  ],
  { basename: "/Grupo5U5" }
);


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
