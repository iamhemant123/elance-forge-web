import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";

import "./index.css";
import App from "./App.jsx";

import Learn from "./pages/Learn.jsx";
import Story from "./pages/Discoverstory.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollToHash />

          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/story" element={<Story />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
}
