import { CalendarDays, Check, Home } from "lucide-react";
import type { BookingFormData } from "./Booking";

type PembayaranSelesaiProps = {
  formData: BookingFormData;
  treatment: string;
  therapist: string;
  totalPayment: number;
  orderId: string;
  paymentCompletedAt: string;
  onClose: () => void;
};

export default function PembayaranSelesai({
  formData,
  treatment,
  therapist,
  totalPayment,
  orderId,
  paymentCompletedAt,
  onClose,
}: PembayaranSelesaiProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#43b400] text-white">
        <Check size={38} strokeWidth={4} />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-[#37b400]">Pembayaran Berhasil!</h2>
        <p className="text-lg font-medium">Booking Anda telah dikonfirmasi.</p>
      </div>

      <div className="text-left">
        <div className="rounded-2xl bg-[#fbf7f7] p-4 shadow-[0_0_14px_rgba(0,0,0,0.16)] md:p-5">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays size={34} className="text-neutral-500" />
            <h3 className="text-2xl font-bold">Detail Booking</h3>
          </div>
          <div className="space-y-2 text-sm">
            <InfoRow label="Nama" value={formData.fullName || "-"} />
            <InfoRow label="Treatment" value={treatment} />
            <InfoRow label="Dokter / Terapis" value={therapist} />
            <InfoRow label="Tanggal" value={formatDate(formData.bookingDate)} />
            <InfoRow label="Jam" value={formData.bookingTime || "-"} />
          </div>
          <div className="my-5 border-t border-neutral-300" />
          <div className="space-y-2 text-sm">
            <InfoRow label="Total Pembayaran" value={formatRupiah(totalPayment)} strong />
            <div className="grid grid-cols-[110px_8px_1fr] gap-2">
              <span>Status Booking</span>
              <span>:</span>
              <span>
                <span className="rounded border border-[#43b400] px-2 py-0.5 text-xs text-neutral-800">
                  Terkonfirmasi
                </span>
              </span>
            </div>
            <InfoRow label="Metode Pembayaran" value="QRIS" strong />
            <InfoRow label="Order ID" value={orderId} />
            <InfoRow label="Waktu Pembayaran" value={formatDateTime(paymentCompletedAt)} />
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#fbf7f7] p-4 text-left shadow-[0_0_14px_rgba(0,0,0,0.16)]">
          <div className="flex items-center gap-3 text-lg font-medium">
            <CalendarDays className="text-neutral-500" size={34} />
            Ingat Jadwal Anda
          </div>
          <p className="mt-5 text-sm">Mohon hadir 10 menit sebelum jadwal treatment</p>
          <p className="mt-5 text-sm">Terima kasih telah mempercayakan perawatan anda di Miamore Aesthetic Clinic</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#bf9130] px-4 py-2.5 text-base font-medium"
        >
          <CalendarDays size={34} className="text-neutral-500" />
          Lihat Booking Saya
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#bf9130] px-4 py-2.5 text-base font-medium text-white"
        >
          <Home size={34} className="text-neutral-950" />
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

function InfoRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[110px_8px_1fr] gap-2">
      <span>{label}</span>
      <span>:</span>
      <span className={strong ? "font-bold" : ""}>{value}</span>
    </div>
  );
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatDateTime(date: string) {
  if (!date) return "-";

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));

  return `${formattedDate.replace(".", ":")} WIB`;
}
