"use client";

import { ChangeEvent, useEffect, useState } from "react";

import Modal from "./Modal";
import toast from "react-hot-toast";

type Doctor = {
  id_user: number;
  username: string;
};

type DoctorScheduleFormData = {
  doctorId: number;
  day: string;
  startTime: string;
  endTime: string;
  capacityPerHour: number;
};

type Props = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: any;
  onClose: () => void;
  onSubmit: (data: DoctorScheduleFormData) => void;
};

const initialForm = {
  doctorId: 0,
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
}: Props) {
  const [formData, setFormData] = useState(initialForm);

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/dokter");

      const text = await response.text();
      const result = JSON.parse(text.replace(/^\/\//, ""));

      setDoctors(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        doctorId: initialData.doctorId,
        day: initialData.day,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        capacityPerHour: initialData.capacityPerHour,
      });
    } else {
      setFormData(initialForm);
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "doctorId" || name === "capacityPerHour"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.doctorId === 0) {
      toast.error("Pilih dokter");
      return;
    }

    onSubmit(formData);
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
          <label>Dokter</label>

          <select
            name="doctorId"
            value={formData.doctorId || 0}
            onChange={handleChange}
          >
            <option value={0}>Pilih Dokter</option>

            {doctors.map((doctor) => (
              <option key={doctor.id_user} value={doctor.id_user}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hari</label>

          <input name="day" value={formData.day || ""} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Jam Mulai</label>

          <input
            type="time"
            name="startTime"
            value={formData.startTime || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Jam Selesai</label>

          <input
            type="time"
            name="endTime"
            value={formData.endTime || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Kapasitas/Jam</label>

          <input
            type="number"
            name="capacityPerHour"
            value={formData.capacityPerHour || 0}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="reset-button"
            onClick={() => setFormData(initialForm)}
          >
            Reset
          </button>

          <button type="submit" className="save-button">
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
}
