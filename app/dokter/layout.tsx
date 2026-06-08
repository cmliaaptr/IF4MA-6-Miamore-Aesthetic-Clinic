import DokterHeader from "../components/dokter/DokterHeader";
import DokterSidebar from "../components/dokter/DokterSidebar";

export default function DokterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen">
        <DokterSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DokterHeader />
          <main className="flex-1 px-6 py-8 md:px-9 lg:px-12">{children}</main>
        </div>
      </div>
    </div>
  );
}
