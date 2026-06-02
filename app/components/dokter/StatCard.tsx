import type { LucideIcon } from "lucide-react";

type StatCardItem = {
  title: string;
  value: string;
  icon: LucideIcon;
  className: string;
};

export default function StatCard({ item }: { item: StatCardItem }) {
  const Icon = item.icon;

  return (
    <article
      className={`h-[170px] rounded-xl px-5 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.13)] ${item.className}`}
    >
      <div className="flex items-center gap-4 text-xl font-medium">
        <Icon size={22} className="text-[#4d7898]" />
        <span>{item.title}</span>
      </div>
      <p className="mt-8 text-center text-5xl font-bold leading-none">
        {item.value}
      </p>
    </article>
  );
}
