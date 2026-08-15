import type { CtaLink } from "@/lib/types";
import { quoteOf } from "../testimonials-data";
import type { ServicePageContent } from "./types";

/**
 * /services/website-migration
 * Targets: migrate to wix studio · wordpress to wix migration · wix studio
 * migration · migrate website without losing seo.
 *
 * The platform blocks in `unique` are the long-tail net ("migrate wordpress to
 * wix studio" and siblings). Figures are Bel'Istria's real ones: 35+ pages,
 * 257% YoY impressions.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const websiteMigration: ServicePageContent = {
  slug: "website-migration",
  publish: true,
  seo: {
    title:
      "Website migration to Wix Studio with zero ranking loss | Zenith Digital",
    description:
      "Migrate from WordPress, Squarespace, Webflow, or Framer to Wix Studio. Full URL inventory, 1:1 redirect map, and zero ranking loss in writing. From €2,500.",
  },

  hero: {
    name: "Website migration",
    h1: "Move to Wix Studio without losing a single ranking",
    subhead:
      "Full-service migration from WordPress, Squarespace, Webflow, or Framer. Every URL mapped, every ranking protected, in writing.",
    chips: [
      "Zero ranking loss, in writing",
      "35+ pages migrated for Bel'Istria",
      "257% YoY impressions after migration",
    ],
    ctas,
  },

  whoFor: {
    heading: "When a migration is the right call",
    intro:
      "Nobody moves platforms for fun. These are the three reasons clients actually give us.",
    items: [
      {
        title: "Maintenance has become someone's job",
        body: "Plugin updates, security patches, a theme that breaks when PHP moves, and a developer on retainer to keep it all standing. The site isn't growing the business, it's consuming a budget line.",
      },
      {
        title: "The platform bill keeps climbing",
        body: "Hosting, the page builder licence, the forms add-on, the SEO plugin, the backup service. Stack the annual renewals together and the number gets uncomfortable to defend.",
      },
      {
        title: "Nobody in-house can change anything",
        body: "Marketing wants to publish a page and has to file a request. Every small edit queues behind a developer, so the site drifts out of date while everyone waits.",
      },
    ],
  },

  included: {
    heading: "What a migration covers",
    intro:
      "The build is the easy half. Most of this list exists to protect the search visibility you already paid for.",
    items: [
      {
        title: "Pre-migration SEO audit and URL inventory",
        body: "Before anything is designed, we crawl the current site and export every live URL with its traffic, rankings, and inbound links. That inventory is the contract the rest of the project is checked against.",
      },
      {
        title: "1:1 redirect map",
        body: "Every old address gets a permanent redirect to its new equivalent. Not a blanket rule pointing everything at the homepage, which is the single most common way migrations lose rankings.",
      },
      {
        title: "Content and CMS migration",
        body: "Pages, posts, categories, tags, images, and CMS collections moved across with structure intact, so a blog with four years of archive arrives as a blog rather than a folder of loose pages.",
      },
      {
        title: "Metadata and schema parity",
        body: "Titles, descriptions, canonical tags, Open Graph data, and structured data carried over field by field, then diffed against the old site before launch.",
      },
      {
        title: "Design refresh in Wix Studio",
        body: "Most clients take the opportunity to rebuild the front end rather than clone a dated design. The rebuild happens inside the migration, not as a second project afterwards.",
      },
      {
        title: "Speed pass",
        body: "Image formats, loading order, and Core Web Vitals checked on the new build. A faster site after the move is part of the argument for making it.",
      },
      {
        title: "Post-launch index monitoring",
        body: "We watch Search Console for 30 days after cutover: coverage, impressions, and any URL that 404s or drops out. Anything that moves gets fixed while we're still on it.",
      },
    ],
  },

  process: {
    heading: "How a migration runs",
    intro:
      "Five stages with real durations. Your existing site stays live and serving traffic through every one of them.",
    steps: [
      {
        title: "Audit and URL inventory",
        duration: "2 to 3 days",
        body: "Full crawl, export of every indexed URL, and a ranking baseline captured before a single thing changes. Without the baseline there's no way to prove what happened.",
      },
      {
        title: "Redirect and SEO plan",
        duration: "2 to 3 days",
        body: "The 1:1 map gets written and reviewed, including the awkward cases: retired pages, duplicate URLs, parameter strings, and anything with backlinks pointing at it.",
      },
      {
        title: "Build and migrate",
        duration: "1 to 2 weeks",
        body: "The new site gets built in Wix Studio on a staging URL and content moves across. You review a working site, not a slide of screenshots.",
      },
      {
        title: "Launch and validation",
        duration: "2 days",
        body: "One controlled cutover. Redirects tested line by line against the inventory, sitemap resubmitted, Search Console and analytics reconnected the same day.",
      },
      {
        title: "Index monitoring",
        duration: "30 days",
        body: "Coverage and impressions watched daily at first, then weekly. If a URL misbehaves we fix it inside this window at no extra cost.",
      },
    ],
  },

  proof: {
    heading: "A migration that grew after the move",
    intro:
      "Bel'Istria moved 35 pages and came out the other side with more visibility than it went in with.",
    caseSlugs: ["belistria", "fort-lauderdale-dock-rentals"],
    testimonial: quoteOf("ivan-belobrajdic"),
  },

  pricing: {
    heading: "What a migration costs",
    from: "From €2,500",
    fromNote: "fixed, one-time",
    note: "Priced as one project covering the audit, the redirect work, the rebuild, and the monitoring window. You get the number before we touch anything.",
    drivers: [
      {
        title: "Page count",
        body: "A thirty-page site takes longer to inventory, map, and validate than a ten-page one. This is the main thing that moves a migration quote.",
      },
      {
        title: "CMS collections",
        body: "A blog archive, a property list, or a product catalogue each need their structure rebuilt and their URLs preserved. More collections, more mapping.",
      },
      {
        title: "Languages",
        body: "Multilingual sites multiply the URL set and the redirect map. Stilby went live in three languages, and that shape of project is scoped accordingly.",
      },
    ],
    cta: { label: "Plan your migration", href: "/book-a-call", variant: "primary" },
    ctaSecondary: {
      label: "See all pricing",
      href: "/#pricing",
      variant: "secondary",
    },
  },

  unique: {
    kind: "platforms",
    heading: "Moving from your platform",
    intro:
      "Each platform has its own reasons people leave and its own migration traps. Here's what the move looks like from where you are.",
    items: [
      {
        name: "WordPress to Wix Studio",
        pains: "Plugin sprawl, update anxiety, and a security surface that grows every time you add functionality. Most WordPress sites we take over are running fifteen or more plugins that nobody can safely remove.",
        carries:
          "Posts, pages, categories, tags, authors, and media come across with permalinks preserved. Yoast or Rank Math metadata maps field by field onto Wix Studio's SEO panel.",
      },
      {
        name: "Squarespace to Wix Studio",
        pains: "Design control runs out exactly when the business starts needing something specific, and the template you picked at launch quietly caps what the site can become.",
        carries:
          "Pages, blog collections, and product data transfer, and Squarespace's tidy URL structure maps across cleanly. Expect a genuine design upgrade rather than a like-for-like copy.",
      },
      {
        name: "Webflow to Wix Studio",
        pains: "The build is fine, the problem is who can touch it. Editing means understanding the class system, so the marketing team stays dependent on whoever built it.",
        carries:
          "CMS collections rebuild one to one, and the design intent survives the move because Wix Studio's layout engine works on the same responsive principles.",
      },
      {
        name: "Framer to Wix Studio",
        pains: "Fast to launch, then awkward to scale. Content grows past what the original page structure was designed to hold and there's no real CMS underneath it.",
        carries:
          "Pages and content move across into a proper collection structure, so publishing the twentieth page is the same effort as publishing the second.",
      },
    ],
  },

  faq: {
    heading: ["Migration questions,", "answered honestly"],
    subhead: "Including the one everybody is actually worried about.",
    ctas,
    items: [
      {
        q: "Will I lose my Google rankings?",
        a: "Not if the redirect work is done properly, and that's most of what you're paying for. We inventory every live URL, map each one to its new address with a permanent redirect, carry the metadata across, and watch Search Console for 30 days after cutover. Bel'Istria moved 35 pages and impressions grew 257% year on year afterwards.",
      },
      {
        q: "How long does a migration take?",
        a: "Two to four weeks of active work for most sites, then a 30-day monitoring window that runs after you're already live. Larger archives and multilingual sites sit at the top of that range.",
      },
      {
        q: "What happens to my blog posts and URLs?",
        a: "Posts move with their structure intact, and existing URLs are preserved wherever the old address is sane. Where a URL has to change, the old one permanently redirects to the new one, so links and rankings follow it across.",
      },
      {
        q: "Can you migrate my e-commerce products?",
        a: "Yes. Products, variants, categories, and images transfer into Wix Studio's store, and product URLs get the same 1:1 redirect treatment as everything else. Payment and shipping configuration is set up and tested before cutover, not after.",
      },
      {
        q: "Why leave WordPress for Wix Studio?",
        a: "Because the total cost of WordPress is rarely the licence. It's the plugin renewals, the maintenance retainer, the security patching, and the developer you call when an update breaks the layout. Wix Studio removes that whole category of work and hands editing back to your team.",
      },
      {
        q: "What does zero ranking loss in writing actually mean?",
        a: "It means the ranking baseline goes in the scope document before we start, and the redirect map is validated against the URL inventory before cutover. If something drops because of the migration, fixing it is our job inside the monitoring window, not a change request.",
      },
    ],
  },

  related: {
    heading: "Related services",
    items: [
      {
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        image: "/services/web-design.webp",
        desc: "No existing site worth carrying over? Start from a blank canvas instead.",
      },
      {
        label: "SEO, AEO & PPC",
        href: "/services/seo-aeo-ppc",
        image: "/services/seo-aeo.webp",
        desc: "Protecting rankings is the floor. This is the work that grows them afterwards.",
      },
      {
        label: "All services",
        href: "/services",
        desc: "Landing pages, Wix Studio development, and white-label production for agencies.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what your", "migration would involve"],
    paragraph:
      "Send us the current site and we'll tell you how many URLs are in play, what's at risk, and what the move would cost. Free, and useful even if you stay put.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Full-service website migration to Wix Studio from WordPress, Squarespace, Webflow, or Framer. SEO audit and URL inventory, 1:1 redirect mapping, content and CMS migration, metadata parity, and 30 days of post-launch index monitoring.",
    priceFrom: "2500",
  },
};
