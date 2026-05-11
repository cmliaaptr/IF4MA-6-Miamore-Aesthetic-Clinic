import Image from "next/image";
import Link from "next/link";
import { Lock, UserCircle } from "lucide-react";
import LoginInput from "./LoginInput";
import LoginSelect from "./LoginSelect";

export default function LoginCard() {
  return (
    <section
      className="
        w-full max-w-[710px]
        rounded-[28px] sm:rounded-[42px]
        bg-white/30 backdrop-blur-2xl
        border border-white/40
        shadow-2xl
        px-6 sm:px-8 md:px-10
        py-8 sm:py-10
      "
    >
      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          alt="Miamore Logo"
          width={100}
          height={100}
          className="object-contain w-[80px] sm:w-[100px]"
          priority
        />
      </div>

      <h1
        className="
          text-center
          text-4xl sm:text-5xl
          font-extrabold
          text-[#d4af37]
          drop-shadow-md
          mb-8 sm:mb-10
        "
      >
        Login
      </h1>

      <form className="space-y-6">
        <LoginSelect />

        <LoginInput
          type="text"
          placeholder="Username"
          icon={
            <UserCircle className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600" />
          }
        />

        <LoginInput
          type="password"
          placeholder="Password"
          icon={<Lock className="w-7 h-7 sm:w-8 sm:h-8 text-black" />}
        />

        <Link
          href="/"
          className="
            w-full h-12 sm:h-14
            flex items-center justify-center
            rounded-xl
            bg-blue-500 hover:bg-blue-600
            text-white
            font-extrabold
            text-2xl sm:text-3xl
            transition
            shadow-lg
          "
        >
          Submit
        </Link>
      </form>
    </section>
  );
}