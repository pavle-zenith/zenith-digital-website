import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { isInternal } from "@/lib/utils";
import { aboutVerify } from "@/content/about";

/**
 * The records behind the claims, second on the page.
 *
 * /about's whole argument is that the reader should check rather than believe,
 * so the checking sits directly under the entity statement instead of being
 * distributed across the page. This block absorbs what used to be three
 * separate things: the hero's stat row (a weaker restatement of the figures in
 * `aboutNumbers`), the "who vouches for us" grid further down, and the company
 * registration that sat at the very bottom in the register of a legal
 * footnote. All three answered one question, in three places.
 *
 * A hairline grid rather than the divided-row pattern the rest of the page
 * uses: these six are short and parallel, where "what working with us means"
 * and the dated record are prose that wants a row each. Composition varies by
 * content shape.
 */
export function AboutVerify() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader
        heading={aboutVerify.heading}
        intro={aboutVerify.intro}
        tone="light"
      />

      {/* Deliberately NOT bled to the rails. A bled grid would inset each
          cell's text by its own padding (32px) while the heading above sits at
          the frame gutter (up to 64px), so the records would sit left of the
          sentence introducing them. These cells are text, not media, and text
          that lines up with its heading beats hairlines that reach the rails.
          Six records divide evenly by both 2 and 3, so no row is ever short. */}
      <div className="grid gap-px bg-light-border sm:grid-cols-2 lg:grid-cols-3">
        {aboutVerify.items.map((item) => (
          <div
            key={item.record}
            className="flex flex-col bg-light-bg p-6 md:p-8"
          >
            <h3 className="font-display text-body-lg font-medium leading-tight text-light-text">
              {item.record}
            </h3>
            <p className="mt-3 flex-1 text-body leading-relaxed text-light-muted">
              {item.body}
            </p>

            {item.href ? (
              <RecordLink href={item.href} label={item.linkLabel ?? "Open"} />
            ) : (
              // Nothing public to point at. The record still states where it
              // lives, in the mono label register, so the cell closes on a
              // fact rather than trailing off or faking a link.
              <span className="mt-6 font-mono text-label uppercase track-label text-light-muted">
                {item.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Partnerships is on-site; the profiles are not. */
function RecordLink({ href, label }: { href: string; label: string }) {
  const cls =
    "group mt-6 inline-flex w-fit items-center gap-2 font-display text-body font-medium text-light-text underline underline-offset-4 transition hover:text-accent";
  const inner = (
    <>
      {label}
      <span aria-hidden className="btn-arrow">
        &rarr;
      </span>
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}
