"use client";

import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import type { SyntheticEvent } from "react";
import type { TreatmentItem } from "@/types/dashboard";
import {
  getTreatmentImageSource,
  TREATMENT_IMAGE_FALLBACK,
} from "../treatments/treatmentImage";

type TreatmentTableProps = {
  data: TreatmentItem[];
  onEdit: (item: TreatmentItem) => void;
  onDelete: (item: TreatmentItem) => void;
};

function formatPrice(price: string) {
  const numericPrice = Number.parseFloat(String(price));

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return price || "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

function formatTreatmentTime(duration: string) {
  return duration || "-";
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;

  if (image.src.endsWith(TREATMENT_IMAGE_FALLBACK)) return;

  image.src = TREATMENT_IMAGE_FALLBACK;
}

export default function TreatmentTable({
  data,
  onEdit,
  onDelete,
}: TreatmentTableProps) {
  return (
    <div className="table-wrapper">
      <table className="treatment-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Treatment</th>
            <th>Deskripsi</th>
            <th>Gambar</th>
            <th>Harga</th>
            <th>Waktu Treatment</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="treatment-description-cell">
                {item.description || "-"}
              </td>
              <td>
                <Image
                  src={withImageVersion(getTreatmentImageSource(item.photo), item.updatedAt)}
                  alt={item.name}
                  key={`${item.id}-${item.photo}-${item.updatedAt || ""}`}
                  width={120}
                  height={76}
                  unoptimized
                  onError={handleImageError}
                  className="treatment-table-image"
                />
              </td>
              <td>
                <span className="treatment-price-label">Mulai Dari</span>
                <strong>{formatPrice(item.price)}</strong>
              </td>
              <td>{formatTreatmentTime(item.duration)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(item)}
                  >
                    <Pencil size={14} />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(item)}
                  >
                    <Trash2 size={14} />
                    <span>Hapus</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function withImageVersion(source: string, version?: string) {
  if (!version || source === TREATMENT_IMAGE_FALLBACK) return source;

  const separator = source.includes("?") ? "&" : "?";

  return `${source}${separator}v=${encodeURIComponent(version)}`;
}
