//pages/profile.js

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { data: session, status } = useSession();
  const [role, setRole] = useState(null);

  // Fetch the user role when the session is ready
  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/auth/getUserRole")
        .then((res) => res.json())
        .then((data) => {
          if (data.role) {
            setRole(data.role);
          }
        })
        .catch((error) => console.error("Error fetching role:", error));
    }
  }, [session]);

  // Show loading state while session is being checked
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Redirect user if not logged in
  if (!session) {
    return <div>You must be signed in to view this page.</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>Profile Page</h1>
      <p>Email: {session.user.email}</p>
      <p>Name: {session.user.name}</p>
      <p>Role: {role ? role : "Loading..."}</p>
    </div>
  );
}
