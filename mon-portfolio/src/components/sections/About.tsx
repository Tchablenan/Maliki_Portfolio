import Image from "next/image";

import { DownloadIcon } from "@/components/Icons";
import { defaultImages, site } from "@/data/profile";
import type { Dictionary } from "@/i18n/types";
import { pickImage } from "@/lib/media";
import { revealDelay } from "@/lib/reveal";
import type { SiteSettings } from "@/lib/settings";

export function About({ t, settings }: { t: Dictionary["about"]; settings: SiteSettings }) {
  const photo = pickImage(settings.media.aboutPhoto, defaultImages.aboutPhoto) ?? defaultImages.aboutPhoto;
  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-[100px]">
      <Image src="/decor/pix-black-h.png" alt="" width={121} height={61} className="deco absolute bottom-0 left-[120px] hidden md:block" />

      <div className="site-container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative">
            <Image src="/decor/round.png" alt="" width={333} height={332} className="animate-spin-slow absolute top-[70%] left-[5%] -z-10 w-[330px] -translate-x-1/2 -translate-y-1/2 opacity-60 dark:opacity-20" />
            <h2 data-reveal className="section-title mb-7 text-fg">{t.title}</h2>
            <p data-reveal className="max-w-[520px] text-lg leading-[30px] font-medium text-muted md:text-xl">
              {t.text}
            </p>
          </div>
          <div data-reveal="zoom" className="relative mt-14 h-[400px] w-[300px] max-w-full overflow-hidden lg:mt-24">
            <Image
              src={photo}
              alt={t.photoAlt}
              fill
              placeholder={typeof photo === "string" ? "empty" : "blur"}
              sizes="300px"
              className="scale-110 object-cover object-top transition-transform duration-700 hover:scale-100"
            />
          </div>
        </div>

        <div className="flex flex-col lg:col-span-7">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
            <div data-reveal className="flex flex-col items-center gap-2.5 sm:mt-24">
              <p className="font-display text-7xl leading-none text-accent md:text-[80px]">{t.yearsValue}</p>
              <p className="max-w-36 text-center text-lg leading-7 font-medium text-fg md:text-xl">{t.yearsLabel}</p>
            </div>

            <div data-reveal="zoom" className="relative flex h-[340px] w-[min(300px,80vw)] flex-col items-center justify-end overflow-hidden rounded-t-[500px] bg-accent pb-10 text-white md:h-[410px] md:w-[330px]">
              <Image src="/decor/icon-2.png" alt="" width={120} height={116} className="absolute top-16 opacity-40" />
              <p className="font-display text-[110px] leading-none md:text-[130px]">PhD</p>
              <p className="mt-3 max-w-[220px] text-center text-sm font-medium tracking-[0.2em] uppercase">Yokohama National University · 2023</p>
            </div>

            <Image src="/decor/star.png" alt="" width={140} height={140} className="deco animate-spin-medium w-[110px] sm:-mt-6 md:w-[130px]" />
          </div>

          <p data-reveal className="mt-14 text-center font-display text-2xl leading-[1.6] text-fg md:text-[34px] md:leading-[56px]">
            {t.statement}
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-6 border-y border-line py-8 sm:grid-cols-3">
            {t.stats.map((s, i) => (
              <div key={s.label} data-reveal style={revealDelay(i * 120)} className="flex flex-col-reverse text-center">
                <dt className="mt-2 text-base text-muted">{s.label}</dt>
                <dd className="font-display text-4xl whitespace-nowrap text-fg md:text-[44px]">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact" className="rounded-full bg-accent px-10 py-3.5 text-lg font-medium text-white transition-colors duration-500 hover:bg-fg hover:text-bg">
              {t.cta}
            </a>
            <a
              href={settings.media.cv || site.defaultCv}
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-fg px-8 py-3 text-lg font-medium text-fg transition-colors duration-500 hover:bg-fg hover:text-bg"
            >
              <DownloadIcon size={20} />
              {t.cv}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
