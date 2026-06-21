"use client";

import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import type { TreatmentItem } from "@/types/dashboard";

type TreatmentTableProps = {
  data: TreatmentItem[];
  onEdit: (item: TreatmentItem) => void;
  onDelete: (item: TreatmentItem) => void;
};

function formatPrice(price: string) {
  const numericPrice = Number(String(price).replace(/[^\d]/g, ""));

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

function getImageSource(photo: string) {
  if (!photo) return "/images/treatment.jpg";
  if (photo.startsWith("http") || photo.startsWith("/")) return photo;

  return `/images/${photo}`;
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
                  src={getImageSource(item.photo)}
                  alt={item.name}
                  width={120}
                  height={76}
                  unoptimized
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
