import { cn } from "@/lib/utils";
import type { Metric, Tone } from "@/lib/types";

/** Oversized number + small label beneath. Number inherits the section text color. */
export function StatBlock({
  metric,
  tone = "dark",
  size = "h1",
  className,
}: {
  metric: Metric;
  tone?: Tone;
  /**
   * "h2" for a narrow grid, where a value like "29 od 38" would wrap at h1;
   * "h3" for a compact supporting row that shouldn't outshout its section.
   */
  size?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-display font-medium leading-none",
          size === "h3" ? "text-h3" : size === "h2" ? "text-h2" : "text-h1",
        )}
      >
        {metric.value}
      </span>
      <span
        className={tone === "dark" ? "text-text-muted" : "text-light-muted"}
      >
        {metric.label}
      </span>
    </div>
  );
}
