import StaffProfilePage from "@/app/components/profile/StaffProfilePage";

export default function AdminProfilePage() {
  const name = "Admin Miamore";

  return (
    <StaffProfilePage
      title="Profile Admin"
      breadcrumbRoot="Dashboard"
      name={name}
      role="Admin"
      initials="AM"
      summary="Administrator Miamore Aesthetic Clinic yang mengelola data operasional, layanan treatment, pelanggan, booking, pembayaran, dan laporan klinik."
      phone="+62 812 3456 7890"
      email="admin@miamoreclinic.com"
      address="Jl. Sudirman No. 123, Bandung, Jawa Barat, 40111"
    />
  );
}
