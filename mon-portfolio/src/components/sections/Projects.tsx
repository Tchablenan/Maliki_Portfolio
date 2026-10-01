import Image from "next/image";

import { ArrowUpRightIcon } from "@/components/Icons";
import { defaultProjectImages } from "@/data/profile";
import type { Dictionary } from "@/i18n/types";
import { pickImage } from "@/lib/media";
import type { SiteSettings } from "@/lib/settings";

export function Projects({ t, media }: { t: Dictionary["projects"]; media: SiteSettings["projects"] }) {
  return (
    <section id="projects" className="relative overflow-hidden py-20 md:py-[100px]">
      <Image src="/decor/pix-black-h.png" alt="" width={121} height={61} className="deco absolute top-0 right-[120px] hidden md:block" />

      <div className="site-container">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <div className="relative max-w-[460px]">
            <Image src="/decor/round.png" alt="" width={333} height={332} className="animate-spin-slow absolute -top-[40%] -left-[25%] -z-10 w-[330px] opacity-60 dark:opacity-20" />
            <h2 data-reveal className="section-title text-fg">{t.title}</h2>
          </div>
          <p data-reveal className="max-w-[520px] text-lg leading-[30px] font-medium text-muted md:text-xl lg:ml-auto">
            {t.text}
          </p>
        </div>

        <ol className="mt-16 flex flex-col gap-16 md:gap-20">
          {t.items.map((project, i) => {
            const visual = media[project.id] ?? { image: null, fit: "cover" as const, href: "" };
            const image = pickImage(visual.image, defaultProjectImages[project.id]);
            const isStatic = typeof image === "object" && image !== null;
            const isGif = (isStatic ? image.src : (image ?? "")).toLowerCase().endsWith(".gif");
            return (
              <li key={project.id} data-reveal className="group grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                  <div className="flex shrink-0 items-center gap-6">
                    <span className="font-display text-3xl text-fg transition-colors duration-500 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Image src="/decor/arrow.png" alt="" width={122} height={15} className="deco w-24 transition-transform duration-500 group-hover:translate-x-2 md:w-[122px]" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl leading-snug text-fg transition-colors duration-500 group-hover:text-accent md:text-[32px] md:leading-[44px]">
                      {project.title}
                    </h3>
                    <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                      {project.period} · {project.place}
                    </p>
                    <p className="text-base leading-7 text-muted md:text-lg">{project.description}</p>
                    <ul className="flex flex-wrap gap-2.5">
                      {project.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-line px-5 py-2 text-sm text-fg">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {visual.href && (
                      <a
                        href={visual.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1.5 text-base font-medium text-fg underline-offset-4 hover:text-accent hover:underline"
                      >
                        {t.linkLabel}
                        <ArrowUpRightIcon size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className={`relative aspect-[4/3] overflow-hidden ${visual.fit === "contain" ? "bg-white p-6 ring-1 ring-line md:p-10" : "bg-field"}`}>
                  {image && (
                    <div className="relative size-full">
                      <Image
                        src={image}
                        alt={project.title}
                        fill
                        placeholder={isStatic && !isGif ? "blur" : "empty"}
                        unoptimized={isGif}
                        sizes="(min-width: 1024px) 620px, 100vw"
                        className={`transition-transform duration-700 group-hover:scale-105 ${visual.fit === "contain" ? "object-contain" : "object-cover"}`}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
