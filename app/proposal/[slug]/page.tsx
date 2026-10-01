import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProposal, proposals } from "@/content/proposals";
import { proposalTemplate } from "@/content/proposals/template";
import { JumpBar } from "@/components/sections/private-doc/JumpBar";
import { MobileBar } from "@/components/sections/private-doc/MobileBar";
import { ProposalHero } from "@/components/sections/proposal-page/ProposalHero";
import { ProposalSummary } from "@/components/sections/proposal-page/ProposalSummary";
import { ProposalFindings } from "@/components/sections/proposal-page/ProposalFindings";
import { ProposalPlan } from "@/components/sections/proposal-page/ProposalPlan";
import { ProposalHandover } from "@/components/sections/proposal-page/ProposalHandover";
import { ProposalGbp } from "@/components/sections/proposal-page/ProposalGbp";
import { ProposalInvestment } from "@/components/sections/proposal-page/ProposalInvestment";
import { ProposalTimeline } from "@/components/sections/proposal-page/ProposalTimeline";
import { ProposalClose } from "@/components/sections/proposal-page/ProposalClose";

/**
 * Private proposal pages. A sales document sent to one prospect as a link, not
 * a page of this site: no index, no sitemap entry, no internal link, not in
 * the nav. Same model as /audit/[slug].
 *
 * FOUR PRIVACY LAYERS, because any single one can be missed:
 *   1. the robots metadata below;
 *   2. `X-Robots-Tag: noindex, nofollow` in next.config.ts for
 *      `/proposal/:slug([^./]+)` and `/proposals/:path*`. The first is
 *      route-shaped, like the audit entry, so it can never catch a public
 *      file that happens to live under a /proposal/ folder. The second covers
 *      the screenshots, which cannot carry a meta tag;
 *   3. absence from app/sitemap.ts, which is an explicit allowlist;
 *   4. no link to `/proposal/...` anywhere on the site.
 *
 * Deliberately NO robots.txt Disallow. robots.txt is public, so a rule there
 * advertises the path to anyone who reads it, and a URL blocked from crawling
 * can still be indexed from a bare link because the crawler is never allowed
 * to fetch the page and read the noindex above.
 *
 * `dynamicParams = false` means only the slugs in the collection build; every
 * other `/proposal/<anything>` is a 404 rather than an empty shell. There is
 * deliberately no `app/proposal/page.tsx`, so `/proposal` itself 404s too.
 *
 * No JSON-LD here on purpose: structured data exists to help machines
 * understand a page, and this one is not for them.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return proposals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) return {};

  return {
    title: proposal.meta.title,
    description: proposal.meta.description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
    // The root layout sets `canonical: "/"`. Inherited, it would declare this
    // private document a duplicate of the homepage. Null clears it.
    alternates: { canonical: null },
    // Only the words change, so a pasted link previews as this proposal. The
    // image is restated on purpose: a page that sets its own `openGraph`
    // replaces the layout's whole object, and the root's file-based
    // opengraph-image.jpg goes with it (that is why /about previews without
    // one). Same file, same alt text.
    openGraph: {
      title: proposal.meta.title,
      description: proposal.meta.description,
      images: [{ url: "/opengraph-image.jpg", ...SHARE_IMAGE }],
    },
    twitter: {
      title: proposal.meta.title,
      description: proposal.meta.description,
      images: [{ url: "/twitter-image.jpg", ...SHARE_IMAGE }],
    },
  };
}

/** The site's default share image, as app/opengraph-image.jpg declares it. */
const SHARE_IMAGE = {
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: readAlt(),
};

function readAlt(): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), "app/opengraph-image.alt.txt"), "utf8").trim();
  } catch {
    return "Zenith Digital";
  }
}

export default async function ProposalRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) notFound();

  return (
    <>
      <ProposalHero hero={proposal.hero} />
      <JumpBar
        label={proposalTemplate.jumpLabel}
        heroId="proposal-hero"
        items={proposalTemplate.jump}
        trailing={proposalTemplate.price}
      />
      <ProposalSummary summary={proposal.summary} />
      <ProposalFindings findings={proposal.findings} />
      <ProposalPlan plan={proposal.plan} />
      <ProposalHandover handover={proposal.handover} />
      <ProposalGbp gbp={proposal.gbp} />
      <ProposalInvestment investment={proposal.investment} />
      <ProposalTimeline timeline={proposal.timeline} />
      <ProposalClose close={proposal.close} />
      <MobileBar label={proposalTemplate.mobileBarLabel} target={proposalTemplate.price.id} />
    </>
  );
}
