import PromoCard from "./PromoCard";

const promoImages = [
  {
    image: "/images/why-product.jpg",
    title: "Promo Treatment Miamore 1",
  },
  {
    image: "/images/why-product.jpg",
    title: "Promo Treatment Miamore 2",
  },
  {
    image: "/images/why-product.jpg",
    title: "Promo Treatment Miamore 3",
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
