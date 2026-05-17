import { ReactNode } from "react";

type LoginInputProps = {
  type: string;
  placeholder: string;
  icon: ReactNode;
};

export default function LoginInput({
  type,
  placeholder,
  icon,
}: LoginInputProps) {
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
      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full bg-transparent outline-none
          text-gray-800 placeholder:text-gray-500
          font-bold text-base sm:text-xl
        "
      />

      {icon}
    </div>
  );
}