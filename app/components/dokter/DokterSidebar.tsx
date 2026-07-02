"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  CalendarCheck2,
  CalendarDays,
  FlaskConical,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/dokter", icon: LayoutDashboard },
  { label: "Jadwal Dokter", href: "/dokter/jadwal", icon: CalendarDays },
  { label: "Booking / Pasien", href: "/dokter/booking", icon: BookOpenText },
  {
    label: "Hasil Treatment",
    href: "/dokter/hasil-treatment",
    icon: CalendarCheck2,
  },
  {
    label: "Aset Treatment",
    href: "/dokter/aset-treatment",
    icon: FlaskConical,
  },
];

export default function DokterSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-[1000] hidden h-screen w-[250px] shrink-0 flex-col border-r border-neutral-200 bg-white p-5 md:flex">
      <div className="mb-6 flex h-[200px] items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Miamore Aesthetic Clinic"
          width={200}
          height={120}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dokter"
              ? pathname === "/dokter"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-[15px] font-medium transition ${
                isActive
                  ? "bg-[#f6f1df] font-semibold text-[#b88a18]"
                  : "text-neutral-600 hover:bg-[#f6f1df] hover:text-[#b88a18]"
              }`}
            >
              <Icon
                size={18}
                strokeWidth={2}
                className="text-current"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-12">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-[15px] font-medium text-neutral-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
