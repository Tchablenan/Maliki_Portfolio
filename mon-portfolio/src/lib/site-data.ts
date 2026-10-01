import "server-only";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/types";
import { defaultSettings, type SiteSettings } from "@/lib/settings";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

type Json = unknown;

function isPlainObject(value: Json): value is Record<string, Json> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Overlays stored data on the bundled defaults: objects are merged key by key,
 * arrays and scalars from the database win as long as they have the expected type.
 * A half-filled or outdated row therefore never breaks the site.
 */
export function mergeWithDefaults<T>(defaults: T, stored: Json): T {
  if (isPlainObject(defaults) && isPlainObject(stored)) {
    const result: Record<string, Json> = { ...defaults };
    for (const key of Object.keys(defaults)) {
      if (key in stored) result[key] = mergeWithDefaults((defaults as Record<string, Json>)[key], stored[key]);
    }
    // Keep keys that only exist in the stored data for free-form maps (e.g. project media).
    for (const key of Object.keys(stored)) {
      if (!(key in defaults)) result[key] = stored[key];
    }
    return result as T;
  }
  if (Array.isArray(defaults)) return (Array.isArray(stored) ? stored : defaults) as T;
  if (defaults === null || defaults === undefined) return (stored ?? defaults) as T;
  return (typeof stored === typeof defaults ? stored : defaults) as T;
}

/** Site texts for one language: Supabase first, bundled dictionary as fallback. */
export async function getSiteContent(locale: Locale): Promise<Dictionary> {
  const fallback = await getDictionary(locale);
  if (!isSupabaseConfigured) return fallback;
  try {
    const { data, error } = await createPublicClient().from("site_content").select("data").eq("locale", locale).maybeSingle();
    if (error || !data) return fallback;
    return mergeWithDefaults(fallback, data.data);
  } catch {
    return fallback;
  }
}

/** Contacts, social links and media: Supabase first, defaults as fallback. */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return defaultSettings;
  try {
    const { data, error } = await createPublicClient().from("site_settings").select("data").eq("id", 1).maybeSingle();
    if (error || !data) return defaultSettings;
    return mergeWithDefaults(defaultSettings, data.data);
  } catch {
    return defaultSettings;
  }
}
