import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { RelatedCards } from "@/components/sections/RelatedCards";
import { ShortAnswer } from "@/components/sections/ShortAnswer";
import { SourcesGrid } from "@/components/sections/SourcesGrid";
import { HeroTexture } from "@/components/sections/compare/ComparePage";
import { GUIDE_ASIDE_GRID, GuideAside, GuideContentCol } from "@/components/sections/migration/GuideAside";
import { ChecklistPhases } from "@/components/sections/resources/ChecklistPhases";
import { phaseAnchor } from "@/components/sections/resources/anchors";
import { PhaseNav } from "@/components/sections/resources/PhaseNav";
import type { ChecklistResource } from "@/content/resources/types";
import { resourceTemplate as t } from "@/content/resources/template";

/**
 * A free resource page, /resources/[slug] (resources hub brief, 23 Nov 2026).
 * In order: breadcrumb and hero with the downloads (plain links, no form),
 * the short answer, the phases with the guides' side navigator, the handoff
 * offer once, FAQ, related cards, sources and the closing band. Every part is
 * an existing component; the only client code is the ticks and the
 * navigator's current-phase highlight.
 *
 * `.print-checklist` scopes the print stylesheet: no nav, no CTAs, empty
 * boxes. Everything that isn't the checklist itself carries `print:hidden`.
 */
export function ChecklistPage({ data, hubHref }: { data: ChecklistResource; hubHref: string | null }) {
  const navItems = data.phases.map((p) => ({ id: phaseAnchor(p.id), label: p.title }));
  const verified = data.sources.map((s) => s.checked).sort().at(-1);

  return (
    <div className="print-checklist">
      <Section tone="light" divide={false} frameClassName="relative !pb-12 !pt-10 md:!pb-16 md:!pt-14">
        <HeroTexture />
        <div className="relative text-center">
          <Breadcrumb
            className="print:hidden"
            items={[
              { label: t.breadcrumb.home, href: "/" },
              // Linked only while the hub has a route, so the trail never 404s.
              { label: t.breadcrumb.hub, href: hubHref ?? undefined },
              { label: data.card.title },
            ]}
          />
          <span className="mt-8 inline-flex items-center rounded-full border border-light-border bg-light-bg/80 px-3 py-1 font-mono text-label uppercase track-label text-light-muted md:mt-10">
            {data.hero.eyebrow}
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance">
            {data.hero.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">
            {data.hero.intro}
          </p>

          {data.downloads.length ? (
            <div className="mx-auto mt-10 max-w-3xl print:hidden">
              <p className="sr-only">{t.downloadsLabel}</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.downloads.map((d) => (
                  <li key={d.href} className="flex flex-col items-center">
                    <a
                      href={d.href}
                      download={d.href.split("/").pop()}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-[6px] border border-light-border bg-light-bg px-5 py-3 text-body font-medium text-light-text transition hover:bg-light-surface sm:w-auto"
                    >
                      <DownloadIcon />
                      {d.label}
                      <span className="rounded-full border border-light-border px-2 py-0.5 font-mono text-label uppercase track-label text-light-muted">
                        {d.format}
                      </span>
                    </a>
                    {d.note ? <p className="mt-2 max-w-xs text-[0.8125rem] leading-snug text-light-muted">{d.note}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Section>

      <ShortAnswer label={t.inShortLabel} text={data.inShort} updated={data.updated} />

      {/* The phases beside the guides' side navigator. Phones: no navigator. */}
      <Section tone="light" frameClassName="!py-0">
        <div className={GUIDE_ASIDE_GRID}>
          <GuideContentCol wide>
            <div className="max-w-[72ch]">
              <ChecklistPhases slug={data.slug} phases={data.phases} copy={t.phases} />

              {/* The handoff offer, once, after the last phase. */}
              <div className="type-card mt-14 flex flex-col gap-5 rounded-card border border-light-border bg-light-surface p-6 md:flex-row md:items-center md:justify-between md:p-7 print:hidden">
                <div className="max-w-xl">
                  <p className="font-display text-body-lg font-medium">{data.handoff.heading}</p>
                  <p className="mt-2 text-body leading-relaxed text-light-muted">{data.handoff.paragraph}</p>
                </div>
                <div className="shrink-0">
                  <Button cta={data.handoff.cta} tone="light" />
                </div>
              </div>
            </div>
          </GuideContentCol>
          <GuideAside label={t.phases.navLabel} tone="light" className="max-lg:hidden print:hidden">
            <PhaseNav items={navItems} />
          </GuideAside>
        </div>
      </Section>

      <Faq data={{ heading: t.faq.heading, subhead: t.faq.subhead, items: data.faq, ctas: [] }} />
      <div className="print:hidden">
        <RelatedCards heading={data.related.heading} items={data.related.items} />
      </div>
      <SourcesGrid heading={t.sources.heading} intro={t.sources.intro} verified={verified} items={data.sources} />
      <div className="print:hidden">
        <CtaBanner
          data={{
            heading: [data.finalCta.heading],
            paragraph: data.finalCta.paragraph,
            cta: data.finalCta.ctas[0],
            ctaSecondary: data.finalCta.ctas[1],
            image: "/textures/studio-texture.jpg",
          }}
        />
      </div>
    </div>
  );
}

function DownloadIcon() {
  // lucide:download
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
