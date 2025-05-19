
import { animate, AnimationOptions, motion as m, MotionProps, useInView, Variants } from "framer-motion";
import { ElementType, forwardRef, ReactNode, Ref, RefAttributes } from "react";

type MotionComponentProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  src?: string;
  alt?: string;
};

// Basic motion components with extended props
export const motion = {
  div: (props: MotionComponentProps) => <m.div {...props} />,
  span: (props: MotionComponentProps) => <m.span {...props} />,
  h1: (props: MotionComponentProps) => <m.h1 {...props} />,
  h2: (props: MotionComponentProps) => <m.h2 {...props} />,
  h3: (props: MotionComponentProps) => <m.h3 {...props} />,
  h4: (props: MotionComponentProps) => <m.h4 {...props} />,
  p: (props: MotionComponentProps) => <m.p {...props} />,
  button: (props: MotionComponentProps) => <m.button {...props} />,
  a: (props: MotionComponentProps) => <m.a {...props} />,
  ul: (props: MotionComponentProps) => <m.ul {...props} />,
  li: (props: MotionComponentProps) => <m.li {...props} />,
  img: (props: MotionComponentProps) => <m.img {...props} />,
  section: (props: MotionComponentProps) => <m.section {...props} />,
  header: (props: MotionComponentProps) => <m.header {...props} />,
  footer: (props: MotionComponentProps) => <m.footer {...props} />,
  nav: (props: MotionComponentProps) => <m.nav {...props} />,
  main: (props: MotionComponentProps) => <m.main {...props} />,
  article: (props: MotionComponentProps) => <m.article {...props} />,
  aside: (props: MotionComponentProps) => <m.aside {...props} />,
  form: (props: MotionComponentProps) => <m.form {...props} />,
  input: (props: MotionComponentProps) => <m.input {...props} />,
  textarea: (props: MotionComponentProps) => <m.textarea {...props} />,
  select: (props: MotionComponentProps) => <m.select {...props} />,
  label: (props: MotionComponentProps) => <m.label {...props} />,
  path: (props: MotionComponentProps) => <m.path {...props} />,
  svg: (props: MotionComponentProps) => <m.svg {...props} />,
  rect: (props: MotionComponentProps) => <m.rect {...props} />,
  circle: (props: MotionComponentProps) => <m.circle {...props} />,
};

// Export the inView hook for use outside this file
export { useInView, animate };

// Export common animation variants
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

export const slideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const slideDown = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const zoomIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

export const rotateIn = {
  hidden: { rotate: -90, opacity: 0 },
  visible: { rotate: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const slideFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

// New animation variants
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
