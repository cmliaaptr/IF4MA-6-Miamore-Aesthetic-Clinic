"use client";

import { useEffect, useMemo, useState } from "react";
import RiwayatCard from "./RiwayatCard";
import RiwayatDetailModal from "./RiwayatDetailModal";
import RiwayatHeader from "./RiwayatHeader";
import RiwayatTabs from "./RiwayatTabs";
import type { RiwayatItem } from "./RiwayatTypes";

const filters = ["Semua", "Akan Datang", "Selesai", "Dibatalkan"];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

function getLoggedInCustomerId() {
  try {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) return null;

    const user = JSON.parse(rawUser) as { id_user?: number; role?: string };

    if (typeof user.id_user !== "number" || user.role !== "pelanggan") {
      return null;
    }

    return user.id_user;
  } catch {
    return null;
  }
}

export default function RiwayatSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<RiwayatItem | null>(null);
  const [riwayatItems, setRiwayatItems] = useState<RiwayatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchRiwayat() {
      setIsLoading(true);
      setMessage("");

      try {
        const customerId = getLoggedInCustomerId();

        if (!customerId) {
          setRiwayatItems([]);
          setMessage("Silakan login sebagai pelanggan untuk melihat riwayat.");
          return;
        }

        const response = await fetch(
          `${API_BASE_URL}/api/riwayat/customer/${customerId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const text = await response.text();
        const result = text ? parseApiText(text) : null;

        if (!response.ok) {
          throw new Error(result?.message || "Gagal mengambil riwayat.");
        }

        setRiwayatItems(
          Array.isArray(result?.data) ? (result.data as RiwayatItem[]) : []
        );
      } catch (error) {
        setRiwayatItems([]);
        setMessage(
          error instanceof Error
            ? error.message
            : "Gagal mengambil riwayat customer."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchRiwayat();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "Semua") {
      return riwayatItems;
    }

    return riwayatItems.filter((item) => item.status === activeFilter);
  }, [activeFilter, riwayatItems]);

  return (
    <section className="px-4 pb-16 pt-32 sm:px-6 md:pt-36">
      <div className="mx-auto max-w-4xl">
        <RiwayatHeader />
        <RiwayatTabs
          activeFilter={activeFilter}
          filters={filters}
          onChange={setActiveFilter}
        />

        <div className="space-y-7">
          {isLoading ? (
            <p className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-600">
              Memuat riwayat...
            </p>
          ) : null}

          {message ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-700">
              {message}
            </p>
          ) : null}

          {!isLoading && !message && filteredItems.length === 0 ? (
            <p className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-600">
              Belum ada riwayat booking.
            </p>
          ) : null}

          {filteredItems.map((item) => (
            <RiwayatCard
              key={item.id}
              item={item}
              onDetail={setSelectedItem}
            />
          ))}
        </div>
      </div>

      <RiwayatDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
