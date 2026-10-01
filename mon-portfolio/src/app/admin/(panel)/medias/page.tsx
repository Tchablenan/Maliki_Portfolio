import type { Metadata } from "next";

import { MediaEditor } from "@/components/admin/editor/media-editor";
import { PageHeader } from "@/components/admin/page-header";
import { defaultImages, site } from "@/data/profile";
import { getSiteSettings } from "@/lib/site-data";

export const metadata: Metadata = { title: "Médias & CV" };

export default async function MediaPage() {
  const settings = await getSiteSettings();
  return (
    <div className="container">
      <PageHeader title="Médias & CV" description="Remplacez vos photos et votre CV. Les images des références se gèrent dans « Références »." />
      <MediaEditor initial={settings.media} defaults={defaultImages} defaultCv={site.defaultCv} />
    </div>
  );
}
