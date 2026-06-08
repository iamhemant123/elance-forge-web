import React, { useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  FaHome,
  FaServicestack,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import {
  LayoutDashboard,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

const navigation = [
  {
    name: "Home",
    href: "#home",
    icon: FaHome,
  },
  {
    name: "Services",
    href: "#services",
    icon: FaServicestack,
  },
  {
    name: "About",
    href: "#about",
    icon: FaInfoCircle,
  },
  {
    name: "Contact",
    href: "#contact",
    icon: FaPhoneAlt,
  },
];

const Navbar = () => {

  const scrollToContact =
    useCallback(() => {

      document
        .getElementById(
          "contact-form"
        )
        ?.scrollIntoView({
          behavior:
            "smooth",
        });

    }, []);

  return (

    <Disclosure
      as="nav"
      className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
    >

      {({
        open,
        close,
      }) => (

        <>

          <div className="max-w-7xl mx-auto px-4 sm:px-5">

            <div className="h-16 lg:h-20 flex items-center justify-between">

              {/* Mobile Menu Button */}
              <Disclosure.Button className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm">

                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}

              </Disclosure.Button>

              {/* Logo */}
              <a
                href="#home"
                className="flex items-center"
              >

                <img
                  src="/logo.webp"
                  alt="ElanceForge Logo"
                  loading="eager"
                  decoding="async"
                  className="h-16 lg:h-20 w-auto object-contain"
                />

              </a>

              {/* Desktop Menu */}
              <div className="hidden sm:flex items-center gap-2 lg:gap-3">

                {navigation.map(
                  ({
                    name,
                    href,
                    icon: Icon,
                  }) => (

                    <a
                      key={name}
                      href={href}
                      className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-orange-500 transition-all duration-300"
                    >

                      <Icon className="text-xs" />

                      {name}

                    </a>

                  )
                )}

                {/* User Login */}
                <Link to="/client-login">

                  <button className="flex items-center justify-center gap-2 min-w-[140px] h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm">

                    <User size={16} />

                    User Login

                  </button>

                </Link>

                {/* Admin Login */}
                <Link to="/admin-login">

                  <button className="flex items-center justify-center gap-2 min-w-[140px] h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm">

                    <LayoutDashboard size={16} />

                    Admin Login

                  </button>

                </Link>

                {/* Free Quote */}
                <AnimatedButton
                  color="orange"
                  className="min-w-[140px] h-12 rounded-xl text-sm font-medium flex items-center justify-center transition-all duration-300 hover:scale-105"
                  onClick={
                    scrollToContact
                  }
                >
                  Free Quote
                </AnimatedButton>

              </div>

              <div className="sm:hidden w-10" />

            </div>

          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="sm:hidden px-4 pb-4">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">

              <div className="p-3 space-y-1">

                {navigation.map(
                  ({
                    name,
                    href,
                    icon: Icon,
                  }) => (

                    <a
                      key={name}
                      href={href}
                      onClick={close}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300"
                    >

                      <Icon />

                      {name}

                    </a>

                  )
                )}

                {/* Mobile Buttons */}
                <div className="pt-2 space-y-2">

                  <Link
                    to="/client-login"
                  >

                    <button
                      onClick={close}
                      className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-300"
                    >

                      <User size={16} />

                      User Login

                    </button>

                  </Link>

                  <Link
                    to="/admin-login"
                  >

                    <button
                      onClick={close}
                      className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition-all duration-300"
                    >

                      <LayoutDashboard size={16} />

                      Admin Login

                    </button>

                  </Link>

                  <AnimatedButton
                    color="orange"
                    className="w-full h-12 rounded-xl text-sm font-medium flex items-center justify-center transition-all duration-300"
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