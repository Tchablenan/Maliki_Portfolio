"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon, MoonIcon, SocialIcon, SunIcon } from "@/components/Icons";
import { profileData, socials } from "@/data/profile";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

interface HeaderProps {
  lang: Locale;
  nav: Dictionary["nav"];
}

function Logo({ lang }: { lang: Locale }) {
  return (
    <Link href={`/${lang}#home`} className="font-display text-3xl leading-none md:text-[40px]" aria-label={profileData.name}>
      <span className="text-fg">Dr </span>
      <span className="text-accent">Maliki.</span>
    </Link>
  );
}

function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* private mode: the choice simply isn't remembered */
    }
  };

  return (
    <button type="button" onClick={toggle} aria-label={label} className="glass grid size-12 place-items-center rounded-full text-fg md:size-[60px]">
      <MoonIcon size={26} className="dark:hidden" />
      <SunIcon size={26} className="hidden dark:block" />
    </button>
  );
}

function LanguageSwitcher({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={`glass h-12 items-center rounded-full p-1 md:h-[60px] md:p-1.5 ${className}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}`}
          hrefLang={localeLabels[l].htmlLang}
          lang={localeLabels[l].htmlLang}
          aria-current={l === lang ? "true" : undefined}
          title={localeLabels[l].name}
          className="grid h-full min-w-10 place-items-center rounded-full px-2 text-sm font-semibold text-fg transition-colors hover:text-accent aria-[current=true]:bg-fg aria-[current=true]:text-bg md:min-w-12"
        >
          {localeLabels[l].short}
        </Link>
      ))}
    </nav>
  );
}

export function Header({ lang, nav }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panel = "h-full bg-bg transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]";

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        {nav.skip}
      </a>

      <header className={`fixed inset-x-0 top-0 z-[998] transition-all duration-500 ${scrolled ? "bg-bg/75 py-2.5 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "py-5"}`}>
        <div className="site-container flex items-center justify-between gap-3">
          <Logo lang={lang} />
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageSwitcher lang={lang} label={nav.language} className="hidden sm:flex" />
            <ThemeToggle label={nav.toggleTheme} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={nav.openMenu}
              aria-expanded={open}
              aria-controls="site-menu"
              className="grid size-12 place-items-center rounded-full bg-panel text-white md:size-[60px]"
            >
              <MenuIcon size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu: three panels slide in from opposite directions */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label={nav.openMenu}
        inert={!open}
        className={`fixed inset-0 z-[999] flex transition-[opacity,visibility] duration-500 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className={`${panel} relative flex w-full flex-col gap-10 overflow-y-auto px-6 py-5 md:px-10 lg:w-[35%] ${open ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex items-center justify-between">
            <Logo lang={lang} />
            <button type="button" onClick={() => setOpen(false)} aria-label={nav.closeMenu} className="grid size-12 place-items-center rounded-full bg-panel text-white md:size-[60px] lg:hidden">
              <CloseIcon size={30} />
            </button>
          </div>
          <nav className="flex flex-1 justify-end pb-24 lg:pb-0">
            <ul className="flex flex-col gap-5 md:gap-6">
              {nav.items.map((item, i) => (
                <li key={item.id} className="relative">
                  <span className="absolute top-0 -left-9 text-base font-medium text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl leading-tight text-fg uppercase transition-colors duration-500 hover:text-accent md:text-[40px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher lang={lang} label={nav.language} className="mb-20 flex self-start sm:hidden" />
          <Image src="/decor/pix-black-h.png" alt="" width={121} height={61} className="deco absolute bottom-0 left-0" />
        </div>

        <div className={`${panel} relative hidden w-[30%] overflow-hidden lg:block ${open ? "translate-y-0" : "-translate-y-full"}`}>
          <Image src="/decor/squiggle-left.png" alt="" width={176} height={93} className="deco absolute top-[15%] -left-[5%] z-10 w-[150px]" />
          <Image src="/decor/pix-blue-2.png" alt="" width={30} height={90} className="absolute top-[30%] left-[3%] z-10" />
          <Image src="/decor/squiggle-right.png" alt="" width={194} height={124} className="deco absolute top-[2%] right-0 z-10 w-[150px]" />
          <Image src="/decor/pix-blue-4.png" alt="" width={60} height={120} className="absolute right-0 bottom-[45%] z-10 w-12" />
          <div className="arch mx-auto h-[min(800px,92vh)] max-w-[470px]">
            <Image src={profileData.images.profile} alt="" sizes="470px" className="mt-10 h-full w-full object-cover object-top" />
          </div>
        </div>

        <div className={`${panel} relative hidden w-[35%] lg:block ${open ? "translate-y-0" : "translate-y-full"}`}>
          <button type="button" onClick={() => setOpen(false)} aria-label={nav.closeMenu} className="absolute top-5 right-8 grid size-[60px] place-items-center rounded-full bg-panel text-white">
            <CloseIcon size={32} />
          </button>
          <div className="mt-36 ml-12 flex max-w-sm flex-col items-start">
            <p className="font-display text-4xl leading-tight text-fg">{nav.menuContactTitle}</p>
            <p className="mt-5 text-lg text-fg">{nav.menuContactText}</p>
            <a href={`mailto:${profileData.emails[0]}`} className="mt-10 font-display text-2xl break-all text-fg transition-colors hover:text-accent">
              {profileData.emails[0]}
            </a>
            <a href={profileData.phone.href} className="mt-3 font-display text-2xl text-fg transition-colors hover:text-accent">
              {profileData.phone.display}
            </a>
            <p className="mt-14 font-display text-3xl text-fg">{nav.follow}</p>
            <div className="mt-5 flex flex-wrap gap-4">
              {socials.map((s) => (
                <a key={s.id} href={s.href} target={s.id === "mail" ? undefined : "_blank"} rel="noopener noreferrer" aria-label={s.label} className="glass grid size-[60px] place-items-center rounded-full text-fg transition-colors hover:text-accent">
                  <SocialIcon id={s.id} />
                </a>
              ))}
            </div>
          </div>
          <Image src="/decor/pix-black-v.png" alt="" width={60} height={121} className="deco absolute right-0 bottom-0" />
        </div>
      </div>
    </>
  );
}
