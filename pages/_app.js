// pages/_app.js

import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'; // Global styles for your app
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
