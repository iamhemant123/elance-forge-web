import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

const Homepage = () => {
  const navigate = useNavigate();

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#f6f7fb] via-[#eef1f8] to-white flex items-center justify-center relative">
      <div className="text-center px-4 max-w-4xl relative z-10">
        <motion.img
          src="/logo.webp"
          alt="Elance Forge logo"
          loading="eager"
          decoding="async"
          className="w-[350px] md:w-[600px] mx-auto"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
        >
          <span>Crafting High-Performance</span> <br />
          <span className="text-orange-600">
            Websites & Strategies for Growth
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-700 text-lg md:text-xl mb-10"
        >
          We build digital experiences that help brands scale, convert, and
          dominate globally.
        </motion.p>

        <div className="flex gap-4 justify-center flex-wrap">
          <AnimatedButton
            color="orange"
            className="px-10 py-4"
            onClick={() => scrollToSection("contact")}
          >
            Get Started
          </AnimatedButton>

          <AnimatedButton
            color="orange"
            className="px-10 py-4"
            onClick={() => navigate("/learn")}
          >
            Learn More
          </AnimatedButton>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("services")}
        className="absolute bottom-6 z-10 focus:outline-none focus:ring-2 focus:ring-orange-600 rounded-full"
        aria-label="Scroll to services section"
      >
        <ChevronDown
          className="w-8 h-8 text-orange-600 animate-bounce"
          aria-hidden="true"
        />
      </button>
    </section>
  );
};

export default Homepage;
