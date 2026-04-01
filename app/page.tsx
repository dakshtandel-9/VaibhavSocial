'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const VideoArcGallery = dynamic(() => import('./components/VideoArcGallery'), { ssr: false });

const WA_LINK = 'https://wa.me/919024760502';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ─── MOBILE NAV ─────────────────────────── */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close">✕</button>
        <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
        <a href="#work" onClick={() => scrollToSection('work')}>Work</a>
        <a href="#about" onClick={() => scrollToSection('about')}>About</a>
        <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk" style={{ marginTop: '0.5rem' }}>
          Let&apos;s Talk 💬
        </a>
      </div>

      {/* ─── NAVBAR ─────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">Vaibhav Social</a>
        <ul className="nav-links">
          <li><a href="#services" onClick={e => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
          <li><a href="#work" onClick={e => { e.preventDefault(); scrollToSection('work'); }}>Work</a></li>
          <li><a href="#about" onClick={e => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
          <li><a href="#contact" onClick={e => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        </ul>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk">Let&apos;s Talk 💬</a>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          {/* 1️⃣ Badge */}
          <div className="hero-badge">
            🎬 Video Editor &amp; Content Strategist
          </div>

          {/* 2️⃣ Heading */}
          <h1 className="font-display">
            Your Content. <br />
            <span className="orange-word">Supercharged.</span>
          </h1>

          {/* 3️⃣ Description */}
          <p className="hero-sub">
            I help Instagram &amp; YouTube creators grow faster with scroll-stopping
            video edits and smart content strategy.
          </p>

          {/* 4️⃣ Video Arc Gallery - full bleed */}
          <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '2rem 0' }}>
            <VideoArcGallery />
          </div>

          {/* 5️⃣ CTA Buttons */}
          <div className="hero-ctas">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Let&apos;s Work Together 🚀
            </a>
            <a href="#work" onClick={e => { e.preventDefault(); scrollToSection('work'); }} className="btn-secondary">
              See My Work ↓
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────── */}
      <section id="services">
        <div className="container">
          <h2 className="section-title"><span className="orange-underline">What I Do</span></h2>
          <p className="section-sub">Everything you need to grow — beautifully edited, strategically planned.</p>
          <div className="services-grid">
            <div className="service-card">
              <span className="service-icon">✂️</span>
              <h3>Video Editing</h3>
              <p>Cuts, pacing, transitions, and effects that keep viewers hooked till the last second.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">📱</span>
              <h3>Reels &amp; Shorts</h3>
              <p>Short-form content built for the algorithm — fast, punchy, and made to go viral.</p>
            </div>
            <div className="service-card">
              <span className="service-icon">📐</span>
              <h3>Content Strategy &amp; Planning</h3>
              <p>Data-backed content plans: hooks, posting schedules, formats, and ideas tailored to your niche.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESULTS ────────────────────────────── */}
      <section id="work">
        <div className="container">
          <h2 className="section-title"><span className="orange-underline">Real Results. Real Creators.</span></h2>
          <p className="section-sub">Numbers that speak louder than words.</p>
          <div className="results-grid">
            <div className="result-card">
              <div className="result-number">
                45,000+
              </div>
              <div className="result-label">Followers</div>
              <div className="result-desc">Top client milestone</div>
            </div>
            <div className="result-card">
              <div className="result-number">0 → 9,000</div>
              <div className="result-label">In 2 Months</div>
              <div className="result-desc">Channel grown from scratch</div>
            </div>
            <div className="result-card">
              <div className="result-number">2M+</div>
              <div className="result-label">Views Generated</div>
              <div className="result-desc">Across multiple videos</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ──────────────────────────────── */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="about-image-box">
                <span className="about-avatar-placeholder">🎬</span>
              </div>
            </div>
            <div className="about-content">
              <h2>Hey, I&apos;m Vaibhav 👋</h2>
              <p>
                I&apos;m a video editor and content strategist who works with Instagram and YouTube creators to help them grow,
                stay consistent, and actually look good doing it. I&apos;ve helped creators go from zero to thousands of
                followers — and I bring that same energy to every project I take on.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Let&apos;s Build Something →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────── */}
      <section id="testimonials">
        <div className="container">
          <h2 className="section-title"><span className="orange-underline">What Creators Say</span></h2>
          <p className="section-sub">Don&apos;t take my word for it.</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-mark">&ldquo;</div>
              <p className="testimonial-text">
                Working with Vaibhav completely changed how my channel looks. The edits are clean, fast, and always on-brand.
                My engagement literally doubled in the first month.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <strong>[Creator Name] [PLACEHOLDER]</strong>
                  <span>YouTube · 45K Followers</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-mark">&ldquo;</div>
              <p className="testimonial-text">
                I had no idea how to grow on Instagram. Vaibhav mapped out my entire content strategy and the results were
                insane — 9,000 followers in under two months. Highly recommend.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">B</div>
                <div className="author-info">
                  <strong>[Creator Name] [PLACEHOLDER]</strong>
                  <span>Instagram · 9K Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────── */}
      <section id="contact">
        <div className="cta-inner container">
          <h2>Ready to Grow Your Channel?</h2>
          <p>Let&apos;s talk about your content — no fluff, just results.</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-white">
            💬 Chat on WhatsApp →
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────── */}
      <footer>
        <div className="footer-inner">
          <a href="#" className="footer-logo">Vaibhav Social</a>
          <ul className="footer-links">
            <li><a href="#services" onClick={e => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
            <li><a href="#work" onClick={e => { e.preventDefault(); scrollToSection('work'); }}>Work</a></li>
            <li><a href="#about" onClick={e => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#contact" onClick={e => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
          <p className="footer-copy">© 2024 Vaibhav Social. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
