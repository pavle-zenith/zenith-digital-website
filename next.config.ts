import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next build` and `next dev` both write to .next by default, so a build run
  // while the dev server is up overwrites the chunks it is serving and the dev
  // server 500s until it's restarted. Set NEXT_DIST_DIR (e.g. .next-verify) to
  // send a throwaway build somewhere else. Normal builds and deploys are
  // unaffected: unset, this stays .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Blog post images are served from the Sanity CDN and resized by next/image.
  // Scoped to the project's own asset path so this cannot become an open
  // image proxy for the whole of cdn.sanity.io.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/nfi9edhy/**",
      },
    ],
  },

  /**
   * Client proposal pages under /p/. These are private documents sent as a
   * link, not site pages, and they must stay out of search results.
   *
   * This is one of four independent layers, because any single one can be
   * missed. The other three: a <meta name="robots" content="noindex,nofollow">
   * in the file itself, absence from app/sitemap.ts (which is an explicit
   * allowlist, so a new path cannot leak in by existing), and no internal link
   * to the URL from anywhere on the site.
   *
   * Deliberately NOT a robots.txt Disallow. robots.txt is public, so a rule
   * there advertises the exact path to anyone who reads it, and a URL blocked
   * from crawling can still be indexed from a bare link because the crawler
   * is never allowed to fetch the page and read the noindex tag.
   *
   * The rewrite gives the .html file a clean, extensionless URL.
   */
  async headers() {
    return [
      {
        source: "/p/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/p/:slug",
        destination: "/p/:slug.html",
      },
    ];
  },

  // 301s preserving URL equity from the legacy Wix site (CLAUDE.md §8).
  // The three service orphans now land on their dedicated /services/[slug]
  // pages; /contact-us stays unmapped until a contact target ships.
  // /branding has no page of its own, so it goes to the nearest live target.
  async redirects() {
    return [
      {
        source: "/webdesign",
        destination: "/services/wix-studio-website-design",
        permanent: true,
      },
      {
        source: "/marketing",
        destination: "/services/seo-aeo-ppc",
        permanent: true,
      },
      {
        source: "/branding",
        destination: "/services/wix-studio-website-design",
        permanent: true,
      },
      {
        source: "/discovery-call",
        destination: "/book-a-call",
        permanent: true,
      },
      // /contact-us has no 1:1 target: /book-a-call is the live page that
      // carries the call, the audit offer and every contact method.
      {
        source: "/contact-us",
        destination: "/book-a-call",
        permanent: true,
      },
      // Legacy Wix path for the white-label page, seen in the indexed footprint.
      {
        source: "/white-label-partnerships",
        destination: "/partnerships",
        permanent: true,
      },
      // /embed-test is deliberately NOT redirected. It was a scratch page with
      // no equity, so a 404 is the correct signal to drop it from the index.
    ];
  },
};

export default nextConfig;
