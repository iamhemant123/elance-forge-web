import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import {
  FaProjectDiagram,
  FaSmile,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

const statsData = [
  { value: 30, label: "Projects Completed", icon: <FaProjectDiagram /> },
  { value: 25, label: "Happy Clients", icon: <FaSmile /> },
  { value: 95, label: "Success Rate", icon: <FaBullseye /> },
  { value: 99, label: "Timely Delivery", icon: <FaChartLine /> },
];

const fadeTop = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
};

const fadeBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="w-full bg-gradient-to-br from-white via-[#f5f7ff] to-white text-gray-900 px-5 sm:px-6 py-16 sm:py-20 md:py-14 flex flex-col items-center"
    >
      <div
        aria-hidden="true"
        className="mb-3 w-[100px] h-[5px] bg-orange-500 rounded-full animate-pulse"
      />

      <motion.h2
        variants={fadeTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl font-bold mb-10"
      >
        About <span className="text-orange-600">ElanceForge</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="space-y-5"
        >
          <h3 className="text-2xl font-semibold">
            Forging the Future of Digital Excellence
          </h3>

          <p className="text-gray-700">
            <span className="font-semibold text-orange-600">ElanceForge</span> is a results-driven
            <span className="font-semibold text-orange-600"> digital agency </span>
            empowering startups and small businesses to build a strong online presence through
            <span className="font-semibold text-orange-600"> creative design</span>,
            <span className="font-semibold text-orange-600"> modern websites</span>, and
            <span className="font-semibold text-orange-600"> strategic digital marketing</span>.
          </p>

          <p className="text-gray-700">
            We blend creativity and technology to deliver
            <span className="font-semibold text-orange-600"> scalable digital solutions</span> that
            enhance
            <span className="font-semibold text-orange-600"> brand visibility</span>,
            <span className="font-semibold text-orange-600"> user experience</span>, and
            <span className="font-semibold text-orange-600"> business growth</span>.
          </p>

          <p className="text-gray-700">
            From idea to execution, ElanceForge focuses on crafting impactful
            digital experiences that help businesses attract, engage, and
            convert their target audience effectively.
          </p>

          <AnimatedButton
            color="orange"
            size="md"
            rounded="rounded-lg"
            onClick={() => navigate("/story")}
          >
            Discover Our Story
          </AnimatedButton>
        </motion.div>

        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.9 }}
          className="bg-white border border-gray-200 rounded-2xl p-7 shadow-xl"
        >
          <h3 className="text-2xl font-semibold mb-4">
            Why Choose Us?
          </h3>

          <p className="text-gray-800 leading-relaxed">
            We provide custom <span className="text-orange-600 font-semibold"> digital solutions</span> tailored to
            meet your business goals and drive measurable growth.
            Our approach focuses on building <span className="text-orange-600 font-semibold">high-performance websites</span>,
            improving <span className="text-orange-600 font-semibold">SEO rankings</span>, and enhancing
            <span className="text-orange-600 font-semibold"> user experience</span>. <br /><br />
            We believe in transparent communication,
            <span className="text-orange-600 font-semibold"> strategic planning</span>, and
            <span className="text-orange-600 font-semibold"> on-time delivery</span> —
            helping businesses achieve long-term
            <span className="text-orange-600 font-semibold"> digital success</span>.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 md:mt-16 max-w-6xl w-full">
        {statsData.map((item) => (
          <StatBox key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
};

const StatBox = memo(({ item }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(item.value / 40);

    const interval = setInterval(() => {
      current += step;
      if (current >= item.value) {
        setCount(item.value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [item.value]);

  return (
    <motion.div
      variants={fadeBottom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="bg-[#fff7ed] border border-orange-200 rounded-xl p-6 text-center shadow-md"
    >
      <div className="flex justify-center items-center text-3xl text-orange-600 mb-2">
        {item.icon}
      </div>

      <p className="text-3xl font-bold text-orange-600">
        {count}{item.value > 90 ? "%" : "+"}
      </p>

      <p className="text-gray-700 font-medium text-sm">
        {item.label}
      </p>
    </motion.div>
  );
});

export default About;
