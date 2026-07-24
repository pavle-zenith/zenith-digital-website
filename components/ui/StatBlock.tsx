import { cn } from "@/lib/utils";
import type { Metric, Tone } from "@/lib/types";

/** Oversized number + small label beneath. Number inherits the section text color. */
export function StatBlock({
  metric,
  tone = "dark",
  className,
}: {
  metric: Metric;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-display text-h1 font-medium leading-none">
        {metric.value}
      </span>
      <span className={tone === "dark" ? "text-text-muted" : "text-light-muted"}>
        {metric.label}
      </span>
    </div>
  );
}
