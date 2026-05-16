import { useScrollReveal } from "../hooks/useScrollReveal";

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={`px-8 md:px-16 pb-32 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-primary-container p-16 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 blur-3xl rounded-full" />

        <h2 className="text-4xl md:text-6xl font-black text-on-primary-container tracking-tighter uppercase mb-8 relative z-10">
          Stop Guessing Where <br />
          Your Time Goes.
        </h2>

        <button className="cursor-pointer bg-black text-primary-fixed px-12 py-6 text-lg font-bold uppercase tracking-[0.3em] ion-trace hover:text-on-primary-container shadow-[0_0_50px_rgba(0,0,0,0.3)] relative z-10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200">
          Install the Tracker
        </button>

        <p className="mt-8 text-on-primary-container/60 text-xs font-bold uppercase tracking-widest relative z-10">
          Open source. Your data stays on your machine. Always.
        </p>
      </div>
    </section>
  );
}
