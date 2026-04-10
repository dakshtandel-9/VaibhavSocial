'use client';

import { useState } from 'react';
import { VideoCard, VideoModal } from './VideoCardGrid';

const VIDEO_IDS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '010'];

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
                <VideoCard
                  key={i}
                  src={`/heroVideos/${id}.mp4`}
                  label="Watch Story"
                  onClick={() => setActiveVideo(`/heroVideos/${id}.mp4`)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VIDEO MODAL ─────────────────────────── */}
      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
