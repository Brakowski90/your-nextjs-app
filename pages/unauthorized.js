//pages/unauthorized.js

import { useSession } from "next-auth/react";
import Link from "next/link";

const Unauthorized = () => {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Access Denied</h1>
      <p>
        You are not authorized to access this application. Please contact
        the administrator if you believe this is an error.
      </p>
      {/* Optional: A link to go back to home */}
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default Unauthorized;
