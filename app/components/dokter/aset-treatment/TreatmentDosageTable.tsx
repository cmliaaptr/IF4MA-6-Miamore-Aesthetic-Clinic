import { Package } from "lucide-react";
import TreatmentMeasureVisual from "./TreatmentMeasureVisual";
import type { TreatmentAsset } from "./TreatmentAssetTypes";

type TreatmentDosageTableProps = {
  asset: TreatmentAsset;
};

export default function TreatmentDosageTable({
  asset,
}: TreatmentDosageTableProps) {
  return (
    <section>
      <div className="overflow-hidden rounded-lg border border-violet-100 bg-white shadow-sm">
        <div className="hidden grid-cols-[64px_190px_210px_120px_170px_1fr] border-b border-violet-100 bg-white px-5 py-4 text-sm font-bold text-slate-600 lg:grid">
          <span>No.</span>
          <span>Langkah</span>
          <span>Aset / Produk</span>
          <span>Takaran</span>
          <span>Visual Takaran</span>
          <span>Cara Penggunaan</span>
        </div>

        <div className="divide-y divide-violet-100">
          {asset.steps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className="grid gap-4 px-5 py-5 text-sm text-slate-700 lg:grid-cols-[64px_190px_210px_120px_170px_1fr] lg:items-center"
            >
              <div className="flex items-start gap-3 lg:block">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white shadow-sm">
                  {index + 1}
                </span>
                <div className="lg:hidden">
                  <p className="font-bold text-slate-950">{step.title}</p>
                  <p className="mt-1 leading-5 text-slate-600">
                    {getStepDescription(step.title)}
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <p className="font-bold text-slate-950">{step.title}</p>
                <p className="mt-1 leading-5 text-slate-600">
                  {getStepDescription(step.title)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-md bg-violet-50 text-violet-700">
                  <Package size={20} />
                </span>
                <div>
                  <p className="font-bold text-slate-950">{step.product}</p>
                  <p className="mt-1 leading-5 text-slate-600">
                    Miamore Professional {step.product}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-950">{step.dosage}</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">
                  {getDosageHint(step.dosage)}
                </p>
              </div>

              <TreatmentMeasureVisual title={step.title} dosage={step.dosage} />

              <p className="leading-6 text-slate-700">{step.usage}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getStepDescription(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("cleansing")) return "Membersihkan wajah dari makeup dan kotoran";
  if (normalized.includes("exfol") || normalized.includes("peel")) return "Mengangkat sel kulit mati";
  if (normalized.includes("toner")) return "Menyeimbangkan pH kulit dan menyiapkan kulit";
  if (normalized.includes("serum")) return "Memberikan nutrisi sesuai kebutuhan kulit";
  if (normalized.includes("mask")) return "Menutrisi dan menenangkan kulit";
  if (normalized.includes("sunscreen")) return "Melindungi kulit dari sinar UV";
  if (normalized.includes("massage")) return "Membantu relaksasi dan penyerapan produk";
  if (normalized.includes("laser")) return "Mengaktifkan teknologi sesuai protokol dokter";

  return "Langkah treatment sesuai protokol klinik";
}

function getDosageHint(dosage: string) {
  const normalized = dosage.toLowerCase();

  if (normalized.includes("pump")) return "(sesuai jumlah pump)";
  if (normalized.includes("gram")) return "(gunakan spatula/sendok kecil)";
  if (normalized.includes("tetes")) return "(gunakan pipet steril)";
  if (normalized.includes("jari")) return "(ukuran ruas jari)";
  if (normalized.includes("menit")) return "(durasi penggunaan)";

  return "(sesuai kebutuhan pasien)";
}
