import type { RiwayatStatus } from "./RiwayatTypes";

type RiwayatStatusBadgeProps = {
  status: RiwayatStatus;
};

const statusStyles: Record<RiwayatStatus, string> = {
  "Akan Datang": "border-[#d1a63c] bg-[#f5d36b] text-black",
  Selesai: "border-[#49af3f] bg-[#65cf5d] text-black",
  Dibatalkan: "border-[#d05b5b] bg-[#ef7777] text-black",
};

export default function RiwayatStatusBadge({
  status,
}: RiwayatStatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-w-[112px] justify-center rounded-full border px-4 py-1 text-sm font-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
