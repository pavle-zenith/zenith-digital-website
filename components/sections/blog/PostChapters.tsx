"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { guideAsideRow } from "@/components/sections/migration/GuideAside";
import { post as furniture } from "@/content/blog";
import {
  allTestimonials,
  PLACEHOLDER_AVATAR,
} from "@/content/testimonials-data";
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
 * The CTA carries proof rather than only a button, because it is the ask a
 * reader passes for the whole length of an article: real client faces from the
 * testimonials, the sitewide project count, and one line on what we are. The
 * faces are read from the testimonial data rather than listed here, so a
 * client whose photo changes changes here too.
 *
 * The CTA is desktop-only. On a phone the aside sits ABOVE the article
 * (GuideAside flips it there), so it would be an ask placed before the reader
 * has read anything, on a page that already closes on two of them.
 */
/**
 * Five real client faces, in testimonial order, skipping anyone we only have
 * the neutral placeholder for. Listing paths here instead would mean a second
 * copy of the roster to keep in step with the first.
 */
const PROOF_FACES = allTestimonials
  .filter((t) => t.avatar && t.avatar !== PLACEHOLDER_AVATAR)
  .slice(0, 5)
  .map((t) => ({ src: t.avatar }));

export function PostChapters({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const active = useActiveSection(items);
  const { chapters } = furniture;

  return (
    <>
      {/* The only part that scrolls. `min-h-0` is what lets a flex child shrink
          below its content height; without it the list keeps its full height,
          the column overflows, and the CTA below is pushed out of view. */}
      <ul className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:[scrollbar-width:thin]">
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

      <div
        className={cn(
          guideAsideRow("light"),
          // `shrink-0` keeps it at full height while the list above gives way.
          "relative isolate hidden overflow-hidden py-7 lg:block lg:shrink-0",
        )}
      >
        {/* The hero's inverted texture wash, so the one loud cell in a column
            of hairlines still belongs to the same page. */}
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="380px"
            className="object-cover opacity-[0.28] invert"
          />
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 100%)",
            }}
          />
        </span>

        <div className="relative">
          <div className="flex -space-x-2">
            {PROOF_FACES.map((face) => (
              <Image
                key={face.src}
                src={face.src}
                alt=""
                width={64}
                height={64}
                className="h-8 w-8 rounded-full border-2 border-light-bg object-cover"
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-label uppercase track-label text-light-muted">
            {chapters.cta.stat}
          </p>

          <p className="mt-4 font-display text-body-lg font-medium leading-snug text-light-text">
            {chapters.cta.heading}
          </p>
          <p className="mt-2 text-body leading-relaxed text-light-muted">
            {chapters.cta.paragraph}
          </p>
          {/* The shared button, forced full width: it is `sm:w-auto` by
              default, which shrinks it to a stub inside a 380px column. */}
          <Button
            cta={chapters.cta.cta}
            tone="light"
            className="mt-5 !w-full"
          />
        </div>
      </div>
    </>
  );
}
