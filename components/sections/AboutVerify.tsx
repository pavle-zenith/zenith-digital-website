import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { isInternal } from "@/lib/utils";
import { aboutVerify, type AboutVerifyMark } from "@/content/about";

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
 * uses: these six are short and parallel, where the dated record is prose
 * that wants a row each. Composition varies by content shape.
 *
 * Each card leads with a mark (owner brief, 25 Nov 2026): the badge, the
 * review platform, the face, the partners' logos, the Shopify mark, or for
 * the company register, which has no logo, a stamp of its numbers. The mark
 * row has a fixed height so the six titles share a line across the grid;
 * bodies clamp at three lines so the links do too.
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
            className="type-card flex flex-col bg-light-bg p-6 md:p-8"
          >
            <div className="mb-6 flex h-14 items-center">
              <Mark mark={item.mark} />
            </div>
            <h3 className="font-display text-body-lg font-medium leading-tight text-light-text">
              {item.record}
            </h3>
            {/* Clamped visually only: the whole record stays in the page. */}
            <p className="mt-3 line-clamp-3 text-body leading-relaxed text-light-muted">
              {item.body}
            </p>
            <span className="flex-1" />

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

/** The visual a record leads with. Sized to sit in the 56px mark row. */
function Mark({ mark }: { mark: AboutVerifyMark }) {
  switch (mark.kind) {
    case "badge":
      return (
        <Image
          src={mark.src}
          alt={mark.alt}
          width={mark.width}
          height={mark.height}
          unoptimized
          className="h-14 w-auto object-contain"
        />
      );
    case "rating":
      // The platform's name with its star, then five stars: the shape of a
      // review profile, with no score (the record links the profile instead).
      return (
        <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="flex items-center gap-1.5 font-display text-body-lg font-semibold tracking-tight text-light-text">
            <StarPath className="h-5 w-5 text-accent" />
            {mark.platform}
          </span>
          <span aria-hidden className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-accent"
              >
                <StarPath className="h-4 w-4 text-white" />
              </span>
            ))}
          </span>
        </span>
      );
    case "avatar":
      return (
        <Image
          src={mark.src}
          alt={mark.alt}
          width={96}
          height={96}
          className="h-12 w-12 rounded-full border border-light-border object-cover"
        />
      );
    case "logos":
      return (
        <span className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {mark.logos.map((logo) =>
            logo.src ? (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={32}
                className="h-[18px] w-auto max-w-[5rem] object-contain"
              />
            ) : (
              // No logo file: the name, set small in the display face.
              <span
                key={logo.alt}
                className="whitespace-nowrap font-display text-[0.9375rem] font-semibold leading-none tracking-tight text-light-text"
              >
                {logo.alt}
              </span>
            ),
          )}
        </span>
      );
    case "logo":
      return (
        <Image
          src={mark.src}
          alt={mark.alt}
          width={120}
          height={40}
          className="h-9 w-auto object-contain"
        />
      );
    case "stamp":
      // A register stamp: double rule, mono label lines, set slightly off
      // square the way a stamp lands.
      return (
        <span className="inline-flex -rotate-2 flex-col gap-0.5 rounded-[6px] border-[3px] border-double border-light-text/60 px-3 py-1.5 font-mono text-label uppercase leading-tight track-label text-light-text/80">
          {mark.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      );
  }
}

function StarPath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
    </svg>
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
