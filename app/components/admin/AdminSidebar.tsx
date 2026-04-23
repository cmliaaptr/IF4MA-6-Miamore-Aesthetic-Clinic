"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  CalendarDays,
  BookOpen,
  FileText,
  LogOut,
} from "lucide-react";
import LogoutConfirmModal from "./LogoutConfirmModal";

// Menu sidebar dibuat array supaya gampang ditambah nanti
const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Treatment", href: "/admin/treatment", icon: Stethoscope },
  { label: "Pelanggan", href: "/admin/pelanggan", icon: Users },
  { label: "Jadwal Dokter", href: "/admin/jadwal-dokter", icon: CalendarDays },
  { label: "Booking", href: "/admin/booking", icon: BookOpen },
  { label: "Laporan", href: "/admin/laporan", icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleConfirmLogout = () => {
    setIsLogoutOpen(false);

    // Nanti kalau sudah ada auth, ganti logic logout di sini
    window.location.href = "/login";
  };

  return (
    <>
      <aside className="sidebar">
        {/* Brand / logo area */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Image
              src="/logo.png"
              alt="Miamore Logo"
              width={40}
              height={40}
              className="sidebar-logo-image"
            />
          </div>
          <div>
            <h2>Miamore Aesthetic Clinic</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon size={18} className="sidebar-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout di bagian bawah */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-link logout-item"
            onClick={() => setIsLogoutOpen(true)}
          >
            <LogOut size={18} className="sidebar-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <LogoutConfirmModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}