import type { BookingItem, DashboardStat } from "@/types/dashboard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

type AdminDashboardSummary = {
  booking_hari_ini: number;
  tertunda: number;
  konfirmasi: number;
  total_pelanggan: number;
};

type AdminDashboardApiItem = {
  id: number;
  fullName: string;
  treatment: string;
  status: BookingItem["status"];
};

type AdminDashboardApiResponse = {
  message?: string;
  summary?: Partial<AdminDashboardSummary>;
  data?: AdminDashboardApiItem[];
};

export const emptyAdminDashboardStats: DashboardStat[] = [
  {
    title: "Booking Hari Ini",
    value: 0,
    variant: "cream",
  },
  {
    title: "Tertunda",
    value: 0,
    variant: "pink",
  },
  {
    title: "Konfirmasi",
    value: 0,
    variant: "green",
  },
  {
    title: "Total Pelanggan",
    value: 0,
    variant: "blue",
  },
];

export async function fetchAdminDashboard() {
  const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
    headers: {
      Accept: "application/json",
    },
  });
  const text = await response.text();
  const result = text ? (parseApiText(text) as AdminDashboardApiResponse) : null;

  if (!response.ok) {
    throw new Error(result?.message || "Gagal mengambil data dashboard admin.");
  }

  const summary = {
    booking_hari_ini: 0,
    tertunda: 0,
    konfirmasi: 0,
    total_pelanggan: 0,
    ...result?.summary,
  };

  return {
    stats: [
      {
        title: "Booking Hari Ini",
        value: summary.booking_hari_ini,
        variant: "cream" as const,
      },
      {
        title: "Tertunda",
        value: summary.tertunda,
        variant: "pink" as const,
      },
      {
        title: "Konfirmasi",
        value: summary.konfirmasi,
        variant: "green" as const,
      },
      {
        title: "Total Pelanggan",
        value: summary.total_pelanggan,
        variant: "blue" as const,
      },
    ],
    bookings: Array.isArray(result?.data)
      ? result.data.map(mapBookingItem)
      : [],
  };
}

function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

function mapBookingItem(item: AdminDashboardApiItem): BookingItem {
  return {
    id: item.id,
    fullName: item.fullName || "-",
    treatment: item.treatment || "-",
    status: normalizeStatus(item.status),
  };
}

function normalizeStatus(status: string): BookingItem["status"] {
  if (status === "Konfirmasi" || status === "Tertunda" || status === "Booking") {
    return status;
  }

  return "Booking";
}
