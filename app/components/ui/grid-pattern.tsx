"use client";

import { useId } from "react";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  strokeColor?: string;
  opacity?: number;
}

export function GridPattern({
  width = 30,
  height = 30,
  x = -1,
  y = -1,
  strokeDasharray = "4 2",
  strokeColor = "rgba(180,180,180,0.45)",
  opacity = 1,
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        // Radial gradient mask: visible in center, fades to transparent at edges
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, white 30%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, white 30%, transparent 100%)",
        zIndex: 0,
      }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke={strokeColor}
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}
