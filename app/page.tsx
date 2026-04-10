'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GridPattern } from './components/ui/grid-pattern';
import ScrollReveal from './components/ScrollReveal';
import BorderGlow from './components/BorderGlow';
import {
  WA_LINK,
  nav,
  hero,
  showcase,
  promise,
  services,
  beyond,
  results,
  about,
  process,
  testimonials,
  pricing,
  cta,
  footer,
} from '../lib/content';

const VideoArcGallery = dynamic(() => import('./components/VideoArcGallery'), { ssr: false });

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
      {/* ─── BOTTOM FADE OVERLAY ────────────────── */}
      <div className="bottom-fade-overlay" />

      {/* ─── MOBILE NAV ─────────────────────────── */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close">✕</button>
        <a href="#services" onClick={() => scrollToSection('services')}>Services</a>
        <a href="#showcase" onClick={() => scrollToSection('showcase')}>Work</a>
        <a href="#results" onClick={() => scrollToSection('results')}>Results</a>
        <a href="#about" onClick={() => scrollToSection('about')}>About</a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk" style={{ marginTop: '0.5rem' }}>
          {nav.cta}
        </a>
      </div>

      {/* ─── NAVBAR ─────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">{nav.logo}</a>
        <ul className="nav-links">
          <li><a href="#services" onClick={e => { e.preventDefault(); scrollToSection('services'); }}>Services</a></li>
          <li><a href="#showcase" onClick={e => { e.preventDefault(); scrollToSection('showcase'); }}>Work</a></li>
          <li><a href="#results" onClick={e => { e.preventDefault(); scrollToSection('results'); }}>Results</a></li>
          <li><a href="#about" onClick={e => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
        </ul>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-talk">{nav.cta}</a>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ─── HERO ────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray="4 2"
          strokeColor="rgba(160,160,160,0.5)"
          opacity={0.9}
        />
        <div className="hero-inner">
          <div className="hero-badge">{hero.badge}</div>
          <h1 className="font-display">
            {hero.headline[0]} <br />
            <span className="orange-word">{hero.headline[1]}</span>
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', margin: '2rem 0' }}>
            <VideoArcGallery />
          </div>
          <div className="hero-ctas">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {hero.ctas.primary}
            </a>
            <a href="#showcase" onClick={e => { e.preventDefault(); scrollToSection('showcase'); }} className="btn-secondary">
              {hero.ctas.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ─── PROMISE ────────────────────────────── */}
      <section id="promise" className="promise-section">
        <div className="promise-accent-line" />
        <div className="container">
          <div className="promise-inner">
            <p className="promise-label">My Promise to You</p>
            <ScrollReveal
              baseOpacity={0.06}
              enableBlur
              baseRotation={5}
              blurStrength={6}
              textSize="clamp(2.4rem, 5.5vw, 4rem)"
              textColor="var(--dark)"
              className="promise-headline"
            >
              {promise.headline}
            </ScrollReveal>
            <div className="promise-divider" />
            <ScrollReveal
              baseOpacity={0.06}
              enableBlur
              baseRotation={4}
              blurStrength={5}
              textSize="clamp(1.15rem, 2.5vw, 1.5rem)"
              textColor="var(--orange)"
              className="promise-highlight-text"
            >
              {promise.highlight}
            </ScrollReveal>
            <ScrollReveal
              baseOpacity={0.06}
              enableBlur
              baseRotation={2}
              blurStrength={3}
              textSize="clamp(1rem, 2vw, 1.2rem)"
              textColor="var(--gray)"
              className="promise-body-text"
            >
              {promise.body}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────── */}
      <section id="services" className="services-section">
        <div className="container">
          <p className="section-label">{services.label}</p>
          <h2 className="section-title"><span className="orange-underline">{services.title}</span></h2>
          <p className="section-sub">{services.subtitle}</p>
          <div className="services-grid">
            {services.cards.map((card) => (
              <BorderGlow
                key={card.title}
                backgroundColor="#FFFFFF"
                borderRadius={24}
                glowColor="25 100 50"
                colors={['#FF6B00', '#FF9A4D', '#FFF4EC']}
                glowRadius={20}
                glowIntensity={1.1}
                edgeSensitivity={25}
              >
                <div className="service-card-content">
                  <span className="service-card-icon">{card.icon}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEYOND ─────────────────────────────── */}
      <section id="beyond" className="beyond-section">
        <div className="container">
          <p className="section-label beyond-label">{beyond.label}</p>
          <h2 className="section-title beyond-title">{beyond.title}</h2>
          <p className="section-sub beyond-sub">{beyond.subtitle}</p>
          <div className="beyond-grid">
            {beyond.items.map((item) => (
              <BorderGlow
                key={item.title}
                backgroundColor="#FFFFFF"
                borderRadius={20}
                glowColor="25 100 50"
                colors={['#FF6B00', '#FF9A4D', '#FFF4EC']}
                glowRadius={20}
                glowIntensity={1.1}
                edgeSensitivity={25}
              >
                <div className="beyond-item">
                  <div className="beyond-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE ───────────────────────────── */}
      <section id="showcase" className="showcase-section">
        <div className="container">
          <p className="section-label">{showcase.label}</p>
          <h2 className="section-title"><span className="orange-underline">{showcase.title}</span></h2>
          <p className="section-sub">{showcase.subtitle}</p>
        </div>
        <div className="showcase-marquee-wrap">
          {/* Row 1 — scrolls left */}
          <div className="showcase-marquee-row">
            <div className="showcase-marquee-track">
              {['01','02','03','04','05'].map((id) => (
                <div className="showcase-video-item" key={id}>
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
              {['01','02','03','04','05'].map((id) => (
                <div className="showcase-video-item" key={`dup1-${id}`} aria-hidden="true">
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
              {['01','02','03','04','05'].map((id) => (
                <div className="showcase-video-item" key={`dup2-${id}`} aria-hidden="true">
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right */}
          <div className="showcase-marquee-row reverse">
            <div className="showcase-marquee-track">
              {['06','07','08','09','010'].map((id) => (
                <div className="showcase-video-item" key={id}>
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
              {['06','07','08','09','010'].map((id) => (
                <div className="showcase-video-item" key={`dup1-${id}`} aria-hidden="true">
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
              {['06','07','08','09','010'].map((id) => (
                <div className="showcase-video-item" key={`dup2-${id}`} aria-hidden="true">
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESULTS ────────────────────────────── */}
      <section id="results" className="results-section">
        <div className="container">
          <p className="section-label">{results.label}</p>
          <h2 className="section-title"><span className="orange-underline">{results.title}</span></h2>
          <p className="section-sub">{results.subtitle}</p>
          <div className="results-grid results-grid-4">
            {results.stats.map((stat) => (
              <div className="result-card" key={stat.label}>
                <div className="result-number">{stat.number}</div>
                <div className="result-label">{stat.label}</div>
                <div className="result-desc">{stat.desc}</div>
                <div className="result-context">{stat.context}</div>
              </div>
            ))}
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
                <div className="about-float-badge">{about.badge}</div>
              </div>
            </div>
            <div className="about-content">
              <p className="section-label">{about.label}</p>
              <h2>{about.headline}</h2>
              {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              <blockquote className="passion-note">&ldquo;{about.quote}&rdquo;</blockquote>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {about.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────── */}
      <section id="process" className="process-section">
        <div className="container">
          <p className="section-label">{process.label}</p>
          <h2 className="section-title"><span className="orange-underline">{process.title}</span></h2>
          <p className="section-sub">{process.subtitle}</p>
          <div className="process-steps">
            {process.steps.map((step) => (
              <div className="process-step" key={step.num}>
                <div className="step-number">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────── */}
      <section id="testimonials">
        <div className="container">
          <p className="section-label">{testimonials.label}</p>
          <h2 className="section-title"><span className="orange-underline">{testimonials.title}</span></h2>
          <p className="section-sub">{testimonials.subtitle}</p>
          <div className="testimonials-grid">
            {testimonials.cards.map((card) => (
              <div className="testimonial-card" key={card.platform}>
                <div className="quote-mark">&ldquo;</div>
                <p className="testimonial-text">{card.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{card.initial}</div>
                  <div className="author-info">
                    <strong>{card.name}</strong>
                    <span>{card.platform}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ────────────────────────────── */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <p className="section-label pricing-label">{pricing.label}</p>
          <h2 className="section-title pricing-title">{pricing.title}</h2>
          <div className="pricing-card">
            <h3>{pricing.cardHeadline}</h3>
            <p className="pricing-card-sub">{pricing.cardSub}</p>
            <ul className="pricing-features">
              {pricing.features.map((f) => (
                <li key={f}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {pricing.cta}
            </a>
            <p className="pricing-note">{pricing.note}</p>
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────── */}
      <section id="contact">
        <div className="cta-inner container">
          <h2>{cta.headline}</h2>
          <p>{cta.sub}</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-white">
            {cta.btn}
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────── */}
      <footer>
        <div className="footer-inner">
          <a href="#" className="footer-logo">{footer.logo}</a>
          <ul className="footer-links">
            {footer.links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={e => { e.preventDefault(); scrollToSection(link.toLowerCase()); }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <p className="footer-copy">{footer.copy}</p>
        </div>
      </footer>
    </>
  );
}
