// //pages/index.js

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleManualLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
      alert("Invalid email or password!");
    } else {
      router.push("/");
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div style={styles.authContainer}>
        <Image 
          src="/sage-logo.jpeg" 
          alt="Sage of America Logo"
          width={360}
          height={340}
          priority
          style={{ marginBottom: "40px" }}
        />

        <h1 style={{ marginTop: "10px" }}>Welcome to SAGE EAF</h1>

        {/* Google Login */}
        <button onClick={() => signIn("google")} style={styles.wideButton}>
          Login with Google
        </button>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} style={styles.inputContainer}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.wideButton}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="user-container">
        <h1>Welcome to SAGE EAF</h1>
        <div>
          <h2>Welcome, {session.user.name}!</h2>
          <p>Email: {session.user.email}</p>
        </div>
      </div>
    </>
  );
}

const styles = {
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    textAlign: "center",
  },
  wideButton: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "240px",
    textAlign: "center",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  inputContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    width: "260px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
