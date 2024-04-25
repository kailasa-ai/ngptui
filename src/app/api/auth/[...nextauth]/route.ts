// import NextAuth, { AuthOptions, Session } from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";

// export const authOptions: AuthOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
//       issuer: process.env.KEYCLOAK_ISSUER,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       return { ...token, ...user };
//     },
//     async session({ session, token }: { session: Session; token: any }) {
//       return { ...session, user: token };
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
