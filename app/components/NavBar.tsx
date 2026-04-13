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

  const close = () => setMobileOpen(false);

  return (
    <>
      {/* ─── MOBILE NAV OVERLAY ──────────────────── */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <a href="#services" onClick={close}>Services</a>
        <a href="#showcase" onClick={close}>Work</a>
        <a href="#results"  onClick={close}>Results</a>
        <a href="#about"    onClick={close}>About</a>
        <a
          href={WA_LINK}
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
        <a href="#" className="navbar-logo">{nav.logo}</a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#showcase">Work</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk">{nav.cta}</a>

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
