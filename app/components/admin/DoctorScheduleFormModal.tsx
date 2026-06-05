"use client";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import type { DoctorScheduleItem } from "@/types/dashboard";

type DoctorScheduleFormData = {
  doctorName: string;
  day: string;
  startTime: string;
  endTime: string;
  capacityPerHour: number;
};

type DoctorScheduleFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: DoctorScheduleItem | null;
  onClose: () => void;
  onSubmit: (data: DoctorScheduleFormData) => void;
};

const initialFormValue: DoctorScheduleFormData = {
  doctorName: "",
  day: "",
  startTime: "",
  endTime: "",
  capacityPerHour: 3,
};

export default function DoctorScheduleFormModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: DoctorScheduleFormModalProps) {
  const [formData, setFormData] =
    useState<DoctorScheduleFormData>(initialFormValue);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        doctorName: initialData.doctorName,
        day: initialData.day,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        capacityPerHour: initialData.capacityPerHour,
      });
    } else {
      setFormData(initialFormValue);
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacityPerHour"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.doctorName.trim()) {
      toast.error("Nama dokter wajib diisi");
      return;
    }

    if (!formData.day.trim()) {
      toast.error("Hari wajib diisi");
      return;
    }

    if (!formData.startTime) {
      toast.error("Jam mulai wajib diisi");
      return;
    }

    if (!formData.endTime) {
      toast.error("Jam selesai wajib diisi");
      return;
    }

    if (formData.capacityPerHour <= 0) {
      toast.error("Kapasitas harus lebih dari 0");
      return;
    }

    onSubmit(formData);
  };

  const handleReset = () => {
    if (mode === "edit" && initialData) {
      setFormData({
        doctorName: initialData.doctorName,
        day: initialData.day,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        capacityPerHour: initialData.capacityPerHour,
      });
    } else {
      setFormData(initialFormValue);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === "add"
          ? "Tambah Jadwal Dokter"
          : "Edit Jadwal Dokter"
      }
      width="640px"
    >
      <form
        onSubmit={handleSubmit}
        className="treatment-form"
      >
        {/* NAMA DOKTER */}
        <div className="form-group">
          <label>Nama Dokter</label>

          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder="Masukkan nama dokter"
          />
        </div>

        {/* HARI */}
        <div className="form-group">
          <label>Hari</label>

          <input
            type="text"
            name="day"
            value={formData.day}
            onChange={handleChange}
            placeholder="Contoh: Senin"
          />
        </div>

        {/* JAM MULAI */}
        <div className="form-group">
          <label>Jam Mulai</label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>

        {/* JAM SELESAI */}
        <div className="form-group">
          <label>Jam Selesai</label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>

        {/* KAPASITAS */}
        <div className="form-group">
          <label>Kapasitas / Jam</label>

          <input
            type="number"
            name="capacityPerHour"
            value={formData.capacityPerHour}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
          >
            Reset
          </button>

          <button
            type="submit"
            className={
              mode === "add"
                ? "save-button"
                : "edit-submit-button"
            }
          >
            {mode === "add"
              ? "Simpan"
              : "Edit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}