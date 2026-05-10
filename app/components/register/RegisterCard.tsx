import Image from "next/image";
import Link from "next/link";
import { Mail, UserCircle, Lock } from "lucide-react";
import RegisterInput from "./RegisterInput";

export default function RegisterCard() {
  return (
    <section
      className="
        w-full max-w-[710px]
        rounded-[28px] sm:rounded-[42px]
        bg-white/30 backdrop-blur-2xl
        border border-white/40
        shadow-2xl
        px-6 sm:px-8 md:px-10
        py-7 sm:py-8
      "
    >
      <div className="flex justify-center">
        <Image
          src="/images/logo.png"
          alt="Miamore Logo"
          width={95}
          height={95}
          className="object-contain w-[75px] sm:w-[95px]"
          priority
        />
      </div>

      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-[#d4af37] drop-shadow-md mb-6 sm:mb-8">
        Register
      </h1>

      <form className="space-y-6">
        <RegisterInput
          type="email"
          placeholder="Email"
          icon={<Mail className="w-6 h-6 sm:w-8 sm:h-8 text-black" />}
        />

        <RegisterInput
          type="text"
          placeholder="Username"
          icon={<UserCircle className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />}
        />

        <RegisterInput
          type="password"
          placeholder="Password"
          icon={<Lock className="w-6 h-6 sm:w-8 sm:h-8 text-black" />}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
          <Link
            href="/login"
            className="
              w-full sm:w-[235px]
              h-12 flex items-center justify-center
              rounded-xl bg-blue-500 hover:bg-blue-600
              text-white font-extrabold text-2xl sm:text-3xl
              transition shadow-lg
            "
          >
            Submit
          </Link>

          <Link
            href="/login"
            className="
              text-center sm:text-right
              text-sm sm:text-base
              font-extrabold text-black
              hover:underline
            "
          >
            Already Have an Account?
          </Link>
        </div>
      </form>
    </section>
  );
}