import { AsteriskIcon } from "@/components/Icons";
import { partners } from "@/data/profile";

export function Partners({ label }: { label: string }) {
  // Rendered twice so the -50% translation loops seamlessly.
  const track = [...partners, ...partners];

  return (
    <section aria-label={label} className="rule-glow relative overflow-hidden py-6">
      <h2 className="sr-only">{label}</h2>
      <ul className="animate-marquee flex w-max items-center gap-14">
        {track.map((name, i) => (
          <li key={`${name}-${i}`} aria-hidden={i >= partners.length} className="flex items-center gap-14 font-display text-2xl whitespace-nowrap text-muted md:text-3xl">
            {name}
            <AsteriskIcon size={18} className="text-accent" />
          </li>
        ))}
      </ul>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10" style={{ background: "var(--fade-edges)" }} />
    </section>
  );
}
