import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { sHero } from "@/content/services";

/**
 * /services hero — white themed, compact, on the inverted studio texture
 * (same register as the pricing white-label band). The texture is confined
 * to the frame column: it spans rail to rail (ignoring the frame's inline
 * padding) but not the full viewport.
 */
export function ServicesHero() {
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
          {sHero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-body-lg font-medium leading-relaxed text-light-muted">
          {sHero.support}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {sHero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}
