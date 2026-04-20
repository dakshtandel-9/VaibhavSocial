'use client';

import { useEffect, useState } from 'react';

const SAFETY_TIMEOUT = 10_000;
const MIN_SHOW = 700;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startedAt = Date.now();
    let cancelled = false;

    function dismiss() {
      if (cancelled) return;
      cancelled = true;
      const elapsed = Date.now() - startedAt;
      const delay = Math.max(0, MIN_SHOW - elapsed);
      setTimeout(() => {
        setFading(true);
        setTimeout(() => setVisible(false), 700);
      }, delay);
    }

    function waitForMedia() {
      const images = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
      const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video'));
      const total = images.length + videos.length;
      if (total === 0) { dismiss(); return; }
      let loaded = 0;
      function tick() { if (++loaded >= total) dismiss(); }
      images.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) tick();
        else {
          img.addEventListener('load', tick, { once: true });
          img.addEventListener('error', tick, { once: true });
        }
      });
      videos.forEach((vid) => {
        if (vid.readyState >= 2) tick();
        else {
          vid.addEventListener('loadeddata', tick, { once: true });
          vid.addEventListener('error', tick, { once: true });
        }
      });
    }

    const safety = setTimeout(dismiss, SAFETY_TIMEOUT);
    if (document.readyState === 'complete') waitForMedia();
    else window.addEventListener('load', waitForMedia, { once: true });

    return () => { cancelled = true; clearTimeout(safety); };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes vk-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.7s ease',
          opacity: fading ? 0 : 1,
          pointerEvents: fading ? 'none' : 'auto',
        }}
      >
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          {/* Track ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '4px solid rgba(255, 107, 0, 0.12)',
            }}
          />
          {/* Spinning arc */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#FF6B00',
              borderRightColor: 'rgba(255,107,0,0.4)',
              animation: 'vk-spin 0.8s cubic-bezier(0.6,0.2,0.4,0.8) infinite',
            }}
          />

        </div>
      </div>
    </>
  );
}
