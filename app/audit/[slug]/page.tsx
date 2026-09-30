import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { audits, getAudit } from "@/content/audits";
import { AuditHero } from "@/components/sections/audit-page/AuditHero";
import { AuditStats } from "@/components/sections/audit-page/AuditStats";
import { AuditWorking } from "@/components/sections/audit-page/AuditWorking";
import { AuditFixes } from "@/components/sections/audit-page/AuditFixes";
import { AuditEvidence } from "@/components/sections/audit-page/AuditEvidence";
import { AuditFindings } from "@/components/sections/audit-page/AuditFindings";
import { AuditOffers } from "@/components/sections/audit-page/AuditOffers";
import { AuditCeiling } from "@/components/sections/audit-page/AuditCeiling";
import { AuditProof } from "@/components/sections/audit-page/AuditProof";
import { AuditClose } from "@/components/sections/audit-page/AuditClose";

/**
 * Private audit pages. A document sent to one client as a link, not a page of
 * this site: no index, no sitemap entry, no internal link, not in the nav.
 *
 * FOUR PRIVACY LAYERS, because any single one can be missed:
 *   1. the robots metadata below;
 *   2. `X-Robots-Tag: noindex, nofollow` in next.config.ts for
 *      `/audit/:slug([^./]+)` and `/audits/:path*`. The first is deliberately
 *      NOT `/audit/:path*`: that wildcard also matched public/audit/, which
 *      holds images for the public /free-website-audit page, and noindexed
 *      them. It covers one path segment, so a nested audit route needs its own
 *      entry. The second covers the PDF, which cannot carry a meta tag;
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
    // private document a duplicate of the homepage: a mixed signal on a page
    // whose whole job is to stay out of the index. Null clears it.
    alternates: { canonical: null },
    openGraph: {
      title: audit.meta.title,
      description: audit.meta.description,
    },
    // Also inherited from the layout otherwise, so a link pasted into Slack or
    // an email would preview as the generic homepage title.
    twitter: {
      title: audit.meta.title,
      description: audit.meta.description,
    },
  };
}

/**
 * The PDF's size, read off disk at build time. Hardcoding it means the label
 * silently lies the first time the file is replaced, and this link is the main
 * thing the page asks the reader to do.
 */
function pdfSize(pdfHref: string): string {
  try {
    const abs = path.join(process.cwd(), "public", pdfHref.replace(/^\//, ""));
    const bytes = fs.statSync(abs).size;
    const kb = bytes / 1024;
    return kb >= 1024
      ? `PDF, ${(kb / 1024).toFixed(1)} MB`
      : `PDF, ${Math.round(kb)} KB`;
  } catch {
    // A missing file is a content error, not a render error: the link still
    // works and still says what it is.
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

  return (
    <>
      <AuditHero audit={audit} pdfSize={pdfSize(audit.hero.pdfHref)} />
      <AuditStats stats={audit.stats} />
      <AuditWorking working={audit.working} />
      <AuditFixes fixes={audit.fixes} />
      <AuditEvidence evidence={audit.evidence} />
      <AuditFindings findings={audit.findings} />
      <AuditOffers offers={audit.offers} />
      <AuditCeiling ceiling={audit.offers.ceiling} />
      {audit.proof ? <AuditProof proof={audit.proof} /> : null}
      <AuditClose close={audit.close} cta={audit.hero.callCta} />
    </>
  );
}
