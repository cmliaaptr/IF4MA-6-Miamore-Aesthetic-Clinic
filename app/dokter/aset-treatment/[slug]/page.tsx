import { notFound } from "next/navigation";
import TreatmentAssetDetail from "../../../components/dokter/aset-treatment/TreatmentAssetDetail";
import { treatmentAssets } from "../../../components/dokter/aset-treatment/treatmentAssets";
import {
  fetchTreatmentAssetItems,
  mapApiTreatmentToDoctorAsset,
} from "../../../components/dokter/aset-treatment/treatmentAssetApi";

type DokterAsetTreatmentDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DokterAsetTreatmentDetailPage({
  params,
}: DokterAsetTreatmentDetailPageProps) {
  const { slug } = await params;
  let asset = treatmentAssets.find((item) => item.slug === slug);

  try {
    const items = await fetchTreatmentAssetItems();
    asset =
      items
        .filter((item) => item.status !== "Nonaktif")
        .map(mapApiTreatmentToDoctorAsset)
        .find((item) => item.slug === slug) ?? asset;
  } catch {
    asset = treatmentAssets.find((item) => item.slug === slug);
  }

  if (!asset) {
    notFound();
  }

  return <TreatmentAssetDetail asset={asset} />;
}
