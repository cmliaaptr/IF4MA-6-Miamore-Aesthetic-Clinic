import Link from "next/link";

export default function TreatmentHero() {
  return (
    <section
      className="
        min-h-[320px] sm:min-h-[420px] md:min-h-[520px]
        bg-cover bg-center
        flex items-center
        px-6 sm:px-10 md:px-16 lg:px-24
      "
      style={{
        backgroundImage: "url('/images/treatment-hero.png')",
      }}
    >
      <div className="max-w-xl text-left text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Design Treatment
        </h1>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6">
          Temukan pilihan treatment terbaik untuk membantu kulit tampak lebih
          sehat, cerah, dan terawat.
        </p>

        <Link
          href="/booking"
          className="
            inline-flex items-center justify-center
            px-6 py-3 rounded-full
            bg-[#d4af37] hover:bg-[#c49d2f]
            text-white font-bold
            transition
          "
        >
          Booking Sekarang
        </Link>
      </div>
    </section>
  );
}