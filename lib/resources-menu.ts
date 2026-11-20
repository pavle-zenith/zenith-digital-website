import { blogCover } from "@/content/blog-covers";
import { compareMenu, type CompareMenu } from "@/content/comparisons";
import { resourcesMenu } from "@/content/home";
import { POST_TAG, sanityClient } from "@/sanity/lib/client";
import { latestPostQuery } from "@/sanity/lib/queries";

export type ResourcesMenu = {
  /** "Compare platforms" column; null until the /compare hub has a route. */
  compare: CompareMenu | null;
  /** The newest live post; null if there isn't one or Sanity is unreachable. */
  featured: {
    label: string;
    title: string;
    href: string;
    image: string | null;
    /** CSS aspect-ratio of the image, so the menu shows it whole. */
    aspect: string;
    cta: string;
  } | null;
};

/**
 * The newest live post for the menu's featured card.
 *
 * Deliberately NOT sanityFetch: that carries a one-hour revalidate, and this
 * runs in the site layout, so it would put every page on the site on an
 * hourly regenerate where most are fully static. Instead it carries only the
 * post tag: pages stay static, and the publish webhook (which revalidates
 * that tag) refreshes the card the moment a new post goes live.
 *
 * Never throws: the layout wraps every page, so an unreachable Sanity must
 * not fail a build. The card is simply left out until the next build or
 * revalidation.
 */
async function latestPost(): Promise<{ title: string; slug: string } | null> {
  try {
    return await sanityClient.fetch<{ title: string; slug: string } | null>(
      latestPostQuery,
      {},
      { next: { tags: [POST_TAG] } },
    );
  } catch (error) {
    console.error(
      "[sanity] latest post for the Resources menu failed, continuing without it:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

/**
 * The Resources menu's server-side parts, resolved in the site layout and
 * passed to the client Nav, like the Industries menu.
 */
export async function getResourcesMenu(): Promise<ResourcesMenu> {
  const post = await latestPost();
  return {
    compare: compareMenu(),
    featured: post
      ? {
          label: resourcesMenu.featured.label,
          cta: resourcesMenu.featured.cta,
          title: post.title,
          href: `/blog/${post.slug}`,
          image: blogCover(post.slug),
          // Blog covers are 1920x1200.
          aspect: "16 / 10",
        }
      : null,
  };
}
