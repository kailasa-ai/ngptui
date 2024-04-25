import NextAuth from "next-auth";

import { authConfig } from "./auth.config";

export const { signIn, signOut, handlers, auth } = NextAuth((_) => {
  return {
    ...authConfig,
  };
});
