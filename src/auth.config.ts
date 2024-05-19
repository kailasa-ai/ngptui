import type { NextAuthConfig } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { cookies } from "next/headers";

export const authConfig = {
  providers: [Keycloak],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, ...rest }) {
      return { ...token, ...user };
    },
    async session({ session, token, ...rest }) {
      return { ...session, user: token };
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
