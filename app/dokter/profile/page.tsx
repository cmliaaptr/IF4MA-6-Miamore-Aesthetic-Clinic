import StaffProfilePage from "@/app/components/profile/StaffProfilePage";

export default function DokterProfilePage() {
  const name = "dr. Andi Pratama";

  return (
    <StaffProfilePage
      title="Profile Dokter"
      breadcrumbRoot="Dashboard"
      name={name}
      role="Dokter"
      initials="AP"
      summary="Dokter treatment Miamore Aesthetic Clinic yang berdedikasi memberikan pelayanan konsultasi dan perawatan terbaik untuk setiap pasien."
      phone="+62 813 4567 8901"
      email="andi.pratama@miamoreclinic.com"
      address="Jl. Sudirman No. 123, Bandung, Jawa Barat, 40111"
    />
  );
}
