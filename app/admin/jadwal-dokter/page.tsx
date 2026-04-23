"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import DoctorScheduleTable from "../../components/admin/DoctorScheduleTable";
import DoctorScheduleFormModal from "../../components/admin/DoctorScheduleFormModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import SuccessModal from "../../components/admin/SuccessModal";
import { doctorScheduleList as initialDoctorScheduleList } from "@/data/dashboard";
import type { DoctorScheduleItem } from "@/types/dashboard";

type DoctorScheduleFormData = {
  doctorName: string;
  day: string;
  startTime: string;
  endTime: string;
};

export default function JadwalDokterPage() {
  const [schedules, setSchedules] = useState<DoctorScheduleItem[]>(
    initialDoctorScheduleList
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [selectedSchedule, setSelectedSchedule] =
    useState<DoctorScheduleItem | null>(null);

  const handleOpenAddModal = () => {
    setIsAddOpen(true);
  };

  const handleAddSchedule = (data: DoctorScheduleFormData) => {
    const newSchedule: DoctorScheduleItem = {
      id: Date.now(),
      doctorName: data.doctorName,
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      capacityPerHour: 3,
    };

    setSchedules((prev) => [...prev, newSchedule]);
    setIsAddOpen(false);

    setSuccessMessage("Jadwal dokter berhasil ditambahkan.");
    setIsSuccessOpen(true);
  };

  const handleOpenEditModal = (item: DoctorScheduleItem) => {
    setSelectedSchedule(item);
    setIsEditOpen(true);
  };

  const handleEditSchedule = (data: DoctorScheduleFormData) => {
    if (!selectedSchedule) return;

    setSchedules((prev) =>
      prev.map((item) =>
        item.id === selectedSchedule.id
          ? {
              ...item,
              doctorName: data.doctorName,
              day: data.day,
              startTime: data.startTime,
              endTime: data.endTime,
            }
          : item
      )
    );

    setIsEditOpen(false);
    setSelectedSchedule(null);

    setSuccessMessage("Jadwal dokter berhasil diubah.");
    setIsSuccessOpen(true);
  };

  const handleOpenDeleteModal = (item: DoctorScheduleItem) => {
    setSelectedSchedule(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedSchedule) return;

    setSchedules((prev) =>
      prev.filter((item) => item.id !== selectedSchedule.id)
    );

    setIsDeleteOpen(false);
    setSelectedSchedule(null);

    setSuccessMessage("Jadwal dokter berhasil dihapus.");
    setIsSuccessOpen(true);
  };

  return (
    <section>
      <h1 className="page-title">Jadwal Dokter</h1>

      <div className="page-action">
        <button
          type="button"
          className="add-button"
          onClick={handleOpenAddModal}
        >
          <Plus size={16} />
          <span>Tambah</span>
        </button>
      </div>

      <DoctorScheduleTable
        data={schedules}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <DoctorScheduleFormModal
        isOpen={isAddOpen}
        mode="add"
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSchedule}
      />

      <DoctorScheduleFormModal
        isOpen={isEditOpen}
        mode="edit"
        initialData={selectedSchedule}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleEditSchedule}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedSchedule(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message={successMessage}
      />
    </section>
  );
}