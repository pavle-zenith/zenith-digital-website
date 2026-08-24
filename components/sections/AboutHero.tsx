import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { aboutHero } from "@/content/about";

/**
 * /about hero — light, in the same register as the /case-studies and /services
 * heroes: a two-tone statement H1 (entity sentence in ink, the where-and-who
 * continuation muted) on the inverted studio texture confined to the frame
 * column, then support copy and CTAs.
 *
 * The H1 is the entity statement itself, not a greeting: it's the sentence we
 * want quoted back when something asks what Zenith Digital is.
 *
 * The stat row that used to close this section is gone from here. Those four
 * figures were a weaker restatement of `aboutNumbers` two sections below, so
 * the page asserted its numbers, then asserted them again. AboutVerify now
 * takes this slot with the records behind the claims instead.
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
          // Above the fold on this route, so it is the LCP candidate.
          priority
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

      </div>
    </Section>
  );
}
