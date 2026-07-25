import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { hero, logos } from "@/content/home";

/**
 * Section 1 — Hero (Trueform layout). Compact left-aligned block: pill badge with
 * the Wix Studio partner lockup, a smaller two-line headline, subhead, two rounded
 * buttons. Then the logo marquee, then a 2x2 grid of highlighted case studies that
 * flows straight out of the hero.
 */
export function Hero() {
  return (
    <Section tone="light" divide={false} frameClassName="!py-0">
      {/* Hero content */}
      <div className="flex flex-col justify-end pb-14 pt-20">
        {/* Eyebrow: "Top 1% Partner of  Wix Studio" */}
        <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-light-surface px-3 py-1.5 text-label font-medium">
          <span className="text-light-muted">{hero.badgePrefix}</span>
          <span className="font-display font-medium text-light-text">{hero.badgeBrand}</span>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Left: headline, subhead, CTAs */}
          <div className="max-w-4xl">
            <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-light-muted">
              {hero.subhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {hero.ctas.map((cta) => (
                <Button key={cta.href} cta={cta} tone="light" />
              ))}
            </div>
          </div>

          {/* Bottom-right: proof badge — label left, avatars right */}
          <div className="flex shrink-0 items-center gap-3 lg:pb-2">
            <span className="font-display font-medium text-light-text">{hero.proof.label}</span>
            <div className="flex -space-x-3">
              {hero.proof.avatars.map((src) => (
                <span
                  key={src}
                  className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-light-bg"
                >
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Logo marquee band — bleeds to the frame side rails */}
      <LogoMarquee logos={logos.items} caption={logos.caption} />

      {/* 2x2 highlighted case studies — flows out of the hero. The 1px grid gaps on a
          rule-colored background render as hairlines that touch the frame rails. */}
      <div className="frame-bleed grid grid-cols-1 gap-px border-t border-light-border bg-light-border sm:grid-cols-2">
        {hero.featured.map((c) => (
          <Link
            key={c.client}
            href={c.href}
            className="group flex flex-col gap-4 bg-light-bg p-6 transition hover:bg-light-surface"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] border border-light-border bg-light-surface">
              <Image
                src={c.image}
                alt={`${c.client} website`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display font-medium">{c.client}</span>
              <span className="font-mono text-label uppercase track-label text-light-muted">
                {c.tag}
              </span>
            </div>
            <span className="text-body font-medium text-light-text">{c.metric}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
