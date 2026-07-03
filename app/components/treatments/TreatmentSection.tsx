"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import BookingModal from "../booking/BookingModal";
import TreatmentCard from "./TreatmentCard";
import {
  createTreatmentCategories,
  fetchUserTreatments,
  UserTreatment,
} from "./treatmentData";

export default function TreatmentSection() {
  const searchParams = useSearchParams();
  const [treatments, setTreatments] = useState<UserTreatment[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<UserTreatment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadTreatments() {
      setIsLoading(true);
      setMessage("");

      try {
        setTreatments(await fetchUserTreatments());
      } catch (error) {
        setTreatments([]);
        setMessage(
          error instanceof Error
            ? error.message
            : "Gagal mengambil data treatment."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadTreatments();
  }, []);

  const categoryFromUrl =
    searchParams.get("category") || "Semua Treatment";

  const active = categoryFromUrl;
  const categories = useMemo(() => createTreatmentCategories(treatments), [treatments]);

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

        {isLoading ? (
          <p className="mb-5 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600">
            Memuat treatment...
          </p>
        ) : null}

        {message ? (
          <p className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            {message}
          </p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && !message && filteredTreatments.length === 0 ? (
            <p className="col-span-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600">
              Belum ada treatment yang ditambahkan admin.
            </p>
          ) : null}

          {filteredTreatments.map((item) => (
            <TreatmentCard
              key={item.id}
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
