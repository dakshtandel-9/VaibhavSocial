'use client';

import { useEffect, useState } from 'react';

const SAFETY_TIMEOUT = 10_000; // never block longer than 10s
const MIN_SHOW = 600;          // always show for at least 600ms so it doesn't flash

export default function PageLoader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    let cancelled = false;

    function dismiss() {
      if (cancelled) return;
      cancelled = true;
      setProgress(100);

      // Honour minimum display time
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, MIN_SHOW - elapsed);

      setTimeout(() => {
        setPhase('fading');
        setTimeout(() => setPhase('gone'), 700);
      }, delay);
    }

    function waitForMedia() {
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
      const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video'));
      const total  = images.length + videos.length;

      if (total === 0) { dismiss(); return; }

      let loaded = 0;

      function tick() {
        loaded++;
        if (!cancelled) setProgress(Math.round((loaded / total) * 100));
        if (loaded >= total) dismiss();
      }

      // ── Images ──────────────────────────────────
      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          tick();
        } else {
          img.addEventListener('load',  tick, { once: true });
          img.addEventListener('error', tick, { once: true }); // count errors too so we never hang
        }
      });

      // ── Videos ──────────────────────────────────
      // readyState >= 2 means the browser has enough data to play the current frame
      videos.forEach((vid) => {
        if (vid.readyState >= 2) {
          tick();
        } else {
          vid.addEventListener('loadeddata', tick, { once: true });
          vid.addEventListener('error',      tick, { once: true });
        }
      });
    }

    // Safety net — never block forever
    const safety = setTimeout(dismiss, SAFETY_TIMEOUT);

    if (document.readyState === 'complete') {
      waitForMedia();
    } else {
      window.addEventListener('load', waitForMedia, { once: true });
    }

    return () => {
      cancelled = true;
      clearTimeout(safety);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        transition: 'opacity 0.7s ease, visibility 0.7s ease',
        opacity: phase === 'fading' ? 0 : 1,
        visibility: phase === 'fading' ? 'hidden' : 'visible',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Logo wordmark */}
      <span
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
          fontWeight: 800,
          color: '#FF6B00',
          letterSpacing: '-1px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        VK
      </span>

      {/* Progress bar track */}
      <div
        style={{
          width: 160,
          height: 3,
          borderRadius: 99,
          background: 'rgba(255,107,0,0.15)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Filled portion — driven by real progress */}
        <div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #FF6B00, #FF9A4D)',
            borderRadius: 99,
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      {/* Percentage label */}
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'rgba(255,107,0,0.6)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: '0.5px',
        }}
      >
        {progress}%
      </span>
    </div>
  );
}
