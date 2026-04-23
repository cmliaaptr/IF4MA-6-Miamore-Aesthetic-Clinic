// components/admin/DashboardCard.tsx

import { DashboardStat } from "@/types/dashboard";

type DashboardCardProps = {
  item: DashboardStat;
};

export default function DashboardCard({ item }: DashboardCardProps) {
  return (
    <div className={`dashboard-card ${item.variant}`}>
      <h3>{item.title}</h3>
      <p>{item.value}</p>
    </div>
  );
}