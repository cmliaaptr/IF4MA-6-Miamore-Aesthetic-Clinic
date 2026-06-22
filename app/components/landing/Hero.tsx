"use client";

import Image from "next/image";

type HeroProps = {
  showButton?: boolean;
};

export default function Hero({ showButton = true }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#18120e] px-5 pt-24 text-white md:px-10 lg:px-20">
      <Image
        src="/images/hero-landing.jpg"
        alt="Background Miamore"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(177,38,25,0.45),transparent_40%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center">
        <div className="max-w-2xl">

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Miamore <br />
            <span className="text-yellow-500">
              Aesthetic <br className="md:hidden" />
              Clinic
            </span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/80 md:text-base">
            Menghadirkan kecantikan alami dengan teknologi modern dan pelayanan
            profesional untuk kulit sehat, glowing, dan percaya diri.
          </p>
        </div>
      </div>
    </section>
  );
}
