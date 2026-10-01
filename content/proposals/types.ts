/**
 * Private sales proposals (`/proposal/[slug]`). One content file per prospect,
 * listed in `./index.ts`; nothing client-specific lives in a component.
 * Shape fixed by Docs/Proposal_Page_Handoff.md §4.
 */

export type Severity = "critical" | "high" | "medium";

export interface ProposalImage { src: string; alt: string; caption: string; width: number; height: number }

export interface ProposalPage {
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
