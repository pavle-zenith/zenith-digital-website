/**
 * Platform marks in /public/platforms, keyed like `RivalKey` plus "wix".
 * Next.js and Shopify are the Simple Icons marks (CC0 path data), added
 * 20 Nov 2026 for the /compare hub's platform table.
 */
export const platformLogo: Record<string, string> = {
  wix: "/platforms/wix.svg",
  nextjs: "/platforms/nextjs.svg",
  shopify: "/platforms/shopify.svg",
  wordpress: "/platforms/wordpress.svg",
  webflow: "/platforms/webflow.svg",
  framer: "/platforms/framer.webp",
  squarespace: "/platforms/squarespace.svg",
};

/**
 * A platform as a cover tile (resources covers brief, 24 Nov 2026): the one
 * place a platform key becomes a mark. Comparisons pass `rival.key`; migration
 * guides pass `guidePlatform[slug]`. Platforms with no mark of their own get
 * the nearest real one plus a caption, never a downloaded third-party logo:
 * Wix Classic and Wix Harmony the Wix mark with their name under it (so a
 * Classic to Studio pair reads as two products), HTML a code icon, AI
 * builders a sparkle. Wix Studio uses the official mark already in the repo.
 */
export type PlatformTile = {
  name: string;
  logo?: string;
  /** A FeatureIcon name, where there's no mark. */
  icon?: string;
  /** A word under the mark: "Classic", "Harmony", "HTML". */
  caption?: string;
  /** A wide wordmark: sized by width, not height. */
  wide?: boolean;
  /** A solid, heavy mark (Webflow's W): set a little smaller, so it carries
   * the same visual weight as an outline logo beside it. */
  dense?: boolean;
  /** Already a white mark: shown as is. Every other mark is filled white
   * on the dark cover. */
  white?: boolean;
};

const TILES: Record<string, PlatformTile> = {
  "wix-studio": { name: "Wix Studio", logo: "/logos-white/wix-studio.png", wide: true, white: true },
  "wix-classic": { name: "Wix Classic", logo: platformLogo.wix, caption: "Classic" },
  "wix-harmony": { name: "Wix Harmony", logo: platformLogo.wix, caption: "Harmony" },
  wordpress: { name: "WordPress", logo: platformLogo.wordpress },
  webflow: { name: "Webflow", logo: platformLogo.webflow, dense: true },
  shopify: { name: "Shopify", logo: platformLogo.shopify },
  squarespace: { name: "Squarespace", logo: platformLogo.squarespace },
  framer: { name: "Framer", logo: platformLogo.framer },
  nextjs: { name: "Next.js", logo: platformLogo.nextjs },
  html: { name: "HTML", icon: "braces", caption: "HTML" },
  "ai-builders": { name: "AI builders", icon: "sparkles", caption: "AI builder" },
};

export function platformTile(key: string): PlatformTile {
  return TILES[key] ?? { name: key, icon: "layout-grid", caption: key };
}

/** The platform each migration guide moves off, by guide slug. */
export const guidePlatform: Record<string, string> = {
  "wix-classic-to-wix-studio": "wix-classic",
  "wix-harmony-to-wix-studio": "wix-harmony",
  "wordpress-to-wix-studio": "wordpress",
  "webflow-to-wix-studio": "webflow",
  "squarespace-to-wix-studio": "squarespace",
  "framer-to-wix-studio": "framer",
  "html-to-wix-studio": "html",
  "ai-website-builder-to-wix-studio": "ai-builders",
};
