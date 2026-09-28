import Image from "next/image";

import { ContactForm } from "@/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { profileData } from "@/data/profile";
import type { Dictionary } from "@/i18n/types";

const circle = "grid size-[52px] shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors duration-500 group-hover:border-accent group-hover:text-accent";

export function Contact({ t }: { t: Dictionary["contact"] }) {
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-[100px]">
      <div className="site-container">
        <div className="relative isolate grid overflow-hidden bg-panel lg:grid-cols-[1.1fr_1fr]">
          <Image src="/decor/wave.png" alt="" width={1290} height={465} className="absolute right-0 bottom-0 -z-10 w-full opacity-40" />
          <Image src="/decor/rings.png" alt="" width={280} height={140} className="absolute top-0 left-1/3 -z-10 opacity-40" />
          <Image src="/decor/pix-white-h.png" alt="" width={120} height={60} className="deco absolute top-0 left-0" />

          <div data-reveal className="flex flex-col gap-6 px-6 pt-24 pb-12 text-white sm:px-12 lg:py-24 lg:pl-14">
            <h2 className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-[1.25]">{t.title}</h2>
            <p className="max-w-md text-lg text-white/80">{t.text}</p>

            <ul className="mt-6 flex flex-col gap-5">
              {profileData.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="group flex items-center gap-4 font-display text-base [overflow-wrap:anywhere] sm:text-2xl">
                    <span className={circle}>
                      <MailIcon size={22} />
                    </span>
                    <span className="transition-colors duration-500 group-hover:text-accent">{email}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={profileData.phone.href} className="group flex items-center gap-4 font-display text-base sm:text-2xl">
                  <span className={circle}>
                    <PhoneIcon size={22} />
                  </span>
                  <span className="transition-colors duration-500 group-hover:text-accent">{profileData.phone.display}</span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-base text-white/80">
                <span className={circle}>
                  <MapPinIcon size={22} />
                </span>
                {t.location}
              </li>
            </ul>
          </div>

          <div className="relative bg-bg p-6 sm:p-10 lg:my-12 lg:mr-12">
            <h3 className="font-display text-3xl text-fg">{t.formTitle}</h3>
            <p className="mt-3 mb-8 text-base text-muted">{t.formText}</p>
            <ContactForm t={t} />
          </div>
        </div>
      </div>
    </section>
  );
}
