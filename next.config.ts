import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
