import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, FolderKanban, Globe, Inbox, MessageSquareText, TrendingUp } from "lucide-react";

import { ViewsChart } from "@/components/admin/dashboard/views-chart";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localeLabels, locales } from "@/i18n/config";
import { requireAdmin } from "@/lib/admin/guard";
import { formatDate, type ContactMessage } from "@/lib/admin/types";
import { getSiteContent } from "@/lib/site-data";

export const metadata: Metadata = { title: "Tableau de bord" };

const DAYS = 30;

const daysAgo = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString();

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();
  const since = daysAgo(DAYS);

  const [daily, recentViews, unread, total, recent, content] = await Promise.all([
    supabase.rpc("daily_page_views", { days: DAYS }),
    supabase.from("page_views").select("locale, referrer").gte("created_at", since).limit(10_000),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("messages").select("id", { count: "exact", head: true }),
    supabase.from("messages").select("id, name, email, subject, message, locale, is_read, created_at").order("created_at", { ascending: false }).limit(5),
    getSiteContent("fr"),
  ]);

  const series = ((daily.data ?? []) as { day: string; views: number }[]).map((row) => ({
    day: row.day,
    views: Number(row.views),
    label: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(new Date(row.day)),
  }));
  const views30 = series.reduce((sum, row) => sum + row.views, 0);
  const views7 = series.slice(-7).reduce((sum, row) => sum + row.views, 0);

  const rows = (recentViews.data ?? []) as { locale: string | null; referrer: string | null }[];
  const byLocale = locales.map((locale) => ({ locale, count: rows.filter((r) => r.locale === locale).length }));
  const referrers = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      const key = r.referrer || "Accès direct";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const kpis = [
    { label: `Visites (${DAYS} j)`, value: views30, icon: Eye },
    { label: "Visites (7 j)", value: views7, icon: TrendingUp },
    { label: "Messages non lus", value: unread.count ?? 0, icon: Inbox, href: "/admin/messages" },
    { label: "Références en ligne", value: content.projects.items.length, icon: FolderKanban, href: "/admin/references" },
  ];

  return (
    <div className="container">
      <PageHeader title="Bonjour Dr Maliki 👋" description="Un coup d’œil sur la vie de votre portfolio." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, href }) => {
          const body = (
            <Card className="h-full transition hover:border-[#00C2FF]/50">
              <CardContent className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-[#00C2FF]/10 text-[#0094c6]">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-2xl font-semibold text-mono">{value.toLocaleString("fr-FR")}</span>
                  <span className="block text-sm text-muted-foreground">{label}</span>
                </span>
              </CardContent>
            </Card>
          );
          return href ? (
            <Link key={label} href={href}>
              {body}
            </Link>
          ) : (
            <div key={label}>{body}</div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Fréquentation sur {DAYS} jours</CardTitle>
          </CardHeader>
          <CardContent>
            {views30 > 0 ? (
              <ViewsChart data={series} />
            ) : (
              <p className="grid h-[260px] place-items-center text-sm text-muted-foreground">Les visites s’afficheront ici dès les premières consultations.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="size-4" /> Langues & provenance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <ul className="flex flex-col gap-3">
              {byLocale.map(({ locale, count }) => {
                const share = rows.length ? Math.round((count / rows.length) * 100) : 0;
                return (
                  <li key={locale}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-secondary-foreground">{localeLabels[locale].name}</span>
                      <span className="font-medium text-mono">{share} %</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[#00C2FF]" style={{ width: `${share}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Principales sources</p>
              {referrers.length ? (
                <ul className="flex flex-col gap-1.5 text-sm">
                  {referrers.map(([source, count]) => (
                    <li key={source} className="flex justify-between gap-3">
                      <span className="truncate text-secondary-foreground">{source}</span>
                      <span className="font-medium text-mono">{count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Pas encore de données.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareText className="size-4" /> Derniers messages
            <span className="text-sm font-normal text-muted-foreground">({total.count ?? 0} au total)</span>
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/messages">
              Tout voir <ArrowRight />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {(recent.data ?? []).length ? (
            <ul className="divide-y divide-border">
              {((recent.data ?? []) as ContactMessage[]).map((m) => (
                <li key={m.id} className="flex items-center gap-4 px-5 py-3">
                  <span className={`size-2 shrink-0 rounded-full ${m.is_read ? "bg-muted" : "bg-[#00C2FF]"}`} />
                  <span className="min-w-0 grow">
                    <span className="block truncate text-sm font-medium text-mono">
                      {m.name} — {m.subject || "Sans sujet"}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{m.message}</span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{formatDate(m.created_at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Aucun message reçu pour l’instant.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
