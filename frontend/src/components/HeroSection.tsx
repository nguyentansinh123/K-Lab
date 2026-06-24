import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.75,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      className="relative flex min-h-[650px] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-black/55 px-5 py-20 text-center shadow-[0_32px_100px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:px-10 lg:min-h-[700px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,252,64,0.095),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-primary-fixed/40 to-transparent" />

      <motion.div
        {...reveal(0.08)}
        className="relative inline-flex items-center gap-3 rounded-[999px] border border-primary-fixed/15 bg-primary-fixed/[0.06] px-4 py-2"
      >
        <span className="h-1.5 w-1.5 rounded-[999px] bg-primary-fixed shadow-[0_0_10px_rgba(0,252,64,0.65)]" />
        <span className="text-primary-fixed text-[10px] font-bold tracking-[0.24em] uppercase">
          Tracking Active / 14 Day Streak
        </span>
      </motion.div>

      <motion.h1
        {...reveal(0.16)}
        className="relative mt-8 max-w-5xl text-5xl font-bold leading-[0.94] tracking-[-0.055em] text-on-surface sm:text-6xl md:text-7xl lg:text-[5.5rem]"
      >
        Track Your Grind.
        <br />
        <span className="text-primary-fixed">Own Your Growth.</span>
      </motion.h1>

      <motion.p
        {...reveal(0.24)}
        className="relative mt-7 max-w-2xl text-base font-light leading-8 text-on-surface-variant sm:text-lg"
      >
        Deep work requires clean signal. KINETIC LAB logs your study sessions,
        application usage, and focus blocks with quiet precision.
      </motion.p>

      <motion.div
        {...reveal(0.32)}
        className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Link
          to="/register"
          className="group flex items-center gap-3 rounded-[999px] bg-primary-container py-2.5 pl-6 pr-2.5 text-xs font-bold uppercase tracking-[0.18em] text-on-primary-container outline-none transition-all duration-200 hover:bg-primary-fixed hover:shadow-[0_0_24px_rgba(0,252,64,0.18)] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-fixed focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Start Tracking
          <span className="flex h-8 w-8 items-center justify-center rounded-[999px] bg-black/10 text-base transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
        <a
          href="#how-it-works"
          className="rounded-[999px] border border-white/10 bg-white/[0.035] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant outline-none transition-all duration-200 hover:border-primary-fixed/20 hover:bg-primary-fixed/[0.055] hover:text-on-surface active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary-fixed/70"
        >
          View Demo
        </a>
      </motion.div>

      <motion.div
        {...reveal(0.42)}
        className="relative mt-14 grid w-full max-w-3xl grid-cols-1 gap-1 rounded-[1.5rem] border border-white/[0.07] bg-white/[0.025] p-1 sm:grid-cols-3"
      >
        {[
          ["Today", "6.4h"],
          ["Focus", "72%"],
          ["Sync", "Live"],
        ].map(([label, value], index) => (
          <div
            key={label}
            className={`rounded-[1.15rem] px-6 py-5 transition-colors hover:bg-white/[0.035] ${index > 0 ? "border-t border-white/[0.05] sm:border-l sm:border-t-0" : ""}`}
          >
            <div className="text-[10px] uppercase tracking-[0.24em] text-outline">
              {label}
            </div>
            <div className="mt-2 text-2xl font-bold text-on-surface">
              {value}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
