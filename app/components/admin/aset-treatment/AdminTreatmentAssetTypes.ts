export type AdminTreatmentStep = {
  id: number;
  name: string;
  product: string;
  dosage: string;
  duration: string;
};

export type AdminTreatmentProduct = {
  id: number;
  name: string;
  type: string;
  packageSize: string;
  stock: number;
};

export type AdminTreatmentAsset = {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  status: "Aktif" | "Nonaktif";
  createdAt: string;
  updatedAt: string;
  steps: AdminTreatmentStep[];
  products: AdminTreatmentProduct[];
  homeCare: string[];
};

export type AdminTreatmentAssetFormData = {
  name: string;
  category: string;
  duration: string;
  image: string;
  description: string;
  status: "Aktif" | "Nonaktif";
};
