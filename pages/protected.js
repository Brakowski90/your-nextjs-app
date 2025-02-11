// pages/protected.js
import { getSession } from 'next-auth/react';

export default function ProtectedPage({ session }) {
  if (!session) {
    return <div>You must be signed in to view this page</div>;
  }

  return <div>Protected content</div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect to home page if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
