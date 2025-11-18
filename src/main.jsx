
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

// Páginas normales
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MisionVision from "./pages/MisionVision";
import Inscripcion from "./pages/Inscripcion";
import Catalog from "./pages/Catalog";

import ClienteHome from "./components/ProtectedRoute";

import Profile from "./pages/Profile";
// Páginas admin

import Dashboard from "./pages/Dashboard";
import PlanList from "./pages/PlanList";
import Sidebar from "./pages/Sidebar";
import PlanEditor from "./pages/PlanEditor";
import AdminRoute from "./pages/AdminRoute";
import Login from "./pages/Login";



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
      { path: "/catalogo", element: <Catalog /> },
      { path: "/login", element: <Login /> },

      { path: "/perfil", element: <Profile /> },

      // Rutas de cliente
      { path: "/cliente", element: <ClienteHome /> },
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "mision-vision", element: <MisionVision /> },
      { path: "inscripcion", element: <Inscripcion /> },
      { path: "catalogo", element: <Catalog /> },
    ],
  },

 
  // 🔐 RUTAS ADMIN
  

  { path: "/admin", element: <Login /> },

  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/planes",
    element: (
      <AdminRoute>
        <PlanList />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/crear-plan",
    element: (
      <AdminRoute>
        <Sidebar />
      </AdminRoute>
    ),
  },

  {
    path: "/admin/editar-plan/:id",
    element: (
      <AdminRoute>
        <PlanEditor />
      </AdminRoute>
    ),
  },
]);

// Render principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);