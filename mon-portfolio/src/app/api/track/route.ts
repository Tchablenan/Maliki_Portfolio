import { hasLocale } from "@/i18n/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse/i;

/** Records one anonymous page view (path, language, referrer host) for the back-office dashboard. */
export async function POST(request: Request) {
  if (!isSupabaseConfigured || BOT.test(request.headers.get("user-agent") ?? "")) {
    return new Response(null, { status: 204 });
  }
  try {
    const body = (await request.json()) as { path?: unknown; lang?: unknown; referrer?: unknown };
    const path = typeof body.path === "string" ? body.path.slice(0, 300) : "/";
    const lang = typeof body.lang === "string" && hasLocale(body.lang) ? body.lang : null;
    let referrer: string | null = null;
    if (typeof body.referrer === "string" && body.referrer) {
      try {
        referrer = new URL(body.referrer).host.slice(0, 300) || null;
      } catch {
        referrer = null;
      }
    }
    await createPublicClient().from("page_views").insert({ path, locale: lang, referrer });
  } catch {
    // Statistics must never break the site.
  }
  return new Response(null, { status: 204 });
}
