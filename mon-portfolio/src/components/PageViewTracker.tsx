"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/config";

/** Sends one anonymous page view per visit of a language page (no cookies, no personal data). */
export function PageViewTracker({ lang }: { lang: Locale }) {
  useEffect(() => {
    const key = `pv:${lang}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: count anyway */
    }
    const payload = JSON.stringify({ path: location.pathname, lang, referrer: document.referrer });
    if (!navigator.sendBeacon?.("/api/track", new Blob([payload], { type: "application/json" }))) {
      void fetch("/api/track", { method: "POST", body: payload, keepalive: true, headers: { "Content-Type": "application/json" } });
    }
  }, [lang]);

  return null;
}
