"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import SuccessModal from "../SuccessModal";
import AdminTreatmentAssetDetail from "./AdminTreatmentAssetDetail";
import AdminTreatmentAssetFormModal from "./AdminTreatmentAssetFormModal";
import AdminTreatmentAssetStats from "./AdminTreatmentAssetStats";
import AdminTreatmentAssetTable from "./AdminTreatmentAssetTable";
import AdminTreatmentAssetToolbar from "./AdminTreatmentAssetToolbar";
import {
  adminTreatmentAssets,
  adminTreatmentCategories,
} from "./adminTreatmentAssets";
import type {
  AdminTreatmentAsset,
  AdminTreatmentAssetFormData,
} from "./AdminTreatmentAssetTypes";

const rowsPerPage = 8;

export default function AdminTreatmentAssetPage() {
  const [treatments, setTreatments] =
    useState<AdminTreatmentAsset[]>(adminTreatmentAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(treatments[0]?.id ?? 0);
  const [activeTab, setActiveTab] = useState("Detail Treatment");
  const [page, setPage] = useState(1);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<AdminTreatmentAsset | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const filteredTreatments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return treatments.filter((treatment) => {
      const matchesSearch =
        !normalizedQuery ||
        treatment.name.toLowerCase().includes(normalizedQuery) ||
        treatment.category.toLowerCase().includes(normalizedQuery) ||
        treatment.description.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        selectedCategory === "Semua Kategori" ||
        treatment.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, treatments]);

  const pageCount = Math.max(1, Math.ceil(filteredTreatments.length / rowsPerPage));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTreatments = filteredTreatments.slice(
    startIndex,
    startIndex + rowsPerPage,
  );
  const selectedTreatment =
    treatments.find((treatment) => treatment.id === selectedTreatmentId) ??
    filteredTreatments[0] ??
    treatments[0];

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingTreatment(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (treatment: AdminTreatmentAsset) => {
    setModalMode("edit");
    setEditingTreatment(treatment);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: AdminTreatmentAssetFormData) => {
    if (modalMode === "edit" && editingTreatment) {
      setTreatments((current) =>
        current.map((treatment) =>
          treatment.id === editingTreatment.id
            ? {
                ...treatment,
                ...data,
                updatedAt: "Hari ini, 09:00",
              }
            : treatment,
        ),
      );
      showSuccess("Aset treatment berhasil diperbarui.");
    } else {
      const nextId = Math.max(...treatments.map((treatment) => treatment.id)) + 1;
      const newTreatment: AdminTreatmentAsset = {
        id: nextId,
        slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: data.name,
        category: data.category,
        duration: data.duration,
        image: data.image || "/images/brightening.jpg",
        description: data.description,
        status: data.status,
        createdAt: "Hari ini, 09:00",
        updatedAt: "Hari ini, 09:00",
        steps: [],
        products: [],
        homeCare: [],
      };

      setTreatments((current) => [newTreatment, ...current]);
      setSelectedTreatmentId(nextId);
      setPage(1);
      showSuccess("Aset treatment baru berhasil ditambahkan.");
    }

    setIsFormOpen(false);
    setEditingTreatment(null);
  };

  const handleToggleStatus = (treatment: AdminTreatmentAsset) => {
    const nextStatus = treatment.status === "Aktif" ? "Nonaktif" : "Aktif";

    setTreatments((current) =>
      current.map((item) =>
        item.id === treatment.id
          ? {
              ...item,
              status: nextStatus,
              updatedAt: "Hari ini, 09:00",
            }
          : item,
      ),
    );
    showSuccess(`${treatment.name} berhasil dibuat ${nextStatus.toLowerCase()}.`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };

  return (
    <section className="asset-treatment-page">
      <div className="asset-page-header">
        <div>
          <h1>Aset Treatment</h1>
          <p>
            Kelola semua aset, takaran per langkah, resep, dan produk yang
            digunakan dalam setiap treatment.
          </p>
        </div>

        <button type="button" className="asset-add-button" onClick={handleOpenAdd}>
          <Plus size={18} />
          Tambah Treatment
        </button>
      </div>

      <AdminTreatmentAssetStats treatments={treatments} />

      <div className="asset-list-header">
        <AdminTreatmentAssetToolbar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={adminTreatmentCategories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <AdminTreatmentAssetTable
        treatments={paginatedTreatments}
        selectedTreatmentId={selectedTreatment?.id ?? 0}
        page={currentPage}
        pageCount={pageCount}
        totalCount={filteredTreatments.length}
        startIndex={startIndex}
        onSelect={(treatment) => {
          setSelectedTreatmentId(treatment.id);
          setActiveTab("Detail Treatment");
        }}
        onEdit={handleOpenEdit}
        onToggleStatus={handleToggleStatus}
        onPageChange={setPage}
      />

      {selectedTreatment && (
        <AdminTreatmentAssetDetail
          treatment={selectedTreatment}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onEdit={handleOpenEdit}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <AdminTreatmentAssetFormModal
        isOpen={isFormOpen}
        mode={modalMode}
        initialData={editingTreatment}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message={successMessage}
      />
    </section>
  );
}
