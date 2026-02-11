import React, { useRef, useState, useEffect, useCallback } from "react";
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
        We build <b>professional websites</b> using <b>WordPress</b> and{" "}
        <b>MERN Stack</b> that are <b>fast-loading</b>, <b>mobile-friendly</b>,{" "}
        <b>SEO-optimized</b>, and <b>secure</b>, helping businesses grow their{" "}
        <b>online presence</b> and improve <b>user engagement</b>.
      </>
    ),
    icon: FaCode,
    color: "#ff8c00",
  },
  {
    title: "UI / UX Design",
    desc: (
      <>
        We create <b>user-focused UI/UX designs</b> that enhance <b>usability</b>,{" "}
        improve <b>user experience</b>, and increase <b>conversion rates</b>{" "}
        through <b>modern layouts</b>, <b>clean interfaces</b>, and{" "}
        <b>intuitive navigation</b>.
      </>
    ),
    icon: FaPaintBrush,
    color: "#ffd800",
  },
  {
    title: "Graphic Design",
    desc: (
      <>
        Our <b>graphic design services</b> include <b>logo design</b>,{" "}
        <b>brand identity</b>, <b>animations</b>, and{" "}
        <b>social media creatives</b> that help brands stand out and build a{" "}
        <b>strong visual identity</b>.
      </>
    ),
    icon: FaPalette,
    color: "#ff4646",
  },
  {
    title: "Digital Marketing",
    desc: (
      <>
        We provide <b>digital marketing services</b> like <b>SEO</b>,{" "}
        <b>social media marketing</b>, <b>Google Ads</b>, and{" "}
        <b>lead generation</b> strategies to boost <b>brand visibility</b>,{" "}
        drive <b>targeted traffic</b>, and increase <b>sales</b>.
      </>
    ),
    icon: FaBullhorn,
    color: "#ffaa00",
  },
  {
    title: "Performance & SEO",
    desc: (
      <>
        We optimize <b>website performance</b> by improving <b>page speed</b>,{" "}
        <b>technical SEO</b>, and <b>user experience</b>, helping your website{" "}
        rank higher on <b>search engines</b>.
      </>
    ),
    icon: FaBolt,
    color: "#ff7828",
  },
  {
    title: "Video Editing",
    desc: (
      <>
        We offer <b>professional video editing</b> services including{" "}
        <b>promotional videos</b>, <b>reels</b>, <b>YouTube editing</b>,{" "}
        <b>motion graphics</b>, and <b>short-form content</b> that boost{" "}
        <b>engagement</b>.
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
    const handleChange = () => setIsDesktop(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDesktop) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({
            index: Number(e.target.dataset.index),
            distance: Math.abs(
              e.boundingClientRect.top +
                e.boundingClientRect.height / 2 -
                window.innerHeight / 2
            ),
          }));

        if (visible.length) {
          visible.sort((a, b) => a.distance - b.distance);
          setActiveIndex(visible[0].index);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-35% 0px -35% 0px",
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
      className="bg-gradient-to-br from-black via-[#050b18] to-black py-24 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div
            aria-hidden="true"
            className="mx-auto mb-4 w-[120px] h-[6px] bg-orange-600 rounded-full animate-pulse"
          />
          <h2 className="text-4xl font-bold mb-2">
            Our <span className="text-orange-600">Digital Services</span>
          </h2>
          <p className="text-gray-400">
            Simple, powerful solutions to grow your business online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const isActive = activeIndex === index;

            const activeAnim = {
              y: -6,
              scale: 1.04,
              opacity: 1,
              boxShadow: `0 0 26px ${service.color}`,
            };

            const idleAnim = {
              y: 0,
              scale: 1,
              opacity: 0.6,
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
                    ? activeAnim
                    : idleAnim
                }
                whileHover={
                  isDesktop
                    ? {
                        ...activeAnim,
                        transition: { duration: 0.08, ease: "easeOut" },
                      }
                    : undefined
                }
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="bg-[#050b18] border border-gray-800 rounded-2xl p-8 will-change-transform"
              >
                <div
                  className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center text-2xl text-white"
                  style={{
                    background: service.color,
                    boxShadow: `0 0 14px ${service.color}`,
                  }}
                >
                  <service.icon aria-hidden="true" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
