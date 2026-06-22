"use client";

import { useEffect, useState } from "react";
import DoctorScheduleTable from "../../components/dokter/jadwal/DoctorScheduleTable";

export default function DokterJadwalPage() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) return;

    const currentUser = JSON.parse(user);

    fetch(
      `http://127.0.0.1:8000/api/jadwal-dokter/dokter/${currentUser.id_user}`
    )
      .then((res) => res.json())
      .then((result) => {
        setSchedules(
          result.data.map((item: any) => ({
            id: item.id_jadwal,
            day: item.hari,
            startTime: item.jam_mulai,
            endTime: item.jam_selesai,
            capacityPerHour: item.kapasitas,
          }))
        );
      });
  }, []);

  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold">
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