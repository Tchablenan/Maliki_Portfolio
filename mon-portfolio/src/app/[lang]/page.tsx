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
import { profileData, socials } from "@/data/profile";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    honorificPrefix: "Dr",
    jobTitle: "Geotechnical Engineer, PhD",
    description: dict.meta.description,
    url: `${profileData.siteUrl}/${lang}`,
    image: `${profileData.siteUrl}${profileData.images.profile.src}`,
    email: `mailto:${profileData.emails[0]}`,
    alumniOf: ["Yokohama National University", "International Institute for Water and Environmental Engineering (2iE)"],
    worksFor: { "@type": "Organization", name: "JICA" },
    sameAs: socials.filter((s) => s.id !== "mail").map((s) => s.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      <Header lang={lang} nav={dict.nav} />
      <main id="main">
        <Hero t={dict.hero} />
        <Partners label={dict.partnersLabel} />
        <About t={dict.about} />
        <Services t={dict.services} />
        <Projects t={dict.projects} />
        <KeywordBands words={dict.marquee} />
        <Experience t={dict.experience} />
        <Research t={dict.research} />
        <Education t={dict.education} />
        <Contact t={dict.contact} />
      </main>
      <Footer t={dict.footer} />
    </>
  );
}
