//components/Navbar.js

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Burger Menu (Only on Mobile) */}
      {isMobile && (
        <div className={styles.burgerMenu} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      )}

      {/* Navbar Links (Both Desktop & Mobile) */}
      <ul className={`${styles.navLinks} ${isMobile && isOpen ? styles.open : ''}`}>
        <li><Link href="/" className={styles.navLink}><button className={styles.navButton}>Home</button></Link></li>
        <li><Link href="/profile" className={styles.navLink}><button className={styles.navButton}>Profile</button></Link></li>
        <li><Link href="/dashboard" className={styles.navLink}><button className={styles.navButton}>Dashboard</button></Link></li>
        <li><Link href="/upload" className={styles.navLink}><button className={styles.navButton}>Upload</button></Link></li>
        {session && (
          <li><button onClick={() => signOut()} className={styles.navButton}>Sign Out</button></li>
        )}
      </ul>
    </nav>
  );
}
