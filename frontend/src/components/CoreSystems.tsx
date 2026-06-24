import { motion, useReducedMotion } from "framer-motion";
import ScrollRevealSection from "./ScrollRevealSection";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "terminal",
    title: "Background Script",
    description:
      "A lightweight daemon tracks active windows, apps, and session time. Zero setup — install it and it just works. Your data stays local until you push it.",
  },
  {
    icon: "psychology",
    title: "AI Analysis",
    description:
      "AI breaks down your study sessions — time per app, focus vs. idle, distraction patterns. Get weekly reports showing where your hours actually went.",
  },
  {
    icon: "sync",
    title: "Dashboard Sync",
    description:
      "Session data flows to your personal dashboard in real time. See your commitment chart, streaks, focus scores, and trends across all your devices.",
  },
];

export default function CoreSystems() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRevealSection
      id="how-it-works"
      className="scroll-mt-28 rounded-[2rem] border border-white/[0.07] bg-black/45 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-8 md:p-10"
    >
      <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 w-fit rounded-[999px] bg-white/[0.04] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
            How it works
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
            System Capabilities
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-on-surface-variant/65">
          The tracker watches the workflow without turning the interface into a second job.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.article
            key={feature.title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer rounded-[1.5rem] border border-white/[0.06] bg-white/[0.025] p-6 transition-[background-color,border-color] duration-300 hover:border-primary-fixed/15 hover:bg-primary-fixed/[0.035]"
          >
            <span className="mb-7 flex h-11 w-11 shrink-0 items-center justify-center rounded-[999px] border border-white/[0.07] bg-black/35 text-outline transition-colors duration-200 group-hover:border-primary-fixed/20 group-hover:text-primary-fixed">
              <span className="material-symbols-outlined block text-xl leading-none">
                {feature.icon}
              </span>
            </span>
            <h4 className="mb-3 text-lg font-bold tracking-[-0.02em] text-white">
              {feature.title}
            </h4>
            <p className="text-sm leading-7 text-on-surface-variant/70">
              {feature.description}
            </p>
          </motion.article>
        ))}
      </div>
    </ScrollRevealSection>
  );
}
