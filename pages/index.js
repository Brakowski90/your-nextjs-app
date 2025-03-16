// //pages/index.js

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/router";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleManualLogin = async (e) => {
//     e.preventDefault();
//     const result = await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });

//     if (result?.error) {
//       console.error("Login failed:", result.error);
//       alert("Invalid email or password!");
//     } else {
//       router.push("/");
//     }
//   };

//   if (status === "loading") return <p>Loading...</p>;

//   if (!session) {
//     return (
//       <div style={styles.authContainer}>
//         <Image 
//           src="/sage-logo.jpeg" 
//           alt="Sage of America Logo"
//           width={360}
//           height={340}
//           priority
//           style={{ marginBottom: "40px" }}
//         />

//         <h1 style={{ marginTop: "10px" }}>Welcome to SAGE EAF</h1>

//         {/* Google Login */}
//         <button onClick={() => signIn("google")} style={styles.wideButton}>
//           Login with Google
//         </button>

//         {/* Manual Login Form */}
//         <form onSubmit={handleManualLogin} style={styles.inputContainer}>
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//           />
//           <button type="submit" style={styles.wideButton}>Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <>
//     <Navbar />
//     <div className="user-container" style={styles.container}>
//       <h1>Welcome to SAGE EAF</h1>
//       <div>
//         <p>
//           At SAGE, we are driven by a relentless dedication to innovation.  
//           Our mission is to provide unparalleled solutions that stand the test of time.
//         </p>
//         <p>
//           We specialize in enhancing the performance and durability of materials,  
//           ensuring they withstand even the most extreme conditions.
//         </p>
//         <p>
//           Our journey is built on resilience, creativity, and an unwavering commitment  
//           to excellence—pushing the boundaries of what’s possible.
//         </p>
//         <hr style={{ margin: "20px 0", border: "0.5px solid #ccc" }} />
//         <p>
//           <strong>Experiencing technical issues?</strong>  
//           Please reach out to one of our admins for support:
//         </p>
//         <p>
//           <strong>Brandon Rakowski</strong> -  
//           <a href="mailto:brandonrakowski90@gmail.com">brandonrakowski90@gmail.com</a>
//         </p>
//         <p>
//           <strong>Marcio Gerep</strong> -  
//           <a href="mailto:marciogerep@gmail.com">marciogerep@gmail.com</a>
//         </p>
//       </div>
//     </div>
//   </>

//   );
// }

// const styles = {
//   authContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     height: "100vh",
//     textAlign: "center",
//   },
//   wideButton: {
//     padding: "12px",
//     fontSize: "16px",
//     width: "100%",
//     maxWidth: "240px",
//     textAlign: "center",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "10px",
//   },
//   inputContainer: {
//     marginTop: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   input: {
//     padding: "10px",
//     width: "260px",
//     marginBottom: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   logoutButton: {
//     marginTop: "20px",
//     padding: "10px",
//     fontSize: "16px",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
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

        <h1 style={styles.heading}>Welcome to SAGE EAF</h1>

        <button onClick={() => signIn("google")} style={styles.wideButton}>
          Login with Google
        </button>

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
      <div style={styles.pageContainer}>
        <h1 style={styles.pageTitle}>Welcome to SAGE EAF</h1>
        
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <p style={styles.text}>
            At <strong>SAGE</strong>, we are driven by relentless innovation and excellence.  
            Our mission is to provide cutting-edge solutions that endure, ensuring superior  
            performance in the most extreme conditions. With a foundation built on resilience  
            and creativity, we push boundaries to redefine what’s possible.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Technical Support</h2>
          <p style={styles.text}>
            <strong>Experiencing technical issues?</strong>  
            Reach out to our support team for assistance.
          </p>
          <p style={styles.contact}>
            <strong>Brandon Rakowski</strong> <br />
            <a href="mailto:brandonrakowski90@gmail.com">brandonrakowski90@gmail.com</a>
          </p>
          <p style={styles.contact}>
            <strong>Marcio Gerep</strong> <br />
            <a href="mailto:marciogerep@gmail.com">marciogerep@gmail.com</a>
          </p>
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
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "15px",
  },
  wideButton: {
    padding: "12px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "260px",
    backgroundColor: "#0056b3",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "12px",
    transition: "0.3s",
  },
  inputContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "12px",
    width: "260px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  pageContainer: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#0056b3",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
  },
  contact: {
    fontSize: "16px",
    marginTop: "10px",
    lineHeight: "1.5",
  },
};

