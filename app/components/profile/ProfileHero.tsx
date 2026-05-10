export default function ProfileHero() {
  return (
    <section
      className="
        h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px]
        flex items-center justify-center
        bg-cover bg-center
      "
      style={{
        backgroundImage: "url('/images/profile-hero.jpg')",
      }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black/40 px-4">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-center">
          Gambar Miamore
        </h1>
      </div>
    </section>
  );
}