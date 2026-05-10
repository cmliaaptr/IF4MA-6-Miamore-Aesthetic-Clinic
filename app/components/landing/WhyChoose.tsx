import Image from "next/image";

const reasons = [
  "Berpengalaman",
  "Pelayanan Ramah",
  "Teknologi Terkini",
  "Tepat Waktu",
  "Dokter Bersertifikasi",
];

export default function WhyChoose() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-20 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96 md:h-[420px]">
          <Image
            src="/images/product-set.jpg"
            alt="Produk Miamore"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="mb-8 text-center text-2xl font-semibold md:text-left md:text-3xl">
            Kenapa milih Miamore
          </h2>

          <div className="space-y-5 text-sm leading-6 text-neutral-700 md:text-base">
            {reasons.map((reason) => (
              <div key={reason}>
                <h3 className="font-semibold text-neutral-900">{reason}</h3>
                <p>
                  Kami memberikan pelayanan yang nyaman, aman, dan sesuai
                  kebutuhan kulit setiap pasien.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}