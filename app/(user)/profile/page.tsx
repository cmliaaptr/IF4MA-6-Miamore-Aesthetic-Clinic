import Image from "next/image";

const profileHeroImage = "/images/treatment-hero.png";

export default function ProfilePage() {
  return (
    <main className="bg-[#f8f4ef] text-neutral-950">
      <section className="relative min-h-[78vh] overflow-hidden bg-neutral-950">
        <Image
          src={profileHeroImage}
          alt="Profile Miamore Aesthetic Clinic"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex min-h-[78vh] flex-col items-center justify-center px-6 pt-24 text-center text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em]">
            Miamore Aesthetic Clinic
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Keanggunan yang Abadi
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 md:text-base">
            Perawatan estetika yang menggabungkan kenyamanan, ketelitian, dan
            sentuhan profesional untuk setiap pelanggan.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f5] px-5 py-16 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <div className="mb-7 h-px w-14 bg-[#b58b4a]" />
            <p className="mb-3 text-sm font-medium text-[#9a6f37]">
              Janji Brand Kami
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-[#8a632e] md:text-4xl">
              Pengalaman perawatan yang tenang, aman, dan berkesan.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-700">
              Kami menciptakan perjalanan perawatan yang nyaman sejak pelanggan
              datang hingga treatment selesai. Setiap layanan dirancang dengan
              perhatian pada kebersihan, keramahan, dan hasil yang natural.
            </p>
          </div>

          <div className="border border-[#eadfd3] bg-white p-8 shadow-sm">
            <p className="text-sm leading-8 text-neutral-700">
              Kami mengutamakan proses treatment yang jelas, pilihan layanan yang
              relevan, dan konsultasi yang membantu pelanggan memahami kebutuhan
              kulitnya. Miamore hadir untuk membuat perawatan kecantikan terasa
              lebih personal, elegan, dan mudah dipercaya.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#9a6f37]">
              Visi Kami
            </p>
            <h2 className="text-2xl font-semibold text-neutral-950">
              Menjadi standar emas perawatan estetik di Asia Tenggara.
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-700">
              Miamore berkomitmen menghadirkan ruang perawatan yang nyaman,
              profesional, dan berorientasi pada kebutuhan kulit setiap
              pelanggan.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#9a6f37]">
              Misi Kami
            </p>
            <div className="space-y-6">
              {[
                "Memberikan layanan treatment yang aman, higienis, dan konsisten.",
                "Menghadirkan pengalaman klinik yang ramah, elegan, dan mudah diakses.",
                "Membantu pelanggan merawat kepercayaan diri melalui hasil yang natural.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[44px_1fr] gap-4 border-b border-neutral-200 pb-5 last:border-b-0"
                >
                  <span className="text-sm font-semibold text-[#b58b4a]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
