import { cn } from "@/lib/utils";
import { PRIORITY_PILL } from "@/content/audits/score";
import { proposalTemplate } from "@/content/proposals/template";
import type { Severity } from "@/content/proposals/types";

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
