import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { tHero } from "@/content/testimonials";

/**
 * /testimonials hero — white, on the inverted studio texture (the same
 * treatment as every other page hero). H1 + support, then the proof stats as a
 * hairline-divided row. No CTAs: the wall below is the point, and the nav
 * already carries the conversion buttons.
 */
export function TestimonialsHero() {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-12 !pt-14 md:!pb-16 md:!pt-24"
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

      <div className="relative max-w-3xl">
        <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {tHero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-body-lg font-medium leading-relaxed text-light-muted">
          {tHero.support}
        </p>
      </div>

      {/* Proof stats — divided column on phones, inline row from sm up (the
          same rhythm as the case-study meta strip). Set below the H1 so the
          headline stays the largest thing on the page. */}
      <div className="relative mt-10 flex flex-col divide-y divide-light-border sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 md:mt-14">
        {tHero.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-baseline justify-between gap-6 py-3 first:pt-0 sm:block sm:px-10 sm:py-0 sm:first:pl-0"
          >
            <div className="font-display text-h2 font-medium leading-none">
              {stat.value}
            </div>
            <div className="max-w-[20ch] text-right text-body leading-snug text-light-muted sm:mt-2 sm:text-left">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
