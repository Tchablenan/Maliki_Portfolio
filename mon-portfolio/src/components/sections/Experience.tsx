import Image from "next/image";

import type { Dictionary } from "@/i18n/types";

export function Experience({ t }: { t: Dictionary["experience"] }) {
  return (
    <section id="experience" className="relative overflow-hidden py-20 md:py-[100px]">
      <Image src="/decor/pix-blue-4.png" alt="" width={60} height={120} className="absolute top-10 right-0 hidden md:block" />

      <div className="site-container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 data-reveal className="section-title text-fg">{t.title}</h2>
            <p data-reveal className="mt-6 max-w-[380px] text-lg leading-[30px] text-muted">
              {t.text}
            </p>
            <Image src="/decor/flower.png" alt="" width={65} height={65} className="animate-spin-medium mt-10 hidden lg:block" />
          </div>
        </div>

        <ol className="lg:col-span-8">
          {t.items.map((item) => (
            <li key={`${item.period}-${item.role}`} data-reveal className="group grid gap-4 border-b border-line py-8 first:pt-0 md:grid-cols-[170px_1fr] md:gap-10">
              <p className="text-lg text-muted md:text-xl">{item.period}</p>
              <div>
                <h3 className="font-display text-2xl leading-snug text-fg transition-colors duration-500 group-hover:text-accent md:text-[28px]">
                  {item.role}
                </h3>
                <p className="mt-2 text-sm font-semibold tracking-wide text-accent uppercase">{item.organization}</p>
                <p className="mt-1 text-sm text-muted">{item.location}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-base leading-7 text-muted">
                      <Image src="/decor/check.png" alt="" width={40} height={40} className="deco mt-1.5 size-5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
