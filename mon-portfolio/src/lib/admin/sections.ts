import type { Dictionary } from "@/i18n/types";

/** Content sections editable from the back office, each mapped to parts of the site dictionary. */
export const contentSections = {
  accueil: {
    title: "Accueil & À propos",
    description: "Le haut de page (hero), le bandeau des partenaires et la section « À propos ».",
    keys: ["hero", "partnersLabel", "about"],
  },
  services: {
    title: "Services",
    description: "La section sombre qui présente vos prestations.",
    keys: ["services"],
  },
  parcours: {
    title: "Parcours",
    description: "Votre expérience professionnelle, de la plus récente à la plus ancienne.",
    keys: ["experience"],
  },
  formation: {
    title: "Formation & compétences",
    description: "Diplômes, langues et logiciels.",
    keys: ["education"],
  },
  recherche: {
    title: "Recherche & distinctions",
    description: "Publications, distinctions, certifications et affiliations.",
    keys: ["research"],
  },
  contact: {
    title: "Contact & pied de page",
    description: "Les textes du formulaire de contact et du pied de page.",
    keys: ["contact", "footer"],
  },
  seo: {
    title: "Référencement & navigation",
    description: "Titre et description pour Google, menu, bandeau de mots-clés et page 404.",
    keys: ["meta", "nav", "marquee", "notFound"],
  },
} as const satisfies Record<string, { title: string; description: string; keys: readonly (keyof Dictionary)[] }>;

export type ContentSectionSlug = keyof typeof contentSections;

export function isContentSection(slug: string): slug is ContentSectionSlug {
  return slug in contentSections;
}
