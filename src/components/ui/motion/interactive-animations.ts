
// Interactive animation variants
export const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [-10, 10, -10], 
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

export const spinAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: 360, 
    transition: { duration: 8, repeat: Infinity, ease: "linear" }
  }
};

export const breatheAnimation = {
  initial: { opacity: 0.7, scale: 0.95 },
  animate: { 
    opacity: [0.7, 1, 0.7], 
    scale: [0.95, 1, 0.95],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

export const glowAnimation = {
  initial: { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
  animate: { 
    boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.8)", "0 0 0 rgba(59, 130, 246, 0)"],
    transition: { duration: 2, repeat: Infinity }
  }
};

export const shimmerAnimation = {
  initial: { backgroundPosition: "-200% 0" },
  animate: { 
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 3, repeat: Infinity, ease: "linear" }
  }
};

export const bounceAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -15, 0],
    transition: { duration: 1, repeat: Infinity, ease: "easeOut" }
  }
};

export const waveAnimation = {
  initial: { rotate: 0 },
  animate: { 
    rotate: [0, 15, -15, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  }
};
