'use client';

import { useEffect, useState } from 'react';
import type { NavContent } from '../../lib/content';

interface NavBarProps {
  waLink: string;
  nav: NavContent;
}

export default function NavBar({ waLink, nav }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ─── MOBILE NAV OVERLAY ──────────────────── */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={close} aria-label="Close menu">✕</button>
        <a href="#services" onClick={close}>Services</a>
        <a href="#showcase" onClick={close}>Work</a>
        <a href="#results"  onClick={close}>Results</a>
        <a href="#about"    onClick={close}>About</a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-talk"
          style={{ marginTop: '0.5rem' }}
          onClick={close}
        >
          {nav.cta}
        </a>
      </div>

      {/* ─── NAVBAR ─────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo" aria-label={nav.logo}>
          <img
            src="https://res.cloudinary.com/dwethh3fq/image/upload/v1777448586/Copy_of_SANJARI_ttuuye.svg"
            alt={nav.logo}
            className="navbar-logo-img"
            height={40}
            style={{ height: 40, width: 'auto', display: 'block' }}
          />
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#showcase">Work</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-talk">{nav.cta}</a>

        {/* Single toggle button — shows ≡ or ✕ */}
        <button
          className={`hamburger ${mobileOpen ? 'is-open' : ''}`}
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen
            ? <span className="hamburger-x">✕</span>
            : <><span /><span /><span /></>}
        </button>
      </nav>
    </>
  );
}
