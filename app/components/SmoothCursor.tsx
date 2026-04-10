"use client";

import React, { useEffect, useRef } from "react";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

function DefaultCursorSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="white"
      stroke="rgba(0,0,0,0.5)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    >
      <path d="M5.5 2 L5.5 22 L10 17.5 L13.5 26 L16 25 L12.5 16.5 L19 16.5 Z" />
    </svg>
  );
}

interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: SpringConfig;
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = defaultSpringConfig,
}: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  // All mutable state is stored in refs — avoids React re-renders causing effect teardown
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only activate on pointer devices (not touch-only)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const el = cursorRef.current;
    if (!el) return;

    const { damping, stiffness, mass, restDelta } = springConfig;

    function setVisible(v: boolean) {
      if (isVisibleRef.current === v) return;
      isVisibleRef.current = v;
      if (el) el.style.opacity = v ? "1" : "0";
    }

    function animate() {
      const target = targetRef.current;
      const pos = posRef.current;
      const vel = velRef.current;

      const dx = target.x - pos.x;
      const dy = target.y - pos.y;

      // Spring physics: a = (k*x - d*v) / m
      const dt = 1 / 60;
      const ax = (stiffness * dx - damping * vel.x) / mass;
      const ay = (stiffness * dy - damping * vel.y) / mass;

      vel.x += ax * dt;
      vel.y += ay * dt;
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      // Rotation based on movement direction
      const moveDx = pos.x - lastPosRef.current.x;
      const moveDy = pos.y - lastPosRef.current.y;
      const speed = Math.sqrt(moveDx * moveDx + moveDy * moveDy);

      if (speed > 0.1) {
        const targetAngle = Math.atan2(moveDy, moveDx) * (180 / Math.PI) + 90;
        const angleDiff = ((targetAngle - rotationRef.current + 540) % 360) - 180;
        rotationRef.current += angleDiff * 0.12;
      } else {
        rotationRef.current += (0 - rotationRef.current) * 0.05;
      }

      lastPosRef.current = { x: pos.x, y: pos.y };

      if (el) {
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${rotationRef.current}deg)`;
      }

      const settled =
        Math.abs(dx) < restDelta &&
        Math.abs(dy) < restDelta &&
        Math.abs(vel.x) < restDelta &&
        Math.abs(vel.y) < restDelta;

      rafRef.current = settled ? null : requestAnimationFrame(animate);
    }

    function startRaf() {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function onMouseMove(e: MouseEvent) {
      // On very first move, snap position to cursor so it doesn't fly from 0,0
      if (!isVisibleRef.current) {
        posRef.current = { x: e.clientX, y: e.clientY };
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        velRef.current = { x: 0, y: 0 };
      }
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      startRaf();
    }

    function onMouseLeave() {
      setVisible(false);
    }

    function onMouseEnter() {
      setVisible(true);
    }

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // springConfig values are primitives — safe to include
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 999999,
        opacity: 0, // starts hidden; shown via ref on first mouse move
        transition: "opacity 0.25s ease",
        willChange: "transform",
      }}
    >
      {cursor}
    </div>
  );
}
