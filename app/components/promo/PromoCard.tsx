import Image from "next/image";

type PromoCardProps = {
  image: string;
  title: string;
  eyebrow: string;
};

export default function PromoCard({ image, title, eyebrow }: PromoCardProps) {
  return (
    <article className="group relative h-[210px] w-[320px] shrink-0 overflow-hidden rounded-[28px] bg-gray-200 sm:h-[250px] sm:w-[460px] md:h-[280px] md:w-[560px]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, 560px"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full bg-[#d6b53f] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white sm:left-7 sm:top-7">
        PROMO TERBATAS
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          {eyebrow}
        </p>
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
          <span className="shrink-0 border-b border-white/70 pb-1 text-xs font-semibold">
            Booking
          </span>
        </div>
      </div>
    </article>
  );
}
