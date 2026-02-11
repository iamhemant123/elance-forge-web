import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ContactForm from "./ContactForm";
import PopupForm from "./PopupForm";

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Contact = () => {
  return (
    <>
      <section id="contact" className="bg-white px-4 py-16">
        <motion.div
          variants={itemVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            aria-hidden="true"
            className="mx-auto mb-4 w-[110px] h-[5px] bg-orange-600 rounded-full animate-pulse"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Let’s <span className="text-orange-600">Connect</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <EmailCard />

            <Info
              icon={<FaInstagram />}
              title="Instagram"
              text="ElanceForge"
              link="https://www.instagram.com/elanceforge"
            />

            <Info
              icon={<FaLinkedinIn />}
              title="LinkedIn"
              text="ElanceForge"
              link="https://www.linkedin.com/company/elanceforge/"
            />

            <motion.div
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 p-5 rounded-xl bg-gray-50 border"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Business Hours
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Monday – Friday: 9:00 AM – 7:00 PM <br />
                Saturday: 9:00 AM – 4:00 PM <br />
                Sunday: Closed
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <section id="contact-form" className="scroll-mt-30">
              <ContactForm />
            </section>
          </motion.div>
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

  const handleClick = () => {
    if (window.innerWidth >= 1024) {
      window.open(gmailLink, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoLink;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      variants={itemVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border hover:shadow-md transition-all w-full text-left focus:outline-none focus:ring-2 focus:ring-orange-600"
      aria-label="Send email to elanceforge.work@gmail.com"
    >
      <span className="text-orange-600 text-xl" aria-hidden="true">
        <FaEnvelope />
      </span>

      <span>
        <span className="block text-sm text-gray-500">Email</span>
        <span className="block font-medium text-gray-900">
          {email}
        </span>
      </span>
    </motion.button>
  );
};

const Info = ({ icon, title, text, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-orange-600"
      aria-label={`${title} - ${text}`}
    >
      <span className="text-orange-600 text-xl" aria-hidden="true">
        {icon}
      </span>

      <span>
        <span className="block text-sm text-gray-500">{title}</span>
        <span className="block font-medium text-gray-900">{text}</span>
      </span>
    </motion.a>
  );
};

export default Contact;
