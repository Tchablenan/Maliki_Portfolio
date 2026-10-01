import { ArrowUpIcon, AsteriskIcon, SocialIcon } from "@/components/Icons";
import type { Dictionary } from "@/i18n/types";
import { socialLinks, type SiteSettings } from "@/lib/settings";

export function Footer({ t, settings }: { t: Dictionary["footer"]; settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const socials = socialLinks(settings);

  return (
    <footer className="relative overflow-hidden pt-10">
      <div className="site-container">
        <h2 data-reveal className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-fg">{t.title}</h2>
        <p data-reveal className="mt-4 max-w-3xl text-lg leading-[30px] text-muted">
          {t.text}
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target={s.id === "mail" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid aspect-[2/1] place-items-center border border-line text-fg transition-colors duration-500 hover:border-accent hover:bg-fg hover:text-bg sm:aspect-square"
              >
                <SocialIcon id={s.id} size={30} />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 text-base text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {settings.name}. {t.rights}
          </p>
          <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
            {t.backToTop}
            <ArrowUpIcon size={18} />
          </a>
        </div>
      </div>

      <p aria-hidden className="mt-6 flex items-center justify-center gap-[2vw] font-display text-[9.5vw] leading-[0.9] whitespace-nowrap text-fg select-none">
        Maliki
        <AsteriskIcon className="size-[3vw] text-fg" />
        Djandjieme
      </p>
    </footer>
  );
}
