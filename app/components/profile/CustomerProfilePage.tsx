"use client";

import { useSyncExternalStore } from "react";
import StaffProfilePage from "./StaffProfilePage";

type CustomerProfile = {
  id_user: number;
  name: string;
  email: string;
  phone: string;
  address: string;
};

type StoredUser = {
  id_user?: number;
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
};

const defaultProfile: CustomerProfile = {
  id_user: 0,
  name: "Customer Miamore",
  email: "customer@miamoreclinic.com",
  phone: "+62 812 0000 0000",
  address: "Alamat belum diisi",
};

export default function CustomerProfilePage() {
  const rawUser = useSyncExternalStore(
    subscribeToStorage,
    getStoredUserSnapshot,
    getServerSnapshot
  );

  const profile = getCustomerProfile(rawUser);

  return (
    <StaffProfilePage
      userId={profile.id_user}
      title="Profile Customer"
      breadcrumbRoot="Beranda"
      name={profile.name}
      role="Pelanggan"
      initials={
        profile.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
      }
      summary="Pelanggan Miamore Aesthetic Clinic yang dapat mengelola informasi pribadi, melihat riwayat booking, dan menikmati layanan treatment terbaik."
      phone={profile.phone}
      email={profile.email}
      address={profile.address}
    />
  );
}

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () =>
    window.removeEventListener(
      "storage",
      onStoreChange
    );
}

function getStoredUserSnapshot() {
  return localStorage.getItem("user") || "";
}

function getServerSnapshot() {
  return "";
}

function getCustomerProfile(
  rawUser: string
): CustomerProfile {
  try {
    if (!rawUser) return defaultProfile;

    const user = JSON.parse(rawUser) as StoredUser;

    if (user.role !== "pelanggan") {
      return defaultProfile;
    }

    return {
      id_user: user.id_user || 0,
      name:
        user.username ||
        defaultProfile.name,
      email:
        user.email ||
        defaultProfile.email,
      phone: user.phone || defaultProfile.phone,
      address: user.address || defaultProfile.address,
    };
  } catch {
    return defaultProfile;
  }
}
