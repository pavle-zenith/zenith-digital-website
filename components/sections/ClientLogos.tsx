import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { clientLogos } from "@/content/case-studies";

/**
 * Client logo strip — two stacked infinite marquee rows (opposite directions)
 * carrying all client marks. Bleeds to the frame rails with a single pair of
 * top/bottom rules; edges fade with a mask. Pauses under reduced motion via
 * the global media query.
 */
export function ClientLogos() {
  const half = Math.ceil(clientLogos.length / 2);
  const rows = [clientLogos.slice(0, half), clientLogos.slice(half)];

  return (
    <Section tone="light" frameClassName="!py-0" divide={false}>
      {/* Own top rule (the testimonials band above is border-t only); the grid
          section below brings its frame divider. */}
      <div className="frame-bleed flex flex-col gap-2 border-t border-light-border py-8">
        {rows.map((row, i) => (
          <MarqueeRow key={i} logos={row} reverse={i === 1} />
        ))}
      </div>
    </Section>
  );
}

function MarqueeRow({
  logos,
  reverse,
}: {
  logos: { src: string; alt: string }[];
  reverse?: boolean;
}) {
  // Duplicate the set so the 50% translate loops seamlessly.
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max items-center gap-20",
          reverse ? "animate-marquee-slow-reverse" : "animate-marquee-slow",
        )}
      >
        {track.map((logo, i) => (
          <div key={i} className="flex h-8 shrink-0 items-center">
            <Image
              src={logo.src}
              alt={i < logos.length ? logo.alt : ""}
              width={150}
              height={34}
              className="h-6 w-auto object-contain opacity-70"
              aria-hidden={i >= logos.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
