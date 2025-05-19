
import { motion as m, MotionProps } from "framer-motion";
import { ReactNode } from "react";

type MotionComponentProps = MotionProps & {
  children?: ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  src?: string;
  alt?: string;
  [key: string]: any; // Accept any additional props
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
  polygon: (props: MotionComponentProps) => <m.polygon {...props} />,
};
