import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import {
  GUIDE_ASIDE_GRID,
  GUIDE_SECTION_FRAME,
  GuideAside,
  GuideContentCol,
  guideAsideRow,
} from "./GuideAside";
import { cn } from "@/lib/utils";
import { transferStatusLabels } from "@/content/migration-guides";
import type {
  MigrationGuideContent,
  TransferStatus,
} from "@/content/migration-guides";

/**
 * "What carries across, and what gets rebuilt" — the signature component. The
 * one thing on these pages nobody else has written.
 *
 * Laid out vertically: the rows stack down the left as term-and-definition
 * pairs, with the four-state legend pinned beside them on the right, so the
 * vocabulary stays on screen while you read the rows that use it. A <dl>
 * rather than a <table>, because a stacked list of term/definition pairs is
 * what this actually is once it stops being a grid, and it keeps the pairing
 * machine-readable for the answer engines these pages are written for.
 *
 * WHY LIGHT. The states are distinguished partly by the accent, and the brand
 * accent (#02013a) is a near-black that disappears on navy. CLAUDE.md §15 sets
 * the precedent for swapping accent treatments on dark; here the cleaner fix
 * is to run it on white, where all four states read at full strength.
 *
 * State is carried by the written label as much as the colour, so it survives
 * greyscale and a screen reader. `lost` is deliberately muted rather than red:
 * these are facts about the platform, not errors.
 */

type StatusStyle = { dot: string; chip: string; text: string };

const STATUS_STYLES: Record<TransferStatus, StatusStyle> = {
  carries: {
    dot: "bg-positive-ink",
    chip: "border-light-border bg-light-bg",
    text: "text-light-text",
  },
  rebuilt: {
    dot: "bg-accent",
    chip: "border-accent-line bg-accent-subtle",
    text: "text-accent",
  },
  replaced: {
    // Hollow ring: a fourth shape, so the states differ by more than hue.
    dot: "border border-light-muted",
    chip: "border-light-border bg-light-bg",
    text: "text-light-text",
  },
  lost: {
    dot: "bg-light-muted",
    chip: "border-light-border bg-light-surface",
    text: "text-light-muted",
  },
};

const STATUS_ORDER: TransferStatus[] = [
  "carries",
  "rebuilt",
  "replaced",
  "lost",
];

/**
 * Exported so a blog `comparisonTable` row can carry the same chip. The four
 * states have to mean one thing across the site, which means one renderer for
 * them rather than a second set of styles that agree by coincidence.
 */
export function StatusChip({ status }: { status: TransferStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1",
        style.chip,
      )}
    >
      <span
        aria-hidden
        className={cn("h-2 w-2 shrink-0 rounded-full", style.dot)}
      />
      <span
        className={cn("font-mono text-label uppercase track-label", style.text)}
      >
        {transferStatusLabels[status].label}
      </span>
    </span>
  );
}

export function TransfersTable({ data }: { data: MigrationGuideContent }) {
  const { transfers } = data;

  return (
    <Section
      tone="light"
      frameClassName={GUIDE_SECTION_FRAME}
      id="what-carries-across"
    >
      <div className={GUIDE_ASIDE_GRID}>
        {/* Content column: heading and the stacked rows, flush left on the
            same line, matching the long-form sections. */}
        <GuideContentCol wide>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {transfers.heading}
          </h2>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {transfers.intro}
          </p>

          {/* Authored order is deliberate (carries leads) and never
              re-sorted. A hairline grid, not floating cards: gap-px over the
              rule colour with solid-filled cells (CLAUDE.md §15). The trailing
              filler keeps the block rectangular when the row count is odd. */}
          <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-cols-2">
            {transfers.rows.map((row) => (
              <div key={row.item} className="flex flex-col bg-light-bg p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
                    <FeatureIcon name={row.icon ?? ""} />
                  </span>
                  <StatusChip status={row.status} />
                </div>
                <dt className="mt-5 font-display text-body-lg font-medium leading-snug text-light-text">
                  {row.item}
                </dt>
                <dd className="mt-2 text-body leading-relaxed text-light-muted">
                  {row.note}
                </dd>
              </div>
            ))}
            {transfers.rows.length % 2 === 1 ? (
              <div aria-hidden className="hidden bg-light-bg md:block" />
            ) : null}
          </dl>

          {transfers.footnote ? (
            <p className="mt-10 text-body-lg leading-relaxed text-light-muted">
              {transfers.footnote}
            </p>
          ) : null}

          {/* The ask lands here because the reader has just been handed a list
              of things that may or may not apply to their own site. */}
          {transfers.cta ? (
            <div className="mt-10 rounded-card border border-light-border bg-light-surface p-6 md:p-7">
              <p className="font-display text-body-lg font-medium">
                {transfers.cta.heading}
              </p>
              <p className="mt-2 text-body leading-relaxed text-light-muted">
                {transfers.cta.paragraph}
              </p>
              <div className="mt-5">
                <Button cta={transfers.cta.cta} tone="light" />
              </div>
            </div>
          ) : null}
        </GuideContentCol>

        <GuideAside label="What the labels mean" tone="light">
          <dl>
            {STATUS_ORDER.map((status) => (
              <div key={status} className={cn(guideAsideRow("light"), "py-4")}>
                <dt>
                  <StatusChip status={status} />
                </dt>
                <dd className="mt-2 text-body leading-snug text-light-muted">
                  {transferStatusLabels[status].legend}
                </dd>
              </div>
            ))}
          </dl>
        </GuideAside>
      </div>
    </Section>
  );
}
