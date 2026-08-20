"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { post as furniture } from "@/content/blog";
import { cn } from "@/lib/utils";

/**
 * THE AUDIT ASK, and the one CTA on a post that is not a dark photo band.
 *
 * It is deliberately the odd one out. Every other ask on the page closes
 * something; this one gives something away, so it reads as a product panel
 * rather than a page footer: light ground, navy type, the promises on the
 * left, and the deliverable drawn on the right. Showing what you get converts
 * better than describing it, and it is our own output rather than stock art.
 *
 * SIZED FOR AN ARTICLE COLUMN, not a page. It renders inside a post body at
 * roughly half the width a full section gets, so the heading is h3 rather than
 * h2 and every inset is a notch tighter. At page scale it was the loudest
 * thing on the article and pushed its own two columns into wrapping.
 *
 * NOT a CtaBand variant. A two-column split with a rendered artefact and a
 * field in it is a different object from a photograph with text on top, and
 * folding it into CtaBand would give that component two layouts and one name.
 *
 * The numbers on the card are illustrative and the card says so. A mock that
 * presents itself as a real result is a fabricated record; this one does not.
 */
export function AuditPanel({
  heading,
  paragraph,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const { points, form, report } = furniture.audit;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div>
        <p className="font-display text-h3 font-medium leading-snug tracking-tight text-balance text-light-text">
          {heading}
        </p>
        <p className="mt-3 max-w-md text-body leading-relaxed text-light-muted">
          {paragraph}
        </p>

        <PromiseList points={points} />
        <HandoffField
          placeholder={form.placeholder}
          label={form.label}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </div>

      {/* The artefact. Two stacked white cards on a tinted ground, which is
          the site's surface-over-surface elevation rather than a shadow. */}
      <div className="rounded-card bg-light-surface p-4 md:p-5">
        <div className="rounded-[10px] border border-light-border bg-light-bg p-5">
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {report.label}
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <p className="font-display font-medium leading-none tracking-tight text-light-text">
              <span className="text-h1 tabular-nums">{report.score}</span>
              <span className="text-body-lg text-light-muted">
                {report.outOf}
              </span>
            </p>
            {/* Amber, not red: the palette has a warning token and no danger
                one, and inventing a hue for a mock is not worth a new token. */}
            <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/10 px-3 py-1 font-mono text-label uppercase track-label text-warning-ink">
              {report.issues}
            </span>
          </div>
          <p className="mt-2 text-body text-light-muted">{report.scoreLabel}</p>
        </div>

        <div className="mt-3 rounded-[10px] border border-light-border bg-light-bg p-5">
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {report.findingsLabel}
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {report.findings.map((finding) => (
              <li
                key={finding.label}
                className="flex gap-3 text-body leading-snug text-light-text"
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-[0.45rem] h-2 w-2 shrink-0 rounded-full",
                    finding.severity === "high" ? "bg-accent" : "bg-warning",
                  )}
                />
                <span>{finding.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * The promises, one open at a time. A hairline-divided column rather than
 * separate cards (which is what FaqAccordion draws): three short claims read
 * as one list, and the open one is marked by an accent rule down its left edge
 * rather than by a chevron.
 */
function PromiseList({
  points,
}: {
  points: { title: string; body: string }[];
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-6 divide-y divide-light-border rounded-card border border-light-border">
      {points.map((point, i) => {
        const isOpen = open === i;
        return (
          <div
            key={point.title}
            className={cn(
              "border-l-2 transition-colors",
              isOpen ? "border-l-accent" : "border-l-transparent",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(i)}
              className="w-full px-4 py-3.5 text-left"
            >
              <span
                className={cn(
                  "font-display leading-snug transition",
                  isOpen
                    ? "font-medium text-light-text"
                    : "text-light-muted hover:text-light-text",
                )}
              >
                {point.title}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-body leading-relaxed text-light-muted">
                  {point.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * One field and one button, and it is a HANDOFF rather than a second funnel.
 *
 * The real audit needs an email as well, and standing up a second form here
 * would mean a second Supabase write and two places to keep the copy in step.
 * So this carries the URL to /free-website-audit as a query parameter, where
 * AuditForm prefills it. Submitting empty still goes there, just without the
 * head start, and with JavaScript off the button is a plain link to the same
 * place.
 */
function HandoffField({
  placeholder,
  label,
  ctaLabel,
  ctaHref,
}: {
  placeholder: string;
  label: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  const router = useRouter();
  const [site, setSite] = useState("");

  const target = site.trim()
    ? `${ctaHref}?site=${encodeURIComponent(site.trim())}#audit-form`
    : `${ctaHref}#audit-form`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(target);
      }}
      className="mt-5 flex flex-col gap-2 rounded-card border border-light-border bg-light-bg p-2 sm:flex-row sm:items-center"
    >
      <label className="sr-only" htmlFor="audit-panel-site">
        {label}
      </label>
      <input
        id="audit-panel-site"
        name="site"
        type="text"
        inputMode="url"
        autoComplete="url"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-body text-light-text outline-none placeholder:text-light-muted"
      />
      {/* Matches the shared Button's primary face. It cannot BE that component:
          Button renders a link, and this has to submit. */}
      <button
        type="submit"
        className="group btn-animated inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-5 py-2.5 text-body font-medium text-accent-ink transition active:scale-[.99] sm:w-auto"
      >
        {ctaLabel}
        <span aria-hidden className="btn-arrow">
          &rarr;
        </span>
      </button>
    </form>
  );
}
