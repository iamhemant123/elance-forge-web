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
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ContactForm onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Reminder;
