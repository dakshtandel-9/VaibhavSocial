'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

const VIDEOS = [
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060187/010_q2pgb5.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060174/01_zwpokk.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060173/03_ex2aox.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060172/05_foga6w.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060170/02_efrskn.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060168/04_juzngp.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060164/08_jdqd3e.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060164/06_tiyuqc.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060163/07_tynqjg.mp4",
  "https://res.cloudinary.com/dlk0wvka6/video/upload/v1776060155/09_n7ffgg.mp4",
];

const N = VIDEOS.length;
const WINDOW_SIZE = 6; // cards rendered on each side
const AUTO_SCROLL_INTERVAL = 1800;

function getCardDimensions(containerW: number) {
  if (containerW < 400) return { CARD_W: 110, CARD_H: 195, GAP: 10 };
  if (containerW < 600) return { CARD_W: 130, CARD_H: 230, GAP: 12 };
  if (containerW < 900) return { CARD_W: 155, CARD_H: 275, GAP: 14 };
  return { CARD_W: 180, CARD_H: 320, GAP: 16 };
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function VideoArcGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(600);
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const startX = useRef(0);

  // Measure the actual rendered container width
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    setContainerW(containerRef.current.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const { CARD_W, CARD_H, GAP } = getCardDimensions(containerW);
  const ITEM_W = CARD_W + GAP;

  // Center the active card in the measured container
  const centerOffset = containerW / 2 - CARD_W / 2;
  const baseTranslate = centerOffset - virtualIndex * ITEM_W - dragDelta;

  const goTo = useCallback((v: number) => {
    setVirtualIndex(v);
    setDragDelta(0);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isDragging || isHovered) return;
    const id = setInterval(() => setVirtualIndex(v => v + 1), AUTO_SCROLL_INTERVAL);
    return () => clearInterval(id);
  }, [isDragging, isHovered]);

  // Mouse handlers
  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); startX.current = e.clientX; };
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; setDragDelta(startX.current - e.clientX); };
  const onMouseUp   = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = startX.current - e.clientX;
    Math.abs(delta) > 40 ? goTo(delta > 0 ? virtualIndex + 1 : virtualIndex - 1) : setDragDelta(0);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => { setIsDragging(true); startX.current = e.touches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => { setDragDelta(startX.current - e.touches[0].clientX); };
  const onTouchEnd   = (e: React.TouchEvent) => {
    setIsDragging(false);
    const delta = startX.current - e.changedTouches[0].clientX;
    Math.abs(delta) > 40 ? goTo(delta > 0 ? virtualIndex + 1 : virtualIndex - 1) : setDragDelta(0);
  };

  const cards = Array.from({ length: WINDOW_SIZE * 2 + 1 }, (_, k) => virtualIndex - WINDOW_SIZE + k);

  return (
    <div
      ref={containerRef}
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
        onMouseLeave={(e) => { onMouseUp(e); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Cards layer */}
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
            const scale   = isActive ? 1.08 : dist === 1 ? 0.93 : 0.86;
            const rotY    = vIdx < virtualIndex ? 8 : vIdx > virtualIndex ? -8 : 0;
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
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '15%', minWidth: '60px',
          background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '15%', minWidth: '60px',
          background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none', zIndex: 2,
        }} />
        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '10%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none', zIndex: 3,
        }} />
      </div>
    </div>
  );
}
