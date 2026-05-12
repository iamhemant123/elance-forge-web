import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "../components/ContactForm";
import AnimatedButton from "../components/AnimatedButton";

const services = [
  "Search Engine Optimization (SEO)",
  "Social Media Marketing",
  "Content Marketing",
  "Web Design & Development",
  "Email Marketing",
  "Brand Strategy & Development",
];

const choosePoints = [
  "Results-Driven & ROI Focused",
  "Industry Expertise & Trend Leaders",
  "Customized Strategies for Every Client",
  "Transparent Reporting & Communication",
  "Proven Track Record Across Industries",
];

const industries = [
  "E-commerce & Retail",
  "Healthcare & Medical Services",
  "Professional Services",
  "Real Estate",
  "Technology & SaaS",
  "Hospitality & Tourism",
  "Education & E-learning",
  "Financial Services",
  "Home Services",
  "And Many More",
];

const processSteps = [
  "Discovery & Analysis",
  "Strategy Development",
  "Implementation",
  "Monitoring & Optimization",
  "Reporting & Growth",
];

const highlightLastWord = (text) => {
  const words = text.split(" ");
  const lastWord = words.pop();

  return (
    <>
      {words.join(" ")}{" "}
      <span className="text-orange-500">{lastWord}</span>
    </>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const Learn = () => {
  const [openForm, setOpenForm] = useState(false);

  const openModal = useCallback(() => {
    setOpenForm(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpenForm(false);
  }, []);

  return (
    <>
      {/* Main Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-white py-24 px-5 min-h-screen">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/40 blur-3xl rounded-full" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-20"
          >
            <div className="mx-auto mb-5 w-28 h-1 bg-orange-500 rounded-full animate-pulse" />

            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-gray-900 mb-6">
              Transform Your Digital Presence with{" "}
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-transparent bg-clip-text">
                ElanceForge
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed text-base md:text-lg">
              A full-service digital agency helping brands scale with modern
              strategies, creative execution, and high-performance digital
              experiences.
            </p>
          </motion.div>

          {/* Services */}
          <div className="mb-24">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-black text-center mb-12 text-gray-900"
            >
              {highlightLastWord("Our Core Services")}
            </motion.h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service) => (
                <motion.div
                  key={service}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/70 backdrop-blur-xl p-7 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-orange-500 mb-4">
                      {service}
                    </h3>

                    <p className="text-gray-700 leading-relaxed text-sm">
                      Delivering measurable business growth through creative
                      execution, smart strategies, and performance-driven
                      optimization.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div className="mb-24">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-black text-center mb-12 text-gray-900"
            >
              {highlightLastWord("Why Choose ElanceForge")}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {choosePoints.map((point) => (
                <motion.div
                  key={point}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/70 backdrop-blur-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-orange-100/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <p className="relative z-10 text-gray-800 font-semibold">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="mb-24">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-black text-center mb-12 text-gray-900"
            >
              {highlightLastWord("Industries We Serve")}
            </motion.h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <motion.div
                  key={industry}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/70 backdrop-blur-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-orange-100/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <p className="relative z-10 text-gray-800 font-medium">
                    {industry}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-24">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-black text-center mb-14 text-gray-900"
            >
              {highlightLastWord("Our Process")}
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-7">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  className="group flex items-start gap-5 rounded-3xl border border-white/10 bg-white/70 backdrop-blur-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="min-w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step}
                    </h3>

                    <p className="text-gray-700 leading-relaxed text-sm">
                      Strategic execution designed to maximize business growth,
                      improve performance, and build long-term success.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[32px] bg-[#050505] py-20 px-6 text-center shadow-2xl"
          >
            {/* Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
                Ready to Grow Your Business?
              </h2>

              <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed mb-10">
                Experience modern, data-driven digital solutions designed to
                improve visibility, engagement, and business growth.
              </p>

              <AnimatedButton
                color="orange"
                className="px-10 py-4 rounded-2xl"
                onClick={openModal}
              >
                Get Free Consultation
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popup */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center px-4 py-6"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300/20 blur-3xl rounded-full" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                aria-label="Close popup"
                className="absolute top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white text-black text-xl font-bold shadow-lg transition-all duration-300 hover:bg-orange-500 hover:text-white hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                ✕
              </button>

              {/* Form */}
              <div className="relative z-10">
                <ContactForm onClose={closeModal} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Learn;