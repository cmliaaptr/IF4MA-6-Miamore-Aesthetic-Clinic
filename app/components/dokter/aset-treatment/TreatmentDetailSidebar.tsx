import {
  ClipboardCheck,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  Sun,
  ThermometerSun,
} from "lucide-react";

const importantNotes = [
  {
    icon: FlaskConical,
    text: "Takaran dapat disesuaikan dengan kondisi kulit pasien.",
  },
  {
    icon: ClipboardCheck,
    text: "Gunakan produk yang sesuai dengan protokol klinik.",
  },
  {
    icon: Sparkles,
    text: "Pastikan kebersihan alat dan tangan sebelum melakukan treatment.",
  },
];

const storageTips = [
  {
    icon: ThermometerSun,
    text: "Simpan di tempat sejuk.",
  },
  {
    icon: Sun,
    text: "Hindari sinar matahari langsung.",
  },
  {
    icon: ShieldCheck,
    text: "Tutup rapat setelah digunakan.",
  },
  {
    icon: FlaskConical,
    text: "Gunakan spatula/sendok bersih saat mengambil produk.",
  },
];

export default function TreatmentDetailSidebar() {
  return (
    <aside className="space-y-4">
      <InfoPanel title="Catatan Penting" items={importantNotes} />
      <InfoPanel title="Tips Penyimpanan Aset" items={storageTips} />
    </aside>
  );
}

function InfoPanel({
  title,
  items,
}: {
  title: string;
  items: Array<{
    icon: typeof FlaskConical;
    text: string;
  }>;
}) {
  return (
    <section className="rounded-lg border border-violet-100 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      <div className="mt-5 space-y-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.text} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700">
                <Icon size={17} />
              </span>
              <p className="text-sm leading-6 text-slate-700">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
