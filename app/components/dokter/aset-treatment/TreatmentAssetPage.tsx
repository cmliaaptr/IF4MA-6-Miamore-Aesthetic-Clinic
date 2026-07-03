"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import TreatmentAssetCard from "./TreatmentAssetCard";
import TreatmentAssetToolbar from "./TreatmentAssetToolbar";
import {
  treatmentAssets,
} from "./treatmentAssets";
import {
  fetchTreatmentAssetItems,
  mapApiTreatmentToDoctorAsset,
} from "./treatmentAssetApi";

export default function TreatmentAssetPage() {
  const [assets, setAssets] = useState(treatmentAssets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [sortOrder, setSortOrder] = useState("az");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredAssets = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return assets
      .filter((asset) => {
        const matchesSearch =
          !normalizedQuery ||
          asset.name.toLowerCase().includes(normalizedQuery) ||
          asset.category.toLowerCase().includes(normalizedQuery) ||
          asset.description.toLowerCase().includes(normalizedQuery);
        const matchesCategory =
          selectedCategory === "Semua Kategori" ||
          asset.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "za") {
          return b.name.localeCompare(a.name);
        }

        if (sortOrder === "steps") {
          return b.steps.length - a.steps.length;
        }

        return a.name.localeCompare(b.name);
      });
  }, [assets, searchQuery, selectedCategory, sortOrder]);
  const categories = useMemo(
    () => [
      "Semua Kategori",
      ...Array.from(new Set(assets.map((asset) => asset.category))),
    ],
    [assets],
  );

  useEffect(() => {
    async function loadTreatmentAssets() {
      try {
        const items = await fetchTreatmentAssetItems();
        const nextAssets = items
          .filter((item) => item.status !== "Nonaktif")
          .map(mapApiTreatmentToDoctorAsset);

        setAssets(nextAssets);
        setErrorMessage("");
      } catch {
        setErrorMessage("Data aset treatment backend belum dapat dimuat.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTreatmentAssets();
  }, []);

  return (
    <section className="mx-auto max-w-7xl">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-normal text-slate-950 md:text-[34px]">
            Panduan Aset Treatment
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Pilih treatment untuk melihat detail takaran dan penggunaan produk
            di setiap langkahnya.
          </p>
        </div>

        <Link
          href="/admin/treatment"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-violet-400 bg-white px-4 text-sm font-bold text-violet-700 shadow-sm transition hover:bg-violet-50"
        >
          <Pencil size={16} />
          Kelola Treatment
        </Link>
      </header>

      <div className="mt-7">
        <TreatmentAssetToolbar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          sortOrder={sortOrder}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOrder}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredAssets.map((asset) => (
          <TreatmentAssetCard key={asset.slug} asset={asset} />
        ))}
      </div>

      {isLoading ? (
        <div className="mt-6 rounded-lg border border-violet-100 bg-white p-6 text-sm font-semibold text-slate-600">
          Memuat aset treatment...
        </div>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 text-sm font-semibold text-amber-700">{errorMessage}</p>
      ) : null}

      {filteredAssets.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-violet-200 bg-white p-8 text-center">
          <p className="text-sm font-semibold text-slate-600">
            Treatment tidak ditemukan. Coba gunakan kata kunci atau kategori
            lain.
          </p>
        </div>
      ) : null}
    </section>
  );
}
