import { ClipboardCheck } from "lucide-react";
import type {
  TreatmentPatient,
  TreatmentResult,
  TreatmentResultFormData,
} from "./TreatmentResultTypes";

type TreatmentResultPreviewProps = {
  patient: TreatmentPatient;
  formData: TreatmentResultFormData;
  savedResult?: TreatmentResult;
};

export default function TreatmentResultPreview({
  patient,
  formData,
  savedResult,
}: TreatmentResultPreviewProps) {
  const detailItems = [
    formData.skinCondition,
    formData.treatmentResult,
    formData.recommendation,
    formData.homeCare,
  ].filter(Boolean);

  return (
    <aside className="rounded-lg border border-neutral-200 bg-[#fffdf5] p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d6b53f]/15 text-[#b89624]">
          <ClipboardCheck size={20} />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#b89624]">
            Preview Riwayat Customer
          </p>
          <h3 className="text-lg font-bold text-black">{patient.treatment}</h3>
        </div>
      </div>

      <dl className="grid gap-3 rounded-md bg-white p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-bold text-black">Pasien</dt>
          <dd className="text-neutral-700">{patient.name}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">Ruangan</dt>
          <dd className="text-neutral-700">{patient.room}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">Jadwal</dt>
          <dd className="text-neutral-700">{patient.schedule}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">Pembayaran</dt>
          <dd className="text-neutral-700">{patient.payment}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <h4 className="text-base font-bold text-black">Hasil Treatment</h4>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-700">
          {detailItems.length > 0 ? (
            detailItems.map((detail) => (
              <li
                key={detail}
                className="rounded-md border border-neutral-200 bg-white px-4 py-2"
              >
                {detail}
              </li>
            ))
          ) : (
            <li className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-3 text-neutral-500">
              Isi form untuk melihat hasil yang akan tampil di popup riwayat.
            </li>
          )}
        </ul>
      </div>

      <p className="mt-4 rounded-md bg-[#fff8df] px-4 py-3 text-sm leading-6 text-neutral-700">
        {formData.controlNote ||
          "Catatan kontrol akan tampil sebagai note pada detail riwayat customer."}
      </p>

      {savedResult ? (
        <p className="mt-4 text-xs font-semibold text-emerald-700">
          Terakhir dikirim: {savedResult.submittedAt}
        </p>
      ) : null}
    </aside>
  );
}
