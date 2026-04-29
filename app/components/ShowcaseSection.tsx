'use client';

import { useState, useEffect } from 'react';
import { ScrollMarqueeRow, VideoModal } from './VideoCardGrid';

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
              <ScrollMarqueeRow
                videos={ROW1}
                label="Watch Edit"
                onCardClick={setActiveVideo}
              />
            )}
            {ROW2.length > 0 && (
              <ScrollMarqueeRow
                videos={ROW2}
                label="Watch Edit"
                reverse
                onCardClick={setActiveVideo}
              />
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
