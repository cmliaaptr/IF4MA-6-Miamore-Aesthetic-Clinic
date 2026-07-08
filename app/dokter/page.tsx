"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, UserRound } from "lucide-react";
import PatientTable, {
  type PatientSchedule,
} from "../components/dokter/PatientTable";
import StatCard from "../components/dokter/StatCard";
import {
  emptyDoctorBookingSummary,
  fetchDoctorBookings,
  getLoggedInDoctorName,
  type DoctorBookingSummary,
} from "../components/dokter/booking/doctorBookingApi";

export default function DokterDashboardPage() {
  const [schedules, setSchedules] = useState<PatientSchedule[]>([]);
  const [summary, setSummary] = useState<DoctorBookingSummary>(
    emptyDoctorBookingSummary
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const stats = useMemo(
    () => [
      {
        title: "Total Pelanggan",
        value: String(summary.total_pelanggan),
        icon: UserRound,
        className: "bg-blue-50",
      },
      {
        title: "Jadwal Hari Ini",
        value: String(summary.jadwal_hari_ini),
        icon: CalendarDays,
        className: "bg-yellow-50",
      },
    ],
    [summary]
  );

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const doctorName = getLoggedInDoctorName();
      const result = await fetchDoctorBookings(doctorName);

      setSchedules(
        [...result.schedules]
          .sort((current, next) => next.id - current.id)
          .slice(0, 8)
      );
      setSummary(result.summary);
    } catch (fetchError) {
      setSchedules([]);
      setSummary(emptyDoctorBookingSummary);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data dashboard dokter."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadBookings);
  }, [loadBookings]);

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
        {isLoading ? (
          <p className="mb-4 rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-600">
            Memuat data booking customer...
          </p>
        ) : null}

        {error ? (
          <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        ) : null}

        <PatientTable data={schedules} />
      </div>
    </section>
  );
}
