import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  FaProjectDiagram,
  FaSmileBeam,
  FaBullseye,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

const statistics = [
  {
    id: 1,
    value: 30,
    title: "Projects Completed",
    icon: <FaProjectDiagram />,
  },
  {
    id: 2,
    value: 25,
    title: "Happy Clients",
    icon: <FaSmileBeam />,
  },
  {
    id: 3,
    value: 95,
    title: "Success Rate",
    icon: <FaBullseye />,
  },
  {
    id: 4,
    value: 99,
    title: "Timely Delivery",
    icon: <FaChartLine />,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const About = () => {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50 to-white py-20 px-5 sm:px-8"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100/40 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-5 animate-pulse" />

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            About{" "}
            <span className="text-orange-600">
              ElanceForge
            </span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building powerful digital experiences with creativity,
            innovation, and modern technology solutions.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left Side */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <h3 className="text-3xl font-bold mb-6 leading-snug">
              Forging the Future of Digital Excellence
            </h3>

            <div className="space-y-5 text-gray-700 leading-relaxed">
              <p>
                <span className="font-semibold text-orange-600">
                  ElanceForge
                </span>{" "}
                is a modern digital agency helping startups and businesses
                establish a strong online identity through innovative design,
                high-performance websites, and smart digital strategies.
              </p>

              <p>
                We combine creativity with technology to create scalable digital
                products that improve brand visibility, user engagement, and
                business growth.
              </p>

              <p>
                From concept to execution, our focus remains on delivering
                impactful digital experiences that attract, engage, and convert
                audiences effectively.
              </p>
            </div>

            <div className="mt-8">
              <AnimatedButton
                color="orange"
                size="md"
                rounded="rounded-xl"
                onClick={() => navigate("/story")}
              >
                Discover Our Story
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#fff7ed] to-white border border-orange-100 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />

            <h3 className="text-3xl font-bold mb-6 relative z-10">
              Why Choose Us?
            </h3>

            <div className="space-y-5 text-gray-700 leading-relaxed relative z-10">
              <p>
                We create custom digital solutions tailored specifically for
                business growth and long-term success.
              </p>

              <p>
                Our expertise includes high-performance websites, SEO
                optimization, responsive UI/UX, and modern branding strategies
                that help businesses stand out online.
              </p>

              <p>
                With transparent communication, strategic execution, and timely
                delivery, we ensure every project achieves measurable results
                and real-world impact.
              </p>
            </div>

            {/* Decorative Bottom Line */}
            <div className="mt-8 h-1 w-24 bg-orange-500 rounded-full" />
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {statistics.map((item) => (
            <StatsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsCard = memo(({ item }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = Math.ceil(item.value / 45);

    const timer = setInterval(() => {
      start += increment;

      if (start >= item.value) {
        setCounter(item.value);
        clearInterval(timer);
      } else {
        setCounter(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [item.value]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="group bg-white/80 backdrop-blur-lg border border-orange-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl text-orange-600 group-hover:rotate-6 transition-transform duration-300">
          {item.icon}
        </div>
      </div>

      <h4 className="text-4xl font-bold text-orange-600">
        {counter}
        {item.value > 90 ? "%" : "+"}
      </h4>

      <p className="mt-2 text-gray-700 font-medium text-sm">
        {item.title}
      </p>
    </motion.div>
  );
});

export default About;