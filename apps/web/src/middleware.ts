import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClient } from "@/lib/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { VerifyJwtDocument } from "./graphql/__generated__/graphql";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath =
    path === "/login" || "/signup" || "/forgotPassword" || "/getCookies" || "/resetPassword" || "/verifyUser";

  const AuthToken = request.cookies.get("AuthToken")?.value || "";
  // const { data } = await getClient().query({
  //   query: VerifyJwtDocument,
  // });

  console.log("AuthToken", AuthToken);
  console.log("publicPath", publicPath);
  console.log("request.nextUrl.pathname", request.nextUrl.pathname);

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
