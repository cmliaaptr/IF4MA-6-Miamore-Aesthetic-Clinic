import { ChevronDown } from "lucide-react";

type LoginSelectProps = {
  value: string;

  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function LoginSelect({ value, onChange }: LoginSelectProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          h-12 sm:h-14
          px-4 sm:px-5
          rounded-xl
          border border-gray-300
          bg-white
          text-gray-600
          font-bold
          text-xl
          outline-none
          appearance-none
          cursor-pointer
          shadow-sm
          focus:border-[#d4af37]
          focus:ring-2
          focus:ring-[#d4af37]/30
          transition
        "
      >
        <option value="" disabled>Pilih Role</option>
        <option value="pelanggan">Pelanggan</option>
        <option value="dokter">Dokter</option>
        <option value="admin">Admin</option>
      </select>

      {/* ICON */}
      <ChevronDown
        className="
          absolute right-4 top-1/2
          -translate-y-1/2
          w-6 h-6
          text-gray-500
          pointer-events-none
        "
      />
    </div>
  );
}
