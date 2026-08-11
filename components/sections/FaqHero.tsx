import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { fHero } from "@/content/faq";

/**
 * /faq hero — white themed, compact, on the inverted studio texture confined
 * to the frame column (same register and sizing as the /services hero).
 */
export function FaqHero() {
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
          {fHero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-body-lg font-medium leading-relaxed text-light-muted">
          {fHero.support}
        </p>
      </div>
    </Section>
  );
}
