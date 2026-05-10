import Image from "next/image";

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
        <p>Kontak Kami</p>
      </div>

      <div className="mx-auto mb-6 max-w-xl border-t border-gray-200 pt-4">
        <p>Social Media</p>
      </div>

      <p className="text-xs text-gray-500">
        2026 Miamore. All rights reserved.
      </p>
    </footer>
  );
}