import Image from "next/image";

export default function DokterHeader() {
  return (
    <header className="flex h-32 items-center justify-between border-b border-[#efd487] bg-white px-8 shadow-[0_2px_8px_rgba(212,177,72,0.18)] md:px-16 lg:px-24">
      <Image
        src="/images/logo.png"
        alt="Miamore Aesthetic Clinic"
        width={96}
        height={70}
        priority
        className="h-auto w-20 object-contain md:w-24"
      />

      <div className="flex flex-col items-center gap-2">
        <div className="h-14 w-14 rounded-full bg-neutral-300" />
        <span className="text-lg font-semibold leading-none">Putri</span>
      </div>
    </header>
  );
}
