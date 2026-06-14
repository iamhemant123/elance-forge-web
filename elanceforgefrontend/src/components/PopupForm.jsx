import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";

const PopupForm = () => {
  const [open, setOpen] = useState(false);

  // Auto Open Popup
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
         className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center px-4 py-6"
        >
          {/* Popup Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-md sm:max-w-xl lg:max-w-2xl"
          >
            {/* Background Glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300/20 blur-3xl rounded-full" />

            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close popup"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white text-black text-lg sm:text-xl font-bold shadow-lg transition-all duration-300 hover:bg-orange-500 hover:text-white hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              ✕
            </button>

            {/* Form */}
            <div className="relative z-10">
              <ContactForm onClose={() => setOpen(false)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;