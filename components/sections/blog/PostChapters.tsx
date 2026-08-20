"use client";

import { Button } from "@/components/ui/Button";
import { guideAsideRow } from "@/components/sections/migration/GuideAside";
import { PostShare } from "@/components/sections/blog/PostShare";
import { post as furniture } from "@/content/blog";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * The chapters column: what the reader is on, what is left, and one ask.
 *
 * It is the CONTENTS of the guides' shared aside, not a sidebar of its own.
 * GuideAside supplies the rails, the label, the sticky behaviour and the row
 * rhythm; this file supplies the links and the CTA. So the blog and the
 * migration guides have one sidebar between them rather than two that drift.
 *
 * WHY IT REPLACED THE STICKY TOP BAR ON POSTS. GuideNav is a horizontal rail
 * sized for a guide's eight fixed sections. A post's chapters come from its own
 * H2s, so the count and the label lengths vary per document, which is what a
 * vertical list handles and an equal-width rail does not.

 *
 * Numbers are functional rather than decorative: they tell a reader how much
 * article is left, which is the question a contents list is being asked.
 *
 * The CTA and the share row are desktop-only. On a phone the aside sits ABOVE
 * the article (GuideAside flips it there), so both would land before the
 * reader has read anything: an ask on a page that already closes on two, and
 * an invitation to share something not yet read. The article's own end carries
 * a share row for phones instead.
 */
export function PostChapters({
  items,
  title,
}: {
  items: { id: string; label: string }[];
  /** Prefills the tweet text on the share row. */
  title: string;
}) {
  const active = useActiveSection(items);
  const { chapters } = furniture;

  return (
    <>
      <ul>
        {items.map((item, i) => (
          <li
            key={item.id}
            // The fill sits on the row, not the link, so an active chapter
            // reads rail to rail exactly as GuideNav's active cell does.
            className={cn(
              guideAsideRow("light"),
              item.id === active && "bg-light-surface",
            )}
          >
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? "true" : undefined}
              className={cn(
                "flex gap-3 py-3 text-body leading-snug transition",
                item.id === active
                  ? "font-medium text-light-text"
                  : "text-light-muted hover:text-light-text",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "shrink-0 pt-[0.2rem] font-mono text-label track-label tabular-nums",
                  item.id === active ? "text-accent" : "text-light-muted/70",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-balance">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={cn(guideAsideRow("light"), "hidden py-6 lg:block")}>
        <p className="font-display text-body-lg font-medium leading-snug text-light-text">
          {chapters.cta.heading}
        </p>
        <p className="mt-2 text-body leading-relaxed text-light-muted">
          {chapters.cta.paragraph}
        </p>
        {/* The shared button, forced full width: it is `sm:w-auto` by default,
            which shrinks it to a stub inside a 320px column. */}
        <Button cta={chapters.cta.cta} tone="light" className="mt-5 !w-full" />
      </div>

      <div className={cn(guideAsideRow("light"), "hidden py-6 lg:block")}>
        <PostShare title={title} />
      </div>
    </>
  );
}
