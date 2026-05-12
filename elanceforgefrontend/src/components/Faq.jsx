import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What is ElanceForge?",
    answer:
      "ElanceForge is a digital solutions agency that helps businesses grow online through custom websites, branding, marketing, and technology-driven strategies focused on real results.",
  },

  {
    question: "What services does ElanceForge offer?",
    answer:
      "We provide website design & development, e-commerce solutions, digital marketing & lead generation, branding & UI/UX design, custom web applications, and ongoing support.",
  },

  {
    question: "Who can work with ElanceForge?",
    answer:
      "We work with startups, entrepreneurs, small businesses, and growing companies across various industries—locally and globally.",
  },

  {
    question: "How is ElanceForge different from other agencies?",
    answer:
      "We don’t sell generic packages. We first understand your business, goals, and audience, then create a tailored solution with full transparency and clear communication.",
  },

  {
    question: "Do you provide custom solutions or fixed packages?",
    answer:
      "We primarily offer custom solutions based on your needs, but we also have affordable starter packages for small businesses and early-stage startups.",
  },

  {
    question: "How long does it take to complete a project?",
    answer:
      "Timelines depend on project scope. Basic websites usually take 7–14 days, while business websites or e-commerce platforms take around 2–6 weeks.",
  },

  {
    question: "How much do your services cost?",
    answer:
      "Pricing depends on features, complexity, and timeline. After discussing your requirements, we provide a clear and transparent quote with no hidden costs.",
  },

  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes. We provide post-launch support, maintenance, updates, and performance optimization to ensure long-term success.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white py-20 px-5">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-200/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/20 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="mx-auto mb-5 w-28 h-1 bg-orange-500 rounded-full animate-pulse" />

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Frequently <span className="text-orange-600">Asked Questions</span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our services, workflow, pricing, and support.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-orange-100/30 blur-2xl rounded-full" />

                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="relative z-10 flex w-full items-center justify-between gap-5 px-6 py-5 text-left focus:outline-none"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-relaxed">
                    {item.question}
                  </h3>

                  <span
                    aria-hidden="true"
                    className={`flex items-center justify-center min-w-[42px] h-[42px] rounded-full bg-orange-100 text-orange-600 text-2xl font-semibold transition-all duration-300 ${isOpen ? "rotate-180 scale-110" : ""}`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="relative z-10 px-6 pb-6 text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;