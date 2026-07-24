import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * A vertical list whose items are separated by thin hairline rules — the recurring
 * "blocky in-line" row pattern (Stripe / Lightdash / DesignMe). Every row gets a top
 * border, so the stack reads as divided rows with a rule above the first item too.
 *
 * Uses static, concrete border-color utilities (full class strings so Tailwind emits
 * them) applied to each <li>, so the rules beat the global `*` border reset.
 */
export function DividedList({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        tone === "dark"
          ? "[&>li]:border-t [&>li]:border-border"
          : "[&>li]:border-t [&>li]:border-light-border",
        className,
      )}
    >
      {children}
    </ul>
  );
}

/** A single row inside a DividedList, with consistent vertical padding. */
export function DividedRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={cn("py-4", className)}>{children}</li>;
}
