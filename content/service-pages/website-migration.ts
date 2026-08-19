import type { CtaLink } from "@/lib/types";
import type { ServicePageContent } from "./types";

/**
 * /services/website-migration
 * Targets: migrate to wix studio · wordpress to wix migration · wix studio
 * migration · migrate website without losing seo.
 *
 * THIS PAGE IS THE HUB. The platform blocks in `unique` are its spokes: each
 * one that carries an `href` links to a full migration guide under
 * content/migration-guides. The hub owns the category term ("website
 * migration", "migrate to wix studio") and the spokes own their platform
 * terms, so the two don't compete for the same query. That's why the meta
 * title here is no longer WordPress-led: it was competing with its own child.
 *
 * Platforms are ordered by proof. Wix Classic and Squarespace lead because we
 * have client evidence on both; Framer trails because it has neither a guide
 * nor a case. Figures are Bel'Istria's real ones: 35+ pages, 257% YoY
 * impressions.
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
    title: "Website Migration to Wix Studio | Zenith Digital",
    description:
      "Migrate to Wix Studio from Wix Classic, Squarespace, WordPress, Webflow, Framer, or Harmony. Full URL inventory, 1:1 redirect map, and zero ranking loss in writing. From €1,750.",
  },

  hero: {
    name: "Website migration",
    h1: "Move to Wix Studio and keep your rankings",
    subhead:
      "Full-service migration from Wix Classic, Squarespace, WordPress, and more. Every URL mapped, every ranking protected, in writing.",
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
        anim: "upkeep",
        card: {
          label: "Upkeep",
          value: "Ongoing",
          valueNote: "A budget line, not a growth line",
          rows: [
            { text: "Plugin updates and security patches", state: "bad" },
            { text: "Theme breaks when PHP moves", state: "bad" },
            {
              text: "A developer on retainer to keep it standing",
              state: "warn",
            },
          ],
        },
      },
      {
        title: "The platform bill keeps climbing",
        body: "Hosting, the page builder licence, the forms add-on, the SEO plugin, the backup service. Stack the annual renewals together and the number gets uncomfortable to defend.",
        anim: "stack-cost",
        card: {
          label: "Annual stack cost",
          value: "Rising",
          valueNote: "Uncomfortable to defend",
          rows: [
            { text: "Hosting plus the page builder licence", state: "warn" },
            { text: "Forms, SEO, and backup add-ons on top", state: "warn" },
            { text: "Renewals stack up every year", state: "bad" },
          ],
        },
      },
      {
        title: "Nobody in-house can change anything",
        body: "Marketing wants to publish a page and has to file a request. Every small edit queues behind a developer, so the site drifts out of date while everyone waits.",
        anim: "edit-queue",
        card: {
          label: "Time to publish a page",
          value: "Queued",
          valueNote: "Behind a developer, every time",
          rows: [
            { text: "Marketing files a request to make an edit", state: "bad" },
            {
              text: "The site drifts out of date while everyone waits",
              state: "bad",
            },
            { text: "The content itself is ready to go", state: "good" },
          ],
        },
      },
    ],
  },
  stakes: {
    heading: "What waiting costs",
    intro:
      "Staying on the old platform feels like the safe option. Run the numbers on it.",
    items: [
      {
        icon: "card",
        title: "The bill that renews either way",
        body: "The maintenance retainer, the plugin renewals, the hosting: they invoice whether you move or not. A year of waiting costs roughly a migration, except at the end of it you still own the problem.",
      },
      {
        icon: "chart",
        title: "Rankings erode in place",
        body: "The rankings you're afraid of losing in a move are already at risk where they are. Slow pages and stale content slide without anyone touching them. Staying put isn't the safe option, it's the slow version of the same loss.",
      },
      {
        icon: "redirect",
        title: "The pages that never ship",
        body: "Every page marketing didn't publish while waiting on a developer is a search term you don't rank for and a campaign that ran without its landing page. That backlog is invisible on any invoice, and it's the expensive part.",
      },
    ],
  },

  outcomes: {
    heading: "What life looks like on the other side",
    intro:
      "Migrations are judged on what didn't break. These are the things that actually improve.",
    items: [
      {
        title: "The maintenance bill stops",
        body: "No plugin renewals, no security patching, no developer on standby for the update that breaks the layout. The platform handles its own upkeep, and that line comes off your budget permanently.",
        image: "/portfolio/knode.jpg",
        imageAlt: "The Knode AI site",
      },
      {
        title: "Your rankings arrive with you",
        body: "Traffic continues the week after launch rather than recovering for three months. Everything you spent years earning in search is mapped across before cutover, which is most of what you're paying for.",
        image: "/portfolio/scottishluxury.jpg",
        imageAlt: "The Scottish Luxury Experience site",
      },
      {
        title: "Marketing stops queueing",
        body: "A page goes live the day someone decides it should, by the person who wrote it. The backlog of things nobody bothered requesting because it wasn't worth the wait quietly disappears.",
        image: "/services/landing-pages.webp",
        imageAlt: "A campaign page built around a single action",
      },
      {
        title: "One less thing that can break at 2am",
        body: "Hosting, uptime, security, and updates become someone else's job. Not a smaller version of the problem, an entire category of Saturday-morning emergency you no longer have.",
        image: "/portfolio/fortlauderdale.jpg",
        imageAlt: "The FoxStays dock rental site",
      },
    ],
  },

  included: {
    heading: "What a migration covers",
    intro:
      "The build is the easy half. Most of this list exists to protect the search visibility you already paid for.",
    items: [
      {
        icon: "clipboard",
        title: "Pre-migration SEO audit and URL inventory",
        group: "Before the move",
        body: "Before anything is designed, we crawl the current site and export every live URL with its traffic, rankings, and inbound links. That inventory is the contract the rest of the project is checked against.",
      },
      {
        icon: "redirect",
        title: "1:1 redirect map",
        group: "Before the move",
        body: "Every old address gets a permanent redirect to its new equivalent. Not a blanket rule pointing everything at the homepage, which is the single most common way migrations lose rankings.",
      },
      {
        icon: "transfer",
        title: "Content and CMS migration",
        group: "The move itself",
        body: "Pages, posts, categories, tags, images, and CMS collections moved across with structure intact, so a blog with four years of archive arrives as a blog rather than a folder of loose pages.",
      },
      {
        icon: "tags",
        title: "Metadata and schema parity",
        group: "The move itself",
        body: "Titles, descriptions, canonical tags, Open Graph data, and structured data carried over field by field, then diffed against the old site before launch.",
      },
      {
        icon: "palette",
        title: "Design refresh in Wix Studio",
        group: "The move itself",
        body: "Most clients take the opportunity to rebuild the front end rather than clone a dated design. The rebuild happens inside the migration, not as a second project afterwards.",
      },
      {
        icon: "gauge",
        title: "Speed pass",
        group: "After the move",
        body: "Image formats, loading order, and Core Web Vitals checked on the new build. A faster site after the move is part of the argument for making it.",
      },
      {
        icon: "radar",
        title: "Post-launch index monitoring",
        group: "After the move",
        body: "We watch Search Console for 30 days after cutover: coverage, impressions, and any URL that 404s or drops out. Anything that moves gets fixed while we're still on it.",
      },
    ],
  },

  process: {
    heading: "How a migration runs",
    intro:
      "Five stages with real durations. Your existing site stays live and serving traffic through every one of them.",
    // Bel'Istria after the move: this page's own proof case, 35+ pages off
    // Wix Classic with impressions up rather than down.
    image: "/portfolio/belistria.jpg",
    imageAlt: "The Bel'Istria site after its migration to Wix Studio",
    cta: { label: "Book a call", href: "/book-a-call", variant: "primary" },
    steps: [
      {
        title: "Audit and URL inventory",
        focus: ["Full crawl", "URL inventory", "Ranking baseline"],
        duration: "2 to 3 days",
        body: "Full crawl, export of every indexed URL, and a ranking baseline captured before a single thing changes. Without the baseline there's no way to prove what happened.",
      },
      {
        title: "Redirect and SEO plan",
        focus: ["1:1 redirect map", "Backlinked URLs", "The awkward cases"],
        duration: "2 to 3 days",
        body: "The 1:1 map gets written and reviewed, including the awkward cases: retired pages, duplicate URLs, parameter strings, and anything with backlinks pointing at it.",
      },
      {
        title: "Build and migrate",
        focus: ["Wix Studio build", "Content transfer", "Staging review"],
        duration: "1 to 2 weeks",
        body: "The new site gets built in Wix Studio on a staging URL and content moves across. You review a working site, not a slide of screenshots.",
      },
      {
        title: "Launch and validation",
        focus: ["Controlled cutover", "Redirects tested", "Search Console"],
        duration: "2 days",
        body: "One controlled cutover. Redirects tested line by line against the inventory, sitemap resubmitted, Search Console and analytics reconnected the same day.",
      },
      {
        title: "Index monitoring",
        focus: ["Coverage watch", "Impressions", "Fixes included"],
        duration: "30 days",
        body: "Coverage and impressions watched daily at first, then weekly. If a URL misbehaves we fix it inside this window at no extra cost.",
      },
    ],
  },

  // Case-study rows: four per page, each with real stats and a distinct
  // client voice (see the wix-studio page's note). Fort Lauderdale returns
  // once it has a detail page with real results and a quote.
  workSlugs: [
    "belistria",
    "scottish-luxury-experience",
    "just-stay",
    "genroks-ai",
  ],

  pricing: {
    heading: "What a migration costs",
    from: "From €1,750",
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
    cta: {
      label: "Plan your migration",
      href: "/book-a-call",
      variant: "primary",
    },
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
      "Every platform has its own reasons people leave and its own migration traps. Pick yours for the full breakdown of what carries across.",
    items: [
      {
        name: "Wix Classic",
        logo: "/platforms/wix.svg",
        href: "/services/wix-classic-to-wix-studio",
        desc: "Wix can't convert a Classic site to Studio, so see exactly what carries across and what gets rebuilt.",
      },
      {
        name: "Squarespace",
        logo: "/platforms/squarespace.svg",
        href: "/services/squarespace-to-wix-studio",
        desc: "What Squarespace's export actually contains, why every blog URL changes, and what the move costs.",
      },
      {
        name: "Wix Harmony",
        logo: "/platforms/wix.svg",
        href: "/services/wix-harmony-to-wix-studio",
        desc: "Harmony has no CMS and can't be transferred to Studio, so here's how the rebuild works.",
      },
      {
        name: "WordPress",
        logo: "/platforms/wordpress.svg",
        desc: "Leave the plugin updates, security patching, and hosting behind without losing a ranking.",
      },
      {
        name: "Webflow",
        logo: "/platforms/webflow.svg",
        desc: "Keep the design quality and hand editing back to the people who write the content.",
      },
      {
        name: "Framer",
        logo: "/platforms/framer.webp",
        desc: "Move onto a real CMS, so publishing the twentieth page costs what the second one did.",
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
      "Full-service website migration to Wix Studio from Wix Classic, Squarespace, WordPress, Webflow, Framer, or Wix Harmony. SEO audit and URL inventory, 1:1 redirect mapping, content and CMS migration, metadata parity, and 30 days of post-launch index monitoring.",
    priceFrom: "1750",
  },
};
