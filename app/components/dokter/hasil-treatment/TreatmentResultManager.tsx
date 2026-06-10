"use client";

import { useMemo, useState } from "react";
import TreatmentPatientList from "./TreatmentPatientList";
import TreatmentResultForm from "./TreatmentResultForm";
import TreatmentResultPreview from "./TreatmentResultPreview";
import type {
  TreatmentPatient,
  TreatmentResult,
  TreatmentResultFormData,
} from "./TreatmentResultTypes";

const emptyForm: TreatmentResultFormData = {
  skinCondition: "",
  treatmentResult: "",
  recommendation: "",
  homeCare: "",
  controlNote: "",
};

type TreatmentResultManagerProps = {
  patients: TreatmentPatient[];
};

export default function TreatmentResultManager({
  patients,
}: TreatmentResultManagerProps) {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [results, setResults] = useState<Record<number, TreatmentResult>>({});
  const [formData, setFormData] = useState<TreatmentResultFormData>(emptyForm);
  const [message, setMessage] = useState("");

  const savedResult = selectedPatient ? results[selectedPatient.id] : undefined;

  const completedCount = useMemo(
    () => Object.keys(results).length,
    [results]
  );

  const handleSelect = (patient: TreatmentPatient) => {
    setSelectedPatient(patient);
    setFormData(results[patient.id] ?? emptyForm);
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
    const isIncomplete = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (isIncomplete) {
      setMessage("Lengkapi semua field hasil treatment terlebih dahulu.");
      return;
    }

    const submittedAt = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    setResults((prev) => ({
      ...prev,
      [selectedPatient.id]: {
        ...formData,
        submittedAt,
      },
    }));
    setMessage("Hasil treatment berhasil disiapkan untuk riwayat customer.");
  };

  return (
    <div className="mt-10 space-y-7">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm font-semibold text-neutral-500">
            Treatment Selesai
          </p>
          <p className="mt-2 text-3xl font-bold text-black">
            {patients.length}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm font-semibold text-neutral-500">
            Hasil Terkirim
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {completedCount}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5">
          <p className="text-sm font-semibold text-neutral-500">
            Belum Diisi
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {patients.length - completedCount}
          </p>
        </div>
      </div>

      <TreatmentPatientList
        patients={patients}
        results={results}
        selectedPatientId={selectedPatient.id}
        onSelect={handleSelect}
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <TreatmentResultForm
          patient={selectedPatient}
          formData={formData}
          onChange={handleChange}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
        <TreatmentResultPreview
          patient={selectedPatient}
          formData={formData}
          savedResult={savedResult}
        />
      </div>
    </div>
  );
}
