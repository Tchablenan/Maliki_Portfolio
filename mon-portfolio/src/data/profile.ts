import type { StaticImageData } from "next/image";

import profile from "@/assets/images/profile.jpg";
import portrait from "@/assets/images/maliki.jpg";
import road from "@/assets/images/road.jpg";
import roadwork from "@/assets/images/roadwork.webp";
import foundation from "@/assets/images/foundation.webp";
import lab from "@/assets/images/lab.png";
import curves from "@/assets/images/test.gif";
import triaxial from "@/assets/images/triaxial.png";
import dam from "@/assets/images/dam.png";

/** Fixed facts that are not edited from the back office. */
export const site = {
  url: "https://maliki-portfolio-tchablenans-projects.vercel.app",
  /** Fallback when Supabase is not configured. */
  formEndpoint: "https://formspree.io/f/mwkzjrvd",
  defaultCv: "/cv/CV-Maliki-Djandjieme.pdf",
} as const;

/** Bundled images, used until a replacement is uploaded from the back office. */
export const defaultImages = { heroPhoto: profile, aboutPhoto: portrait };

export const defaultProjectImages: Record<string, StaticImageData> = {
  cacao: road,
  phd: triaxial,
  liquefaction: curves,
  "rural-roads": roadwork,
  kangounou: dam,
  laterite: lab,
  "urban-roads": foundation,
};

export type ServiceIcon = 1 | 2 | 3 | 4 | 5 | 6;
