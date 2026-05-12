import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";
import AnimatedButton from "../components/AnimatedButton";

const Reminder = () => {
  const [openForm, setOpenForm] = useState(false);

  const openModal = useCallback(() => {
    setOpenForm(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpenForm(false);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#050505] py-24 px-5 text-center">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/10 blur-3xl rounded-full" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black leading-tight text-white"
          >
            Ready to Transform <br />

            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 text-transparent bg-clip-text">
              Your Business?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-7 max-w-3xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed"
          >
            Let’s discuss how our digital expertise can help your business grow,
            attract more customers, and build a strong online presence.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <AnimatedButton
              color="yellow"
              className="px-10 py-4 rounded-2xl"
              onClick={openModal}
            >
              Schedule Free Consultation
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
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
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/20 blur-3xl rounded-full" />

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

export default Reminder;