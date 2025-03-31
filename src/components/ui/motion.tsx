
import { animate, AnimationOptions, motion as m, MotionProps, useInView, Variants } from "framer-motion";
import { ElementType, forwardRef, ReactElement, ReactNode, Ref, RefAttributes } from "react";

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
