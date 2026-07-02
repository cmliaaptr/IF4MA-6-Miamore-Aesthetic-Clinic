import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import TreatmentDetailHero from "./TreatmentDetailHero";
import TreatmentDetailSidebar from "./TreatmentDetailSidebar";
import TreatmentDosageTable from "./TreatmentDosageTable";
import type { TreatmentAsset } from "./TreatmentAssetTypes";

type TreatmentAssetDetailProps = {
  asset: TreatmentAsset;
};

export default function TreatmentAssetDetail({
  asset,
}: TreatmentAssetDetailProps) {
  return (
    <section className="mx-auto max-w-7xl">
      <header className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-950">Aset Treatment</h1>
        <Link
          href="/dokter/aset-treatment"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition hover:text-violet-700"
        >
          <ArrowLeft size={17} />
          Kembali
        </Link>
      </header>

      <TreatmentDetailHero asset={asset} />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-slate-950">
              Takaran Aset per Langkah Treatment
            </h2>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-violet-300 bg-white px-4 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
            >
              <Download size={16} />
              Unduh Panduan (PDF)
            </button>
          </div>

          <TreatmentDosageTable asset={asset} />
        </div>

        <TreatmentDetailSidebar />
      </div>
    </section>
  );
}
