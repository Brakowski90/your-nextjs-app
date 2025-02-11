// // components/LoginButton.js
// import { useSession, signIn, signOut } from 'next-auth/react';

// export default function LoginButton() {
//   const { data: session } = useSession();

//   return (
//     <div>
//       {!session ? (
//         <button onClick={() => signIn('google')}>Sign in with Google</button>
//       ) : (
//         <div>
//           <p>Signed in as {session.user.email}</p>
//           <button onClick={() => signOut()}>Sign out</button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div style={styles.container}>
      {!session ? (
        <button onClick={() => signIn('google')} style={styles.button}>
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()} style={styles.button}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20vh',
    flexDirection: 'column',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    margin: '10px',
  }
};
