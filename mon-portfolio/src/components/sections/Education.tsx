import Image from "next/image";

import type { Dictionary } from "@/i18n/types";
import { revealDelay } from "@/lib/reveal";

export function Education({ t }: { t: Dictionary["education"] }) {
  return (
    <section id="education" className="relative overflow-hidden py-20 md:py-[100px]">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 data-reveal className="section-title text-fg">{t.title}</h2>
          <p data-reveal className="mt-5 text-lg leading-[30px] text-muted md:text-xl">
            {t.text}
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {t.degrees.map((d, i) => (
            <li
              key={d.title}
              data-reveal
              style={revealDelay(i * 120)}
              className="group relative flex flex-col gap-4 overflow-hidden border border-line p-7 transition-colors duration-500 hover:border-accent"
            >
              <Image src="/decor/pix-blue-2.png" alt="" width={30} height={90} className="absolute top-0 right-0 h-auto w-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="font-display text-5xl text-accent">{d.year}</p>
              <h3 className="font-display text-xl leading-snug text-fg">{d.title}</h3>
              <p className="mt-auto text-sm text-muted">{d.school}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div data-reveal>
            <h3 className="font-display text-3xl text-fg">{t.languagesTitle}</h3>
            <ul className="mt-8 flex flex-col gap-6">
              {t.languages.map((l) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-lg font-medium text-fg">{l.name}</span>
                    <span className="text-sm text-muted">{l.level}</span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-field" role="presentation">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${l.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="font-display text-3xl text-fg">{t.softwareTitle}</h3>
            <ul className="mt-8 flex flex-wrap gap-3">
              {t.software.map((s) => (
                <li key={s} className="rounded-full border border-line px-5 py-2.5 text-base text-fg transition-colors duration-300 hover:border-accent hover:text-accent">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
