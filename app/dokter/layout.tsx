import DokterHeader from "../components/dokter/DokterHeader";
import DokterSidebar from "../components/dokter/DokterSidebar";

export default function DokterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-black">
      <DokterSidebar />
      <div className="min-h-screen md:ml-[250px] md:w-[calc(100%_-_250px)]">
        <DokterHeader />
        <main className="flex-1 overflow-x-hidden px-6 py-[30px] md:px-[30px]">
          {children}
        </main>
      </div>
    </div>
  );
}
