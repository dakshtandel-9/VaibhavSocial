'use client';

import { useState } from 'react';

const VIDEO_IDS = ['01','02','03','04','05','06','07','08','09','010'];

export default function ClientVoicesSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* ─── VIDEO TESTIMONIALS ──────────────────── */}
      <section id="client-voices" className="client-voices-section">
        <div className="container">
          <p className="section-label">Client Voices</p>
          <h2 className="section-title"><span className="orange-underline">Hear It From Them</span></h2>
          <p className="section-sub">Real creators. Real results. Click any video to watch.</p>
        </div>

        <div className="cv-marquee-wrap">
          <div className="cv-marquee-row">
            <div className="cv-track">
              {[...VIDEO_IDS, ...VIDEO_IDS].map((id, i) => (
                <button
                  key={i}
                  className="cv-card"
                  onClick={() => setActiveVideo(`/heroVideos/${id}.mp4`)}
                  aria-label={`Watch client video ${id}`}
                >
                  <video
                    src={`/heroVideos/${id}.mp4`}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="cv-thumb"
                  />
                  <div className="cv-play-overlay">
                    <div className="cv-play-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <span className="cv-play-label">Watch Story</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VIDEO MODAL ─────────────────────────── */}
      {activeVideo && (
        <div
          className="video-modal-backdrop"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >✕</button>
            <video
              src={activeVideo}
              controls
              autoPlay
              playsInline
              className="video-modal-player"
            />
          </div>
        </div>
      )}
    </>
  );
}
