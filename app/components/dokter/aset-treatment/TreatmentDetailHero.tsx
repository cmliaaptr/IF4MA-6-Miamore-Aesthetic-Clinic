import Image from "next/image";
import Link from "next/link";
import { Clock3, FlaskConical, Pencil, Sparkles } from "lucide-react";
import type { TreatmentAsset } from "./TreatmentAssetTypes";

type TreatmentDetailHeroProps = {
  asset: TreatmentAsset;
};

export default function TreatmentDetailHero({ asset }: TreatmentDetailHeroProps) {
  return (
    <section className="rounded-lg border border-violet-100 bg-white p-4 shadow-sm md:p-5">
      <div className="grid gap-5 lg:grid-cols-[240px,1fr_auto]">
        <div className="relative min-h-[170px] overflow-hidden rounded-md bg-violet-50">
          <Image
            src={asset.image}
            alt={asset.name}
            fill
            sizes="(min-width: 1024px) 240px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="py-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-950 md:text-3xl">
              {asset.name}
            </h1>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
              {asset.category} & Hydration
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            {asset.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <DetailMetric
              icon={<Clock3 size={18} />}
              label="Durasi"
              value={asset.duration}
            />
            <DetailMetric
              icon={<FlaskConical size={18} />}
              label="Steps"
              value={`${asset.steps.length} Langkah`}
            />
            <DetailMetric
              icon={<Sparkles size={18} />}
              label="Tipe Kulit"
              value="Semua Jenis Kulit"
            />
          </div>
        </div>

        <Link
          href="/admin/treatment"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-violet-300 px-4 text-sm font-bold text-violet-700 transition hover:bg-violet-50 lg:self-start"
        >
          <Pencil size={16} />
          Edit Treatment
        </Link>
      </div>
    </section>
  );
}

function DetailMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-700">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
      </div>
    </div>
  );
}
