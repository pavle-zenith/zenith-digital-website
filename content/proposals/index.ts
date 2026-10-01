import type { ProposalPage } from "./types";
import { pulse } from "./pulse";

/**
 * Every private proposal page. Adding one is a new content file plus one line
 * here: the route's `generateStaticParams` reads this list, so a page exists
 * by being in it and unknown slugs 404 rather than rendering an empty shell.
 *
 * Deliberately NOT in `app/sitemap.ts`. These are private documents.
 */
export const proposals: ProposalPage[] = [pulse];

export function getProposal(slug: string): ProposalPage | undefined {
  return proposals.find((p) => p.slug === slug);
}

export type { ProposalPage } from "./types";
