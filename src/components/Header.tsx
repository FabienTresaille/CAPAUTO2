'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header id="header">
        <div className="header-inner">
          <Link href="/" className="logo-link">
            <Image src="/logo.png" alt="CAP'AUTO" width={160} height={60} priority className="logo-img" />
          </Link>
          <nav className="desktop-nav">
            <Link href="/">Accueil</Link>
            <Link href="/stock">Notre stock</Link>
            <Link href="/recherche">Recherche</Link>
            <Link href="/services">Services</Link>
            <Link href="/confiance">Confiance</Link>
            <Link href="/contact" className="nav-cta">Contact</Link>
          </nav>
          <button className="burger" onClick={() => setMenuOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-nav open">
          <button className="mobile-nav-close" onClick={() => setMenuOpen(false)}>✕</button>
          <Link href="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link href="/stock" onClick={() => setMenuOpen(false)}>Notre stock</Link>
          <Link href="/recherche" onClick={() => setMenuOpen(false)}>Recherche</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/confiance" onClick={() => setMenuOpen(false)}>Confiance</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </>
  );
}
