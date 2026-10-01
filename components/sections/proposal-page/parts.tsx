import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";
import { PRIORITY_PILL } from "@/content/audits/score";
import { proposalTemplate } from "@/content/proposals/template";
import type { Severity } from "@/content/proposals/types";
import { CheckIcon } from "@/components/sections/private-doc/icons";

/**
 * Small pieces the proposal sections share.
 */

/**
 * Severity reuses the audit's priority colouring, one step up the scale: a
 * proposal's "critical" wears the audit's red, "high" its amber, "medium" its
 * muted surface. The base colour rides on the dot, the word is -ink text, and
 * the word is always printed, so colour is never the only signal.
 */
const SEVERITY: Record<Severity, { pill: string; dot: string }> = {
  critical: { pill: PRIORITY_PILL.high, dot: "bg-negative" },
  high: { pill: PRIORITY_PILL.medium, dot: "bg-warning" },
  medium: { pill: PRIORITY_PILL.low, dot: "bg-light-muted" },
};

export function SeverityPill({ severity, count }: { severity: Severity; count?: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 font-mono text-label uppercase track-label",
        SEVERITY[severity].pill,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", SEVERITY[severity].dot)} />
      {count === undefined ? null : <span className="tabular-nums">{count}</span>}
      {proposalTemplate.severity[severity]}
    </span>
  );
}

/** Square step number. Decorative: the surrounding `<ol>` carries the order. */
export function NumberChip({ n, tone }: { n: number; tone: Tone }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] border font-display text-body-lg font-medium tabular-nums",
        tone === "dark"
          ? "border-border bg-surface text-text"
          : "border-light-border bg-light-surface text-light-text",
      )}
    >
      {n}
    </span>
  );
}

/**
 * Ruled rows with a tick. Every row takes a top rule, the first included
 * (DESIGN.md, Divided List); in two columns the grid keeps each pair of rows
 * level, so the rules run straight across.
 */
export function TickList({
  items,
  tone = "light",
  columns = 2,
  className,
}: {
  items: string[];
  tone?: Tone;
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      role="list"
      className={cn("grid", columns === 2 && "md:grid-cols-2 md:gap-x-10", className)}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-3 border-t py-4",
            tone === "dark" ? "border-border" : "border-light-border",
          )}
        >
          <CheckIcon
            className={cn(
              "mt-[3px] h-[18px] w-[18px] shrink-0",
              tone === "dark" ? "text-positive" : "text-positive-ink",
            )}
          />
          <span className={cn("text-body", tone === "dark" ? "text-text" : "text-light-text")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
