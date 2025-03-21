// // pages/api/auth/[...nextauth].js

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoClient } from "mongodb";

// // Define authOptions and export it
// export const authOptions = {
//   providers: [
//     // Google OAuth Provider
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     // Manual Email/Password Login
//     CredentialsProvider({
//       name: "Email and Password",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "janedoe@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const client = await MongoClient.connect(process.env.MONGODB_URI);
//         const db = client.db();
//         const user = await db.collection("allowedUsers").findOne({ email: credentials.email });

//         if (!user || user.password !== credentials.password) {
//           client.close();
//           throw new Error("Invalid email or password");
//         }

//         client.close();
//         return { email: user.email, name: user.name, role: user.role };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);

// pages/api/auth/[...nextauth].js

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoClient } from "mongodb";

// // Define authOptions and export it
// export const authOptions = {
//   providers: [
//     // Google OAuth Provider
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       async profile(profile) {
//         // Here, we ensure that the Google user exists in the 'allowedUsers' collection
//         const client = await MongoClient.connect(process.env.MONGODB_URI);
//         const db = client.db();
//         const user = await db.collection("allowedUsers").findOne({ email: profile.email });

//         client.close();

//         // If the user doesn't exist in the allowed users list, throw an error
//         if (!user) {
//           throw new Error("User not authorized");
//         }

//         // If the user exists, return their profile data
//         return {
//           id: profile.id,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           role: user.role, // Attach the role from the database
//         };
//       },
//     }),

//     // Manual Email/Password Login
//     CredentialsProvider({
//       name: "Email and Password",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "janedoe@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Connect to MongoDB to verify user credentials
//         const client = await MongoClient.connect(process.env.MONGODB_URI);
//         const db = client.db();
//         const user = await db.collection("allowedUsers").findOne({ email: credentials.email });

//         client.close();

//         if (!user || user.password !== credentials.password) {
//           throw new Error("Invalid email or password");
//         }

//         // If credentials are valid, return user info with role
//         return { email: user.email, name: user.name, role: user.role };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // Attach the role to the JWT token
//       }
//       return token;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     error: '/auth/error', // Optional: Custom error page if needed
//   },
// };

// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        // Simply return the profile data from Google without checking MongoDB
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role || "user"; // Default role to "user"
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user"; // Default role to "user"
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/auth/error', // Optional: Custom error page if needed
  },
};

export default NextAuth(authOptions);
