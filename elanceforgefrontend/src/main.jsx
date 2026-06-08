import React,{StrictMode} from "react";

import {createRoot} from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {HelmetProvider} from "react-helmet-async";

import {AnimatePresence} from "framer-motion";

import "./index.css";

/* Components */

import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";

/* Pages */

import App from "./App.jsx";

import Learn from "./pages/Learn.jsx";

import Story from "./pages/Discoverstory.jsx";

import Admin from "./pages/Admin.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";

import ClientLogin from "./pages/ClientLogin.jsx";

import ClientDashboard from "./pages/ClientDashboard.jsx";

/* Root */

const rootElement=
document.getElementById("root");

if(!rootElement){

  throw new Error(
    "Root element not found"
  );
}

const root=createRoot(rootElement);

/* Render */

root.render(

  <StrictMode>

    <HelmetProvider>

      <BrowserRouter>

        {/* Scroll Helpers */}

        <ScrollToTop />

        <ScrollToHash />

        {/* Routes */}

        <AnimatePresence mode="wait">

          <Routes>

            {/* Home */}

            <Route
              path="/"
              element={<App />}
            />

            {/* Learn */}

            <Route
              path="/learn"
              element={<Learn />}
            />

            {/* Story */}

            <Route
              path="/story"
              element={<Story />}
            />

            {/* Admin */}

            <Route
              path="/admin"
              element={<Admin />}
            />

            {/* Admin Login */}

            <Route
              path="/admin-login"
              element={<AdminLogin />}
            />

            {/* Client Login */}

            <Route
              path="/client-login"
              element={<ClientLogin />}
            />

            {/* Client Dashboard */}

            <Route
              path="/client-dashboard"
              element={<ClientDashboard />}
            />

          </Routes>

        </AnimatePresence>

      </BrowserRouter>

    </HelmetProvider>

  </StrictMode>

);