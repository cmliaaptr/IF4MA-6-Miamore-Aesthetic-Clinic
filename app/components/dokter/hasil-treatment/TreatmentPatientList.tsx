import { CheckCircle2, FilePenLine } from "lucide-react";
import type {
  TreatmentPatient,
  TreatmentResult,
} from "./TreatmentResultTypes";

type TreatmentPatientListProps = {
  patients: TreatmentPatient[];
  results: Record<number, TreatmentResult>;
  selectedPatientId: number | null;
  onSelect: (patient: TreatmentPatient) => void;
  onFill: (patient: TreatmentPatient) => void;
};

export default function TreatmentPatientList({
  patients,
  results,
  selectedPatientId,
  onSelect,
  onFill,
}: TreatmentPatientListProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left md:min-w-[760px]">
        <thead>
          <tr className="border-b border-neutral-200 text-sm font-semibold text-neutral-600">
            <th className="w-[64px] px-4 py-4 text-center">No.</th>
            <th className="px-4 py-4">Nama Pasien</th>
            <th className="hidden px-4 py-4 sm:table-cell">Treatment</th>
            <th className="px-4 py-4">Jadwal</th>
            <th className="w-[150px] px-4 py-4 text-center">Status Hasil</th>
            <th className="w-[130px] px-4 py-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-8 text-center text-sm font-medium text-neutral-500"
              >
                Belum ada booking lunas untuk ditampilkan.
              </td>
            </tr>
          ) : null}

          {patients.map((patient, index) => {
            const hasResult = Boolean(results[patient.id]);
            const isSelected = patient.id === selectedPatientId;

            return (
              <tr
                key={patient.id}
                onClick={() => onSelect(patient)}
                className={`cursor-pointer border-b border-neutral-100 text-sm text-neutral-800 transition last:border-b-0 hover:bg-[#fffdf0] ${
                  isSelected ? "bg-[#fff8df]" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(patient);
                    }}
                    className="text-left font-semibold text-neutral-900 transition hover:text-[#b89624]"
                  >
                    {patient.name}
                  </button>
                  <p className="mt-1 text-xs text-neutral-500 sm:hidden">
                    {patient.treatment}
                  </p>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell">
                  {patient.treatment}
                </td>
                <td className="px-4 py-3 text-neutral-600">
                  {patient.schedule}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex min-w-24 items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      hasResult
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {hasResult ? <CheckCircle2 size={14} /> : null}
                    {hasResult ? "Terkirim" : "Belum Diisi"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onFill(patient);
                    }}
                    className="inline-flex h-9 items-center gap-2 rounded-md bg-[#d6b53f] px-3 text-sm font-semibold text-white transition hover:bg-[#c29f2f]"
                  >
                    <FilePenLine size={16} />
                    Isi
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
