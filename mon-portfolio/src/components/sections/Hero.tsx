import Image from "next/image";

import { SocialIcon } from "@/components/Icons";
import { profileData, socials } from "@/data/profile";
import type { Dictionary } from "@/i18n/types";

export function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <Image src="/decor/pix-black-v.png" alt="" width={60} height={121} priority className="deco absolute top-0 left-0 hidden md:block" />
      <Image src="/decor/pix-blue-2.png" alt="" width={30} height={90} className="absolute right-0 bottom-0 hidden md:block" />

      <div className="site-container">
        <h1 className="animate-float relative z-0 text-center font-display text-[clamp(3.25rem,11vw,8.75rem)] leading-[1.25] text-fg">
          {t.headline}
        </h1>

        <div className="relative z-10 mx-auto -mt-[clamp(2.5rem,7vw,6.5rem)] w-[min(470px,82vw)]">
          <Image src="/decor/pix-blue-2.png" alt="" width={30} height={90} className="absolute top-[40%] -left-[30px] hidden sm:block" />
          <Image src="/decor/squiggle-left.png" alt="" width={176} height={93} className="deco absolute top-[50%] -left-[40%] hidden w-[170px] lg:block" />
          <Image src="/decor/squiggle-right.png" alt="" width={194} height={124} className="deco absolute -top-[2%] -right-[20%] z-20 hidden w-[190px] lg:block" />
          <Image src="/decor/pix-blue-4.png" alt="" width={60} height={120} className="absolute top-[60%] -right-[60px] hidden sm:block" />

          {/* Cut-out portrait: the headline stays readable above the head, as in the template */}
          <div className="arch h-[clamp(420px,56vw,640px)] w-full">
            <Image
              src={profileData.images.cutout}
              alt={t.photoAlt}
              priority
              sizes="(min-width: 640px) 705px, 123vw"
              className="absolute bottom-0 left-1/2 h-auto w-[150%] max-w-none -translate-x-1/2"
            />
          </div>

          <a
            href="#contact"
            className="relative z-30 mx-auto -mt-[30px] flex w-fit items-center justify-center rounded-full border-2 border-accent bg-bg px-10 py-3 text-lg font-semibold text-fg transition-colors duration-500 hover:bg-fg hover:text-bg md:px-12 md:text-xl"
          >
            {t.cta}
          </a>

          <p className="glass relative z-30 mx-auto mt-6 flex w-fit items-center gap-4 rounded-full px-6 py-3 text-base font-medium text-fg lg:absolute lg:bottom-[27%] lg:-left-[48%] lg:mt-0 lg:px-8 lg:text-lg">
            <span className="online-dot" aria-hidden />
            {t.badge}
          </p>
        </div>

        <div className="mt-12 grid items-end gap-8 lg:-mt-28 lg:grid-cols-2">
          <div data-reveal>
            <p className="font-display text-3xl text-fg md:text-[40px] md:leading-[60px]">{t.greeting}</p>
            <p className="mt-2 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.15] text-fg">{t.name}</p>
          </div>
          <p data-reveal className="max-w-[410px] text-lg leading-[30px] text-muted lg:ml-auto lg:text-right lg:text-xl">
            {t.intro}
          </p>
        </div>
      </div>

      <a
        href={`mailto:${profileData.emails[0]}`}
        className="absolute top-1/2 left-0 hidden origin-center -translate-x-[38%] -rotate-90 text-lg font-medium text-muted transition-colors duration-500 hover:text-accent 2xl:block"
      >
        {profileData.emails[0]}
      </a>

      <ul className="absolute top-[22%] right-[60px] hidden flex-col gap-5 2xl:flex">
        {socials.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              target={s.id === "mail" ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-[60px] place-items-center rounded-full bg-fg text-bg transition-colors duration-500 hover:text-accent"
            >
              <SocialIcon id={s.id} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
