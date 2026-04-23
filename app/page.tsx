// app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Selamat datang di Miamore Admin</h1>
      <p>Masuk ke dashboard admin lewat link di bawah ini:</p>

      <Link href="/admin">Ke halaman Admin</Link>
    </main>
  );
}