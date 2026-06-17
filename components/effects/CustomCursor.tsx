"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Detect touch device on mount
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  const isInteractive = useCallback((el: HTMLElement | null): boolean => {
    if (!el) return false;
    const tag = el.tagName.toLowerCase();
    if (tag === "a" || tag === "button" || tag === "input" || tag === "textarea" || tag === "select") return true;
    if (el.getAttribute("role") === "button") return true;
    if (el.dataset.cursor === "pointer") return true;
    const style = window.getComputedStyle(el);
    if (style.cursor === "pointer") return true;
    // Walk up the tree (max 5 levels)
    if (el.parentElement && el !== document.body) {
      const parent = el.closest("a, button, [role='button'], [data-cursor='pointer']");
      if (parent) return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Update dot position immediately (snappy)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover state
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      setIsHovering(el ? isInteractive(el) : false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Animate ring with lerp
    let raf: number;
    const animateRing = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isTouchDevice, isVisible, isInteractive]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Dot - follows mouse exactly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          marginLeft: isHovering ? "-6px" : "-4px",
          marginTop: isHovering ? "-6px" : "-4px",
          backgroundColor: isHovering ? "rgb(139, 92, 246)" : "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: "difference",
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease, background-color 0.2s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Ring - follows with lerp delay */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "50px" : "40px",
          height: isHovering ? "50px" : "40px",
          marginLeft: isHovering ? "-25px" : "-20px",
          marginTop: isHovering ? "-25px" : "-20px",
          border: isHovering
            ? "1.5px solid rgba(139, 92, 246, 0.6)"
            : "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          mixBlendMode: "difference",
          transition: "width 0.3s ease, height 0.3s ease, margin 0.3s ease, border 0.3s ease, opacity 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Hide native cursor on desktop */}
      <style>{`
        @media (min-width: 768px) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
