'use client';

import { useState } from 'react';
import { VideoCard, VideoModal } from './VideoCardGrid';

const ROW1 = ['01', '02', '03', '04', '05'];
const ROW2 = ['06', '07', '08', '09', '010'];

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
              {[...ROW1, ...ROW1].map((id, i) => (
                <VideoCard
                  key={i}
                  src={`/heroVideos/${id}.mp4`}
                  label="Watch Edit"
                  onClick={() => setActiveVideo(`/heroVideos/${id}.mp4`)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="cv-marquee-row cv-reverse">
            <div className="cv-track">
              {[...ROW2, ...ROW2].map((id, i) => (
                <VideoCard
                  key={i}
                  src={`/heroVideos/${id}.mp4`}
                  label="Watch Edit"
                  onClick={() => setActiveVideo(`/heroVideos/${id}.mp4`)}
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
