import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaEnvelope />,
    link: "mailto:elanceforge.work@gmail.com",
    label: "Send Email",
  },

  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/elanceforge?igsh=cmdocTUyZGw4OWdm",
    label: "Instagram",
  },

  {
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/company/elanceforge/",
    label: "LinkedIn",
  },
];

const quickLinks = [
  { title: "Home", href: "#home" },
  { title: "Services", href: "#services" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-gray-400">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-300/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 py-16">
        {/* Main Footer */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                E
              </div>

              <h2 className="text-2xl font-bold text-white tracking-wide">
                ElanceForge
              </h2>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-400 max-w-sm">
              ElanceForge is a creative digital agency helping startups and businesses grow through modern design, scalable websites, branding, and result-driven digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <nav aria-label="Footer Navigation">
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm transition-all duration-300 hover:text-orange-400"
                    >
                      <span className="w-0 group-hover:w-3 h-[2px] bg-orange-400 transition-all duration-300" />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Connect With Us
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-sm">
              Stay connected with us for updates, creative ideas, and digital growth solutions.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden w-12 h-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-lg text-white shadow-lg hover:border-orange-400 hover:text-orange-400 transition-all duration-500"
                  aria-label={item.label}
                >
                  <span className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <span className="relative z-10">
                    {item.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} ElanceForge. All rights reserved.
          </p>

          <p className="text-sm text-gray-600">
            Crafted with passion & creativity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;