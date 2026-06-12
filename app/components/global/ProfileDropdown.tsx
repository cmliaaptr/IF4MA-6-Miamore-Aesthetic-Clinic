"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

type ProfileDropdownProps = {
  name: string;
  profileHref: string;
  settingsHref?: string;
  logoutHref?: string;
};

export default function ProfileDropdown({
  name,
  profileHref,
  settingsHref = "/settings",
  logoutHref = "/login",
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 items-center gap-3 rounded-md px-2 text-left transition hover:bg-neutral-50"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-700">
          <User size={20} />
        </span>
        <span className="hidden text-sm font-semibold text-neutral-800 sm:block">
          {name}
        </span>
        <ChevronDown
          size={16}
          className={`text-neutral-500 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-44 overflow-hidden rounded-md border border-neutral-200 bg-white py-2 shadow-lg"
        >
          <Link
            href={profileHref}
            role="menuitem"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f6f1df] hover:text-[#b88a18]"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} />
            Profile
          </Link>
          <Link
            href={settingsHref}
            role="menuitem"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-[#f6f1df] hover:text-[#b88a18]"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} />
            Settings
          </Link>
          <Link
            href={logoutHref}
            role="menuitem"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            onClick={() => setIsOpen(false)}
          >
            <LogOut size={16} />
            Logout
          </Link>
        </div>
      ) : null}
    </div>
  );
}
