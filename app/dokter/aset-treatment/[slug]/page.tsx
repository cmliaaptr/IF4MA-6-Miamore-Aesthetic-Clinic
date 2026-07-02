import { notFound } from "next/navigation";
import TreatmentAssetDetail from "../../../components/dokter/aset-treatment/TreatmentAssetDetail";
import { treatmentAssets } from "../../../components/dokter/aset-treatment/treatmentAssets";

type DokterAsetTreatmentDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DokterAsetTreatmentDetailPage({
  params,
}: DokterAsetTreatmentDetailPageProps) {
  const { slug } = await params;
  const asset = treatmentAssets.find((item) => item.slug === slug);

  if (!asset) {
    notFound();
  }

  return <TreatmentAssetDetail asset={asset} />;
}
