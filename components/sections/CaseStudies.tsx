import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/content/home";

/**
 * Case studies showcase (ported from the live site). Section header (heading left,
 * intro right), then a single column of rows. Each row is TWO SEPARATE cards side by
 * side: a website thumbnail card on the left, and a per-client branded panel card on
 * the right (ray texture, logo, title, two stats, and a "View website" button).
 */
export function CaseStudies() {
  return (
    <Section tone="light" frameClassName="!py-12 md:!py-20">
      {/* Header */}
      <div className="mb-8 grid md:mb-12 gap-8 md:grid-cols-2 md:items-start">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {caseStudies.heading}
        </h2>
        <p className="text-body-lg font-medium text-light-muted">
          {caseStudies.intro}
        </p>
      </div>

      {/* Column of rows; each row = two separate cards with a gap between them */}
      <div className="flex flex-col gap-8">
        {caseStudies.items.map((cs) => (
          <div
            key={cs.client}
            className="grid gap-4 lg:min-h-[420px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]"
          >
            {/* Left card: thumbnail */}
            <div className="relative min-h-[280px] overflow-hidden rounded-[8px] border border-light-border bg-light-surface">
              <Image
                src={cs.thumb}
                alt={`${cs.client} website`}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover object-center"
              />
            </div>

            {/* Right card: panel with a texture image under a navy gradient
                tint. Taller on phones so the stacked content breathes. */}
            <div className="relative flex min-h-[420px] flex-col justify-between gap-8 overflow-hidden rounded-[8px] bg-bg p-8 text-white lg:min-h-0">
              {/* Placeholder texture image */}
              <Image
                src="/case-study-texture.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="pointer-events-none object-cover opacity-25"
                aria-hidden
              />
              {/* Gradient tint over the texture: solid navy at the bottom for
                  readable text, fading to translucent at the top so the texture shows */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, #010020 9.76905153508772%, rgba(3,1,58,0.3) 100%)",
                }}
                aria-hidden
              />

              {/* Logo pinned top */}
              <div className="relative">
                {cs.logo ? (
                  <Image
                    src={cs.logo}
                    alt={cs.client}
                    width={220}
                    height={56}
                    className="h-7 w-auto object-contain object-left"
                  />
                ) : (
                  <span className="font-display text-body-lg font-medium">
                    {cs.client}
                  </span>
                )}
              </div>

              {/* Title + stats + button pinned bottom */}
              <div className="relative flex flex-col gap-8">
                <h3 className="max-w-2xl font-display text-[1.375rem] font-medium leading-[1.25] tracking-tight text-balance sm:text-[1.75rem] sm:leading-[1.2]">
                  {cs.title}
                </h3>
                <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
                  <div className="flex gap-10">
                    {cs.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-h3 font-medium leading-none">
                          {s.value}
                        </div>
                        <div className="mt-1.5 text-body text-white/60">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[6px] bg-white px-5 py-2.5 sm:w-auto text-body font-medium text-light-text transition hover:bg-white/90"
                  >
                    View case study{" "}
                    <span aria-hidden className="btn-arrow">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
