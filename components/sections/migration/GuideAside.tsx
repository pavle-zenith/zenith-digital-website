import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/types";

/**
 * THE SHARED ASIDE SYSTEM for the migration guides and the blog.
 *
 * Every section that pairs a body of text with a reference list uses this: the
 * status legend beside the transfers rows, and the blog's chapters column. One
 * component so they cannot drift into several slightly different sidebars.
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
 * INSETS. Below lg the aside is a full-width block above the content, so it
 * keeps the site gutter like any other block (CLAUDE.md §15). From lg it stops
 * borrowing that gutter: it is a 320-380px column, and a 64px inset on the rail
 * side of it was spending a fifth of the column on air and wrapping labels that
 * would otherwise fit. Desktop takes a flat, symmetric 32px instead, measured
 * from the divider on one side and the frame rail on the other.
 *
 * WIDTHS. Two literal grid strings rather than one parameterised helper:
 * Tailwind only generates an arbitrary value it can see written out, so a
 * template literal would compile to nothing. The guides use the narrow column
 * for a four-item legend; the blog's chapters take the wide one, because a
 * chapter label is a sentence fragment and 320px wrapped most of them onto
 * three lines.
 *
 * Callers supply the list element itself (`ul` for chapters, `dl` for the
 * status legend) so each keeps the semantics its content deserves; the shared
 * parts are the label, the rules, the sticky behaviour, and the row rhythm.
 */

/** Section wrapper: bleeds to the rails so the rules can reach them. */
export const GUIDE_ASIDE_GRID =
  "frame-bleed grid lg:grid-cols-[minmax(0,1fr)_320px]";

/** The same grid with room for prose in the aside. See WIDTHS above. */
export const GUIDE_ASIDE_GRID_WIDE =
  "frame-bleed grid lg:grid-cols-[minmax(0,1fr)_380px]";

/** Sections on this system carry their padding in the columns, not the frame. */
export const GUIDE_SECTION_FRAME = "!py-0";

/** The gutter, re-applied inside bled elements so rules span the full width. */
const GUTTER = "px-[clamp(20px,4vw,64px)]";

/** The column gutter, for children of a `flush` content column. */
export function guideContentInset() {
  // The breathing room goes on the edge that meets the divider.
  return cn(GUTTER, "lg:pr-14");
}

/**
 * Content column: gutter restored, reading measure, room before the divider.
 *
 * `wide` drops the measure cap for columns that hold a grid rather than prose.
 * A reading measure is for reading; cards should fill the column they're in.
 *
 * `flush` drops the column's own horizontal padding so its children can draw
 * hairlines that run from the rail to the vertical divider. Children then
 * re-apply the gutter with `guideContentInset()`, inside their own border box,
 * exactly as the aside rows do.
 */
export function GuideContentCol({
  children,
  wide = false,
  flush = false,
  className,
}: {
  children: React.ReactNode;
  wide?: boolean;
  flush?: boolean;
  /**
   * Padding overrides for callers whose column opens directly under a hero
   * rather than after a section rule (the blog body). Use the `!` prefix so
   * the override beats the default block padding.
   */
  className?: string;
}) {
  return (
    <div
      className={cn(
        "order-2 py-14 md:py-24 lg:order-none",
        !flush && guideContentInset(),
        className,
      )}
    >
      {wide || flush ? (
        children
      ) : (
        <div className="max-w-[68ch]">{children}</div>
      )}
    </div>
  );
}

export function GuideAside({
  label,
  tone,
  children,
  className,
  stickyClassName,
}: {
  label: string;
  tone: Tone;
  children: React.ReactNode;
  /** Padding overrides, kept in step with the content column's. */
  className?: string;
  /**
   * Overrides for the sticky box itself. The blog's chapters column travels a
   * whole article rather than one section, so it caps its own height and
   * scrolls internally instead of running off the bottom of a short viewport.
   */
  stickyClassName?: string;
}) {
  const rule = tone === "dark" ? "border-border" : "border-light-border";
  const muted = tone === "dark" ? "text-text-muted" : "text-light-muted";

  return (
    // The <aside> is the grid item and stretches to the full row height, so
    // its divider border draws a rule the whole depth of the section. Its own
    // vertical padding keeps the rhythm; the sticky wrapper sits inside it and
    // travels the height of that box.
    <aside
      className={cn(
        "order-1 border-b py-14 md:py-24 lg:order-none lg:border-b-0 lg:border-l",
        rule,
        className,
      )}
    >
      <div className={cn("lg:sticky lg:top-24", stickyClassName)}>
        {/* Horizontal insets sit on the label and the rows, never on the
            column, so every hairline runs from the vertical rule to the rail. */}
        <p
          className={cn(
            "font-mono text-label uppercase track-label lg:px-8",
            GUTTER,
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
    "border-b lg:px-8",
    GUTTER,
    tone === "dark" ? "border-border" : "border-light-border",
  );
}
