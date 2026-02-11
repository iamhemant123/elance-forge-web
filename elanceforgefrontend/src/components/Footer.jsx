import React from "react";
import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h2 className="text-white text-xl font-semibold">
              Elance Forge
            </h2>
            <p className="mt-2 text-sm max-w-sm text-gray-400">
              ElanceForge is a creative digital agency that helps startups and small businesses grow through professional design, high-performance websites, and result-driven digital marketing.
            </p>
          </div>

          <nav aria-label="Footer Navigation">
            <h3 className="text-white font-medium mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-white font-medium mb-2">
              Connect With Us
            </h3>

            <div className="flex gap-4 mt-3">
              <a
                href="mailto:elanceforge.work@gmail.com"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 text-white transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Send email to Elance Forge"
              >
                <FaEnvelope aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/elanceforge?igsh=cmdocTUyZGw4OWdm"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 text-white transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Visit Elance Forge Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/company/elanceforge/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-500 text-white transition focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Visit Elance Forge LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Elance Forge. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
