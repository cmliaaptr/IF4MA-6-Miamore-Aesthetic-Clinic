import { Droplets, Hand, Package, Pipette, SprayCan, Utensils } from "lucide-react";

type TreatmentMeasureVisualProps = {
  title: string;
  dosage: string;
};

export default function TreatmentMeasureVisual({
  title,
  dosage,
}: TreatmentMeasureVisualProps) {
  const normalized = `${title} ${dosage}`.toLowerCase();
  const Icon = normalized.includes("tetes")
    ? Pipette
    : normalized.includes("pump") || normalized.includes("ml")
      ? SprayCan
      : normalized.includes("gram") || normalized.includes("spatula")
        ? Utensils
        : normalized.includes("jari")
          ? Hand
          : normalized.includes("sheet") || normalized.includes("sachet")
            ? Package
            : Droplets;

  return (
    <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-violet-100 bg-white shadow-inner">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-700">
        <Icon size={25} strokeWidth={1.9} />
      </div>
    </div>
  );
}
