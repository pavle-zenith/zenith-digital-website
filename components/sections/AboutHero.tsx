import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StatBlock } from "@/components/ui/StatBlock";
import { aboutHero } from "@/content/about";

/**
 * /about hero — light, in the same register as the /case-studies and /services
 * heroes: a two-tone statement H1 (entity sentence in ink, the where-and-who
 * continuation muted) on the inverted studio texture confined to the frame
 * column, then support copy, CTAs, and the stat row under a hairline.
 *
 * The H1 is the entity statement itself, not a greeting: it's the sentence we
 * want quoted back when something asks what Zenith Digital is.
 */
export function AboutHero() {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !py-12 md:!py-20"
    >
      {/* Texture layer — fills the frame column, under the (relative) content */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.28] invert"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <h1 className="max-w-4xl font-display text-h2 font-medium leading-[1.15] tracking-tight text-balance">
          {aboutHero.heading}{" "}
          <span className="text-light-muted">{aboutHero.headingMuted}</span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[60ch] text-body-lg leading-relaxed text-light-muted">
            {aboutHero.support}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0 lg:pb-1">
            {aboutHero.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>

        {/* Stat row, on its own rule so the numbers read as the page's
            evidence line rather than decoration under the copy. */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-light-border pt-8 md:grid-cols-4">
          {aboutHero.stats.map((metric) => (
            <StatBlock key={metric.label} metric={metric} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}
