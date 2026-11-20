import { Section } from "@/components/ui/Section";

/**
 * The quotable short answer ("In short", "Short answer"): the passage AI
 * answers lift, so it stands alone, labelled and dated. A full-width band of
 * its own straight after the hero and its buttons, never inside the hero
 * (owner, 20 Nov 2026). Label and date left, the answer right, in a size
 * between body and heading so it reads as the page's thesis.
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
    <Section tone="light" frameClassName="!py-10 md:!py-14">
      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-12">
        {/* Always stacked: side by side, the label and date wrapped or not
            depending on which font had loaded, so the band jumped 26px when
            the mono face arrived (performance pass, 20 Nov 2026). */}
        <div className="flex flex-col items-start gap-y-2">
          <p className="font-mono text-label uppercase track-label text-light-text">{label}</p>
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
        <p className="max-w-[62ch] font-display text-[clamp(1.25rem,1.9vw,1.625rem)] font-medium leading-snug tracking-tight text-light-text text-pretty">
          {text}
        </p>
      </div>
    </Section>
  );
}
