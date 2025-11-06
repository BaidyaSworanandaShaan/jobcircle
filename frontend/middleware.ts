// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const role = req.cookies.get("role")?.value;

  const url = req.nextUrl.clone();

  // If no refresh token, redirect to login
  if (!refreshToken) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Admin routes
  if (url.pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // User dashboard routes
  if (url.pathname.startsWith("/dashboard")) {
    if (role === "ADMIN") {
      url.pathname = "/admin/dashboard"; // redirect admin to admin dashboard
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
