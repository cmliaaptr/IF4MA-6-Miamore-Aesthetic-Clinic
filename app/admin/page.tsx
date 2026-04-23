// app/admin/page.tsx

import BookingTable from "../components/admin/BookingTable";
import DashboardCard from "../components/admin/DashboardCard";
import { bookingList, dashboardStats } from "@/data/dashboard";

export default function AdminDashboardPage() {
  return (
    <section>
      {/* Judul halaman */}
      <h1 className="page-title">Dashboard</h1>

      {/* Card statistik */}
      <div className="dashboard-grid">
        {dashboardStats.map((item) => (
          <DashboardCard key={item.title} item={item} />
        ))}
      </div>

      {/* Tabel data booking */}
      <BookingTable data={bookingList} />
    </section>
  );
}