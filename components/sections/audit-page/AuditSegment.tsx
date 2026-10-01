import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import {
  BAND_LABEL,
  BAND_PILL,
  fixesOf,
  tally,
} from "@/content/audits/score";
import type { AuditSegment as Segment } from "@/content/audits/types";
import { AuditFixList } from "./AuditFixList";
import { CheckIcon } from "@/components/sections/private-doc/icons";
import { EvidenceFigure } from "@/components/sections/private-doc/EvidenceFigure";

/**
 * One scored segment. Every segment has the same shape, which is what makes the
 * page scannable: a score, what's working, what to fix, how Google reads it,
 * and the proof.
 *
 * FIXES FIRST ON PHONES. On a narrow screen the reader gets one column, and the
 * problems are what they came for, so the "What to fix" panel moves above
 * "What's working" below `md`. Desktop keeps working-then-fix left to right.
 *
 * The panels are a hairline grid (1px gaps over the rule colour, solid cells)
 * that bleeds to the rails from `md`, and the "How Google sees it" band sits
 * directly under them carrying the only rule between the two, so there is
 * never a double hairline where they meet.
 */
export function AuditSegment({
  segment,
  slug,
  index,
}: {
  segment: Segment;
  slug: string;
  /** Position on the page: odd segments take the surface tint. */
  index: number;
}) {
  const t = tally(segment.checks);
  const passes = segment.checks.filter((c) => c.status === "pass");
  const fixes = fixesOf(segment.checks);
  const evidence = segment.evidence ?? [];
  const workingId = `${segment.id}-working`;
  const fixId = `${segment.id}-fix`;

  return (
    <Section
      id={segment.id}
      tone="light"
      className={cn("doc-anchor", index % 2 === 1 && "bg-light-surface")}
      frameClassName="!py-14 md:!py-20"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
          {segment.name}
        </h2>
        <span
          className={cn(
            "inline-flex items-center rounded-full border bg-light-bg px-3 py-1 font-mono text-label uppercase track-label tabular-nums",
            BAND_PILL[t.band],
          )}
        >
          {t.score} &middot; {BAND_LABEL[t.band]}
        </span>
      </div>
      <p className="mt-3 font-mono text-label uppercase track-label text-light-muted">
        {t.passed} of {t.total} checks passed
      </p>

      <div className="frame-bleed-md mt-10 grid gap-px border-t border-light-border bg-light-border md:grid-cols-2">
        <div role="group" aria-labelledby={workingId} className="bg-light-bg px-5 py-7 md:px-[clamp(20px,4vw,64px)] md:py-8">
          <PanelChip id={workingId} tone="positive">
            What&rsquo;s working
          </PanelChip>
          {passes.length ? (
            <ul role="list" className="mt-3 divide-y divide-light-border">
              {passes.map((c) => (
                <li key={c.label} className="flex items-start gap-3 py-4">
                  <CheckIcon className="mt-1 h-[18px] w-[18px] shrink-0 text-positive-ink" />
                  <div>
                    <p className="font-medium text-light-text">{c.label}</p>
                    <p className="mt-1 text-body text-light-muted">{c.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            // Kept rather than collapsed, so the two-panel layout never jumps.
            <p className="mt-3 py-4 text-body text-light-muted">Nothing passing here yet.</p>
          )}
        </div>

        <div
          role="group"
          aria-labelledby={fixId}
          className="order-first bg-light-bg px-5 py-7 md:order-none md:px-[clamp(20px,4vw,64px)] md:py-8"
        >
          <PanelChip id={fixId} tone="negative">
            What to fix
          </PanelChip>
          <div className="mt-3">
            <AuditFixList slug={slug} segmentId={segment.id} items={fixes} />
          </div>
        </div>
      </div>

      <div className="frame-bleed-md border-t border-accent-line bg-accent-subtle px-5 py-6 md:px-[clamp(20px,4vw,64px)] md:py-7">
        <p className="font-mono text-label uppercase track-label text-light-muted">
          How Google sees it
        </p>
        <p className="mt-2 max-w-(--measure) text-body-lg text-light-text">
          {segment.googleSees}
        </p>
      </div>

      {evidence.length ? (
        <div
          className={cn(
            "mt-10 grid gap-6 md:gap-8",
            evidence.length > 1 ? "md:grid-cols-2" : "max-w-3xl",
          )}
        >
          {evidence.map((img) => (
            <EvidenceFigure key={img.src} image={img} />
          ))}
        </div>
      ) : null}
    </Section>
  );
}

/** Panel label. The status colour rides on the dot; the word is -ink text. */
function PanelChip({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "positive" | "negative";
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-light-bg px-3 py-1 font-mono text-label uppercase track-label",
        tone === "positive"
          ? "border-positive/40 text-positive-ink"
          : "border-negative/40 text-negative-ink",
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", tone === "positive" ? "bg-positive" : "bg-negative")}
      />
      {children}
    </p>
  );
}
