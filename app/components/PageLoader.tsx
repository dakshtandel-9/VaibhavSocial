'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  useEffect(() => {
    const finish = () => {
      // Start fade-out
      setPhase('fading');
      // After transition ends, remove from DOM entirely
      const t = setTimeout(() => setPhase('gone'), 700);
      return t;
    };

    let timer: ReturnType<typeof setTimeout>;

    if (document.readyState === 'complete') {
      // Already loaded — still show a brief minimum so it doesn't flash
      timer = setTimeout(finish, 400);
    } else {
      window.addEventListener('load', () => {
        // Small buffer so the UI paints before we reveal
        timer = setTimeout(finish, 300);
      }, { once: true });

      // Safety net: never block more than 4 s
      const safetyTimer = setTimeout(finish, 4000);
      return () => {
        clearTimeout(timer);
        clearTimeout(safetyTimer);
      };
    }

    return () => clearTimeout(timer);
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
        VS
      </span>

      {/* Animated bar */}
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
        <div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            background: 'linear-gradient(90deg, #FF6B00, #FF9A4D)',
            borderRadius: 99,
            animation: 'loaderBar 1.4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes loaderBar {
          0%   { left: -60%; width: 60%; }
          50%  { left: 30%;  width: 70%; }
          100% { left: 110%; width: 60%; }
        }
      `}</style>
    </div>
  );
}
