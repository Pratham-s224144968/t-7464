
// Complex animation variants
export const popIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: [0, 1.1, 1],
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

export const elasticEntry = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: [0, 1.2, 0.9, 1.1, 0.95, 1],
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export const flipIn = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: { 
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const blurIn = {
  hidden: { filter: "blur(12px)", opacity: 0 },
  visible: { 
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

export const expandIn = {
  hidden: { height: 0, opacity: 0 },
  visible: { 
    height: "auto",
    opacity: 1,
    transition: { duration: 0.7 }
  }
};

export const rainbowText = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 8, repeat: Infinity, ease: "linear" }
  }
};

export const rotateAndPulse = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.05, 1],
    rotate: [0, 5, 0, -5, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
  }
};

export const staggerFadeIn = (staggerChildren = 0.2, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const typingAnimation = {
  hidden: { width: "0%" },
  visible: { 
    width: "100%",
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export const backgroundShift = {
  hidden: { backgroundPosition: "0% 50%" },
  visible: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 10, repeat: Infinity, ease: "linear" }
  }
};

// Add particle effects for backgrounds
export const createParticleEffect = (count = 20, baseSize = 4) => {
  const generateParticle = (index: number) => {
    const size = Math.random() * baseSize + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    return `
      .particle-${index} {
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: float ${duration}s infinite ease-in-out ${delay}s;
        pointer-events: none;
      }
    `;
  };
  
  let styles = `
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
      25% { opacity: 0.5; }
      50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg); opacity: 0.8; }
      75% { opacity: 0.5; }
      100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
    }
  `;
  
  for (let i = 0; i < count; i++) {
    styles += generateParticle(i);
  }
  
  return styles;
};
