"use client";

import Image from "next/image";
import { Fragment } from "react";

import { useAutoCycle } from "@/lib/useAutoCycle";

import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { cn, servesRaw } from "@/lib/utils";
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
  const count = testimonials.items.length;
  const {
    active,
    select: setActive,
    paused,
    setPaused,
    stopped,
  } = useAutoCycle(count, CYCLE_MS);


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
            {/* Every testimonial is in the markup; the inactive ones are
                hidden with CSS. Mounting one at a time meant four of the five
                quotes and outcome headlines never reached the server-rendered
                HTML, so an answer engine reading this page saw a fifth of the
                social proof. The panels share one grid cell, so the band is as
                tall as its longest quote and nothing reflows on advance.

                Each panel is a <figure> wrapping its own <blockquote> and
                <figcaption>: the caption previously sat with no figure parent,
                which is an invalid content model and left the attribution
                programmatically unconnected to the quote it attributes. */}
            <div
              className={cn(
                "grid min-h-[320px] flex-1 py-10 text-center",
                showStats
                  ? "pl-8 pr-[clamp(20px,4vw,64px)] lg:pl-12"
                  : "px-[clamp(20px,4vw,64px)]",
              )}
            >
              {testimonials.items.map((item, i) => (
                <figure
                  key={item.name}
                  className={cn(
                    "col-start-1 row-start-1 m-0 flex flex-col justify-center transition-opacity duration-300 motion-reduce:transition-none",
                    i === active ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                  aria-hidden={i !== active}
                >
                  <h3 className="mx-auto max-w-xl font-display text-h3 font-medium leading-tight tracking-tight text-balance">
                    {item.result}
                  </h3>
                  <blockquote className="mx-auto mt-6 max-w-2xl text-body-lg leading-snug text-light-muted text-balance">
                    <RichQuote text={item.quote} />
                  </blockquote>

                  <figcaption className="mt-8 flex items-center justify-center gap-3">
                    <span className="relative h-11 w-11 overflow-hidden rounded-[6px] border border-light-border">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                    <span className="text-left">
                      <span className="flex items-center gap-1.5 font-display font-medium">
                        {item.name}
                        <VerifiedCheck className="text-light-text" />
                      </span>
                      <span className="block text-body text-light-muted">
                        {item.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
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
                    unoptimized={servesRaw(item.logo)}
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
                              animation:
                                paused || stopped
                                  ? "none"
                                  : `tab-fill ${CYCLE_MS}ms linear forwards`,
                              // Stopped means the visitor picked this tab, so
                              // the bar sits full rather than empty: it reads
                              // as "this one", not "about to advance".
                              width: stopped
                                ? "100%"
                                : paused
                                  ? "0%"
                                  : undefined,
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
          {/* Two variants, chosen by whether a score is actually published.
              The stars only ever appear NEXT TO a number: five filled stars
              with no figure behind them is the unbacked claim this site exists
              to avoid, and with score:"" the old markup also rendered the
              literal sentence "Rated  on Trustpilot". When the owner publishes
              a score, the rated variant returns on its own. */}
          {testimonials.rating.score ? (
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
          ) : (
            <a
              href={testimonials.rating.href}
              target="_blank"
              rel="noopener"
              className="group inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-body text-light-text transition hover:text-light-muted"
            >
              Read our reviews on{" "}
              <span className="font-display font-medium underline underline-offset-4">
                {testimonials.rating.platform}
              </span>
              <span aria-hidden className="btn-arrow">
                &rarr;
              </span>
            </a>
          )}
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
