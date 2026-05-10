import Image from "next/image";

const treatments = [
  {
    title: "Acne",
    desc: "Solusi untuk kulit berjerawat dan bekas jerawat.",
    image: "/images/acne.jpg",
  },
  {
    title: "Flek",
    desc: "Perawatan untuk noda hitam dan warna kulit tidak merata.",
    image: "/images/flek.jpg",
  },
  {
    title: "Brightening",
    desc: "Treatment untuk kulit tampak cerah dan sehat.",
    image: "/images/acne.jpg",
  },
  {
    title: "Anti Aging",
    desc: "Membantu kulit terlihat lebih kencang dan segar.",
    image: "/images/flek.jpg",
  },
];

export default function TreatmentSection() {
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

          <button className="mt-5 rounded-full bg-emerald-400 px-5 py-2 text-xs font-semibold text-white md:text-sm">
            Lihat Treatment
          </button>
        </div>

        <div className="mask-scroll overflow-hidden">
          <div className="flex animate-scroll-left gap-5 md:gap-6">
            {[...treatments, ...treatments].map((item, index) => (
              <TreatmentCard
                key={`${item.title}-${index}`}
                title={item.title}
                desc={item.desc}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type TreatmentCardProps = {
  title: string;
  desc: string;
  image: string;
};

function TreatmentCard({ title, desc, image }: TreatmentCardProps) {
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

        <button className="mt-5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-white">
          Booking Sekarang
        </button>
      </div>
    </article>
  );
}