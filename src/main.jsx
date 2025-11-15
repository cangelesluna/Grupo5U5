import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MisionVision from "./pages/MisionVision";
import Inscripcion from "./pages/Inscripcion";
import Catalog from "./pages/Catalog";

import ClienteHome from "./pages/client/ClienteHome";
import ClienteProductos from "./pages/client/ClienteProductos";
import ClientePerfil from "./pages/client/ClientePerfil";

import ClienteRoute from "./routes/ClienteRoute";

import ProductsPage from "./pages/client/ProductsPage";
import "./index.css";

// Definimos las rutas
const router = createBrowserRouter([
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

      {
        path: "/cliente",
        element: (
          <ClienteRoute>
            <ClienteHome />
          </ClienteRoute>
        ),
      },
      {
        path: "/cliente/productos",
        element: (
          <ClienteRoute>
            <ClienteProductos />
          </ClienteRoute>
        ),
      },
      {
        path: "/cliente/perfil",
        element: (
          <ClienteRoute>
            <ClientePerfil />
          </ClienteRoute>
        ),
      },
      {
        path: "/cliente/products",
        element: (
          <ClienteRoute>
            <ProductsPage />
          </ClienteRoute>
        ),
      },
    ],
  },
]);

// Render principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
