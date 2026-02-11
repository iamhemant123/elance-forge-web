import React, { useCallback } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaHome, FaServicestack, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import AnimatedButton from "../components/AnimatedButton";

const navigation = [
  { name: "Home", href: "#home", icon: FaHome },
  { name: "Services", href: "#services", icon: FaServicestack },
  { name: "About", href: "#about", icon: FaInfoCircle },
  { name: "Contact", href: "#contact", icon: FaPhoneAlt },
];

const Navbar = () => {
  const scrollToContact = useCallback(() => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 w-full z-50 bg-white/95 shadow-md backdrop-blur-sm"
    >
      {({ open, close }) => (
        <>
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <Disclosure.Button
                className="sm:hidden focus:outline-none focus:ring-2 focus:ring-orange-600 rounded"
                aria-label="Toggle navigation menu"
              >
                {open ? (
                  <XMarkIcon className="h-8 w-8 text-gray-900" />
                ) : (
                  <Bars3Icon className="h-8 w-8 text-gray-900" />
                )}
              </Disclosure.Button>

              <img
                src="/logo.webp"
                alt="Elance Forge logo"
                width="150"
                height="60"
                decoding="async"
                loading="eager"
                className="h-[100px] w-auto"
              />

              <div className="hidden sm:flex items-center gap-8">
                {navigation.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    className="flex items-center gap-2 font-semibold text-gray-900 hover:text-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-600 rounded"
                  >
                    <Icon aria-hidden="true" />
                    {name}
                  </a>
                ))}

                <AnimatedButton
                  color="orange"
                  rounded="rounded-full"
                  size="sm"
                  onClick={scrollToContact}
                >
                  Free Quote
                </AnimatedButton>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden absolute top-16 left-4 w-60 bg-white rounded-xl shadow-lg py-3">
            {navigation.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                onClick={close}
                className="flex items-center gap-3 px-5 py-3 font-semibold text-gray-900 hover:bg-orange-100 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-orange-600"
              >
                <Icon aria-hidden="true" />
                {name}
              </a>
            ))}

            <div className="px-5 mt-3">
              <AnimatedButton
                color="orange"
                rounded="rounded-full"
                size="sm"
                className="w-full"
                onClick={() => {
                  scrollToContact();
                  close();
                }}
              >
                Free Quote
              </AnimatedButton>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
