'use client';

import { useState } from 'react';
import { VideoCard, VideoModal } from './VideoCardGrid';

const ROW1 = [
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060187/010_q2pgb5.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060174/01_zwpokk.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060173/03_ex2aox.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060172/05_foga6w.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060170/02_efrskn.mp4",
];

const ROW2 = [
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060168/04_juzngp.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060164/08_jdqd3e.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060164/06_tiyuqc.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060163/07_tynqjg.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060155/09_n7ffgg.mp4",
];

export default function ShowcaseSection({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section id="showcase" className="showcase-section">
        <div className="container">
          <p className="section-label">{label}</p>
          <h2 className="section-title">
            <span className="orange-underline">{title}</span>
          </h2>
          <p className="section-sub">{subtitle}</p>
        </div>

        {/* ── Two scrolling rows of thumbnail cards ── */}
        <div className="cv-marquee-wrap">
          {/* Row 1 — scrolls left */}
          <div className="cv-marquee-row">
            <div className="cv-track">
              {[...ROW1, ...ROW1].map((src, i) => (
                <VideoCard
                  key={i}
                  src={src}
                  label="Watch Edit"
                  onClick={() => setActiveVideo(src)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="cv-marquee-row cv-reverse">
            <div className="cv-track">
              {[...ROW2, ...ROW2].map((src, i) => (
                <VideoCard
                  key={i}
                  src={src}
                  label="Watch Edit"
                  onClick={() => setActiveVideo(src)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
