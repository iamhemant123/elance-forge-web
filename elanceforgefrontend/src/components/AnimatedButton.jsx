import { motion } from "framer-motion";

const buttonThemes = {
  orange: {
    gradient: "from-orange-700 via-orange-500 to-orange-600",
    glow: "bg-orange-500/50",
    ring: "focus:ring-orange-400",
    text: "text-white",
  },

  yellow: {
    gradient: "from-yellow-600 via-yellow-400 to-yellow-500",
    glow: "bg-yellow-400/50",
    ring: "focus:ring-yellow-300",
    text: "text-black",
  },

  gray: {
    gradient: "from-gray-700 via-gray-500 to-gray-600",
    glow: "bg-gray-500/40",
    ring: "focus:ring-gray-400",
    text: "text-white",
  },
};

const AnimatedButton = ({ children, onClick, color = "orange", className = "", type = "button", disabled = false }) => {
  const currentTheme = buttonThemes[color] || buttonThemes.orange;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`group relative overflow-hidden px-8 py-3 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentTheme.ring} ${currentTheme.text} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {/* Animated Gradient */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-r ${currentTheme.gradient} bg-[length:300%_300%] animate-liveGradient`}
      />

      {/* Glow Effect */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500 ${currentTheme.glow}`}
      />

      {/* Shine Sweep */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-[-120%] h-full w-[120%] rotate-12 bg-white/20 transition-all duration-700 group-hover:left-[120%]"
      />

      {/* Inner Border */}
      <span
        aria-hidden="true"
        className="absolute inset-[1px] rounded-xl border border-white/10"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;