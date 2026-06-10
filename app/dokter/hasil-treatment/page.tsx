import TreatmentResultManager from "../../components/dokter/hasil-treatment/TreatmentResultManager";
import type { TreatmentPatient } from "../../components/dokter/hasil-treatment/TreatmentResultTypes";

const patients: TreatmentPatient[] = [
  {
    id: 1,
    name: "Putri Camelia Sari",
    treatment: "Facial Glow",
    schedule: "Rabu, 14 Okt 2026, 10:00 WIB",
    room: "Ruang Treatment 2",
    payment: "Lunas",
    status: "Selesai",
  },
  {
    id: 2,
    name: "Dewi Melati Sukma",
    treatment: "Whitening Facial",
    schedule: "Rabu, 16 Okt 2026, 10:00 WIB",
    room: "Ruang Facial 3",
    payment: "Lunas",
    status: "Selesai",
  },
  {
    id: 3,
    name: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    schedule: "Jumat, 18 Okt 2026, 13:00 WIB",
    room: "Ruang Facial 1",
    payment: "Lunas",
    status: "Selesai",
  },
];

export default function DokterHasilTreatmentPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Hasil Treatment
      </h1>

      <TreatmentResultManager patients={patients} />
    </section>
  );
}
