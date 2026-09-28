export const locales = ["fr", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  fr: { short: "FR", name: "Français", htmlLang: "fr", og: "fr_FR" },
  en: { short: "EN", name: "English", htmlLang: "en", og: "en_US" },
  ja: { short: "JA", name: "日本語", htmlLang: "ja", og: "ja_JP" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
