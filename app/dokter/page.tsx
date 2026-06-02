import PatientTable, {
  type PatientSchedule,
} from "../components/dokter/PatientTable";
import StatCard from "../components/dokter/StatCard";
import { CalendarDays, UserRound } from "lucide-react";

const stats = [
  {
    title: "Total Pelanggan",
    value: "50",
    icon: UserRound,
    className: "bg-blue-50",
  },
  {
    title: "Jadwal Hari Ini",
    value: "15",
    icon: CalendarDays,
    className: "bg-yellow-50",
  },
];

const schedules: PatientSchedule[] = [
  {
    id: 1,
    name: "Putri Camelia Sari",
    treatment: "Facial Glow",
    status: "Konfirmasi",
  },
  {
    id: 2,
    name: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    status: "Tertunda",
  },
  {
    id: 3,
    name: "Dewi Melati Sukma",
    treatment: "Whitening Facial",
    status: "Konfirmasi",
  },
  {
    id: 4,
    name: "Andi Syahputra",
    treatment: "Botox",
    status: "Booking",
  },
  {
    id: 5,
    name: "Putri Camelia Sari",
    treatment: "Facial Glow",
    status: "Konfirmasi",
  },
  {
    id: 6,
    name: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    status: "Tertunda",
  },
  {
    id: 7,
    name: "Dewi Melati Sukma",
    treatment: "Whitening Facial",
    status: "Konfirmasi",
  },
  {
    id: 8,
    name: "Andi Syahputra",
    treatment: "Botox",
    status: "Booking",
  },
];

export default function DokterDashboardPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Dashboard
      </h1>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:max-w-[580px] lg:grid-cols-2 lg:gap-18">
        {stats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-14">
        <PatientTable data={schedules} />
      </div>
    </section>
  );
}
