import Image from "next/image";

import { DownloadIcon, SocialIcon } from "@/components/Icons";
import { defaultImages, site } from "@/data/profile";
import type { Dictionary } from "@/i18n/types";
import { pickImage } from "@/lib/media";
import { revealDelay } from "@/lib/reveal";
import { socialLinks, type SiteSettings } from "@/lib/settings";

export function Hero({ t, settings }: { t: Dictionary["hero"]; settings: SiteSettings }) {
  const socials = socialLinks(settings);
  const photo = pickImage(settings.media.heroPhoto, defaultImages.heroPhoto) ?? defaultImages.heroPhoto;
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 md:pt-36 lg:pb-28">
      <Image src="/decor/pix-blue-2.png" alt="" width={30} height={90} className="absolute right-0 bottom-0 hidden md:block" />

      <div className="site-container grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6 md:gap-7">
          {settings.available && (
            <p className="glass flex items-center gap-3 rounded-full px-5 py-2 text-sm font-medium text-fg">
              <span className="online-dot" aria-hidden />
              {t.badge}
            </p>
          )}
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase md:text-sm">{t.kicker}</p>
          <h1 className="font-display text-[clamp(2.6rem,5.2vw,4.75rem)] leading-[1.08] text-fg">{t.headline}</h1>
          <p className="max-w-xl text-lg leading-8 text-muted md:text-xl">
            <span className="font-semibold text-fg">{t.name}</span>, {t.role} {t.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-accent px-8 py-3.5 text-lg font-medium text-white transition-colors duration-500 hover:bg-fg hover:text-bg"
            >
              {t.cta}
            </a>
            <a
              href={settings.media.cv || site.defaultCv}
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-fg px-7 py-3 text-lg font-medium text-fg transition-colors duration-500 hover:bg-fg hover:text-bg"
            >
              <DownloadIcon size={20} />
              {t.cv}
            </a>
          </div>
          <dl className="mt-2 grid w-full grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {t.proof.map((p, i) => (
              <div key={p.label} data-reveal style={revealDelay(i * 100)} className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{p.label}</dt>
                <dd className="font-display text-2xl whitespace-nowrap text-fg md:text-3xl">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[440px] pr-5 pb-5">
          <div aria-hidden className="absolute top-5 right-0 bottom-0 left-5 rounded-t-[240px] bg-accent" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[240px] bg-field">
            <Image
              src={photo}
              alt={t.photoAlt}
              fill
              priority
              placeholder={typeof photo === "string" ? "empty" : "blur"}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <Image src="/decor/pix-black-v.png" alt="" width={60} height={121} className="deco absolute top-10 -left-8 hidden sm:block" />
          <Image src="/decor/squiggle-right.png" alt="" width={194} height={124} className="deco absolute -top-10 -right-10 hidden w-36 lg:block" />
          <div className="absolute bottom-0 -left-2 rounded-2xl bg-bg px-6 py-4 shadow-xl ring-1 ring-line sm:-left-8">
            <p className="font-display text-xl text-fg">{t.cardTitle}</p>
            <p className="text-sm text-muted">{t.cardText}</p>
          </div>
        </div>
      </div>

      <ul className="absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col gap-4 2xl:flex">
        {socials.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              target={s.id === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-12 place-items-center rounded-full bg-fg text-bg transition-colors duration-500 hover:text-accent"
            >
              <SocialIcon id={s.id} size={20} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
