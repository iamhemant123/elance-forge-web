import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const element = document.getElementById(hash.replace("#", ""));
    if (!element) return;

    const timeout = setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => clearTimeout(timeout);
  }, [hash]);

  return null;
};

export default ScrollToHash;
