import { CalendarDays, ChevronDown, MessageCircle, User } from "lucide-react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

export type BookingTreatment = {
  name: string;
  price?: string;
};

export type BookingFormData = {
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

export type BookingPayload = {
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
  metode_pembayaran?: string;
};

export type BookingStep = "form" | "payment" | "success";

export type SelectOption = {
  label: string;
  value: string;
};

export type DoctorApiItem = {
  id_user: number;
  username: string;
  role: string;
};

export type LoggedInCustomer = {
  id_user: number;
  username: string;
  email?: string;
  role: string;
};

export type BookingFieldChangeEvent =
  ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

export const clinicOperatingTimeOptions: SelectOption[] = [
  { label: "09:00", value: "09:00" },
  { label: "10:00", value: "10:00" },
  { label: "11:00", value: "11:00" },
  { label: "13:00", value: "13:00" },
  { label: "14:00", value: "14:00" },
  { label: "15:00", value: "15:00" },
  { label: "16:00", value: "16:00" },
];

export const fallbackTherapistOptions: SelectOption[] = [
  { label: "Dr. Marissa", value: "Dr. Marissa" },
  { label: "Dr. Nadine", value: "Dr. Nadine" },
  { label: "Terapis Miamore", value: "Terapis Miamore" },
];

export const defaultTreatmentOptions: BookingTreatment[] = [
  { name: "Basmi Flek Coba-Coba", price: "Rp. 500.000" },
  { name: "Acne Treatment", price: "Rp. 450.000" },
  { name: "Glowing Treatment", price: "Rp. 600.000" },
];

export const initialBookingForm: BookingFormData = {
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

export function priceToNumber(price?: string) {
  if (!price) return 350000;
  const parsed = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 350000;
}

export function createTreatmentOptions(
  selectedTreatment?: BookingTreatment | null,
  availableTreatments: BookingTreatment[] = []
) {
  const treatmentMap = new Map<string, BookingTreatment>();
  const sourceTreatments = [selectedTreatment, ...availableTreatments].filter(
    (treatment): treatment is BookingTreatment => Boolean(treatment?.name)
  );
  const treatments = sourceTreatments;

  treatments.forEach((treatment) => {
    if (!treatment?.name) return;
    const existingTreatment = treatmentMap.get(treatment.name);
    treatmentMap.set(treatment.name, {
      name: treatment.name,
      price: treatment.price || existingTreatment?.price,
    });
  });

  return Array.from(treatmentMap.values());
}

export function toUniqueOptions(options: SelectOption[]) {
  const optionMap = new Map<string, SelectOption>();

  options.forEach((option) => {
    if (!option.value) return;
    optionMap.set(option.value, option);
  });

  return Array.from(optionMap.values());
}

export function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

export function getLoggedInCustomer(): LoggedInCustomer | null {
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

export function createBookingPayload(
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
    metode_pembayaran: "QRIS",
  };
}

type BookingProps = {
  formData: BookingFormData;
  selectedTreatment?: BookingTreatment | null;
  treatmentOptions: BookingTreatment[];
  timeOptions: SelectOption[];
  therapistOptions: SelectOption[];
  error: string;
  isSubmitting: boolean;
  onChange: (event: BookingFieldChangeEvent) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function Booking({
  formData,
  selectedTreatment,
  treatmentOptions,
  timeOptions,
  therapistOptions,
  error,
  isSubmitting,
  onChange,
  onSubmit,
}: BookingProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          <TextField label="Nama Lengkap" name="fullName" value={formData.fullName} onChange={onChange} />
          <TextField label="Tanggal Lahir" name="birthDate" type="date" value={formData.birthDate} onChange={onChange} />
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
                    onChange={onChange}
                    className="h-4 w-4 accent-[#bf9130]"
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
          <TextField label="No. Telephone" name="phone" value={formData.phone} placeholder="08xxxxxxxxxx" onChange={onChange} />
          <TextField label="Email (opsional)" name="email" type="email" value={formData.email} onChange={onChange} />
          <TextAreaField label="Alamat" name="address" value={formData.address} onChange={onChange} />
        </div>
      </FormSection>

      <FormSection icon={<CalendarDays size={18} />} title="DETAIL BOOKING">
        <div className="grid gap-3 md:grid-cols-2">
          <TextField label="Tanggal Booking" name="bookingDate" type="date" value={formData.bookingDate} onChange={onChange} />
          <SelectField label="Waktu Booking" name="bookingTime" value={formData.bookingTime} onChange={onChange} options={timeOptions} placeholder="Pilih waktu" />
        </div>
        <SelectField label="Layanan / Treatment yang dipilih" name="treatment" value={formData.treatment || selectedTreatment?.name || ""} onChange={onChange} options={treatmentOptions} placeholder="Pilih Treatment" />
        <SelectField
          label="Dokter / Terapis"
          name="therapist"
          value={formData.therapist}
          onChange={onChange}
          options={therapistOptions}
          placeholder={
            therapistOptions.length > 0
              ? "Pilih Dokter/Terapis"
              : "Belum ada Dokter/Terapis yang tersedia"
          }
        />
      </FormSection>

      <FormSection icon={<MessageCircle size={18} />} title="CATATAN TAMBAHAN">
        <textarea
          name="notes"
          value={formData.notes}
          onChange={onChange}
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
        {isSubmitting ? "Memproses..." : "Lanjutkan ke Pembayaran"}
      </button>
    </form>
  );
}

function FormSection({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
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
  options: Array<BookingTreatment | SelectOption>;
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
            <option key={"value" in option ? option.value : option.name} value={"value" in option ? option.value : option.name}>
              {"value" in option
                ? option.label
                : option.price
                  ? `${option.name} - ${option.price}`
                  : option.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-neutral-800" size={28} />
      </div>
    </div>
  );
}
