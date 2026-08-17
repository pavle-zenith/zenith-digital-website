import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { ServicePageContent } from "@/content/service-pages";

/**
 * Related services — light. The sibling services render as the homepage
 * service-card register (hairline grid, 16:10 media, title, one line of copy)
 * so the two pages read as one system, and the hub link closes the section as
 * the full-width strip CTA borrowed from the case-study template. The page
 * never dead-ends and the internal link graph stays connected.
 *
 * The hub item is the one pointing at /services; everything else is a sibling.
 */
export function ServicePageRelated({ data }: { data: ServicePageContent }) {
  const siblings = data.related.items.filter((i) => i.href !== "/services");
  const hub = data.related.items.find((i) => i.href === "/services");

  return (
    // No bottom padding: the "All services" strip is the last thing in here and
    // sits flush against the CTA band below, the way the strip reads as a
    // boundary rather than a floating row. Top padding is the usual rhythm.
    <Section tone="light" frameClassName="!pt-12 !pb-0 md:!pt-20">
      <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
        {data.related.heading}
      </h2>

      {siblings.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-10 md:grid-cols-2">
          {siblings.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col bg-light-bg p-6 transition hover:bg-light-surface"
            >
              {/* Drag-to-compare widget when the item carries a before/after
                  pair (migration always does), otherwise the static mockup.
                  Same rule as the homepage services grid. */}
              {item.beforeAfter ? (
                <div className="mb-6">
                  <BeforeAfterSlider
                    title={item.label}
                    before={item.beforeAfter.before}
                    after={item.beforeAfter.after}
                    caption={false}
                    labels={false}
                    frameClassName="aspect-[16/10] rounded-[6px] border border-light-border bg-light-surface"
                  />
                </div>
              ) : item.image ? (
                <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    aria-hidden
                  />
                </div>
              ) : null}
              <h3 className="font-display text-h3 font-medium transition group-hover:text-accent">
                {item.label}
              </h3>
              <p className="mt-2 max-w-md text-body leading-snug text-light-muted">
                {item.desc}
              </p>
              {/* Secondary-button styling on a span, not a nested <a>: the whole
                  card is already the link, and an anchor inside an anchor is
                  invalid and traps keyboard users on a second tab stop. */}
              <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-light-border px-6 py-3 text-body font-medium text-light-text transition group-hover:bg-light-bg sm:w-auto sm:self-start">
                Explore this service
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      {/* Full-width strip CTA closing the section, on the inverted studio
          texture the page heroes use. Same treatment as "All case studies" on
          the case-study template. Draws only its top rule; the next section's
          divide owns the boundary beneath it. */}
      {hub ? (
        <Link
          href={hub.href}
          className="group frame-bleed relative isolate mt-12 flex items-center justify-between gap-6 overflow-hidden border-t border-light-border px-[clamp(20px,4vw,64px)] py-7 transition hover:bg-light-surface md:mt-16 md:py-9"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10"
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
          <span className="font-display text-h3 font-medium tracking-tight">
            {hub.label}
          </span>
          <span aria-hidden className="btn-arrow text-h3">
            &rarr;
          </span>
        </Link>
      ) : null}
    </Section>
  );
}
