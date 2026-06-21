"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type TreatmentCardProps = {
  title: string;
  description: string;
  image: string;
  onBooking: () => void;
};

export default function TreatmentCard({
  title,
  description,
  image,
  onBooking,
}: TreatmentCardProps) {
  const router = useRouter();

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    // Belum login
    if (!user) {
      toast.error("Silakan login terlebih dahulu");

      localStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname
      );

      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    // Hanya pelanggan yang boleh booking
    if (parsedUser.role !== "pelanggan") {
      toast.error(
        "Booking hanya dapat dilakukan oleh pelanggan"
      );
      return;
    }

    // Buka form booking
    onBooking();
  };

  return (
    <div className="min-w-[240px] overflow-hidden rounded-2xl bg-white shadow-xl sm:min-w-[280px] md:min-w-[300px]">
      <Image
        src={image}
        alt={title}
        width={420}
        height={260}
        className="h-40 w-full object-cover sm:h-44"
      />

      <div className="p-4">
        <h3 className="mb-1 font-semibold">
          {title}
        </h3>

        <p className="mb-6 text-xs text-gray-600">
          {description}
        </p>

        <button
          type="button"
          onClick={handleBooking}
          className="rounded-md bg-green-400 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500"
        >
          Booking Sekarang
        </button>
      </div>
    </div>
  );
}