import type { DoctorBooking } from "./BookingTable";
import type { PatientSchedule } from "../PatientTable";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export type DoctorBookingSummary = {
  total_pelanggan: number;
  jadwal_hari_ini: number;
  total_booking: number;
  terkonfirmasi: number;
};

type DoctorBookingApiItem = {
  id: number;
  id_booking?: number;
  name: string;
  treatment: string;
  date: string;
  time: string;
  status: DoctorBooking["status"];
};

type DoctorBookingApiResponse = {
  message?: string;
  summary?: Partial<DoctorBookingSummary>;
  data?: DoctorBookingApiItem[];
};

type LoggedInDoctor = {
  id_user?: number;
  username?: string;
  role?: string;
};

export const emptyDoctorBookingSummary: DoctorBookingSummary = {
  total_pelanggan: 0,
  jadwal_hari_ini: 0,
  total_booking: 0,
  terkonfirmasi: 0,
};

export function getLoggedInDoctorName() {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return "";

    const user = JSON.parse(rawUser) as LoggedInDoctor;

    if (user.role !== "dokter" || typeof user.username !== "string") {
      return "";
    }

    return user.username;
  } catch {
    return "";
  }
}

export async function fetchDoctorBookings(doctorName: string) {
  if (!doctorName) {
    throw new Error("Silakan login sebagai dokter untuk melihat booking pasien.");
  }

  const url = new URL(`${API_BASE_URL}/api/bookings/doctor`);
  url.searchParams.set("doctor_name", doctorName);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });
  const text = await response.text();
  const result = text ? parseApiText(text) as DoctorBookingApiResponse : null;

  if (!response.ok) {
    throw new Error(result?.message || "Gagal mengambil data booking dokter.");
  }

  const bookings = Array.isArray(result?.data)
    ? result.data.map(mapDoctorBooking)
    : [];

  return {
    bookings,
    schedules: bookings.map<PatientSchedule>((booking) => ({
      id: booking.id,
      name: booking.name,
      treatment: booking.treatment,
      status: booking.status,
    })),
    summary: {
      ...emptyDoctorBookingSummary,
      ...result?.summary,
    },
  };
}

function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

function mapDoctorBooking(item: DoctorBookingApiItem): DoctorBooking {
  return {
    id: item.id_booking || item.id,
    name: item.name || "-",
    treatment: item.treatment || "-",
    date: item.date || "-",
    time: item.time || "-",
    status: normalizeStatus(item.status),
  };
}

function normalizeStatus(status: string): DoctorBooking["status"] {
  if (status === "Konfirmasi" || status === "Tertunda" || status === "Booking") {
    return status;
  }

  return "Booking";
}
