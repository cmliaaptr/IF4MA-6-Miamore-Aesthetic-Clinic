"use client";

import { X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Booking, {
  BookingFieldChangeEvent,
  BookingStep,
  BookingTreatment,
  clinicOperatingTimeOptions,
  createBookingPayload,
  createTreatmentOptions,
  DoctorApiItem,
  fallbackTherapistOptions,
  getLoggedInCustomer,
  initialBookingForm,
  parseApiText,
  priceToNumber,
  SelectOption,
  toUniqueOptions,
} from "./Booking";
import Payment from "./Payment";
import PembayaranSelesai from "./PembayaranSelesai";

export type { BookingTreatment } from "./Booking";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

type BookingModalProps = {
  isOpen: boolean;
  selectedTreatment?: BookingTreatment | null;
  availableTreatments?: BookingTreatment[];
  onClose: () => void;
};

export default function BookingModal({
  isOpen,
  selectedTreatment,
  availableTreatments = [],
  onClose,
}: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>("form");
  const [formData, setFormData] = useState(initialBookingForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("TRD123456789");
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [doctorOptions, setDoctorOptions] = useState<SelectOption[]>([]);
  const [paymentSeconds, setPaymentSeconds] = useState(15 * 60);
  const [paymentCompletedAt, setPaymentCompletedAt] = useState("");

  const treatmentOptions = useMemo(
    () => createTreatmentOptions(selectedTreatment, availableTreatments),
    [availableTreatments, selectedTreatment]
  );

  const selectedTreatmentOption = treatmentOptions.find(
    (treatment) => treatment.name === (formData.treatment || selectedTreatment?.name)
  );

  const totalPayment = useMemo(
    () => priceToNumber(selectedTreatmentOption?.price || selectedTreatment?.price),
    [selectedTreatment?.price, selectedTreatmentOption?.price]
  );

  const therapistOptions = useMemo(() => {
    return doctorOptions.length > 0 ? doctorOptions : fallbackTherapistOptions;
  }, [doctorOptions]);

  const displayTreatment = formData.treatment || selectedTreatment?.name || "Facial Treatment";
  const displayTherapist = formData.therapist || "-";

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const doctorResponse = await fetch(`${API_BASE_URL}/api/dokter`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!doctorResponse.ok) return;

        const text = await doctorResponse.text();
        const result = parseApiText(text);
        const doctors = Array.isArray(result?.data) ? (result.data as DoctorApiItem[]) : [];

        setDoctorOptions(
          toUniqueOptions(
            doctors
              .filter((doctor) => doctor.role === "dokter" && doctor.username)
              .map((doctor) => ({
                label: doctor.username,
                value: doctor.username,
              }))
          )
        );
      } catch (doctorError) {
        console.error("Gagal mengambil data dokter", doctorError);
      }
    }

    if (isOpen) {
      fetchDoctors();
    }
  }, [isOpen]);

  useEffect(() => {
    if (step !== "payment") return;

    const timer = window.setInterval(() => {
      setPaymentSeconds((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step]);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep("form");
    setError("");
    setIsSubmitting(false);
    setBookingId(null);
    setPaymentSeconds(15 * 60);
    setPaymentCompletedAt("");
    setFormData(initialBookingForm);
    onClose();
  };

  const handleChange = (event: BookingFieldChangeEvent) => {
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
        body: JSON.stringify(createBookingPayload(nextForm, totalPayment, customer)),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const validationMessage = result?.errors
          ? Object.values(result.errors).flat().join(" ")
          : result?.message;
        throw new Error(validationMessage || "Booking gagal dibuat.");
      }

      setOrderId(result?.data?.order_id || result?.order_id || orderId);
      setBookingId(typeof result?.data?.id_booking === "number" ? result.data.id_booking : null);
      setPaymentSeconds(15 * 60);
      setStep("payment");
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

  const handleConfirmPayment = async () => {
    setError("");

    if (!bookingId) {
      setError("Data booking tidak ditemukan. Silakan ulangi booking.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ metode_pembayaran: "QRIS" }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Pembayaran gagal dikonfirmasi.");
      }

      setPaymentCompletedAt(new Date().toISOString());
      setStep("success");
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Pembayaran gagal dikonfirmasi. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setError("");
    setIsSubmitting(false);
    setStep("form");
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
            <Booking
              formData={formData}
              selectedTreatment={selectedTreatment}
              treatmentOptions={treatmentOptions}
              timeOptions={clinicOperatingTimeOptions}
              therapistOptions={therapistOptions}
              error={error}
              isSubmitting={isSubmitting}
              onChange={handleChange}
              onSubmit={handleSubmitBooking}
            />
          )}

          {step === "payment" && (
            <Payment
              orderId={orderId}
              totalPayment={totalPayment}
              treatment={displayTreatment}
              therapist={displayTherapist}
              formData={formData}
              paymentSeconds={paymentSeconds}
              error={error}
              isSubmitting={isSubmitting}
              onBackToForm={handleBackToForm}
              onConfirmPayment={handleConfirmPayment}
            />
          )}

          {step === "success" && (
            <PembayaranSelesai
              orderId={orderId}
              totalPayment={totalPayment}
              treatment={displayTreatment}
              therapist={displayTherapist}
              formData={formData}
              paymentCompletedAt={paymentCompletedAt}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
