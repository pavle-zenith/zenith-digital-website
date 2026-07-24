import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";
import { Eyebrow } from "./Eyebrow";

/** Consistent eyebrow + heading + intro used across sections. */
export function SectionHeader({
  eyebrow,
  heading,
  intro,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  if (!heading && !intro) return null;
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading ? (
        <h2 className="font-display text-h2 font-semibold leading-tight text-balance">
          {heading}
        </h2>
      ) : null}
      {intro ? (
        <p
          className={cn(
            "mt-4 text-body-lg",
            tone === "dark" ? "text-text-muted" : "text-light-muted",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
