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
      {/* Hero content — on the inverted studio texture, confined to the frame
          column (rail to rail via frame-bleed) and ending at the marquee rule */}
      <div className="relative">
        <div
          className="frame-bleed pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <Image
            src="/textures/studio-texture.jpg"
            alt=""
            fill
            sizes="100vw"
            // Above the fold and behind the H1, so it is the LCP candidate.
            // Without priority it sat in the lazy queue with all 88 other
            // images and was invisible to the browser's preload scanner.
            priority
            className="object-cover opacity-[0.28] invert"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 92%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 55%, transparent) 60%, color-mix(in srgb, var(--color-light-bg) 20%, transparent) 100%)",
            }}
          />
        </div>

        <div className="relative flex flex-col justify-end pb-10 pt-10 md:pb-14 md:pt-20">
        {/* Eyebrow: the partner badge, linking out to the Wix Partner
            directory so the tier can be verified rather than just asserted. */}
        <a
          href={hero.badgeHref}
          target="_blank"
          rel="noopener"
          className="group mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-light-surface px-3 py-1.5 text-label font-medium transition hover:bg-light-border"
        >
          <span className="text-light-muted">{hero.badgePrefix}</span>
          <Image
            src="/logos-white/wix-studio.png"
            unoptimized
            alt={hero.badgeBrand}
            width={100}
            height={24}
            className="h-7 w-auto object-contain invert"
          />
          <span aria-hidden className="btn-arrow text-light-muted">
            &rarr;
          </span>
        </a>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Left: headline, subhead, CTAs */}
          <div className="max-w-4xl">
            <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-body-lg font-medium leading-relaxed text-light-muted">
              {hero.subhead}
            </p>
            {/* CTAs with the proof badge alongside them: the faces and the
                count now vouch for "See our work" at the moment of the click,
                instead of sitting off in the far corner of the hero. Phones
                stack, so the badge lands under the two full-width buttons. */}
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex flex-col gap-3 sm:flex-row">
                {hero.ctas.map((cta) => (
                  <Button key={cta.href} cta={cta} tone="light" />
                ))}
              </div>

              {/* Avatars first, then the count. */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {hero.proof.avatars.map((src) => (
                    <span
                      key={src}
                      className="relative h-9 w-9 overflow-hidden rounded-[6px] ring-2 ring-light-bg"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </span>
                  ))}
                </div>
                <span className="font-display font-medium text-light-text">
                  {hero.proof.label}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom-right: the Wix credentials, in the slot the proof badge
              vacated. Backgrounds are keyed out, so they read as badges on the
              texture rather than three white tiles. */}
          <ul className="flex shrink-0 items-end gap-4 lg:pb-2">
            {hero.certifications.map((c) => (
              <li key={c.src}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  width={c.width}
                  height={240}
                  // Served straight from the CDN, no optimizer pass. These are
                  // already trimmed, background-keyed WebP at 8-16KB for a box
                  // that is never taller than 80px, so a transform costs a
                  // quota unit and saves nothing. It also stops Next emitting a
                  // srcset that asked for the same badge at six widths up to
                  // 3840px.
                  unoptimized
                  className="h-16 w-auto object-contain sm:h-20"
                />
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

      {/* Logo marquee band — bleeds to the frame side rails */}
      <LogoMarquee logos={logos.items} caption={logos.caption} />

      {/* 2x2 highlighted case studies — flows out of the hero. The 1px grid gaps on a
          rule-colored background render as hairlines that touch the frame rails.
          The phone spacing is PADDING on this wrapper, not a margin on the grid:
          the section runs at !py-0, so a margin here collapses straight out of
          the section and shows a navy strip of <body> between sections. */}
      <div className="max-md:py-6">
      <div className="frame-bleed-md grid grid-cols-1 gap-px bg-light-border max-md:overflow-hidden max-md:rounded-card max-md:border max-md:border-light-border sm:grid-cols-2 md:border-t md:border-light-border">
        {hero.featured.map((c, i) => (
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
                // The top row of the 2x2 is above the fold on desktop and is
                // the first card on phones. The bottom row stays lazy.
                priority={i < 2}
                className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {/* Title row and metric are one block so the card's gap-4 sets
                the space below the IMAGE only. The metric reads as a caption
                under the client name, not a second equal-weight line. */}
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display font-medium">{c.client}</span>
                <span className="font-mono text-label uppercase track-label text-light-muted">
                  {c.tag}
                </span>
              </div>
              <span className="mt-1 block text-label font-medium text-light-text">
                {c.metric}
              </span>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </Section>
  );
}
