"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
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
  fotoFile: File | null;
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
  updated_at?: string;
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
      const payload = createTreatmentFormData(data, 0);

      const response = await fetch("http://127.0.0.1:8000/api/treatments", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, "Gagal menambah treatment"));
      }

      await fetchTreatments();

      setIsAddOpen(false);
      setSuccessMessage("Data treatment berhasil ditambahkan.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Gagal menambah treatment");
    }
  };

  const handleOpenEditModal = (item: TreatmentItem) => {
    setSelectedTreatment(item);
    setIsEditOpen(true);
  };

  const handleEditTreatment = async (data: TreatmentFormData) => {
    if (!selectedTreatment) return;

    try {
      const payload = createTreatmentFormData(
        data,
        Number(selectedTreatment.discount || 0)
      );
      payload.append("_method", "PUT");

      const response = await fetch(
        `http://127.0.0.1:8000/api/treatments/${selectedTreatment.id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: payload,
        },
      );

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, "Gagal mengubah treatment"));
      }

      await fetchTreatments();

      setIsEditOpen(false);
      setSelectedTreatment(null);
      setSuccessMessage("Data treatment berhasil diubah.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Gagal mengubah treatment");
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
        throw new Error(await getApiErrorMessage(response, "Gagal menghapus treatment"));
      }

      await fetchTreatments();

      setIsDeleteOpen(false);
      setSelectedTreatment(null);
      setSuccessMessage("Data treatment berhasil dihapus.");
      setIsSuccessOpen(true);
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus treatment");
    }
  };

  const fetchTreatments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/treatments", {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

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
          updatedAt: item.updated_at,
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

function createTreatmentFormData(data: TreatmentFormData, discount: number) {
  const payload = new FormData();

  payload.append("nama_treatment", data.nama_treatment);
  payload.append("deskripsi", data.deskripsi);
  payload.append("harga", normalizePrice(data.harga));
  payload.append("diskon", String(discount));
  payload.append("durasi", data.durasi);

  if (data.fotoFile) {
    payload.append("foto", data.fotoFile);
  }

  return payload;
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

async function getApiErrorMessage(response: Response, fallbackMessage: string) {
  const result = await response.json().catch(() => null);
  const errors = result?.errors
    ? Object.values(result.errors).flat().join(" ")
    : "";

  return errors || result?.message || fallbackMessage;
}
