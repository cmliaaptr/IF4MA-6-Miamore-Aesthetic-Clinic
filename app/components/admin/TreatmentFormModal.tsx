"use client";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import type { TreatmentItem } from "@/types/dashboard";

type TreatmentFormData = {
  nama_treatment: string;
  harga: string;
  durasi: string;
  foto: string;
  fotoFile: File | null;
  deskripsi: string;
};

type TreatmentFormModalProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  initialData?: TreatmentItem | null;
  onClose: () => void;
  onSubmit: (data: TreatmentFormData) => void;
};

const initialFormValue: TreatmentFormData = {
  nama_treatment: "",
  harga: "",
  durasi: "",
  foto: "",
  fotoFile: null,
  deskripsi: "",
};

export default function TreatmentFormModal({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: TreatmentFormModalProps) {
  const [formData, setFormData] =
    useState<TreatmentFormData>(initialFormValue);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        nama_treatment: initialData.name,
        harga: formatEditablePrice(initialData.price),
        durasi: String(initialData.duration),
        foto: initialData.photo,
        fotoFile: null,
        deskripsi: initialData.description,
      });
    } else {
      setFormData(initialFormValue);
    }
  }, [mode, initialData, isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        foto: file.name,
        fotoFile: file,
      }));
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // VALIDASI
    if (!formData.nama_treatment.trim()) {
      toast.error(
        "Nama treatment wajib diisi"
      );
      return;
    }

    if (!formData.harga.trim()) {
      toast.error(
        "Harga wajib diisi"
      );
      return;
    }

    if (Number(normalizePrice(formData.harga)) <= 0) {
      toast.error(
        "Harga harus berupa angka lebih dari 0"
      );
      return;
    }

    if (!formData.durasi.trim()) {
      toast.error(
        "Waktu treatment wajib diisi"
      );
      return;
    }

    if (!formData.foto.trim()) {
      toast.error(
        "Foto treatment wajib diupload"
      );
      return;
    }

    if (!formData.deskripsi.trim()) {
      toast.error(
        "Deskripsi wajib diisi"
      );
      return;
    }

    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(initialFormValue);

    toast.success(
      "Form berhasil direset"
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === "add"
          ? "Tambah Treatment"
          : "Edit Treatment"
      }
      width="640px"
    >
      <form
        onSubmit={handleSubmit}
        className="treatment-form"
      >
        {/* Nama Treatment */}
        <div className="form-group">
          <label htmlFor="nama_treatment">
            Nama Treatment
          </label>

          <input
            id="nama_treatment"
            name="nama_treatment"
            type="text"
            value={formData.nama_treatment}
            onChange={handleChange}
          />
        </div>

        {/* Harga */}
        <div className="form-group">
          <label htmlFor="harga">
            Harga
          </label>

          <input
            id="harga"
            name="harga"
            type="text"
            inputMode="numeric"
            placeholder="Contoh: 20.000"
            value={formData.harga}
            onChange={handleChange}
          />
        </div>

        {/* Waktu Treatment */}
        <div className="form-group">
          <label htmlFor="durasi">
            Waktu Treatment
          </label>

          <input
            id="durasi"
            name="durasi"
            type="text"
            placeholder="Contoh: 1x / Bulan atau 2x / Minggu"
            value={formData.durasi}
            onChange={handleChange}
          />
        </div>

        {/* Foto */}
        <div className="form-group">
          <label htmlFor="foto">
            Foto
          </label>

          <input
            id="foto"
            name="foto"
            type="file"
            onChange={handleFileChange}
          />

          {formData.foto && (
            <small>
              File dipilih:
              {" "}
              {formData.foto}
            </small>
          )}
        </div>

        {/* Deskripsi */}
        <div className="form-group">
          <label htmlFor="deskripsi">
            Deskripsi
          </label>

          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={5}
            value={formData.deskripsi}
            onChange={handleChange}
          />
        </div>

        {/* Footer */}
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
            className="save-button"
          >
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
}

function formatEditablePrice(price: string) {
  const parsedPrice = Number.parseFloat(String(price));

  if (!Number.isFinite(parsedPrice)) {
    return price || "";
  }

  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(parsedPrice);
}

function normalizePrice(price: string) {
  const cleanedPrice = price.replace(/[^\d,\\.]/g, "").trim();

  if (!cleanedPrice) return "0";

  if (cleanedPrice.includes(",")) {
    return cleanedPrice.replace(/\./g, "").replace(",", ".");
  }

  if (/^\d+\.\d{1,2}$/.test(cleanedPrice)) {
    return cleanedPrice;
  }

  return cleanedPrice.replace(/\./g, "");
}
