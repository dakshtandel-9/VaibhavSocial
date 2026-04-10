import Image from 'next/image';
import { GridPattern } from './components/ui/grid-pattern';
import BorderGlow from './components/BorderGlow';
import PageLoader from './components/PageLoader';
import NavBar from './components/NavBar';
import ClientVoicesSection from './components/ClientVoicesSection';
import VideoArcGalleryClient from './components/VideoArcGalleryClient';
import {
  WA_LINK,
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

export default function Home() {
  return (
    <>
      {/* ─── PAGE LOADER ─────────────────────────── */}
      <PageLoader />

      {/* ─── BOTTOM FADE OVERLAY ────────────────── */}
      <div className="bottom-fade-overlay" />

      {/* ─── NAVBAR ─────────────────────────────── */}
      <NavBar />

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
            <VideoArcGalleryClient />
          </div>
          <div className="hero-ctas">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {hero.ctas.primary}
            </a>
            <a href="#showcase" className="btn-secondary">
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
            <h2 className="promise-headline" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', color: 'var(--dark)' }}>
              {promise.headline}
            </h2>
            <div className="promise-divider" />
            <p className="promise-highlight-text" style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', color: 'var(--orange)' }}>
              {promise.highlight}
            </p>
            <p className="promise-body-text" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--gray)' }}>
              {promise.body}
            </p>
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
          {/* Row 1 — scrolls left (2 copies so animation loops at -50%) */}
          <div className="showcase-marquee-row">
            <div className="showcase-marquee-track">
              {['01', '02', '03', '04', '05'].map((id) => (
                <div className="showcase-video-item" key={id}>
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
              {['01', '02', '03', '04', '05'].map((id) => (
                <div className="showcase-video-item" key={`dup-${id}`} aria-hidden="true">
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="none" />
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — scrolls right (2 copies so animation loops at -50%) */}
          <div className="showcase-marquee-row reverse">
            <div className="showcase-marquee-track">
              {['06', '07', '08', '09', '010'].map((id) => (
                <div className="showcase-video-item" key={id}>
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ))}
              {['06', '07', '08', '09', '010'].map((id) => (
                <div className="showcase-video-item" key={`dup-${id}`} aria-hidden="true">
                  <video src={`/heroVideos/${id}.mp4`} autoPlay muted loop playsInline preload="none" />
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
      <section id="about" className="about-section">
        {/* decorative blobs */}
        <div className="about-blob about-blob-1" aria-hidden="true" />
        <div className="about-blob about-blob-2" aria-hidden="true" />

        <div className="container about-container">
          {/* ── LEFT: photo column ── */}
          <div className="about-photo-col">
            {/* main photo card */}
            <div className="about-photo-wrap">
              <Image
                src="/Profile/profile.jpg"
                alt="Vaibhav — Content Strategist"
                className="about-photo"
                width={480}
                height={540}
                priority
              />
              {/* orange accent frame */}
              <div className="about-photo-frame" aria-hidden="true" />
            </div>

            {/* floating stat pills */}
            <div className="about-stat-pill about-stat-pill--top">
              <span className="about-stat-icon">📈</span>
              <span className="about-stat-text"><strong>150M+</strong> Views Generated</span>
            </div>
            <div className="about-stat-pill about-stat-pill--bottom">
              <span className="about-stat-icon">🚀</span>
              <span className="about-stat-text"><strong>0 → 9K</strong> in 2 Months</span>
            </div>
          </div>

          {/* ── RIGHT: content column ── */}
          <div className="about-content-col">
            <p className="section-label">{about.label}</p>
            <h2 className="about-headline">{about.headline}</h2>

            <div className="about-divider" />

            {about.paragraphs.map((p, i) => (
              <p key={i} className="about-para">{p}</p>
            ))}

            {/* skill tags */}
            <div className="about-skills">
              {['Content Strategy', 'Video Editing', 'Reels & Shorts', 'Monetization', 'Brand Building', 'Growth Hacking'].map((skill) => (
                <span key={skill} className="about-skill-tag">{skill}</span>
              ))}
            </div>

            <blockquote className="passion-note">
              &ldquo;{about.quote}&rdquo;
            </blockquote>

            <div className="about-cta-row">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {about.cta}
              </a>
              <div className="about-availability">
                <span className="about-availability-dot" />
                Available for new clients
              </div>
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
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <p className="section-label">{testimonials.label}</p>
          <h2 className="section-title"><span className="orange-underline">{testimonials.title}</span></h2>
          <p className="section-sub">{testimonials.subtitle}</p>
        </div>

        {/* Row 1 — scrolls left (2 copies so animation loops at -50%) */}
        <div className="reviews-marquee-wrap">
          <div className="reviews-marquee-row">
            <div className="reviews-track">
              {[...testimonials.cards, ...testimonials.cards].map((card, i) => (
                <div className="review-card" key={i}>
                  <div className="review-stars">{'★'.repeat(card.stars ?? 5)}</div>
                  <p className="review-text">&ldquo;{card.text}&rdquo;</p>
                  <div className="review-author">
                    <div className="review-avatar">{card.initial}</div>
                    <div className="review-info">
                      <strong>{card.name}</strong>
                      <span>{card.platform}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right (2 copies) */}
          <div className="reviews-marquee-row reviews-reverse">
            <div className="reviews-track">
              {[...[...testimonials.cards].reverse(), ...[...testimonials.cards].reverse()].map((card, i) => (
                <div className="review-card" key={i}>
                  <div className="review-stars">{'★'.repeat(card.stars ?? 5)}</div>
                  <p className="review-text">&ldquo;{card.text}&rdquo;</p>
                  <div className="review-author">
                    <div className="review-avatar">{card.initial}</div>
                    <div className="review-info">
                      <strong>{card.name}</strong>
                      <span>{card.platform}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENT VOICES ───────────────────────── */}
      <ClientVoicesSection />

      {/* ─── PRICING ────────────────────────────── */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <p className="section-label pricing-label">{pricing.label}</p>
          <h2 className="section-title pricing-title">{pricing.title}</h2>
          <div className="pricing-card-wrap">
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
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────── */}
      <section id="contact">
        {/* decorative glow orbs */}
        <div className="cta-orb cta-orb--left" aria-hidden="true" />
        <div className="cta-orb cta-orb--right" aria-hidden="true" />
        <div className="cta-orb cta-orb--center" aria-hidden="true" />

        <div className="cta-inner container">
          {/* availability pill */}
          <div className="cta-availability-pill">
            <span className="cta-avail-dot" />
            <span>2 spots open this month</span>
          </div>

          <h2 className="cta-headline">
            Ready to Grow{' '}
            <span className="cta-headline-accent">Your Channel?</span>
          </h2>
          <p className="cta-sub">{cta.sub}</p>

          {/* trust badges */}
          <div className="cta-badges">
            <div className="cta-badge">
              <span className="cta-badge-num">150M+</span>
              <span className="cta-badge-label">Views Delivered</span>
            </div>
            <div className="cta-badge-divider" />
            <div className="cta-badge">
              <span className="cta-badge-num">50+</span>
              <span className="cta-badge-label">Happy Creators</span>
            </div>
            <div className="cta-badge-divider" />
            <div className="cta-badge">
              <span className="cta-badge-num">5★</span>
              <span className="cta-badge-label">Average Rating</span>
            </div>
          </div>

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cta-btn-main">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.858L.054 23.454a.5.5 0 0 0 .492.596l5.788-1.517A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.951 9.951 0 0 1-5.06-1.376l-.361-.214-3.438.901.917-3.346-.235-.375A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            {cta.btn}
          </a>

          <p className="cta-note">Free strategy call · No commitment · Reply in minutes</p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────── */}
      <footer>
        <div className="footer-inner">
          <a href="#" className="footer-logo">{footer.logo}</a>
          <ul className="footer-links">
            {footer.links.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>
          <p className="footer-copy">{footer.copy}</p>
        </div>
      </footer>
    </>
  );
}
