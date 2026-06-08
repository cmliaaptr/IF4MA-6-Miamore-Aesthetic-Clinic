import BookingTable, {
  type DoctorBooking,
} from "../../components/dokter/booking/BookingTable";

const bookings: DoctorBooking[] = [
  {
    id: 1,
    name: "Putri Camelia Sari",
    treatment: "Facial Glow",
    date: "02/4/2026",
    time: "10:00",
    status: "Konfirmasi",
  },
  {
    id: 2,
    name: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    date: "03/4/2026",
    time: "12:00",
    status: "Tertunda",
  },
  {
    id: 3,
    name: "Dewi Melati Sukma",
    treatment: "Whitening Facial",
    date: "04/4/2026",
    time: "11:00",
    status: "Konfirmasi",
  },
  {
    id: 4,
    name: "Andi Syahputra",
    treatment: "Botox",
    date: "05/4/2026",
    time: "13:00",
    status: "Booking",
  },
  {
    id: 5,
    name: "Putri Camelia Sari",
    treatment: "Facial Glow",
    date: "06/4/2026",
    time: "14:00",
    status: "Konfirmasi",
  },
  {
    id: 6,
    name: "Ramadhani Akbar",
    treatment: "Acne Treatment",
    date: "07/4/2026",
    time: "15:00",
    status: "Tertunda",
  },
  {
    id: 7,
    name: "Dewi Melati Sukma",
    treatment: "Whitening Facial",
    date: "08/4/2026",
    time: "16:00",
    status: "Konfirmasi",
  },
  {
    id: 8,
    name: "Andi Syahputra",
    treatment: "Botox",
    date: "09/4/2026",
    time: "18:00",
    status: "Booking",
  },
];

export default function DokterBookingPage() {
  return (
    <section className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Booking
      </h1>

      <div className="mt-16">
        <BookingTable data={bookings} />
      </div>
    </section>
  );
}
