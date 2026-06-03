import HeroSection from "../components/HeroSection";
import NeuralLedger from "../components/NeuralLedger";
import ActivityCards from "../components/ActivityCards";
import CoreSystems from "../components/CoreSystems";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111] text-on-surface relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(234,255,222,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(234,255,222,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,252,64,0.11),transparent_62%)]" />
      <div className="relative z-10">
        <main className="pt-24 pb-16">
          <div className="max-w-[1200px] mx-auto w-full space-y-32 px-4 sm:px-6 lg:px-10">
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
