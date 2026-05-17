import Image from "next/image";
import Link from "next/link";
import { Mail, UserCircle, Lock } from "lucide-react";
import RegisterInput from "./RegisterInput";
import RegisterSelect from "./RegisterSelect";

export default function RegisterCard() {
  return (
    <section
      className="
        w-full max-w-[560px]
        rounded-[28px]
        bg-white
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        border border-[#f3f3f3]
        px-7 sm:px-8
        py-6
      "
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-5">
        <Image
          src="/images/Logo.png"
          alt="Miamore Logo"
          width={130}
          height={130}
          className="object-contain w-[180px] sm:w-[130px]"
          priority
        />

        <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#d4af37] drop-shadow-md">
          Register
        </h1>
      </div>
      {/* Form */}
      <form className="space-y-4">
        <RegisterSelect />

        <RegisterInput
          type="email"
          placeholder="Email"
          icon={<Mail className="w-5 h-5 text-gray-500" />}
        />

        <RegisterInput
          type="text"
          placeholder="Username"
          icon={<UserCircle className="w-5 h-5 text-gray-500" />}
        />

        <RegisterInput
          type="password"
          placeholder="Password"
          icon={<Lock className="w-5 h-5 text-gray-500" />}
        />

        {/* Button */}
        <button
          type="submit"
          className="
            w-full h-12
            rounded-xl
            bg-[#d4af37]
            hover:bg-[#c49b24]
            text-white
            font-bold
            text-base
            transition
            shadow-md
          "
        >
          Buat Akun
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-500">
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#d4af37] hover:underline"
          >
            Login disini
          </Link>
        </p>
      </form>
    </section>
  );
}
