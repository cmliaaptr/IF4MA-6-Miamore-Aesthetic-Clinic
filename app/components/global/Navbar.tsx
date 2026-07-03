"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Menu, Settings, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchUserTreatments,
  type UserTreatment,
} from "../treatments/treatmentData";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [treatmentMenus, setTreatmentMenus] = useState<UserTreatment[]>([]);
  const logoHref = isCustomerLoggedIn ? "/customer" : "/";

  useEffect(() => {
    const checkLoginState = () => {
      try {
        const rawUser = localStorage.getItem("user");
        const user = rawUser ? JSON.parse(rawUser) : null;

        setIsCustomerLoggedIn(Boolean(user && user.role === "pelanggan"));
      } catch {
        setIsCustomerLoggedIn(false);
      }
    };

    checkLoginState();
    window.addEventListener("storage", checkLoginState);

    return () => window.removeEventListener("storage", checkLoginState);
  }, []);

  useEffect(() => {
    async function loadTreatmentMenus() {
      try {
        setTreatmentMenus(await fetchUserTreatments());
      } catch {
        setTreatmentMenus([]);
      }
    }

    void Promise.resolve().then(loadTreatmentMenus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    document.cookie = "role=; path=/; max-age=0";
    setIsCustomerLoggedIn(false);
    setOpenProfileMenu(false);
    setOpenMobile(false);
    window.location.href = "/login";
  };

  return (
    <header className="fixed left-0 top-0 z-[9999] w-full px-4 py-3 pointer-events-none">
      <nav className="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/30 bg-white/35 px-4 shadow-lg backdrop-blur-xl md:h-16 md:px-6">
        <Link
          href={logoHref}
          onClick={() => {
            setOpenDropdown(false);
            setOpenProfileMenu(false);
            setOpenMobile(false);
          }}
          className="flex items-center"
        >
          <Image
            src="/logo.png"
            alt="Logo Miamore"
            width={120}
            height={135}
            className="h-12 w-auto object-contain md:h-14"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-7 text-base font-semibold text-neutral-900 md:flex">
          <li className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown((prev) => !prev)}
              className="flex items-center gap-1.5 transition hover:text-yellow-700"
            >
              Treatments
              <ChevronDown size={17} />
            </button>

            {openDropdown && (
              <div className="absolute left-0 top-9 z-[10000] w-56 rounded-2xl border border-white/30 bg-white/95 p-3 text-sm shadow-xl backdrop-blur-xl">
                {treatmentMenus.length === 0 ? (
                  <p className="px-4 py-2 text-neutral-500">
                    Belum ada treatment
                  </p>
                ) : null}

                {treatmentMenus.map((item) => (
                  <Link
                    key={item.id}
                    href={`/treatment?category=${encodeURIComponent(
                      item.type
                    )}`}
                    onClick={() => setOpenDropdown(false)}
                    className="block rounded-xl px-4 py-2 text-neutral-800 hover:bg-yellow-100"
                  >
                    {item.title}
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

          {isCustomerLoggedIn ? (
            <li>
              <Link href="/riwayat">Riwayat</Link>
            </li>
          ) : null}
        </ul>

        <button
          type="button"
          onClick={() => setOpenMobile((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 md:hidden"
        >
          {openMobile ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="relative hidden md:block">
          {isCustomerLoggedIn ? (
            <button
              type="button"
              onClick={() => setOpenProfileMenu((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/80 text-neutral-800 shadow-inner ring-1 ring-white/50 transition hover:bg-white"
              aria-label="Buka menu profile"
            >
              <User size={22} />
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[#d4af37] px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#c49b24]"
            >
              Login
            </Link>
          )}

          {isCustomerLoggedIn && openProfileMenu && (
            <div className="absolute right-0 top-12 z-[10000] w-48 rounded-2xl border border-white/30 bg-white/95 p-2 text-sm font-semibold text-neutral-800 shadow-xl backdrop-blur-xl">
              <Link
                href="/customer/profile"
                onClick={() => setOpenProfileMenu(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-yellow-100"
              >
                <User size={17} />
                Profile Saya
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-red-600 hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {openMobile && (
        <div className="pointer-events-auto mx-auto mt-3 max-w-5xl rounded-3xl border border-white/30 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden">
          <div className="space-y-2 text-base font-semibold text-neutral-800">
            <p className="font-semibold text-yellow-700">Treatments</p>

            {treatmentMenus.length === 0 ? (
              <p className="rounded-xl px-3 py-2 text-neutral-500">
                Belum ada treatment
              </p>
            ) : null}

            {treatmentMenus.map((item) => (
              <Link
                key={item.id}
                href={`/treatment?category=${encodeURIComponent(item.type)}`}
                onClick={() => setOpenMobile(false)}
                className="block rounded-xl px-3 py-2 hover:bg-yellow-100"
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="/promo"
              onClick={() => setOpenMobile(false)}
              className="block rounded-xl px-3 py-2"
            >
              Promo
            </Link>

            <Link
              href="/profile"
              onClick={() => setOpenMobile(false)}
              className="block rounded-xl px-3 py-2"
            >
              Profile
            </Link>

            {isCustomerLoggedIn && (
              <>
                <Link
                  href="/customer/profile"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                >
                  <User size={17} />
                  Profile Saya
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                >
                  <Settings size={17} />
                  Settings
                </Link>
              </>
            )}

            {isCustomerLoggedIn ? (
              <Link
                href="/riwayat"
                onClick={() => setOpenMobile(false)}
                className="block rounded-xl px-3 py-2"
              >
                Riwayat
              </Link>
            ) : null}

            {isCustomerLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpenMobile(false)}
                className="block rounded-xl bg-[#d4af37] px-3 py-2 text-center font-bold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
