/**
 * Language-independent site settings (contacts, social links, media…).
 * Stored as one JSON row in Supabase (`site_settings`) and editable from the back office.
 * This module must stay free of image imports so it can also run in plain Node (seed script).
 */

export type SocialId = "linkedin" | "x" | "facebook" | "mail";

export type ImageFit = "cover" | "contain";

export interface SocialLink {
  id: Exclude<SocialId, "mail">;
  label: string;
  href: string;
}

export interface ProjectMedia {
  /** Public URL of an uploaded image; null keeps the bundled default image. */
  image: string | null;
  fit: ImageFit;
  href: string;
}

export interface SiteSettings {
  name: string;
  emails: string[];
  phone: string;
  city: string;
  /** Shows the green “available for new assignments” badge in the hero. */
  available: boolean;
  socials: SocialLink[];
  /** Institutions scrolling under the hero. */
  partners: string[];
  media: {
    heroPhoto: string | null;
    aboutPhoto: string | null;
    cv: string | null;
  };
  projects: Record<string, ProjectMedia>;
}

export const defaultSettings: SiteSettings = {
  name: "Maliki Otieboame Djandjieme",
  emails: ["djandjiememaliki@yahoo.com", "kdjandjieme@gmail.com"],
  phone: "+225 07 89 92 97 61",
  city: "Abidjan, Côte d'Ivoire",
  available: true,
  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/djandjieme-maliki-otieboame-a50798b0" },
    { id: "x", label: "X (Twitter)", href: "https://x.com/DjandjiemeM" },
    { id: "facebook", label: "Facebook", href: "https://web.facebook.com/malikiotieboame" },
  ],
  partners: ["JICA", "Yokohama National University", "2iE", "JGS", "JSCE", "ONIT Togo", "UEMOA", "TICAD 7", "Elsevier"],
  media: { heroPhoto: null, aboutPhoto: null, cv: null },
  projects: {
    cacao: {
      image: null,
      fit: "cover",
      href: "https://news.abidjan.net/articles/725209/cote-divoire-la-mobilisation-de-plus-de-4800-milliards-de-fcfa-pour-les-projets-prioritaires-du-plan-directeur-de-lamenagement-des-corridors-pour-lanneau-de-croissance-en-afrique-de-louest-cacao-au-centre-dune-mission",
    },
    "rural-roads": { image: null, fit: "cover", href: "" },
    kangounou: { image: null, fit: "contain", href: "" },
    "urban-roads": { image: null, fit: "cover", href: "" },
    laterite: { image: null, fit: "contain", href: "" },
    phd: { image: null, fit: "contain", href: "https://doi.org/10.1016/j.conbuildmat.2022.127849" },
    liquefaction: { image: null, fit: "contain", href: "" },
  },
};

/** Social links plus the e-mail shortcut used by the header, hero and footer. */
export function socialLinks(settings: SiteSettings): { id: SocialId; label: string; href: string }[] {
  const mail = settings.emails[0];
  return [...settings.socials, ...(mail ? [{ id: "mail" as const, label: "E-mail", href: `mailto:${mail}` }] : [])];
}

/** `tel:` link from a human-formatted phone number. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
