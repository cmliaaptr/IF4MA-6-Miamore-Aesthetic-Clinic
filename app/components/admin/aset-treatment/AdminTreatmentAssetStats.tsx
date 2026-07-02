import {
  Activity,
  ClipboardList,
  FlaskConical,
  PackageCheck,
  PauseCircle,
} from "lucide-react";
import type { AdminTreatmentAsset } from "./AdminTreatmentAssetTypes";

type AdminTreatmentAssetStatsProps = {
  treatments: AdminTreatmentAsset[];
};

export default function AdminTreatmentAssetStats({
  treatments,
}: AdminTreatmentAssetStatsProps) {
  const totalProducts = treatments.reduce(
    (total, treatment) => total + treatment.products.length,
    0,
  );
  const totalSteps = treatments.reduce(
    (total, treatment) => total + treatment.steps.length,
    0,
  );
  const activeTreatments = treatments.filter(
    (treatment) => treatment.status === "Aktif",
  ).length;
  const inactiveTreatments = treatments.length - activeTreatments;

  const stats = [
    {
      label: "Total Treatment",
      value: treatments.length,
      note: "Semua treatment terdaftar",
      icon: ClipboardList,
      tone: "purple",
    },
    {
      label: "Total Aset / Produk",
      value: totalProducts,
      note: "Aset yang tersedia",
      icon: PackageCheck,
      tone: "green",
    },
    {
      label: "Total Langkah",
      value: totalSteps,
      note: "Di semua treatment",
      icon: FlaskConical,
      tone: "orange",
    },
    {
      label: "Treatment Aktif",
      value: activeTreatments,
      note: "Ditampilkan ke dokter",
      icon: Activity,
      tone: "blue",
    },
    {
      label: "Nonaktif",
      value: inactiveTreatments,
      note: "Tidak ditampilkan",
      icon: PauseCircle,
      tone: "pink",
    },
  ];

  return (
    <div className="asset-stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className="asset-stat-card" key={stat.label}>
            <span className={`asset-stat-icon ${stat.tone}`}>
              <Icon size={22} />
            </span>
            <div>
              <p>{stat.label}</p>
              <strong>{stat.value}</strong>
              <span>{stat.note}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
