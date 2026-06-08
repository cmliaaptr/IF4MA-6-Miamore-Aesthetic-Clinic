"use client";

import { useMemo, useState } from "react";
import RiwayatCard from "./RiwayatCard";
import RiwayatDetailModal from "./RiwayatDetailModal";
import RiwayatHeader from "./RiwayatHeader";
import RiwayatTabs from "./RiwayatTabs";
import type { RiwayatItem } from "./RiwayatTypes";

const filters = ["Semua", "Akan Datang", "Selesai", "Dibatalkan"];

const riwayatItems: RiwayatItem[] = [
  {
    id: 1,
    treatment: "Basmi Flek Coba - Coba",
    schedule: "Rabu, 14 Okt 2026, 10:00 WIB",
    doctor: "Dr. Marissa",
    status: "Selesai",
    room: "Ruang Treatment 2",
    payment: "Lunas",
    detailTitle: "Hasil Treatment",
    detailItems: [
      "Flek tampak lebih samar setelah treatment pertama.",
      "Kulit terasa lebih halus dan lembap.",
      "Disarankan memakai sunscreen setiap pagi.",
    ],
    note: "Kontrol lanjutan direkomendasikan 2 minggu setelah treatment untuk evaluasi kondisi kulit.",
  },
  {
    id: 2,
    treatment: "Facial Acne",
    schedule: "Jumat, 18 Okt 2026, 13:00 WIB",
    doctor: "Ashifa",
    status: "Akan Datang",
    room: "Ruang Facial 1",
    payment: "Menunggu pembayaran",
    detailTitle: "Persiapan Treatment",
    detailItems: [
      "Datang 15 menit sebelum jadwal.",
      "Hindari pemakaian makeup tebal sebelum treatment.",
      "Bawa catatan alergi atau produk skincare yang sedang digunakan.",
    ],
    note: "Jadwal masih aktif. Silakan datang sesuai waktu booking agar proses konsultasi berjalan lancar.",
  },
  {
    id: 3,
    treatment: "Facial Brightening",
    schedule: "Rabu, 16 Okt 2026, 10:00 WIB",
    doctor: "Kenny",
    status: "Selesai",
    room: "Ruang Facial 3",
    payment: "Lunas",
    detailTitle: "Hasil Treatment",
    detailItems: [
      "Warna kulit terlihat lebih merata.",
      "Area kusam berkurang dan kulit terasa segar.",
      "Gunakan pelembap ringan setelah treatment.",
    ],
    note: "Hasil dapat berbeda sesuai kondisi kulit. Perawatan rutin membantu menjaga efek brightening.",
  },
  {
    id: 4,
    treatment: "Dermaplane Glow",
    schedule: "Senin, 20 Okt 2026, 15:00 WIB",
    doctor: "Dr. Marissa",
    status: "Dibatalkan",
    room: "Ruang Treatment 1",
    payment: "Dibatalkan",
    detailTitle: "Informasi Pembatalan",
    detailItems: [
      "Booking dibatalkan oleh pelanggan.",
      "Slot jadwal sudah dilepas kembali.",
      "Tidak ada tindakan treatment yang dilakukan.",
    ],
    note: "Silakan booking ulang jika ingin menjadwalkan treatment ini di waktu lain.",
  },
  {
    id: 5,
    treatment: "Dermaface",
    schedule: "Rabu, 16 Okt 2026, 10:00 WIB",
    doctor: "Kenny",
    status: "Selesai",
    room: "Ruang Treatment 4",
    payment: "Lunas",
    detailTitle: "Hasil Treatment",
    detailItems: [
      "Tekstur kulit terasa lebih rata.",
      "Kemerahan ringan sudah diinformasikan sebagai reaksi normal.",
      "Hindari eksfoliasi selama 3 hari.",
    ],
    note: "Gunakan skincare yang menenangkan kulit dan hindari paparan matahari berlebih.",
  },
];

export default function RiwayatSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<RiwayatItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "Semua") {
      return riwayatItems;
    }

    return riwayatItems.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

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
