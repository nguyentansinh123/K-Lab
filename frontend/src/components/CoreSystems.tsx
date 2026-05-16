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
      className={`px-8 md:px-16 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black tracking-tighter uppercase text-white mb-4">
          How It Works
        </h2>
        <div className="h-1 w-24 bg-primary-container mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`cursor-pointer bg-surface-container p-12 border border-outline-variant/15 flex flex-col items-center text-center hover:bg-surface-variant hover:-translate-y-1 hover:border-primary-fixed/20 card-glow transition-all duration-200 ${
              i > 0 ? "md:border-l-0" : ""
            }`}
            style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
          >
            <div className="w-16 h-16 flex items-center justify-center bg-primary-container/10 mb-8 neon-glow-sm">
              <span className="material-symbols-outlined text-primary-fixed text-4xl">
                {feature.icon}
              </span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
              {feature.title}
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
