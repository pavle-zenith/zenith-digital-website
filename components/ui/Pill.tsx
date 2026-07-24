import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/** Small mono-label pill — badges and tags. */
export function Pill({
  children,
  tone = "dark",
  accent = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-label uppercase track-label",
        accent
          ? "bg-accent-subtle text-accent"
          : tone === "dark"
            ? "border border-border text-text-muted"
            : "border border-light-border text-light-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
