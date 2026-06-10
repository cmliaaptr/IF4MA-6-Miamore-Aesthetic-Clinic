export type DoctorSchedule = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  capacityPerHour: number;
};

export default function DoctorScheduleTable({
  data,
}: {
  data: DoctorSchedule[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-center">
        <thead>
          <tr className="border-b border-neutral-200 text-xl font-semibold">
            <th className="w-[70px] border-r border-neutral-200 px-4 py-4">
              No.
            </th>
            <th className="border-r border-neutral-200 px-4 py-4">Hari</th>
            <th className="border-r border-neutral-200 px-4 py-4">
              Jam Mulai
            </th>
            <th className="border-r border-neutral-200 px-4 py-4">Jam Selesai</th>
            <th className="px-4 py-4">Kapasitas per Jam</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="text-sm text-neutral-800">
              <td className="border-r border-neutral-200 px-4 py-2.5">
                {item.id}
              </td>
              <td className="border-r border-neutral-200 px-4 py-2.5">
                {item.day}
              </td>
              <td className="border-r border-neutral-200 px-4 py-2.5">
                {item.startTime}
              </td>
              <td className="border-r border-neutral-200 px-4 py-2.5">{item.endTime}</td>
              <td className="px-4 py-2.5">{item.capacityPerHour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
