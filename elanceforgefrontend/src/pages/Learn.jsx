import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import AnimatedButton from "../components/AnimatedButton";

const highlightLastWord = (text) => {
  const words = text.split(" ");
  const lastWord = words.pop();
  return (
    <>
      {words.join(" ")}{" "}
      <span className="text-orange-600">{lastWord}</span>
    </>
  );
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
      {/* ================= MAIN CONTENT ================= */}
      <section className="bg-gray-200 py-20 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              aria-hidden="true"
              className="mb-4 w-[120px] h-[5px] bg-orange-600 rounded-full animate-pulse mx-auto"
            />

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Transform Your Digital Presence with{" "}
              <span className="text-orange-600">ElanceForge</span>
            </h1>

            <p className="text-gray-700 max-w-2xl mx-auto">
              A full-service digital marketing agency helping businesses scale
              with data-driven SEO, content, and brand strategies.
            </p>
          </div>

          {/* ================= SERVICES ================= */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              "Search Engine Optimization (SEO)",
              "Social Media Marketing",
              "Content Marketing",
              "Web Design & Development",
              "Email Marketing",
              "Brand Strategy & Development",
            ].map((service) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-orange-600 font-semibold mb-3 text-lg">
                  {service}
                </h3>
                <p className="text-gray-700 text-sm">
                  Delivering measurable growth through advanced strategy,
                  creative execution, and performance optimization.
                </p>
              </motion.div>
            ))}
          </div>

          {/* ================= WHY CHOOSE ================= */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-10 text-gray-900">
              {highlightLastWord("Why Choose ElanceForge")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Results-Driven & ROI Focused",
                "Industry Expertise & Trend Leaders",
                "Customized Strategies for Every Client",
                "Transparent Reporting & Communication",
                "Proven Track Record Across Industries",
              ].map((point) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-800 font-medium">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= INDUSTRIES ================= */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-10 text-gray-900">
              {highlightLastWord("Industries We Serve")}
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                "E-commerce & Retail",
                "Healthcare & Medical Services",
                "Professional Services (Legal, Accounting, Consulting)",
                "Real Estate",
                "Technology & SaaS",
                "Hospitality & Tourism",
                "Education & E-learning",
                "Financial Services",
                "Home Services",
                "And Many More",
              ].map((industry) => (
                <motion.div
                  key={industry}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="text-gray-800 font-medium">{industry}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= PROCESS ================= */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-10 text-gray-900">
              {highlightLastWord("Our Process")}
            </h2>

            <div className="max-w-3xl mx-auto space-y-6 text-left">
              {[
                "Discovery & Analysis",
                "Strategy Development",
                "Implementation",
                "Monitoring & Optimization",
                "Reporting & Growth",
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{step}</h3>
                    <p className="text-gray-700 text-sm">
                      Strategic execution designed to maximize growth and
                      long-term success.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= CTA ================= */}
          <div className="text-center bg-gray-800 text-white py-14 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Grow Your Business?
            </h2>

            <p className="text-gray-300 mb-6 text-sm md:text-base font-medium">
              Experience strategic, data-driven digital marketing that delivers
              real results.
            </p>

            <AnimatedButton
              color="orange"
              size="md"
              rounded="rounded-full"
              className="px-10 py-3"
              onClick={openModal}
            >
              Get Free Consultation
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* ================= POPUP ================= */}
      {openForm && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <div
            className="relative w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="
                absolute top-4 right-4
                w-10 h-10
                rounded-full
                bg-white text-black
                text-xl font-bold
                flex items-center justify-center
                hover:bg-orange-600 hover:text-white
                transition
                z-50
              "
              aria-label="Close popup"
            >
              ✕
            </button>

            <ContactForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Learn;