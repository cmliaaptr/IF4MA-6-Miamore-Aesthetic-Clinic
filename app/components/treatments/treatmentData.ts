"use client";

export type TreatmentApiItem = {
  id_treatment: number;
  nama_treatment: string;
  deskripsi: string | null;
  foto: string | null;
  harga: string;
  diskon: string;
  durasi: string;
};

export type UserTreatment = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  price: string;
  type: string;
};

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export const fallbackTreatments: UserTreatment[] = [
  {
    id: 1,
    image: "/images/treatment.jpg",
    title: "Basmi Flek Coba-Coba",
    description: "Membasmi flek secara tuntas dan bersih glowing.",
    category: "1x / Bulan",
    price: "Rp 500.000",
    type: "Flek",
  },
  {
    id: 2,
    image: "/images/treatment.jpg",
    title: "Acne Treatment",
    description: "Perawatan kulit berjerawat.",
    category: "1x / Bulan",
    price: "Rp 450.000",
    type: "Acne",
  },
  {
    id: 3,
    image: "/images/treatment.jpg",
    title: "Glowing Treatment",
    description: "Kulit tampak lebih cerah.",
    category: "1x / Bulan",
    price: "Rp 600.000",
    type: "Glowing",
  },
];

export function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

export function mapTreatmentItem(item: TreatmentApiItem): UserTreatment {
  return {
    id: item.id_treatment,
    image: item.foto || "/images/treatment.jpg",
    title: item.nama_treatment,
    description: item.deskripsi || "Treatment Miamore Aesthetic Clinic.",
    category: item.durasi || "-",
    price: formatRupiah(item.harga),
    type: inferTreatmentType(item.nama_treatment),
  };
}

export async function fetchUserTreatments() {
  const response = await fetch(`${API_BASE_URL}/api/treatments`, {
    headers: {
      Accept: "application/json",
    },
  });
  const text = await response.text();
  const result = text ? parseApiText(text) : null;

  if (!response.ok) {
    throw new Error(result?.message || "Gagal mengambil data treatment.");
  }

  const treatments = Array.isArray(result?.data)
    ? (result.data as TreatmentApiItem[]).map(mapTreatmentItem)
    : [];

  return treatments.length > 0 ? treatments : fallbackTreatments;
}

export function createTreatmentCategories(treatments: UserTreatment[]) {
  const categories = treatments.map((treatment) => treatment.type).filter(Boolean);

  return ["Semua Treatment", ...Array.from(new Set(categories))];
}

function inferTreatmentType(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("acne") || normalizedName.includes("jerawat")) {
    return "Acne";
  }

  if (normalizedName.includes("flek") || normalizedName.includes("spot")) {
    return "Flek";
  }

  if (
    normalizedName.includes("glow") ||
    normalizedName.includes("bright") ||
    normalizedName.includes("cerah")
  ) {
    return "Glowing";
  }

  if (normalizedName.includes("aging") || normalizedName.includes("botox")) {
    return "Anti Aging";
  }

  return "Lainnya";
}

function formatRupiah(price: string) {
  const numericPrice = Number.parseFloat(String(price));

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return price || "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}
