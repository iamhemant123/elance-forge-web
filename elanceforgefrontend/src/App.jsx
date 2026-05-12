import React, { useEffect } from "react";

import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Service from "./components/Service";
import About from "./components/About";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Reminder from "./components/Reminder";
import ChatBot from "./components/ChatBot";

function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Better Scroll Handling
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always Start From Top
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    // Remove Hash On Refresh
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
}

export default App;