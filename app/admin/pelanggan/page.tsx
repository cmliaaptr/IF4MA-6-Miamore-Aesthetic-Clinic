"use client";

import { useState } from "react";
import CustomerTable from "../../components/admin/CustomerTable";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import SuccessModal from "../../components/admin/SuccessModal";
import { customerList as initialCustomerList } from "@/data/dashboard";
import type { CustomerItem } from "@/types/dashboard";

export default function PelangganPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>(
    initialCustomerList
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerItem | null>(null);

  const handleOpenEditModal = (item: CustomerItem) => {
    console.log("Edit pelanggan:", item);
  };

  const handleOpenDeleteModal = (item: CustomerItem) => {
    setSelectedCustomer(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;

    setCustomers((prev) =>
      prev.filter((item) => item.id !== selectedCustomer.id)
    );

    setIsDeleteOpen(false);
    setSelectedCustomer(null);

    setSuccessMessage("Data pelanggan berhasil dihapus.");
    setIsSuccessOpen(true);
  };

  return (
    <section>
      <h1 className="page-title">Pelanggan</h1>

      <CustomerTable
        data={customers}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCustomer(null);
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