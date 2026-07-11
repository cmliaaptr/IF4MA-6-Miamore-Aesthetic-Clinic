"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import TreatmentPatientList from "./TreatmentPatientList";
import TreatmentResultForm from "./TreatmentResultForm";
import TreatmentResultPreview from "./TreatmentResultPreview";
import type {
  TreatmentPatient,
  TreatmentResult,
  TreatmentResultFormData,
  TreatmentResultSummary,
} from "./TreatmentResultTypes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const emptyForm: TreatmentResultFormData = {
  skinCondition: "",
  treatmentResult: "",
  recommendation: "",
  homeCare: "",
  controlNote: "",
};

type LoggedInDoctor = {
  id_user: number;
  username: string;
  role: string;
};

function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

function getLoggedInDoctor(): LoggedInDoctor | null {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return null;

    const user = JSON.parse(rawUser) as Partial<LoggedInDoctor>;
    if (
      typeof user.id_user !== "number" ||
      typeof user.username !== "string" ||
      user.role !== "dokter"
    ) {
      return null;
    }

    return {
      id_user: user.id_user,
      username: user.username,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export default function TreatmentResultManager() {
  const [patients, setPatients] = useState<TreatmentPatient[]>([]);
  const [summary, setSummary] = useState<TreatmentResultSummary>({
    treatment_selesai: 0,
    hasil_terkirim: 0,
    belum_diisi: 0,
  });
  const [selectedPatient, setSelectedPatient] =
    useState<TreatmentPatient | null>(null);
  const [formPatient, setFormPatient] = useState<TreatmentPatient | null>(null);
  const [formData, setFormData] = useState<TreatmentResultFormData>(emptyForm);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const results = useMemo(
    () =>
      patients.reduce<Record<number, TreatmentResult>>((acc, patient) => {
        if (patient.result) {
          acc[patient.id] = patient.result;
        }

        return acc;
      }, {}),
    [patients]
  );

  const savedResult = selectedPatient ? results[selectedPatient.id] : undefined;

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);

    try {
      const doctor = getLoggedInDoctor();
      const url = new URL(`${API_BASE_URL}/api/treatment-results/doctor`);

      if (doctor?.username) {
        url.searchParams.set("doctor_name", doctor.username);
      }

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
        },
      });
      const text = await response.text();
      const result = text ? parseApiText(text) : null;

      if (!response.ok) {
        throw new Error(result?.message || "Gagal mengambil data pasien.");
      }

      const nextPatients = Array.isArray(result?.data)
        ? (result.data as TreatmentPatient[])
        : [];

      setPatients(nextPatients);
      setSummary(
        result?.summary || {
          treatment_selesai: nextPatients.length,
          hasil_terkirim: nextPatients.filter((patient) => patient.result)
            .length,
          belum_diisi: nextPatients.filter((patient) => !patient.result)
            .length,
        }
      );
      setSelectedPatient((current) => {
        if (!nextPatients.length) return null;
        return (
          nextPatients.find((patient) => patient.id === current?.id) ||
          nextPatients[0]
        );
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data hasil treatment."
      );
      setPatients([]);
      setSelectedPatient(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchPatients);
  }, [fetchPatients]);

  const handleSelect = (patient: TreatmentPatient) => {
    setSelectedPatient(patient);
    setMessage("");
  };

  const handleOpenForm = (patient: TreatmentPatient) => {
    setSelectedPatient(patient);
    setFormPatient(patient);
    setFormData(results[patient.id] ?? emptyForm);
    setMessage("");
  };

  const handleCloseForm = () => {
    setFormPatient(null);
    setMessage("");
  };

  const handleChange = (field: keyof TreatmentResultFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFormData(emptyForm);
    setMessage("");
  };

  const handleSubmit = () => {
    if (!formPatient) return;

    const isIncomplete = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (isIncomplete) {
      setMessage("Lengkapi semua field hasil treatment terlebih dahulu.");
      return;
    }

    submitResult(formPatient);
  };

  const submitResult = async (patient: TreatmentPatient) => {
    const doctor = getLoggedInDoctor();

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/treatment-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id_booking: patient.id_booking,
          submitted_by: doctor?.id_user,
          skin_condition: formData.skinCondition,
          treatment_result: formData.treatmentResult,
          recommendation: formData.recommendation,
          home_care: formData.homeCare,
          control_note: formData.controlNote,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const validationMessage = result?.errors
          ? Object.values(result.errors).flat().join(" ")
          : result?.message;
        throw new Error(validationMessage || "Gagal mengirim hasil treatment.");
      }

      setMessage("Hasil treatment berhasil dikirim ke riwayat customer.");
      setFormPatient(null);
      await fetchPatients();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengirim hasil treatment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 space-y-7">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm font-semibold text-neutral-500">
            Treatment Selesai
          </p>
          <p className="mt-2 text-3xl font-bold text-black">
            {summary.treatment_selesai}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm font-semibold text-neutral-500">
            Hasil Terkirim
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {summary.hasil_terkirim}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm font-semibold text-neutral-500">
            Belum Diisi
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {summary.belum_diisi}
          </p>
        </div>
      </div>

      {isLoading ? (
        <p className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-600">
          Memuat data hasil treatment...
        </p>
      ) : null}

      <TreatmentPatientList
        patients={patients}
        results={results}
        selectedPatientId={selectedPatient?.id ?? null}
        onSelect={handleSelect}
        onFill={handleOpenForm}
      />

      {message ? (
        <p
          className={`rounded-md px-4 py-3 text-sm font-semibold ${
            message.includes("berhasil")
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message}
        </p>
      ) : null}

      <div className="grid gap-6">
        {selectedPatient ? (
          <TreatmentResultPreview
            patient={selectedPatient}
            formData={results[selectedPatient.id] ?? emptyForm}
            savedResult={savedResult}
          />
        ) : null}
      </div>

      {formPatient ? (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/25 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[calc(100dvh-48px)] w-full max-w-3xl overflow-y-auto rounded-lg shadow-2xl">
            <TreatmentResultForm
              patient={formPatient}
              formData={formData}
              onChange={handleChange}
              onReset={handleReset}
              onSubmit={handleSubmit}
              onClose={handleCloseForm}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
