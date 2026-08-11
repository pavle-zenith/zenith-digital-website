import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next build` and `next dev` both write to .next by default, so a build run
  // while the dev server is up overwrites the chunks it is serving and the dev
  // server 500s until it's restarted. Set NEXT_DIST_DIR (e.g. .next-verify) to
  // send a throwaway build somewhere else. Normal builds and deploys are
  // unaffected: unset, this stays .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

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
    ];
  },
};

export default nextConfig;
