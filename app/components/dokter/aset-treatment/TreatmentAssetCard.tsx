import Image from "next/image";
import Link from "next/link";
import { Bookmark, ChevronRight, Clock3, FlaskConical } from "lucide-react";
import type { TreatmentAsset } from "./TreatmentAssetTypes";

type TreatmentAssetCardProps = {
  asset: TreatmentAsset;
};

export default function TreatmentAssetCard({ asset }: TreatmentAssetCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-violet-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-40 overflow-hidden bg-violet-50">
        <Image
          src={asset.image}
          alt={asset.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-bold uppercase text-white shadow-sm ${asset.categoryTone}`}
        >
          {asset.category}
        </span>
        <button
          type="button"
          aria-label={`Simpan ${asset.name}`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-white/95 text-slate-700 shadow-sm"
        >
          <Bookmark size={18} />
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-slate-950">{asset.name}</h2>
        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">
          {asset.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <Clock3 size={16} />
            </span>
            <div>
              <p className="text-xs text-slate-500">Durasi</p>
              <p className="font-bold">{asset.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <FlaskConical size={16} />
            </span>
            <div>
              <p className="text-xs text-slate-500">Langkah</p>
              <p className="font-bold">{asset.steps.length} Langkah</p>
            </div>
          </div>
        </div>

        <Link
          href={`/dokter/aset-treatment/${asset.slug}`}
          className="mt-5 flex h-11 items-center justify-between rounded-md bg-violet-50 px-4 text-sm font-bold text-violet-700 transition hover:bg-violet-100"
        >
          Lihat Detail Takaran
          <ChevronRight size={18} />
        </Link>
      </div>
    </article>
  );
}
