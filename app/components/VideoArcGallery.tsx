'use client';

import { useRef, useState, useEffect } from 'react';

const VIDEOS = [
  "/heroVideos/01.mp4",
  "/heroVideos/02.mp4",
  "/heroVideos/03.mp4",
  "/heroVideos/04.mp4",
  "/heroVideos/05.mp4",
  "/heroVideos/06.mp4",
  "/heroVideos/07.mp4",
  "/heroVideos/08.mp4",
  "/heroVideos/09.mp4",
  "/heroVideos/010.mp4",
];

const N = VIDEOS.length;
const CARD_W = 180;
const CARD_H = 320;
const GAP = 16;
const ITEM_W = CARD_W + GAP;
// How many cards to render on each side of the active card
const WINDOW = 6;
const AUTO_SCROLL_INTERVAL = 1800; // ms

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function VideoArcGallery() {
  // virtualIndex is unbounded — never wraps, so animation always moves in one direction
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const startX = useRef(0);

  const goTo = (v: number) => {
    setVirtualIndex(v);
    setDragDelta(0);
  };

  useEffect(() => {
    if (isDragging || isHovered) return;
    const interval = setInterval(() => {
      setVirtualIndex((v) => v + 1);
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isDragging, isHovered]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragDelta(startX.current - e.clientX);
  };
  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = startX.current - e.clientX;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0 ? virtualIndex + 1 : virtualIndex - 1);
    } else {
      setDragDelta(0);
    }
  };
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setDragDelta(startX.current - e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    setIsDragging(false);
    const delta = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      goTo(delta > 0 ? virtualIndex + 1 : virtualIndex - 1);
    } else {
      setDragDelta(0);
    }
  };

  // Build the list of virtual card indices to render
  const cards = Array.from({ length: WINDOW * 2 + 1 }, (_, k) => virtualIndex - WINDOW + k);

  // Center offset: how much to shift so the active card is in the center
  const centerOffset = typeof window !== 'undefined' ? window.innerWidth / 2 - CARD_W / 2 : 600;
  const baseTranslate = centerOffset - virtualIndex * ITEM_W - dragDelta;

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: '1.5rem 0 2rem',
        userSelect: 'none',
      }}
    >
      {/* Slider track */}
      <div
        style={{ position: 'relative', height: `${CARD_H + 60}px`, overflow: 'hidden' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={(e) => {
          onMouseUp(e);
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 0,
            width: '100%',
            height: `${CARD_H}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {cards.map((vIdx) => {
            const videoSrc = VIDEOS[mod(vIdx, N)];
            const isActive = vIdx === virtualIndex;
            const dist = Math.abs(vIdx - virtualIndex);
            const scale = isActive ? 1.08 : dist === 1 ? 0.93 : 0.86;
            const rotY = vIdx < virtualIndex ? 8 : vIdx > virtualIndex ? -8 : 0;
            const opacity = dist > 4 ? 0 : dist === 4 ? 0.2 : dist === 3 ? 0.45 : dist === 2 ? 0.7 : 1;
            const x = baseTranslate + vIdx * ITEM_W;

            return (
              <div
                key={vIdx}
                onClick={() => !isDragging && goTo(vIdx)}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: `${CARD_W}px`,
                  height: `${CARD_H}px`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
                  border: '2px solid rgba(255,255,255,0.08)',
                  transform: `translateX(${x}px) scale(${scale}) perspective(800px) rotateY(${rotY}deg)`,
                  transformOrigin: 'center center',
                  transition: isDragging
                    ? 'opacity 0.2s, transform 0.05s'
                    : 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, border-color 0.4s ease, opacity 0.4s ease',
                  opacity,
                  cursor: 'pointer',
                  willChange: 'transform',
                }}
              >
                <video
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                />
              </div>
            );
          })}
        </div>

        {/* Edge fade gradients */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '140px',
          background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '140px',
          background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Top fade with blur */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '10%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />
        {/* Bottom fade with blur */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />
      </div>

    </div>
  );
}
