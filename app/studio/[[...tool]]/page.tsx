import type { Metadata, Viewport } from "next";
import { NextStudio, viewport as studioViewport } from "next-sanity/studio";

import config from "@/sanity.config";

/**
 * The embedded Sanity Studio (CLAUDE.md §4). The catch-all segment lets the
 * Studio own its own routing beneath /studio.
 *
 * NOINDEX, NOFOLLOW is not optional here: the Studio is a working surface for
 * the site's content, and an indexed /studio would put an editing tool in the
 * search results next to the pages it edits. It is kept out of sitemap.ts for
 * the same reason.
 */
export const metadata: Metadata = {
  title: "Studio | Zenith Digital",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: undefined },
};

// next-sanity types `viewportFit` as a plain string; Next wants the union.
export const viewport: Viewport = studioViewport as Viewport;

/** The Studio bundle is large and entirely client-side; never prerender it. */
export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
