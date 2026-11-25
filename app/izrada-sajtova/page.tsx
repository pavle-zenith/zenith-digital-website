import type { Metadata } from "next";

import {
  partnerShowcaseSr as page,
  partnerShowcaseSrCta,
  partnerShowcaseSrJumpTrailing,
  partnerShowcaseSrPricing,
  partnerShowcaseSrUi as ui,
} from "@/content/partner-showcase-sr";
import { caseStudyCards } from "@/content/case-studies";
import { defaultShareImages } from "@/lib/shareImage";
import { JumpBar } from "@/components/sections/private-doc/JumpBar";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { ShowcaseHero } from "@/components/sections/partner-showcase/ShowcaseHero";
import { ShowcaseWork, type ReelItem } from "@/components/sections/partner-showcase/ShowcaseWork";
import { ShowcaseServices } from "@/components/sections/partner-showcase/ShowcaseServices";
import { ShowcaseClose } from "@/components/sections/partner-showcase/ShowcaseClose";

/**
 * /izrada-sajtova: the partner showcase rewritten in Serbian around website
 * design and development that brings results (owner, 25 Nov 2026). The
 * English /partner-showcase is untouched; this page reuses its sections.
 *
 * Order: hero, the work reel, the five services (websites first), pricing,
 * the process, then the close with one action (email). Left out on purpose:
 * the before/after, the platforms, the ads-partner section, the free-audit
 * form and the full project grid (content/partner-showcase-sr.ts says why).
 *
 * Private, like the English page: the robots metadata below, the
 * X-Robots-Tag header in next.config.ts, absence from the sitemap's
 * allowlist, and no link to it anywhere on the site.
 */
export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  // The root layout's `canonical: "/"` would declare this page a duplicate of
  // the homepage. Null clears it.
  alternates: { canonical: null },
  openGraph: {
    title: page.meta.title,
    description: page.meta.description,
    locale: "sr_RS",
    images: defaultShareImages.openGraph,
  },
  twitter: {
    title: page.meta.title,
    description: page.meta.description,
    images: defaultShareImages.twitter,
  },
};

// The work reel: every case study's picture, dealt alternately into its two
// rows so neither row is all one kind of project (as on the English page).
const reel = caseStudyCards
  .filter((c) => c.thumb)
  .map((c): ReelItem => ({ client: c.client, image: c.thumb as string }));
const reelRows: [ReelItem[], ReelItem[]] = [
  reel.filter((_, i) => i % 2 === 0),
  reel.filter((_, i) => i % 2 === 1),
];

export default function ShowcaseSrRoute() {
  return (
    <>
      <ShowcaseHero hero={page.hero} ui={ui} />
      <JumpBar
        label={ui.jumpLabel}
        heroId="showcase-hero"
        items={ui.jump}
        trailing={partnerShowcaseSrJumpTrailing}
      />
      <ShowcaseWork
        heading={page.work.heading}
        intro={page.work.intro}
        stats={page.work.stats}
        rows={reelRows}
        lang="sr"
      />
      <ShowcaseServices services={page.services} ui={ui} lang="sr" />
      <Pricing
        data={partnerShowcaseSrPricing}
        showWhiteLabel={false}
        className="doc-anchor"
      />
      <Process id="process" className="doc-anchor" data={page.process} />
      <ShowcaseClose close={page.close} cta={partnerShowcaseSrCta} />
    </>
  );
}
