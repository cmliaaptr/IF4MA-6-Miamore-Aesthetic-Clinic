"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import type { DoctorScheduleItem } from "@/types/dashboard";

type DoctorScheduleFormData = {
  doctorName: string;
  day: string;
  startTime: string;
  endTime: string;
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
      });
    } else {
      setFormData(initialFormValue);
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    if (mode === "edit" && initialData) {
      setFormData({
        doctorName: initialData.doctorName,
        day: initialData.day,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
      });
    } else {
      setFormData(initialFormValue);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Tambah Jadwal Dokter" : "Edit Jadwal Dokter"}
      width="640px"
    >
      <form onSubmit={handleSubmit} className="treatment-form">
        <div className="form-group">
          <label htmlFor="doctorName">Nama Dokter</label>
          <input
            id="doctorName"
            name="doctorName"
            type="text"
            value={formData.doctorName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="day">Hari</label>
          <input
            id="day"
            name="day"
            type="text"
            value={formData.day}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Jam Mulai</label>
          <input
            id="startTime"
            name="startTime"
            type="text"
            value={formData.startTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">Jam Selesai</label>
          <input
            id="endTime"
            name="endTime"
            type="text"
            value={formData.endTime}
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
            className={mode === "add" ? "save-button" : "edit-submit-button"}
          >
            {mode === "add" ? "Simpan" : "Edit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}