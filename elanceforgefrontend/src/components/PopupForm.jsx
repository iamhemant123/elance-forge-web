import React, { useEffect, useState, useCallback } from "react";
import ContactForm from "./ContactForm";

const PopupForm = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <ContactForm onClose={handleClose} />
      </div>
    </div>
  );
};

export default PopupForm;
