import TreatmentResultManager from "../../components/dokter/hasil-treatment/TreatmentResultManager";

export default function DokterHasilTreatmentPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Hasil Treatment
      </h1>

      <TreatmentResultManager />
    </section>
  );
}
