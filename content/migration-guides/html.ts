import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/html-to-wix-studio
 * Targets: html site to wix studio · static site to wix · convert html website
 * to wix · move hand coded site to wix · old website redesign wix studio.
 *
 * THE THESIS: every sibling guide is a story about what a platform will let
 * you take. This one has no platform. There's no vendor, no export button, no
 * plan tier and no support article, because you already own every file. So the
 * constraint inverts: nothing is trapped and nothing is automated. More
 * genuinely carries across on this move than on any other, and none of it
 * carries by itself.
 *
 * WHY THIS PAGE READS DIFFERENTLY, and the sources block says so out loud:
 * there is no source-platform documentation to cite, because static HTML isn't
 * a product. The cited constraints are therefore Wix-side (import, CMS CSV
 * limits, redirect import) plus web-standard references (Apache's own .htaccess
 * documentation, Google's site-move guidance). That's honest rather than thin,
 * and it's stated in the sources intro so nobody reads it as sloppiness.
 *
 * THE DISTINCTIVE ASSET is the .htaccess or nginx config. On every other
 * platform the redirect history has to be reconstructed from a crawl. Here it
 * is sitting in a text file the owner already has, and most of them don't know
 * it counts. That drives a transfers row, a step and an FAQ.
 *
 * SECOND DISTINCTIVE STRAND: this is the only guide where the reader might have
 * arrived from another guide's platform. A static site is often a Webflow code
 * export, a Framer-era build, or a decommissioned CMS flattened to HTML. FAQ 8
 * addresses that reader and cross-links to Webflow.
 *
 * NO PROOF BLOCK. No HTML-to-Studio client on file. Borrowing one would
 * discredit the sourcing.
 *
 * OWNER — this page has the longest shelf life in the set. Static HTML has no
 * vendor roadmap, so nothing here goes stale the way the Framer plan limits or
 * the Webflow editor change will.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const html: MigrationGuideContent = {
  slug: "html-to-wix-studio",
  publish: true,
  platform: "HTML",
  seo: {
    title: "HTML to Wix Studio | Migration Guide | Zenith Digital",
    description:
      "Moving a static or hand-coded HTML site to Wix Studio. What can be reused from your existing markup, what has to be rebuilt, and what it costs. From €1,250.",
  },

  hero: {
    name: "HTML to Wix Studio migration",
    h1: "HTML to Wix Studio: the complete migration guide",
    subhead:
      "A static HTML site, sometimes called hand-coded or hard-coded, has no export button because it doesn't need one. You already own every file. That makes this the migration where the most carries across and the least happens automatically. Here's what's reusable and what isn't.",
    chips: [
      "Your files, your content, no vendor lock",
      "Your redirect history is already a file",
      "Every page you hand-built becomes editable",
    ],
    ctas,
  },

  glance: {
    heading: "HTML to Wix Studio, at a glance",
    intro:
      "The short answers for a site that nobody can change without a developer.",
    items: [
      {
        label: "Can the site be converted",
        value:
          "No automatic path. Wix doesn't import sites built elsewhere, so the design is rebuilt while your markup supplies the content.",
      },
      {
        label: "What comes with you",
        value:
          "More than anywhere else. Your copy, images, metadata and redirect rules are all files you already hold, in formats nothing is hiding.",
      },
      {
        label: "What happens to your URLs",
        value:
          "You keep them. Wix Studio imposes no path structure, so a page at /services/roofing stays exactly there.",
      },
      {
        label: "What it costs",
        value:
          "From €1,250, quoted as a fixed price once the page count and the repeating patterns are known.",
      },
      {
        label: "How long it takes",
        value:
          "Two to five weeks, plus 30 days of index monitoring after launch.",
      },
      {
        label: "DIY difficulty",
        value:
          "Nothing blocks you, which is the trap. Every page is a manual copy-paste unless someone finds the pattern underneath them first.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "A hand-coded site is usually fine at what it does. The problem is what it costs to change, and that cost compounds quietly until nobody updates the site at all.",
    items: [
      {
        title: "Changing a sentence stops being a developer ticket",
        body: "The single reason most static sites get replaced. Fixing a phone number, swapping a photo or adding a paragraph becomes something the person who noticed it can do, in the time it took to write the email asking someone else to.",
      },
      {
        title: "Pages that repeat become one layout",
        body: "Most hand-built sites have twenty near-identical service or location pages, each maintained separately. In Studio they become one CMS collection and one template, so the twenty-first costs almost nothing and a design change touches all of them at once.",
      },
      {
        title: "Hosting, SSL and backups stop being yours",
        body: "No more certificate renewals, no shared host you inherited from a developer who's moved on, and no year where the site goes down because something expired that nobody was watching.",
      },
      {
        title: "Properly responsive, not a media query bolted on",
        body: "Older hand-coded sites were made responsive after the fact, if at all. Studio builds from breakpoints, so the phone layout is designed rather than survived.",
      },
      {
        title: "Forms that actually deliver",
        body: "Static-site contact forms depend on a server-side script that fails silently, and plenty of businesses have gone months without realising. Native Wix forms deliver, log every submission, and notify whoever needs to see it.",
      },
      {
        title: "Publishing a page stops being a deploy",
        body: "Metadata, structured data, sitemap and robots controls all sit in the interface rather than in the markup, so adding a page targeting a real search term takes minutes and doesn't need anyone with FTP access.",
      },
    ],
  },

  fit: {
    heading: "Who this page is for",
    intro:
      "Static sites are wildly varied, from a five-page brochure built in 2011 to a well-maintained Astro build a developer ships weekly. The move makes sense for one of those and not the other.",
    goodFit: [
      "Every change to the site goes through a developer, or through nobody.",
      "You have a folder of near-identical service or location pages maintained by hand.",
      "The person who built it is unreachable and nobody else knows how it works.",
      "You're paying for hosting you don't understand and can't audit.",
      "The contact form stopped working and nobody is sure when.",
    ],
    notAFit: [
      "It's a web application with real server-side logic, not a marketing site.",
      "A developer maintains it happily and publishing is already fast.",
      "Your team runs a static-site generator with a git workflow they like.",
      "The site is deliberately minimal and raw speed is a competitive feature.",
    ],
    footnote:
      "A distinction worth holding onto: this is nearly always a redesign and a migration at once. The redesign is what you'll notice, and the migration is the part that stops years of accumulated search visibility going out with the old markup.",
  },

  transfers: {
    heading: "What moves from an HTML site to Wix Studio",
    intro:
      "The best-looking table in this set, and the reason is simple: nothing is locked in a proprietary format. Your content is text in files you own. What doesn't move is the build itself, because Wix states that importing a site created outside of Wix isn't supported, so the design is recreated.",
    rows: [
      {
        item: "Your domain",
        icon: "globe",
        status: "carries",
        note: "Point it or transfer it, and unlike a platform move there's no account to unpick first.",
      },
      {
        item: "Page URLs",
        icon: "redirect",
        status: "carries",
        note: "Wix Studio imposes no path structure on standard pages, so whatever your folder layout produced can be reproduced exactly and most pages never move.",
      },
      {
        item: "Your redirect history",
        icon: "transfer",
        status: "carries",
        note: "The most overlooked asset on this move: your .htaccess or nginx config already holds every redirect anyone ever added, and it reads as a ready-made map.",
      },
      {
        item: "All your copy",
        icon: "type",
        status: "carries",
        note: "It's plain text inside your own markup, so it's extracted programmatically rather than retyped, which is why the content half of this migration is quick.",
      },
      {
        item: "Images and documents",
        icon: "image",
        status: "carries",
        note: "Every asset is already a file in a folder you control, with no CDN URL that expires and no bulk download to negotiate.",
      },
      {
        item: "SEO titles, descriptions and structured data",
        icon: "search",
        status: "rebuilt",
        note: "All of it sits in your head tags, so it's read straight out of the source and re-entered in Wix rather than reconstructed from a crawl.",
      },
      {
        item: "Repeating pages",
        icon: "server",
        status: "rebuilt",
        note: "Your twenty hand-maintained service or location pages become one CMS collection and one layout, which is where most of the value in this project sits.",
      },
      {
        item: "Page layout and design",
        icon: "responsive",
        status: "rebuilt",
        note: "Rebuilt in Studio against the live site, and on a site this old that's usually the point rather than a cost.",
      },
      {
        item: "Hand-coded blog posts",
        icon: "pen",
        status: "rebuilt",
        note: "Each post is its own file, so they're parsed into a CSV and imported as CMS items, after which publishing the next one no longer needs a text editor.",
      },
      {
        item: "Contact forms",
        icon: "form",
        status: "replaced",
        note: "Whatever server-side script was handling submissions is replaced by native Wix forms, which log every entry rather than relying on mail delivery nobody monitors.",
      },
      {
        item: "JavaScript libraries and widgets",
        icon: "puzzle",
        status: "replaced",
        note: "Sliders, lightboxes, accordions and carousels are native in Studio, so old jQuery plugins get dropped rather than carried into a new site.",
      },
      {
        item: "Hosting, SSL and CDN",
        icon: "globe",
        status: "replaced",
        note: "All three are included in a Wix plan, so the server you were renting stops being a thing you maintain, budget for, or worry about renewing.",
      },
      {
        item: "Analytics and tracking snippets",
        icon: "code",
        status: "replaced",
        note: "Re-added deliberately in Wix's tracking settings, which is usually the moment somebody discovers three abandoned tags still firing.",
      },
      {
        item: "Server-side code",
        icon: "ban",
        status: "lost",
        note: "PHP includes, template partials and any custom scripts don't transfer, and anything doing real work needs scoping before the project starts rather than after.",
      },
      {
        item: "The rest of your .htaccess",
        icon: "lock",
        status: "lost",
        note: "Redirects carry, but custom headers, caching rules, directory authentication and IP blocks are server config with no equivalent, so they get replaced or dropped by decision.",
      },
      {
        item: "Anything behind a server-side login",
        icon: "users",
        status: "lost",
        note: "A hand-built members area has no export path and no user list you can import, so gated content is rebuilt on Wix members and people re-register.",
      },
    ],
    footnote:
      "Read it as one sentence: your content comes with you almost entirely, and the machinery around it doesn't come at all. On this move that's the right trade, because the machinery is what made the site impossible to change.",
    cta: {
      heading: "Started rebuilding it yourself and stalled?",
      paragraph:
        "You don't have to restart. Send us the old site and whatever you've begun, and we'll finish the content extraction, the CMS modelling and the cutover.",
      cta: {
        label: "Free migration check",
        href: "/free-website-audit",
        variant: "primary",
      },
    },
  },

  steps: {
    heading: "How the move runs",
    intro:
      "Seven stages. The unusual one is second: before anything is designed, the old markup gets read for the patterns hiding in it, because that decision sets what the new site costs to run for the next five years.",
    items: [
      {
        title: "Inventory the site twice",
        navLabel: "Inventory",
        duration: "1 to 2 days",
        body: "You have something no other platform gives us: the source files and the live site. Both get read, because they disagree more often than you'd expect.",
        lead: "What gets captured:",
        points: [
          {
            label: "Every indexable URL with its performance",
            body: "A crawl plus Search Console, so the redirect map is built around the pages that actually earn traffic.",
          },
          {
            label: "Orphan files nobody links to",
            body: "Old landing pages and forgotten drafts sitting on the server, often still indexed and sometimes still ranking.",
          },
          {
            label: "The metadata already in your head tags",
            body: "Titles, descriptions, canonicals and any structured data, read out of the source rather than reconstructed.",
          },
        ],
      },
      {
        title: "Find what repeats before designing anything",
        navLabel: "Find the patterns",
        duration: "1 to 2 days",
        body: "The stage that decides whether this project pays back. Hand-built sites hide their structure, because every page was made one at a time.",
        lead: "What we're looking for:",
        points: [
          {
            label: "Pages that are the same page with different words",
            body: "Services, locations, team members, products, case studies. Twenty files with one shape between them is one collection.",
          },
          {
            label: "Where the pattern quietly broke",
            body: "Three of the twenty have an extra section because someone edited them in 2019. That's a field, not an exception.",
          },
          {
            label: "What genuinely is one of a kind",
            body: "Real one-off pages stay as static pages, because forcing everything into a collection is its own kind of mess.",
          },
        ],
      },
      {
        title: "Extract the content programmatically",
        navLabel: "Extract the content",
        duration: "1 to 3 days",
        body: "Because it's your own markup, this is a parsing job rather than a copy-paste marathon. Doing it by hand is where DIY attempts quietly die.",
        lead: "What comes out:",
        points: [
          {
            label: "One CSV per pattern",
            body: "Each repeating page type parsed into rows and columns, ready to import as a Wix collection.",
          },
          {
            label: "Copy checked against the live pages",
            body: "Parsing errors are silent, so the extracted text is diffed against what's actually rendering before anything is trusted.",
          },
          {
            label: "Images pulled with their alt text intact",
            body: "Alt attributes are already in the markup, so accessibility and image search don't reset to zero on launch.",
          },
        ],
      },
      {
        title: "Model the CMS in Wix",
        navLabel: "Structure and CMS",
        duration: "2 to 4 days",
        body: "The patterns from stage two become real collections. This is the moment the site stops being a folder of files and starts being a system.",
        lead: "What happens here:",
        points: [
          {
            label: "Collections built to match the patterns",
            body: "Wix imports up to 50,000 items per CSV, so nothing about the volume of a static site is a constraint.",
          },
          {
            label: "URL structure set to match the old paths",
            body: "Wix's dynamic page prefix is editable, so /services/roofing can stay exactly that instead of moving and needing a redirect.",
          },
          {
            label: "Fields for the things that varied",
            body: "The exceptions found in stage two become optional fields, so the collection fits the real content rather than an idealised version of it.",
          },
        ],
      },
      {
        title: "Rebuild the design in Studio",
        navLabel: "The Studio build",
        duration: "1 to 3 weeks",
        body: "Built on a staging URL while the old site keeps serving your domain. On this move it's almost always a redesign rather than a reproduction.",
        lead: "What the build covers:",
        points: [
          {
            label: "A design system rather than a stylesheet",
            body: "Global styles and breakpoints, so the next change is one edit instead of finding every place a colour was hard-coded.",
          },
          {
            label: "Collections wired to dynamic pages",
            body: "The imported content stops being rows in a table and starts being pages that publish themselves.",
          },
          {
            label: "Real content from day one",
            body: "The extracted copy goes in during the build, so what you sign off on is the site rather than a placeholder version of it.",
          },
        ],
      },
      {
        title: "Read the .htaccess, then cut over",
        navLabel: "Redirects and cutover",
        duration: "2 to 3 days",
        body: "Your server config is the only written record of every URL that ever changed. It gets read properly, not skimmed, and merged with whatever this move changes.",
        lead: "The sequence:",
        points: [
          {
            label: "Existing rules translated, not discarded",
            body: "A decade of redirects someone added one at a time is link equity you already own, and throwing it away is the most common own goal on this move.",
          },
          {
            label: "Uploaded in CSV batches and tested",
            body: "Wix takes up to 500 redirect rows per file, checked against the crawl inventory before the domain points anywhere.",
          },
          {
            label: "The old site stays up until the new one answers",
            body: "No maintenance page, no gap in enquiries, and a rollback that's still available if anything looks wrong.",
          },
        ],
      },
      {
        title: "Watch it land",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Daily at first, then weekly. On a site that's been static for years, this window usually shows things improving rather than holding.",
        lead: "What we're watching:",
        points: [
          {
            label: "Index coverage against the inventory",
            body: "Every URL from the crawl either indexed or redirecting correctly, checked rather than assumed.",
          },
          {
            label: "Position against the baseline",
            body: "Taken before cutover, so the comparison is a measurement rather than a memory.",
          },
          {
            label: "Anything that 404s or drops",
            body: "Fixed inside the window at no extra cost, as on every migration we run.",
          },
        ],
      },
    ],
  },

  auditCta: {
    heading: "Not sure what's actually reusable in your old site?",
    paragraph:
      "Send us the URL. We'll crawl it, tell you which pages are the same page wearing different words, what your redirect file is already worth, and what a rebuild would cost.",
    ctas: [
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "primary",
      },
      { label: "Book a call", href: "/book-a-call", variant: "secondary" },
    ],
  },

  sources: {
    heading: "Sources",
    intro:
      "One difference worth naming. Every other guide in this set quotes the source platform's own documentation, because there is one. Static HTML isn't a product, so it has no vendor, no export article and no plan limits to cite. What follows is therefore the Wix-side constraints and the web-standard references this page relies on, all linked so you can check them.",
    verified: "2026-08-20",
    items: [
      {
        label: "Wix: Request: Importing a site created outside of Wix",
        href: "https://support.wix.com/en/article/request-importing-a-site-created-outside-of-wix",
        note: "Wix states importing a site created outside of Wix is not supported, which is why an HTML site is rebuilt rather than uploaded.",
      },
      {
        label: "Wix CMS: Importing content into a collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a Wix collection, capped at 50,000 items per file, which is how extracted pages become CMS items.",
      },
      {
        label: "Wix: Importing or exporting URL redirects with a CSV file",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import, up to 500 rows at a time, which is how a long .htaccess history gets loaded.",
      },
      {
        label: "Wix: Making dynamic page URLs meaningful with prefixes",
        href: "https://dev.wix.com/docs/develop-websites/articles/databases/wix-data/dynamic-pages/making-dynamic-page-urls-meaningful-with-prefixes",
        note: "The collection name is only a suggested default prefix and can be edited, which is how existing folder paths are preserved.",
      },
      {
        label: "Apache: .htaccess files",
        href: "https://httpd.apache.org/docs/current/howto/htaccess.html",
        note: "Apache's own documentation on per-directory configuration files, which is where a static site's redirect history usually lives.",
      },
      {
        label: "Apache: mod_rewrite",
        href: "https://httpd.apache.org/docs/current/mod/mod_rewrite.html",
        note: "The module behind most rewrite and redirect rules on a static site, and what those rules have to be translated from.",
      },
      {
        label: "Google Search Central: Site moves with URL changes",
        href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
        note: "Google's guidance on URL-changing moves, including its statement that following it doesn't guarantee crawling, indexing or ranking.",
      },
      {
        label: "Google Search Central: Redirects and Google Search",
        href: "https://developers.google.com/search/docs/crawling-indexing/301-redirects",
        note: "How Google treats permanent redirects, which is the mechanism the whole cutover depends on.",
      },
    ],
  },

  faq: {
    heading: ["HTML to Wix Studio,", "answered properly"],
    subhead:
      "What people ask when the site works fine and simply can't be changed by anyone who works there.",
    ctas,
    items: [
      {
        q: "Can I upload my HTML files to Wix Studio?",
        a: "No. Wix states that importing a site created outside of Wix isn't supported, so there's no way to hand it your HTML and have a Studio site come out. What your files are good for is everything else: the copy, the images, the alt text, the metadata in your head tags and the redirect rules in your server config are all read straight out of the source and reused. So the design is rebuilt, and almost none of the content has to be retyped.",
      },
      {
        q: "What happens to my HTML site's content when I move to Wix Studio?",
        a: "It's extracted programmatically rather than copied by hand, which is the main reason this migration is faster than it looks. Your markup is parsed into structured data, one CSV per type of page, and imported into Wix CMS collections. Copy, headings, images and alt text all come across. The extraction is then diffed against the live pages before anything is trusted, because parsing errors are silent and a missing paragraph doesn't announce itself.",
      },
      {
        q: "My HTML site has twenty near-identical pages. What happens to them in Wix Studio?",
        a: "They become one collection and one layout, and this is where most of the value in the project sits. Twenty hand-maintained service or location pages currently mean twenty files to update when anything changes, which is exactly why they haven't been updated. As a CMS collection, a design change touches all of them at once and adding the twenty-first is filling in a form. Part of the work is spotting where the pattern quietly broke, because the three pages someone edited in 2019 usually reveal a field the collection needs rather than an exception to ignore.",
      },
      {
        q: "What happens to my .htaccess redirects when I move to Wix Studio?",
        a: "They come with you, and most people don't realise they're worth anything. Your .htaccess or nginx config is the only written record of every URL that ever changed on the site, often added one line at a time over a decade. Those rules get translated into Wix redirects and imported in CSV batches of up to 500. Everything else in that file is a different story: custom headers, caching rules, directory passwords and IP blocks are server configuration with no equivalent, so they're replaced with a Wix feature or dropped deliberately rather than by accident.",
      },
      {
        q: "Will I lose my Google rankings moving from a static HTML site to Wix Studio?",
        a: "This is the move with the least reason to. Wix Studio imposes no path structure on standard pages, so a page at /services/roofing stays at /services/roofing, and collection page paths can be preserved too because Wix's dynamic page prefix is editable. Your existing metadata is sitting in your head tags rather than locked in a platform's settings, so it transfers accurately instead of being reconstructed. Add the redirect history you already own, and the usual sources of loss on a migration mostly don't apply. What still gets done properly: full URL inventory, ranking baseline, mapped redirects for anything that changes, and 30 days of Search Console monitoring after cutover.",
      },
      {
        q: "Does my PHP contact form work after moving from HTML to Wix Studio?",
        a: "No, and that's usually an improvement. A static-site form depends on a server-side script, and those fail quietly: the page still says thank you while the mail never arrives, and businesses have gone months without noticing. Native Wix forms record every submission in the dashboard as well as emailing you, so a delivery problem can't hide. Worth doing before cutover: send a test through the old form and see whether it still reaches anyone, because the answer occasionally reframes the whole project.",
      },
      {
        q: "My HTML site was exported from another website builder. Does that change the move to Wix Studio?",
        a: "Not the process, but it does change what you're holding. A code export from a builder is static markup with the platform's own class names and JavaScript bundle, and typically the dynamic parts never came with it, so forms, any CMS-driven listings and search are already inert. That's worth knowing because those pages may look complete and be doing nothing. If you exported from Webflow specifically, its guide covers what that export does and doesn't contain, and if the original project still exists you'll get far more out of exporting the CMS from there than parsing the flattened HTML.",
      },
      {
        q: "Do my URLs have to change moving from HTML to Wix Studio?",
        a: "Almost none of them. Wix Studio imposes no structure on standard pages, so whatever your folder layout produced is reproducible exactly. The one thing to decide deliberately is your file extensions: a static site often serves /about.html, and the Studio equivalent is /about. Where that changes, each old address gets a mapped one-to-one redirect, which is a mechanical job because the pattern is consistent across the whole site.",
      },
      {
        q: "How much does an HTML to Wix Studio migration cost, and how long does it take?",
        a: "From €1,250, quoted as a fixed price before anything starts, and two to five weeks from kickoff to launch plus a 30-day monitoring window that runs while you're already live. The number is driven less by page count than by how much of the site follows a pattern. Forty pages that are really four templates is a smaller project than fifteen pages that share nothing. Server-side functionality is the other variable, and anything doing real work gets scoped before the quote rather than discovered halfway through.",
      },
      {
        q: "Can I migrate my HTML site to Wix Studio myself?",
        a: "Nothing is stopping you, which is exactly the trap on this one. There's no platform gate, no export to request and no plan to upgrade, so a small site really is a weekend. Where it turns is volume and pattern. Copying forty pages by hand takes far longer than parsing them, and hand-copying also rebuilds the original problem: forty separate pages instead of one collection, so nothing about maintaining the site actually improves. The other two things people miss are the .htaccess, which gets left behind with a decade of link equity in it, and the metadata, which is the part that quietly costs organic traffic. Reliable signal: if you can't see the pattern under your own pages, that's the part worth handing over, because a Studio site with an empty CMS is just a prettier version of what you have.",
      },
    ],
  },

  related: {
    heading: "Keep reading",
    intro:
      "One source platform per guide. The hub covers the rest, and the siblings go equally deep on theirs.",
    items: [
      {
        label: "Website migration",
        icon: "transfer",
        href: "/services/website-migration",
        desc: "The hub: what a migration to Wix Studio covers, what it costs, and every platform we move sites from.",
      },
      {
        label: "WordPress to Wix Studio",
        logo: "/platforms/wordpress.svg",
        href: "/services/wordpress-to-wix-studio",
        desc: "If your static site started life as a WordPress build, this is what the original would have given you.",
      },
      {
        label: "Webflow to Wix Studio",
        logo: "/platforms/webflow.svg",
        href: "/services/webflow-to-wix-studio",
        desc: "Static files that came out of a builder? This covers what a Webflow code export actually contains.",
      },
      {
        label: "Wix Studio website design",
        icon: "palette",
        href: "/services/wix-studio-website-design",
        desc: "Since this is usually a redesign as well as a migration, here's what a Studio build involves.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what your old site", "is actually worth keeping"],
    paragraph:
      "Send us the URL. We'll tell you which pages share a pattern, what your redirect file is already worth, what has to be rebuilt, and what it would cost. Free, and there's no obligation at the end of it.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Static HTML to Wix Studio migration. Full site crawl and source inventory, programmatic content extraction, CMS collection modelling, responsive Studio build, form rebuild, .htaccess redirect translation and mapping, metadata parity, and 30 days of post-launch index monitoring. From a Wix Legend Partner.",
    priceFrom: "1250",
  },
};
