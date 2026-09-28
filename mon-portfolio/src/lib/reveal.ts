import type { CSSProperties } from "react";

/** Staggers scroll-reveal animations (consumed by `[data-reveal]` in globals.css). */
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
