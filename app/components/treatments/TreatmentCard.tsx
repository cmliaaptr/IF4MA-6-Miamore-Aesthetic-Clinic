import Image from "next/image";

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
  return (
    <div className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="relative w-full h-[150px] sm:h-[170px]">
        <Image
          src={image}
          alt={title}
          fill
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
            onClick={onBooking}
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
