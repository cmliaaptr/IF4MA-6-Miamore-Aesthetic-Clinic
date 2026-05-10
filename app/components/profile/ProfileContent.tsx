export default function ProfileContent() {
  return (
    <section className="bg-white text-black px-6 sm:px-8 md:px-14 lg:px-20 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
        <div>
          <h2 className="text-xl sm:text-2xl tracking-[0.12em] md:tracking-[0.15em] mb-1">
            Brand Promise
          </h2>

          <div className="w-24 sm:w-28 h-[2px] bg-black mb-4"></div>

          <p className="max-w-md text-xs sm:text-sm tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.18em] leading-relaxed">
            Kami menunjukkan penghargaan yang nyata untuk klien dengan
            memastikan pengalaman ngeMIAMORE terasa begitu bersahabat namun
            tetap profesional. Kami menyeimbangkan inovasi dan teknologi dengan
            keamanan berstandar tinggi untuk setiap tindakan di setiap outlet
            yang kami miliki. Kami sangat menghargai waktu klien. Karena itu,
            kami berkomitmen untuk memastikan semua treatment dimulai dan
            dilakukan secara tepat waktu.
          </p>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12 md:gap-16 md:pl-12 lg:pl-20">
          <div>
            <h2 className="text-xl sm:text-2xl tracking-[0.12em] md:tracking-[0.15em] mb-1">
              Visi
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-black"></div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl tracking-[0.12em] md:tracking-[0.15em] mb-1">
              Misi
            </h2>
            <div className="w-20 sm:w-24 h-[2px] bg-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}