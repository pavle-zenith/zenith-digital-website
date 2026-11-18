import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { sHero } from "@/content/services";
import { hubRoutable } from "@/content/industries";

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

      {/* Wider than the other light heroes: this heading is a full sentence
          (70 characters), so in a 3xl column it stacked into three short
          lines. The statement size in a 5xl column sets it in two. */}
      <div className="relative max-w-5xl">
        <h1 className="font-display text-statement font-medium tracking-tight text-balance">
          {sHero.heading}
        </h1>
        <p className="mt-6 max-w-[54rem] text-body-lg font-medium leading-relaxed text-light-muted text-pretty">
          {sHero.support}
        </p>
        {/* Gated on the hub, like every link to /industries. */}
        {hubRoutable ? (
          <Link
            href={sHero.industriesLink.href}
            className="group mt-4 inline-flex items-center gap-1.5 font-display text-body font-medium transition hover:text-accent"
          >
            {sHero.industriesLink.label}{" "}
            <span aria-hidden className="btn-arrow">
              &rarr;
            </span>
          </Link>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {sHero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>
      </div>
    </Section>
  );
}
