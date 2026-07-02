"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { TREATMENT_IMAGE_FALLBACK } from "./treatmentImage";

type TreatmentCardProps = {
  image: string;
  title: string;
  description: string;
  category: string;
  price: string;
  onBooking: () => void;
};

export default function TreatmentCard({
  image,
  title,
  description,
  category,
  price,
  onBooking,
}: TreatmentCardProps) {
  const router = useRouter();

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      toast.error("Silakan login terlebih dahulu");

      localStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname
      );

      router.push("/login");
      return;
    }

    onBooking();
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const imageElement = event.currentTarget;

    if (imageElement.src.endsWith(TREATMENT_IMAGE_FALLBACK)) return;

    imageElement.src = TREATMENT_IMAGE_FALLBACK;
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="relative w-full h-[150px] sm:h-[170px]">
        <Image
          src={image}
          alt={title}
          fill
          onError={handleImageError}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm sm:text-base font-semibold text-black">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-700 leading-snug mb-2">
          {description}
        </p>

        <span className="inline-block text-[10px] sm:text-xs bg-gray-200 text-black px-3 py-1 rounded-full mb-3">
          {category}
        </span>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">
              Mulai Dari
            </p>

            <p className="text-xs sm:text-sm font-bold text-black">
              {price}
            </p>
          </div>

          <button
            type="button"
            onClick={handleBooking}
            className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
            aria-label={`Booking ${title}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
