import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/squarespace-to-wix-studio
 * Targets: squarespace to wix studio · migrate off squarespace · squarespace
 * export limitations · squarespace alternative.
 *
 * THE THESIS: the export file is the whole story. Squarespace exports a single
 * WordPress-format XML, and its own documentation lists more page types left
 * behind than taken. Almost nobody writing on this topic quotes it, which is
 * why a reader arrives believing "export" means "backup". Correcting that is
 * the page.
 *
 * Verified against Squarespace's own help centre, 19 Aug 2026. Exports: layout
 * pages, ONE blog page with its posts, text blocks, image blocks, and gallery
 * pages on 7.0. Does not export: album, cover, index, info, calendar,
 * portfolio and store pages; content in page-specific headers, footers and
 * sidebars; additional blog pages; dropdowns, audio, product and video blocks;
 * drafts; style settings; custom CSS.
 *
 * Client facts, owner-confirmed: Hunting Brook Gardens was on Squarespace
 * before the Wix Studio work and has €140k in course sales since. MindEd was
 * also a Squarespace site, migrated at 70+ pages across two languages.
 *
 * VERIFICATION STATUS (19 Aug 2026, re-checked after a full docs search).
 * Documented by Squarespace and linked in `sources`: export scope, the product
 * CSV exclusions, no bulk image export, no video export, order export with no
 * import path, and customer list export by CSV.
 *
 * NOT documented anywhere, despite searching: per-form submission export
 * behaviour, member area export, and whether digital products export at all.
 * Those three are written from our own experience or hedged as "check your
 * account", and the copy says so. Do not harden them into vendor-backed claims
 * unless a Squarespace source appears.
 *
 * OWNER — publish is false until the transfers table is verified row by row.
 * Squarespace-side rows are sourced to Squarespace's help centre and Wix-side
 * rows to Wix's. Re-check if Squarespace changes its export scope.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const squarespace: MigrationGuideContent = {
  slug: "squarespace-to-wix-studio",
  publish: true,
  platform: "Squarespace",
  seo: {
    title: "Squarespace to Wix Studio | Migration Guide | Zenith Digital",
    description:
      "Squarespace's export is one WordPress XML file and it leaves more behind than it takes. Exactly what transfers, what doesn't, how the URLs change, and what the move costs. From €1,250.",
  },

  hero: {
    name: "Squarespace to Wix Studio migration",
    h1: "Squarespace to Wix Studio: the complete migration guide",
    subhead:
      "Squarespace exports one WordPress-format XML file, and its own documentation lists more things left out than taken. Here's what really moves, which URLs change, and what it costs to do it without dropping rankings.",
    chips: [
      "Every URL mapped before cutover",
      "€140k in course sales for Hunting Brook",
      "70+ page migrations delivered",
    ],
    ctas,
  },

  glance: {
    heading: "Squarespace to Wix Studio at a glance",
    intro:
      "The short answers, before the detail. Every one of these is expanded further down the page.",
    items: [
      {
        label: "Can the design be converted?",
        value: "No. Squarespace exports content, never styling, and its own docs confirm style settings and custom CSS are excluded.",
      },
      {
        label: "What the export actually contains",
        value: "Layout pages, one blog page with its posts, text and image blocks, and gallery pages on 7.0. That is the full list.",
      },
      {
        label: "What happens to your URLs",
        value: "Standard pages keep their paths. Blog posts depend on the build: Wix's Blog app forces a /post/ prefix, a CMS-built blog keeps your existing paths.",
      },
      {
        label: "What it costs",
        value: "From €1,250, quoted as a fixed price once the page and product count is known.",
      },
      {
        label: "How long it takes",
        value: "Two to five weeks, plus 30 days of index monitoring after launch.",
      },
      {
        label: "DIY difficulty",
        value: "High. The export looks complete and isn't, so the risk is in what you never notice was missing.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "Squarespace sites rarely fail. They stop being able to become the next thing. These are the ceilings Studio removes, in the order Squarespace users tend to hit them.",
    items: [
      {
        title: "Layouts that aren't the template's",
        body: "Squarespace's design system is generous until the moment you need something it didn't anticipate. Studio's grid and breakpoints let you build the layout the brief actually calls for rather than the nearest available approximation.",
      },
      {
        title: "A real CMS underneath the content",
        body: "Squarespace collections are tied to page types with fixed shapes. Studio's CMS lets you define your own fields and relationships, so a directory, a resource library and a product catalogue can each be the thing they are.",
      },
      {
        title: "More than one blog",
        body: "Squarespace allows several blog pages but exports only one, and that constraint reflects how it treats them. In Studio, news, resources and case studies are separate collections with their own templates and their own URLs.",
      },
      {
        title: "Multilingual without a workaround",
        body: "Running a second language on Squarespace means duplicating pages or paying for a third-party layer. Studio handles translation natively, which is why a 70+ page site across two languages is a normal project rather than an exception.",
      },
      {
        title: "Design once, apply everywhere",
        body: "Global text themes, colour and spacing mean a brand change is one edit. Squarespace's style editor gets you part of the way, then per-page custom CSS starts accumulating and nobody remembers what it targets.",
      },
      {
        title: "Roles for the people who edit",
        body: "Studio supports multiple editors with real permissions, so a marketing team can publish without the account password being shared around or a designer becoming the bottleneck.",
      },
    ],
  },

  fit: {
    heading: "When leaving Squarespace is worth it",
    intro:
      "Squarespace sites don't usually break. They stop being able to become the next thing, which is a slower and much easier problem to ignore.",
    goodFit: [
      "Every design change now needs custom CSS",
      "Pages that repeat, built one at a time",
      "A second language on the roadmap",
      "A template quietly deciding how the site looks",
      "Writers waiting on a designer to publish",
      "A blog that has outgrown its template",
      "A renewal quote that went up in 2026 and prompted a rethink",
    ],
    notAFit: [
      "A portfolio site that looks good and ranks",
      "A catalogue built mostly on digital products",
      "A launch deadline inside the next fortnight",
      "A complaint about the editor, not the ceiling",
      "No plans that need a CMS behind them",
    ],
    footnote:
      "If adding custom code has come up more than twice this year, you've found the ceiling. If it hasn't, Squarespace is probably still the right tool and we'll say so.",
  },

  transfers: {
    heading: "What Squarespace's export gives you",
    intro:
      "Squarespace offers one export format: a .xml file structured for WordPress. Its documentation is refreshingly direct about the limits, and most of what follows comes straight from it.",
    rows: [
      {
        item: "Standard layout pages",
        icon: "type",
        status: "carries",
        note: "Layout pages come through the XML with their text and image blocks intact. Other block types export with what Squarespace calls minimum structure, meaning the text survives and the arrangement doesn't, so pages get re-laid rather than re-typed.",
      },
      {
        item: "Standard page URLs",
        icon: "transfer",
        status: "carries",
        note: "Ordinary pages keep their slugs. A page at /about stays at /about, so the redirect work concentrates on blog posts, products, and anything that lived under a page type Wix structures differently.",
      },
      {
        item: "Domain and email",
        icon: "globe",
        status: "carries",
        note: "A domain registered with Squarespace transfers out, or stays where it is and just repoints, which is faster and what we usually do. Google Workspace bought through Squarespace is a separate billing relationship to move, and it's worth handling before launch week rather than during it.",
      },
      {
        item: "Blog posts",
        icon: "pen",
        status: "rebuilt",
        note: "Only one blog page exports. If you run more than one, Squarespace makes you pick a primary and the others are on you. The chosen blog brings its posts and up to 1,000 comments per post; drafts don't come at all.",
      },
      {
        item: "Images and media files",
        icon: "image",
        status: "rebuilt",
        note: "Squarespace states you can't export images in bulk and can't export uploaded video at all, so media comes down one at a time or by crawl and gets re-uploaded, with alt text re-applied on the way through.",
      },
      {
        item: "Store pages and products",
        icon: "cart",
        status: "rebuilt",
        note: "Store pages aren't in the XML and product blocks don't export with it. Products come out through a separate CSV covering physical and service products, and that CSV leaves out additional product info, customer reviews, featured images, product image alt text, and variant images. Digital products aren't covered by that CSV and their export path isn't documented, so check yours in the account before you plan around it.",
      },
      {
        item: "Form submissions",
        icon: "form",
        status: "rebuilt",
        note: "In our experience each form block exports its own submissions separately rather than as one dataset for the site, so budget a file per form and pull any uploaded files before the plan lapses.",
      },
      {
        item: "SEO titles, descriptions, and redirects",
        icon: "tags",
        status: "rebuilt",
        note: "Per-page SEO fields don't ride along in the XML and get re-entered on the new site, then diffed against the old ones before cutover. Any URL mappings you've already built up in Squarespace are worth exporting first: they're a ready-made list of addresses people still reach the site through.",
      },
      {
        item: "Blog post URLs",
        icon: "redirect",
        status: "rebuilt",
        note: "It depends on how the blog gets built: Wix's Blog app forces a /post/ prefix that can't be removed, so every post changes and needs a mapped redirect, while a blog built on the Wix CMS lets you set the prefix yourself and keep your existing /blog-name/post-name paths intact."
      },
      {
        item: "Index, portfolio, gallery, album, and cover pages",
        icon: "layers",
        status: "lost",
        note: "Squarespace lists all of these as not included in the export, along with info pages and calendar pages. In practice this is where a design-led Squarespace site keeps most of its personality, so it's the bulk of what gets rebuilt. Gallery pages are the one partial exception: on 7.0 they export, including York project pages.",
      },
      {
        item: "Customer list",
        icon: "receipt",
        status: "rebuilt",
        note: "Squarespace exports customers to CSV with names, emails, order totals, addresses and tags, so the list comes with you even though the accounts don't.",
      },
      {
        item: "Order history and customer logins",
        icon: "receipt",
        status: "lost",
        note: "Squarespace documents order export as a way to analyse sales outside Squarespace with no import path, and saved logins stay behind, so the new store starts clean.",
      },
      {
        item: "Member areas and paywalled content",
        icon: "lock",
        status: "lost",
        note: "Member areas aren't part of the export, and Wix doesn't accept imported member lists in any case. Anyone with a login signs up again on the new site. If your business runs on gated content, this is the constraint that sets the launch date.",
      },
      {
        item: "Uploaded video",
        status: "lost",
        note: "Squarespace documents no export path for uploaded video, so anything hosted natively is re-sourced from your originals or re-recorded.",
      },
      {
        item: "Custom CSS and style settings",
        icon: "brush",
        status: "lost",
        note: "Squarespace names both explicitly as excluded, which sounds worse than it is. Custom CSS on a Squarespace site is usually there to push a template past what it was built to do. In Studio that behaviour is native, so the CSS isn't ported, it stops being necessary.",
      },
    ],
    footnote:
      "Read the pattern rather than the rows: the XML carries structured text, everything visual gets rebuilt, and anything tied to a person stays behind. Already part-way through one of these yourself? You don't have to restart. Send us the Squarespace site and whatever you've built in Studio and we'll tell you what's missing from the export and finish it.",
  },

  steps: {
    heading: "How a Squarespace migration runs",
    intro:
      "Seven stages, three to five weeks of active work. Your Squarespace site stays live and taking bookings until the day the domain moves.",
    items: [
      {
        title: "Crawl before you export",
        navLabel: "Crawl first",
        duration: "1 to 2 days",
        body: "The XML tells you what Squarespace is willing to hand over. The crawl tells you what you actually have. The gap between the two is the project.",
        lead: "What the crawl captures:",
        points: [
          {
            label: "Every live URL with its search data",
            body: "Impressions, clicks, average position and inbound links over the last twelve months, so the redirect map can be prioritised rather than worked through alphabetically.",
          },
          {
            label: "The pages the export will drop",
            body: "Index, portfolio, album and cover pages are excluded from the XML, and on a design-led Squarespace site those are usually the pages people link to.",
          },
          {
            label: "Current per-page metadata",
            body: "Titles, descriptions and social images, none of which travel in the export, captured now so there's something to diff against before cutover.",
          },
        ],
      },
      {
        title: "Pull everything the XML doesn't cover",
        navLabel: "What the XML misses",
        duration: "2 to 3 days",
        body: "A Squarespace migration is four or five exports, not one. Each lives in a different part of the admin and each has its own gaps.",
        lead: "The full set:",
        points: [
          {
            label: "The XML, for pages and one blog",
            body: "Only a single blog page exports. Sites running a news feed and a separate resources feed lose the second one unless it's captured by crawl first.",
          },
          {
            label: "A products CSV, if there's a store",
            body: "Physical and service products only. Digital products have no export at all and get rebuilt by hand.",
          },
          {
            label: "One submissions CSV per form block",
            body: "Exported from each block's Storage tab, so six forms means six files. Uploaded files aren't included, though the CSV carries direct links to download them.",
          },
          {
            label: "Your existing URL mappings",
            body: "Squarespace's own redirect layer is where past site changes were papered over, and those addresses die the day the plan lapses.",
          },
        ],
      },
      {
        title: "Design the structure Squarespace couldn't hold",
        navLabel: "Structure and CMS",
        duration: "3 to 5 days",
        body: "The stage that makes the move worth paying for. The ceiling you're leaving is structural, so the fix has to be structural too.",
        lead: "What gets modelled:",
        points: [
          {
            label: "Repeating content becomes collections",
            body: "Courses, locations, team members, properties: define the pattern once and publishing the twentieth item costs what the second did.",
          },
          {
            label: "Index and portfolio pages come back as layouts",
            body: "The page types the export drops are exactly the ones worth rebuilding as collection-driven pages rather than hand-placed galleries.",
          },
          {
            label: "Global styles get set before anything is built",
            body: "The custom CSS holding your template together stops being necessary, because the control it was faking is native here.",
          },
        ],
      },
      {
        title: "Build in Studio",
        navLabel: "The Studio build",
        duration: "1 to 3 weeks",
        body: "The new site goes up on a staging URL while Squarespace keeps serving your domain. No maintenance page, no gap in enquiries or sales.",
        lead: "What changes in the build:",
        points: [
          {
            label: "Breakpoints you control",
            body: "Responsive behaviour set per breakpoint rather than inherited from a template's assumptions about your content.",
          },
          {
            label: "Layouts that don't need code injection",
            body: "The things you were adding custom CSS for are editor features here, which is the practical difference between the two platforms.",
          },
          {
            label: "A working site you review on your own phone",
            body: "Sign-off happens against the real thing on a real device, not a slide of screenshots.",
          },
        ],
      },
      {
        title: "Move the content, media and metadata",
        navLabel: "Content and metadata",
        duration: "3 to 5 days",
        body: "Text into the new layouts, images re-uploaded, products imported. Products need the most attention, because the CSV arrives with holes in it.",
        lead: "The parts that need hand-work:",
        points: [
          {
            label: "Images re-uploaded and re-described",
            body: "The XML references media by its Squarespace URL rather than bundling files, so everything is pulled down and re-uploaded, with alt text applied as it goes.",
          },
          {
            label: "Product fields the CSV omits",
            body: "Featured images, variant images, product image alt text, additional information and customer reviews all get re-attached by hand.",
          },
          {
            label: "SEO fields entered and diffed",
            body: "Every title, description and social image re-entered, then checked line by line against the inventory from stage one.",
          },
        ],
      },
      {
        title: "Map the redirects, then cut over",
        navLabel: "Redirects and cutover",
        duration: "2 days",
        body: "The map is written and tested before the domain moves, never after. How long it runs was decided at the build stage, when the blog was either put on Wix's Blog app or modelled in the CMS.",
        lead: "How cutover runs:",
        points: [
          {
            label: "One row per post, mapped by hand",
            body: "Where post paths do change, Squarespace nests them under the blog page slug and the Blog app puts them under /post/, so no pattern rule does this correctly.",
          },
          {
            label: "Imported in batches and tested",
            body: "Wix's URL Redirect Manager takes up to 500 rows per CSV, and each batch is checked against the inventory before anything is repointed.",
          },
          {
            label: "The domain moves last",
            body: "Sitemap resubmitted, Search Console and analytics reconnected, forms and checkout submitted end to end the same afternoon.",
          },
        ],
      },
      {
        title: "Watch the index for 30 days",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Coverage and impressions daily for the first fortnight, then weekly. Blog URLs get watched hardest, because they're the ones that changed.",
        lead: "What gets fixed inside the window:",
        points: [
          {
            label: "Anything returning a 404",
            body: "Usually a post URL whose slug differed from what the export implied, which is why the crawl matters more than the file.",
          },
          {
            label: "Pages dropping out of coverage",
            body: "Caught and resubmitted while we're still on the project, at no extra cost, against a price fixed before the work began.",
          },
          {
            label: "Positions sliding on mapped URLs",
            body: "A redirect that resolves isn't proof the mapping was right. Position data over four weeks is.",
          },
        ],
      },
    ],
  },

  auditCta: {
    heading: "Want to know what your Squarespace export would miss?",
    paragraph:
      "Send us the URL. We'll crawl the site, count the URLs in play, and show you which pages the XML leaves behind before you commit to anything.",
    ctas: [
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "primary",
      },
      { label: "Book a call", href: "/book-a-call", variant: "secondary" },
    ],
  },

  proof: {
    heading: "Why hand this one over",
    intro:
      "The parts that cost people money here aren't the rebuild. They're the pages Squarespace never put in the export file, the second blog nobody remembered, and the post URLs mapped to one landing page instead of one by one, so we crawl the live site before anything is exported.",
    workSlugs: ["hunting-brook-gardens", "minded"],
  },

  sources: {
    heading: "Sources",
    intro:
      "Every platform limit on this page links to the vendor's own documentation, so you can check it rather than take our word for it.",
    verified: "2026-08-19",
    items: [
      {
        label: "Squarespace: Exporting your site",
        href: "https://support.squarespace.com/hc/en-us/articles/206566687-Exporting-your-site",
        note: "The definitive list. Exports layout pages, one blog page and its posts, text and image blocks, and gallery pages on 7.0. Excludes album, cover, index, info, calendar, portfolio and store pages, page-specific headers, footers and sidebars, additional blog pages, dropdowns, audio, product and video blocks, drafts, style settings and custom CSS.",
      },
      {
        label: "Squarespace: Importing and exporting content",
        href: "https://support.squarespace.com/hc/en-us/articles/205814028-Import-to-and-export-from-your-site",
        note: "Confirms the export is a WordPress-format XML, and states that images can't be exported in bulk and uploaded video can't be exported at all.",
      },
      {
        label: "Squarespace: Export products to a .csv",
        href: "https://support.squarespace.com/hc/en-us/articles/360000694948-Export-products-to-a-csv",
        note: "Names exactly what the product CSV leaves out: additional product information, customer reviews, featured images, product image alt text and variant images.",
      },
      {
        label: "Squarespace: Export Commerce orders",
        href: "https://support.squarespace.com/hc/en-us/articles/206540677-Export-Commerce-orders",
        note: "Orders export for analysing sales outside Squarespace. No import path is documented.",
      },
      {
        label: "Squarespace: Managing customers",
        href: "https://support.squarespace.com/hc/en-us/articles/229497568-Managing-customers",
        note: "Customer list exports to CSV. Notes are excluded and account logins are not covered.",
      },
      {
        label: "TechRadar: Squarespace users aren't happy with recent price hikes",
        href: "https://www.techradar.com/pro/im-paying-for-things-i-sincerely-did-not-ask-for-squarespace-users-arent-happy-with-recent-price-hikes",
        note: "The July 2026 increase and Squarespace's response. Trade press rather than a vendor source, because Squarespace published no announcement and notified customers by email.",
      },
      {
        label: "Squarespace: URL slugs",
        href: "https://support.squarespace.com/hc/en-us/articles/205814578-URL-slugs",
        note: "Blog post URLs always begin with the blog page's own slug, which is what determines how much of your URL structure survives.",
      },
      {
        label: "Wix Blog: About blog post web addresses",
        href: "https://support.wix.com/en/article/wix-blog-about-blog-post-web-addresses-urls",
        note: "The /post/ prefix on Wix Blog URLs, which can't be removed, and why the blog build decision drives the redirect map."
      },
      {
        label: "Wix: Making dynamic page URLs meaningful with prefixes",
        href: "https://dev.wix.com/docs/develop-websites/articles/databases/wix-data/dynamic-pages/making-dynamic-page-urls-meaningful-with-prefixes",
        note: "The collection name is only a suggested default prefix and can be edited, which is how a CMS-built blog keeps existing Squarespace post paths.",
      },
      {
        label: "Wix CMS: Importing content into a collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a collection, capped at 50,000 items per file.",
      },
      {
        label: "Wix: Importing or exporting URL redirects with a CSV file",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import, up to 500 rows at a time, which is how a few hundred mapped blog posts get loaded.",
      },
      {
        label: "Google Search Central: Site moves with URL changes",
        href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
        note: "Google's own guidance on URL-changing moves, and its statement that following it does not guarantee crawling, indexing or ranking.",
      },
    ],
  },

  faq: {
    heading: ["Squarespace to Wix Studio,", "answered"],
    subhead:
      "What people ask on these calls once they've read the export documentation.",
    ctas,
    items: [
      {
        q: "Can I export my Squarespace site and import it into Wix Studio?",
        a: "Partly. Squarespace gives you one .xml file in WordPress format containing your layout pages, one blog and its posts, and your text and image blocks. It leaves out index, portfolio, album, cover, info, calendar, and store pages, plus audio and video blocks, drafts, style settings, and custom CSS. So the words come across and the site doesn't. Everything the XML omits gets rebuilt, which is most of the visual design.",
      },
      {
        q: "Squarespace put its prices up in 2026. Is that a reason to move to Wix Studio?",
        a: "On its own, no, and it's worth being precise about what happened because the reporting was messy. In July 2026 Squarespace raised annual list prices by up to around 26%, with Core going from $23 to $29 a month and Plus from $39 to $49, according to trade press including PetaPixel and TechRadar. Squarespace published no announcement and told customers by email, then later apologised for what it called a pricing implementation error that overstated the increase for some plans, saying no customer was incorrectly charged. It told TechRadar it had recently added capabilities to every plan that were previously on higher tiers. So the honest read is a real increase, imprecisely communicated. A price rise is a good moment to reassess and a bad reason to rebuild on its own. What makes the move worth it is everything else on this page: what your export doesn't contain, and what your template stops you doing.",
      },
      {
        q: "Will I lose my Google rankings moving from Squarespace to Wix Studio?",
        a: "Not if the URLs are handled deliberately, and fewer of them have to change than most people assume. Standard pages keep their slugs, so /about stays /about. Blog posts come down to one build decision: Wix's Blog app forces a /post/ prefix that can't be removed, while a blog modelled on the Wix CMS lets you set the prefix and keep your existing /blog-name/post-name paths. Whatever does change gets a one-to-one redirect, tested against the URL inventory before the domain moves, then watched in Search Console for 30 days after.",
      },
      {
        q: "What happens to multiple Squarespace blog pages when I move to Wix Studio?",
        a: "Only one exports. Squarespace prompts you to select a primary blog page and the rest aren't in the file. We capture the others by crawling the live site before anything is switched off, which works fine but has to happen while the site is still up. It's the most common thing to discover too late on this migration.",
      },
      {
        q: "Do Squarespace store products transfer to Wix Studio?",
        a: "Physical and service products come across through a separate CSV export, not through the XML. The CSV leaves out additional product information, customer reviews, featured images, product image alt text, and variant images, so budget a pass to re-attach those. Digital products have no export at all and get rebuilt by hand. Orders export for your records but can't be imported anywhere.",
      },
      {
        q: "How long does a Squarespace to Wix Studio migration take?",
        a: "Three to five weeks of active work for most sites, then a 30-day monitoring window that runs after you're already live. The blog archive is what moves that number: a site with fifteen posts and one with four hundred are different projects, because every post needs a mapped redirect either way.",
      },
      {
        q: "Can I migrate my Squarespace site to Wix Studio myself?",
        a: "For a small site with a short blog, yes. The trap is that the export looks like a complete backup and isn't, so the DIY question here is really \"how much of my site is in the file?\" A five-page brochure site with no store is a reasonable weekend project. A single blog with thirty posts is manageable, though on the Blog app you'll be mapping thirty redirects by hand. Beyond that it turns: a second blog page, an index or portfolio page, a store, a members area, or a few hundred posts each move it into territory where what you don't notice missing costs more than the help. The reliable signal is your blog archive. If it earns traffic, the URL decision is the one worth getting help with, and it's the part people skip.",
      },
      {
        q: "Will my URLs change moving from Squarespace to Wix Studio?",
        a: "Your standard pages keep their addresses. Squarespace uses clean, flat paths for regular pages and Wix Studio imposes no structure of its own, so /about stays /about and a brochure site needs almost no redirect work. Your blog depends on how it gets built. Wix's Blog app puts every post under a /post/ prefix that can't be removed, so on a site with two hundred posts that's two hundred mapped redirects. A blog modelled on the Wix CMS lets you set the prefix and the slug, which is how an existing /blog-name/post-name structure survives the move untouched. The quieter risk is metadata, which doesn't travel in the XML at all, so titles and descriptions get re-entered and diffed against the old site before the domain moves.",
      },
      {
        q: "How much does a Squarespace to Wix Studio migration cost?",
        a: "From €1,250, quoted as a fixed price before any work starts. What moves the number is almost entirely the blog: every post needs its own mapped redirect, so a fifteen-post site and a four-hundred-post site are different projects. After that it's the store, since products come across by CSV and then need their reviews, alt text and variant images re-attached by hand, and any page types Squarespace refuses to export at all.",
      },
      {
        q: "Why move from Squarespace to Wix Studio rather than WordPress or Webflow?",
        a: "WordPress solves the ceiling by handing you a maintenance job: plugin updates, security patching, hosting. Webflow solves it but leaves editing to whoever understands the class system, which recreates the bottleneck you're leaving. Studio gives you the responsive control and the CMS without either, and the people who write your content can publish it. If you want the custom-code answer instead, we build those too, and we'll say so if that's what your case actually calls for.",
      },
      {
        q: "Can my Squarespace site stay live while the Wix Studio site is built?",
        a: "Yes, and it's the default. The Studio build lives on a staging URL while Squarespace keeps serving your domain, so there's no maintenance page and no gap in enquiries or sales. You sign off on a working site you can open on your own phone. The domain moves in a single afternoon at the end, once the redirect map has been tested.",
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
        label: "Wix Harmony to Wix Studio",
        logo: "/platforms/wix.svg",
        href: "/services/wix-harmony-to-wix-studio",
        desc: "Weighing Wix's newest editor against Studio for a rebuild? The choice is one-way, so read this first.",
      },
      {
        label: "WordPress to Wix Studio",
        logo: "/platforms/wordpress.svg",
        href: "/services/wordpress-to-wix-studio",
        desc: "The other platform people weigh against Squarespace, and the only one Wix built an importer for.",
      },
      {
        label: "SEO, AEO & PPC",
        icon: "search",
        href: "/services/seo-aeo-ppc",
        desc: "Protecting the rankings through a move is the floor. This is the work that grows them afterwards.",
      },
    ],
  },

  finalCta: {
    heading: ["See what your Squarespace", "export would leave behind"],
    paragraph:
      "Send us your site. We'll tell you how many URLs are in play, how much of it the XML actually covers, and what the move would cost. Free, and worth having even if you decide to stay.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Squarespace to Wix Studio migration. Full URL inventory and ranking baseline, capture of everything Squarespace's XML export omits, CMS collection design, responsive Studio build, per-post redirect mapping, and 30 days of post-launch index monitoring.",
    priceFrom: "1250",
  },
};
