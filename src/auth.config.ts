import type { NextAuthConfig } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const authConfig = {
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, ...rest }) {
      return { ...token, ...user };
    },
    async session({ session, token, ...rest }) {
      return { ...session, user: token };
    },
  },
  providers: [Keycloak],
  trustHost: true,
  pages: {
    signIn: "signIn",
  },
} satisfies NextAuthConfig;
