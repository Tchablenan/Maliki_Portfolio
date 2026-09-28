import Link from "next/link";

import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const t = (await getDictionary(defaultLocale)).notFound;

  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="font-display text-[clamp(6rem,20vw,12rem)] leading-none text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl text-fg">{t.title}</h1>
        <p className="mt-3 text-lg text-muted">{t.text}</p>
        <Link href={`/${defaultLocale}`} className="mt-8 inline-block rounded-full bg-accent px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-fg hover:text-bg">
          {t.back}
        </Link>
      </div>
    </main>
  );
}
