import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import AnimatedButton from "../components/AnimatedButton";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const highlightLastWord = (text) => {
  const words = text.split(" ");
  const lastWord = words.pop();
  return (
    <>
      {words.join(" ")}{" "}
      <span className="text-orange-600">{lastWord}</span>
    </>
  );
};

const Section = memo(({ title, children }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/40"
  >
    <h2 className="text-3xl font-bold mb-6 border-l-4 border-orange-600 pl-4">
      {highlightLastWord(title)}
    </h2>
    <div className="text-gray-700 space-y-4 leading-relaxed">
      {children}
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
      {/* ================= MAIN CONTENT ================= */}
      <section className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 py-20 px-6 min-h-screen">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-14"
        >
          <motion.div variants={fadeUp} className="text-center">
            <div
              aria-hidden="true"
              className="mb-4 w-[120px] h-[5px] bg-orange-600 rounded-full animate-pulse mx-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {highlightLastWord(
                "Our Story: Forging Success in the Digital Age"
              )}
            </h1>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              ElanceForge was born from a simple yet powerful vision: to empower
              businesses of all sizes to thrive in the digital landscape.
              Founded by a team of passionate digital marketing professionals
              who witnessed countless businesses struggling to navigate the
              complexities of online marketing.
            </p>
          </motion.div>

          <Section title="The Beginning">
            <p>
              In an era where digital transformation was no longer optional but
              essential, we recognized a critical gap in the market.
            </p>
            <p>
              ElanceForge emerged as the answer—an agency committed to
              democratizing access to world-class marketing strategies.
            </p>
          </Section>

          <Section title="Our Mission">
            <p>
              Our mission is to deliver innovative, ethical, and effective
              digital marketing solutions that drive real business growth.
            </p>
            <p>
              We focus on sustainable success, not vanity metrics.
            </p>
          </Section>

          <Section title="Our Values">
            <p><strong>Excellence</strong> – We pursue excellence in every project.</p>
            <p><strong>Integrity</strong> – Transparency and honesty guide us.</p>
            <p><strong>Innovation</strong> – We embrace new technologies.</p>
            <p><strong>Collaboration</strong> – We build real partnerships.</p>
            <p><strong>Education</strong> – We empower clients with knowledge.</p>
          </Section>

          <Section title="What Sets Us Apart">
            <p><strong>Human-Centered Marketing</strong> – Campaigns that connect.</p>
            <p><strong>Agile Methodology</strong> – Rapid adaptation to change.</p>
            <p><strong>Full-Service Capabilities</strong> – Everything under one roof.</p>
            <p><strong>Measurable Impact</strong> – Data-driven decisions.</p>
          </Section>

          <Section title="Our Team">
            <p>
              A diverse team of SEO experts, PPC managers, designers,
              developers, content creators, and analysts.
            </p>
          </Section>

          <Section title="Our Growth Journey">
            <p>
              From startup to trusted partner across industries and
              geographies, generating countless qualified leads.
            </p>
          </Section>

          <Section title="Looking Forward">
            <p>
              Investing in AI-powered automation, predictive analytics, and
              emerging technologies.
            </p>
          </Section>

          {/* ================= CTA ================= */}
          <motion.div
            variants={fadeUp}
            className="text-center bg-gray-800 text-white py-16 rounded-3xl shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              {highlightLastWord("Join the ElanceForge Family")}
            </h2>

            <p className="max-w-3xl mx-auto mb-8 text-gray-300">
              Whether you're a startup or an established company, let's forge
              your digital success story together.
            </p>

            <AnimatedButton
              color="orange"
              size="md"
              rounded="rounded-full"
              className="px-10 py-3 shadow-lg"
              onClick={openModal}
            >
              Get in Touch
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= POPUP ================= */}
      {openForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ CLOSE BUTTON */}
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
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default DiscoverStory;