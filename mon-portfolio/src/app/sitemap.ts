import type { MetadataRoute } from "next";

import { site } from "@/data/profile";
import { localeLabels, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `${site.url}/${l}`]));

  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "fr" ? 1 : 0.8,
    alternates: { languages },
  }));
}
