"use server";

import { site } from "@/data/profile";
import { hasLocale } from "@/i18n/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

export type ContactResult = { ok: boolean };

const clip = (value: FormDataEntryValue | null, max: number) => String(value ?? "").trim().slice(0, max);

/** Stores a contact-form message in Supabase (or forwards it to Formspree when Supabase is not set up). */
export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  // Honeypot field: real visitors never fill it.
  if (clip(formData.get("company"), 200)) return { ok: true };

  const name = clip(formData.get("name"), 120);
  const email = clip(formData.get("email"), 200);
  const subject = clip(formData.get("subject"), 200);
  const message = clip(formData.get("message"), 5000);
  const lang = clip(formData.get("lang"), 2);
  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) return { ok: false };

  try {
    if (isSupabaseConfigured) {
      const { error } = await createPublicClient()
        .from("messages")
        .insert({ name, email, subject, message, locale: hasLocale(lang) ? lang : null });
      return { ok: !error };
    }
    const response = await fetch(site.formEndpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
