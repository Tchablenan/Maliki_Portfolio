import type { StaticImageData } from "next/image";

import profile from "@/assets/images/profile.jpg";
import cutout from "@/assets/images/profile-cutout.png";
import portrait from "@/assets/images/maliki.jpg";
import road from "@/assets/images/road.jpg";
import roadwork from "@/assets/images/roadwork.webp";
import foundation from "@/assets/images/foundation.webp";
import lab from "@/assets/images/lab.png";
import curves from "@/assets/images/test.gif";
import triaxial from "@/assets/images/triaxial.png";
import dam from "@/assets/images/dam.png";

/** Language-independent facts: contacts, links and imagery. */
export const profileData = {
  name: "Maliki Otieboame Djandjieme",
  shortName: "Maliki",
  siteUrl: "https://maliki-portfolio-tchablenans-projects.vercel.app",
  emails: ["djandjiememaliki@yahoo.com", "kdjandjieme@gmail.com"],
  phone: { display: "+225 07 89 92 97 61", href: "tel:+2250789929761" },
  city: "Abidjan, Côte d'Ivoire",
  cv: "/cv/CV-Maliki-Djandjieme.pdf",
  formEndpoint: "https://formspree.io/f/mwkzjrvd",
  images: { profile, portrait, cutout },
} as const;

export type SocialId = "linkedin" | "x" | "facebook" | "mail";

export const socials: { id: SocialId; label: string; href: string }[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/djandjieme-maliki-otieboame-a50798b0" },
  { id: "x", label: "X (Twitter)", href: "https://x.com/DjandjiemeM" },
  { id: "facebook", label: "Facebook", href: "https://web.facebook.com/malikiotieboame" },
  { id: "mail", label: "E-mail", href: `mailto:${profileData.emails[0]}` },
];

/** Institutions shown in the scrolling band under the hero. */
export const partners = [
  "JICA",
  "Yokohama National University",
  "2iE",
  "JGS",
  "JSCE",
  "ONIT Togo",
  "UEMOA",
  "TICAD 7",
  "Elsevier",
];

export type ServiceIcon = 1 | 2 | 3 | 4 | 5 | 6;

export type ProjectId = "cacao" | "phd" | "liquefaction" | "rural-roads" | "kangounou" | "laterite" | "urban-roads";

export const projectVisuals: Record<ProjectId, { image: StaticImageData; fit: "cover" | "contain"; href?: string }> = {
  cacao: {
    image: road,
    fit: "cover",
    href: "https://news.abidjan.net/articles/725209/cote-divoire-la-mobilisation-de-plus-de-4800-milliards-de-fcfa-pour-les-projets-prioritaires-du-plan-directeur-de-lamenagement-des-corridors-pour-lanneau-de-croissance-en-afrique-de-louest-cacao-au-centre-dune-mission",
  },
  phd: { image: triaxial, fit: "contain", href: "https://doi.org/10.1016/j.conbuildmat.2022.127849" },
  liquefaction: { image: curves, fit: "contain" },
  "rural-roads": { image: roadwork, fit: "cover" },
  kangounou: { image: dam, fit: "contain" },
  laterite: { image: lab, fit: "contain" },
  "urban-roads": { image: foundation, fit: "cover" },
};
