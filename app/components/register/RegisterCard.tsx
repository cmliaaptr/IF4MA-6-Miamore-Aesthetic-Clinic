"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, UserCircle, Lock } from "lucide-react";
import toast from "react-hot-toast";

import RegisterInput from "./RegisterInput";
import RegisterSelect from "./RegisterSelect";

export default function RegisterCard() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // VALIDASI FRONTEND
    if (!email && !username && !password) {
      toast.error("Semua field wajib diisi");
      return;
    }
    if (!email.trim()) {
      toast.error("Email wajib diisi");
      return;
    }

    if (!username.trim()) {
      toast.error("Username wajib diisi");
      return;
    }

    if (!password.trim()) {
      toast.error("Password wajib diisi");
      return;
    }

    // VALIDASI FORMAT EMAIL
    if (!email.includes("@")) {
      toast.error("Format email tidak valid");
      return;
    }

    // VALIDASI PASSWORD
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email,
          username,
          password,
          role: "pelanggan",
        }),
      });

      // AMBIL RESPONSE DULU SEBAGAI TEXT
      const text = await response.text();

      // CONVERT KE JSON
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = {
          message: text,
        };
      }

      console.log(data);

      // JIKA BERHASIL
      if (response.ok) {
        toast.success("Register berhasil");

        // RESET INPUT
        setEmail("");
        setUsername("");
        setPassword("");

        // PINDAH KE LOGIN
        router.push("/login");
      } else {
        // ERROR DARI BACKEND
        toast.error(data.error || data.message || "Register gagal");
      }
    } catch (error) {
      console.log(error);

      toast.error("Tidak bisa terhubung ke server");
    }
  };

  return (
    <section className="w-full max-w-[560px] rounded-[28px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#f3f3f3] px-7 sm:px-8 py-6">
      {/* LOGO */}
      <div className="flex flex-col items-center mb-5">
        <Image
          src="/images/logo.png"
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

      {/* FORM */}
      <form onSubmit={handleRegister} className="space-y-4">
        {/* ROLE */}
        <RegisterSelect
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {/* EMAIL */}
        <RegisterInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5 text-gray-500" />}
        />

        {/* USERNAME */}
        <RegisterInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={<UserCircle className="w-5 h-5 text-gray-500" />}
        />

        {/* PASSWORD */}
        <RegisterInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-[#d4af37] hover:bg-[#c49b24] text-white font-bold text-base transition shadow-md"
        >
          Buat Akun
        </button>

        {/* LOGIN LINK */}
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
