import Image from "next/image";

import { ArrowUpRightIcon } from "@/components/Icons";
import type { Dictionary } from "@/i18n/types";

function Row({ year, title, detail, href, linkLabel }: { year: string; title: string; detail: string; href?: string; linkLabel?: string }) {
  return (
    <li data-reveal className="group grid grid-cols-[88px_1fr] items-start gap-5 border-b border-line py-6 md:grid-cols-[110px_1fr] md:gap-8">
      <p className="pt-1 text-lg text-muted md:text-xl">{year}</p>
      <div>
        <p className="text-lg leading-7 font-medium text-fg md:text-xl">{title}</p>
        <p className="mt-1.5 text-sm font-medium tracking-wide text-accent uppercase">{detail}</p>
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-accent hover:underline">
            {linkLabel}
            <ArrowUpRightIcon size={16} />
          </a>
        )}
      </div>
    </li>
  );
}

export function Research({ t }: { t: Dictionary["research"] }) {
  return (
    <section id="research" className="relative isolate overflow-hidden bg-field/60 py-20 md:py-[100px]">
      <Image src="/decor/pix-black-v.png" alt="" width={60} height={121} className="deco absolute top-0 right-0 hidden md:block" />

      <div className="site-container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="relative lg:sticky lg:top-32">
            <Image src="/decor/round.png" alt="" width={333} height={332} className="animate-spin-slow absolute -top-1/3 -left-1/4 -z-10 w-[300px] opacity-60 dark:opacity-20" />
            <h2 data-reveal className="section-title text-fg">{t.title}</h2>
            <p data-reveal className="mt-6 max-w-[360px] text-lg leading-[30px] text-muted">
              {t.text}
            </p>

            <h3 className="mt-12 font-display text-2xl text-fg">{t.membershipsTitle}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {t.memberships.map((m) => (
                <li key={m} className="flex items-center gap-3 text-base text-muted">
                  <Image src="/decor/flower.png" alt="" width={65} height={65} className="size-5" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-14 lg:col-span-8">
          <div>
            <h3 data-reveal className="font-display text-3xl text-fg md:text-4xl">{t.publicationsTitle}</h3>
            <ul className="mt-4">
              {t.publications.map((p) => (
                <Row key={p.title} year={p.year} title={p.title} detail={p.venue} href={p.href} linkLabel={t.readLabel} />
              ))}
            </ul>
          </div>
          <div>
            <h3 data-reveal className="font-display text-3xl text-fg md:text-4xl">{t.distinctionsTitle}</h3>
            <ul className="mt-4">
              {t.distinctions.map((d) => (
                <Row key={d.title} year={d.year} title={d.title} detail={d.issuer} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
