"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  showCloseButton?: boolean;
  showHeader?: boolean;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  width = "640px",
  showCloseButton = true,
  showHeader = true,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={showCloseButton ? onClose : undefined}
    >
      <div
        className="modal-box"
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        {showHeader && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}

            {showCloseButton && (
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}