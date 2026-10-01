"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin, type ActionResult } from "@/lib/admin/guard";
import type { SiteSettings } from "@/lib/settings";
import { mergeWithDefaults } from "@/lib/site-data";

import { loadSettings, writeSettings } from "./settings-store";

/** Updates part of the shared settings (contacts, socials, partners, media…). */
export async function saveSettings(patch: Partial<Omit<SiteSettings, "projects">>): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  try {
    const current = await loadSettings(supabase);
    const next = mergeWithDefaults(current, { ...patch, projects: current.projects });
    await writeSettings(supabase, next);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Enregistrement impossible." };
  }
  revalidatePath("/[lang]", "layout");
  return { ok: true, message: "Paramètres publiés sur le site." };
}
