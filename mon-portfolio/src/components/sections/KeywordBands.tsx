import { AsteriskIcon } from "@/components/Icons";

function Band({ words, className, reverse = false }: { words: string[]; className: string; reverse?: boolean }) {
  const track = [...words, ...words];
  return (
    <div className={`absolute left-[-5%] w-[110%] overflow-hidden py-4 md:py-5 ${className}`}>
      <ul className={`animate-marquee-fast flex w-max items-center gap-8 ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {track.map((word, i) => (
          <li key={`${word}-${i}`} className="flex items-center gap-8 font-display text-3xl whitespace-nowrap uppercase md:text-[44px]">
            {word}
            <AsteriskIcon size={30} className="text-accent" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two crossing, slanted keyword bands (template "slider-logo" section). */
export function KeywordBands({ words }: { words: string[] }) {
  return (
    <section aria-hidden className="relative h-[190px] overflow-hidden md:h-[240px]">
      <Band words={words} reverse className="top-1/2 -translate-y-1/2 rotate-[4deg] bg-field text-muted" />
      <Band words={words} className="top-1/2 -translate-y-1/2 -rotate-[3deg] bg-fg text-bg" />
    </section>
  );
}
