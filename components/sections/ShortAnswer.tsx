import { Section } from "@/components/ui/Section";

/**
 * The quotable short answer ("In short", "Short answer"): the passage AI
 * answers lift, so it stands alone, labelled and dated. A full-width band of
 * its own straight after the hero and its buttons, never inside the hero
 * (owner, 20 Nov 2026). Label and date left, the answer right.
 *
 * The one short-answer block on the site: pricing, the comparisons, the
 * cost calculator and the industry pages all use it, so the size and width
 * can't drift (owner, 20 Nov 2026: "apply that for every in short section,
 * the font size and width"). Body-large, running the full width.
 */
export function ShortAnswer({
  label,
  text,
  updated,
  updatedLabel = "Updated",
  link,
}: {
  label: string;
  text: string;
  /** ISO date. */
  updated: string;
  updatedLabel?: string;
  link?: { label: string; href: string };
}) {
  const date = new Date(updated).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    // Wide and low (owner, 20 Nov 2026: "wider so it's less bulky"): a
    // narrow label column and the answer running the full width.
    <Section tone="light" frameClassName="!py-8 md:!py-11">
      <div className="grid gap-4 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-12">
        {/* Always stacked: side by side, the label and date wrapped or not
            depending on which font had loaded, so the band jumped 26px when
            the mono face arrived (performance pass, 20 Nov 2026). */}
        <div className="flex flex-col items-start gap-y-2">
          <h2 className="font-mono text-label uppercase track-label text-light-text">{label}</h2>
          <p className="font-mono text-label uppercase track-label text-light-muted">
            {updatedLabel} <time dateTime={updated}>{date}</time>
          </p>
          {link ? (
            <a
              href={link.href}
              className="font-mono text-label uppercase track-label text-light-muted underline decoration-light-border underline-offset-4 transition hover:text-light-text"
            >
              {link.label}
            </a>
          ) : null}
        </div>
        <p className="text-body-lg font-medium leading-relaxed text-light-text text-pretty">
          {text}
        </p>
      </div>
    </Section>
  );
}
