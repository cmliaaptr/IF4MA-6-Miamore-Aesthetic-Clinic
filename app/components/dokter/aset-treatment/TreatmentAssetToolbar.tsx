import { Grid2X2, List, Search, SlidersHorizontal } from "lucide-react";

type TreatmentAssetToolbarProps = {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  sortOrder: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function TreatmentAssetToolbar({
  searchQuery,
  selectedCategory,
  categories,
  sortOrder,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: TreatmentAssetToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-violet-100 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_220px] lg:w-[520px]">
        <div className="flex h-11 overflow-hidden rounded-md border border-slate-200 bg-white focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari treatment..."
            className="min-w-0 flex-1 px-4 text-sm outline-none placeholder:text-slate-400"
          />
          <span className="flex w-11 items-center justify-center border-l border-slate-200 text-slate-600">
            <Search size={18} />
          </span>
        </div>

        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700">
          <SlidersHorizontal size={17} />
          <span>Urutkan:</span>
          <select
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            className="bg-transparent font-semibold outline-none"
          >
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
            <option value="steps">Langkah Terbanyak</option>
          </select>
        </label>

        <button
          type="button"
          aria-label="Tampilan grid"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-violet-300 bg-violet-50 text-violet-700"
        >
          <Grid2X2 size={18} />
        </button>
        <button
          type="button"
          aria-label="Tampilan list"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600"
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
}
