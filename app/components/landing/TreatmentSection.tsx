"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const treatments = [
  {
    title: "Acne",
    desc: "Solusi untuk kulit berjerawat dan bekas jerawat.",
    detail:
      "Treatment Acne membantu mengurangi jerawat aktif, membersihkan pori-pori, serta merawat bekas jerawat agar kulit tampak lebih sehat.",
    image: "/images/acne.jpg",
  },
  {
    title: "Flek",
    desc: "Perawatan untuk noda hitam dan warna kulit tidak merata.",
    detail:
      "Treatment Flek membantu menyamarkan noda hitam, hiperpigmentasi, dan warna kulit tidak merata agar kulit tampak lebih cerah.",
    image: "/images/flek.jpg",
  },
  {
    title: "Brightening",
    desc: "Treatment untuk kulit tampak cerah dan sehat.",
    detail:
      "Treatment Brightening membantu mencerahkan kulit kusam, membuat wajah tampak lebih fresh, bersih, dan glowing.",
    image: "/images/acne.jpg",
  },
  {
    title: "Anti Aging",
    desc: "Membantu kulit terlihat lebih kencang dan segar.",
    detail:
      "Treatment Anti Aging membantu merawat tanda-tanda penuaan seperti garis halus, kulit kendur, dan tekstur kulit yang kurang elastis.",
    image: "/images/flek.jpg",
  },
];

type Treatment = {
  title: string;
  desc: string;
  detail: string;
  image: string;
};

export default function TreatmentSection() {
  const [selectedTreatment, setSelectedTreatment] =
    useState<Treatment | null>(null);

  return (
    <section className="overflow-hidden bg-orange-600 px-5 py-16 text-white md:px-10 md:py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-md">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Treatment Pilihan
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/80 md:text-base">
            Pilih treatment terbaik untuk kebutuhan kulitmu.
          </p>

          <Link
            href="/treatment"
            className="mt-5 inline-block rounded-full bg-emerald-400 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 md:text-sm"
          >
            Lihat Treatment
          </Link>
        </div>

        <div className="mask-scroll overflow-hidden">
          <div className="flex animate-scroll-left gap-5 md:gap-6">
            {[...treatments, ...treatments].map((item, index) => (
              <TreatmentCard
                key={`${item.title}-${index}`}
                title={item.title}
                desc={item.desc}
                image={item.image}
                onDetail={() => setSelectedTreatment(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white text-neutral-900 shadow-2xl">
            <button
              onClick={() => setSelectedTreatment(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-neutral-700 shadow hover:bg-neutral-100"
            >
              ×
            </button>

            <div className="relative h-56 w-full">
              <Image
                src={selectedTreatment.image}
                alt={selectedTreatment.title}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold">
                {selectedTreatment.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {selectedTreatment.detail}
              </p>

              <button
                onClick={() => setSelectedTreatment(null)}
                className="mt-6 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

type TreatmentCardProps = {
  title: string;
  desc: string;
  image: string;
  onDetail: () => void;
};

function TreatmentCard({
  title,
  desc,
  image,
  onDetail,
}: TreatmentCardProps) {
  return (
    <article className="w-64 shrink-0 overflow-hidden rounded-3xl bg-white text-neutral-900 shadow-xl sm:w-72">
      <div className="relative h-40 sm:h-48">
        <Image
          src={image}
          alt={title}
          fill
          sizes="280px"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="mt-2 text-xs leading-5 text-neutral-600 md:text-sm">
          {desc}
        </p>

        <button
          onClick={onDetail}
          className="mt-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
        >
          Lihat Detail
        </button>
      </div>
    </article>
  );
}