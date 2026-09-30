import Image from "next/image";
import Link from "next/link";

import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import type { AuditMark, AuditPage } from "@/content/audits/types";
import { CheckIcon, CrossIcon, DashIcon } from "./icons";

/**
 * The two priced ways forward, plus the matrix that separates them.
 *
 * Navy, textured, the same ground the pricing band uses: this system spends
 * the dark ground on the sections that carry proof and price rather than
 * alternating on a beat (DESIGN.md, The Spent Ground Rule).
 *
 * ON PHONES THE RECOMMENDED OPTION LEADS. Reading order on a narrow screen is
 * a recommendation whether or not anyone intends it, so the card we would
 * actually advise is the one that arrives first, and the source order stays
 * fix-then-rebuild for everyone reading the matrix left to right below it.
 *
 * The cross for "no" is muted, never red. Option 1 is a real option we would
 * take money for; marking its gaps in an alarm colour would argue against our
 * own recommendation rather than describing it.
 */

const MARKS: Record<AuditMark, { icon: typeof CheckIcon; className: string; label: string }> = {
  yes: { icon: CheckIcon, className: "text-positive", label: "Yes" },
  no: { icon: CrossIcon, className: "text-text-muted/60", label: "No" },
  partial: { icon: DashIcon, className: "text-text-muted", label: "Partly" },
};

export function AuditOffers({ offers }: { offers: AuditPage["offers"] }) {
  const { comparison } = offers;

  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-bg">
        <Image
          src="/textures/studio-texture.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.16]"
          aria-hidden
        />
      </div>

      <Section
        tone="dark"
        divide={false}
        className="bg-transparent"
        frameClassName="!py-14 md:!py-24"
      >
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
            {offers.heading}
          </h2>
          <p className="mt-4 text-body-lg text-text-muted">{offers.intro}</p>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-2">
          {offers.options.map((option) => (
            <article
              key={option.id}
              className={cn(
                "flex h-full flex-col rounded-card p-8",
                option.recommended
                  ? // White ground inside a dark section, so it owns the light
                    // focus-ring colour and its CTA takes the accent fill.
                    "tone-light order-first bg-light-bg text-light-text ring-1 ring-white/60 md:order-none"
                  : "tone-dark border border-border bg-surface",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "font-mono text-label uppercase track-label",
                    option.recommended ? "text-light-muted" : "text-text-muted",
                  )}
                >
                  {option.label}
                </span>
                {option.recommended ? (
                  <Pill accent tone="light">
                    Recommended
                  </Pill>
                ) : null}
              </div>

              <h3 className="mt-5 font-display text-h3 font-medium leading-tight tracking-tight">
                {option.name}
              </h3>

              <p className="mt-6 font-display text-h1 font-medium leading-none tracking-tight">
                {option.price}
              </p>
              <p
                className={cn(
                  "mt-3 text-body",
                  option.recommended ? "text-light-muted" : "text-text-muted",
                )}
              >
                {option.priceNote}
              </p>

              <p
                className={cn(
                  "mt-5 text-body italic",
                  option.recommended ? "text-light-muted" : "text-text-muted",
                )}
              >
                {option.bestFor}
              </p>

              <ul
                className={cn(
                  "mt-7 flex flex-1 flex-col gap-3 border-t pt-7",
                  option.recommended ? "border-light-border" : "border-border",
                )}
              >
                {option.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-body">
                    <CheckIcon
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0",
                        option.recommended
                          ? "text-positive-ink"
                          : "text-positive",
                      )}
                    />
                    <span
                      className={
                        option.recommended ? "text-light-text" : "text-text"
                      }
                    >
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={option.cta.href}
                className={cn(
                  "group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition active:scale-[.99]",
                  option.recommended
                    ? "btn-animated text-accent-ink"
                    : "bg-white text-bg hover:bg-white/90",
                )}
              >
                {option.cta.label}
                <span aria-hidden className="btn-arrow">
                  &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>

        {offers.credit ? (
          <p className="mt-6 text-center text-label tracking-normal text-text-muted">
            {offers.credit}
          </p>
        ) : null}

        {/* The matrix. A real table: this is genuinely two dimensions, criterion
            against option, and it scrolls inside its own frame rather than
            forcing the page sideways. */}
        <div className="mt-14 md:mt-20">
          <h3
            id="audit-comparison-heading"
            className="mb-6 font-display text-h3 font-medium leading-tight tracking-tight"
          >
            {comparison.heading}
          </h3>

          {/* Solid fill: nothing sits transparent over the studio texture
              (DESIGN.md, Studio Texture). Focusable and labelled, because a
              scroll region that cannot take focus cannot be scrolled from the
              keyboard in Safari. */}
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="audit-comparison-heading"
            className="overflow-x-auto rounded-card border border-border bg-bg [scrollbar-width:thin]"
          >
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                {comparison.heading}: {comparison.columns[0]} compared with{" "}
                {comparison.columns[1]}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-6 py-4 font-mono text-label uppercase track-label text-text-muted">
                    <span className="sr-only">What you get</span>
                  </th>
                  {comparison.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="w-[26%] px-6 py-4 font-display text-body font-medium text-text"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-b-0">
                    <th scope="row" className="px-6 py-4 text-body font-normal text-text">
                      {row.label}
                    </th>
                    <Cell mark={row.fix} note={row.fixNote} />
                    <Cell mark={row.rebuild} note={row.rebuildNote} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  );
}

/**
 * One mark. The icon is decorative and the word is the content, so a screen
 * reader hears "Yes", "No" or "Partly" rather than nothing, and a reader who
 * cannot separate the colours still gets the answer.
 */
function Cell({ mark, note }: { mark: AuditMark; note?: string }) {
  const { icon: Icon, className, label } = MARKS[mark];
  return (
    <td className="px-6 py-4 align-top">
      <span className="flex items-center gap-2">
        <Icon className={cn("h-[18px] w-[18px] shrink-0", className)} />
        <span className="text-body text-text">{label}</span>
      </span>
      {note ? (
        <span className="mt-1 block text-label text-text-muted">{note}</span>
      ) : null}
    </td>
  );
}
