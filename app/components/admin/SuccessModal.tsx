"use client";

import { Check } from "lucide-react";
import Modal from "./Modal";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Berhasil!",
  message = "Berhasil ditampilkan.",
}: SuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="420px"
      showCloseButton={false}
      showHeader={false}
    >
      <div className="success-modal-content">
        <div className="success-icon-wrapper">
          <Check size={52} />
        </div>

        <h3 className="success-modal-title">{title}</h3>
        <p className="success-modal-message">{message}</p>

        <div className="success-modal-actions">
          <button
            type="button"
            className="success-ok-button"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
}