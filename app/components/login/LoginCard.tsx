"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import LoginInput from "./LoginInput";
import LoginSelect from "./LoginSelect";

export default function LoginCard() {
  const router = useRouter();

  // STATE
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // HANDLE LOGIN
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // VALIDASI SEMUA KOSONG
    if (!username && !password) {
      toast.error("Username dan password wajib diisi");

      return;
    }

    // VALIDASI USERNAME
    if (!username) {
      toast.error("Username wajib diisi");

      return;
    }

    // VALIDASI PASSWORD
    if (!password) {
      toast.error("Password wajib diisi");

      return;
    }

    try {
      // FETCH LOGIN API
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      // AMBIL RESPONSE TEXT
      const text = await response.text();

      // HAPUS // JIKA ADA
      const cleanText = text.replace(/^\/\//, "").trim();

      let data;

      // CONVERT KE JSON
      try {
        data = JSON.parse(cleanText);
      } catch {
        data = {
          message: cleanText,
        };
      }

      console.log(data);

      // LOGIN BERHASIL
      if (response.ok) {
        toast.success("Login berhasil");

        // VALIDASI USER
        if (!data.user) {
          toast.error("Data user tidak ditemukan");

          return;
        }

        // SIMPAN USER
        localStorage.setItem("user", JSON.stringify(data.user));

        // SIMPAN ROLE
        localStorage.setItem("role", data.user.role);

        // SET COOKIE ROLE (middleware membaca cookie ini)
        try {
          document.cookie = `role=${data.user.role}; path=/; max-age=${60 * 60 * 24 * 7}`;
        } catch (e) {
          console.warn("Gagal menyimpan cookie role", e);
        }

        // ROLE ADMIN
        if (data.user.role === "admin") {
          router.push("/admin");
        }

        // ROLE DOKTER
        else if (data.user.role === "dokter") {
          router.push("/dokter");
        }

        // ROLE PELANGGAN
        else {
          router.push("/");
        }
      } else {
        // ERROR BACKEND
        toast.error(data.message || "Login gagal");
      }
    } catch (error) {
      console.log(error);

      toast.error("Tidak bisa terhubung ke server");
    }
  };

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
      {/* LOGO */}
      <div className="flex flex-col items-center mb-5">
        <Image
          src="/images/logo.png"
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

      {/* FORM */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* ROLE */}
        <LoginSelect value={role} onChange={(e) => setRole(e.target.value)} />

        {/* USERNAME */}
        <LoginInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          icon={<UserCircle className="w-5 h-5 text-gray-500" />}
        />

        {/* PASSWORD */}
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5 text-gray-500" />}
        />

        {/* BUTTON LOGIN */}
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
          Login
        </button>

        {/* LINK REGISTER */}
        <p className="text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="
              font-semibold
              text-[#d4af37]
              hover:underline
            "
          >
            Daftar disini
          </Link>
        </p>
      </form>
    </section>
  );
}
