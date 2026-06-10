"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  CalendarCheck2,
  CalendarDays,
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
];

export default function DokterSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[272px] shrink-0 border-r border-[#efd487] bg-white md:flex md:flex-col">
      <div className="flex h-32 items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Miamore Aesthetic Clinic"
          width={112}
          height={82}
          priority
          className="h-auto w-28 object-contain"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-9 py-9">
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
              className={`flex min-h-10 items-center gap-6 border-l-2 px-2 text-[15px] font-medium transition ${
                isActive
                  ? "border-[#d6b53f] text-[#2a2a2a]"
                  : "border-transparent text-neutral-500 hover:border-[#d6b53f] hover:text-[#2a2a2a]"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={2}
                className={isActive ? "text-[#d6b53f]" : "text-neutral-500"}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-9 pb-8">
        <Link
          href="/login"
          className="flex min-h-10 items-center gap-6 px-2 text-[15px] font-medium text-neutral-500 transition hover:text-[#2a2a2a]"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
