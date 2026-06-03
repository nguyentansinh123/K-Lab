import { useScrollReveal } from "../hooks/useScrollReveal";

export default function HeroSection() {
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <section
      ref={ref}
      className="min-h-[620px] flex flex-col items-center justify-center text-center py-20"
    >
      <div
        className={`inline-flex items-center gap-3 border border-outline-variant/40 bg-surface-container-lowest/70 px-4 py-2 transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="h-1.5 w-1.5 bg-primary-fixed shadow-[0_0_12px_rgba(0,252,64,0.9)]" />
        <span className="text-primary-fixed text-[10px] font-bold tracking-[0.24em] uppercase">
          Tracking Active / 14 Day Streak
        </span>
      </div>

      <h1
        className={`mt-8 max-w-5xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95] text-on-surface transition-all duration-600 ease-out delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Track Your Grind.
        <br />
        Own Your Growth.
      </h1>

      <p
        className={`mt-7 max-w-2xl text-on-surface-variant text-lg leading-8 font-light transition-all duration-600 ease-out delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        Deep work requires clean signal. KINETIC LAB logs your study sessions,
        application usage, and focus blocks with quiet precision.
      </p>

      <div
        className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-600 ease-out delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <button className="cursor-pointer bg-primary-container text-on-primary-container px-8 py-4 font-bold uppercase tracking-[0.22em] text-xs hover:bg-primary-fixed active:scale-[0.98] transition-all duration-200">
          Start Tracking
        </button>
        <button className="cursor-pointer border border-outline-variant/60 bg-surface-container-lowest/50 px-8 py-4 font-bold uppercase tracking-[0.22em] text-xs text-on-surface-variant hover:text-on-surface hover:border-outline active:scale-[0.98] transition-all duration-200">
          View Demo
        </button>
      </div>

      <div
        className={`mt-14 grid w-full max-w-3xl grid-cols-1 border border-outline-variant/30 bg-surface-container-lowest/60 sm:grid-cols-3 transition-all duration-700 ease-out delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {[
          ["Today", "6.4h"],
          ["Focus", "72%"],
          ["Sync", "Live"],
        ].map(([label, value], index) => (
          <div
            key={label}
            className={`px-6 py-5 ${index > 0 ? "border-t border-outline-variant/30 sm:border-l sm:border-t-0" : ""}`}
          >
            <div className="text-[10px] uppercase tracking-[0.24em] text-outline">
              {label}
            </div>
            <div className="mt-2 text-2xl font-bold text-on-surface">
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
