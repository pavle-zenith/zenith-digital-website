import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Service page hero — white, on the inverted studio texture, the same register
 * as the /case-studies and case-study detail heroes. Breadcrumb, the
 * keyword-led H1, a two-line subhead, and the two conversion CTAs.
 * Left-aligned throughout, phones included.
 *
 * The proof stats sit outside the hero content area: ProjectsSlider, rendered
 * directly below, takes `hero.chips` and draws them as the meta strip heading
 * its screenshot track.
 */
export function ServicePageHero({ data }: { data: ServicePageContent }) {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-14 !pt-10 md:!pb-20 md:!pt-14"
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
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-light-muted"
        >
          <Link href="/services" className="transition hover:text-light-text">
            Services
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-light-text">{data.hero.name}</span>
        </nav>

        <div className="mt-10 max-w-4xl md:mt-14">
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {data.hero.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">
            {data.hero.subhead}
          </p>

          {/* On white the accent fill reads, so both CTAs are the shared
              Button. The white-filled primary this hero used was a navy-only
              workaround (§15). */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {data.hero.ctas.map((cta) => (
              <Button key={cta.href} cta={cta} tone="light" />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
