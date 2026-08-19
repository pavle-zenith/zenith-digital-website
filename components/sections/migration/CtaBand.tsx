import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CtaLink, Tone } from "@/lib/types";

/**
 * THE IN-BODY CTA BAND. Every ask inside a page body uses this: the migration
 * guides' contextual CTAs at the friction points, and the blog's `calloutCta`
 * block. One shape, so a reader learns what an ask looks like here rather than
 * meeting a different treatment per content type. Deliberately quieter than
 * CtaBanner, which closes a page and is allowed to be loud.
 *
 * Extracted from MigrationGuide when the blog needed the same band: two call
 * sites, one implementation, so the two cannot drift.
 */
export function CtaBand({
  heading,
  paragraph,
  ctas,
  tone,
}: {
  heading: string;
  paragraph: string;
  ctas: CtaLink[];
  tone: Tone;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "rounded-card border p-6 md:p-7",
        dark
          ? "border-border bg-surface"
          : "border-light-border bg-light-surface",
      )}
    >
      <p className="font-display text-body-lg font-medium">{heading}</p>
      <p
        className={cn(
          "mt-2 text-body leading-relaxed",
          dark ? "text-text-muted" : "text-light-muted",
        )}
      >
        {paragraph}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {ctas.map((cta) => (
          <Button key={cta.href} cta={cta} tone={tone} />
        ))}
      </div>
    </div>
  );
}
