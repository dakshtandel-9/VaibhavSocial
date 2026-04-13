'use client';

import { useState, useEffect } from 'react';
import { VideoCard, VideoModal } from './VideoCardGrid';

export default function ClientVoicesSection({ videos = [] }: { videos?: string[] }) {
  const VIDEOS = videos.filter(Boolean);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (VIDEOS.length === 0) return null;

  return (
    <>
      <section id="client-voices" className="client-voices-section">
        <div className="container">
          <p className="section-label">Client Voices</p>
          <h2 className="section-title"><span className="orange-underline">Hear It From Them</span></h2>
          <p className="section-sub">Real creators. Real results. Click any video to watch.</p>
        </div>

        {mounted && (
          <div className="cv-marquee-wrap">
            <div className="cv-marquee-row">
              <div className="cv-track">
                {[...VIDEOS, ...VIDEOS].map((src, i) => (
                  <VideoCard key={i} src={src} label="Watch Story" onClick={() => setActiveVideo(src)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
