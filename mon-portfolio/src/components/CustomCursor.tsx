"use client";

import { useEffect, useRef } from "react";

/** The template's "magic cursor": a white dot in difference blend mode that grows over links. */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

    let x = 0;
    let y = 0;
    let frame = 0;
    const render = () => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = 0;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      cursor.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element | null)?.closest("a, button, input, select, textarea, label");
      cursor.dataset.active = interactive ? "true" : "false";
    };
    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden size-5 rounded-full bg-white opacity-0 mix-blend-difference transition-[width,height,opacity] duration-200 data-[active=true]:size-[70px] pointer-fine:block"
    />
  );
}
