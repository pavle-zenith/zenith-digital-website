import type { ChecklistResource } from "./types";

/**
 * Free resource 1: the website migration checklist (drafted 23 Nov 2026).
 * publish: false until the owner reads it and the hub ships.
 *
 * Platform-neutral on purpose: it works for a move to Wix Studio, Shopify or
 * custom code, and the Wix-specific items say so. Every Google or Wix fact
 * links to the vendor's own page (`sources`). Nothing here promises
 * rankings: the checklist guarantees the work, not Google.
 *
 * Downloads live in /public/resources/: a planning sheet with the columns we
 * use on real migrations, and a two-column file in the shape Wix's URL
 * Redirect Manager imports.
 */
export const websiteMigrationChecklist: ChecklistResource = {
  slug: "website-migration-checklist",
  publish: false,
  type: "checklist",
  topics: ["moving", "found"],
  updated: "2026-11-23",

  seo: {
    title: "Website migration checklist and redirect map template | Zenith Digital",
    description:
      "A free website migration checklist: what to list, build, redirect and check before and after launch to keep your URLs and search traffic. With a redirect map template.",
  },

  card: {
    title: "Website migration checklist",
    description:
      "Every step of moving a site without losing your URLs, from the first inventory to 30 days after launch. With a free redirect map template.",
  },

  hero: {
    eyebrow: "Free checklist",
    h1: "The website migration checklist we use on real moves",
    intro:
      "Moving to a new platform or a new design is where most sites lose search traffic, and almost always for the same few reasons. This is the list we work through on every migration, in order, with a redirect map template you can download and use.",
  },

  inShort:
    "A website migration keeps its search traffic when every old URL has a planned destination. List every page before you start, carry titles and content across, map each old URL to its new one with a permanent (301) redirect, then check indexing and 404s in Search Console for at least 30 days after launch. Google says to expect some temporary fluctuation while it recrawls.",

  downloads: [
    {
      label: "Redirect map template",
      href: "/resources/redirect-map-template.csv",
      format: "CSV",
      note: "The planning sheet: old URL, new URL, page type, traffic, status and notes.",
    },
    {
      label: "Wix redirect import file",
      href: "/resources/wix-redirect-import-template.csv",
      format: "CSV",
      note: "Two columns, ready for Wix's URL Redirect Manager (up to 500 rows per file).",
    },
  ],

  phases: [
    {
      id: "inventory",
      title: "List what you have",
      when: "Before any design work",
      items: [
        {
          title: "Export every URL on the current site",
          body: "Pull them from the sitemap, the Pages report in Search Console, your analytics and the CMS. Include blog posts, products, PDFs and images that other sites link to. A page you don't list is a page you can't redirect.",
          source: {
            label: "Google: prepare the URL mapping",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
        {
          title: "Record what each page earns",
          body: "Add clicks and impressions from Search Console for the last 3 to 12 months next to each URL. The pages that bring in visits and enquiries get the most care, and the numbers become your benchmark after launch.",
        },
        {
          title: "Decide keep, merge or remove",
          body: "Every row gets a decision. Kept pages move across, merged pages redirect to the page that absorbs them, and pages you remove on purpose return a 404 or 410 rather than redirecting to the homepage.",
          source: {
            label: "Google: return 404 or 410 for removed content",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
        {
          title: "Verify both sites in Search Console",
          body: "Make sure you own the current property and can verify the new one, including the www and non-www versions. You need access on day one, not a week after launch.",
          source: {
            label: "Google: verify old and new sites",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
        {
          title: "Freeze content changes",
          body: "Agree a date after which nobody edits the old site. Anything published after the inventory has to be added to it by hand, so keep that window short.",
        },
      ],
    },
    {
      id: "build",
      title: "Build the new site to receive the old one",
      when: "During the build",
      items: [
        {
          title: "Keep URLs the same wherever you can",
          body: "A URL that doesn't change needs no redirect. Change a URL only when there's a reason, such as a platform that forces a different structure for blog posts or products.",
        },
        {
          title: "Carry titles, descriptions and headings across",
          body: "Meta titles, meta descriptions and H1s are part of why a page ranks. Move them with the content, then improve them deliberately later rather than by accident now.",
        },
        {
          title: "Point internal links at the new URLs",
          body: "Menus, footers, buttons and links inside blog posts should go straight to the new address, not through a redirect. Give each page a canonical tag that points to itself.",
          source: {
            label: "Google: canonicals and internal links on the new site",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
        {
          title: "Rebuild what Google and AI tools read",
          body: "Structured data, image alt text, the sitemap, robots.txt and any llms.txt file. These are easy to leave behind because nobody sees them on the page.",
        },
        {
          title: "Reconnect everything the site sends or receives",
          body: "Forms and where they deliver, booking and payment tools, analytics, the Meta pixel, Google Business Profile links and email sign-ups. List them before launch and test each one.",
        },
        {
          title: "Hide the new site until launch, then plan when to unhide it",
          body: "A staging site should be password protected or set to noindex. Write down who removes that on launch day, because a forgotten noindex is one of the most common reasons a new site disappears from Google.",
          source: {
            label: "Google: remove migration-only blocks",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
      ],
    },
    {
      id: "redirects",
      title: "Write the redirect map",
      when: "The week before launch",
      items: [
        {
          title: "Give every old URL its closest new page",
          body: "One row per old URL, pointing to the page that answers the same question. Sending everything to the homepage tells Google the old pages are gone.",
          source: {
            label: "Google: redirects and Google Search",
            href: "https://developers.google.com/search/docs/crawling-indexing/301-redirects",
          },
        },
        {
          title: "Use permanent redirects",
          body: "Use a 301 or 308 redirect, set up on the server or platform, not a JavaScript or meta refresh redirect. Google says permanent redirects don't cause a loss in PageRank.",
          source: {
            label: "Google: redirects and Google Search",
            href: "https://developers.google.com/search/docs/crawling-indexing/301-redirects",
          },
        },
        {
          title: "Avoid chains",
          body: "If an old URL already redirects somewhere, point it straight at the final new page. Each extra hop slows visitors down and makes the signal weaker to follow.",
        },
        {
          title: "On Wix, import the map in batches",
          body: "Wix's URL Redirect Manager imports a CSV with two columns, old URL then new URL, up to 500 redirects per file. The site has to be connected to its domain first.",
          source: {
            label: "Wix: importing redirects with a CSV file",
            href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
          },
        },
      ],
    },
    {
      id: "launch",
      title: "Launch day",
      when: "The day the domain points at the new site",
      items: [
        {
          title: "Remove noindex and staging blocks",
          body: "Check the homepage source and robots.txt yourself. Don't take it on trust.",
        },
        {
          title: "Turn the redirects on and test them",
          body: "Open your 20 most visited old URLs in a private window and confirm each lands on the right new page in one hop.",
        },
        {
          title: "Submit the new sitemap",
          body: "Submit it in Search Console and use URL Inspection on your most important pages to request indexing.",
          source: {
            label: "Google: sitemaps and testing during a move",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
        {
          title: "Test every conversion path",
          body: "Send a test enquiry through every form, make a test booking or order, and confirm the analytics events arrive.",
        },
        {
          title: "Changing domain too? Use the Change of Address tool",
          body: "Only when the domain itself changes, for example from oldname.com to newname.com. It isn't used for a new platform on the same domain. Google says to keep the redirects for at least 180 days, and longer if the old URLs still get search traffic.",
          source: {
            label: "Google: Change of Address tool",
            href: "https://support.google.com/webmasters/answer/9370220?hl=en",
          },
        },
      ],
    },
    {
      id: "after",
      title: "The 30 days after launch",
      when: "Weekly for the first month",
      items: [
        {
          title: "Watch the Pages report for 404s",
          body: "Every old URL that shows up as not found is a missing row in the redirect map. Add the redirect and it stops costing you visits.",
        },
        {
          title: "Compare against your benchmark",
          body: "Check clicks and impressions for the pages you recorded in step one. Google says to expect temporary fluctuation during a move, and that it can take a few weeks or more for new URLs to show for a medium-sized site.",
          source: {
            label: "Google: what to expect after a move",
            href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
          },
        },
        {
          title: "Ask your best linking sites to update their links",
          body: "The redirect passes visitors on, but a direct link is cleaner. Start with the sites that send you the most traffic.",
        },
        {
          title: "Leave the redirects in place",
          body: "Don't delete the redirect list once traffic settles. People and other sites keep old links for years.",
        },
      ],
    },
  ],

  handoff: {
    heading: "Started the move yourself and got stuck?",
    paragraph:
      "You don't have to start again. Send us the site and how far you got, and we'll tell you what's left and what it costs to finish, in a free audit.",
    cta: { label: "Get a free audit", href: "/free-website-audit" },
  },

  faq: [
    {
      q: "Will I lose my Google rankings when I migrate my website?",
      a: "Not if every old URL has a planned destination. Rankings drop after a migration mostly because pages vanish without redirects, titles and content change at the same time, or a staging noindex is left on. Google says to expect temporary fluctuation while it recrawls, so judge the move over weeks, not days. Nobody can promise Google's output, but the redirect map and the monitoring are within your control.",
    },
    {
      q: "What is a redirect map in a website migration?",
      a: "A redirect map is a list of every URL on the old site next to the URL it should send visitors and search engines to on the new site. It's the core document of a migration: each row becomes a permanent (301) redirect. Our template adds page type, traffic and status columns so you can see which rows matter most.",
    },
    {
      q: "How long does a website migration take?",
      a: "For a small business site, the build and redirects usually take 2 to 4 weeks, followed by at least 30 days of watching Search Console. Larger sites with stores, blogs or many products take longer. The inventory step at the start is what sets the timeline.",
    },
    {
      q: "Should I use a 301 or 302 redirect when moving a website?",
      a: "Use a 301 (or 308), which tells Google the move is permanent. A 302 says the move is temporary, so Google may keep showing the old URL. Set redirects up on the server or in your platform's redirect manager rather than with JavaScript.",
    },
    {
      q: "How many redirects can I import into Wix at once?",
      a: "Wix's URL Redirect Manager imports up to 500 redirects per CSV file, with two columns: the old URL and the new URL. For larger sites, split the map into several files. The site has to be connected to its domain before the import works.",
    },
    {
      q: "Do I need Google's Change of Address tool when I migrate?",
      a: "Only if the domain changes, for example from oldname.com to newname.com. Moving to a new platform on the same domain doesn't need it: redirects and an updated sitemap do the job. For a domain change, Google says to keep the redirects for at least 180 days, and longer if the old URLs still get search traffic.",
    },
  ],

  related: {
    heading: "More on moving a website",
    items: [
      {
        kind: "Service",
        label: "Website migration",
        href: "/services/website-migration",
        desc: "We run this whole list for you, with 30 days of Search Console monitoring after launch.",
        icon: "transfer",
      },
      {
        kind: "Guide",
        label: "WordPress to Wix Studio",
        href: "/services/wordpress-to-wix-studio",
        desc: "What carries over from WordPress, what gets rebuilt and what to plan for.",
        icon: "compass",
      },
      {
        kind: "Tool",
        label: "Website cost calculator",
        href: "/tools/website-cost-calculator",
        desc: "What a migration costs in year one, including the platform plan.",
        icon: "calculator",
      },
    ],
  },

  sources: [
    {
      label: "Google Search Central: Site moves with URL changes",
      href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
      note: "URL mapping, verifying both sites, canonicals, removing blocks, sitemaps, expected fluctuation",
      checked: "2026-11-23",
    },
    {
      label: "Google Search Central: Redirects and Google Search",
      href: "https://developers.google.com/search/docs/crawling-indexing/301-redirects",
      note: "Permanent redirect types",
      checked: "2026-11-23",
    },
    {
      label: "Search Console Help: Change of Address tool",
      href: "https://support.google.com/webmasters/answer/9370220?hl=en",
      note: "When the tool applies; keep redirects at least 180 days",
      checked: "2026-11-23",
    },
    {
      label: "Wix Help Center: Importing or exporting URL redirects with a CSV file",
      href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
      note: "Two-column CSV, 500 redirects per file, domain must be connected",
      checked: "2026-11-23",
    },
  ],

  finalCta: {
    heading: "Rather not do this yourself?",
    paragraph:
      "A migration is priced like a build of the same size, with the redirect map and 30 days of monitoring included. A free 20-minute call gets you a fixed price and a launch date.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      { label: "Free website audit", href: "/free-website-audit", variant: "secondary" },
    ],
  },
};
