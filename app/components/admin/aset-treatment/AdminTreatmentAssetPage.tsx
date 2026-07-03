"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleAlert, Plus } from "lucide-react";
import Modal from "../Modal";
import SuccessModal from "../SuccessModal";
import AdminTreatmentAssetDetail from "./AdminTreatmentAssetDetail";
import AdminTreatmentAssetFormModal from "./AdminTreatmentAssetFormModal";
import AdminTreatmentAssetStats from "./AdminTreatmentAssetStats";
import AdminTreatmentAssetTable from "./AdminTreatmentAssetTable";
import AdminTreatmentAssetToolbar from "./AdminTreatmentAssetToolbar";
import {
  API_BASE_URL,
  createTreatmentAssetPayload,
  createTreatmentAssetStepsPayload,
  fetchTreatmentAssetItems,
  getTreatmentAssetId,
  mapApiTreatmentToAdminAsset,
} from "../../dokter/aset-treatment/treatmentAssetApi";
import AdminTreatmentStepModal from "./AdminTreatmentStepModal";
import type {
  AdminTreatmentAsset,
  AdminTreatmentAssetFormData,
  AdminTreatmentStep,
} from "./AdminTreatmentAssetTypes";

const rowsPerPage = 8;

export default function AdminTreatmentAssetPage() {
  const [treatments, setTreatments] =
    useState<AdminTreatmentAsset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(0);
  const [activeTab, setActiveTab] = useState("Detail Treatment");
  const [page, setPage] = useState(1);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<AdminTreatmentAsset | null>(null);
  const [stepTreatment, setStepTreatment] = useState<AdminTreatmentAsset | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [deleteConfirmStep, setDeleteConfirmStep] = useState<0 | 1 | 2>(0);
  const [deletingTreatment, setDeletingTreatment] =
    useState<AdminTreatmentAsset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
  const categories = useMemo(
    () => [
      "Semua Kategori",
      ...Array.from(new Set(treatments.map((treatment) => treatment.category))),
    ],
    [treatments],
  );

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };

  const loadTreatments = useCallback(async (preferredId?: number | null) => {
    setErrorMessage("");

    try {
      const items = await fetchTreatmentAssetItems();
      const nextTreatments = items.map(mapApiTreatmentToAdminAsset);

      setTreatments(nextTreatments);
      setSelectedTreatmentId((current) => {
        if (preferredId !== undefined) {
          return nextTreatments.find((treatment) => treatment.id === preferredId)
            ? preferredId ?? 0
            : nextTreatments[0]?.id || 0;
        }

        return nextTreatments.find((treatment) => treatment.id === current)
          ? current
          : nextTreatments[0]?.id || 0;
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data aset treatment.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  const handleOpenStepModal = (treatment: AdminTreatmentAsset) => {
    setStepTreatment(treatment);
    setIsStepModalOpen(true);
  };

  const handleSubmit = async (data: AdminTreatmentAssetFormData) => {
    setErrorMessage("");

    if (modalMode === "edit" && editingTreatment) {
      const response = await fetch(
        `${API_BASE_URL}/api/treatment-assets/${editingTreatment.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createTreatmentAssetPayload(data)),
        },
      );

      if (!response.ok) {
        setErrorMessage("Gagal memperbarui aset treatment.");
        return;
      }

      await loadTreatments();
      setSelectedTreatmentId(editingTreatment.id);
      showSuccess("Aset treatment berhasil diperbarui.");
    } else {
      const response = await fetch(`${API_BASE_URL}/api/treatment-assets`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createTreatmentAssetPayload(data)),
      });

      if (!response.ok) {
        setErrorMessage("Gagal menambah aset treatment.");
        return;
      }

      const result = await response.json();
      const nextId = getTreatmentAssetId(result.data);

      await loadTreatments();
      setSelectedTreatmentId(nextId);
      setPage(1);
      showSuccess("Aset treatment baru berhasil ditambahkan.");
    }

    setIsFormOpen(false);
    setEditingTreatment(null);
  };

  const handleSubmitSteps = async (steps: AdminTreatmentStep[]) => {
    if (!stepTreatment) return;

    setErrorMessage("");

    const response = await fetch(
      `${API_BASE_URL}/api/treatment-assets/${stepTreatment.id}/steps`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createTreatmentAssetStepsPayload(steps)),
      },
    );

    if (!response.ok) {
      setErrorMessage("Gagal menyimpan langkah dan takaran aset treatment.");
      return;
    }

    await loadTreatments(stepTreatment.id);
    setIsStepModalOpen(false);
    setStepTreatment(null);
    setActiveTab("Langkah & Takaran");
    showSuccess("Langkah dan takaran aset treatment berhasil diperbarui.");
  };

  const handleOpenDelete = (treatment: AdminTreatmentAsset) => {
    setDeletingTreatment(treatment);
    setDeleteConfirmStep(1);
  };

  const handleCloseDelete = () => {
    setDeleteConfirmStep(0);
    setDeletingTreatment(null);
  };

  const handleFirstDeleteConfirm = () => {
    setDeleteConfirmStep(2);
  };

  const handleDeleteTreatment = async () => {
    if (!deletingTreatment) return;

    setErrorMessage("");

    const response = await fetch(
      `${API_BASE_URL}/api/treatment-assets/${deletingTreatment.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      setErrorMessage("Gagal menghapus aset treatment.");
      return;
    }

    await loadTreatments(null);
    handleCloseDelete();
    showSuccess("Aset treatment berhasil dihapus.");
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
  };

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadTreatments();
  }, [loadTreatments]);
  /* eslint-enable react-hooks/set-state-in-effect */

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

      {errorMessage ? <p className="mt-4 text-sm font-semibold text-red-600">{errorMessage}</p> : null}

      <AdminTreatmentAssetStats treatments={treatments} />

      <div className="asset-list-header">
        <AdminTreatmentAssetToolbar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {isLoading ? (
        <div className="asset-table-section p-6 text-sm font-semibold text-slate-600">
          Memuat data aset treatment...
        </div>
      ) : (
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
          onDelete={handleOpenDelete}
          onPageChange={setPage}
        />
      )}

      {selectedTreatment && (
        <AdminTreatmentAssetDetail
          treatment={selectedTreatment}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onManageSteps={handleOpenStepModal}
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

      <AdminTreatmentStepModal
        isOpen={isStepModalOpen}
        treatment={stepTreatment}
        onClose={() => {
          setIsStepModalOpen(false);
          setStepTreatment(null);
        }}
        onSubmit={handleSubmitSteps}
      />

      <DeleteTreatmentAssetModal
        isOpen={deleteConfirmStep > 0}
        treatmentName={deletingTreatment?.name}
        step={deleteConfirmStep}
        onClose={handleCloseDelete}
        onFirstConfirm={handleFirstDeleteConfirm}
        onFinalConfirm={handleDeleteTreatment}
      />
    </section>
  );
}

type DeleteTreatmentAssetModalProps = {
  isOpen: boolean;
  treatmentName?: string;
  step: 0 | 1 | 2;
  onClose: () => void;
  onFirstConfirm: () => void;
  onFinalConfirm: () => void;
};

function DeleteTreatmentAssetModal({
  isOpen,
  treatmentName,
  step,
  onClose,
  onFirstConfirm,
  onFinalConfirm,
}: DeleteTreatmentAssetModalProps) {
  const isFinalStep = step === 2;

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="520px" showCloseButton={false}>
      <div className="delete-modal-content">
        <div className="delete-icon-wrapper">
          <CircleAlert size={70} />
        </div>

        <h3 className="delete-modal-title">
          {isFinalStep
            ? "Konfirmasi Hapus Aset Treatment"
            : "Apakah kamu benar-benar ingin menghapus aset treatment ini?"}
        </h3>

        {treatmentName ? (
          <p className="text-center text-sm font-semibold text-slate-600">
            {isFinalStep
              ? `Klik Ya sekali lagi untuk menghapus ${treatmentName} secara permanen.`
              : treatmentName}
          </p>
        ) : null}

        <div className="delete-modal-actions">
          <button
            type="button"
            className="delete-yes-button"
            onClick={isFinalStep ? onFinalConfirm : onFirstConfirm}
          >
            Ya
          </button>

          <button type="button" className="delete-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </Modal>
  );
}
