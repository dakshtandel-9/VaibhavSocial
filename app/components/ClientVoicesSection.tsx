'use client';

import { useState } from 'react';
import { VideoCard, VideoModal } from './VideoCardGrid';

const VIDEOS = [
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060187/010_q2pgb5.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060174/01_zwpokk.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060173/03_ex2aox.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060172/05_foga6w.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060170/02_efrskn.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060168/04_juzngp.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060164/08_jdqd3e.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060164/06_tiyuqc.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060163/07_tynqjg.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060155/09_n7ffgg.mp4",
];

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
              {[...VIDEOS, ...VIDEOS].map((src, i) => (
                <VideoCard
                  key={i}
                  src={src}
                  label="Watch Story"
                  onClick={() => setActiveVideo(src)}
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
