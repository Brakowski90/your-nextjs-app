// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";

// Define authOptions and export it
export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Manual Email/Password Login
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "janedoe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const user = await db.collection("allowedUsers").findOne({ email: credentials.email });

        if (!user || user.password !== credentials.password) {
          client.close();
          throw new Error("Invalid email or password");
        }

        client.close();
        return { email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
