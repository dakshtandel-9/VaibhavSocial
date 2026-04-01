'use client';

import { useEffect, useRef } from 'react';

const VIDEOS = [
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m366/AQNWK5W9TraEz2gq-9Ng2nDLb96t-YUhZ3w9bhNCuuJr3mh41QLDsK2Rviw4wNodk0JmOLDJza35OXu3oYaZtKgex1ARLS0VEoN98dg.mp4?_nc_cat=100&_nc_oc=Adq3pFEMzpLttd-6td0URUbErHmPTMfRWtxV3lSYyahcNTANaMsfvW4VZNTxUpgShUQ&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_ohc=jRwM5iUd0xsQ7kNvwG7Crgf&efg=eyJ2ZW5jb2RlX3RhZyI6ImlnLXhwdmRzLmNsaXBzLmMxLUMzLmRhc2hfcjJldmV2cDktcjFnZW4ydnA5X3E5MCIsInZpZGVvX2lkIjpudWxsLCJvaWxfdXJsZ2VuX2FwcF9pZCI6OTM2NjE5NzQzMzkyNDU5LCJjbGllbnRfbmFtZSI6ImlnIiwieHB2X2Fzc2V0X2lkIjoxNzg4MDczMDQ3NjUxMDg0NywiYXNzZXRfYWdlX2RheXMiOjcsInZpX3VzZWNhc2VfaWQiOjEwMDk5LCJkdXJhdGlvbl9zIjo0OCwiYml0cmF0ZSI6MTU1OTUzMiwidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=17-1&oh=00_Af1QtSrmhYWfShgF_KCKaMkV_5Arqoog_K5JKVsLiOoXXw&oe=69D2D099",
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQN9h9oBeyKmZqqgM3pGAa0dzgVx8cFSSlWFa5ETINOwrhxSfYJvUus5bmMRdzF6loceIvvuGXrNtHsl_YdQ33i8gx83xVluS1xl4PwxHqP_KQ.mp4?_nc_cat=100&_nc_oc=AdoK9RuZHFZR7Kxk51m_uFKcChelvn_CtBZBty7-eqeqpNddiBOqca1lRt4igEa50i8&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&_nc_ohc=2Q-Q7PwrFmcQ7kNvwEHNK_x&ccb=17-1&oh=00_Af1RJMXePDzNe2lTYAg6PyBuInrMaFc3dxfIhtjnzjTOiQ&oe=69D2D6F0",
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQMIcQud1PxwQC9CABLZqaYHS1i4pfgOq1tUxihw0fZWpu0gyDyeHqhQf8hwsmRQMBR92JTJRettP7AtbZsXqDjyiIr7z3gA0buSLCLbpaXPiA.mp4?_nc_cat=108&_nc_oc=AdrSwowtMMH2QLlCiskwjM44dR9fDNs-ciHfwnXDGaliXUYBQXLahi-1dHfhxNm8E0c&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&ccb=17-1&oh=00_Af2GupUNCukb-CWsEW-UOfi7T0M0lDn7fZ3JGUTPRsf2ew&oe=69D2D2FC",
  "https://instagram.fbom12-2.fna.fbcdn.net/o1/v/t2/f2/m367/AQPnA6S3uS0P_RM53FccgoillvMebwHmnRDzSjVCbNxts4qPt_7GXSAeTDZD7S8hPf2MOrW66D1gzIfeLOOVz7dP7rXwk-2zmoqD0kc.mp4?_nc_cat=106&_nc_oc=Adr96a1SDSQ5WFsi5qgKOmWDBFUGOs3-85OfrYAJY7mVi9FbErcJ4hMb1-YB_Az0zcY&_nc_sid=9ca052&_nc_ht=instagram.fbom12-2.fna.fbcdn.net&ccb=17-1&oh=00_Af3cfk5tjsARRzAyuB0EO-HI4FBKmEoAt94_QfCOQvzbcg&oe=69D2C71F",
  "https://instagram.fbom12-2.fna.fbcdn.net/o1/v/t2/f2/m367/AQP1ryEp7XUOXeOgaWW_3EEh-VCuESvyAIf-cB13QSuR4lVDfSa8kg3cr8YX60rH6HQIxJ3KDiZSC_pEHiXPsGFfnq1d06A3uA4NNaqdZTdIEg.mp4?_nc_cat=109&_nc_oc=AdoGtL7rrcitBgKqm48xyLgeI1RcnItTnkjowhqiUNDj0XZGuT5RYKwaVpWcAhcm7lo&_nc_sid=9ca052&_nc_ht=instagram.fbom12-2.fna.fbcdn.net&ccb=17-1&oh=00_Af3-vwYmVDQuDeCakOEhnkJiYTEhNwoK87WOY5pQIRolnw&oe=69D2EF97",
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQOBrubI6kAX8wdUSbWKUZWTlSyHu3mZgpmoknI3pm5FpPvquqyozx_ck8C8W-uZRkmzXDQF1w3QIgKkrwPg9IobI20ypo0aaHj-xoCpWcprUA.mp4?_nc_cat=101&_nc_oc=AdrVTSrcS4euBnptDMtBOVUf08GFiE7LDXRD3yV-SSIB4CIO2-jx8iAeAHobSWeVxsU&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&ccb=17-1&oh=00_Af37uZJLPFAi6KvQOSuckinihhczk3FOFMKpzDEe7JxVZg&oe=69D2D883",
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQOmp59UYJ770L9jBV6otIt-7--iu35zGVvVh6wVtqsgV33TkmJ11CigHIoLDFd6D0dzQKYPJ9TBwPxT49vltf4rcFy3ommYfIom7LQ.mp4?_nc_cat=102&_nc_oc=AdrwUBLGVFqnoSdwrwpU3WEqelyvSDeh8N0zmar_vSFqGXVgShmVflJIm-LW4Pv_awE&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&ccb=17-1&oh=00_Af3C6Y6E_WOCKSIo4Wtefn0akp_Uy0Aql4DThQmjJBdxqA&oe=69D2EB9F",
  "https://instagram.fbom12-2.fna.fbcdn.net/o1/v/t2/f2/m367/AQOQKW-SQ67Kw4l2DTBGyiJ8Z5behwwC4CVhduysrWdkn0UxzfoH5PI4lKgssVsIQ8204LVyUxzBeik8kf0XE4MbFD32bcnbs2Qc6tYsu5YWHw.mp4?_nc_cat=109&_nc_oc=AdpfbvwXCRvhsoSvq7AayMGWmAE8xsKJeHQ9v5pZJk89Ho0Z0tFCZITaCEs7gSDtPxE&_nc_sid=9ca052&_nc_ht=instagram.fbom12-2.fna.fbcdn.net&ccb=17-1&oh=00_Af1SXL90FHcCvBf7jKZZpQkarlJsNyKhlIMW3lqsPf0NxQ&oe=69D2F053",
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQNwLQ19c0lG5kSfr4hdYqZmbZUYc1fPCC27xJcuTd1-UsCwCykgYq0zqI4QCI-ZSoFkTlqRL7INcAHIHg3RZOfJfFhPAbM67-g4_k8Y-W_lhQ.mp4?_nc_cat=100&_nc_oc=AdreyuaDBVPiDo9kP4XiCdne7rHr875-VEyrtH8uc5HUmoMMiNwkXgaodYZEODk7c-g&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&ccb=17-1&oh=00_Af1-zS_JZ0R8PXzhxku2w4r6uahcsDSkTOpGiVfFgXhizQ&oe=69D2D14C",
  "https://instagram.fbom12-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQOETx4QhP3ZN384ZXrM4FZRVuF6Osrcgm-NFubji7enPMyCbqa-n6Gjc1GeLZLvIua_y1Zphb3TJ0sxIu4ta6-rMHDr_jQXmPDQX_alMRbxHg.mp4?_nc_cat=108&_nc_oc=AdrYoFXVxgTgQ7IxPT4weVJ2zShWLgMlkya-gEdDtSCFcJtUQuwWve5Jwyi2k9YA0mA&_nc_sid=9ca052&_nc_ht=instagram.fbom12-1.fna.fbcdn.net&ccb=17-1&oh=00_Af0p4og8bOhN06ahsnVv_ASH-6cmNSYsPkqVY2Zhy2z5gQ&oe=69D2C7C8",
];

