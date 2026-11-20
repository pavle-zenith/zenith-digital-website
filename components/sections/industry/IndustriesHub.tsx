import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  caseStudyCards,
  detailSlugs,
  type IndustrySlug,
} from "@/content/case-studies";
import { logos } from "@/content/home";
import { hubRows } from "@/content/industries";
import { industriesHub as hub } from "@/content/industries/hub";
import { industryTemplate as t } from "@/content/industries/template";

/**
 * /industries. DesignMe's structure and calm, list-led simplicity, built from
 * the shared system: the guides' centred hero register, the sitewide logo
 * strip, ruled full-width rows, the grid's project card, and the Faq and
 * CtaBanner sections.
 *
 * Order (hub-and-nav brief, Part A5): hero, logo strip, industry rows,
 * selected work, the principles, FAQ, closing CTA. One list, one taxonomy.
 */
export function IndustriesHub() {
  return (
    <>
      <HubHero />
      <Section tone="light" divide={false} frameClassName="!py-0">
        <LogoMarquee logos={logos.items} caption={logos.caption} />
      </Section>
      <IndustryList />
      <SelectedWork />
      <Principles />
      {/* No buttons beside the FAQ heading: the hero and the closing band
          both carry the same two. */}
      <Faq
        data={{
          heading: hub.faq.heading,
          subhead: hub.faq.subhead,
          ctas: [],
          items: hub.faq.items,
        }}
      />
      <CtaBanner
        data={{
          heading: hub.finalCta.heading,
          paragraph: hub.finalCta.paragraph,
          ...t.finalCta,
        }}
      />
    </>
  );
}

