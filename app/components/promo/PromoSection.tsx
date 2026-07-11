import PromoCard from "./PromoCard";

const promoImages = [
  {
    image: "/images/treatment-hero.png",
    title: "The Next Level Skincare",
    eyebrow: "Miamore Beauty",
  },
  {
    image: "/images/acne.jpg",
    title: "Acne Care Treatment",
    eyebrow: "Kulit lebih terawat",
  },
  {
    image: "/images/brightening.jpg",
    title: "Brightening Treatment",
    eyebrow: "Wajah tampak lebih cerah",
  },
  {
    image: "/images/flek.jpg",
    title: "Laser Flek Treatment",
    eyebrow: "Samarkan noda hitam",
  },
  {
    image: "/images/co2 fractional.jpg",
    title: "CO2 Fractional Treatment",
    eyebrow: "Perawatan kulit bertekstur",
  },
  {
    image: "/images/anti-aging.jpeg",
    title: "Anti-Aging Treatment",
    eyebrow: "Rawat kulit agar tampak segar",
  },
];

export default function PromoSection() {
  const slidingPromos = [...promoImages, ...promoImages];

  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-bold text-black md:text-3xl">
          PROMO
        </h2>

        <div className="mask-scroll overflow-hidden">
          <div className="animate-scroll-left flex w-max gap-8 pr-8">
            {slidingPromos.map((promo, index) => (
              <PromoCard
                key={`${promo.title}-${index}`}
                image={promo.image}
                title={promo.title}
                eyebrow={promo.eyebrow}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
