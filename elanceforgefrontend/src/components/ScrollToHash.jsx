import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const scrollToElement = () => {
      const targetElement = document.getElementById(
        hash.replace("#", "")
      );

      if (!targetElement) return;

      const navbarOffset = 90;

      const elementPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset;

      const scrollPosition =
        elementPosition - navbarOffset;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    };

    const timer = setTimeout(() => {
      scrollToElement();
    }, 120);

    return () => clearTimeout(timer);
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;