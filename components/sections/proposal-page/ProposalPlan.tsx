import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ProposalPage } from "@/content/proposals/types";
import { TickList } from "@/components/sections/private-doc/parts";

/**
 * The plan: one panel per site, side by side from `md` in a hairline grid,
 * each listing its pages as ruled rows, then what both sites share.
 *
 * Page name and detail stack in the panel until `xl`, where a half-width panel
 * is finally wide enough to set them as two columns without squeezing the
 * detail into a sliver.
 *
 * The domain is display text, never a link.
 */
export function ProposalPlan({ plan }: { plan: ProposalPage["plan"] }) {
  return (
    <Section id="plan" tone="light" className="doc-anchor" frameClassName="!py-14 md:!py-24">
      <SectionHeader heading={plan.heading} intro={plan.intro} tone="light" />

      <div className="frame-bleed-md grid gap-px border-y border-light-border bg-light-border md:grid-cols-2">
        {plan.sites.map((site) => (
          <div
            key={site.name}
            className="bg-light-bg py-8 md:px-[clamp(20px,4vw,64px)] md:py-10"
          >
            <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
              {site.name}
            </h3>
            <p className="mt-2 font-mono text-label uppercase track-label text-light-muted">
              {site.domain}
            </p>
            {site.note ? <p className="mt-4 text-body text-light-muted">{site.note}</p> : null}

            <ul role="list" className="mt-6">
              {site.pages.map((page) => (
                <li
                  key={page.name}
                  className="border-t border-light-border py-3.5 xl:grid xl:grid-cols-[11rem_minmax(0,1fr)] xl:gap-6"
                >
                  <span className="block font-medium text-light-text">{page.name}</span>
                  {page.detail ? (
                    <span className="mt-1 block text-body text-light-muted xl:mt-0">
                      {page.detail}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 md:mt-20">
        <h3 className="font-display text-h3 font-medium leading-tight tracking-tight">
          {plan.builtIn.heading}
        </h3>
        <TickList items={plan.builtIn.items} className="mt-6" />
      </div>
    </Section>
  );
}
