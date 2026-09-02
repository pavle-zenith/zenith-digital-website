import Image from "next/image";
import { servesRaw } from "@/lib/utils";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import type { CaseStudyDetail } from "@/content/case-studies";

/**
 * Detail-page hero — white, centered, on the inverted studio texture (same
 * register as the /services and /case-studies heroes). Breadcrumb, client
 * wordmark, then the outcome-led H1. Industry and the rest of the project
 * facts sit in the strip directly below (CaseStudyMetaStrip), and the hero
 * metric trio is held back for now — see the commented block.
 */
export function CaseStudyDetailHero({ study }: { study: CaseStudyDetail }) {
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

      {/* Left-aligned on phones, centered from md up. */}
      <div className="relative flex flex-col items-start text-left md:items-center md:text-center">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-label uppercase track-label text-light-muted"
        >
          <Link
            href="/case-studies"
            className="transition hover:text-light-text"
          >
            Case studies
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-light-text">{study.client}</span>
        </nav>

        <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:justify-center">
          {study.logoDark ? (
            <Image
              src={study.logoDark}
              unoptimized={servesRaw(study.logoDark)}
              alt={study.client}
              width={220}
              height={56}
              // Taller than the usual h-7: the /logos-dark wordmarks carry
              // heavy transparent padding, so the mark reads small at h-7.
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="font-display text-body-lg font-medium">
              {study.client}
            </span>
          )}
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {study.headline}
        </h1>

        {/* Hero metric trio — hidden for now (owner); the figures now show
            under the introduction instead. Drop this comment to bring the row
            back here too.
        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-light-border">
          {study.stats.map((m) => (
            <div key={m.label} className="sm:px-10 sm:first:pl-0 sm:last:pr-0">
              <div className="font-display text-h1 font-medium leading-none">
                {m.value}
              </div>
              <div className="mt-2 text-body text-light-muted">{m.label}</div>
            </div>
          ))}
        </div>
        */}
      </div>
    </Section>
  );
}
