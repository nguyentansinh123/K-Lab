import { useScrollReveal } from "../hooks/useScrollReveal";

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`pb-16 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="relative overflow-hidden border border-outline-variant/25 bg-surface-container-lowest/80 px-6 py-20 text-center md:px-16">
        <div className="absolute inset-x-8 top-0 h-px bg-primary-fixed/50" />

        <h2 className="relative z-10 mb-6 text-3xl md:text-4xl font-semibold tracking-tight text-on-surface">
          Stop Guessing Where
          <br />
          Your Time Goes.
        </h2>

        <p className="relative z-10 mx-auto mb-10 max-w-lg text-on-surface-variant/70">
          Deploy the tracker and start owning your hours.
        </p>

        <button className="relative z-10 cursor-pointer bg-primary-container px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-on-primary-container hover:bg-primary-fixed active:scale-[0.98] transition-all duration-200">
          Install the Tracker
        </button>

        <p className="mt-8 text-outline text-[10px] font-bold uppercase tracking-[0.2em] relative z-10">
          Open source. Your data stays on your machine. Always.
        </p>
      </div>
    </section>
  );
}
