import HeroSection from "../components/HeroSection";
import NeuralLedger from "../components/NeuralLedger";
import ActivityCards from "../components/ActivityCards";
import CoreSystems from "../components/CoreSystems";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0c0b] text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(234,255,222,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(234,255,222,0.018)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_50%_-15%,rgba(0,252,64,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute left-[-12rem] top-[52rem] h-[32rem] w-[32rem] rounded-[999px] bg-primary-fixed/[0.035] blur-[110px]" />
      <div className="relative z-10">
        <main className="pb-10 pt-24 sm:pt-28">
          <div className="mx-auto w-full max-w-[1240px] space-y-8 px-3 sm:px-6 lg:space-y-10 lg:px-8">
            <HeroSection />
            <NeuralLedger />
            <ActivityCards />
            <CoreSystems />
            <CTASection />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
