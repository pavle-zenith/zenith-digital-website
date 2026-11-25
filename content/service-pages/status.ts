import { customWebsiteDevelopment } from "./custom-website-development";

/**
 * The custom website development page's switch, for everything outside the
 * page that points at it: the services menu, the /services hub entry, the
 * case studies' tech lists, the Wix Studio vs Next.js comparison's related
 * cards and /llms.txt. Each reads this, so flipping `publish` in
 * custom-website-development.ts turns them all on at once and nothing links
 * to the page before then. (PREVIEW_UNPUBLISHED routes the page for review
 * but deliberately doesn't change this: a preview shows the site as it is.)
 */
export const customWebsitesLive = customWebsiteDevelopment.publish;

export const customWebsitesPath = `/services/${customWebsiteDevelopment.slug}`;
