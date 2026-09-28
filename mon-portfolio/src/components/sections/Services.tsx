import Image from "next/image";

import type { Dictionary } from "@/i18n/types";
import { revealDelay } from "@/lib/reveal";

export function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-panel py-20 text-white md:py-[100px]">
      <Image src="/decor/pix-white-h.png" alt="" width={120} height={60} className="deco absolute top-0 left-0" />
      <Image src="/decor/pix-white-v.png" alt="" width={60} height={120} className="deco absolute top-0 right-0" />
      <Image src="/decor/pix-white-v.png" alt="" width={60} height={120} className="deco absolute bottom-0 left-0 rotate-180" />
      <Image src="/decor/pix-white-h.png" alt="" width={120} height={60} className="deco absolute right-0 bottom-0 rotate-180" />

      <div className="site-container">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div data-reveal className="relative z-0 flex max-w-[630px] flex-col gap-6">
            <p className="font-display text-3xl leading-snug text-white md:text-4xl md:leading-[64px]">{t.lead}</p>
            <p className="text-lg leading-[30px] font-medium text-[#969696] md:text-xl">{t.text}</p>
          </div>
          <div className="relative z-0 lg:text-right">
            <Image src="/decor/round.png" alt="" width={333} height={332} className="animate-spin-slow absolute -top-[60%] -right-[15%] -z-10 hidden w-[330px] opacity-20 lg:block" />
            <h2 data-reveal className="section-title text-white">{t.title}</h2>
          </div>
        </div>

        <div className="mt-14 grid border-t border-l border-[#1f1f1f] sm:grid-cols-2 xl:grid-cols-3">
          {t.items.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              style={revealDelay((i % 3) * 120)}
              className="group flex min-h-[380px] flex-col justify-between gap-10 border-r border-b border-[#1f1f1f] bg-black p-8 transition-colors duration-500 hover:bg-[#101010] xl:min-h-[430px]"
            >
              <div className="relative size-[110px] [perspective:1000px]">
                <div className="relative size-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(-180deg)]">
                  <Image src={`/decor/icon-${item.icon}.png`} alt="" width={120} height={120} className="absolute inset-0 size-full object-contain [backface-visibility:hidden]" />
                  <Image
                    src={`/decor/icon-${item.icon}-blue.png`}
                    alt=""
                    width={120}
                    height={120}
                    className="absolute inset-0 size-full object-contain [backface-visibility:hidden] [transform:rotateY(-180deg)]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-2xl leading-tight text-white uppercase transition-colors duration-500 group-hover:text-accent md:text-[28px]">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-[#969696] transition-colors duration-500 group-hover:text-white md:text-lg">{item.description}</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2.5 text-sm text-[#969696] md:text-base">
                      <span aria-hidden className="size-2 rounded-full bg-[#969696]" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
