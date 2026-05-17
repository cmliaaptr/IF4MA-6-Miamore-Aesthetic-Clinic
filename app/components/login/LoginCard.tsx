import Image from "next/image";
import Link from "next/link";
import { Lock, UserCircle } from "lucide-react";
import LoginInput from "./LoginInput";
import LoginSelect from "./LoginSelect";

export default function LoginCard() {
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
          className="object-contain w-[115px] sm:w-[130px]"
          priority
        />

        <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#d4af37] drop-shadow-md">
          Login
        </h1>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <LoginSelect />

        <LoginInput
          type="text"
          placeholder="Username"
          icon={<UserCircle className="w-5 h-5 text-gray-500" />}
        />

        <LoginInput
          type="password"
          placeholder="Password"
          icon={<Lock className="w-5 h-5 text-gray-500" />}
        />

        <Link
          href="/landingpage"
          className="
            w-full h-12
            flex items-center justify-center
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
          Login
        </Link>

        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            href="/"
            className="font-semibold text-[#d4af37] hover:underline"
          >
            Daftar disini
          </Link>
        </p>
      </form>
    </section>
  );
}