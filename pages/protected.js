//pages/protected.js

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/auth/getUserRole")  // Update the endpoint to match your actual route
        .then((res) => res.json())
        .then((data) => {
          if (data.role) {
            setRole(data.role);
          } else {
            setRole(null);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [status]);

  if (loading) return <p>Loading...</p>;
  if (!session) return <button onClick={() => signIn("google")}>Sign in</button>;
  if (!role) return <p>Access Denied</p>;

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <p>Your role: {role}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
