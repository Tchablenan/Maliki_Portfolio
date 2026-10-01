import "server-only";

import { defaultSettings, type SiteSettings } from "@/lib/settings";
import { mergeWithDefaults } from "@/lib/site-data";
import type { requireAdmin } from "@/lib/admin/guard";

type Supabase = Awaited<ReturnType<typeof requireAdmin>>["supabase"];

export async function loadSettings(supabase: Supabase): Promise<SiteSettings> {
  const { data } = await supabase.from("site_settings").select("data").eq("id", 1).maybeSingle();
  return data ? mergeWithDefaults(defaultSettings, data.data) : defaultSettings;
}

export async function writeSettings(supabase: Supabase, data: SiteSettings) {
  const { error } = await supabase.from("site_settings").upsert({ id: 1, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}
