'use client';

import { useEffect, useRef, useState } from 'react';
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

/* ─── Auto-scrolling row that users can also scroll/swipe manually ─ */
export function ScrollMarqueeRow({
  videos,
  reverse = false,
  label,
  speed = 1.2,
  onCardClick,
}: {
  videos: string[];
  reverse?: boolean;
  label: string;
  speed?: number;
  onCardClick: (src: string) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | null>(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);

  /* ── auto-scroll loop ── */
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    // Give browser a frame to compute layout before setting initial position
    const initTimer = setTimeout(() => {
      if (reverse && el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth / 2;
      }
    }, 50);

    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && el.scrollWidth > el.clientWidth) {
        const half = el.scrollWidth / 2;
        if (reverse) {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= 0) el.scrollLeft = half;
        } else {
          el.scrollLeft += speed;
          if (el.scrollLeft >= half) el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(raf);
    };
  }, [reverse, speed, videos.length]);

  /* ── pause / resume helpers ── */
  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };
  const resume = (delay: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false;
      resumeTimer.current = null;
    }, delay);
  };

  /* ── drag-to-scroll (pointer events) ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    const el = rowRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragScrollStart.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    pause();
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = rowRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    el.scrollLeft = dragScrollStart.current - dx;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = rowRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = '';
    }
    isDragging.current = false;
    resume(2500);
  };

  /* ── guarded click — skip if user just dragged ── */
  const handleCardClick = (src: string) => {
    if (hasDragged.current) return;
    onCardClick(src);
  };

  return (
    <div
      ref={rowRef}
      className="sc-marquee-row"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => { if (!isDragging.current) pause(); }}
      onMouseLeave={() => { if (!isDragging.current) resume(0); }}
      onTouchStart={pause}
      onTouchEnd={() => resume(2000)}
      onTouchCancel={() => resume(2000)}
      style={{ cursor: 'grab' }}
    >
      <div className="sc-track">
        {[...videos, ...videos].map((src, i) => (
          <VideoCard key={i} src={src} label={label} onClick={() => handleCardClick(src)} />
        ))}
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
