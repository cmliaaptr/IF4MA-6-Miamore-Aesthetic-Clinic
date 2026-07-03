import { getTreatmentImageSource } from "@/app/components/treatments/treatmentImage";
import type {
  AdminTreatmentAsset,
  AdminTreatmentProduct,
} from "@/app/components/admin/aset-treatment/AdminTreatmentAssetTypes";
import type { TreatmentAsset, TreatmentAssetStep } from "./TreatmentAssetTypes";
import { treatmentAssets as fallbackTreatmentAssets } from "./treatmentAssets";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export type TreatmentAssetApiItem = {
  id_treatment_asset?: number;
  id_treatment?: number;
  nama_treatment: string;
  kategori?: string | null;
  deskripsi?: string | null;
  foto?: string | null;
  durasi?: string | null;
  status?: "Aktif" | "Nonaktif" | string | null;
  created_at?: string | null;
  updated_at?: string | null;
  steps?: TreatmentAssetStepApiItem[];
};

export type TreatmentAssetStepApiItem = {
  id_treatment_asset_step?: number;
  nama_langkah: string;
  produk: string;
  takaran: string;
  durasi?: string | null;
  cara_penggunaan?: string | null;
  urutan?: number | null;
};

type TreatmentAssetApiResponse = {
  data?: TreatmentAssetApiItem[];
};

const categoryTones = [
  "bg-violet-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-orange-400",
  "bg-sky-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-teal-500",
];

const productTypes = [
  "Cleansing",
  "Exfoliator",
  "Toner",
  "Serum",
  "Masker",
  "Moisturizer",
  "Protection",
  "Device",
];

const packageSizes = ["500 ml", "200 g", "30 ml", "100 g", "1 set", "1 sheet"];

export async function fetchTreatmentAssetItems() {
  const response = await fetch(`${API_BASE_URL}/api/treatment-assets`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data aset treatment.");
  }

  const result = (await response.json()) as TreatmentAssetApiResponse;

  return Array.isArray(result.data) ? result.data : [];
}

export function mapApiTreatmentToDoctorAsset(
  item: TreatmentAssetApiItem,
  index: number,
): TreatmentAsset {
  const name = item.nama_treatment || "Treatment";
  const fallback = findFallbackAsset(name);
  const category = item.kategori || fallback?.category || "Treatment";
  const apiSteps = mapApiStepsToDoctorSteps(item.steps);

  return {
    slug: createTreatmentAssetSlug(item),
    name,
    category,
    categoryTone: fallback?.categoryTone || categoryTones[index % categoryTones.length],
    image: getTreatmentImageSource(item.foto || fallback?.image),
    description:
      item.deskripsi ||
      fallback?.description ||
      "Panduan aset dan takaran untuk treatment ini belum dilengkapi.",
    duration: item.durasi || fallback?.duration || "-",
    steps: apiSteps.length > 0 ? apiSteps : fallback?.steps ?? [],
  };
}

export function mapApiTreatmentToAdminAsset(
  item: TreatmentAssetApiItem,
  index: number,
): AdminTreatmentAsset {
  const doctorAsset = mapApiTreatmentToDoctorAsset(item, index);
  const id = getTreatmentAssetId(item);
  const products = mapStepsToProducts(doctorAsset.steps, id);

  return {
    id,
    slug: doctorAsset.slug,
    name: doctorAsset.name,
    category: doctorAsset.category,
    image: doctorAsset.image,
    description: doctorAsset.description,
    duration: doctorAsset.duration,
    status: item.status === "Nonaktif" ? "Nonaktif" : "Aktif",
    createdAt: formatDateTime(item.created_at),
    updatedAt: formatDateTime(item.updated_at),
    steps: doctorAsset.steps.map((step, stepIndex) => ({
      id: getStepId(item.steps?.[stepIndex]) || id * 100 + stepIndex + 1,
      name: step.title,
      product: step.product,
      dosage: step.dosage,
      duration: item.steps?.[stepIndex]?.durasi || getStepDuration(stepIndex),
      usage: step.usage,
    })),
    products,
    homeCare: products.slice(0, 3).map((product) => product.name),
  };
}

export function createTreatmentAssetPayload(data: {
  name: string;
  category: string;
  duration: string;
  image: string;
  description: string;
  status: "Aktif" | "Nonaktif";
}) {
  return {
    nama_treatment: data.name,
    kategori: data.category,
    durasi: data.duration,
    foto: data.image,
    deskripsi: data.description,
    status: data.status,
  };
}

export function createTreatmentAssetSlug(item: TreatmentAssetApiItem) {
  return `${slugify(item.nama_treatment)}-${getTreatmentAssetId(item)}`;
}

export function getTreatmentAssetId(item?: TreatmentAssetApiItem | null) {
  return Number(item?.id_treatment_asset ?? item?.id_treatment ?? 0);
}

export function createTreatmentAssetStepsPayload(
  steps: Array<{
    name: string;
    product: string;
    dosage: string;
    duration: string;
    usage: string;
  }>,
) {
  return {
    steps: steps.map((step) => ({
      nama_langkah: step.name,
      produk: step.product,
      takaran: step.dosage,
      durasi: step.duration,
      cara_penggunaan: step.usage,
    })),
  };
}

function mapApiStepsToDoctorSteps(
  steps?: TreatmentAssetStepApiItem[],
): TreatmentAssetStep[] {
  if (!Array.isArray(steps)) return [];

  return [...steps]
    .sort((a, b) => Number(a.urutan || 0) - Number(b.urutan || 0))
    .map((step) => ({
      title: step.nama_langkah,
      product: step.produk,
      dosage: step.takaran,
      usage: step.cara_penggunaan || "Ikuti protokol klinik untuk langkah ini.",
    }));
}

function getStepId(step?: TreatmentAssetStepApiItem) {
  return Number(step?.id_treatment_asset_step ?? 0);
}

function findFallbackAsset(name: string) {
  const normalizedName = normalizeName(name);

  return fallbackTreatmentAssets.find(
    (asset) => normalizeName(asset.name) === normalizedName,
  );
}

function mapStepsToProducts(
  steps: TreatmentAssetStep[],
  treatmentId: number,
): AdminTreatmentProduct[] {
  return steps.map((step, stepIndex) => ({
    id: treatmentId * 100 + stepIndex + 1,
    name: step.product,
    type: productTypes[stepIndex % productTypes.length],
    packageSize: packageSizes[stepIndex % packageSizes.length],
    stock: 5 + ((treatmentId + stepIndex) % 12),
  }));
}

function getStepDuration(stepIndex: number) {
  if (stepIndex === 3) return "15 Menit";
  if (stepIndex === 1) return "7 Menit";

  return "5 Menit";
}

function formatDateTime(value?: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function normalizeName(value: string) {
  return value.trim().toLowerCase();
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
