import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * The bold-label bullet list. A reader skimming gets the whole block from the
 * labels alone, and each pair is a self-contained statement an answer engine
 * can lift without the surrounding paragraph. The colon is inserted here, so
 * labels stay free of trailing punctuation in content.
 */
export function PointList({
  points,
  tone,
  size = "body",
}: {
  points: { label: string; body: string }[];
  tone: Tone;
  /**
   * Body copy size. The guides set prose at 16px; the blog reads at 18px, and
   * a points list sitting between two paragraphs has to match whichever it is
   * embedded in or the block reads as a pasted-in fragment.
   */
  size?: "body" | "body-lg";
}) {
  const dark = tone === "dark";
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {points.map((point) => (
        <li key={point.label} className="flex gap-3">
          {/* The accent is a near-black that vanishes on navy (CLAUDE.md §15),
              so the marker takes the section's own text colour on dark. */}
          <span
            aria-hidden
            className={cn(
              // Optical centring on the first line, so the offset tracks the
              // line height the copy is actually set at.
              size === "body-lg" ? "mt-[0.7rem]" : "mt-[0.55rem]",
              "h-1.5 w-1.5 shrink-0 rounded-full",
              dark ? "bg-text" : "bg-accent",
            )}
          />
          <p
            className={cn(
              size === "body-lg" ? "text-body-lg" : "text-body",
              "leading-relaxed",
              dark ? "text-text-muted" : "text-light-text",
            )}
          >
            <strong
              className={cn(
                "font-medium",
                dark ? "text-text" : "text-light-text",
              )}
            >
              {`${point.label}:`}
            </strong>{" "}
            {point.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
