import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  // AMBIL ROLE DARI COOKIE
  const role =
    request.cookies.get("role");

  const pathname =
    request.nextUrl.pathname;

  // HALAMAN ADMIN
  if (
    pathname.startsWith("/admin")
  ) {

    // JIKA BUKAN ADMIN
    if (
      role?.value !== "admin"
    ) {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // HALAMAN DOKTER
  if (
    pathname.startsWith("/dokter")
  ) {

    // JIKA BUKAN DOKTER
    if (
      role?.value !== "dokter"
    ) {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();

}