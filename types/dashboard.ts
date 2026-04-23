// types/dashboard.ts

export type DashboardStat = {
  title: string;
  value: number;
  variant: "cream" | "pink" | "green" | "blue";
};

export type BookingItem = {
  id: number;
  fullName: string;
  treatment: string;
  status: "Konfirmasi" | "Tertunda" | "Booking";
};

export type TreatmentItem = {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: string;
  discount: string;
  duration: string;
};

export type CustomerItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Aktif" | "Nonaktif";
};

export type DoctorScheduleItem = {
  id: number;
  doctorName: string;
  day: string;
  startTime: string;
  endTime: string;
  capacityPerHour: number;
};

export type BookingPageItem = {
  id: number;
  customerName: string;
  treatment: string;
  date: string;
  time: string;
  status: "Aktif" | "Tertunda" | "Selesai";
};

export type ReportItem = {
  id: number;
  fullName: string;
  treatment: string;
  status: "Konfirmasi" | "Tertunda" | "Booking";
};

