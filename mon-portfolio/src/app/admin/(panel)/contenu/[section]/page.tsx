import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionEditor } from "@/components/admin/editor/section-editor";
import type { JsonObject } from "@/components/admin/editor/value-editor";
import { PageHeader } from "@/components/admin/page-header";
import { locales, type Locale } from "@/i18n/config";
import { contentSections, isContentSection } from "@/lib/admin/sections";
import { getSiteContent } from "@/lib/site-data";

export async function generateMetadata({ params }: PageProps<"/admin/contenu/[section]">): Promise<Metadata> {
  const { section } = await params;
  return { title: isContentSection(section) ? contentSections[section].title : "Contenu" };
}

export default async function ContentSectionPage({ params }: PageProps<"/admin/contenu/[section]">) {
  const { section } = await params;
  if (!isContentSection(section)) notFound();
  const { title, description, keys } = contentSections[section];

  const dictionaries = await Promise.all(locales.map((locale) => getSiteContent(locale)));
  const initial = Object.fromEntries(
    locales.map((locale, i) => [locale, Object.fromEntries(keys.map((key) => [key, dictionaries[i][key]])) as JsonObject]),
  ) as Record<Locale, JsonObject>;

  return (
    <div className="container">
      <PageHeader title={title} description={description} />
      <SectionEditor key={section} slug={section} initial={initial} />
    </div>
  );
}
