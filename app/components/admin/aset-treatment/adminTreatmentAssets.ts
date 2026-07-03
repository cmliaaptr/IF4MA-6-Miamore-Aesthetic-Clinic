import { treatmentAssets } from "../../dokter/aset-treatment/treatmentAssets";
import type {
  AdminTreatmentAsset,
  AdminTreatmentProduct,
} from "./AdminTreatmentAssetTypes";

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

export const adminTreatmentAssets: AdminTreatmentAsset[] = treatmentAssets.map(
  (asset, assetIndex) => {
    const products = asset.steps.map<AdminTreatmentProduct>((step, stepIndex) => ({
      id: assetIndex * 100 + stepIndex + 1,
      name: step.product,
      type: productTypes[stepIndex % productTypes.length],
      packageSize: packageSizes[stepIndex % packageSizes.length],
      stock: 5 + ((assetIndex + stepIndex) % 12),
    }));

    return {
      id: assetIndex + 1,
      slug: asset.slug,
      name: asset.name,
      category: asset.category,
      image: asset.image,
      description: asset.description,
      duration: asset.duration,
      status: assetIndex === 7 ? "Nonaktif" : "Aktif",
      createdAt: "20 Mei 2024, 10:30",
      updatedAt: "26 Mei 2024, 14:45",
      steps: asset.steps.map((step, stepIndex) => ({
        id: assetIndex * 100 + stepIndex + 1,
        name: step.title,
        product: step.product,
        dosage: step.dosage,
        duration: stepIndex === 3 ? "15 Menit" : stepIndex === 1 ? "7 Menit" : "5 Menit",
        usage: step.usage,
      })),
      products,
      homeCare: products.slice(0, 3).map((product) => product.name),
    };
  },
);

export const adminTreatmentCategories = [
  "Semua Kategori",
  ...Array.from(new Set(adminTreatmentAssets.map((asset) => asset.category))),
];
