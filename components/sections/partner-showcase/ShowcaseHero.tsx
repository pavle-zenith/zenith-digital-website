import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { partnerShowcaseUi as ui } from "@/content/partner-showcase";
import type { PartnerShowcase } from "@/content/partner-showcase";

/**
 * The cover, in the homepage hero's light register: the studio texture
 * inverted on white, under a left-to-right white scrim, so the headline column
 * sits on near-solid ground and the texture shows only on the right.
 *
 * Laid out like the homepage hero: eyebrow, headline at H1 size, lead and both
 * actions on the left; the three Wix credentials bottom-right, on the textured
 * side, where they need no contrast from the scrim (they are badges, not
 * text). No hero image: the work reel directly below is the visual.
 *
 * Top padding clears the page's own header, which is laid over this section.
 * #showcase-hero: the jump bar stays hidden until it has scrolled away.
 */
export function ShowcaseHero({ hero }: { hero: PartnerShowcase["hero"] }) {
  return (
    <div id="showcase-hero">
      <Section
        tone="light"
        divide={false}
        frameClassName="relative !pt-32 !pb-16 md:!pt-40 md:!pb-24 lg:!pb-28"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="100vw"
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

        <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
              {hero.heading}
            </h1>
            <p className="mt-6 max-w-2xl text-body-lg text-light-muted">{hero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button cta={hero.primaryCta} tone="light" />
              <Button cta={{ ...hero.secondaryCta, variant: "secondary" }} tone="light" />
            </div>
          </div>

          {/* Served as-is: trimmed, background-keyed WebP at 8-16KB for a
              box never taller than 80px, so an optimizer pass saves nothing. */}
          <ul className="flex shrink-0 items-end gap-4 lg:pb-2">
            {ui.badges.map((badge) => (
              <li key={badge.src}>
                <Image
                  src={badge.src}
                  alt={badge.alt}
                  width={badge.width}
                  height={240}
                  unoptimized
                  className="h-16 w-auto object-contain sm:h-20"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
