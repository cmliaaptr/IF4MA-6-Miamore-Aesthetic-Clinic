"use client";

import { useEffect, useState } from "react";
import StaffProfilePage from "@/app/components/profile/StaffProfilePage";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <StaffProfilePage
      title="Profile Admin"
      breadcrumbRoot="Dashboard"
      name={user.username}
      role={user.role}
      initials={user.username
        ?.split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()}
      summary="Administrator Miamore Aesthetic Clinic."
      phone="-"
      email={user.email}
      address="-"
    />
  );
}