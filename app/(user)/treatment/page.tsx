import { Suspense } from "react";
import TreatmentHero from "../../components/treatments/TreatmentHero";
import TreatmentSection from "../../components/treatments/TreatmentSection";

export default function TreatmentPage() {
  return (
    <main className="w-full bg-white">
      <TreatmentHero />
      <Suspense fallback={null}>
        <TreatmentSection />
      </Suspense>
    </main>
  );
}
