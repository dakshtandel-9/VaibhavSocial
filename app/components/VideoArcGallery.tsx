'use client';

import { useRef, useState, useEffect } from 'react';
import { videoPoster } from '../../lib/videoPoster';

const WINDOW_SIZE = 6;
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

export default function VideoArcGallery({ videos: videosProp }: { videos?: string[] }) {
  const VIDEOS = videosProp?.filter(Boolean) ?? [];
  const N = VIDEOS.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(600);
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => setContainerW(entry.contentRect.width));
    ro.observe(containerRef.current);
    setContainerW(containerRef.current.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const { CARD_W, CARD_H, GAP } = getCardDimensions(containerW);
  const ITEM_W = CARD_W + GAP;
  const centerOffset = containerW / 2 - CARD_W / 2;
  const baseTranslate = centerOffset - virtualIndex * ITEM_W;

  useEffect(() => {
    if (isHovered || N === 0) return;
    const id = setInterval(() => setVirtualIndex(v => v + 1), AUTO_SCROLL_INTERVAL);
    return () => clearInterval(id);
  }, [isHovered, N]);

  if (N === 0) return null;

  const cards = Array.from({ length: WINDOW_SIZE * 2 + 1 }, (_, k) => virtualIndex - WINDOW_SIZE + k);

  return (
    <>
      <div
        ref={containerRef}
        style={{ width: '100%', position: 'relative', overflow: 'hidden', padding: '1.5rem 0 2rem', userSelect: 'none', touchAction: 'pan-y' }}
      >
        <div
          style={{ position: 'relative', height: `${CARD_H + 60}px`, overflow: 'hidden' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: '100%', height: `${CARD_H}px` }}>
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
                  onClick={() => { if (isActive) setModalSrc(videoSrc); }}
                  style={{
                    position: 'absolute', left: 0, top: 0,
                    width: `${CARD_W}px`, height: `${CARD_H}px`,
                    borderRadius: '20px', overflow: 'hidden',
                    boxShadow: isActive ? '0 12px 40px rgba(0,0,0,0.28)' : '0 8px 28px rgba(0,0,0,0.16)',
                    border: isActive ? '2px solid rgba(255,107,0,0.5)' : '2px solid rgba(255,255,255,0.08)',
                    transform: `translateX(${x}px) scale(${scale}) perspective(800px) rotateY(${rotY}deg)`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, border-color 0.4s ease, opacity 0.4s ease',
                    opacity, cursor: isActive ? 'pointer' : 'default', willChange: 'transform',
                    background: '#1a1a1a',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* Static image thumbnail — mp4 only loads when modal opens */}
                  <img
                    src={videoPoster(videoSrc)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                  />


                  {/* Play button overlay — only on center card */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: 8,
                      background: 'rgba(0,0,0,0.28)', pointerEvents: 'none',
                    }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: 'rgba(255,107,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(255,107,0,0.4)',
                      }}>
                        <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Play</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Edge fades */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '15%', minWidth: 60, background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '15%', minWidth: 60, background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))', pointerEvents: 'none', zIndex: 2 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10%', background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))', pointerEvents: 'none', zIndex: 3 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%', background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))', pointerEvents: 'none', zIndex: 3 }} />
        </div>
      </div>

      {/* Modal — video only loads when opened */}
      {modalSrc && (
        <div
          onClick={() => setModalSrc(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', borderRadius: 16, overflow: 'hidden' }}>
            <button
              onClick={() => setModalSrc(null)}
              style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>
            <video
              src={modalSrc}
              controls
              autoPlay
              playsInline
              style={{ display: 'block', maxWidth: '90vw', maxHeight: '90vh', background: '#000' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
