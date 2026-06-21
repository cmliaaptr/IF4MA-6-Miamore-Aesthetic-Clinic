import Hero from "../../components/landing/Hero";
import WhyChoose from "../../components/landing/WhyChoose";
import TreatmentSection from "../../components/landing/TreatmentSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <Hero />
      <WhyChoose />
      <TreatmentSection />
    </main>
  );
}