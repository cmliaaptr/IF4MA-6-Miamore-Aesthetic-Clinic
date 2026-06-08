type RiwayatTabsProps = {
  activeFilter: string;
  filters: string[];
  onChange: (filter: string) => void;
};

export default function RiwayatTabs({
  activeFilter,
  filters,
  onChange,
}: RiwayatTabsProps) {
  return (
    <div className="mb-5 flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`min-w-[112px] rounded-full border px-5 py-1 text-sm font-bold transition sm:text-base ${
              isActive
                ? "border-[#49af3f] bg-[#65cf5d] text-black"
                : "border-gray-400 bg-white text-black hover:border-[#49af3f] hover:text-[#49af3f]"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
