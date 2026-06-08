import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Service from "./components/Service";
import About from "./components/About";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Reminder from "./components/Reminder";
import ChatBot from "./components/ChatBot";

import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";

const HomePage = () => {

  useEffect(() => {

    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }

  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      <Navbar />

      <main>

        <section id="home">
          <Homepage />
        </section>

        <section id="services">
          <Service />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="contact">
          <Contact />
        </section>

        <Faq />

        <Reminder />

      </main>

      <ChatBot />

      <Footer />

    </div>
  );
};

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/client-login"
        element={<ClientLogin />}
      />

      <Route
        path="/client-dashboard"
        element={<ClientDashboard />}
      />

    </Routes>

  );

}

export default App;