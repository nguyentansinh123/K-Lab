import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  amount?: number;
};

export default function ScrollRevealSection({
  children,
  className = "",
  id,
  delay = 0,
  amount = 0.15,
}: ScrollRevealSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
