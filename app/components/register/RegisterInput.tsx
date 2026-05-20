import { ReactNode } from "react";

type RegisterInputProps = {
  type: string;
  placeholder: string;
  icon: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RegisterInput({
  type,
  placeholder,
  icon,
  value,
  onChange,
}: RegisterInputProps) {
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
        value={value}
        onChange={onChange}
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