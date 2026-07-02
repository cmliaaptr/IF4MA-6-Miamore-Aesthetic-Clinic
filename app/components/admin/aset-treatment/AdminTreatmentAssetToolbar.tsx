import { Filter, Search } from "lucide-react";

type AdminTreatmentAssetToolbarProps = {
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export default function AdminTreatmentAssetToolbar({
  searchQuery,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: AdminTreatmentAssetToolbarProps) {
  return (
    <div className="asset-toolbar">
      <div className="asset-search">
        <input
          type="search"
          placeholder="Cari treatment..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Search size={18} />
      </div>

      <label className="asset-filter">
        <Filter size={16} />
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
