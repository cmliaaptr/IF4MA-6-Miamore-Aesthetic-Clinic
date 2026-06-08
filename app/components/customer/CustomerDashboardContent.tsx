import CustomerHero from "./CustomerHero";
import CustomerTreatmentSection from "./CustomerTreatmentSection";
import CustomerWhyChoose from "./CustomerWhyChoose";

export default function CustomerDashboardContent() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900">
      <CustomerHero />
      <CustomerWhyChoose />
      <CustomerTreatmentSection />
    </div>
  );
}
