import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { csHero } from "@/content/case-studies";

/**
 * /case-studies hero — light and compact (Braintrust register): one bold
 * two-tone statement H1 (primary sentence in ink, continuation muted) with the
 * two conversion CTAs bottom-right, on the inverted studio texture confined
 * to the frame column (same register as the /services hero).
 */
export function CaseStudiesHero() {
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
          // The hero texture is the largest paint on a phone: load it first.
          priority
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

      <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <h1 className="max-w-3xl font-display text-statement font-medium tracking-tight text-balance">
          {csHero.heading}{" "}
          <span className="text-light-muted">{csHero.headingMuted}</span>
        </h1>

        <div className="flex flex-wrap gap-3 lg:shrink-0 lg:pb-1">
          {csHero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}
