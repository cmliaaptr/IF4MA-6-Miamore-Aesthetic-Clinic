// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";

// Metadata untuk title browser
export const metadata: Metadata = {
  title: "Miamore Aesthetic Clinic",
  description: "Admin dashboard for Miamore Aesthetic Clinic",
};

// Root layout wajib ada di App Router
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}