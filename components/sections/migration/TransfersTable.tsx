import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { DetailToggle } from "@/components/sections/compare/DetailToggle";
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
 * Each state's column reads as its own (owner, 20 Nov 2026: "the columns are
 * hardly distinguishable"): a 3px top bar in the state's colour, a tinted
 * header, and for "Doesn't move" a dashed outline, the same mark the fit
 * boxes use for what doesn't belong. Green only where the news is good.
 */
const COLUMN_STYLES: Record<TransferStatus, { card: string; header: string }> = {
  carries: { card: "border-light-border border-t-[3px] border-t-positive", header: "border-light-border bg-positive/10" },
  rebuilt: { card: "border-light-border border-t-[3px] border-t-accent", header: "border-light-border bg-accent-subtle" },
  replaced: { card: "border-light-border border-t-[3px] border-t-light-muted", header: "border-light-border bg-light-surface" },
  lost: { card: "border-dashed border-light-muted/50 border-t-[3px] border-t-light-border", header: "border-dashed border-light-muted/40 bg-light-surface/60" },
};

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

/**
 * "What carries across, and what gets rebuilt", grouped by what happens to
 * each thing (owner, 20 Nov 2026: cleaner, spaced out, less text). Four
 * columns, one per state in the order the guide's rule sets (carries
 * first), each headed by its label and what it means, listing the items by
 * name. The one-sentence note for every item stays in the HTML and shows
 * under one "Show details" switch, rather than a card of prose per item and
 * a legend in a side column.
 *
 * Within a column the authored order is kept. Still a <dl> per column, so
 * each item pairs with its note for the answer engines these pages are for.
 */
export function TransfersTable({ data }: { data: MigrationGuideContent }) {
  const { transfers } = data;
  const groups = STATUS_ORDER.map((status) => ({
    status,
    rows: transfers.rows.filter((r) => r.status === status),
  })).filter((g) => g.rows.length > 0);

  return (
    // The same vertical rhythm as the sections around it. GUIDE_SECTION_FRAME
    // (no padding) belonged to the old two-column layout with its own insets.
    <Section tone="light" frameClassName="!py-14 md:!py-24" id="what-carries-across">
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {transfers.heading}
        </h2>
        <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">{transfers.intro}</p>
      </div>

      <div className="mt-8 md:mt-10">
        <DetailToggle show="Show details" hide="Hide details">
          <div
            className={cn(
              "grid items-start gap-4 md:grid-cols-2 lg:gap-5",
              groups.length >= 4 ? "xl:grid-cols-4" : groups.length === 3 ? "xl:grid-cols-3" : "",
            )}
          >
            {groups.map((g) => (
              <section
                key={g.status}
                aria-labelledby={`transfers-${g.status}`}
                className={cn(
                  "type-card flex flex-col overflow-hidden rounded-card border bg-light-bg",
                  COLUMN_STYLES[g.status].card,
                )}
              >
                <header className={cn("border-b px-6 pb-5 pt-5", COLUMN_STYLES[g.status].header)}>
                  <h3 id={`transfers-${g.status}`} className="flex items-center justify-between gap-3">
                    <StatusChip status={g.status} />
                    <span className="font-display text-h3 font-medium leading-none tabular-nums text-light-text">
                      {g.rows.length}
                    </span>
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-snug text-light-muted">
                    {transferStatusLabels[g.status].legend}
                  </p>
                </header>
                <dl className="divide-y divide-light-border">
                  {g.rows.map((row) => (
                    <div key={row.item} className="px-6 py-4">
                      <dt
                        className={cn(
                          "flex items-start gap-3 text-body font-medium leading-snug",
                          g.status === "lost" ? "text-light-muted" : "text-light-text",
                        )}
                      >
                        <FeatureIcon name={row.icon ?? ""} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-light-muted" />
                        {row.item}
                      </dt>
                      <dd className="mt-2 hidden pl-[30px] text-[0.875rem] leading-relaxed text-light-muted group-data-[details=on]/details:block">
                        {row.note}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </DetailToggle>
      </div>

      {transfers.footnote ? (
        <p className="mt-10 max-w-3xl text-body-lg leading-relaxed text-light-muted">{transfers.footnote}</p>
      ) : null}

      {/* The ask lands here because the reader has just been handed a list
          of things that may or may not apply to their own site. */}
      {transfers.cta ? (
        <div className="type-card mt-10 flex flex-col gap-5 rounded-card border border-light-border bg-light-surface p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div className="max-w-2xl">
            <p className="font-display text-body-lg font-medium">{transfers.cta.heading}</p>
            <p className="mt-2 text-body leading-relaxed text-light-muted">{transfers.cta.paragraph}</p>
          </div>
          <div className="shrink-0">
            <Button cta={transfers.cta.cta} tone="light" />
          </div>
        </div>
      ) : null}
    </Section>
  );
}
