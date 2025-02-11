// // components/Navbar.js
// import { useSession, signOut } from 'next-auth/react';
// import Link from 'next/link';

// export default function Navbar() {
//   const { data: session } = useSession();

//   return (
//     <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
//       <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
//         <li>
//           <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
//             Profile
//           </Link>
//         </li>
//         <li>
//           <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
//             Dashboard
//           </Link>
//         </li>
//         {session ? (
//           <li>
//             <button
//               onClick={() => signOut()}
//               style={{
//                 color: '#fff',
//                 backgroundColor: '#f44336',
//                 border: 'none',
//                 padding: '5px 10px',
//                 cursor: 'pointer',
//               }}
//             >
//               Sign out
//             </button>
//           </li>
//         ) : null}
//       </ul>
//     </nav>
//   );
// }

// // components/Navbar.js
// import { useSession, signOut } from 'next-auth/react';
// import Link from 'next/link';

// export default function Navbar() {
//   const { data: session } = useSession();

//   return (
//     <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
//       <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
//         <li>
//           <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
//             Profile
//           </Link>
//         </li>
//         <li>
//           <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
//             Dashboard
//           </Link>
//         </li>
//         {session ? (
//           <li>
//             <button
//               onClick={() => signOut()}
//               style={{
//                 color: '#fff',
//                 backgroundColor: '#f44336',
//                 border: 'none',
//                 padding: '5px 10px',
//                 cursor: 'pointer',
//               }}
//             >
//               Sign out
//             </button>
//           </li>
//         ) : null}
//       </ul>
//     </nav>
//   );
// }

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff', width: '100%' }}>
      <ul style={{ 
        listStyle: 'none', 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        padding: 0,
        margin: 0 
      }}>
        <li>
          <Link href="/" passHref>
            <span style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/profile" passHref>
            <span style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Profile</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard" passHref>
            <span style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/upload" passHref>
            <span style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>Upload</span>
          </Link>
        </li>
        {session ? (
          <li>
            <button
              onClick={() => signOut()}
              style={{
                color: '#fff',
                backgroundColor: '#f44336',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Sign out
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
