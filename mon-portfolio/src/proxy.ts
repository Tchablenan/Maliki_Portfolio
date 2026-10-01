import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/config";

/** Picks the best supported locale from the Accept-Language header. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.base && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);

  return ranked.find((entry) => hasLocale(entry.base))?.base as Locale | undefined ?? defaultLocale;
}

/**
 * Back office: refreshes the Supabase session cookies and sends visitors without a session
 * to the login page. The admin role itself is checked server-side on every page and action.
 */
async function adminProxy(request: NextRequest) {
  const isLogin = request.nextUrl.pathname === "/admin/login";
  if (!isSupabaseConfigured) {
    if (isLogin) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLogin) {
    const redirect = NextResponse.redirect(new URL("/admin/login", request.url));
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }
  return response;
}

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor|curl|wget|python|axios|node-fetch/i;
const VISIT_WINDOW = 30 * 60; // one visit per language and per 30 minutes

/**
 * Counts page views on the server, so browser ad-blockers cannot hide them.
 * Only real page loads of a language home page are counted (no prefetch, no bots).
 */
function trackPageView(request: NextRequest, event: NextFetchEvent): NextResponse | undefined {
  if (!isSupabaseConfigured || request.method !== "GET") return;
  const match = request.nextUrl.pathname.match(/^\/([a-z]{2})\/?$/);
  const locale = match?.[1];
  if (!locale || !hasLocale(locale)) return;

  const headers = request.headers;
  const isPrefetch =
    request.nextUrl.searchParams.has("_rsc") || headers.has("next-router-prefetch") || headers.has("rsc") || /prefetch/i.test(`${headers.get("purpose")}${headers.get("sec-purpose")}`);
  if (isPrefetch || BOT.test(headers.get("user-agent") ?? "") || !(headers.get("accept") ?? "").includes("text/html")) return;

  const cookie = `pv_${locale}`;
  if (request.cookies.has(cookie)) return;

  let referrer: string | null = null;
  try {
    const host = new URL(headers.get("referer") ?? "").host;
    referrer = host && host !== request.nextUrl.host ? host.slice(0, 300) : null;
  } catch {
    referrer = null;
  }

  event.waitUntil(
    fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: "POST",
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ path: `/${locale}`, locale, referrer }),
    }).catch(() => undefined),
  );

  const response = NextResponse.next();
  response.cookies.set(cookie, "1", { maxAge: VISIT_WINDOW, httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  return response;
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return adminProxy(request);

  const hasPrefix = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasPrefix) return trackPageView(request, event);

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, CV, icons…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
