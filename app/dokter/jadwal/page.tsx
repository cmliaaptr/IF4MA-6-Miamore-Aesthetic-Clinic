"use client";

import { useEffect, useState } from "react";

import DoctorScheduleTable, {
  type DoctorSchedule,
} from "../../components/dokter/jadwal/DoctorScheduleTable";

export default function DokterJadwalPage() {
  const [schedules, setSchedules] =
    useState<DoctorSchedule[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user.id_user) return;

      const response = await fetch(
        `http://127.0.0.1:8000/api/jadwal-dokter/dokter/${user.id_user}`
      );

      const result =
        await response.json();

      setSchedules(
        result.data.map((item: any) => ({
          id: item.id_jadwal,
          day: item.hari,
          startTime: item.jam_mulai,
          endTime: item.jam_selesai,
          capacityPerHour:
            item.kapasitas,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Jadwal Dokter
      </h1>

      <div className="mt-7">
        <DoctorScheduleTable
          data={schedules}
        />
      </div>
    </section>
  );
}