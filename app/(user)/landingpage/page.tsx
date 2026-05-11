import Navbar from "../../components/global/Navbar";
import Hero from "../../components/landing/Hero";
import WhyChoose from "../../components/landing/WhyChoose";
import TreatmentSection from "../../components/landing/TreatmentSection";  
import Footer from "../../components/global/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <Navbar />
      <Hero />
      <WhyChoose />
      <TreatmentSection />
      <Footer />
    </main>
  );
}