import type {
  AuditCheck,
  AuditPage,
  AuditPriority,
  CheckStatus,
} from "./types";

/**
 * Audit scoring. Pure functions, shared by the gauge, the scorecard, the
 * segment pills and the jump bar, so the same number can never be computed
 * two ways in two places.
 *
 * The method is deliberately simple enough to print on the page and recount by
 * hand: the share of listed checks that pass, with a partial pass counting as
 * half. That is the difference from a vendor "score": there is no weighting a
 * reader cannot see.
 */

const POINTS: Record<CheckStatus, number> = { pass: 1, partial: 0.5, fail: 0 };

export type Band = "good" | "fair" | "poor";

export interface Tally {
  passed: number;
  partial: number;
  failed: number;
  total: number;
  /** 0 to 100, rounded. */
  score: number;
  band: Band;
}

/** Score any list of checks. `Math.round`, so 87.5 becomes 88. */
export function tally(checks: readonly AuditCheck[]): Tally {
  let passed = 0;
  let partial = 0;
  let failed = 0;
  let points = 0;
  for (const c of checks) {
    points += POINTS[c.status];
    if (c.status === "pass") passed += 1;
    else if (c.status === "partial") partial += 1;
    else failed += 1;
  }
  const total = checks.length;
  const score = total ? Math.round((100 * points) / total) : 0;
  return { passed, partial, failed, total, score, band: bandOf(score) };
}

/**
 * The overall score pools every check across every segment. It is NOT the
 * average of the segment scores: segments have different numbers of checks,
 * and averaging would silently weight a four-check segment the same as a six.
 */
export function overall(audit: Pick<AuditPage, "segments">): Tally {
  return tally(audit.segments.flatMap((s) => s.checks));
}

export function bandOf(score: number): Band {
  if (score >= 75) return "good";
  if (score >= 40) return "fair";
  return "poor";
}

/** The word printed beside every band colour. Colour is never the only signal. */
export const BAND_LABEL: Record<Band, string> = {
  good: "Good",
  fair: "Needs work",
  poor: "Poor",
};

export const PRIORITY_LABEL: Record<AuditPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

/**
 * Band colours, split the way DESIGN.md splits every signal colour: the base
 * value is for fills (the bar, the arc, a dot) and the -ink value is the only
 * one allowed on text over a light ground. Kept as full class strings so
 * Tailwind can see them.
 */
export const BAND_FILL: Record<Band, string> = {
  good: "bg-positive",
  fair: "bg-warning",
  poor: "bg-negative",
};
export const BAND_STROKE: Record<Band, string> = {
  good: "stroke-positive",
  fair: "stroke-warning",
  poor: "stroke-negative",
};
export const BAND_PILL: Record<Band, string> = {
  good: "border-positive/45 text-positive-ink",
  fair: "border-warning/55 text-warning-ink",
  poor: "border-negative/40 text-negative-ink",
};
export const PRIORITY_PILL: Record<AuditPriority, string> = {
  high: "border-negative/40 bg-light-bg text-negative-ink",
  medium: "border-warning/55 bg-light-bg text-warning-ink",
  low: "border-light-border bg-light-surface text-light-muted",
};

const PRIORITY_ORDER: Record<AuditPriority, number> = { high: 0, medium: 1, low: 2 };

/**
 * The "What to fix" list: fails and partials, high to medium to low. Each item
 * keeps its index in the original `checks` array, because that index is what a
 * ticked checkbox is stored under. Sorting must never change which box is which.
 */
export function fixesOf(checks: readonly AuditCheck[]) {
  return checks
    .map((check, index) => ({ check, index }))
    .filter(({ check }) => check.status !== "pass")
    .sort(
      (a, b) =>
        PRIORITY_ORDER[a.check.priority ?? "low"] -
          PRIORITY_ORDER[b.check.priority ?? "low"] || a.index - b.index,
    );
}

/**
 * Content rules the type cannot express. Throws on a malformed audit so a bad
 * content file fails `next build` rather than rendering a page with a gap:
 *   - every non-pass check carries a priority;
 *   - exactly three key fixes, each pointing at a segment that exists;
 *   - segment ids are unique, because they are anchors.
 */
export function assertAudit(audit: AuditPage): void {
  const ids = new Set<string>();
  for (const seg of audit.segments) {
    if (ids.has(seg.id)) {
      throw new Error(`[audit:${audit.slug}] duplicate segment id "${seg.id}"`);
    }
    ids.add(seg.id);
    seg.checks.forEach((c, i) => {
      if (c.status !== "pass" && !c.priority) {
        throw new Error(
          `[audit:${audit.slug}] ${seg.id} check ${i} ("${c.label}") is "${c.status}" but has no priority`,
        );
      }
    });
  }
  if (audit.keyFixes.items.length !== 3) {
    throw new Error(
      `[audit:${audit.slug}] keyFixes needs exactly 3 items, has ${audit.keyFixes.items.length}`,
    );
  }
  for (const k of audit.keyFixes.items) {
    if (!ids.has(k.segmentId)) {
      throw new Error(
        `[audit:${audit.slug}] key fix "${k.title}" points at unknown segment "${k.segmentId}"`,
      );
    }
  }
}
