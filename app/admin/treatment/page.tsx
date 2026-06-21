"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TreatmentTable from "../../components/admin/TreatmentTable";
import TreatmentFormModal from "../../components/admin/TreatmentFormModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import SuccessModal from "../../components/admin/SuccessModal";
import type { TreatmentItem } from "@/types/dashboard";

type TreatmentFormData = {
  nama_treatment: string;
  harga: string;
  durasi: string;
  foto: string;
  deskripsi: string;
};

type TreatmentApiItem = {
  id_treatment: number;
  nama_treatment: string;
  deskripsi: string;
  foto: string;
  harga: string;
  diskon: string;
  durasi: string;
};

export default function TreatmentPage() {
  const [treatments, setTreatments] = useState<TreatmentItem[]>([]);

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

  const handleAddTreatment = async (data: TreatmentFormData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/treatments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          nama_treatment: data.nama_treatment,
          deskripsi: data.deskripsi,
          harga: data.harga,
          diskon: 0,
          durasi: data.durasi,
          foto: data.foto,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambah treatment");
      }

      await fetchTreatments();

      setIsAddOpen(false);
      setSuccessMessage("Data treatment berhasil ditambahkan.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenEditModal = (item: TreatmentItem) => {
    setSelectedTreatment(item);
    setIsEditOpen(true);
  };

  const handleEditTreatment = async (data: TreatmentFormData) => {
    if (!selectedTreatment) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/treatments/${selectedTreatment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nama_treatment: data.nama_treatment,
            deskripsi: data.deskripsi,
            harga: data.harga,
            diskon: selectedTreatment.discount || 0,
            durasi: data.durasi,
            foto: data.foto,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Gagal mengubah treatment");
      }

      await fetchTreatments();

      setIsEditOpen(false);
      setSelectedTreatment(null);
      setSuccessMessage("Data treatment berhasil diubah.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDeleteModal = (item: TreatmentItem) => {
    setSelectedTreatment(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTreatment) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/treatments/${selectedTreatment.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus treatment");
      }

      await fetchTreatments();

      setIsDeleteOpen(false);
      setSelectedTreatment(null);
      setSuccessMessage("Data treatment berhasil dihapus.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTreatments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/treatments");

      const text = await response.text();
      console.log("RAW:", text);

      const result = JSON.parse(text.replace(/^\/\//, ""));
      console.log(result);

      setTreatments(
        result.data.map((item: TreatmentApiItem) => ({
          id: item.id_treatment,
          name: item.nama_treatment,
          description: item.deskripsi,
          photo: item.foto,
          price: item.harga,
          discount: item.diskon,
          duration: item.durasi,
        })),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

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
