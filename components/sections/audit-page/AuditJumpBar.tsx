import { cn } from "@/lib/utils";
import { BAND_LABEL, BAND_PILL, type Band } from "@/content/audits/score";
import { JumpBar } from "@/components/sections/private-doc/JumpBar";

export type JumpItem = { id: string; name: string; score: number; band: Band };

/**
 * The audit's jump bar: the shared private-document bar with each segment's
 * score as a pill, and "Your options" as the far-end target. The band word is
 * screen-reader only; sighted readers get it from the scorecard.
 */
export function AuditJumpBar({ items }: { items: JumpItem[] }) {
  return (
    <JumpBar
      label="Audit sections"
      heroId="audit-hero"
      trailing={{ id: "options", name: "Your options" }}
      items={items.map((item) => ({
        id: item.id,
        name: item.name,
        badge: (
          <span
            className={cn(
              "inline-flex items-center rounded-full border bg-light-bg px-2 py-0.5 font-mono text-label tabular-nums",
              BAND_PILL[item.band],
            )}
          >
            {item.score}
            <span className="sr-only">, {BAND_LABEL[item.band]}</span>
          </span>
        ),
      }))}
    />
  );
}
