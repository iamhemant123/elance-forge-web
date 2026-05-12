import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaPaintBrush,
  FaPalette,
  FaBullhorn,
  FaBolt,
  FaVideo,
} from "react-icons/fa";

const services = [
  {
    title: "Web Development",
    desc: (
      <>
        We build <b>professional websites</b> using <b>WordPress</b> and <b>MERN Stack</b> that are <b>fast-loading</b>, <b>mobile-friendly</b>, <b>SEO-optimized</b>, and <b>secure</b>, helping businesses grow their <b>online presence</b> and improve <b>user engagement</b>.
      </>
    ),
    icon: FaCode,
    color: "#ff8c00",
  },

  {
    title: "UI / UX Design",
    desc: (
      <>
        We create <b>user-focused UI/UX designs</b> that enhance <b>usability</b>, improve <b>user experience</b>, and increase <b>conversion rates</b> through <b>modern layouts</b>, <b>clean interfaces</b>, and <b>intuitive navigation</b>.
      </>
    ),
    icon: FaPaintBrush,
    color: "#ffd800",
  },

  {
    title: "Graphic Design",
    desc: (
      <>
        Our <b>graphic design services</b> include <b>logo design</b>, <b>brand identity</b>, <b>animations</b>, and <b>social media creatives</b> that help brands stand out and build a <b>strong visual identity</b>.
      </>
    ),
    icon: FaPalette,
    color: "#ff4646",
  },

  {
    title: "Digital Marketing",
    desc: (
      <>
        We provide <b>digital marketing services</b> like <b>SEO</b>, <b>social media marketing</b>, <b>Google Ads</b>, and <b>lead generation</b> strategies to boost <b>brand visibility</b>, drive <b>targeted traffic</b>, and increase <b>sales</b>.
      </>
    ),
    icon: FaBullhorn,
    color: "#ffaa00",
  },

  {
    title: "Performance & SEO",
    desc: (
      <>
        We optimize <b>website performance</b> by improving <b>page speed</b>, <b>technical SEO</b>, and <b>user experience</b>, helping your website rank higher on <b>search engines</b>.
      </>
    ),
    icon: FaBolt,
    color: "#ff7828",
  },

  {
    title: "Video Editing",
    desc: (
      <>
        We offer <b>professional video editing</b> services including <b>promotional videos</b>, <b>reels</b>, <b>YouTube editing</b>, <b>motion graphics</b>, and <b>short-form content</b> that boost <b>engagement</b>.
      </>
    ),
    icon: FaVideo,
    color: "#9b5cff",
  },
];

const Service = () => {
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const handleChange = () => {
      setIsDesktop(media.matches);
    };

    handleChange();

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCards = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            index: Number(entry.target.dataset.index),
            distance: Math.abs(
              entry.boundingClientRect.top +
                entry.boundingClientRect.height / 2 -
                window.innerHeight / 2
            ),
          }));

        if (visibleCards.length) {
          visibleCards.sort((a, b) => a.distance - b.distance);
          setActiveIndex(visibleCards[0].index);
        }
      },
      {
        threshold: 0.25,
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-br from-[#020817] via-[#07111f] to-black py-24 text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/10 blur-3xl rounded-full" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="mx-auto mb-5 w-28 h-1 bg-orange-500 rounded-full animate-pulse" />

          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Our <span className="text-orange-500">Digital Services</span>
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Powerful digital solutions crafted to help businesses scale faster,
            improve engagement, and build a strong online presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            const activeAnimation = {
              y: -8,
              scale: 1.03,
              opacity: 1,
              boxShadow: `0 0 35px ${service.color}40`,
            };

            const idleAnimation = {
              y: 0,
              scale: 1,
              opacity: 0.7,
              boxShadow: "none",
            };

            return (
              <motion.div
                key={service.title}
                ref={(el) => (cardsRef.current[index] = el)}
                data-index={index}
                animate={
                  isDesktop
                    ? { opacity: 1 }
                    : isActive
                    ? activeAnimation
                    : idleAnimation
                }
                whileHover={
                  isDesktop
                    ? {
                        ...activeAnimation,
                        transition: {
                          duration: 0.18,
                          ease: "easeOut",
                        },
                      }
                    : undefined
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-xl hover:border-orange-400/30 transition-all duration-500"
              >
                {/* Glow */}
                <div
                  className="absolute top-0 right-0 w-36 h-36 blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-500"
                  style={{ background: service.color }}
                />

                {/* Icon */}
                <div
                  className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl text-2xl text-white mb-7 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: service.color,
                    boxShadow: `0 0 25px ${service.color}`,
                  }}
                >
                  <service.icon aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-300 leading-relaxed text-[15px]">
                  {service.desc}
                </p>

                {/* Bottom Line */}
                <div
                  className="relative z-10 mt-7 h-[3px] w-14 rounded-full transition-all duration-500 group-hover:w-24"
                  style={{ background: service.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;