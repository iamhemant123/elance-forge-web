import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Service from "./components/Service";
import About from "./components/About";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Reminder from "./components/Reminder";

function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname
      );
    }
  }, []);

  return (
    <>
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

      <Footer />
    </>
  );
}

export default App;
