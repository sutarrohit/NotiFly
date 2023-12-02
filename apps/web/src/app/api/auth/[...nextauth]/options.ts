import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "@notify/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prismaClient),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, session, profile }: any) {
      // await getCustomeCookies(session, user);
      return account;
    },

    async session({ session, user, token }: any) {
      const updatedSession = { user, ...session };
      return updatedSession;
    },

    async jwt({ token, user, account, profile, isNewUser }: any) {
      return token;
    },
    async redirect({ baseUrl, user, account, session }: any) {
      const url = `${baseUrl}/getCookies`;
      return url;
    },
  },

  pages: {
    signIn: "/login",
  },
};
