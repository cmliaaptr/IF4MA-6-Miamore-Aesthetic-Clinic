import { ChevronDown } from "lucide-react";

export default function LoginSelect() {
  return (
    <div
      className="
        flex items-center w-full
        h-12 sm:h-14
        px-4 sm:px-5
        rounded-lg
        bg-white/35 backdrop-blur-xl
        border border-gray-500/50
        shadow-inner
      "
    >
      <select
        defaultValue="User"
        className="
          w-full appearance-none bg-transparent outline-none
          text-gray-800 font-bold text-lg sm:text-2xl
          cursor-pointer
        "
      >
        <option value="User">User</option>
        <option value="Dokter">Dokter</option>
        <option value="Admin">Admin</option>
      </select>

      <ChevronDown className="w-6 h-6 text-black" />
    </div>
  );
}