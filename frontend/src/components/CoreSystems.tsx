import { useScrollReveal } from "../hooks/useScrollReveal";

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
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      id="how-it-works"
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-12 flex flex-col gap-4 border-b border-outline-variant/30 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          System Capabilities
        </h2>
        <p className="max-w-md text-sm leading-6 text-on-surface-variant/65">
          The tracker watches the workflow without turning the interface into a
          second job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group cursor-pointer border-l border-outline-variant/30 pl-6 transition-all duration-200 hover:border-primary-fixed/70"
            style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
          >
            <span className="material-symbols-outlined mb-6 block text-3xl text-outline transition-colors duration-200 group-hover:text-primary-fixed">
              {feature.icon}
            </span>
            <h4 className="text-xl font-bold text-white mb-3">
              {feature.title}
            </h4>
            <p className="text-on-surface-variant/70 text-sm leading-7">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
