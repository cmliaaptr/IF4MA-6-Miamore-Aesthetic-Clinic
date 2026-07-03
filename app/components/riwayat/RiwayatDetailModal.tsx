import { X } from "lucide-react";
import RiwayatStatusBadge from "./RiwayatStatusBadge";
import type { RiwayatItem } from "./RiwayatTypes";

type RiwayatDetailModalProps = {
  item: RiwayatItem | null;
  onClose: () => void;
};

export default function RiwayatDetailModal({
  item,
  onClose,
}: RiwayatDetailModalProps) {
  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#d4af37]">
              Detail Booking
            </p>
            <h2 className="mt-1 text-2xl font-bold text-black">
              {item.treatment}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-black hover:bg-gray-200"
            aria-label="Tutup detail riwayat"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-3">
          <RiwayatStatusBadge status={item.status} />
          <span className="text-sm font-medium text-gray-600">
            {item.schedule}
          </span>
        </div>

        <dl className="grid gap-3 rounded-xl bg-gray-50 p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-bold text-black">Treatment</dt>
            <dd className="text-gray-700">{item.treatment}</dd>
          </div>
          <div>
            <dt className="font-bold text-black">Dokter / Terapis</dt>
            <dd className="text-gray-700">{item.doctor}</dd>
          </div>
          <div>
            <dt className="font-bold text-black">Ruangan</dt>
            <dd className="text-gray-700">{item.room}</dd>
          </div>
          <div>
            <dt className="font-bold text-black">Pembayaran</dt>
            <dd className="text-gray-700">{item.payment}</dd>
          </div>
          {item.treatmentPrice ? (
            <div>
              <dt className="font-bold text-black">Harga Treatment</dt>
              <dd className="text-gray-700">{item.treatmentPrice}</dd>
            </div>
          ) : null}
          {item.treatmentDuration ? (
            <div>
              <dt className="font-bold text-black">Durasi</dt>
              <dd className="text-gray-700">{item.treatmentDuration}</dd>
            </div>
          ) : null}
        </dl>

        {item.treatmentDescription ? (
          <p className="mt-4 rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-700">
            {item.treatmentDescription}
          </p>
        ) : null}

        <div className="mt-5">
          <h3 className="text-lg font-bold text-black">{item.detailTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-700">
            {item.detailItems.map((detail) => (
              <li
                key={detail}
                className="rounded-xl border border-gray-200 px-4 py-2"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 rounded-xl bg-[#fff8df] px-4 py-3 text-sm leading-6 text-gray-700">
          {item.note}
        </p>
      </div>
    </div>
  );
}
