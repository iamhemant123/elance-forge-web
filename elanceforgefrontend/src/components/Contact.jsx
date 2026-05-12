import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaClock } from "react-icons/fa";
import ContactForm from "./ContactForm";
import PopupForm from "./PopupForm";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = () => {
  return (
    <>
      <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white py-20 px-5 sm:px-8">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-200/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/30 blur-3xl rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="mx-auto mb-5 w-28 h-1 bg-orange-500 rounded-full animate-pulse" />

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
              Let’s <span className="text-orange-600">Connect</span>
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-gray-600 leading-relaxed">
              Let’s discuss your ideas, projects, and business goals. We’re here to help you build impactful digital solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <EmailCard />

              <ContactInfoCard
                icon={<FaInstagram />}
                title="Instagram"
                text="@ElanceForge"
                link="https://www.instagram.com/elanceforge"
              />

              <ContactInfoCard
                icon={<FaLinkedinIn />}
                title="LinkedIn"
                text="ElanceForge"
                link="https://www.linkedin.com/company/elanceforge/"
              />

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white/70 backdrop-blur-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/30 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl">
                      <FaClock />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      Business Hours
                    </h3>
                  </div>

                  <div className="space-y-2 text-gray-700">
                    <p>Monday – Friday : 9:00 AM – 7:00 PM</p>
                    <p>Saturday : 9:00 AM – 4:00 PM</p>
                    <p>Sunday : Closed</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-3xl border border-orange-100 bg-white/70 backdrop-blur-xl p-6 shadow-xl"
            >
              <section id="contact-form" className="scroll-mt-32">
                <ContactForm />
              </section>
            </motion.div>
          </div>
        </div>
      </section>

      <PopupForm />
    </>
  );
};

const EmailCard = () => {
  const email = "elanceforge.work@gmail.com";
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  const mailtoLink = `mailto:${email}`;

  const handleMailOpen = () => {
    if (window.innerWidth >= 1024) {
      window.open(gmailLink, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoLink;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleMailOpen}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden w-full rounded-3xl border border-orange-100 bg-white/70 backdrop-blur-xl p-5 text-left shadow-lg hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
      aria-label={`Send email to ${email}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/30 rounded-full blur-2xl" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl group-hover:rotate-6 transition-transform duration-300">
          <FaEnvelope />
        </div>

        <div>
          <p className="text-sm text-gray-500">Email Address</p>
          <p className="font-semibold text-gray-900">{email}</p>
        </div>
      </div>
    </motion.button>
  );
};

const ContactInfoCard = ({ icon, title, text, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative overflow-hidden flex items-center gap-4 rounded-3xl border border-orange-100 bg-white/70 backdrop-blur-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500"
      aria-label={`${title} - ${text}`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100/30 rounded-full blur-2xl" />

      <div className="relative z-10 w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl group-hover:rotate-6 transition-transform duration-300">
        {icon}
      </div>

      <div className="relative z-10">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold text-gray-900">{text}</p>
      </div>
    </motion.a>
  );
};

export default Contact;