import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutHow, type AboutHowVisual } from "@/content/about";
import { pricing } from "@/content/home";

/**
 * What working with us actually means: four cards in a 2x2 hairline grid
 * (owner brief, 25 Nov 2026), each led by a small picture of its claim, then
 * the claim and its consequence. Same grid construction as the records near
 * the top of the page (1px gaps over the rule colour), so the two read as
 * one system; four divide evenly by two, so no row is ever short.
 *
 * The pictures are drawn in code from things the site already holds: Pavle's
 * photo, the entry price from the homepage pricing (read, never typed), the
 * platform marks, the video posters.
 */
export function AboutHow() {
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={aboutHow.heading} tone="light" />
      <div className="grid gap-px bg-light-border md:grid-cols-2">
        {aboutHow.items.map((item) => (
          <div key={item.title} className="type-card bg-light-bg p-6 md:p-10">
            <div className="mb-8 flex h-14 items-center">
              <Visual visual={item.visual} />
            </div>
            <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[56ch] text-body-lg leading-relaxed text-light-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Visual({ visual }: { visual: AboutHowVisual }) {
  switch (visual.kind) {
    case "chat":
      // The founder's face and a message from him, the lines left blank:
      // the point is who it's from, not what it says.
      return (
        <span aria-hidden className="flex items-end gap-3">
          <Image
            src={visual.avatar}
            alt=""
            width={96}
            height={96}
            className="h-11 w-11 rounded-full border border-light-border object-cover"
          />
          <span className="flex w-40 flex-col gap-2 rounded-[10px] rounded-bl-[2px] border border-light-border bg-light-surface px-4 py-3">
            <span className="h-1.5 w-[85%] rounded-full bg-light-muted/30" />
            <span className="h-1.5 w-1/2 rounded-full bg-light-muted/30" />
          </span>
        </span>
      );
    case "price":
      return (
        <span className="flex items-center gap-3">
          {/* A price tag: the entry price, with the tag's eyelet. */}
          <span className="inline-flex h-11 items-center gap-2.5 rounded-[6px] border border-light-border bg-light-bg pl-3 pr-4 font-display text-body-lg font-medium text-light-text">
            <span aria-hidden className="h-2 w-2 rounded-full border border-light-muted/60" />
            {pricing.tiers[0].price}
          </span>
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-surface text-light-text"
          >
            {/* Lucide calendar */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4M16 2v4" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </span>
        </span>
      );
    case "platforms":
      return (
        <span className="flex items-center gap-3">
          {visual.logos.map((logo) => (
            <span
              key={logo.src}
              className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-light-border bg-light-bg"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={28}
                height={28}
                className="h-6 w-6 object-contain"
              />
            </span>
          ))}
        </span>
      );
    case "posters":
      // Three of the video testimonials' posters, fanned like a stack of
      // cards, a play mark on the front one.
      return (
        <span aria-hidden className="flex items-center">
          {visual.posters.map((src, i) => (
            <span
              key={src}
              className="relative -ml-3 h-14 w-11 overflow-hidden rounded-[6px] border-2 border-light-bg first:ml-0"
              style={{ zIndex: visual.posters.length - i }}
            >
              <Image src={src} alt="" fill sizes="44px" className="object-cover" />
              {i === 0 ? (
                <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
                </span>
              ) : null}
            </span>
          ))}
        </span>
      );
  }
}
