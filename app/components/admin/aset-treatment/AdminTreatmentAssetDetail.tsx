import Image from "next/image";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Package,
  Pencil,
  Settings,
} from "lucide-react";
import type { AdminTreatmentAsset } from "./AdminTreatmentAssetTypes";

type AdminTreatmentAssetDetailProps = {
  treatment: AdminTreatmentAsset;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onEdit: (treatment: AdminTreatmentAsset) => void;
  onToggleStatus: (treatment: AdminTreatmentAsset) => void;
};

const tabs = [
  "Detail Treatment",
  "Langkah & Takaran",
  "Resep Pasien (Home Care)",
  "Produk yang Digunakan",
  "Riwayat Perubahan",
];

export default function AdminTreatmentAssetDetail({
  treatment,
  activeTab,
  onTabChange,
  onEdit,
  onToggleStatus,
}: AdminTreatmentAssetDetailProps) {
  return (
    <section className="asset-detail-panel">
      <div className="asset-detail-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={tab === activeTab ? "active" : ""}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="asset-detail-grid">
        <article className="asset-detail-card">
          <Image
            src={treatment.image}
            alt={treatment.name}
            width={260}
            height={140}
            className="asset-detail-image"
          />
          <h3>{treatment.name}</h3>
          <span className={`asset-category ${getCategoryClass(treatment.category)}`}>
            {treatment.category}
          </span>
          <p>{treatment.description}</p>

          <div className="asset-info-list">
            <InfoRow icon={Clock3} label="Durasi" value={treatment.duration} />
            <InfoRow icon={FlaskConical} label="Jumlah Langkah" value={`${treatment.steps.length} Langkah`} />
            <InfoRow icon={Package} label="Jumlah Aset / Produk" value={`${treatment.products.length} Aset`} />
            <InfoRow icon={CheckCircle2} label="Status" value={treatment.status} />
            <InfoRow icon={CalendarClock} label="Dibuat" value={treatment.createdAt} />
            <InfoRow icon={CalendarClock} label="Terakhir Diperbarui" value={treatment.updatedAt} />
          </div>

          <div className="asset-detail-actions">
            <button type="button" className="asset-primary-button" onClick={() => onEdit(treatment)}>
              <Pencil size={16} />
              Edit Treatment
            </button>
            <button type="button" className="asset-danger-outline" onClick={() => onToggleStatus(treatment)}>
              {treatment.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
            </button>
          </div>
        </article>

        {activeTab === "Langkah & Takaran" && (
          <article className="asset-detail-card asset-wide-card">
            <h3>Langkah Treatment ({treatment.steps.length})</h3>
            <div className="asset-mini-table-scroll">
              <table className="asset-mini-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Langkah</th>
                    <th>Aset / Produk Utama</th>
                    <th>Takaran</th>
                    <th>Durasi</th>
                  </tr>
                </thead>
                <tbody>
                  {treatment.steps.map((step, index) => (
                    <tr key={step.id}>
                      <td>{index + 1}</td>
                      <td>{step.name}</td>
                      <td>{step.product}</td>
                      <td>{step.dosage}</td>
                      <td>{step.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="asset-secondary-button" onClick={() => onTabChange("Langkah & Takaran")}>
              <Settings size={16} />
              Kelola Langkah & Takaran
            </button>
          </article>
        )}

        {activeTab === "Produk yang Digunakan" && (
          <ProductPanel treatment={treatment} onTabChange={onTabChange} />
        )}

        {activeTab === "Resep Pasien (Home Care)" && (
          <article className="asset-detail-card asset-wide-card">
            <h3>Resep Pasien (Home Care)</h3>
            <ul className="asset-homecare-list">
              {treatment.homeCare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        )}

        {activeTab === "Riwayat Perubahan" && (
          <article className="asset-detail-card asset-wide-card">
            <h3>Riwayat Perubahan</h3>
            <div className="asset-history-list">
              <p>Data dibuat pada {treatment.createdAt}</p>
              <p>Update terakhir pada {treatment.updatedAt}</p>
              <p>Status saat ini: {treatment.status}</p>
            </div>
          </article>
        )}

        {activeTab === "Detail Treatment" && (
          <ProductPanel treatment={treatment} onTabChange={onTabChange} />
        )}
      </div>
    </section>
  );
}

function ProductPanel({
  treatment,
  onTabChange,
}: {
  treatment: AdminTreatmentAsset;
  onTabChange: (tab: string) => void;
}) {
  return (
    <article className="asset-detail-card asset-wide-card">
      <h3>Produk yang Digunakan ({treatment.products.length})</h3>
      <div className="asset-mini-table-scroll">
        <table className="asset-mini-table">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Jenis</th>
              <th>Kemasan</th>
              <th>Stok Tersedia</th>
            </tr>
          </thead>
          <tbody>
            {treatment.products.slice(0, 6).map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{product.packageSize}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {treatment.products.length > 6 && (
        <p className="asset-more-note">... dan {treatment.products.length - 6} produk lainnya</p>
      )}
      <button
        type="button"
        className="asset-secondary-button"
        onClick={() => onTabChange("Produk yang Digunakan")}
      >
        <Package size={16} />
        Kelola Produk
      </button>
    </article>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="asset-info-row">
      <Icon size={15} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function getCategoryClass(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
