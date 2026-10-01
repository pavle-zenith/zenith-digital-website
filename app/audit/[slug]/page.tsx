import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { audits, getAudit } from "@/content/audits";
import { overall, tally } from "@/content/audits/score";
import { AuditHero } from "@/components/sections/audit-page/AuditHero";
import { AuditJumpBar } from "@/components/sections/audit-page/AuditJumpBar";
import { AuditScorecard } from "@/components/sections/audit-page/AuditScorecard";
import { AuditStartHere } from "@/components/sections/audit-page/AuditStartHere";
import { AuditSegment } from "@/components/sections/audit-page/AuditSegment";
import { AuditOffers } from "@/components/sections/audit-page/AuditOffers";
import { AuditCeiling } from "@/components/sections/audit-page/AuditCeiling";
import { AuditProof } from "@/components/sections/audit-page/AuditProof";
import { AuditClose } from "@/components/sections/audit-page/AuditClose";
import { MobileBar } from "@/components/sections/private-doc/MobileBar";

/**
 * Private audit pages. A document sent to one client as a link, not a page of
 * this site: no index, no sitemap entry, no internal link, not in the nav.
 *
 * FOUR PRIVACY LAYERS, because any single one can be missed:
 *   1. the robots metadata below;
 *   2. `X-Robots-Tag: noindex, nofollow` in next.config.ts for
 *      `/audit/:slug([^./]+)` and `/audits/:path*`. The first is deliberately
 *      NOT `/audit/:path*` (which the handoff specifies): that wildcard also
 *      matched public/audit/, which holds images for the public
 *      /free-website-audit page, and noindexed them. It covers one path
 *      segment, so a nested audit route needs its own entry. The second covers
 *      the PDF, which cannot carry a meta tag;
 *   3. absence from app/sitemap.ts, which is an explicit allowlist;
 *   4. no link to `/audit/...` anywhere on the site.
 *
 * Deliberately NO robots.txt Disallow. robots.txt is public, so a rule there
 * advertises the path to anyone who reads it, and a URL blocked from crawling
 * can still be indexed from a bare link because the crawler is never allowed
 * to fetch the page and read the noindex above.
 *
 * `dynamicParams = false` means only the slugs in the collection build; every
 * other `/audit/<anything>` is a 404 rather than an empty shell. There is
 * deliberately no `app/audit/page.tsx`, so `/audit` itself 404s too.
 *
 * No JSON-LD here on purpose: structured data exists to help machines
 * understand a page, and this one is not for them.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return audits.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audit = getAudit(slug);
  if (!audit) return {};

  return {
    title: audit.meta.title,
    description: audit.meta.description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
    // The root layout sets `canonical: "/"`. Inherited, it would declare this
    // private document a duplicate of the homepage. Null clears it.
    alternates: { canonical: null },
    openGraph: {
      title: audit.meta.title,
      description: audit.meta.description,
    },
    // Otherwise inherited from the layout, so a pasted link would preview
    // with the generic homepage title.
    twitter: {
      title: audit.meta.title,
      description: audit.meta.description,
    },
  };
}

/**
 * The PDF's size, read off disk at build time. Size only ("191 KB"): the label
 * already names the file type. Hardcoding it means the label silently lies the
 * first time the file is replaced.
 */
function pdfSize(pdfHref: string): string {
  try {
    const abs = path.join(process.cwd(), "public", pdfHref.replace(/^\//, ""));
    const kb = fs.statSync(abs).size / 1024;
    return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
  } catch {
    // A missing file is a content error, not a render error.
    return "PDF";
  }
}

export default async function AuditRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const audit = getAudit(slug);
  if (!audit) notFound();

  // Scored once, here, and handed down, so the gauge, the scorecard, the jump
  // bar and each segment's pill can never disagree.
  const total = overall(audit);
  const rows = audit.segments.map((s) => ({ id: s.id, name: s.name, tally: tally(s.checks) }));

  return (
    <>
      <AuditHero audit={audit} overall={total} pdfSize={pdfSize(audit.hero.pdfHref)} />
      <AuditJumpBar
        items={rows.map((r) => ({ id: r.id, name: r.name, score: r.tally.score, band: r.tally.band }))}
      />
      <AuditScorecard rows={rows} />
      <AuditStartHere keyFixes={audit.keyFixes} />
      {audit.segments.map((segment, i) => (
        <AuditSegment key={segment.id} segment={segment} slug={audit.slug} index={i} />
      ))}
      <AuditOffers offers={audit.offers} />
      <AuditCeiling ceiling={audit.offers.ceiling} />
      {audit.proof ? <AuditProof proof={audit.proof} /> : null}
      <AuditClose close={audit.close} cta={audit.hero.callCta} />
      <MobileBar label="See your two options" target="options" />
    </>
  );
}
