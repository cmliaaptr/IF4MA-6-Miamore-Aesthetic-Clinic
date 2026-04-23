// data/dashboard.ts

import { BookingItem, DashboardStat, TreatmentItem, CustomerItem, DoctorScheduleItem, BookingPageItem, ReportItem} from "@/types/dashboard";

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
export const doctorScheduleList: DoctorScheduleItem[] = [
  {
    id: 1,
    doctorName: "Dr. Rani",
    day: "Senin",
    startTime: "09:00",
    endTime: "15:00",
    capacityPerHour: 3,
  },
  {
    id: 2,
    doctorName: "Dr. Maya",
    day: "Selasa",
    startTime: "10:00",
    endTime: "16:00",
    capacityPerHour: 3,
  },
  {
    id: 3,
    doctorName: "Dr. Andi",
    day: "Rabu",
    startTime: "08:00",
    endTime: "14:00",
    capacityPerHour: 2,
  },
];

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