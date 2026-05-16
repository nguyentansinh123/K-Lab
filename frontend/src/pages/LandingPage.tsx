import HeroSection from "../components/HeroSection";
import NeuralLedger from "../components/NeuralLedger";
import ActivityCards from "../components/ActivityCards";
import CoreSystems from "../components/CoreSystems";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <main className="pt-24 space-y-32">
        <HeroSection />
        <NeuralLedger />
        <ActivityCards />
        <CoreSystems />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
