
import { animate, AnimationOptions, motion as m, MotionProps, useInView, Variants } from "framer-motion";
import { ElementType, forwardRef, ReactElement, ReactNode, Ref, RefAttributes, useRef } from "react";

type MotionPropsWithChildren = MotionProps & {
  children?: ReactNode;
};

// Basic motion components
export const motion = {
  div: (props: MotionPropsWithChildren) => <m.div {...props} />,
  span: (props: MotionPropsWithChildren) => <m.span {...props} />,
  h1: (props: MotionPropsWithChildren) => <m.h1 {...props} />,
  h2: (props: MotionPropsWithChildren) => <m.h2 {...props} />,
  h3: (props: MotionPropsWithChildren) => <m.h3 {...props} />,
  h4: (props: MotionPropsWithChildren) => <m.h4 {...props} />,
  p: (props: MotionPropsWithChildren) => <m.p {...props} />,
  button: (props: MotionPropsWithChildren) => <m.button {...props} />,
  a: (props: MotionPropsWithChildren) => <m.a {...props} />,
  ul: (props: MotionPropsWithChildren) => <m.ul {...props} />,
  li: (props: MotionPropsWithChildren) => <m.li {...props} />,
  img: (props: MotionPropsWithChildren) => <m.img {...props} />,
  section: (props: MotionPropsWithChildren) => <m.section {...props} />,
  header: (props: MotionPropsWithChildren) => <m.header {...props} />,
  footer: (props: MotionPropsWithChildren) => <m.footer {...props} />,
  nav: (props: MotionPropsWithChildren) => <m.nav {...props} />,
  main: (props: MotionPropsWithChildren) => <m.main {...props} />,
  article: (props: MotionPropsWithChildren) => <m.article {...props} />,
  aside: (props: MotionPropsWithChildren) => <m.aside {...props} />,
  form: (props: MotionPropsWithChildren) => <m.form {...props} />,
  input: (props: MotionPropsWithChildren) => <m.input {...props} />,
  textarea: (props: MotionPropsWithChildren) => <m.textarea {...props} />,
  select: (props: MotionPropsWithChildren) => <m.select {...props} />,
  label: (props: MotionPropsWithChildren) => <m.label {...props} />,
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
