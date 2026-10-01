import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DM_Sans, Marcellus, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

import { CustomCursor } from "@/components/CustomCursor";
import { RevealObserver } from "@/components/RevealObserver";
import { ThemeScript } from "@/components/ThemeScript";
import { defaultImages, site } from "@/data/profile";
import { hasLocale, localeLabels, locales } from "@/i18n/config";
import { getSiteContent, getSiteSettings } from "@/lib/site-data";

import "../globals.css";

const marcellus = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-marcellus" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
// Japanese glyphs are only downloaded when a page actually uses them.
const notoSerifJp = Noto_Serif_JP({ weight: "400", preload: false, variable: "--font-noto-serif-jp" });
const notoSansJp = Noto_Sans_JP({ preload: false, variable: "--font-noto-sans-jp" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const [dict, settings] = await Promise.all([getSiteContent(lang), getSiteSettings()]);
  const ogImage = settings.media.heroPhoto ?? defaultImages.heroPhoto.src;

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: settings.name }],
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `/${l}`])),
    },
    openGraph: {
      type: "profile",
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
      siteName: settings.name,
      locale: localeLabels[lang].og,
      images: [{ url: ogImage, alt: dict.hero.photoAlt }],
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
      creator: "@DjandjiemeM",
    },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const fontVariables = [marcellus.variable, dmSans.variable, notoSerifJp.variable, notoSansJp.variable].join(" ");

  return (
    <html lang={localeLabels[lang].htmlLang} className={fontVariables} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        {children}
        <RevealObserver />
        <CustomCursor />
      </body>
    </html>
  );
}
