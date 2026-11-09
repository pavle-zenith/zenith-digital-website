import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/sections/private-doc/icons";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";
import type { Prose } from "@/content/proposals/types";

/**
 * Shared pieces of the audit proposal (`kind: "audit"` on /proposal/[slug]).
 *
 * THE PAGE IS ONE READING COLUMN. Every section keeps its content in the same
 * centred column, about 46rem, so a line runs around 75 characters and the
 * eye never crosses a wide screen to find the next block. The frame and its
 * rails still span the page, as on every other page of the site.
 */
export const COLUMN = "mx-auto w-full max-w-[46rem]";

/** A section of the document: the site's frame, then the reading column. */
export function DocSection({
  id,
  tinted = false,
  className,
  children,
}: {
  id: string;
  /** The light surface tint, to separate a section from its neighbour. */
  tinted?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Section
      id={id}
      tone="light"
      className={cn("doc-anchor", tinted && "bg-light-surface", className)}
      frameClassName="!py-14 md:!py-20"
    >
      <div className={COLUMN}>{children}</div>
    </Section>
  );
}

/** Section heading and its intro, in the same scale as `SectionHeader`. */
export function DocHeading({
  heading,
  intro,
  tone = "light",
}: {
  heading: string;
  intro?: string;
  tone?: Tone;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="font-display text-h2 font-semibold leading-tight text-balance">{heading}</h2>
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

/**
 * Body copy as written: strings are paragraphs, arrays are bulleted lists. The
 * bullet is a small square, the system's shape, rather than a round dot.
 */
export function ProseBlocks({
  blocks,
  tone = "light",
  className,
}: {
  blocks: Prose;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-3 text-body md:text-body-lg",
        tone === "dark" ? "text-text" : "text-light-text",
        className,
      )}
    >
      {blocks.map((block, i) =>
        Array.isArray(block) ? (
          <ul key={i} role="list" className="space-y-2">
            {block.map((item) => (
              <li
                key={item}
                className={cn(
                  "relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-[1px]",
                  tone === "dark" ? "before:bg-text-muted" : "before:bg-light-muted",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block}</p>
        ),
      )}
    </div>
  );
}

/**
 * Points with a bold lead, as ruled rows with a tick: what the new site does
 * (the mockup section) or what the client's team gets (the handoff).
 */
export function LeadPoints({
  points,
  className,
}: {
  points: { lead: string; text: string }[];
  className?: string;
}) {
  return (
    <ul role="list" className={className}>
      {points.map((point) => (
        <li key={point.lead} className="flex items-start gap-3 border-t border-light-border py-4">
          <CheckIcon className="mt-[3px] h-[18px] w-[18px] shrink-0 text-positive-ink" />
          <span className="text-body text-light-text">
            <strong className="font-semibold">{point.lead}</strong> {point.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
