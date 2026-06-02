"use client";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import type { DoctorScheduleItem } from "@/types/dashboard";

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

type DoctorScheduleFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: DoctorScheduleItem | null;
  onClose: () => void;
  onSubmit: (data: DoctorScheduleFormData) => void;
};

const initialFormValue: DoctorScheduleFormData = {
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
}: DoctorScheduleFormModalProps) {
  const [formData, setFormData] =
    useState<DoctorScheduleFormData>(
      initialFormValue
    );

  const [doctors, setDoctors] =
    useState<Doctor[]>([]);

  // =====================
  // FETCH DOCTORS
  // =====================

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dokter"
      );

      const result =
        await response.json();

      setDoctors(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =====================
  // SET EDIT DATA
  // =====================

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        doctorId:
          initialData.doctorId,
        day: initialData.day,
        startTime:
          initialData.startTime,
        endTime:
          initialData.endTime,
        capacityPerHour:
          initialData.capacityPerHour,
      });
    } else {
      setFormData(
        initialFormValue
      );
    }
  }, [
    mode,
    initialData,
    isOpen,
  ]);

  // =====================
  // HANDLE CHANGE
  // =====================

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "doctorId" ||
        name ===
          "capacityPerHour"
          ? Number(value)
          : value,
    }));
  };

  // =====================
  // VALIDATION
  // =====================

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      formData.doctorId === 0
    ) {
      toast.error(
        "Pilih dokter terlebih dahulu"
      );
      return;
    }

    if (
      !formData.day.trim()
    ) {
      toast.error(
        "Hari wajib diisi"
      );
      return;
    }

    if (
      !formData.startTime
    ) {
      toast.error(
        "Jam mulai wajib diisi"
      );
      return;
    }

    if (
      !formData.endTime
    ) {
      toast.error(
        "Jam selesai wajib diisi"
      );
      return;
    }

    if (
      formData.capacityPerHour <=
      0
    ) {
      toast.error(
        "Kapasitas harus lebih dari 0"
      );
      return;
    }

    onSubmit(formData);
  };

  // =====================
  // RESET
  // =====================

  const handleReset = () => {
    if (
      mode === "edit" &&
      initialData
    ) {
      setFormData({
        doctorId:
          initialData.doctorId,
        day: initialData.day,
        startTime:
          initialData.startTime,
        endTime:
          initialData.endTime,
        capacityPerHour:
          initialData.capacityPerHour,
      });
    } else {
      setFormData(
        initialFormValue
      );
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
        onSubmit={
          handleSubmit
        }
        className="treatment-form"
      >
        {/* DOKTER */}
        <div className="form-group">
          <label>
            Dokter
          </label>

          <select
            name="doctorId"
            value={
              formData.doctorId
            }
            onChange={
              handleChange
            }
          >
            <option value={0}>
              Pilih Dokter
            </option>

            {doctors.map(
              (doctor) => (
                <option
                  key={
                    doctor.id_user
                  }
                  value={
                    doctor.id_user
                  }
                >
                  {
                    doctor.username
                  }
                </option>
              )
            )}
          </select>
        </div>

        {/* HARI */}
        <div className="form-group">
          <label>
            Hari
          </label>

          <input
            name="day"
            value={
              formData.day
            }
            onChange={
              handleChange
            }
          />
        </div>

        {/* JAM MULAI */}
        <div className="form-group">
          <label>
            Jam Mulai
          </label>

          <input
            type="time"
            name="startTime"
            value={
              formData.startTime
            }
            onChange={
              handleChange
            }
          />
        </div>

        {/* JAM SELESAI */}
        <div className="form-group">
          <label>
            Jam Selesai
          </label>

          <input
            type="time"
            name="endTime"
            value={
              formData.endTime
            }
            onChange={
              handleChange
            }
          />
        </div>

        {/* KAPASITAS */}
        <div className="form-group">
          <label>
            Kapasitas /
            Jam
          </label>

          <input
            type="number"
            name="capacityPerHour"
            value={
              formData.capacityPerHour
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="reset-button"
            onClick={
              handleReset
            }
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