import type { AnyProposal } from "./types";
import { pulse } from "./pulse";
import { woodstone024 } from "./woodstone-024";
import { aspireUsa } from "./aspire-usa";
import { saleswings } from "./saleswings";

/**
 * Every private proposal page. Adding one is a new content file plus one line
 * here: the route's `generateStaticParams` reads this list, so a page exists
 * by being in it and unknown slugs 404 rather than rendering an empty shell.
 *
 * Deliberately NOT in `app/sitemap.ts`. These are private documents.
 */
export const proposals: AnyProposal[] = [pulse, woodstone024, aspireUsa, saleswings];

export function getProposal(slug: string): AnyProposal | undefined {
  return proposals.find((p) => p.slug === slug);
}

export type { AnyProposal, AuditProposalPage, ProposalPage } from "./types";
