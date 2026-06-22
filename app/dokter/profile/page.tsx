"use client";

import { useEffect, useState } from "react";
import StaffProfilePage from "@/app/components/profile/StaffProfilePage";

export default function DoctorProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    const currentUser = JSON.parse(storedUser);

    fetch(
      `http://127.0.0.1:8000/api/profile/${currentUser.id_user}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <StaffProfilePage
      userId={user.id_user}
      title="Profile Dokter"
      breadcrumbRoot="Dashboard"
      name={user.username}
      role="Dokter"
      initials={
        user.username
          ?.split(" ")
          .map((word: string) => word[0])
          .join("")
          .toUpperCase() || "D"
      }
      summary="Dokter Miamore Aesthetic Clinic."
      phone={user.phone || "-"}
      email={user.email || "-"}
      address={user.address || "-"}
    />
  );
}