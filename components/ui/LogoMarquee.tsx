import Image from "next/image";

type Logo = { src: string; alt: string };

/**
 * Infinite logo marquee band. Logos scroll continuously, are normalised to the same
 * height, and fade in/out to white on both edges. The band bleeds to the frame's
 * side rails (frame-bleed) and its top/bottom hairlines run the full frame width, so
 * it "connects" to the main frame rules. Pauses under prefers-reduced-motion.
 */
export function LogoMarquee({ logos, caption }: { logos: Logo[]; caption?: string }) {
  // Duplicate the set so the -50% translate loops seamlessly.
  const track = [...logos, ...logos];

  return (
    <div className="frame-bleed border-y border-light-border">
      {/* Single cell: caption and logos share one row, divided by the marquee mask. */}
      <div className="flex flex-col items-center gap-6 px-[clamp(20px,4vw,64px)] py-8 lg:flex-row lg:gap-10">
        {caption ? (
          <p className="shrink-0 font-display text-body font-medium text-light-muted">
            {caption}
          </p>
        ) : null}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-16">
            {track.map((logo, i) => (
              <div key={i} className="flex h-8 shrink-0 items-center">
                <Image
                  src={logo.src}
                  alt={i < logos.length ? logo.alt : ""}
                  width={140}
                  height={32}
                  className="h-6 w-auto object-contain opacity-70 transition hover:opacity-100"
                  aria-hidden={i >= logos.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
