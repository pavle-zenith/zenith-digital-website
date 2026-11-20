import { Section } from "@/components/ui/Section";
import { VerifiedCheck } from "@/components/ui/VerifiedCheck";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { cn } from "@/lib/utils";

/**
 * Who this is for and who it isn't, as a white comparison table spanning the
 * full section: hairline verticals between the columns, hairlines between
 * every row, a tinted header band, and a marker on every cell. Used by the
 * migration guides ("Worth moving / Stay where you are") and the industry
 * pages ("Good fit / Not a fit"); the column labels are the caller's copy.
 *
 * THE GRID FLOWS DOWN COLUMNS, NOT ACROSS ROWS. `grid-flow-col` over an
 * explicit row count puts the whole "good" list in column one and the whole
 * "not" list in column two, so rows line up across the vertical rule without
 * pairing two items that have nothing to do with each other. It also means
 * the DOM order is every pro, then every con, which is exactly the order you
 * want when the table collapses to one column on phones.
 *
 * The two sides are told apart by marker SHAPE (a tick against a cross) as
 * well as colour, so the distinction survives greyscale and colour blindness.
 * The cons are quieter than the pros: they qualify the reader out, they don't
 * argue with them.
 *
 * `variant="boxes"` (industry pages only, fixes brief 18 Nov 2026) is the
 * simpler form: an eyebrow and the heading, then two columns of short boxed
 * lines. Good fit: solid hairline boxes, each with an icon tile. Not a fit:
 * one outer frame holding dashed boxes with dashed x tiles and muted text,
 * so the two sides differ by shape as well as colour. Stacks on phones, good
 * fit first.
 */
export function FitTable({
  id,
  heading,
  intro,
  goodLabel,
  notLabel,
  good,
  notAFit,
  footnote,
  variant = "table",
  eyebrow,
  goodIcons,
  notFooter,
}: {
  id?: string;
  heading: string;
  intro?: string;
  goodLabel: string;
  notLabel: string;
  good: string[];
  notAFit: string[];
  footnote?: string;
  variant?: "table" | "boxes";
  /** Boxes only: the small label above the heading. */
  eyebrow?: string;
  /** Boxes only: one FeatureIcon name per good-fit line. */
  goodIcons?: string[];
  /** Boxes only: under the right-hand frame (a note, a link). */
  notFooter?: React.ReactNode;
}) {
  if (variant === "boxes") {
    return (
      <Section tone="light" frameClassName="!py-14 md:!py-24" id={id}>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="font-mono text-label uppercase track-label text-light-muted">
              {goodLabel}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {good.map((point, i) => (
                <li
                  key={point}
                  className="type-card flex items-center gap-4 rounded-card border border-light-border bg-light-bg p-4 md:p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text">
                    <FeatureIcon name={goodIcons?.[i] ?? ""} />
                  </span>
                  <span className="text-body-lg leading-snug text-light-text">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-label uppercase track-label text-light-muted">
              {notLabel}
            </p>
            <div className="mt-4 rounded-card border border-light-border bg-light-surface p-3 md:p-4">
              <ul className="flex flex-col gap-3">
                {notAFit.map((point) => (
                  <li
                    key={point}
                    className="type-card flex items-center gap-4 rounded-[6px] border border-dashed border-light-muted/40 p-3 md:p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border border-dashed border-light-muted/40 text-light-muted">
                      <XMark className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-body-lg leading-snug text-light-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {notFooter}
          </div>
        </div>
        {footnote ? (
          <p className="mt-10 max-w-3xl text-body leading-relaxed text-light-muted">{footnote}</p>
        ) : null}
      </Section>
    );
  }

  // +1 for the header cell that heads each column.
  const rowCount = Math.max(good.length, notAFit.length) + 1;
  // Keeps the block rectangular when one side has fewer reasons than the other.
  const fillers = Math.max(0, good.length - notAFit.length);

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24" id={id}>
      <div className="max-w-3xl">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {heading}
        </h2>
        {intro ? (
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {intro}
          </p>
        ) : null}
      </div>

      <div
        className="type-card mt-10 grid gap-px overflow-hidden rounded-card border border-light-border bg-light-border md:mt-12 md:grid-flow-col"
        style={{ gridTemplateRows: `repeat(${rowCount}, auto)` }}
      >
        <ColumnHead
          label={goodLabel}
          marker={<VerifiedCheck className="text-positive-ink" />}
        />
        {good.map((point) => (
          <div key={point} className="flex items-start gap-3 bg-light-bg p-5">
            <VerifiedCheck className="mt-0.5 shrink-0 text-positive-ink" />
            <span className="text-body font-medium leading-snug text-light-text">
              {point}
            </span>
          </div>
        ))}

        <ColumnHead
          label={notLabel}
          marker={<XMark className="text-light-muted" />}
        />
        {notAFit.map((point) => (
          <div key={point} className="flex items-start gap-3 bg-light-bg p-5">
            <XMark className="mt-0.5 shrink-0 text-light-muted" />
            <span className="text-body leading-snug text-light-muted">
              {point}
            </span>
          </div>
        ))}
        {Array.from({ length: fillers }, (_, i) => (
          <div
            key={`filler-${i}`}
            aria-hidden
            className="hidden bg-light-bg md:block"
          />
        ))}
      </div>

      {footnote ? (
        <p className="measure mt-10 border-t border-light-border pt-8 text-body-lg leading-relaxed text-light-muted">
          {footnote}
        </p>
      ) : null}
    </Section>
  );
}

/** Tinted header cell heading one column of the table. */
function ColumnHead({
  label,
  marker,
}: {
  label: string;
  marker: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 bg-light-surface px-5 py-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg">
        {marker}
      </span>
      <span className="font-mono text-label uppercase track-label text-light-muted">
        {label}
      </span>
    </div>
  );
}

/** Lucide "x" glyph, inline per CLAUDE.md §15 (no icon packages). */
export function XMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
