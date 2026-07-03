import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Pencil, Trash2 } from "lucide-react";
import type { AdminTreatmentAsset } from "./AdminTreatmentAssetTypes";

type AdminTreatmentAssetTableProps = {
  treatments: AdminTreatmentAsset[];
  selectedTreatmentId: number;
  page: number;
  pageCount: number;
  totalCount: number;
  startIndex: number;
  onSelect: (treatment: AdminTreatmentAsset) => void;
  onEdit: (treatment: AdminTreatmentAsset) => void;
  onDelete: (treatment: AdminTreatmentAsset) => void;
  onPageChange: (page: number) => void;
};

export default function AdminTreatmentAssetTable({
  treatments,
  selectedTreatmentId,
  page,
  pageCount,
  totalCount,
  startIndex,
  onSelect,
  onEdit,
  onDelete,
  onPageChange,
}: AdminTreatmentAssetTableProps) {
  return (
    <section className="asset-table-section">
      <div className="asset-table-title">
        <h2>Daftar Treatment</h2>
      </div>

      <div className="asset-table-scroll">
        <table className="asset-treatment-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Treatment</th>
              <th>Kategori</th>
              <th>Durasi</th>
              <th>Langkah</th>
              <th>Aset / Produk</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((treatment, index) => (
              <tr
                key={treatment.id}
                className={selectedTreatmentId === treatment.id ? "selected" : ""}
              >
                <td>{startIndex + index + 1}</td>
                <td>
                  <button
                    type="button"
                    className="asset-name-button"
                    onClick={() => onSelect(treatment)}
                  >
                    <Image
                      src={treatment.image}
                      alt={treatment.name}
                      width={64}
                      height={42}
                      className="asset-table-image"
                    />
                    <span>{treatment.name}</span>
                  </button>
                </td>
                <td>
                  <span className={`asset-category ${getCategoryClass(treatment.category)}`}>
                    {treatment.category}
                  </span>
                </td>
                <td>{treatment.duration}</td>
                <td>{treatment.steps.length} Langkah</td>
                <td>{treatment.products.length} Aset</td>
                <td>
                  <span className={`asset-status ${treatment.status.toLowerCase()}`}>
                    {treatment.status}
                  </span>
                </td>
                <td>
                  <div className="asset-row-actions">
                    <button
                      type="button"
                      aria-label={`Lihat ${treatment.name}`}
                      onClick={() => onSelect(treatment)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit ${treatment.name}`}
                      onClick={() => onEdit(treatment)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Hapus ${treatment.name}`}
                      onClick={() => onDelete(treatment)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="asset-pagination">
        <p>
          Menampilkan {totalCount === 0 ? 0 : startIndex + 1} -{" "}
          {Math.min(startIndex + treatments.length, totalCount)} dari {totalCount} treatment
        </p>
        <div>
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft size={17} />
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === page ? "active" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            aria-label="Halaman berikutnya"
            disabled={page === pageCount}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

function getCategoryClass(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
