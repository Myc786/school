import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Add more providers as needed
  ],
  // Add additional configuration like callbacks, pages, etc. if required
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
