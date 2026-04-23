"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TreatmentTable from "../../components/admin/TreatmentTable";
import TreatmentFormModal from "../../components/admin/TreatmentFormModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import SuccessModal from "../../components/admin/SuccessModal";
import { treatmentList as initialTreatmentList } from "@/data/dashboard";
import type { TreatmentItem } from "@/types/dashboard";

type TreatmentFormData = {
  name: string;
  price: string;
  discount: string;
  duration: string;
  photo: string;
  description: string;
};

export default function TreatmentPage() {
  const [treatments, setTreatments] =
    useState<TreatmentItem[]>(initialTreatmentList);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [selectedTreatment, setSelectedTreatment] =
    useState<TreatmentItem | null>(null);

  const handleOpenAddModal = () => {
    setIsAddOpen(true);
  };

  const handleAddTreatment = (data: TreatmentFormData) => {
    const newTreatment: TreatmentItem = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      photo: data.photo,
      price: data.price,
      discount: data.discount,
      duration: data.duration,
    };

    setTreatments((prev) => [...prev, newTreatment]);
    setIsAddOpen(false);

    setSuccessMessage("Data treatment berhasil ditambahkan.");
    setIsSuccessOpen(true);
  };

  const handleOpenEditModal = (item: TreatmentItem) => {
    setSelectedTreatment(item);
    setIsEditOpen(true);
  };

  const handleEditTreatment = (data: TreatmentFormData) => {
    if (!selectedTreatment) return;

    setTreatments((prev) =>
      prev.map((item) =>
        item.id === selectedTreatment.id
          ? {
              ...item,
              name: data.name,
              description: data.description,
              photo: data.photo,
              price: data.price,
              discount: data.discount,
              duration: data.duration,
            }
          : item
      )
    );

    setIsEditOpen(false);
    setSelectedTreatment(null);

    setSuccessMessage("Data treatment berhasil diubah.");
    setIsSuccessOpen(true);
  };

  const handleOpenDeleteModal = (item: TreatmentItem) => {
    setSelectedTreatment(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedTreatment) return;

    setTreatments((prev) =>
      prev.filter((item) => item.id !== selectedTreatment.id)
    );

    setIsDeleteOpen(false);
    setSelectedTreatment(null);

    setSuccessMessage("Data treatment berhasil dihapus.");
    setIsSuccessOpen(true);
  };

  return (
    <section>
      <h1 className="page-title">Treatment</h1>

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

      <TreatmentTable
        data={treatments}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <TreatmentFormModal
        isOpen={isAddOpen}
        mode="add"
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddTreatment}
      />

      <TreatmentFormModal
        isOpen={isEditOpen}
        mode="edit"
        initialData={selectedTreatment}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedTreatment(null);
        }}
        onSubmit={handleEditTreatment}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedTreatment(null);
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