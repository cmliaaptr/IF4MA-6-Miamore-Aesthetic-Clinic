"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { DoctorScheduleItem } from "@/types/dashboard";

type DoctorScheduleTableProps = {
  data: DoctorScheduleItem[];
  onEdit: (item: DoctorScheduleItem) => void;
  onDelete: (item: DoctorScheduleItem) => void;
};

export default function DoctorScheduleTable({
  data,
  onEdit,
  onDelete,
}: DoctorScheduleTableProps) {
  return (
    <div className="table-wrapper">
      <table className="doctor-schedule-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Dokter</th>
            <th>Hari</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            <th>Kapasitas /Jam</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.doctorName}</td>
              <td>{item.day}</td>
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
              <td>{item.capacityPerHour}</td>
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