import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath =
    path === "/login" || "/signup" || "/forgotPassword" || "/getCookies" || "/resetPassword" || "/verifyUser";

  const AuthToken = request.cookies.get("AuthToken")?.value || "";

  if (publicPath && AuthToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!publicPath && !AuthToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgotPassword",
    "/getCookies",
    "/verifyUser/:path*",
    "/resetPassword/:path*",
  ],
};
