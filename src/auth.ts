// src\auth.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  secret: process.env.AUTH_SECRECT,
  trustHost: true,
  pages: {
    signIn: '#', // 로그인
    newUser: '#', // 회원가입
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/#`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        // fail
        if (!authResponse.ok) {
          return null;
        }

        // success
        const user = await authResponse.json();

        return user;
      },
    }),
  ],
});
