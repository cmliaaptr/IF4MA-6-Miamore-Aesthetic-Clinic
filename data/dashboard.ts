// data/dashboard.ts

import { BookingItem, DashboardStat, TreatmentItem, CustomerItem, BookingPageItem, ReportItem} from "@/types/dashboard";

export const dashboardStats: DashboardStat[] = [
  {
    title: "Booking Hari Ini",
    value: 15,
    variant: "cream",
  },
  {
    title: "Tertunda",
    value: 3,
    variant: "pink",
  },
  {
    title: "Konfirmasi",
    value: 12,
    variant: "green",
  },
  {
    title: "Total Pelanggan",
    value: 50,
    variant: "blue",
  },
];

export const bookingList: BookingItem[] = [
  {
    id: 1,
    fullName: "Putri Camelia Sari",
    treatment: "Facial Glow",
    status: "Konfirmasi",
  },
  {
    id: 2,
    fullName: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    status: "Tertunda",
  },
  {
    id: 3,
    fullName: "Dewi Melati Sukma",
    treatment: "Whitening Facial",
    status: "Konfirmasi",
  },
  {
    id: 4,
    fullName: "Andi Syahputra",
    treatment: "Botox",
    status: "Booking",
  },
];

// Data dummy treatment
export const treatmentList: TreatmentItem[] = [
  {
    id: 1,
    name: "Facial Glow",
    description: "Perawatan wajah cerah",
    photo: "Facial.jpg",
    price: "Rp 150.000",
    discount: "10%",
    duration: "60 menit",
  },
  {
    id: 2,
    name: "Acne Treatment",
    description: "Mengatasi Jerawat",
    photo: "Acne.jpg",
    price: "Rp 200.000",
    discount: "5%",
    duration: "75 menit",
  },
  {
    id: 3,
    name: "Facial Glow",
    description: "Perawatan wajah cerah",
    photo: "Glow.jpg",
    price: "Rp 180.000",
    discount: "0%",
    duration: "60 menit",
  },
];


// Data pelanggan
export const customerList: CustomerItem[] = [
  {
    id: 1,
    name: "Putri Camelia Sari",
    email: "puttcmeliaa@gmail.com",
    phone: "085797024698",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Ramadhani Akbar",
    email: "dani@gmail.com",
    phone: "089876543210",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Dea Asnuari",
    email: "dea@gmail.com",
    phone: "088765432101",
    status: "Nonaktif",
  },
];

// Data jadwal dokter
export type DoctorScheduleItem = {
  id: number;
  doctorId: number;
  doctorName: string;
  day: string;
  startTime: string;
  endTime: string;
  capacityPerHour: number;
};

// Data booking halaman booking
export const bookingPageList: BookingPageItem[] = [
  {
    id: 1,
    customerName: "Putri Camelia Sari",
    treatment: "Facial Glow",
    date: "02-04-2026",
    time: "10:00",
    status: "Aktif",
  },
];

export const reportList: ReportItem[] = [
  { id: 1, fullName: "Putri Camelia Sari", treatment: "Facial Glow", status: "Konfirmasi" },
  { id: 2, fullName: "Ramadhani Akbar", treatment: "Acne Treatment", status: "Tertunda" },
  { id: 3, fullName: "Dewi Melati Sukma", treatment: "Whitening Facial", status: "Konfirmasi" },
  { id: 4, fullName: "Andi Syahputra", treatment: "Botox", status: "Booking" },
  { id: 5, fullName: "Putri Camelia Sari", treatment: "Facial Glow", status: "Konfirmasi" },
  { id: 6, fullName: "Ramadhani Akbar", treatment: "Acne Treatment", status: "Tertunda" },
  { id: 7, fullName: "Dewi Melati Sukma", treatment: "Whitening Facial", status: "Konfirmasi" },
  { id: 8, fullName: "Andi Syahputra", treatment: "Botox", status: "Booking" },
  { id: 9, fullName: "Putri Camelia Sari", treatment: "Facial Glow", status: "Konfirmasi" },
  { id: 10, fullName: "Ramadhani Akbar", treatment: "Acne Treatment", status: "Tertunda" },
  { id: 11, fullName: "Dewi Melati Sukma", treatment: "Whitening Facial", status: "Konfirmasi" },
  { id: 12, fullName: "Andi Syahputra", treatment: "Botox", status: "Booking" },
];

export type PaymentItem = {
  id: number;
  invoice: string;
  customerName: string;
  treatment: string;
  total: string;
  status: "Lunas" | "Pending" | "Expired" | "Gagal";
  paidAt: string;
};

export const paymentList: PaymentItem[] = [
  {
    id: 1,
    invoice: "INV001",
    customerName: "Putri Camelia Sari",
    treatment: "Facial Glow",
    total: "Rp150.000",
    status: "Lunas",
    paidAt: "10:30",
  },
  {
    id: 2,
    invoice: "INV002",
    customerName: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    total: "Rp200.000",
    status: "Pending",
    paidAt: "-",
  },
  {
    id: 3,
    invoice: "INV003",
    customerName: "Dea Asnuari",
    treatment: "Whitening Facial",
    total: "Rp180.000",
    status: "Expired",
    paidAt: "-",
  },
];