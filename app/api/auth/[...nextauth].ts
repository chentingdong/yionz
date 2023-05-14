import Email from "next-auth/providers/email";
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Email({
      server: process.env.MAIL_SERVER,
      from: '<no-reply@yionz.com>'
    }),
  ]
};

export default NextAuth(authOptions);
