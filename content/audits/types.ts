/**
 * Private audit pages (`/audit/[slug]`).
 *
 * These are documents, not site pages: noindexed, absent from the sitemap, and
 * linked from nowhere. Everything client-specific lives in a content file, so
 * a new audit is one file plus one line in `index.ts` and no component work.
 */

export type AuditPriority = "high" | "medium" | "low";
export type AuditMark = "yes" | "no" | "partial";

export interface AuditPage {
  slug: string;
  client: string;
  /** Display only, never a followed link. */
  clientUrl: string;
  date: string;
  focus: string;
  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    heading: string;
    lead: string[];
    /** "" until recorded: renders nothing rather than an empty frame. */
    loomId: string;
    pdfHref: string;
    pdfLabel: string;
    callCta: { label: string; href: string };
  };

  stats: { value: string; label: string }[];
  working: { heading: string; items: string[] };
  fixes: {
    heading: string;
    items: { title: string; why: string; fix: string; effort: string }[];
  };
  evidence: {
    heading: string;
    items: {
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    }[];
  };
  findings: {
    heading: string;
    summary: string;
    groups: {
      name: string;
      items: { finding: string; why: string; priority: AuditPriority }[];
    }[];
  };

  offers: {
    heading: string;
    intro: string;
    options: {
      id: "fix" | "rebuild";
      label: string;
      name: string;
      price: string;
      priceNote: string;
      bestFor: string;
      recommended: boolean;
      includes: string[];
      cta: { label: string; href: string };
    }[];
    comparison: {
      heading: string;
      columns: [string, string];
      rows: {
        label: string;
        fix: AuditMark;
        rebuild: AuditMark;
        fixNote?: string;
        rebuildNote?: string;
      }[];
    };
    ceiling: { heading: string; body: string[] };
    /** Optional owner offer. Delete the key to withdraw it. */
    credit?: string;
  };

  proof?: {
    eyebrow: string;
    heading: string;
    body: string;
    links: { label: string; href: string }[];
  };

  close: { heading: string; body: string; note: string };
}
