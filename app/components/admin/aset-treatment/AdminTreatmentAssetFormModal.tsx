"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from "../Modal";
import type {
  AdminTreatmentAsset,
  AdminTreatmentAssetFormData,
} from "./AdminTreatmentAssetTypes";

type AdminTreatmentAssetFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: AdminTreatmentAsset | null;
  onClose: () => void;
  onSubmit: (data: AdminTreatmentAssetFormData) => void;
};

const emptyForm: AdminTreatmentAssetFormData = {
  name: "",
  category: "",
  duration: "",
  image: "/images/brightening.jpg",
  description: "",
  status: "Aktif",
};

export default function AdminTreatmentAssetFormModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: AdminTreatmentAssetFormModalProps) {
  const [formData, setFormData] = useState(emptyForm);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        duration: initialData.duration,
        image: initialData.image,
        description: initialData.description,
        status: initialData.status,
      });
      return;
    }

    setFormData(emptyForm);
  }, [mode, initialData, isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.category.trim() || !formData.duration.trim()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={mode === "add" ? "Tambah Aset Treatment" : "Edit Aset Treatment"}
      onClose={onClose}
      width="620px"
    >
      <form className="asset-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="asset-name">Nama Treatment</label>
          <input
            id="asset-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Contoh: HydraGlow Facial"
          />
        </div>

        <div className="asset-form-grid">
          <div className="form-group">
            <label htmlFor="asset-category">Kategori</label>
            <input
              id="asset-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Contoh: Facial"
            />
          </div>

          <div className="form-group">
            <label htmlFor="asset-duration">Durasi</label>
            <input
              id="asset-duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Contoh: 60 Menit"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="asset-image">Path Gambar</label>
          <input
            id="asset-image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/brightening.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="asset-status">Status</label>
          <select
            id="asset-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="asset-description">Deskripsi</label>
          <textarea
            id="asset-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="reset-button" onClick={() => setFormData(emptyForm)}>
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