/** Centred hero on the inverted studio texture, with the homepage trust row. */
function HubHero() {
  return (
    <Section
      tone="light"
      divide={false}
      frameClassName="relative !pb-14 !pt-14 md:!pb-20 md:!pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/textures/studio-texture.jpg"
          // The hero texture is the largest paint on a phone: load it first.
          priority
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.28] invert"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 0%, color-mix(in srgb, var(--color-light-bg) 88%, transparent) 50%, color-mix(in srgb, var(--color-light-bg) 45%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
          {hub.hero.h1}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">
          {hub.hero.line}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          {hub.hero.ctas.map((cta) => (
            <Button key={cta.href} cta={cta} tone="light" />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {hub.hero.trust.avatars.map((src) => (
              <span
                key={src}
                className="relative h-9 w-9 overflow-hidden rounded-[6px] ring-2 ring-light-bg"
              >
                <Image src={src} alt="" fill sizes="36px" className="object-cover" />
              </span>
            ))}
          </div>
          <span className="font-display font-medium text-light-text">
            {hub.hero.trust.label}
          </span>
        </div>
      </div>
    </Section>
  );
}

/**
 * The industry list, the page's main section (DesignMe's layout, tightened):
 * full-width ruled rows, each one link. Left to right: a square icon tile and
 * the name, the one-line purpose, the arrow at the far right. On phones the
 * purpose drops under the name and the arrow stays up beside it.
 *
 * Every row links (see industryHref): its page once published, the filtered
 * case-study grid until then, Agencies to /partnerships.
 *
 * HOVER PREVIEW. On a desktop pointer, hovering a row fades in that
 * industry's lead project (its first study with a detail page, else its
 * first card). From xl up the row has a fourth, empty column between the
 * name and the purpose, and the preview opens centred in it, so it never
 * covers any text and sits in the middle of the gap rather than against the
 * purpose (owner, 18 Nov 2026). The name column is a fixed 18rem, just wide
 * enough for "Professional services", so that gap lines up row to row. It overflows the row's height into the same
 * empty column of the rows around it. Below xl there's no room for that
 * column without squeezing the names, so there's no preview either.
 * CSS only: Tailwind v4's hover variants apply only under `(hover: hover)`,
 * so touch screens never trigger it. Under reduced motion it appears without
 * the fade and scale.
 *
 * Rows bleed to the frame rails so the hover tint and the rules run rail to
 * rail, and re-apply the gutter inside.
 */
function IndustryList() {
  const rows = hubRows();

  return (
    <Section
      tone="light"
      id={hub.list.id}
      className="scroll-mt-[calc(4rem+var(--announce-h))]"
      frameClassName="!py-14 md:!py-24"
    >
      <div className="max-w-3xl">
        <Eyebrow>{hub.list.eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
          {hub.list.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">
          {hub.list.intro}
        </p>
      </div>

      <ul className="frame-bleed mt-10 border-t border-light-border md:mt-14">
        {rows.map((row) => {
          const lead = leadProject(row.key);
          return (
            <li key={row.key} className="border-b border-light-border">
              <Link
                href={row.href}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 px-[clamp(20px,4vw,64px)] py-5 transition hover:bg-light-surface md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-x-10 md:py-6 xl:grid-cols-[18rem_minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <span className="flex min-w-0 items-center gap-4 md:gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border border-light-border bg-light-bg text-light-text">
                    <FeatureIcon name={row.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="min-w-0 font-display text-h3 font-medium leading-tight tracking-tight">
                    {row.name}
                  </h3>
                </span>

                {/* The preview's own column (xl up): empty until hover, so
                    the image sits between the name and the purpose instead of
                    on top of either. */}
                {lead ? (
                  <span aria-hidden className="relative hidden h-full xl:block">
                    <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 scale-95 opacity-0 transition duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 motion-reduce:scale-100 motion-reduce:transition-none">
                      <span className="relative block aspect-[16/10] overflow-hidden rounded-card border border-light-border bg-bg">
                        <Image
                          src={lead}
                          alt=""
                          fill
                          sizes="280px"
                          className="object-cover object-center"
                        />
                      </span>
                    </span>
                  </span>
                ) : (
                  <span aria-hidden className="hidden xl:block" />
                )}

                <span className="order-last col-span-2 max-w-[52ch] text-body leading-snug text-light-muted md:order-none md:col-span-1">
                  {row.purpose}
                </span>

                <span
                  aria-hidden
                  className="btn-arrow w-6 justify-self-end text-right text-h3 text-light-text"
                >
                  &rarr;
                </span>

              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/**
 * Selected work: the page's one image-led section. Three projects from three
 * industries, on the case-study grid's own card, with the way into the full
 * index.
 */
function SelectedWork() {
  const w = hub.selectedWork;
  const cards = w.slugs
    .map((slug) => caseStudyCards.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-h2 font-medium leading-tight tracking-tight">
          {w.heading}
        </h2>
        <Link
          href={w.link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 font-display text-body font-medium transition hover:text-accent"
        >
          {w.link.label}{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:mt-12 lg:grid-cols-3">
        {cards.map((c) => (
          <ProjectCard
            key={c.slug}
            card={c}
            detail={detailSlugs.has(c.slug)}
            liveUrl={c.liveUrl}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ))}
      </div>
    </Section>
  );
}

/** Three principles: heading and link on the left, ruled columns beside. */
function Principles() {
  const p = hub.principles;
  return (
    <Section tone="light" frameClassName="!py-14 md:!py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 font-medium leading-tight tracking-tight text-balance">
            {p.heading}
          </h2>
          <p className="mt-4 text-body-lg font-medium leading-relaxed text-light-muted">
            {p.intro}
          </p>
        </div>
        <Link
          href={p.link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 font-display text-body font-medium transition hover:text-accent"
        >
          {p.link.label}{" "}
          <span aria-hidden className="btn-arrow">
            &rarr;
          </span>
        </Link>
      </div>

      <ol className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-12">
        {p.items.map((item) => (
          <li key={item.title} className="border-t border-light-border pt-6">
            <h3 className="font-display text-h3 font-medium leading-snug tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-body leading-relaxed text-light-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/**
 * The thumbnail for an industry's hover preview: its first project with a
 * detail page, else its first project with a shot. Null when none has one.
 */
function leadProject(key: IndustrySlug): string | null {
  const cards = caseStudyCards.filter((c) => c.industry === key && c.thumb);
  const lead = cards.find((c) => detailSlugs.has(c.slug)) ?? cards[0];
  return lead?.thumb ?? null;
}
