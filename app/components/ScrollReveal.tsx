"use client";

import { useEffect, useRef, CSSProperties } from "react";

interface ScrollRevealProps {
  children: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  /** Font size for the text block, e.g. "clamp(1.4rem, 3vw, 2rem)" */
  textSize?: string;
  /** CSS color for the text */
  textColor?: string;
  /** Additional class name for the container */
  className?: string;
}

export default function ScrollReveal({
  children,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
  textSize = "clamp(1.4rem, 3vw, 2rem)",
  textColor = "inherit",
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Split the text into individual word spans
  const words = children.trim().split(/\s+/);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = Array.from(
      container.querySelectorAll<HTMLSpanElement>("span[data-word]")
    );

    const onScroll = () => {
      const viewportHeight = window.innerHeight;

      spans.forEach((span, i) => {
        const rect = span.getBoundingClientRect();
        // Progress: 0 when just entering from bottom, 1 when at 30% from top
        const start = viewportHeight * 0.95;
        const end = viewportHeight * 0.3;
        const progress = Math.min(
          1,
          Math.max(0, (start - rect.top) / (start - end))
        );

        const opacity = baseOpacity + (1 - baseOpacity) * progress;
        const rotation = baseRotation - baseRotation * progress;
        const blur = enableBlur
          ? blurStrength - blurStrength * progress
          : 0;

        span.style.opacity = String(opacity);
        span.style.transform = `rotateX(${rotation}deg)`;
        span.style.filter = `blur(${blur}px)`;
      });
    };

    // initial paint
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [baseOpacity, enableBlur, baseRotation, blurStrength]);

  const containerStyle: CSSProperties = {
    fontSize: textSize,
    color: textColor,
    lineHeight: 1.65,
    fontWeight: 600,
    perspective: "600px",
    display: "inline",
  };

  const wordStyle: CSSProperties = {
    display: "inline-block",
    opacity: baseOpacity,
    transform: `rotateX(${baseRotation}deg)`,
    filter: enableBlur ? `blur(${blurStrength}px)` : "none",
    transition: "opacity 0.05s linear, transform 0.05s linear, filter 0.05s linear",
    transformOrigin: "50% 100%",
    marginRight: "0.28em",
    willChange: "opacity, transform, filter",
  };

  return (
    <p ref={containerRef} className={className} style={containerStyle}>
      {words.map((word, i) => (
        <span key={i} data-word="true" style={wordStyle}>
          {word}
        </span>
      ))}
    </p>
  );
}
