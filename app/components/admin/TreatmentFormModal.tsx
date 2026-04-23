"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Modal from "./Modal";
import type { TreatmentItem } from "@/types/dashboard";

type TreatmentFormData = {
  name: string;
  price: string;
  discount: string;
  duration: string;
  photo: string;
  description: string;
};

type TreatmentFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: TreatmentItem | null;
  onClose: () => void;
  onSubmit: (data: TreatmentFormData) => void;
};

const initialFormValue: TreatmentFormData = {
  name: "",
  price: "",
  discount: "",
  duration: "",
  photo: "",
  description: "",
};

export default function TreatmentFormModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: TreatmentFormModalProps) {
  const [formData, setFormData] = useState<TreatmentFormData>(initialFormValue);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price,
        discount: initialData.discount,
        duration: initialData.duration,
        photo: initialData.photo,
        description: initialData.description,
      });
    } else {
      setFormData(initialFormValue);
    }
  }, [mode, initialData, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file.name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Tambah Treatment" : "Edit Treatment"}
      width="640px"
    >
      <form onSubmit={handleSubmit} className="treatment-form">
        <div className="form-group">
          <label htmlFor="name">Nama Treatment</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Harga</label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount">Diskon</label>
          <input
            id="discount"
            name="discount"
            type="text"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Durasi</label>
          <input
            id="duration"
            name="duration"
            type="text"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Foto</label>
          <input
            id="photo"
            name="photo"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="reset-button"
            onClick={() => setFormData(initialFormValue)}
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