"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn } from "@/lib/utils";
import { testimonials } from "@/content/home";

const CYCLE_MS = 6000;

/**
 * Testimonials — a split section. Left cell carries three key stats; right cell
 * shows the active testimonial (result headline, quote with **bold** spans,
 * avatar + name + role) over a row of client-logo tabs. Tabs auto-advance on a
 * timer and each carries a fill bar that tracks the countdown; clicking a tab
 * jumps to it and restarts the timer. Hovering the tabs pauses the rotation.
 * `showStats={false}` drops the stats cell and lets the testimonial run full width.
 */
export function Testimonials({ showStats = true }: { showStats?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.items.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const t = testimonials.items[active];

  return (
    <Section tone="light" frameClassName="!py-0" divide={false}>
      {/* Bleeds to the frame rails so every rule runs edge-to-edge (same pattern
          as the pricing grid). The two cells are split by a full-height vertical
          rule; each cell carries its own padding for internal spacing. Top rule
          only — the next section's divide (or ClientLogos' own top rule) closes
          the band, avoiding a double hairline. */}
      <div className="frame-bleed-md border-t border-light-border">
        <div
          className={cn(
            "grid",
            showStats &&
              "lg:grid-cols-[0.8fr_1.6fr] lg:divide-x lg:divide-light-border",
          )}
        >
          {/* Left cell: key stats. Outer (left) padding matches the frame gutter
              so content lines up with the rest of the site; inner padding sets
              the gap to the divider. */}
          {showStats && (
            <div className="flex flex-col justify-center gap-10 py-12 pl-[clamp(20px,4vw,64px)] pr-8 lg:pr-12">
              {testimonials.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-h2 font-medium leading-none tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-2 text-body text-light-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Right cell: testimonial + tabs. min-w-0 is load-bearing: the tab
              rail's fixed-width tabs would otherwise set this grid item's
              automatic minimum size to the full rail width and blow the page
              out horizontally on phones. */}
          <div
            className="flex min-w-0 flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className={cn(
                "flex min-h-[320px] flex-1 flex-col justify-center py-10 text-center",
                showStats
                  ? "pl-8 pr-[clamp(20px,4vw,64px)] lg:pl-12"
                  : "px-[clamp(20px,4vw,64px)]",
              )}
            >
              <h3 className="mx-auto max-w-xl font-display text-h3 font-medium leading-tight tracking-tight text-balance">
                {t.result}
              </h3>
              <blockquote className="mx-auto mt-6 max-w-2xl text-body-lg leading-snug text-light-muted text-balance">
                <RichQuote text={t.quote} />
              </blockquote>

              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-[6px] border border-light-border">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span className="text-left">
                  <span className="flex items-center gap-1.5 font-display font-medium">
                    {t.name}
                    <VerifiedCheck className="text-light-text" />
                  </span>
                  <span className="block text-body text-light-muted">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </div>

            {/* Logo tabs with fill bars. Phones scroll them as a rail with a
                fixed tab width: five in a grid leaves ~60px a logo, which
                squeezes each mark to a different size and reads as jumping.
                From sm up they go back to the even five-column row. */}
            <div className="flex snap-x snap-mandatory overflow-x-auto border-t border-light-border [scrollbar-width:none] sm:grid sm:grid-cols-5 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
              {testimonials.items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={cn(
                    "relative flex w-32 shrink-0 snap-start items-center justify-center border-l border-light-border px-2 py-5 transition first:border-l-0 sm:w-auto sm:min-w-0 sm:py-6",
                    i === active
                      ? "bg-light-surface"
                      : "bg-light-bg hover:bg-light-surface/60",
                  )}
                >
                  <Image
                    src={item.logo}
                    alt={item.logoAlt}
                    width={120}
                    height={26}
                    className={cn(
                      "w-auto max-w-full object-contain transition",
                      // per-logo size override for marks with baked-in padding
                      "logoClass" in item && item.logoClass
                        ? item.logoClass
                        : "h-4 sm:h-5",
                      // white marks get inverted to read on the light tab row
                      "invertLogo" in item && item.invertLogo && "invert",
                      i === active ? "opacity-100" : "opacity-40",
                    )}
                  />
                  {/* Fill bar: fills over the cycle on the active tab (keyframe
                    restarts via the key); stays full on past tabs, empty ahead. */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-light-border">
                    <span
                      key={`${i}-${active}`}
                      className="block h-full origin-left bg-accent"
                      style={
                        i === active
                          ? {
                              animation: paused
                                ? "none"
                                : `tab-fill ${CYCLE_MS}ms linear forwards`,
                              width: paused ? "0%" : undefined,
                            }
                          : { width: i < active ? "100%" : "0%" }
                      }
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rating bar — full-width row, edge-to-edge top rule; content inset
            to the frame gutter on both sides. The platform name links to the
            profile: the site never names it without linking out. */}
        <div className="flex border-t border-light-border px-[clamp(20px,4vw,64px)] py-6">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body text-light-text">
            Rated{" "}
            <span className="font-display font-medium">
              {testimonials.rating.score}
            </span>{" "}
            on{" "}
            <a
              href={testimonials.rating.href}
              target="_blank"
              rel="noopener"
              className="font-display font-medium underline underline-offset-4 transition hover:text-light-muted"
            >
              {testimonials.rating.platform}
            </a>
            <Stars />
          </p>
        </div>
      </div>
    </Section>
  );
}

/** Render a quote string, emphasizing **bolded** spans. */
function RichQuote({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      &ldquo;
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-light-text">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
      &rdquo;
    </>
  );
}

/** Five accent-colored stars. */
function Stars() {
  return (
    <span className="ml-1 inline-flex gap-0.5 text-accent" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </span>
  );
}
