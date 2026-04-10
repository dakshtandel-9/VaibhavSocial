'use client';

import { useEffect, useState } from 'react';
import { WA_LINK, nav } from '../../lib/content';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ─── MOBILE NAV ─────────────────────────── */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close">✕</button>
        <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
        <a href="#showcase" onClick={() => setMobileOpen(false)}>Work</a>
        <a href="#results" onClick={() => setMobileOpen(false)}>Results</a>
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk" style={{ marginTop: '0.5rem' }}>
          {nav.cta}
        </a>
      </div>

      {/* ─── NAVBAR ─────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">{nav.logo}</a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#showcase">Work</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk">{nav.cta}</a>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>
    </>
  );
}
