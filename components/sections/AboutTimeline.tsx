import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutTimeline } from "@/content/about";

/**
 * The dated record, on navy. This is the spine of /about: a checkable sequence
 * is what lets an answer engine state when the company started rather than
 * guess at it, and it is the one thing on the page a competitor cannot copy
 * without lying.
 *
 * Two fixes from the previous version, both structural rather than cosmetic:
 *
 * 1. The years were set in `text-accent`. The accent is #02013a against a
 *    #0a1020 ground: 1.04:1, so the dates the section exists to carry were
 *    invisible. They now take the section's own ink at headline scale, which
 *    is what DESIGN.md's Numbers-Are-Headings Rule asks for anyway.
 * 2. Each row can carry its evidence. Where a year names partners we hold
 *    marks for, the marks sit under the claim. Where nothing verifiable
 *    attaches, the row carries the dated fact alone rather than borrowing a
 *    logo from a different year.
 */
export function AboutTimeline() {
  return (
    <Section tone="dark" frameClassName="!py-14 md:!py-24">
      <SectionHeader
        heading={aboutTimeline.heading}
        intro={aboutTimeline.intro}
        tone="dark"
      />

      <ol className="border-t border-border">
        {aboutTimeline.items.map((item) => (
          <li
            key={item.year}
            className="grid gap-3 border-b border-border py-8 md:grid-cols-[12rem_1fr] md:gap-10 md:py-10"
          >
            {/* The year is the row's number, so it takes the display face at
                headline scale and the section's full-strength ink. */}
            <span className="font-display text-h2 font-medium leading-none tracking-tight text-text">
              {item.year}
            </span>

            <div>
              <p className="max-w-[68ch] text-body-lg leading-relaxed text-text-muted">
                {item.body}
              </p>

              {item.marks ? (
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  {item.marks.map((mark) => (
                    <Image
                      key={mark.src}
                      src={mark.src}
                      alt={mark.alt}
                      width={140}
                      height={32}
                      className="h-5 w-auto object-contain opacity-70"
                    />
                  ))}
                </div>
              ) : null}

              {item.selfEvident ? (
                <p className="mt-6 font-mono text-label uppercase track-label text-text">
                  {item.selfEvident}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
