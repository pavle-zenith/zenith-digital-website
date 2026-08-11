import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Service page hero — dark, on the faint studio texture. Breadcrumb, the
 * keyword-led H1, a two-line subhead, proof chips, and the two conversion
 * CTAs. Left-aligned throughout, phones included.
 */
export function ServicePageHero({ data }: { data: ServicePageContent }) {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!pb-14 !pt-10 md:!pb-20 md:!pt-14"
      >
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-text-muted"
        >
          <Link href="/services" className="transition hover:text-text">
            Services
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-text">{data.hero.name}</span>
        </nav>

        <div className="mt-10 max-w-4xl md:mt-14">
          <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {data.hero.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-text-muted">
            {data.hero.subhead}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {data.hero.chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-body font-medium"
              >
                {chip}
              </li>
            ))}
          </ul>

          {/* The accent fill is near-invisible on navy (§15), so the primary
              CTA is white-filled here and the secondary keeps the outline. */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {data.hero.ctas.map((cta) =>
              (cta.variant ?? "primary") === "primary" ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-white px-6 py-3 text-body font-medium text-bg transition hover:bg-white/90 sm:w-auto"
                >
                  {cta.label}{" "}
                  <span aria-hidden className="btn-arrow">
                    &rarr;
                  </span>
                </Link>
              ) : (
                <Button key={cta.href} cta={cta} tone="dark" />
              ),
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
