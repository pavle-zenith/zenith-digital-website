import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * THE SHARED ASIDE SYSTEM for the migration guides.
 *
 * Every section that pairs a body of text with a reference list uses this: the
 * jump-to lists beside the three long-form sections, and the status legend
 * beside the transfers rows. One component so they cannot drift into four
 * slightly different sidebars.
 *
 * THE RULE IS THE LAYOUT, AND IT RUNS EDGE TO EDGE. The grid bleeds to the
 * frame rails and the section's vertical padding moves into the columns
 * themselves (the pattern Testimonials already uses), so the vertical divider
 * spans the full height of the section and every horizontal hairline reaches
 * the rail instead of stopping at the frame's inner gutter. Nothing is inset
 * except the text, which re-applies the gutter inside the border box.
 *
 * Below lg the aside moves above the content and its divider rotates to a
 * bottom rule, so it reads as a contents list rather than a stranded sidebar.
 *
 * Callers supply the list element itself (`ul` for jump links, `dl` for the
 * status legend) so each keeps the semantics its content deserves; the shared
 * parts are the label, the rules, the sticky behaviour, and the row rhythm.
 */

/** Section wrapper: bleeds to the rails so the rules can reach them. */
export const GUIDE_ASIDE_GRID =
  "frame-bleed grid lg:grid-cols-[minmax(0,1fr)_320px]";

/** Sections on this system carry their padding in the columns, not the frame. */
export const GUIDE_SECTION_FRAME = "!py-0";

/** The gutter, re-applied inside bled elements so rules span the full width. */
const GUTTER = "px-[clamp(20px,4vw,64px)]";

/**
 * Content column: gutter restored, reading measure, room before the divider.
 *
 * `wide` drops the measure cap for columns that hold a grid rather than prose.
 * A reading measure is for reading; cards should fill the column they're in.
 */
export function GuideContentCol({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn("order-2 py-14 md:py-24 lg:order-none lg:pr-14", GUTTER)}
    >
      <div className={wide ? undefined : "max-w-[68ch]"}>{children}</div>
    </div>
  );
}

export function GuideAside({
  label,
  tone,
  children,
}: {
  label: string;
  tone: Tone;
  children: React.ReactNode;
}) {
  const rule = tone === "dark" ? "border-border" : "border-light-border";
  const muted = tone === "dark" ? "text-text-muted" : "text-light-muted";

  return (
    // The <aside> is the grid item and stretches to the full row height, so
    // its left border draws a rule the whole depth of the section. Its own
    // vertical padding keeps the rhythm; the sticky wrapper sits inside it and
    // travels the height of that box.
    <aside
      className={cn(
        "order-1 border-b py-14 md:py-24 lg:order-none lg:border-b-0 lg:border-l",
        rule,
      )}
    >
      <div className="lg:sticky lg:top-24">
        {/* Horizontal insets sit on the label and the rows, never on the
            column, so every hairline runs from the vertical rule to the rail. */}
        <p
          className={cn(
            "font-mono text-label uppercase track-label lg:pl-10",
            GUTTER,
            "lg:pr-[clamp(20px,4vw,64px)]",
            muted,
          )}
        >
          {label}
        </p>
        <div className={cn("mt-6 border-t", rule)}>{children}</div>
      </div>
    </aside>
  );
}

/**
 * The row rhythm inside an aside, as a class rather than a wrapper component:
 * a <ul> may only contain <li> and a <dl> only <div>/<dt>/<dd>, so each caller
 * applies this to the element its own semantics require. The insets live here,
 * inside the border box, so the rule spans the full column width.
 */
export function guideAsideRow(tone: Tone) {
  return cn(
    "border-b lg:pl-10 lg:pr-[clamp(20px,4vw,64px)]",
    GUTTER,
    tone === "dark" ? "border-border" : "border-light-border",
  );
}
