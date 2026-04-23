"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { TreatmentItem } from "@/types/dashboard";

type TreatmentTableProps = {
  data: TreatmentItem[];
  onEdit: (item: TreatmentItem) => void;
  onDelete: (item: TreatmentItem) => void;
};

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
            <th>Foto</th>
            <th>Harga</th>
            <th>Diskon (%)</th>
            <th>Durasi</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.photo}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{item.duration}</td>
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