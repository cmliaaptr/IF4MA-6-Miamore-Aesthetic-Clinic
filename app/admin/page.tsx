"use client";

import { useCallback, useEffect, useState } from "react";
import type { BookingItem, DashboardStat } from "@/types/dashboard";
import BookingTable from "../components/admin/BookingTable";
import DashboardCard from "../components/admin/DashboardCard";
import {
  emptyAdminDashboardStats,
  fetchAdminDashboard,
} from "../components/admin/adminDashboardApi";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>(
    emptyAdminDashboardStats
  );
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchAdminDashboard();

      setStats(result.stats);
      setBookings(result.bookings);
    } catch (fetchError) {
      setStats(emptyAdminDashboardStats);
      setBookings([]);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Gagal mengambil data dashboard admin."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
  }, [loadDashboard]);

  return (
    <section>
      <div className="admin-dashboard-heading">
        <h1 className="page-title">Dashboard</h1>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={loadDashboard}
          disabled={isLoading}
        >
          {isLoading ? "Memuat..." : "Refresh Data"}
        </button>
      </div>

      <div className="dashboard-grid">
        {stats.map((item) => (
          <DashboardCard key={item.title} item={item} />
        ))}
      </div>

      {isLoading ? (
        <p className="admin-dashboard-message">Memuat data booking customer...</p>
      ) : null}

      {error ? (
        <p className="admin-dashboard-message error">{error}</p>
      ) : null}

      <BookingTable data={bookings} />
    </section>
  );
}
