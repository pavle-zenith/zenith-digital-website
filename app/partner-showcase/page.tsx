import type { Metadata } from "next";

import { partnerShowcase as page, partnerShowcaseUi as ui } from "@/content/partner-showcase";
import { caseStudyCards } from "@/content/case-studies";
import { defaultShareImages } from "@/lib/shareImage";
import { JumpBar } from "@/components/sections/private-doc/JumpBar";
import { Process } from "@/components/sections/Process";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { Audit } from "@/components/sections/Audit";
import { ShowcaseHero } from "@/components/sections/partner-showcase/ShowcaseHero";
import { ShowcaseWork, type ReelItem } from "@/components/sections/partner-showcase/ShowcaseWork";
import { ShowcaseServices } from "@/components/sections/partner-showcase/ShowcaseServices";
import { ShowcaseTogether } from "@/components/sections/partner-showcase/ShowcaseTogether";
import { ShowcasePlatforms } from "@/components/sections/partner-showcase/ShowcasePlatforms";
import { ShowcaseClose } from "@/components/sections/partner-showcase/ShowcaseClose";

/**
 * /partner-showcase: a private page a performance-marketing partner shows to
 * their own clients, white-label. Built from Docs/Partner_Showcase_Handoff.md.
 *
 * THREE HARD RULES (owner, 2 Oct 2026): no prices of any kind, the partner is
 * never named, and nothing routes to a Zenith sales step. That last one is why
 * the route sits outside the (site) route group, with its own layout: the
 * site Nav and Footer lead to public pricing and to the booking form, and
 * they are never rendered here at all.
 *
 * FOUR PRIVACY LAYERS, as on /proposal/ and /audit/:
 *   1. the robots metadata below;
 *   2. `X-Robots-Tag: noindex, nofollow` for `/partner-showcase` in
 *      next.config.ts. Every image here is already public elsewhere on the
 *      site, so there is no private asset folder to cover;
 *   3. absence from app/sitemap.ts, which is an explicit allowlist;
 *   4. no link to `/partner-showcase` anywhere on the site.
 *
 * Deliberately NO robots.txt Disallow, for the reason given on the audit
 * route. No JSON-LD: structured data is for machines, and this page isn't.
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
    images: defaultShareImages.openGraph,
  },
  twitter: {
    title: page.meta.title,
    description: page.meta.description,
    images: defaultShareImages.twitter,
  },
};

// The work reel shows the same pictures as the grid, dealt alternately into
// its two rows so neither row is all one kind of project.
const reel = caseStudyCards
  .filter((c) => c.thumb)
  .map((c): ReelItem => ({ client: c.client, image: c.thumb as string }));
const reelRows: [ReelItem[], ReelItem[]] = [
  reel.filter((_, i) => i % 2 === 0),
  reel.filter((_, i) => i % 2 === 1),
];

export default function PartnerShowcaseRoute() {
  return (
    <>
      <ShowcaseHero hero={page.hero} />
      <JumpBar label={ui.jumpLabel} heroId="showcase-hero" items={ui.jump} />
      <ShowcaseWork
        heading={page.work.heading}
        intro={page.work.intro}
        stats={page.work.stats}
        rows={reelRows}
      />
      <ShowcaseServices services={page.services} />
      {/* The homepage's free-audit section, as is. Owner's call (2 Oct 2026):
          the one route on this page to a Zenith sales step, an exception to
          the handoff's "no sales routes" rule. */}
      <Audit />
      <ShowcaseTogether together={page.together} />
      <ShowcasePlatforms tech={page.tech} />
      <Process id="process" className="doc-anchor" data={page.process} />
      <CaseStudyGrid
        id="projects"
        className="doc-anchor"
        heading={page.projects.heading}
        intro={page.projects.intro}
        links="live"
      />
      <ShowcaseClose close={page.close} />
    </>
  );
}
