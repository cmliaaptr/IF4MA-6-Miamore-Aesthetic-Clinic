export type PatientStatus = "Konfirmasi" | "Tertunda" | "Booking";

export type PatientSchedule = {
  id: number;
  name: string;
  treatment: string;
  status: PatientStatus;
};

const statusClasses: Record<PatientStatus, string> = {
  Konfirmasi: "bg-emerald-100 text-emerald-700",
  Tertunda: "bg-red-100 text-red-600",
  Booking: "bg-slate-200 text-slate-600",
};

export default function PatientTable({ data }: { data: PatientSchedule[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-center">
        <thead>
          <tr className="border-b border-neutral-200 text-xl font-semibold">
            <th className="w-[70px] border-r border-neutral-200 px-4 py-4">
              No.
            </th>
            <th className="border-r border-neutral-200 px-4 py-4">
              Nama Lengkap
            </th>
            <th className="border-r border-neutral-200 px-4 py-4">
              Treatment
            </th>
            <th className="w-[260px] px-4 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-sm font-semibold text-neutral-500">
                Belum ada booking pasien dari customer.
              </td>
            </tr>
          ) : null}

          {data.map((item, index) => (
            <tr key={item.id} className="text-sm text-neutral-800">
              <td className="border-r border-neutral-200 px-4 py-2.5">
                {index + 1}
              </td>
              <td className="border-r border-neutral-200 px-4 py-2.5">
                {item.name}
              </td>
              <td className="border-r border-neutral-200 px-4 py-2.5">
                {item.treatment}
              </td>
              <td className="px-4 py-2.5">
                <span
                  className={`inline-flex min-w-24 justify-center rounded-full px-3 py-1 text-sm font-medium leading-none ${statusClasses[item.status]}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
