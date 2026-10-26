/**
 * Private sales proposals (`/proposal/[slug]`). One content file per prospect,
 * listed in `./index.ts`; nothing client-specific lives in a component.
 *
 * Two shapes share the route:
 *   - `ProposalPage`: a build proposal (Pulse). Shape fixed by
 *     Docs/Proposal_Page_Handoff.md §4.
 *   - `AuditProposalPage` (`kind: "audit"`): a review of the prospect's
 *     current site followed by an offer, laid out as one reading
 *     column (Woodstone 024). Its template words travel in `labels`, because
 *     the page can be in the client's language rather than English.
 */

export type Severity = "critical" | "high" | "medium";

export interface ProposalImage { src: string; alt: string; caption: string; width: number; height: number }

export interface ProposalPage {
  kind?: "build";
  slug: string;
  client: string;                 // "Pulse Electrical & Pulse Catering"
  contact: string;                // "Mike"
  date: string;
  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    heading: string;
    lead: string[];
    primaryCta: { label: string; href: string };    // in-page anchor
    secondaryCta: { label: string; href: string };
  };

  summary: { heading: string; cards: { title: string; body: string }[] };   // 3 cards

  findings: {
    heading: string;
    intro: string;
    items: {
      id: string;
      title: string;
      severity: Severity;
      site: string;               // "Pulse Electrical" | "Pulse Catering" | "Both"
      points: string[];
      evidence?: ProposalImage[];
    }[];
    working: { heading: string; items: string[]; closing: string };
  };

  plan: {
    heading: string;
    intro: string;
    sites: {
      name: string;
      domain: string;             // display only, never linked
      note?: string;
      pages: { name: string; detail?: string }[];
    }[];
    builtIn: { heading: string; items: string[] };
  };

  handover: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
    closing: string;
  };

  gbp: { heading: string; intro: string; items: string[] };

  investment: {
    heading: string;
    builds: { name: string; wasPrice: string; price: string }[];
    total: { label: string; wasPrice: string; price: string; saving: string };
    includes: string;
    delivery: string;
    paymentOptions: { name: string; detail: string; schedule: string[] }[];
    care: { name: string; price: string; priceNote: string; items: string[]; note: string };
  };

  timeline: { heading: string; rows: { when: string; what: string }[] };

  close: {
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    signoff: string;
  };
}

/**
 * Body copy as it is written: a string is a paragraph, an array is a bulleted
 * list. Lets a finding say "three addresses:" and then list them, without a
 * field per shape.
 */
export type Prose = (string | string[])[];

export interface AuditProposalFinding {
  /** Anchor. */
  id: string;
  /** "Nalaz 1". */
  number: string;
  title: string;
  severity: Severity;
  /** The area it belongs to, e.g. "Konverzija". */
  tag: string;
  seen: Prose;
  why: Prose;
  proposal: Prose;
  /** Annotated screenshots, shown after "what we saw". */
  evidence?: ProposalImage[];
}

export interface AuditProposalPage {
  kind: "audit";
  slug: string;
  client: string;
  /** BCP 47 tag for everything the page says, e.g. "sr-Latn". */
  lang: string;
  meta: { title: string; description: string; ogTitle: string; ogLocale: string };

  /** The template's own words, in the page's language. */
  labels: {
    jump: string;
    severity: Record<Severity, string>;
    seen: string;
    why: string;
    proposal: string;
    duration: string;
    price: string;
    mobileBar: string;
    /** Shown in place of an image the owner has not supplied yet. */
    missingImage: string;
  };

  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    /** "Pripremljeno za" / "Woodstone 024, Subotica", and so on. */
    meta: { label: string; value: string }[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };

  /** `points` are what is missing (crosses), `fixes` what changes (ticks). */
  summary: { id: string; heading: string; body: string[]; points: string[]; fixes: string[] };
  stats: { id: string; heading: string; items: { value: string; label: string }[] };
  findings: { id: string; heading: string; intro: string; items: AuditProposalFinding[] };

  mockup: {
    id: string;
    heading: string;
    body: string;
    /** null until the owner supplies the client's mockup. */
    image: ProposalImage | null;
    points: { lead: string; text: string }[];
  };

  /** One priced offer: what it is, how long, how much, and what it covers. */
  offer: {
    id: string;
    heading: string;
    intro: string;
    name: string;
    duration: string;
    price: string;
    items: string[];
    /** Terms under the offer: tax, payment, what the price leaves out, validity. */
    notes: string[];
  };

  timeline: { id: string; heading: string; rows: { what: string; detail?: string; when: string }[] };
  needs: { id: string; heading: string; items: string[] };
  faq: { id: string; heading: string; items: { q: string; a: string }[] };

  close: {
    id: string;
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    signature: string[];
  };
}

export type AnyProposal = ProposalPage | AuditProposalPage;
