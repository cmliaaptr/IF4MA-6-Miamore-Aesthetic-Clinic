import { RotateCcw, Send } from "lucide-react";
import type {
  TreatmentPatient,
  TreatmentResultFormData,
} from "./TreatmentResultTypes";

type TreatmentResultFormProps = {
  patient: TreatmentPatient;
  formData: TreatmentResultFormData;
  onChange: (field: keyof TreatmentResultFormData, value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
};

const fields: {
  name: keyof TreatmentResultFormData;
  label: string;
  placeholder: string;
  rows: number;
}[] = [
  {
    name: "skinCondition",
    label: "Kondisi Kulit Setelah Treatment",
    placeholder: "Contoh: kemerahan ringan di area pipi, kulit terasa lembap.",
    rows: 3,
  },
  {
    name: "treatmentResult",
    label: "Hasil Treatment",
    placeholder: "Contoh: komedo berkurang, tekstur kulit lebih halus.",
    rows: 4,
  },
  {
    name: "recommendation",
    label: "Rekomendasi Dokter",
    placeholder: "Contoh: gunakan sunscreen setiap pagi dan hindari eksfoliasi.",
    rows: 3,
  },
  {
    name: "homeCare",
    label: "Home Care",
    placeholder: "Contoh: facial wash gentle, pelembap ringan, sunscreen SPF 30.",
    rows: 3,
  },
  {
    name: "controlNote",
    label: "Catatan Kontrol",
    placeholder: "Contoh: kontrol ulang 2 minggu lagi untuk evaluasi.",
    rows: 3,
  },
];

export default function TreatmentResultForm({
  patient,
  formData,
  onChange,
  onReset,
  onSubmit,
}: TreatmentResultFormProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="mb-5 border-b border-neutral-200 pb-4">
        <p className="text-sm font-semibold text-[#d6b53f]">
          Form Hasil Treatment
        </p>
        <h2 className="mt-1 text-2xl font-bold text-black">{patient.name}</h2>
        <p className="mt-1 text-sm text-neutral-600">
          {patient.treatment} - {patient.schedule}
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-2 block text-sm font-semibold text-neutral-800"
            >
              {field.label}
            </label>
            <textarea
              id={field.name}
              value={formData[field.name]}
              rows={field.rows}
              onChange={(event) => onChange(field.name, event.target.value)}
              placeholder={field.placeholder}
              className="w-full resize-none rounded-md border border-neutral-300 px-3 py-2 text-sm leading-6 outline-none transition placeholder:text-neutral-400 focus:border-[#d6b53f] focus:ring-2 focus:ring-[#d6b53f]/20"
            />
          </div>
        ))}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#d6b53f] px-5 text-sm font-semibold text-white transition hover:bg-[#c29f2f]"
          >
            <Send size={16} />
            Kirim Hasil
          </button>
        </div>
      </form>
    </div>
  );
}
