import "server-only";

import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr").then((m) => m.fr),
  en: () => import("./dictionaries/en").then((m) => m.en),
  ja: () => import("./dictionaries/ja").then((m) => m.ja),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
