"use client";

import { CircleAlert } from "lucide-react";
import Modal from "./Modal";

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="500px" showCloseButton={false}>
      <div className="delete-modal-content">
        <div className="delete-icon-wrapper">
          <CircleAlert size={70} />
        </div>

        <h3 className="delete-modal-title">Yakin Hapus Data?</h3>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="delete-yes-button"
            onClick={onConfirm}
          >
            Ya
          </button>

          <button
            type="button"
            className="delete-cancel-button"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </Modal>
  );
}