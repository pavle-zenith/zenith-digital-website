import { Section } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HeroTexture } from "@/components/sections/compare/ComparePage";
import { ResourceCard } from "@/components/sections/resources/ResourceCard";
import { ResourceFilter } from "@/components/sections/resources/ResourceFilter";
import { resourcesHub as c } from "@/content/resources/hub";
import type { ResourceEntry, ResourceType } from "@/content/resources/types";

/**
 * /resources (resources hub brief, 23 Nov 2026): one library over pages that
 * already exist. Hero, three featured cards, the filterable grid, a short
 * FAQ, then the free audit. Built from the site's existing parts: the
 * comparison hero and texture, FilterTab, the case-study card, Faq and
 * CtaBanner. The cards come in from lib/resources-index.ts.
 */
export function ResourcesHub({ entries }: { entries: ResourceEntry[] }) {
  const meta = (key: ResourceType) => c.types.find((t) => t.key === key) ?? { label: key, icon: "answer" };
  // The owner's three picks, in order, skipping any that isn't live.
  const featured = c.featured
    .map((slug) => entries.find((e) => e.href.endsWith(`/${slug}`)))
    .filter((e): e is ResourceEntry => Boolean(e));

  return (
    <>
      <Section tone="light" divide={false} frameClassName="relative !pb-12 !pt-10 md:!pb-16 md:!pt-14">
        <HeroTexture />
        <div className="relative text-center">
          {/* The trail doubles as the eyebrow: its last step is "Resources". */}
          <Breadcrumb items={[{ label: c.breadcrumb.home, href: "/" }, { label: c.breadcrumb.hub }]} />
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-h1 font-medium leading-[1.08] tracking-tight text-balance md:mt-10">
            {c.h1}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg font-medium leading-relaxed text-light-muted">{c.intro}</p>
        </div>
      </Section>

      {featured.length ? (
        <Section tone="light" frameClassName="!py-10 md:!py-14">
          <ul className="grid gap-5 md:grid-cols-3">
            {featured.map((e) => (
              <li key={e.href}>
                <ResourceCard entry={e} type={meta(e.type)} updatedLabel={c.card.updated} large />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section tone="light" id="all" frameClassName="!py-12 md:!py-20" className="scroll-mt-[calc(4rem+var(--announce-h))]">
        <ResourceFilter
          entries={entries}
          topics={c.topics}
          types={c.types}
          copy={{ ...c.filters, updated: c.card.updated }}
        />
      </Section>

      <Faq data={{ heading: c.faq.heading, subhead: c.faq.subhead, items: c.faq.items, ctas: [] }} />
      <CtaBanner data={c.closing} />
    </>
  );
}
