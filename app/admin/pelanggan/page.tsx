"use client";

import { useEffect, useState } from "react";
import CustomerTable from "../../components/admin/CustomerTable";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import SuccessModal from "../../components/admin/SuccessModal";
import type { CustomerItem } from "@/types/dashboard";

export default function PelangganPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerItem | null>(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/pelanggan"
      );

      const text = await response.text();

      const result = JSON.parse(
        text.replace(/^\/\//, "")
      );

      setCustomers(
        result.data.map((item: any) => ({
          id: item.id_user,
          name: item.username,
          email: item.email,
          phone:
            item.phone ??
            item.no_telephone ??
            "-",
          status:
            item.status ??
            "Aktif",
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenEditModal = (
    item: CustomerItem
  ) => {
    console.log(
      "Edit pelanggan:",
      item
    );
  };

  const handleOpenDeleteModal = (
    item: CustomerItem
  ) => {
    setSelectedCustomer(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete =
    async () => {
      if (!selectedCustomer)
        return;

      try {
        const response =
          await fetch(
            `http://127.0.0.1:8000/api/pelanggan/${selectedCustomer.id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Gagal menghapus pelanggan"
          );
        }

        await fetchCustomers();

        setIsDeleteOpen(false);
        setSelectedCustomer(null);

        setSuccessMessage(
          "Data pelanggan berhasil dihapus."
        );

        setIsSuccessOpen(true);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <section>
      <h1 className="page-title">
        Pelanggan
      </h1>

      <CustomerTable
        data={customers}
        onEdit={handleOpenEditModal}
        onDelete={
          handleOpenDeleteModal
        }
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={
          handleConfirmDelete
        }
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() =>
          setIsSuccessOpen(false)
        }
        message={successMessage}
      />
    </section>
  );
}