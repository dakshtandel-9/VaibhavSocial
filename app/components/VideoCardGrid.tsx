'use client';

import { useState } from 'react';
import { videoPoster } from '../../lib/videoPoster';

/* ─── Single thumbnail card ─────────────────────────────────────── */
export function VideoCard({
  src,
  label = 'Watch Video',
  onClick,
}: {
  src: string;
  label?: string;
  onClick: () => void;
}) {
  return (
    <button
      className="cv-card"
      onClick={onClick}
      aria-label={label}
    >
      <img
        src={videoPoster(src)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="cv-thumb"
      />
      <div className="cv-play-overlay">
        <div className="cv-play-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="cv-play-label">{label}</span>
      </div>
    </button>
  );
}

/* ─── Full-screen video modal ───────────────────────────────────── */
export function VideoModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div
      className="video-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="video-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-modal-close"
          onClick={onClose}
          aria-label="Close video"
        >
          ✕
        </button>
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="video-modal-player"
        />
      </div>
    </div>
  );
}

/* ─── Scrolling marquee row of video cards ──────────────────────── */
export function VideoMarqueeCards({
  videoIds,
  folder = '/heroVideos',
  label = 'Watch Story',
  reverse = false,
}: {
  videoIds: string[];
  folder?: string;
  label?: string;
  reverse?: boolean;
}) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <div className={`cv-marquee-row${reverse ? ' cv-reverse' : ''}`}>
        <div className="cv-track">
          {[...videoIds, ...videoIds].map((id, i) => (
            <VideoCard
              key={i}
              src={`${folder}/${id}.mp4`}
              label={label}
              onClick={() => setActiveVideo(`${folder}/${id}.mp4`)}
            />
          ))}
        </div>
      </div>

      {activeVideo && (
        <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
