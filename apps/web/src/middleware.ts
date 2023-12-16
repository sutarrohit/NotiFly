import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const AuthToken = request.cookies.get("AuthToken")?.value || "";

  const publicPath =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/forgotPassword") ||
    request.nextUrl.pathname.startsWith("/getCookies");
  request.nextUrl.pathname.startsWith("/resetPassword") || request.nextUrl.pathname.startsWith("/verifyUser");
  if (publicPath && AuthToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const privatePath =
    request.nextUrl.pathname.startsWith("/setNotification") ||
    request.nextUrl.pathname.startsWith("/myNotification");
  // request.nextUrl.pathname.startsWith("/getCookies");
  if (!AuthToken && privatePath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgotPassword",
    "/getCookies",
    "/verifyUser/:path*",
    "/resetPassword/:path*",
    "/setNotification/:path*",
    "/myNotification/:path*",
  ],
};
