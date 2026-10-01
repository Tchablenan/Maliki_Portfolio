import type { Metadata } from "next";

import { ReferencesEditor } from "@/components/admin/editor/references-editor";
import { PageHeader } from "@/components/admin/page-header";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { getSiteContent, getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = { title: "Références" };

export default async function ReferencesPage() {
  const [settings, dictionaries] = await Promise.all([getSiteSettings(), Promise.all(locales.map((locale) => getSiteContent(locale)))]);
  const content = Object.fromEntries(locales.map((locale, i) => [locale, dictionaries[i].projects])) as Record<Locale, Dictionary["projects"]>;

  return (
    <div className="container">
      <PageHeader title="Références" description="Vos projets phares : textes en trois langues, image, cadrage et lien." />
      <ReferencesEditor initial={{ content, media: settings.projects }} />
    </div>
  );
}
