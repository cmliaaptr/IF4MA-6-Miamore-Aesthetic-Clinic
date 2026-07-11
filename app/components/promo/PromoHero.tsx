import Image from "next/image";

export default function PromoHero() {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden px-6 pt-24 text-center sm:min-h-[420px] md:min-h-[520px]">
      <Image
        src="/images/treatment-hero.png"
        alt=""
        fill
        sizes="100vw"
        className="scale-110 object-cover object-center blur-2xl"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/30" />
      <Image
        src="/images/treatment-hero.png"
        alt="Promo rangkaian skincare Miamore Beauty"
        fill
        sizes="100vw"
        className="relative object-contain"
        preload
      />
    </section>
  );
}
