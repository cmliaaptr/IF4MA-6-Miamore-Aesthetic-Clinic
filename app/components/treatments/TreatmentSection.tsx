"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import BookingModal from "../booking/BookingModal";
import TreatmentCard from "./TreatmentCard";

const treatments = [
  {
    image: "/images/treatment.jpg",
    title: "Basmi Flek Coba-Coba",
    description: "Membasmi flek secara tuntas dan bersih glowing.",
    category: "1x / Bulan",
    price: "Rp. 500.000",
    type: "Flek",
  },
  {
    image: "/images/treatment.jpg",
    title: "Acne Treatment",
    description: "Perawatan kulit berjerawat.",
    category: "1x / Bulan",
    price: "Rp. 450.000",
    type: "Acne",
  },
  {
    image: "/images/treatment.jpg",
    title: "Glowing Treatment",
    description: "Kulit tampak lebih cerah.",
    category: "1x / Bulan",
    price: "Rp. 600.000",
    type: "Glowing",
  },
];

const categories = ["Semua Treatment", "Flek", "Acne", "Glowing"];

export default function TreatmentSection() {
  const searchParams = useSearchParams();
  const [selectedTreatment, setSelectedTreatment] = useState<
    (typeof treatments)[number] | null
  >(null);

  const categoryFromUrl =
    searchParams.get("category") || "Semua Treatment";

  const active = categoryFromUrl;

  const filteredTreatments =
    active === "Semua Treatment"
      ? treatments
      : treatments.filter((item) => item.type === active);

  return (
    <section className="bg-white px-4 sm:px-6 md:px-10 lg:px-16 py-8">
      <div className="max-w-6xl mx-auto">
        <select
          value={active}
          onChange={(e) => {
            window.location.href = `/treatment?category=${e.target.value}`;
          }}
          className="
            mb-8
            w-full sm:w-[260px]
            rounded-lg
            bg-green-400
            px-4 py-2
            text-white font-bold
            outline-none
            cursor-pointer
          "
        >
          {categories.map((category) => (
            <option key={category} value={category} className="text-black">
              {category}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((item, index) => (
            <TreatmentCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
              price={item.price}
              onBooking={() => setSelectedTreatment(item)}
            />
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={Boolean(selectedTreatment)}
        selectedTreatment={
          selectedTreatment
            ? {
                name: selectedTreatment.title,
                price: selectedTreatment.price,
              }
            : null
        }
        availableTreatments={treatments.map((treatment) => ({
          name: treatment.title,
          price: treatment.price,
        }))}
        onClose={() => setSelectedTreatment(null)}
      />
    </section>
  );
}
