"use client";

import { LogOut } from "lucide-react";
import Modal from "./Modal";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="420px"
      showCloseButton={false}
      showHeader={false}
    >
      <div className="delete-modal-content">
        <div className="delete-icon-wrapper logout-icon">
          <LogOut size={70} />
        </div>

        <h3 className="delete-modal-title">Yakin ingin keluar?</h3>

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