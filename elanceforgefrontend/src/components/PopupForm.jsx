import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

const PopupForm = () => {
  const [open, setOpen] = useState(false);

  // Auto popup
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4">
      
      {/* FORM WRAPPER */}
      <div className="relative w-full max-w-xl">
        
        {/* ❌ CLOSE BUTTON — ALWAYS TOP RIGHT */}
        <button
          onClick={() => setOpen(false)}
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

        <ContactForm />
      </div>
    </div>
  );
};

export default PopupForm;