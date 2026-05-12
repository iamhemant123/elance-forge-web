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
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-white flex items-center justify-center px-5 py-20">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-orange-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-orange-100/40 blur-3xl rounded-full" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 text-center max-w-5xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/logo.webp"
            alt="Elance Forge logo"
            loading="eager"
            decoding="async"
            className="w-[320px] md:w-[580px] mx-auto drop-shadow-2xl"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-2 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]"
        >
          Crafting High-Performance <br />

          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-transparent bg-clip-text">
            Websites & Growth Strategies
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-7 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
        >
          We create modern digital experiences that help brands grow faster,
          convert better, and build a strong presence in the global market.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <AnimatedButton
            color="orange"
            className="px-10 py-4"
            onClick={() => scrollToSection("contact")}
          >
            Get Started
          </AnimatedButton>

          <AnimatedButton
            color="gray"
            className="px-10 py-4"
            onClick={() => navigate("/learn")}
          >
            Learn More
          </AnimatedButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-12 text-sm text-gray-600"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-orange-600">30+</span>
            <span>Projects Delivered</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-orange-600">95%</span>
            <span>Client Satisfaction</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-orange-600">24/7</span>
            <span>Support & Growth</span>
          </div>
        </motion.div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex justify-center"
        >
          <button
            type="button"
            onClick={() => scrollToSection("services")}
            aria-label="Scroll to services section"
            className="group w-14 h-14 rounded-full border border-orange-200 bg-white/80 backdrop-blur-xl shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <ChevronDown
              className="w-7 h-7 text-orange-600 animate-bounce group-hover:translate-y-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Homepage;