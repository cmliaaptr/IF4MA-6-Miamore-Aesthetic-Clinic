"use client";

import { useSyncExternalStore } from "react";
import StaffProfilePage from "./StaffProfilePage";

type CustomerProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type StoredUser = {
  username?: string;
  email?: string;
  role?: string;
};

const defaultProfile: CustomerProfile = {
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
      title="Profile Customer"
      breadcrumbRoot="Beranda"
      name={profile.name}
      role="Pelanggan"
      initials="CM"
      summary="Pelanggan Miamore Aesthetic Clinic yang dapat mengelola informasi pribadi, melihat riwayat booking, dan menikmati layanan treatment terbaik."
      phone={profile.phone}
      email={profile.email}
      address={profile.address}
    />
  );
}

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function getStoredUserSnapshot() {
  return localStorage.getItem("user") || "";
}

function getServerSnapshot() {
  return "";
}

function getCustomerProfile(rawUser: string): CustomerProfile {
  try {
    if (!rawUser) return defaultProfile;

    const user = JSON.parse(rawUser) as StoredUser;
    if (user.role !== "pelanggan") return defaultProfile;

    return {
      name: user.username || defaultProfile.name,
      email: user.email || defaultProfile.email,
      phone: defaultProfile.phone,
      address: defaultProfile.address,
    };
  } catch {
    return defaultProfile;
  }
}
