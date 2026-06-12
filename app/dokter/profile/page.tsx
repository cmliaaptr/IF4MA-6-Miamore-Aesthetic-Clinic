export default function DokterProfilePage() {
  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold tracking-normal md:text-[42px]">
        Profile Dokter
      </h1>

      <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-700">
            D
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">Dokter Miamore</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Dokter Treatment Miamore Aesthetic Clinic
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
