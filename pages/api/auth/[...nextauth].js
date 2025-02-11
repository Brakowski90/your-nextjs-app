// // pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt', // Using JWT for sessions
//   },
// };

// export default NextAuth(authOptions);

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&access_type=offline&scope=openid%20profile%20email',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log('Account:', account);
        console.log('Profile:', profile);
        token.id = profile.id;
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session data:', session);
      console.log('Token data:', token);
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
};

export default NextAuth(authOptions);
