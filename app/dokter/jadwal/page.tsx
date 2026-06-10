import DoctorScheduleTable, {
  type DoctorSchedule,
} from "../../components/dokter/jadwal/DoctorScheduleTable";

const schedules: DoctorSchedule[] = [
  { id: 1, day: "Senin", startTime: "Off", endTime: "Off", capacityPerHour: 0 },
  { id: 2, day: "Selasa", startTime: "10:00", endTime: "18:00", capacityPerHour: 5 },
  { id: 3, day: "Rabu", startTime: "10:00", endTime: "18:00", capacityPerHour: 5 },
  { id: 4, day: "Kamis", startTime: "10:00", endTime: "18:00", capacityPerHour: 5 },
  { id: 5, day: "Jumat", startTime: "10:00", endTime: "18:00", capacityPerHour: 5 },
  { id: 6, day: "Sabtu", startTime: "10:00", endTime: "18:00", capacityPerHour: 5 },
];

export default function DokterJadwalPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Jadwal Dokter
      </h1>

      <div className="mt-7">
        <DoctorScheduleTable data={schedules} />
      </div>
    </section>
  );
}
