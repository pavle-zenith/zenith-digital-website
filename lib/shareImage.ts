import fs from "node:fs";
import path from "node:path";

/**
 * The site's default share image, for pages that set their own `openGraph` /
 * `twitter` metadata. A page-level `openGraph` object replaces the layout's
 * whole object, and the root's file-based opengraph-image.jpg goes with it, so
 * a page that only wants its own title has to restate the image. Same files,
 * same alt text as app/opengraph-image.* and app/twitter-image.*.
 */
const base = { width: 1200, height: 630, type: "image/jpeg", alt: readAlt() };

export const defaultShareImages = {
  openGraph: [{ url: "/opengraph-image.jpg", ...base }],
  twitter: [{ url: "/twitter-image.jpg", ...base }],
};

function readAlt(): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), "app/opengraph-image.alt.txt"), "utf8").trim();
  } catch {
    return "Zenith Digital";
  }
}
