import Image from "next/image";
import { MessageCircle } from "lucide-react";

const whatsappHref = "https://wa.me/6281234567890";
const instagramHref = "https://www.instagram.com/miamoreclinic";

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-10 text-center text-sm">
      <Image
        src="/images/logo.png"
        alt="Miamore Logo"
        width={90}
        height={90}
        className="mx-auto mb-4"
      />

      <p className="mb-4 text-xs text-gray-600">AESTHETIC CLINIC</p>

      <div className="mx-auto mb-4 max-w-xl border-t border-gray-200 pt-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-neutral-800 transition hover:bg-green-50 hover:text-green-600"
          aria-label="Hubungi Miamore melalui WhatsApp"
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>

      <div className="mx-auto mb-6 max-w-xl border-t border-gray-200 pt-4">
        <a
          href={instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-neutral-800 transition hover:bg-pink-50 hover:text-pink-600"
          aria-label="Kunjungi Instagram Miamore"
        >
          <InstagramIcon />
          Instagram
        </a>
      </div>

      <p className="text-xs text-gray-500">
        2026 Miamore. All rights reserved.
      </p>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-current">
      <span className="h-2 w-2 rounded-full border-2 border-current" />
    </span>
  );
}
