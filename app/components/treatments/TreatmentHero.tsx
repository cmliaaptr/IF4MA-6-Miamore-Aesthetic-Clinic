"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BookingModal from "../booking/BookingModal";
import {
  fetchUserTreatments,
  UserTreatment,
} from "./treatmentData";

export default function TreatmentHero() {
  const router = useRouter();

  const [isBookingOpen, setIsBookingOpen] =
    useState(false);
  const [treatments, setTreatments] =
    useState<UserTreatment[]>([]);

  const loadTreatments = async () => {
    try {
      setTreatments(await fetchUserTreatments());
    } catch {
      setTreatments([]);
    }
  };

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      toast.error(
        "Silakan login terlebih dahulu"
      );

      localStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname
      );

      router.push("/login");
      return;
    }

    loadTreatments();
    setIsBookingOpen(true);
  };

  return (
    <>
      <section
        className="
          min-h-[320px] sm:min-h-[420px] md:min-h-[520px]
          bg-cover bg-center
          flex items-center
          px-6 sm:px-10 md:px-16 lg:px-24
        "
        style={{
          backgroundImage:
            "url('/images/treatment-hero.png')",
        }}
      >
        <div className="max-w-xl text-left text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Design Treatment
          </h1>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Temukan pilihan treatment terbaik untuk membantu
            kulit tampak lebih sehat, cerah, dan terawat.
          </p>

          <button
            type="button"
            onClick={handleBooking}
            className="
              inline-flex items-center justify-center
              px-6 py-3 rounded-full
              bg-[#d4af37] hover:bg-[#c49d2f]
              text-white font-bold
              transition
            "
          >
            Booking Sekarang
          </button>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingOpen}
        availableTreatments={treatments.map((treatment) => ({
          name: treatment.title,
          price: treatment.price,
        }))}
        onClose={() =>
          setIsBookingOpen(false)
        }
      />
    </>
  );
}
