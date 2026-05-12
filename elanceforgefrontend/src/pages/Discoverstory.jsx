import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "../components/ContactForm";
import AnimatedButton from "../components/AnimatedButton";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },

  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const container = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const highlightLastWord = (text) => {
  const words = text.split(" ");
  const lastWord = words.pop();

  return (
    <>
      {words.join(" ")}{" "}
      <span className="text-orange-500">{lastWord}</span>
    </>
  );
};

const Section = memo(({ title, children }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/70 backdrop-blur-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
  >
    {/* Glow */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-200/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <div className="relative z-10">
      <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
        <span className="w-2 h-10 rounded-full bg-orange-500" />
        {highlightLastWord(title)}
      </h2>

      <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
        {children}
      </div>
    </div>
  </motion.div>
));

const DiscoverStory = () => {
  const [openForm, setOpenForm] = useState(false);

  const openModal = useCallback(() => {
    setOpenForm(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpenForm(false);
  }, []);

  return (
    <>
      {/* Main Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-[#eef2ff] to-white py-24 px-5 min-h-screen">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/40 blur-3xl rounded-full" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto space-y-14"
        >
          {/* Hero */}
          <motion.div
            variants={fadeUp}
            className="text-center"
          >
            <div className="mx-auto mb-5 w-28 h-1 bg-orange-500 rounded-full animate-pulse" />

            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-7 text-gray-900">
              {highlightLastWord(
                "Our Story: Forging Success in the Digital Age"
              )}
            </h1>

            <p className="max-w-4xl mx-auto text-gray-600 leading-relaxed text-base md:text-lg">
              ElanceForge was born from a simple yet powerful vision — helping
              businesses grow confidently in the digital world through modern
              technology, creative strategies, and result-driven solutions.
            </p>
          </motion.div>

          {/* Sections */}
          <Section title="The Beginning">
            <p>
              In an era where digital transformation became essential, we saw
              many businesses struggling to establish a strong online presence.
            </p>

            <p>
              ElanceForge was created to bridge that gap by providing powerful,
              accessible, and scalable digital solutions for businesses of all
              sizes.
            </p>
          </Section>

          <Section title="Our Mission">
            <p>
              Our mission is to deliver innovative, ethical, and growth-focused
              digital solutions that create measurable business impact.
            </p>

            <p>
              We believe in sustainable growth, long-term partnerships, and
              meaningful results instead of temporary trends.
            </p>
          </Section>

          <Section title="Our Values">
            <p><strong>Excellence</strong> — We aim for high-quality execution in every project.</p>

            <p><strong>Integrity</strong> — Transparency and honesty define our workflow.</p>

            <p><strong>Innovation</strong> — We continuously adapt to modern technologies and trends.</p>

            <p><strong>Collaboration</strong> — Strong partnerships create stronger outcomes.</p>

            <p><strong>Growth</strong> — We focus on helping businesses scale consistently.</p>
          </Section>

          <Section title="What Sets Us Apart">
            <p><strong>Human-Centered Strategy</strong> — Solutions designed for real people and real engagement.</p>

            <p><strong>Agile Workflow</strong> — Flexible execution with faster adaptation to change.</p>

            <p><strong>Full-Service Expertise</strong> — Everything from branding to development under one roof.</p>

            <p><strong>Data-Driven Decisions</strong> — Strategies backed by insights and performance analysis.</p>
          </Section>

          <Section title="Our Team">
            <p>
              Our team consists of passionate developers, designers, marketers,
              editors, strategists, and creative thinkers working together to
              build impactful digital experiences.
            </p>
          </Section>

          <Section title="Our Growth Journey">
            <p>
              From a growing startup to a trusted digital partner, ElanceForge
              has helped businesses across multiple industries generate growth,
              visibility, and long-term success.
            </p>
          </Section>

          <Section title="Looking Forward">
            <p>
              We continue investing in modern technologies including AI-powered
              automation, advanced analytics, and scalable digital systems to
              help businesses stay ahead in the evolving digital landscape.
            </p>
          </Section>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[32px] bg-[#050505] py-20 px-6 text-center shadow-2xl"
          >
            {/* Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
                {highlightLastWord("Join the ElanceForge Family")}
              </h2>

              <p className="max-w-3xl mx-auto text-gray-400 leading-relaxed mb-10">
                Whether you're a startup, entrepreneur, or growing business,
                let’s work together and build your next digital success story.
              </p>

              <AnimatedButton
                color="orange"
                className="px-10 py-4 rounded-2xl"
                onClick={openModal}
              >
                Get in Touch
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Popup */}
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
            onClick={closeModal}
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
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300/20 blur-3xl rounded-full" />

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

export default DiscoverStory;