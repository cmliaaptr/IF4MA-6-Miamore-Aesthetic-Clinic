"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DoctorScheduleTable from "../../components/admin/DoctorScheduleTable";
import DoctorScheduleFormModal from "../../components/admin/DoctorScheduleFormModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import SuccessModal from "../../components/admin/SuccessModal";
import type { DoctorScheduleItem } from "@/types/dashboard";

type DoctorScheduleFormData = {
  doctorId: number;
  day: string;
  startTime: string;
  endTime: string;
  capacityPerHour: number;
};

export default function JadwalDokterPage() {
  const [schedules, setSchedules] = useState<
    DoctorScheduleItem[]
  >([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [selectedSchedule, setSelectedSchedule] =
    useState<DoctorScheduleItem | null>(null);

  // ==========================
  // GET ALL DATA
  // ==========================

  const fetchSchedules = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/jadwal-dokter"
      );

      const result = await response.json();

      setSchedules(
        result.data.map((item: any) => ({
          id: item.id_jadwal,
          doctorId: item.id_dokter,
          doctorName:
            item.dokter?.username ?? "-",
          day: item.hari,
          startTime: item.jam_mulai,
          endTime: item.jam_selesai,
          capacityPerHour:
            item.kapasitas,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // ==========================
  // ADD
  // ==========================

  const handleAddSchedule = async (
    data: DoctorScheduleFormData
  ) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/jadwal-dokter",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            id_dokter: data.doctorId,
            hari: data.day,
            jam_mulai:
              data.startTime,
            jam_selesai:
              data.endTime,
            kapasitas:
              data.capacityPerHour,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal menambah jadwal"
        );
      }

      await fetchSchedules();

      setIsAddOpen(false);

      setSuccessMessage(
        "Jadwal dokter berhasil ditambahkan."
      );

      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // OPEN EDIT
  // ==========================

  const handleOpenEditModal = (
    item: DoctorScheduleItem
  ) => {
    setSelectedSchedule(item);
    setIsEditOpen(true);
  };

  // ==========================
  // UPDATE
  // ==========================

  const handleEditSchedule = async (
    data: DoctorScheduleFormData
  ) => {
    if (!selectedSchedule) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/jadwal-dokter/${selectedSchedule.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            id_dokter: data.doctorId,
            hari: data.day,
            jam_mulai:
              data.startTime,
            jam_selesai:
              data.endTime,
            kapasitas:
              data.capacityPerHour,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal mengubah jadwal"
        );
      }

      await fetchSchedules();

      setIsEditOpen(false);

      setSelectedSchedule(null);

      setSuccessMessage(
        "Jadwal dokter berhasil diubah."
      );

      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // OPEN DELETE
  // ==========================

  const handleOpenDeleteModal = (
    item: DoctorScheduleItem
  ) => {
    setSelectedSchedule(item);
    setIsDeleteOpen(true);
  };

  // ==========================
  // DELETE
  // ==========================

  const handleConfirmDelete =
    async () => {
      if (!selectedSchedule)
        return;

      try {
        const response =
          await fetch(
            `http://127.0.0.1:8000/api/jadwal-dokter/${selectedSchedule.id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Gagal menghapus jadwal"
          );
        }

        await fetchSchedules();

        setIsDeleteOpen(false);

        setSelectedSchedule(
          null
        );

        setSuccessMessage(
          "Jadwal dokter berhasil dihapus."
        );

        setIsSuccessOpen(true);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <section>
      <h1 className="page-title">
        Jadwal Dokter
      </h1>

      <div className="page-action">
        <button
          type="button"
          className="add-button"
          onClick={() =>
            setIsAddOpen(true)
          }
        >
          <Plus size={16} />
          <span>Tambah</span>
        </button>
      </div>

      <DoctorScheduleTable
        data={schedules}
        onEdit={
          handleOpenEditModal
        }
        onDelete={
          handleOpenDeleteModal
        }
      />

      <DoctorScheduleFormModal
        isOpen={isAddOpen}
        mode="add"
        onClose={() =>
          setIsAddOpen(false)
        }
        onSubmit={
          handleAddSchedule
        }
      />

      <DoctorScheduleFormModal
        isOpen={isEditOpen}
        mode="edit"
        initialData={
          selectedSchedule
        }
        onClose={() => {
          setIsEditOpen(false);
          setSelectedSchedule(
            null
          );
        }}
        onSubmit={
          handleEditSchedule
        }
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedSchedule(
            null
          );
        }}
        onConfirm={
          handleConfirmDelete
        }
      />

      <SuccessModal
        isOpen={
          isSuccessOpen
        }
        onClose={() =>
          setIsSuccessOpen(false)
        }
        message={
          successMessage
        }
      />
    </section>
  );
}