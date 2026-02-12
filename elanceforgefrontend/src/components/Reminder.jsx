import React, { useState, useCallback } from "react";
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
      <section className="w-full bg-black py-20 text-center px-4">
        <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-6">
          Ready to Transform Your Business?
        </h2>

        <p className="text-gray-300 max-w-3xl mx-auto mb-8">
          Let's discuss how our digital marketing expertise can help you achieve
          your business goals. Get a free consultation today.
        </p>

        <AnimatedButton
          color="yellow"
          size="md"
          rounded="rounded-md"
          onClick={openModal}
        >
          Schedule Free Consultation
        </AnimatedButton>
      </section>

      {openForm && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          {/* 👇 RELATIVE WRAPPER */}
          <div
            className="relative w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ CLOSE BUTTON — ALWAYS TOP RIGHT */}
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

export default Reminder;