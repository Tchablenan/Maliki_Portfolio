import type { Metadata } from "next";

import { SettingsEditor } from "@/components/admin/editor/settings-editor";
import { PageHeader } from "@/components/admin/page-header";
import { getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = { title: "Paramètres" };

export default async function SettingsPage() {
  const { name, emails, phone, city, available, socials, partners } = await getSiteSettings();
  const editable = { name, emails, phone, city, available, socials, partners };
  return (
    <div className="container">
      <PageHeader title="Paramètres" description="Coordonnées, réseaux sociaux, partenaires et disponibilité — communs aux trois langues." />
      <SettingsEditor initial={editable} />
    </div>
  );
}
