export type TreatmentAssetStep = {
  title: string;
  product: string;
  dosage: string;
  usage: string;
};

export type TreatmentAsset = {
  slug: string;
  name: string;
  category: string;
  categoryTone: string;
  image: string;
  description: string;
  duration: string;
  steps: TreatmentAssetStep[];
};
