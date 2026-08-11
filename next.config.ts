import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next build` and `next dev` both write to .next by default, so a build run
  // while the dev server is up overwrites the chunks it is serving and the dev
  // server 500s until it's restarted. Set NEXT_DIST_DIR (e.g. .next-verify) to
  // send a throwaway build somewhere else. Normal builds and deploys are
  // unaffected: unset, this stays .next.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // 301s preserving URL equity from the legacy Wix site (CLAUDE.md §8).
  // The three service orphans point at /services until the dedicated
  // /services/[slug] pages exist; /contact-us stays unmapped until a contact
  // target ships.
  async redirects() {
    return [
      { source: "/webdesign", destination: "/services", permanent: true },
      { source: "/marketing", destination: "/services", permanent: true },
      { source: "/branding", destination: "/services", permanent: true },
      {
        source: "/discovery-call",
        destination: "/book-a-call",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
