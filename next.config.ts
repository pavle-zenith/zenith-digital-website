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
