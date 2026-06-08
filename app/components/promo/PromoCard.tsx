import Image from "next/image";

type PromoCardProps = {
  image: string;
  title: string;
};

export default function PromoCard({ image, title }: PromoCardProps) {
  return (
    <article className="relative h-[210px] w-[320px] shrink-0 overflow-hidden rounded-[28px] bg-gray-200 sm:h-[250px] sm:w-[460px] md:h-[280px] md:w-[560px]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, 560px"
        className="object-cover"
      />
    </article>
  );
}
