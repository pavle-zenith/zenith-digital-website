import { caseStudyCards } from "./case-studies";
import { pProjects } from "./partnerships";

/**
 * Website shots for the project slider under the service pages' hero (owner,
 * 25 Nov 2026): every new 2x2 case-study thumbnail from /case-studies (the
 * `/case-studies/<slug>/card.webp` files, all 4:3 like the slider), plus the
 * original slider set from /portfolio-slider. A project in both keeps its new
 * card. Order here doesn't matter: the slider mixes it (ProjectsSlider).
 *
 * New case studies join automatically once their card is processed into
 * /case-studies/<slug>/card.webp.
 */
const key = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

const cards = caseStudyCards
  .filter((c) => c.thumb?.startsWith("/case-studies/"))
  .map((c) => ({ name: c.client, image: c.thumb as string }));

const taken = new Set(cards.map((c) => key(c.name)));

export const projectShots: { name: string; image: string }[] = [
  ...cards,
  ...pProjects.items.filter((p) => !taken.has(key(p.name))),
];
