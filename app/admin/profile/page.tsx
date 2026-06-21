"use client";

import { useEffect, useState } from "react";
import StaffProfilePage from "@/app/components/profile/StaffProfilePage";

type User = {
  id_user: number;
  username: string;
  email: string;
  role: string;
};

export default function AdminProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Gagal membaca data user", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <StaffProfilePage
      userId={user.id_user}
      title="Profile Admin"
      breadcrumbRoot="Dashboard"
      name={user.username}
      role="Admin"
      initials={user.username
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()}
      summary="Administrator Miamore Aesthetic Clinic yang mengelola data pelanggan, treatment, booking, pembayaran, jadwal dokter, dan laporan klinik."
      phone="-"
      email={user.email}
      address="-"
    />
  );
}