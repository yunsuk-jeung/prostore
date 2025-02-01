import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db/prisma';
import CredentialProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;
        // find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // if user does not exist or password does not match return null
        return null;
      },
    }),
  ],
  callbacks: {
    // async session({ session, token, user }: any) {
    async session({ session, user, trigger, token }: any) {
      // set the user ID from the token
      session.user.id = token.sub;
      // If there is an update, set the user name
      if (trigger == 'update') {
        session.user.name = user.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
