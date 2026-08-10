import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { pStories } from "@/content/partnerships";

/**
 * Partner case studies — the core proof section, light (DesignMe case-card
 * register). Each partner is a full-width row: site shot left (framed
 * placeholder until the owner sets `image`) with the stats in a translucent
 * blur bar along its bottom edge; right: logo + duration pill meta row,
 * headline, story, primary case-study CTA + secondary apply CTA, and a
 * bottom-pinned light-surface quote card where one exists (the AdVantage
 * quote is the featured, largest treatment). The summary stat row closes the
 * section under a hairline.
 */
export function PartnerStories() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      {/* Header: heading left, support right */}
      <div className="mb-4 grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {pStories.heading}
        </h2>
        <p className="max-w-md text-body-lg font-medium text-light-muted md:justify-self-end md:text-right">
          {pStories.intro}
        </p>
      </div>

      {/* Story rows — the track bleeds to the frame rails so the dividing
          hairlines run edge to edge; each row re-applies the gutter. */}
      <div className="frame-bleed-md divide-y divide-light-border">
        {pStories.stories.map((s) => (
          <article
            key={s.name}
            className="grid gap-8 px-0 py-10 last:pb-0 md:px-[clamp(20px,4vw,64px)] md:py-14 lg:grid-cols-2 lg:gap-16"
          >
            {/* Media: partner site shot (or the framed placeholder) with the
                stats riding the bottom edge in a translucent blur bar */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-light-border bg-light-surface">
              {s.image ? (
                <Image
                  src={s.image}
                  alt={`${s.name} work`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-x-10 gap-y-3 rounded-[8px] border border-white/15 bg-bg/55 p-4 backdrop-blur-md">
                {s.stats.map((st) => (
                  <div key={st.label}>
                    <div className="font-display text-h3 font-medium leading-none tracking-tight text-white">
                      {st.value}
                    </div>
                    <div className="mt-1.5 max-w-[22ch] text-body leading-snug text-white/70">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details — a flex column so the quote can pin to the bottom */}
            <div className="flex flex-col">
              {/* Meta row: logo (wordmark fallback) + relationship-duration pill */}
              <div className="flex flex-wrap items-center gap-3">
                {s.logo ? (
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={160}
                    height={40}
                    className="h-6 w-auto object-contain"
                  />
                ) : (
                  <span className="font-display text-body-lg font-medium">
                    {s.name}
                  </span>
                )}
                <span className="rounded-full border border-light-border px-3 py-1 font-mono text-[11px] uppercase track-label text-light-muted">
                  {s.relationship}
                </span>
              </div>

              <h3 className="mt-6 font-display text-h3 font-medium leading-snug tracking-tight text-balance">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xl text-body leading-relaxed text-light-muted">
                {s.story}
              </p>

              {/* CTAs: case study primary, partnership apply secondary */}
              <div className="mt-8 flex flex-wrap gap-3">
                {s.href ? (
                  <Button
                    cta={{
                      label: "Read the case study",
                      href: s.href,
                      variant: "primary",
                    }}
                    tone="light"
                  />
                ) : null}
                <Button
                  cta={{
                    label: "Apply for partnership",
                    href: "#apply",
                    variant: "secondary",
                  }}
                  tone="light"
                />
              </div>

              {/* Quote card — pinned to the column bottom (the spacer absorbs
                  spare height, mt-8 keeps a minimum gap); the featured one
                  (AdVantage) gets the large treatment */}
              {s.quote ? (
                <>
                  <div className="flex-1" aria-hidden />
                  <figure className="mt-8 rounded-[8px] bg-light-surface p-6">
                    <blockquote
                      className={cn(
                        "leading-relaxed",
                        s.featured
                          ? "font-display text-body-lg font-medium leading-snug"
                          : "text-body text-light-text",
                      )}
                    >
                      &ldquo;{s.quote.text}&rdquo;
                    </blockquote>
                    {s.quote.name ? (
                      <figcaption className="mt-4 flex items-center gap-3">
                        {s.quote.avatar ? (
                          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={s.quote.avatar}
                              alt={s.quote.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </span>
                        ) : null}
                        <span>
                          <span className="flex items-center gap-1.5 font-display font-medium">
                            {s.quote.name}
                            <VerifiedCheck />
                          </span>
                          {s.quote.role ? (
                            <span className="block text-body text-light-muted">
                              {s.quote.role}
                            </span>
                          ) : null}
                        </span>
                      </figcaption>
                    ) : null}
                  </figure>
                </>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** Scalloped verified badge (same mark as the video testimonial cards). */
function VerifiedCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] shrink-0 text-light-text"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" />
    </svg>
  );
}
