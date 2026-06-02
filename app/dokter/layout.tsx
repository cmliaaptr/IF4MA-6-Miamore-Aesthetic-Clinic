import DokterHeader from "../components/dokter/DokterHeader";
import DokterSidebar from "../components/dokter/DokterSidebar";

export default function DokterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      <DokterHeader />
      <div className="flex min-h-[calc(100vh-128px)]">
        <DokterSidebar />
        <main className="flex-1 px-6 py-8 md:px-9 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
