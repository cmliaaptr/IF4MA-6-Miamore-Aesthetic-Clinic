import Image from "next/image";

type TreatmentCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function TreatmentCard({
  title,
  description,
  image,
}: TreatmentCardProps) {
  return (
    <div className="min-w-240px overflow-hidden rounded-2xl bg-white shadow-xl sm:min-w-280px md:min-w-300px">
      <Image
        src={image}
        alt={title}
        width={420}
        height={260}
        className="h-40 w-full object-cover sm:h-44"
      />

      <div className="p-4">
        <h3 className="mb-1 font-semibold">{title}</h3>

        <p className="mb-6 text-xs text-gray-600">
          {description}
        </p>

        <button className="rounded-md bg-green-400 px-4 py-2 text-xs font-semibold text-white hover:bg-green-500">
          Booking Sekarang
        </button>
      </div>
    </div>
  );
}