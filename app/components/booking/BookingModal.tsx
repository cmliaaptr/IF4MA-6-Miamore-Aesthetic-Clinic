"use client";

import { CalendarDays, Check, ChevronDown, Home, MessageCircle, User, X } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

export type BookingTreatment = {
  name: string;
  price?: string;
};

type BookingModalProps = {
  isOpen: boolean;
  selectedTreatment?: BookingTreatment | null;
  onClose: () => void;
};

type BookingFormData = {
  fullName: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bookingDate: string;
  bookingTime: string;
  treatment: string;
  therapist: string;
  notes: string;
};

type BookingPayload = {
  id_user: number;
  nama_lengkap: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  no_telephone: string;
  email?: string;
  alamat: string;
  tanggal_booking: string;
  waktu_booking: string;
  treatment: string;
  dokter_terapis?: string;
  catatan?: string;
  total_pembayaran?: number;
};

type BookingStep = "form" | "success";

type LoggedInCustomer = {
  id_user: number;
  username: string;
  email?: string;
  role: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const timeOptions = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
const therapistOptions = ["Dr. Marissa", "Dr. Nadine", "Terapis Miamore"];

const initialForm: BookingFormData = {
  fullName: "",
  birthDate: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  bookingDate: "",
  bookingTime: "",
  treatment: "",
  therapist: "",
  notes: "",
};

function priceToNumber(price?: string) {
  if (!price) return 350000;
  const parsed = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 350000;
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

function getLoggedInCustomer(): LoggedInCustomer | null {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return null;

    const user = JSON.parse(rawUser) as Partial<LoggedInCustomer>;
    if (
      typeof user.id_user !== "number" ||
      user.role !== "pelanggan" ||
      typeof user.username !== "string"
    ) {
      return null;
    }

    return {
      id_user: user.id_user,
      username: user.username,
      email: typeof user.email === "string" ? user.email : undefined,
      role: user.role,
    };
  } catch {
    return null;
  }
}

function createPayload(
  form: BookingFormData,
  totalPayment: number,
  customer: LoggedInCustomer
): BookingPayload {
  return {
    id_user: customer.id_user,
    nama_lengkap: form.fullName,
    tanggal_lahir: form.birthDate,
    jenis_kelamin: form.gender,
    no_telephone: form.phone,
    email: form.email || customer.email || undefined,
    alamat: form.address,
    tanggal_booking: form.bookingDate,
    waktu_booking: form.bookingTime,
    treatment: form.treatment,
    dokter_terapis: form.therapist || undefined,
    catatan: form.notes || undefined,
    total_pembayaran: totalPayment,
  };
}

export default function BookingModal({
  isOpen,
  selectedTreatment,
  onClose,
}: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>("form");
  const [formData, setFormData] = useState<BookingFormData>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("TRD123456789");

  const totalPayment = useMemo(
    () => priceToNumber(selectedTreatment?.price),
    [selectedTreatment?.price]
  );

  const treatmentOptions = useMemo(
    () => [
      selectedTreatment?.name,
      "Facial Treatment",
      "Acne Treatment",
      "Glowing Treatment",
      "Brightening",
      "Anti Aging",
    ].filter((item, index, arr): item is string => Boolean(item) && arr.indexOf(item) === index),
    [selectedTreatment?.name]
  );

  const displayTreatment = formData.treatment || selectedTreatment?.name || "Facial Treatment";
  const displayTherapist = formData.therapist || "Dr. Marissa";

  if (!isOpen) return null;

  const handleClose = () => {
    setStep("form");
    setError("");
    setIsSubmitting(false);
    setFormData(initialForm);
    onClose();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const treatment = formData.treatment || selectedTreatment?.name || "";
    const nextForm = { ...formData, treatment };
    const customer = getLoggedInCustomer();

    if (!customer) return setError("Silakan login sebagai pelanggan sebelum booking.");
    if (!nextForm.fullName.trim()) return setError("Nama lengkap wajib diisi.");
    if (!nextForm.birthDate) return setError("Tanggal lahir wajib diisi.");
    if (!nextForm.gender) return setError("Jenis kelamin wajib dipilih.");
    if (!nextForm.phone.trim()) return setError("No. telephone wajib diisi.");
    if (!nextForm.address.trim()) return setError("Alamat wajib diisi.");
    if (!nextForm.bookingDate) return setError("Tanggal booking wajib diisi.");
    if (!nextForm.bookingTime) return setError("Waktu booking wajib dipilih.");
    if (!nextForm.treatment) return setError("Treatment wajib dipilih.");

    setFormData(nextForm);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(createPayload(nextForm, totalPayment, customer)),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const validationMessage = result?.errors
          ? Object.values(result.errors).flat().join(" ")
          : result?.message;
        throw new Error(validationMessage || "Booking gagal dibuat.");
      }

      setOrderId(result?.data?.order_id || result?.order_id || orderId);
      setStep("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Booking gagal dibuat. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 px-3 py-4">
      <div className="mx-auto min-h-full w-full max-w-2xl">
        <div className="relative rounded-2xl bg-white p-4 text-neutral-950 shadow-2xl sm:p-5">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            aria-label="Tutup form booking"
          >
            <X size={20} />
          </button>

          {step === "form" && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <header>
                <h2 className="text-2xl font-bold text-[#bf9130] md:text-3xl">
                  Booking Treatment
                </h2>
                <p className="mt-1 text-sm font-medium md:text-base">
                  Lengkapi informasi dibawah untuk memesan jadwal anda
                </p>
              </header>

              <FormSection icon={<User size={18} />} title="DATA DIRI">
                <div className="grid gap-3 md:grid-cols-2">
                  <TextField label="Nama Lengkap" name="fullName" value={formData.fullName} onChange={handleChange} />
                  <TextField label="Tanggal Lahir" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
                  <div>
                    <label className="booking-label">Jenis Kelamin</label>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-neutral-600">
                      {["Perempuan", "Laki - Laki"].map((gender) => (
                        <label key={gender} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="gender"
                            value={gender}
                            checked={formData.gender === gender}
                            onChange={handleChange}
                            className="h-4 w-4 accent-[#bf9130]"
                          />
                          {gender}
                        </label>
                      ))}
                    </div>
                  </div>
                  <TextField label="No. Telephone" name="phone" value={formData.phone} placeholder="08xxxxxxxxxx" onChange={handleChange} />
                  <TextField label="Email (opsional)" name="email" type="email" value={formData.email} onChange={handleChange} />
                  <TextAreaField label="Alamat" name="address" value={formData.address} onChange={handleChange} />
                </div>
              </FormSection>

              <FormSection icon={<CalendarDays size={18} />} title="DETAIL BOOKING">
                <div className="grid gap-3 md:grid-cols-2">
                  <TextField label="Tanggal Booking" name="bookingDate" type="date" value={formData.bookingDate} onChange={handleChange} />
                  <SelectField label="Waktu Booking" name="bookingTime" value={formData.bookingTime} onChange={handleChange} options={timeOptions} placeholder="Pilih waktu" />
                </div>
                <SelectField label="Layanan / Treatment yang dipilih" name="treatment" value={formData.treatment || selectedTreatment?.name || ""} onChange={handleChange} options={treatmentOptions} placeholder="Pilih Treatment" />
                <SelectField label="Dokter / Terapis (Opsional)" name="therapist" value={formData.therapist} onChange={handleChange} options={therapistOptions} placeholder="Pilih Dokter / Terapis" />
              </FormSection>

              <FormSection icon={<MessageCircle size={18} />} title="CATATAN TAMBAHAN">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tuliskan keluhan kulit atau catatan khusus (opsional)"
                  className="min-h-20 w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#bf9130]"
                />
              </FormSection>

              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#17a900] px-5 py-3 text-lg font-bold text-white hover:bg-[#148f00] disabled:cursor-not-allowed disabled:bg-neutral-400 md:text-xl"
              >
                {isSubmitting ? "Memproses..." : "Booking Sekarang"}
              </button>
            </form>
          )}

          {step === "success" && (
            <SuccessStep
              orderId={orderId}
              totalPayment={totalPayment}
              treatment={displayTreatment}
              therapist={displayTherapist}
              formData={formData}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function FormSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-neutral-300 pt-8 first:border-t-0 first:pt-0">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#d0ad5d] px-4 py-2 text-sm font-bold text-white md:text-base">
        <span className="text-neutral-900">{icon}</span>
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="booking-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="booking-input"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label className="booking-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="booking-input min-h-24 resize-none py-4"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="booking-label" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="booking-input appearance-none pr-12"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-800" size={28} />
      </div>
    </div>
  );
}

function BookingInfo({
  formData,
  treatment,
  therapist,
  totalPayment,
  compact = false,
}: {
  formData: BookingFormData;
  treatment: string;
  therapist: string;
  totalPayment: number;
  compact?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-[#fbf7f7] p-4 shadow-[0_0_14px_rgba(0,0,0,0.16)] md:p-5">
      <div className="mb-3 flex items-center gap-2">
        <CalendarDays size={24} className="text-neutral-500" />
        {compact && <h3 className="text-lg font-bold">Detail Booking</h3>}
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

function SuccessStep({
  formData,
  treatment,
  therapist,
  totalPayment,
  orderId,
  onClose,
}: {
  formData: BookingFormData;
  treatment: string;
  therapist: string;
  totalPayment: number;
  orderId: string;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#43b400] text-white">
        <Check size={38} strokeWidth={4} />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-[#37b400]">Booking Berhasil!</h2>
        <p className="text-lg font-medium">Booking Anda sudah masuk ke sistem.</p>
      </div>

      <div className="text-left">
        <BookingInfo formData={formData} treatment={treatment} therapist={therapist} totalPayment={totalPayment} compact />
        <div className="mt-4 rounded-2xl bg-[#fbf7f7] p-4 text-left shadow-[0_0_14px_rgba(0,0,0,0.16)]">
          <div className="flex items-center gap-3 text-lg font-medium">
            <CalendarDays className="text-neutral-500" size={34} />
            Ingat Jadwal Anda
          </div>
          <p className="mt-5 text-sm">Mohon hadir 10 menit sebelum jadwal treatment</p>
          <p className="mt-5 text-sm">Terima kasih telah mempercayakan perawatan anda di Miamore Aesthetic Clinic</p>
          <div className="mt-5 space-y-2 text-sm">
            <InfoRow label="Status Booking" value="Booking" />
            <InfoRow label="Status Bayar" value="Belum Dibayar" strong />
            <InfoRow label="Order ID" value={orderId} />
          </div>
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
