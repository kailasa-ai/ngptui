import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export const ROOT = "/";
export const PUBLIC_ROUTES = ["/"];
export const DEFAULT_REDIRECT = "/protected";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  if (!isAuthenticated) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|trpc|_next/static|_next/image|favicon.ico).*)"],
};
