import React, { useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaHome, FaServicestack, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

const navigation = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "Services", href: "#services", icon: FaServicestack },
  { name: "About", href: "#about", icon: FaInfoCircle },
  { name: "Contact", href: "#contact", icon: FaPhoneAlt },
];

const Navbar = () => {

  const scrollToContact = useCallback(() => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl shadow-lg">

      {({ open, close }) => (
        <>

          <div className="max-w-7xl mx-auto px-5">

            <div className="h-20 flex items-center justify-between">

              {/* Mobile Menu */}

              <Disclosure.Button className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 bg-white shadow-md text-gray-900">

                {open ? (
                  <XMarkIcon className="h-7 w-7" />
                ) : (
                  <Bars3Icon className="h-7 w-7" />
                )}

              </Disclosure.Button>

              {/* Logo */}

              <a href="#home" className="flex items-center">

                <img
                  src="/logo.webp"
                  alt="Elance Forge Logo"
                  width="170"
                  height="70"
                  loading="eager"
                  decoding="async"
                  className="h-[95px] w-auto object-contain drop-shadow-lg hover:scale-105 transition-all duration-300"
                />

              </a>

              {/* Desktop Menu */}

              <div className="hidden sm:flex items-center gap-3 md:gap-5 lg:gap-7">

                {navigation.map(({ name, href, icon: Icon }) => (

                  <a
                    key={name}
                    href={href}
                    className="group relative flex items-center gap-2 px-3 py-2 text-[15px] font-semibold text-gray-800 transition-all duration-300 hover:text-orange-600"
                  >

                    <Icon className="text-sm transition-transform duration-300 group-hover:-translate-y-[2px]" />

                    <span>{name}</span>

                    <span className="absolute left-3 -bottom-[2px] h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-[70%]" />

                  </a>

                ))}

                {/* Admin Button */}

                <Link to="/admin-login">

                  <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300">

                    <LayoutDashboard size={18} />

                    Admin Panel

                  </button>

                </Link>

                {/* Quote Button */}

                <AnimatedButton
                  color="orange"
                  className="px-6 py-3 rounded-full"
                  onClick={scrollToContact}
                >
                  Free Quote
                </AnimatedButton>

              </div>

              {/* Spacer */}

              <div className="sm:hidden w-11" />

            </div>
          </div>

          {/* Mobile Menu */}

          <Disclosure.Panel className="sm:hidden px-4 pb-5">

            <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white/90 backdrop-blur-xl shadow-2xl">

              <div className="flex flex-col p-3">

                {navigation.map(({ name, href, icon: Icon }) => (

                  <a
                    key={name}
                    href={href}
                    onClick={close}
                    className="group flex items-center gap-3 rounded-2xl px-4 py-4 text-gray-900 font-semibold transition-all duration-300 hover:bg-orange-50 hover:text-orange-600"
                  >

                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 text-orange-600 group-hover:scale-110 transition-transform duration-300">

                      <Icon />

                    </div>

                    <span>{name}</span>

                  </a>

                ))}

                {/* Mobile Buttons */}

                <div className="mt-3 px-2 pb-2 flex flex-col gap-3">

                  <Link to="/admin-login">

                    <button
                      onClick={close}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 bg-black text-white font-semibold shadow-lg"
                    >

                      <LayoutDashboard size={18} />

                      Admin Panel

                    </button>

                  </Link>

                  <AnimatedButton
                    color="orange"
                    className="w-full rounded-2xl py-3"
                    onClick={() => {
                      scrollToContact();
                      close();
                    }}
                  >
                    Free Quote
                  </AnimatedButton>

                </div>

              </div>
            </div>

          </Disclosure.Panel>

        </>
      )}

    </Disclosure>
  );
};

export default Navbar;