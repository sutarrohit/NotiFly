import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@notify/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prismaClient),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, token, isNewUser }: any) {
      console.log("user=>", user);
      console.log("account=>", account);
      console.log("profile=>:", profile);
      console.log("token=>", token);
      console.log("isNewUser=>:", isNewUser);
      return true;
    },

    // async jwt({ token, user, account, profile, isNewUser }: any) {
    //   return token;
    // },

    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
