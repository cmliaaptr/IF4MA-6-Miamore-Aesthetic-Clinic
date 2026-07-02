"use client";

import { useCallback, useEffect, useState } from "react";
import BookingTable, {
  type DoctorBooking,
} from "../../components/dokter/booking/BookingTable";
import {
  fetchDoctorBookings,
  getLoggedInDoctorName,
} from "../../components/dokter/booking/doctorBookingApi";

export default function DokterBookingPage() {
  const [bookings, setBookings] = useState<DoctorBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const doctorName = getLoggedInDoctorName();
      const result = await fetchDoctorBookings(doctorName);

      setBookings(result.bookings);
    } catch (fetchError) {
      setBookings([]);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data booking pasien."
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
          Booking
        </h1>

        <button
          type="button"
          onClick={loadBookings}
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center rounded-md bg-[#d4a62a] px-5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {isLoading ? "Memuat..." : "Refresh Data"}
        </button>
      </div>

      <div className="mt-16">
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

        <BookingTable data={bookings} />
      </div>
    </section>
  );
}
