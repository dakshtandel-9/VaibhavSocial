'use client';

import { useState, useEffect } from 'react';
import { VideoCard, VideoModal } from './VideoCardGrid';

export default function ShowcaseSection({
  label,
  title,
  subtitle,
  row1 = [],
  row2 = [],
}: {
  label: string;
  title: string;
  subtitle: string;
  row1?: string[];
  row2?: string[];
}) {
  const ROW1 = row1.filter(Boolean);
  const ROW2 = row2.filter(Boolean);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

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

        {mounted && (
          <div className="cv-marquee-wrap">
            {ROW1.length > 0 && (
              <div className="cv-marquee-row">
                <div className="cv-track">
                  {[...ROW1, ...ROW1].map((src, i) => (
                    <VideoCard key={i} src={src} label="Watch Edit" onClick={() => setActiveVideo(src)} />
                  ))}
                </div>
              </div>
            )}
            {ROW2.length > 0 && (
              <div className="cv-marquee-row cv-reverse">
                <div className="cv-track">
                  {[...ROW2, ...ROW2].map((src, i) => (
                    <VideoCard key={i} src={src} label="Watch Edit" onClick={() => setActiveVideo(src)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
