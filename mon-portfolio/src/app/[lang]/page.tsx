import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { KeywordBands } from "@/components/sections/KeywordBands";
import { Partners } from "@/components/sections/Partners";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Services } from "@/components/sections/Services";
import { defaultImages, site } from "@/data/profile";
import { hasLocale } from "@/i18n/config";
import { pickImage } from "@/lib/media";
import { getSiteContent, getSiteSettings } from "@/lib/site-data";

// Content comes from Supabase: pages are pre-rendered, refreshed on save from the back office
// and, as a safety net, at most every hour.
export const revalidate = 3600;

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, settings] = await Promise.all([getSiteContent(lang), getSiteSettings()]);
  const heroPhoto = pickImage(settings.media.heroPhoto, defaultImages.heroPhoto) ?? defaultImages.heroPhoto;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.name,
    honorificPrefix: "Dr",
    jobTitle: "Geotechnical Engineer, PhD",
    description: dict.meta.description,
    url: `${site.url}/${lang}`,
    image: typeof heroPhoto === "string" ? heroPhoto : `${site.url}${heroPhoto.src}`,
    email: settings.emails[0] ? `mailto:${settings.emails[0]}` : undefined,
    alumniOf: ["Yokohama National University", "International Institute for Water and Environmental Engineering (2iE)"],
    worksFor: { "@type": "Organization", name: "JICA" },
    sameAs: settings.socials.map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      <Header lang={lang} nav={dict.nav} settings={settings} photo={heroPhoto} />
      <main id="main">
        <Hero t={dict.hero} settings={settings} />
        <Partners label={dict.partnersLabel} partners={settings.partners} />
        <About t={dict.about} settings={settings} />
        <Services t={dict.services} />
        <Projects t={dict.projects} media={settings.projects} />
        <KeywordBands words={dict.marquee} />
        <Experience t={dict.experience} />
        <Education t={dict.education} />
        <Research t={dict.research} />
        <Contact t={dict.contact} settings={settings} lang={lang} />
      </main>
      <Footer t={dict.footer} settings={settings} />
    </>
  );
}
