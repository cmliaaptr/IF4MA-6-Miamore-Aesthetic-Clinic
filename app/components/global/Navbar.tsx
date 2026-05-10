"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const treatmentMenus = [
  { name: "Acne Treatment", category: "Acne" },
  { name: "Flek Treatment", category: "Flek" },
  { name: "Glowing Treatment", category: "Glowing" },
  { name: "Anti Aging", category: "Anti Aging" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-3">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between rounded-full border border-white/30 bg-white/25 px-5 shadow-lg backdrop-blur-xl md:h-24 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo Miamore"
            width={150}
            height={150}
            className="h-14 w-auto object-contain md:h-16"
          />
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
          <li className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-1 hover:text-yellow-700"
            >
              Treatments
              <ChevronDown size={16} />
            </button>

            {openDropdown && (
              <div className="absolute left-0 top-8 w-56 rounded-2xl border border-white/30 bg-white/80 p-3 shadow-xl backdrop-blur-xl">
                {treatmentMenus.map((item) => (
                  <Link
                    key={item.name}
                    href={`/treatment?category=${item.category}`}
                    className="block rounded-xl px-4 py-2 text-neutral-800 hover:bg-yellow-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link href="/promo">Promo</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/riwayat">Riwayat</Link>
          </li>
        </ul>

        <button
          onClick={() => setOpenMobile(!openMobile)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 md:hidden"
        >
          {openMobile ? <X size={18} /> : <Menu size={18} />}
        </button>

        <Link
          href="/profile"
          className="hidden h-9 w-9 rounded-full bg-white/60 shadow-inner md:block"
        />
      </nav>

      {openMobile && (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl md:hidden">
          <div className="space-y-3 text-sm font-medium text-neutral-800">
            <p className="font-semibold text-yellow-700">Treatments</p>

            {treatmentMenus.map((item) => (
              <Link
                key={item.name}
                href={`/treatment?category=${item.category}`}
                className="block rounded-xl px-3 py-2 hover:bg-yellow-100"
              >
                {item.name}
              </Link>
            ))}

            <Link href="/promo" className="block rounded-xl px-3 py-2">
              Promo
            </Link>
            <Link href="/profile" className="block rounded-xl px-3 py-2">
              Profile
            </Link>
            <Link href="/riwayat" className="block rounded-xl px-3 py-2">
              Riwayat
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}