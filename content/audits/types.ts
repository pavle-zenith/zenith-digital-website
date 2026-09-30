/**
 * Private audit pages (`/audit/[slug]`), v2: scored and segmented.
 *
 * These are documents, not site pages: noindexed, absent from the sitemap, and
 * linked from nowhere. Everything client-specific lives in a content file, so
 * a new audit is one file plus one line in `index.ts` and no component work.
 *
 * NO SCORE IS EVER TYPED. Every number on the page (the gauge, the scorecard,
 * each segment's pill, the jump bar) is computed from `checks` by `score.ts`.
 * The method is printed on the page and every check is listed, so a client can
 * recount it. A typed-in score could drift from the checks and nothing would
 * notice; a computed one cannot.
 */

export type CheckStatus = "pass" | "partial" | "fail";
export type AuditPriority = "high" | "medium" | "low";
export type AuditMark = "yes" | "no" | "partial";

export interface AuditCheck {
  /** The check, phrased as the good state ("Listing is claimed and managed"). */
  label: string;
  status: CheckStatus;
  /** What we found, one sentence. */
  detail: string;
  /** Required whenever `status` is not "pass". Enforced by `assertAudit`. */
  priority?: AuditPriority;
}

export interface AuditImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface AuditSegment {
  /** Anchor, e.g. "google-listing". Also the key the jump bar and "Start here" link to. */
  id: string;
  name: string;
  /** The "How Google sees it" one-liner. */
  googleSees: string;
  checks: AuditCheck[];
  evidence?: AuditImage[];
}

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
    /** One line under the H1. */
    verdict: string;
    lead: string;
    /** "" until recorded: renders nothing rather than an empty frame. */
    loomId: string;
    pdfHref: string;
    pdfLabel: string;
    callCta: { label: string; href: string };
  };

  /** Heading and method only: the number itself is computed, never typed. */
  score: { heading: string; method: string };

  keyFixes: {
    heading: string;
    /** Exactly 3. `segmentId` must match a segment's `id`; checked by `assertAudit`. */
    items: { title: string; body: string; effort: string; segmentId: string }[];
  };

  segments: AuditSegment[];

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
