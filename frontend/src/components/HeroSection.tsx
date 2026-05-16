import { useScrollReveal } from "../hooks/useScrollReveal";
import HUDPanel from "./HUDPanel";

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <section
      ref={ref}
      className="px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[819px]"
    >
      <div className="space-y-8">
        <div
          className={`inline-block px-4 py-1 border border-primary-container/30 bg-primary-container/5 transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-primary-fixed text-xs font-bold tracking-[0.2em] uppercase">
            Tracking Active — 14 Day Streak
          </span>
        </div>

        <h1
          className={`text-6xl md:text-8xl font-bold tracking-tighter leading-none text-on-surface transition-all duration-600 ease-out delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Track Your{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed to-primary-dim bg-clip-text text-transparent">
            Grind.
          </span>
          <br />
          Own Your{" "}
          <span className="bg-gradient-to-r from-primary-container via-primary-fixed to-primary-dim bg-clip-text text-transparent">
            Growth.
          </span>
        </h1>

        <p
          className={`text-on-surface-variant text-lg max-w-lg leading-relaxed transition-all duration-600 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          A lightweight script runs in the background, tracking your study
          sessions, app usage, and coding time. AI analyzes your patterns and
          shows you where your hours actually go.
        </p>

        <div
          className={`flex gap-4 transition-all duration-600 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button className="cursor-pointer bg-primary-container text-on-primary-container px-10 py-4 font-bold uppercase tracking-widest text-sm neon-glow-sm hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] transition-all duration-200">
            Start Tracking
          </button>
          <button className="cursor-pointer border border-outline/30 px-10 py-4 font-bold uppercase tracking-widest text-sm text-primary hover:border-primary-fixed/50 hover:bg-primary/5 active:scale-[0.98] transition-all duration-200">
            View Demo
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-700 ease-out delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <HUDPanel visible={isVisible} />
      </div>
    </section>
  );
}
