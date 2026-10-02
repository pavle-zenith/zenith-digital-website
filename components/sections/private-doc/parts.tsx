import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";
import { CheckIcon } from "./icons";

/**
 * Pieces shared by the private documents (proposal, partner showcase).
 */

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
