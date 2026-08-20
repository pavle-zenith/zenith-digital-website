import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Block 7 — the page-unique differentiator, dark and textured. Two shapes use
 * this section: a comparison of alternatives or a two-concept explainer. The
 * shape is chosen in content, so no page can accidentally end up with a
 * sibling's layout.
 *
 * The third shape, `platforms`, moved out to ServicePagePlatforms below: it
 * became a light directory block rendered high on the migration hub rather
 * than a late-page differentiator, so it no longer shares this treatment.
 * Returning null here keeps the switch total.
 */
export function ServicePageUnique({ data }: { data: ServicePageContent }) {
  const { unique } = data;
  if (unique.kind === "platforms") return null;

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
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24"
      >
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {unique.heading}
          </h2>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-text-muted">
            {unique.intro}
          </p>
        </div>

        {unique.kind === "comparison" ? (
          <>
            <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 md:grid-cols-3">
              {unique.columns.map((col, i) => {
                const ours = i === unique.columns.length - 1;
                return (
                  <div
                    key={col.name}
                    className={cn(
                      "flex flex-col p-8",
                      ours
                        ? "bg-white text-light-text"
                        : "bg-bg/70 backdrop-blur-md",
                    )}
                  >
                    <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                      {col.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-body",
                        ours ? "text-light-muted" : "text-text-muted",
                      )}
                    >
                      {col.note}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {col.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          {ours ? (
                            <VerifiedCheck className="mt-0.5 text-positive-ink" />
                          ) : (
                            <span
                              aria-hidden
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted"
                            />
                          )}
                          <span
                            className={cn(
                              "text-body leading-snug",
                              ours ? "text-light-text" : "text-text-muted",
                            )}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 max-w-2xl border-t border-border pt-8">
              <h3 className="font-display text-body-lg font-medium">
                {unique.footnote.title}
              </h3>
              <p className="mt-2 text-body leading-relaxed text-text-muted">
                {unique.footnote.body}
              </p>
            </div>
          </>
        ) : null}

        {unique.kind === "explainer" ? (
          <>
            <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-border bg-border md:mt-12 md:grid-cols-2">
              {[unique.left, unique.right].map((side) => (
                <div key={side.title} className="bg-bg/70 p-8 backdrop-blur-md">
                  <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
                    {side.title}
                  </h3>
                  <p className="mt-4 text-body leading-relaxed text-text-muted">
                    {side.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl border-t border-border pt-8 text-body-lg leading-relaxed text-text-muted">
              {unique.closing}
            </p>
          </>
        ) : null}
      </Section>
    </div>
  );
}

/**
 * The platforms directory — the migration hub's signpost to its guide spokes.
 *
 * White on the inverted studio texture, the same treatment as the page hero,
 * because this block sits high on the page now (above "what a migration
 * covers") and needs to read as an entry point rather than a late-page
 * differentiator.
 *
 * Cards are deliberately thin: mark, platform name, one sentence, link. The
 * detail belongs on the spoke.
 *
 * The grid is 6 columns at lg and 4 at md, with each card spanning 2, which
 * renders as the 3-up and 2-up it looks like. The reason for the indirection
 * is the last row: a card count that isn't a multiple of the column count used
 * to leave the remaining cells empty, and because the cards are separated by
 * `gap-px` over a `bg-light-border` fill, an empty cell reads as a grey hole
 * rather than as whitespace. Spanning the trailing orphans across the leftover
 * columns closes it, so the block stays whole at any number of platforms.
 */
export function ServicePagePlatforms({ data }: { data: ServicePageContent }) {
  const { unique } = data;
  if (unique.kind !== "platforms") return null;

  // Trailing cards stretch to fill the last row. Class strings are written out
  // in full rather than composed, so Tailwind's scanner can see them.
  const total = unique.items.length;
  const lgOrphans = total % 3;
  const mdOrphans = total % 2;
  const spanClass = (i: number) => {
    const fromEnd = total - i;
    const md =
      mdOrphans === 1 && fromEnd === 1 ? "md:col-span-4" : "md:col-span-2";
    const lg =
      lgOrphans === 1 && fromEnd === 1
        ? "lg:col-span-6"
        : lgOrphans === 2 && fromEnd <= 2
          ? "lg:col-span-3"
          : "lg:col-span-2";
    return `${md} ${lg}`;
  };

  return (
    <Section tone="light" frameClassName="relative !py-14 md:!py-24">
      {/* Texture layer — fills the frame column, under the (relative) content.
          Same inverted wash as ServicePageHero. */}
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
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 50%, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {unique.heading}
          </h2>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {unique.intro}
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-4 lg:grid-cols-6">
          {unique.items.map((item, index) => {
            const body = (
              <>
                {/* Rounded-square chip, the sitewide icon-container shape
                    (CLAUDE.md §15). White fill rather than the surface tint:
                    these marks are drawn for white, and the Wix one carries a
                    light knockout that would vanish on a grey chip.

                    A real brand mark wins; entries that are not a brand ("HTML",
                    "AI builders") carry a line glyph instead. The space is
                    reserved even with neither, so a mark-less card still lines
                    up with its row. */}
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[6px] border border-light-border bg-light-bg text-light-text">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  ) : item.icon ? (
                    <FeatureIcon name={item.icon} />
                  ) : null}
                </span>

                <h3 className="mt-6 font-display text-h3 font-medium leading-tight tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-3 text-body leading-relaxed text-light-muted">
                  {item.desc}
                </p>

                {item.href ? (
                  <>
                    <span className="flex-1" aria-hidden />
                    <span className="mt-8 inline-flex items-center gap-2 font-display font-medium text-light-text">
                      Read the guide
                      <span className="btn-arrow" aria-hidden>
                        &rarr;
                      </span>
                    </span>
                  </>
                ) : null}
              </>
            );

            return (
              <li key={item.name} className={`flex ${spanClass(index)}`}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group flex w-full flex-col bg-light-bg p-8 transition hover:bg-light-surface"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="flex w-full flex-col bg-light-bg p-8">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
