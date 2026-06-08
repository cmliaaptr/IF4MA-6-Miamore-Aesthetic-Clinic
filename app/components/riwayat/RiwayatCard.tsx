import RiwayatStatusBadge from "./RiwayatStatusBadge";
import type { RiwayatItem } from "./RiwayatTypes";

type RiwayatCardProps = {
  item: RiwayatItem;
  onDetail: (item: RiwayatItem) => void;
};

export default function RiwayatCard({ item, onDetail }: RiwayatCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="grid gap-5 sm:grid-cols-[150px_1fr]">
        <div className="h-[130px] w-[130px] rounded-full bg-gray-300 sm:h-[150px] sm:w-[150px]" />

        <div className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-black">
                {item.treatment}
              </h2>
              <p className="text-sm font-medium text-black">{item.schedule}</p>
            </div>

            <RiwayatStatusBadge status={item.status} />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-2xl font-bold text-black">{item.doctor}</p>

            <button
              type="button"
              onClick={() => onDetail(item)}
              className="w-fit rounded-full border border-gray-400 bg-white px-3 py-1 text-base font-bold text-[#59c957] hover:border-[#59c957]"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
