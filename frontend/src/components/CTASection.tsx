import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollRevealSection from "./ScrollRevealSection";

export default function CTASection() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRevealSection
      className="pb-6"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary-fixed/10 bg-black/60 px-6 py-20 text-center shadow-[0_32px_100px_rgba(0,0,0,0.3)] md:px-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,252,64,0.1),transparent_45%)]" />
        <div className="absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-primary-fixed/45 to-transparent" />

        <div className="relative z-10 mx-auto mb-5 w-fit rounded-[999px] border border-primary-fixed/15 bg-primary-fixed/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-fixed">
          Ready when you are
        </div>
        <h2 className="relative z-10 mb-6 text-3xl font-semibold tracking-[-0.045em] text-on-surface md:text-5xl">
          Stop Guessing Where
          <br />
          Your Time Goes.
        </h2>

        <p className="relative z-10 mx-auto mb-10 max-w-lg text-on-surface-variant/70">
          Deploy the tracker and start owning your hours.
        </p>

        <motion.div
          className="relative z-10 mx-auto w-fit"
          whileHover={reduceMotion ? undefined : { scale: 1.025 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <Link
            to="/register"
            className="group flex items-center gap-3 rounded-[999px] bg-primary-container py-2.5 pl-6 pr-2.5 text-xs font-bold uppercase tracking-[0.18em] text-on-primary-container outline-none transition-shadow hover:shadow-[0_0_28px_rgba(0,252,64,0.2)] focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
          Install the Tracker
            <span className="flex h-8 w-8 items-center justify-center rounded-[999px] bg-black/10 text-base transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

        <p className="relative z-10 mt-8 text-[9px] font-bold uppercase tracking-[0.18em] text-outline">
          Open source. Your data stays on your machine. Always.
        </p>
      </div>
    </ScrollRevealSection>
  );
}
