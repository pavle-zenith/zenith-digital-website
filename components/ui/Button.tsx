import Link from "next/link";

import { cn, isInternal } from "@/lib/utils";
import type { CtaLink, Tone } from "@/lib/types";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-body font-medium transition hover:brightness-105 active:scale-[.99]";

function classes(variant: "primary" | "secondary", tone: Tone) {
  if (variant === "primary") {
    return cn(base, "bg-accent text-accent-ink hover:bg-accent-hover");
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
  const arrow = <span aria-hidden>&rarr;</span>;

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
