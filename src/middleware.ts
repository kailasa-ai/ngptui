import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && !nextUrl.pathname.includes("signin")) {
    return Response.redirect(new URL(`/signin`, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|signin|trpc|_next/static|_next/image|favicon.ico).*)"],
};
