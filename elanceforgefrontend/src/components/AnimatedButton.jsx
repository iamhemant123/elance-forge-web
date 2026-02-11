import { motion } from "framer-motion";

const colorStyles = {
  orange: {
    gradient: "from-orange-950 via-orange-400 to-orange-600",
    glow: "bg-orange-500",
    text: "text-white",
  },
  yellow: {
    gradient: "from-yellow-950 via-yellow-300 to-yellow-500",
    glow: "bg-yellow-400",
    text: "text-black",
  },
  gray: {
    gradient: "from-gray-950 via-gray-400 to-gray-600",
    glow: "bg-gray-500",
    text: "text-white",
  },
};

const AnimatedButton = ({
  children,
  onClick,
  color = "orange",
  className = "",
  type = "button",
}) => {
  const styles = colorStyles[color] || colorStyles.orange;

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-8 py-3 rounded-md font-semibold overflow-hidden shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${styles.text} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} bg-[length:300%_300%] animate-liveGradient`}
      />

      <span
        aria-hidden="true"
        className={`absolute inset-0 ${styles.glow} blur-xl opacity-40 animate-pulse`}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default AnimatedButton;
