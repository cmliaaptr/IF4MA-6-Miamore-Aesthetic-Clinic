"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Modal from "../Modal";
import type { AdminTreatmentAsset, AdminTreatmentStep } from "./AdminTreatmentAssetTypes";

type AdminTreatmentStepModalProps = {
  isOpen: boolean;
  treatment: AdminTreatmentAsset | null;
  onClose: () => void;
  onSubmit: (steps: AdminTreatmentStep[]) => void;
};

const emptyStep: AdminTreatmentStep = {
  id: 0,
  name: "",
  product: "",
  dosage: "",
  duration: "",
  usage: "",
};

export default function AdminTreatmentStepModal({
  isOpen,
  treatment,
  onClose,
  onSubmit,
}: AdminTreatmentStepModalProps) {
  const [steps, setSteps] = useState<AdminTreatmentStep[]>([emptyStep]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isOpen) return;

    setSteps(
      treatment?.steps.length
        ? treatment.steps.map((step, index) => ({ ...step, id: step.id || index + 1 }))
        : [{ ...emptyStep, id: Date.now() }],
    );
  }, [isOpen, treatment]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleChange = (
    index: number,
    field: keyof Omit<AdminTreatmentStep, "id">,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    setSteps((current) =>
      current.map((step, stepIndex) =>
        stepIndex === index
          ? {
              ...step,
              [field]: value,
            }
          : step,
      ),
    );
  };

  const handleAddStep = () => {
    setSteps((current) => [...current, { ...emptyStep, id: Date.now() }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps((current) =>
      current.length === 1 ? current : current.filter((_, stepIndex) => stepIndex !== index),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedSteps = steps
      .map((step) => ({
        ...step,
        name: step.name.trim(),
        product: step.product.trim(),
        dosage: step.dosage.trim(),
        duration: step.duration.trim(),
        usage: step.usage.trim(),
      }))
      .filter((step) => step.name && step.product && step.dosage);

    if (cleanedSteps.length === 0) return;

    onSubmit(cleanedSteps);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Kelola Langkah & Takaran${treatment ? ` - ${treatment.name}` : ""}`}
      onClose={onClose}
      width="900px"
    >
      <form className="asset-form" onSubmit={handleSubmit}>
        {steps.map((step, index) => (
          <section key={step.id || index} className="asset-step-editor">
            <div className="asset-step-editor-header">
              <h3>Langkah {index + 1}</h3>
              <button
                type="button"
                aria-label={`Hapus langkah ${index + 1}`}
                onClick={() => handleRemoveStep(index)}
                disabled={steps.length === 1}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="asset-form-grid">
              <div className="form-group">
                <label htmlFor={`step-name-${index}`}>Nama Langkah</label>
                <input
                  id={`step-name-${index}`}
                  value={step.name}
                  onChange={(event) => handleChange(index, "name", event)}
                  placeholder="Contoh: Cleansing"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`step-product-${index}`}>Aset / Produk</label>
                <input
                  id={`step-product-${index}`}
                  value={step.product}
                  onChange={(event) => handleChange(index, "product", event)}
                  placeholder="Contoh: Gentle Facial Cleanser"
                />
              </div>
            </div>

            <div className="asset-form-grid">
              <div className="form-group">
                <label htmlFor={`step-dosage-${index}`}>Takaran</label>
                <input
                  id={`step-dosage-${index}`}
                  value={step.dosage}
                  onChange={(event) => handleChange(index, "dosage", event)}
                  placeholder="Contoh: 2 pump"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`step-duration-${index}`}>Durasi</label>
                <input
                  id={`step-duration-${index}`}
                  value={step.duration}
                  onChange={(event) => handleChange(index, "duration", event)}
                  placeholder="Contoh: 5 Menit"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`step-usage-${index}`}>Cara Penggunaan</label>
              <textarea
                id={`step-usage-${index}`}
                value={step.usage}
                rows={3}
                onChange={(event) => handleChange(index, "usage", event)}
                placeholder="Contoh: Ratakan pada wajah lembap, lalu bilas bersih."
              />
            </div>
          </section>
        ))}

        <div className="asset-step-modal-actions">
          <button type="button" className="asset-secondary-button" onClick={handleAddStep}>
            <Plus size={16} />
            Tambah Langkah
          </button>

          <button type="submit" className="asset-primary-button">
            Simpan Langkah & Takaran
          </button>
        </div>
      </form>
    </Modal>
  );
}
