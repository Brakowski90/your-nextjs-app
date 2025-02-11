// // pages/index.js
// import { useSession } from 'next-auth/react';
// import LoginButton from '../components/LoginButton';

// export default function Home() {
//   const { data: session } = useSession();

//   if (session) {
//     return (
//       <div>
//         <h1>Welcome, {session.user.name}!</h1>
//         <p>Email: {session.user.email}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Welcome to my app</h1>
//       <LoginButton />
//     </div>
//   );
// // }
// import { useSession } from "next-auth/react";
// import LoginButton from "../components/LoginButton";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const { data: session } = useSession();

//   return (
//     <div className={!session ? "centered-container" : ""}>
//       {session && <Navbar />}

//       <div>
//         <h1>Welcome to SAGE EAF</h1>
//         {session ? (
//           <div>
//             <h2>Welcome, {session.user.name}!</h2>
//             <p>Email: {session.user.email}</p>
//           </div>
//         ) : (
//           <LoginButton />
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useSession } from "next-auth/react";
// import LoginButton from "../components/LoginButton";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const { data: session } = useSession();

//   return (
//     <div className={session ? "dashboard-container" : "auth-container"}>
//       {session && <Navbar />}

//       <div>
//         <h1>Welcome to SAGE EAF</h1>
//         {session ? (
//           <div>
//             <h2>Welcome, {session.user.name}!</h2>
//             <p>Email: {session.user.email}</p>
//           </div>
//         ) : (
//           <LoginButton />
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useSession } from "next-auth/react";
// import LoginButton from "../components/LoginButton";
// import Navbar from "../components/Navbar";

// export default function Home() {
//   const { data: session } = useSession();

//   if (!session) {
//     return (
//       <div className="auth-container">
//         <h1>Welcome to SAGE EAF</h1>
//         <LoginButton />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar /> {/* ✅ Stays full width and outside of the constrained container */}
//       <div className="user-container">
//         <h1>Welcome to SAGE EAF</h1>
//         <div>
//           <h2>Welcome, {session.user.name}!</h2>
//           <p>Email: {session.user.email}</p>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";
import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import Navbar from "../components/Navbar";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={styles.authContainer}>
        <h1>Welcome to SAGE EAF</h1>
        <LoginButton />
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
};
