export default function AdminProfilePage() {
  return (
    <section>
      <h1 className="page-title">Profile Admin</h1>

      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200 text-2xl font-bold text-neutral-700">
            A
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">Admin Miamore</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Administrator Miamore Aesthetic Clinic
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
