import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/forms/login-form";
import { Logo } from "@/components/admin/layout/sidebar-header";

export const metadata: Metadata = { title: "Connexion" };

const notices: Record<string, string> = {
  forbidden: "Ce compte n'a pas accès au back-office.",
  config: "Supabase n'est pas encore configuré : ajoutez les variables d'environnement puis redéployez.",
};

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { error } = await searchParams;
  const notice = typeof error === "string" ? notices[error] : undefined;

  return (
    <main className="grid min-h-full w-full lg:grid-cols-2">
      <section className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[380px]">
          <Logo />
          <h1 className="mt-10 text-2xl font-semibold text-mono">Connexion au back-office</h1>
          <p className="mt-2 text-sm text-muted-foreground">Gérez les textes, les images, le CV et les messages de votre portfolio.</p>
          <LoginForm notice={notice} />
        </div>
      </section>
      <aside className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:flex-col lg:justify-end lg:p-12">
        <div aria-hidden className="absolute -top-24 -right-24 size-[420px] rounded-full bg-[#00C2FF]/25 blur-3xl" />
        <div aria-hidden className="absolute bottom-24 -left-16 size-[280px] rounded-full bg-[#00C2FF]/10 blur-2xl" />
        <p className="relative text-xs font-semibold tracking-[0.2em] text-[#00C2FF] uppercase">Géotechnique & infrastructures</p>
        <p className="relative mt-4 max-w-md text-3xl leading-tight font-semibold text-white">
          Votre portfolio, à jour en quelques clics — en français, en anglais et en japonais.
        </p>
      </aside>
    </main>
  );
}