const CARD_W = 200;
const CARD_H = 356;
const GAP = 20;
const ITEM_W = CARD_W + GAP;
const BEND = 90;

export default function VideoArcGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const targetPos = useRef(0);
  const isDown = useRef(false);
  const startX = useRef(0);
  const startTarget = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const N = VIDEOS.length;
    const totalW = ITEM_W * N;
    let raf: number;

    function tick() {
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.08;

      const W = wrapper!.offsetWidth;
      const halfW = W / 2;
      const R = (halfW * halfW + BEND * BEND) / (2 * BEND);
      const s = ((scrollPos.current % totalW) + totalW) % totalW;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        let rawX = i * ITEM_W - s;
        if (rawX < -CARD_W - 10) rawX += totalW;
        if (rawX > W + 10) rawX -= totalW;

        const screenX = rawX - halfW + CARD_W / 2;
        const absX = Math.min(Math.abs(screenX), halfW);
        const arc = R - Math.sqrt(Math.max(0, R * R - absX * absX));
        const rotY = Math.sign(screenX) * Math.asin(Math.min(absX / R, 1)) * (180 / Math.PI);

        card.style.transform = `translateX(${rawX}px) translateY(${-arc}px) rotateY(${rotY}deg)`;
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    const onMouseDown = (e: MouseEvent) => {
      isDown.current = true;
      startX.current = e.clientX;
      startTarget.current = targetPos.current;
      wrapper.style.cursor = 'grabbing';
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      targetPos.current = startTarget.current - (e.clientX - startX.current);
    };
    const onMouseUp = () => { isDown.current = false; wrapper.style.cursor = 'grab'; };
    const onWheel = (e: WheelEvent) => { targetPos.current += e.deltaY * 0.6; };
    const onTouchStart = (e: TouchEvent) => {
      isDown.current = true;
      startX.current = e.touches[0].clientX;
      startTarget.current = targetPos.current;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDown.current) return;
      targetPos.current = startTarget.current - (e.touches[0].clientX - startX.current);
    };
    const onTouchEnd = () => { isDown.current = false; };

    wrapper.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    wrapper.addEventListener('wheel', onWheel, { passive: true });
    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true });
    wrapper.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      wrapper.removeEventListener('wheel', onWheel);
      wrapper.removeEventListener('touchstart', onTouchStart);
      wrapper.removeEventListener('touchmove', onTouchMove);
      wrapper.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        height: '420px',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1200px',
        cursor: 'grab',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%',
          height: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {VIDEOS.map((src, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              top: `-${CARD_H / 2}px`,
              left: 0,
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.28)',
              willChange: 'transform',
            }}
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
