import Link from "next/link";

import { cn, isInternal } from "@/lib/utils";
import type { CtaLink, Tone } from "@/lib/types";

// Full width and stacked on phones (CTA pairs read as a column), auto width
// from sm up.
const base =
  "group inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition active:scale-[.99] sm:w-auto";

function classes(variant: "primary" | "secondary", tone: Tone) {
  if (variant === "primary") {
    return cn(base, "btn-animated text-accent-ink");
  }
  return cn(
    base,
    tone === "dark"
      ? "border border-border text-text hover:bg-surface-2"
      : "border border-light-border text-light-text hover:bg-light-surface",
  );
}

export function Button({
  cta,
  tone = "dark",
  className,
  children,
}: {
  cta: CtaLink;
  tone?: Tone;
  className?: string;
  children?: React.ReactNode;
}) {
  const variant = cta.variant || "primary";
  const cls = cn(classes(variant, tone), className);
  const label = children ?? cta.label;
  // Arrow swap: the resting arrow slides out right while a second one slides
  // in from the left (clipped by the overflow-hidden wrapper).
  const arrow = (
    <span className="arrow-glyph relative overflow-hidden" aria-hidden>
      <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[170%]">
        &rarr;
      </span>
      <span className="absolute inset-y-0 left-0 inline-block -translate-x-[170%] transition-transform duration-300 ease-out group-hover:translate-x-0">
        &rarr;
      </span>
    </span>
  );

  if (isInternal(cta.href)) {
    return (
      <Link href={cta.href} className={cls}>
        {label}
        {arrow}
      </Link>
    );
  }
  return (
    <a href={cta.href} className={cls} rel="noopener" target="_blank">
      {label}
      {arrow}
    </a>
  );
}
