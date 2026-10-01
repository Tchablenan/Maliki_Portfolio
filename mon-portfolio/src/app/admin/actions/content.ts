"use server";

import { revalidatePath } from "next/cache";

import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { contentSections, isContentSection } from "@/lib/admin/sections";
import { requireAdmin, type ActionResult } from "@/lib/admin/guard";
import type { SiteSettings } from "@/lib/settings";
import { mergeWithDefaults } from "@/lib/site-data";

import { loadSettings, writeSettings } from "./settings-store";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];
type SectionPayload = Partial<Record<Locale, Partial<Dictionary>>>;

/** Current stored dictionary of a language (bundled one if nothing was saved yet). */
async function loadContent(supabase: Supabase, locale: Locale): Promise<Dictionary> {
  const fallback = await getDictionary(locale);
  const { data } = await supabase.from("site_content").select("data").eq("locale", locale).maybeSingle();
  return data ? mergeWithDefaults(fallback, data.data) : fallback;
}

async function writeContent(supabase: Supabase, locale: Locale, data: Dictionary) {
  const { error } = await supabase.from("site_content").upsert({ locale, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

/** Rebuilds the public pages (all languages) right after a change. */
function refreshSite() {
  revalidatePath("/[lang]", "layout");
}

/** Saves one back-office section (e.g. « Services ») for every language sent. */
export async function saveSection(slug: string, payload: SectionPayload): Promise<ActionResult> {
  if (!isContentSection(slug)) return { ok: false, error: "Section inconnue." };
  const { supabase } = await requireAdmin();
  const keys: readonly (keyof Dictionary)[] = contentSections[slug].keys;

  try {
    for (const locale of locales) {
      const incoming = payload[locale];
      if (!incoming) continue;
      const current = await loadContent(supabase, locale);
      const next = { ...current };
      for (const key of keys) {
        if (key in incoming) Object.assign(next, { [key]: mergeWithDefaults(current[key], incoming[key]) });
      }
      await writeContent(supabase, locale, next);
    }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Enregistrement impossible." };
  }
  refreshSite();
  return { ok: true, message: "Modifications publiées sur le site." };
}

/** Saves the « Références » section: texts in every language plus the shared visuals and links. */
export async function saveReferences(payload: {
  content: Record<Locale, Dictionary["projects"]>;
  media: SiteSettings["projects"];
}): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  try {
    for (const locale of locales) {
      const current = await loadContent(supabase, locale);
      await writeContent(supabase, locale, { ...current, projects: mergeWithDefaults(current.projects, payload.content[locale]) });
    }
    const settings = await loadSettings(supabase);
    const ids = new Set(payload.content.fr.items.map((item) => item.id));
    const media = Object.fromEntries(Object.entries(payload.media).filter(([id]) => ids.has(id)));
    await writeSettings(supabase, { ...settings, projects: media });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Enregistrement impossible." };
  }
  refreshSite();
  return { ok: true, message: "Références publiées sur le site." };
}
