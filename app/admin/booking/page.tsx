"use client";

import { useCallback, useEffect, useState } from "react";
import BookingPageTable from "../../components/admin/BookingPageTable";
import type { BookingPageItem } from "@/types/dashboard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

type AdminBookingApiItem = {
  id: number;
  fullName?: string;
  customerName?: string;
  treatment?: string;
  date?: string;
  time?: string;
  status?: string;
};

export default function BookingPage() {
  const [bookings, setBookings] = useState<BookingPageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
        headers: {
          Accept: "application/json",
        },
      });
      const text = await response.text();
      const result = text
        ? (JSON.parse(text.replace(/^\/\//, "").trim()) as {
            message?: string;
            data?: AdminBookingApiItem[];
          })
        : null;

      if (!response.ok) {
        throw new Error(result?.message || "Gagal mengambil data booking.");
      }

      setBookings(
        Array.isArray(result?.data)
          ? result.data.map(mapBookingPageItem)
          : []
      );
    } catch (fetchError) {
      setBookings([]);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data booking."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadBookings);
  }, [loadBookings]);

  return (
    <section>
      <div className="admin-dashboard-heading">
        <h1 className="page-title">Booking</h1>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={loadBookings}
          disabled={isLoading}
        >
          {isLoading ? "Memuat..." : "Refresh Data"}
        </button>
      </div>

      {isLoading ? (
        <p className="admin-dashboard-message">Memuat data booking...</p>
      ) : null}

      {error ? (
        <p className="admin-dashboard-message error">{error}</p>
      ) : null}

      <BookingPageTable data={bookings} />
    </section>
  );
}

function mapBookingPageItem(item: AdminBookingApiItem): BookingPageItem {
  return {
    id: item.id,
    customerName: item.fullName || item.customerName || "-",
    treatment: item.treatment || "-",
    date: item.date || "-",
    time: item.time || "-",
    status: normalizeStatus(item.status),
  };
}

function normalizeStatus(status?: string): BookingPageItem["status"] {
  if (status === "Konfirmasi" || status === "Tertunda" || status === "Booking") {
    return status;
  }

  return "Booking";
}
