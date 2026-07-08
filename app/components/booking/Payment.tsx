import { ArrowLeft, CalendarDays, ShieldCheck } from "lucide-react";
import type { BookingFormData } from "./Booking";

type PaymentProps = {
  formData: BookingFormData;
  treatment: string;
  therapist: string;
  totalPayment: number;
  orderId: string;
  paymentSeconds: number;
  qrisUrl: string;
  paymentStatus: string;
  error: string;
  isSubmitting: boolean;
  onBackToForm: () => void;
  onCheckPayment: () => void;
  onSimulateSandboxPayment?: () => void;
};

export default function Payment({
  formData,
  treatment,
  therapist,
  totalPayment,
  orderId,
  paymentSeconds,
  qrisUrl,
  paymentStatus,
  error,
  isSubmitting,
  onBackToForm,
  onCheckPayment,
  onSimulateSandboxPayment,
}: PaymentProps) {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 pr-12">
        <h2 className="text-3xl font-bold text-[#bf9130] md:text-5xl">
          Pembayaran
        </h2>
        <button
          type="button"
          onClick={onBackToForm}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#bf9130] px-4 py-2 text-sm font-bold text-[#bf9130] hover:bg-[#fff7e6] disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
      </header>

      <BookingInfo
        formData={formData}
        treatment={treatment}
        therapist={therapist}
        totalPayment={totalPayment}
      />

      <section className="rounded-2xl bg-[#fbf7f7] p-4 shadow-[0_0_14px_rgba(0,0,0,0.16)] md:p-5">
        <p className="text-sm text-neutral-800">
          Scan QRIS dibawah ini menggunakan pembayaran favorit anda
        </p>

        <div className="mt-4 flex justify-center">
          <div className="rounded-md border border-neutral-900 bg-white px-8 py-3 text-center">
            <p className="text-xs font-bold leading-tight">QRIS</p>
            <p className="text-[10px] leading-tight">QR Code Standar Pembayaran Nasional</p>
            {qrisUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrisUrl}
                alt={`QRIS pembayaran ${orderId}`}
                className="mx-auto mt-3 h-48 w-48 object-contain"
              />
            ) : (
              <div className="mx-auto mt-3 flex h-40 w-40 items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-4 text-xs font-semibold leading-5 text-neutral-500">
                QRIS belum tersedia dari Midtrans
              </div>
            )}
            <p className="mt-2 text-sm">Order ID : {orderId}</p>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-lg rounded-lg border border-neutral-900 px-3 py-2 text-center">
          <p className="text-sm">Mendukung aplikasi pembayaran :</p>
          <PaymentMethodBadges />
        </div>

        <div className="mt-4 grid grid-cols-2 rounded-lg border border-neutral-900 p-3">
          <div>
            <p className="text-sm font-semibold">Total Bayar</p>
            <p className="text-2xl font-bold">{formatRupiah(totalPayment)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Status Pembayaran</p>
            <p className="text-2xl font-bold">{paymentStatus}</p>
            <p className="text-xs font-semibold text-neutral-700">
              Sisa waktu {formatTimer(paymentSeconds)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3 text-sm text-neutral-900">
          <ShieldCheck className="mt-0.5 shrink-0 text-neutral-600" size={30} />
          <p>
            Setelah pembayaran berhasil, status booking akan otomatis diperbarui.
            Jangan tutup pembayaran ini sebelum pembayaran terverifikasi.
          </p>
        </div>

        {error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

        <button
          type="button"
          onClick={onCheckPayment}
          disabled={isSubmitting}
          className="mt-5 w-full rounded-full bg-[#17a900] px-5 py-3 text-lg font-bold text-white hover:bg-[#148f00] disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {isSubmitting ? "Memverifikasi..." : "Cek Status Pembayaran"}
        </button>

        {onSimulateSandboxPayment && (
          <button
            type="button"
            onClick={onSimulateSandboxPayment}
            disabled={isSubmitting}
            className="mt-3 w-full rounded-full border border-[#bf9130] bg-white px-5 py-3 text-base font-bold text-[#bf9130] hover:bg-[#fff7e6] disabled:cursor-not-allowed disabled:border-neutral-300 disabled:text-neutral-400"
          >
            Simulasi Pembayaran Sandbox
          </button>
        )}
      </section>
    </div>
  );
}

function BookingInfo({
  formData,
  treatment,
  therapist,
  totalPayment,
}: {
  formData: BookingFormData;
  treatment: string;
  therapist: string;
  totalPayment: number;
}) {
  return (
    <div className="rounded-2xl bg-[#fbf7f7] p-4 shadow-[0_0_14px_rgba(0,0,0,0.16)] md:p-5">
      <div className="mb-3 flex items-center gap-2">
        <CalendarDays size={24} className="text-neutral-500" />
      </div>
      <div className="space-y-1.5 text-xs md:text-sm">
        <InfoRow label="Nama" value={formData.fullName || "-"} />
        <InfoRow label="Treatment" value={treatment} />
        <InfoRow label="Dokter / Terapis" value={therapist} />
        <InfoRow label="Tanggal" value={formatDate(formData.bookingDate)} />
        <InfoRow label="Jam" value={formData.bookingTime || "-"} />
      </div>
      <div className="my-4 border-t border-neutral-300" />
      <InfoRow label="Total Pembayaran" value={formatRupiah(totalPayment)} strong />
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

function PaymentMethodBadges() {
  const methods = ["BCA", "BRI", "DANA", "OVO", "GoPay", "Shopee", "LinkAja"];

  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
      {methods.map((method) => (
        <span
          key={method}
          className="rounded-md bg-white px-2 py-1 text-xs font-bold text-[#1f65c9] shadow-sm ring-1 ring-neutral-200"
        >
          {method}
        </span>
      ))}
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

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}
