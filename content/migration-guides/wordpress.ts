import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/wordpress-to-wix-studio
 * Targets: wordpress to wix studio · migrate wordpress to wix · wix wordpress
 * importer · move off wordpress.
 *
 * THE THESIS: WordPress is the only platform Wix built an importer for, and it
 * only covers the blog. Wix states plainly that importing a site created
 * outside Wix isn't supported, with blog posts as the single exception. So the
 * reader who has heard "Wix imports WordPress" is half right in a way that
 * costs them: the posts come, the site doesn't, and the importer that does
 * exist drops tags, author names and comments on the way through.
 *
 * VERIFICATION STATUS (19 Aug 2026). Everything platform-side is documented and
 * linked in `sources`: WordPress's own export scope, Wix's blanket no-import
 * statement, and the blog importer's exclusion list and post limits, which Wix
 * enumerates verbatim. Nothing on this page rests on inference.
 *
 * The one row hedged rather than asserted is WooCommerce, because Wix
 * documents no product import path from WordPress either way, so the page says
 * to check rather than guessing in either direction.
 *
 * PROOF, owner-confirmed 20 Aug 2026: Techtonnik's own website was re-designed
 * and migrated from WordPress to Wix Studio, alongside the fulfilment
 * partnership. The case study card in content/case-studies.ts was reworded the
 * same day so the card and this page describe the client consistently.
 *
 * BLOG URLs, corrected 20 Aug 2026. An earlier draft claimed every WordPress
 * post URL changes. That's only true of Wix's Blog app, whose /post/ prefix
 * can't be removed. A blog modelled on the Wix CMS lets you set the dynamic
 * page prefix yourself, so existing post paths can be preserved. Wix documents
 * the collection name as "only a suggested default" prefix that can be edited.
 * The trade is real and stated on the page: the WordPress importer only loads
 * into the Blog app, so CMS means CSV import and more setup. The same
 * correction was applied to the Squarespace guide, which carried the identical
 * absolute claim.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const wordpress: MigrationGuideContent = {
  slug: "wordpress-to-wix-studio",
  publish: true,
  platform: "WordPress",
  seo: {
    title: "WordPress to Wix Studio: Migration Guide | Zenith Digital",
    description:
      "Wix imports WordPress blog posts and nothing else. What that importer takes, what it drops, what gets rebuilt, and what the move costs.",
  },

  hero: {
    name: "WordPress to Wix Studio migration",
    h1: "WordPress to Wix Studio: the complete migration guide",
    subhead:
      "Wix built an importer for WordPress and only WordPress. It covers your blog posts. Everything else, from the pages to the plugins to the theme, gets rebuilt. Here's exactly where that line falls and what it costs to cross it.",
    chips: [
      "The only platform Wix imports from",
      "Blog posts in, everything else rebuilt",
      "Fixed price before anything starts",
    ],
    ctas,
  },

  glance: {
    heading: "WordPress to Wix Studio at a glance",
    intro:
      "The short answers, before the detail. Every one of these is expanded further down the page.",
    items: [
      {
        label: "Can the design be converted?",
        value:
          "No. Wix states that importing a site created outside of Wix isn't supported, and your theme has no equivalent to convert into.",
      },
      {
        label: "What actually imports",
        value:
          "Blog posts, with their text, images, video, original dates and categories. That is the whole of the exception.",
      },
      {
        label: "What happens to your URLs",
        value:
          "Pages keep their paths, and a CMS-built blog keeps its post paths too. Wix's Blog app is the one that forces a /post/ prefix.",
      },
      {
        label: "What it costs",
        value: "From €1,750, quoted as a fixed price once the page and post count is known.",
      },
      {
        label: "How long it takes",
        value: "Two to five weeks, plus 30 days of index monitoring after launch.",
      },
      {
        label: "DIY difficulty",
        value:
          "High. The importer's success is misleading: the blog arrives and the rest of the site quietly doesn't.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "WordPress problems are rarely design problems. They're maintenance problems, and they arrive on a schedule nobody chose. These are the ones that stop.",
    items: [
      {
        title: "The update treadmill stops",
        body: "No plugin updates that break a page on a Tuesday, no PHP version deadlines, no core release you postpone because the last one took the checkout down. Wix maintains the platform underneath you.",
      },
      {
        title: "Security stops being your job",
        body: "Most WordPress sites are compromised through an out-of-date plugin rather than the core. Removing the plugin layer removes the surface, and the patching schedule with it.",
      },
      {
        title: "One bill instead of five",
        body: "Hosting, backups, a security plugin, a page builder licence and a forms add-on collapse into a single subscription, and nothing expires quietly in the background.",
      },
      {
        title: "Nobody needs a developer to publish",
        body: "Studio's CMS handles the repeating content that custom post types and a page builder were doing, and the people who write your content can put it live themselves.",
      },
      {
        title: "The site stops depending on one person",
        body: "WordPress installs accumulate decisions only whoever built them can explain. A Studio build is editable by anyone with access, which is usually the real reason a business is stuck.",
      },
      {
        title: "Custom work still possible when you need it",
        body: "Dev mode gives you a proper code environment with npm packages, so leaving WordPress doesn't mean accepting a ceiling. It means choosing when to write code rather than being forced to.",
      },
    ],
  },

  fit: {
    heading: "Who should move, and who shouldn't",
    intro:
      "WordPress is genuinely better at some things, and saying so is more useful than pretending otherwise.",
    goodFit: [
      "You're paying for hosting, backups, security and a page builder, and none of it makes the site better.",
      "Plugin updates have broken something more than once and nobody wants to run them.",
      "Publishing a page means asking a developer, because the theme or builder needs handling.",
      "The site is a brochure, a blog and some forms, and the WordPress underneath it is overkill.",
    ],
    notAFit: [
      "You run a large WooCommerce store with complex fulfilment or subscriptions.",
      "Your site runs on custom post types and custom fields that only make sense inside WordPress.",
      "You have a developer on the team who is happy maintaining it.",
      "You need a plugin with no Wix equivalent and the plugin is the reason the business works.",
    ],
    footnote:
      "One distinction worth holding onto: a redesign changes how the site looks, a migration moves it while preserving the URLs, content and search visibility the business already depends on. Leaving WordPress is usually both, and the migration half is what stops the redesign undoing years of published work.",
  },

  transfers: {
    heading: "What carries across, and what gets rebuilt",
    intro:
      "Wix enumerates what its WordPress importer takes and what it leaves, which makes this table unusually exact. Starting with the good news.",
    rows: [
      {
        item: "Blog post text, images and video",
        status: "carries",
        note: "Wix's importer brings post content across with its images, video, original publish dates and any alt text you had entered.",
      },
      {
        item: "Blog categories",
        status: "carries",
        note: "Categories migrate and stay linked to their posts, which is the one taxonomy that survives the trip.",
      },
      {
        item: "Your domain",
        status: "carries",
        note: "Points at the new site with no registrar transfer, so the WordPress site keeps serving traffic until the afternoon you cut over.",
      },
      {
        item: "Static page content",
        status: "rebuilt",
        note: "The importer covers blog posts only, so About, Services and every other page is rebuilt with its copy moved across by hand.",
      },
      {
        item: "Media library",
        status: "rebuilt",
        note: "The WordPress export file references media rather than containing it, so anything outside a blog post is pulled down and re-uploaded.",
      },
      {
        item: "Custom post types and custom fields",
        status: "rebuilt",
        note: "They're in the WordPress export as data but nothing renders them on the other side, so they're remodelled as Wix CMS collections.",
      },
      {
        item: "SEO titles, descriptions and schema",
        status: "rebuilt",
        note: "Yoast or Rank Math settings live in the plugin rather than the post, so they're re-entered on the new site and diffed before cutover.",
      },
      {
        item: "Post formatting",
        status: "rebuilt",
        note: "Wix says some but possibly not all of your formatting survives the import, so posts get a manual pass rather than a spot check.",
      },
      {
        item: "Blog post URLs",
        status: "rebuilt",
        note: "Wix's Blog app forces a /post/ prefix that can't be removed, but a CMS-built blog lets you set the prefix yourself, so your existing post paths can be kept exactly.",
      },
      {
        item: "Contact forms",
        status: "replaced",
        note: "Wix names contact forms in the importer's exclusion list, so forms are rebuilt natively and pointed at the same destinations.",
      },
      {
        item: "Plugin functionality",
        status: "replaced",
        note: "Bookings, memberships, events and SEO tooling exist as native Wix features, so the job is matching behaviour rather than porting code.",
      },
      {
        item: "WooCommerce",
        status: "replaced",
        note: "Wix Stores covers the same ground but no WordPress product import path is documented, so check what your catalogue export gives you before planning around it.",
      },
      {
        item: "Tags, author names and comments",
        status: "lost",
        note: "Wix lists all three as excluded from the import, so tags go, every post arrives under your name, and comments stay on the old site.",
      },
      {
        item: "Custom code and PDFs",
        status: "lost",
        note: "Manually inserted HTML and CSS snippets, custom plugins, and attached documents like PDFs are all named exclusions and get re-added deliberately.",
      },
      {
        item: "Drafts and scheduled posts",
        status: "lost",
        note: "Only published posts import, and password-protected ones need unlocking first, so anything unpublished is copied across manually.",
      },
      {
        item: "Your theme",
        status: "lost",
        note: "Nothing about a WordPress theme survives, and that's the point of moving: the rebuild is what removes the layer you were maintaining.",
      },
    ],
    footnote:
      "The pattern underneath the rows: your writing moves, the machinery that displayed it doesn't, and the taxonomy around it is thinner on arrival than it looks.",
    cta: {
      heading: "Not sure which of these apply to your site?",
      paragraph:
        "Send us the URL. We'll count your posts and pages, list the plugins doing real work, and tell you which rows above you actually need to care about.",
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
      "Seven stages, and your WordPress site keeps serving traffic through all of them.",
    items: [
      {
        title: "Crawl the live site, not the export",
        navLabel: "Crawl first",
        duration: "1 to 2 days",
        body: "The export file is a content dump, not an inventory. What matters is which URLs earn, and only the live site tells you that.",
        lead: "What the crawl captures:",
        points: [
          {
            label: "Every indexable URL with its performance",
            body: "Impressions, clicks and position from Search Console over the last twelve months.",
          },
          {
            label: "Current metadata per page",
            body: "Titles, descriptions and canonicals, because Yoast settings don't travel with the content.",
          },
          {
            label: "The plugin inventory",
            body: "Which plugins are load-bearing and which have been dormant for two years.",
          },
        ],
      },
      {
        title: "Decide what the plugins were actually doing",
        navLabel: "Plugin audit",
        duration: "1 to 2 days",
        body: "Most WordPress sites run more plugins than anyone can account for. The job is separating function from accumulation.",
        lead: "Each one lands in a bucket:",
        points: [
          {
            label: "Native in Wix",
            body: "Forms, SEO controls, bookings, memberships and analytics all exist without an add-on.",
          },
          {
            label: "Rebuilt as a CMS collection",
            body: "Anything a custom post type or directory plugin was holding.",
          },
          {
            label: "Genuinely gone",
            body: "If something is doing work Wix can't, you hear it at this stage rather than after the invoice.",
          },
        ],
      },
      {
        title: "Model the structure and the CMS",
        navLabel: "Structure and CMS",
        duration: "2 to 4 days",
        body: "Repeating content gets defined once so publishing becomes a form rather than a build. This is the stage that decides whether the move pays back.",
        lead: "Where the gain comes from:",
        points: [
          {
            label: "Custom post types become collections",
            body: "Define the pattern once and the twentieth entry costs what the second did.",
          },
          {
            label: "Where the blog lives gets decided here",
            body: "Wix's Blog app or a CMS collection, and it's the choice that sets whether your post URLs survive.",
          },
          {
            label: "The page hierarchy gets revisited",
            body: "Years of WordPress sites accumulate pages nobody would create today.",
          },
          {
            label: "Global styles set before anything is built",
            body: "So a brand change later is one edit rather than forty.",
          },
        ],
      },
      {
        title: "Run the blog import",
        navLabel: "The blog import",
        duration: "1 day",
        body: "The one automated part, and it only loads into Wix's Blog app. Up to 5,000 posts per run, against an overall limit of 100,000. A CMS blog takes the same content by CSV instead, which is more setup and keeps your URLs.",
        lead: "What happens around it:",
        points: [
          {
            label: "Formatting gets checked post by post",
            body: "Wix warns that some but possibly not all formatting survives, so this is a pass rather than a spot check.",
          },
          {
            label: "Authors and tags get re-applied",
            body: "Both are excluded from the import, so multi-author blogs need reassigning by hand.",
          },
          {
            label: "Drafts and protected posts move manually",
            body: "Only published, unprotected posts qualify for the importer.",
          },
        ],
      },
      {
        title: "Build the rest in Studio",
        navLabel: "The Studio build",
        duration: "1 to 3 weeks",
        body: "Every page the importer didn't cover, built responsively with the collections populated and the forms rebuilt.",
        lead: "What you get to review:",
        points: [
          {
            label: "A staging site on a real URL",
            body: "Reviewed on your own phone, not as a slide of screenshots.",
          },
          {
            label: "Real content, not placeholder",
            body: "Collections are populated during the build so you're seeing your actual pages.",
          },
        ],
      },
      {
        title: "Map the redirects, then cut over",
        navLabel: "Redirects and cutover",
        duration: "2 to 4 days",
        body: "How many URLs change was decided back at the build stage, so this is where that decision gets paid for. Whatever moved gets a mapped redirect, uploaded and tested before the domain does.",
        lead: "The sequence:",
        points: [
          {
            label: "Post by post, never a blanket rule",
            body: "Where post URLs do change, pointing the whole blog at one index page turns every ranking post into a bounce.",
          },
          {
            label: "Uploaded in CSV batches",
            body: "Wix takes up to 500 redirect rows per file, which is how a few hundred posts get loaded.",
          },
          {
            label: "Tested against the crawl inventory",
            body: "Before the domain points anywhere, so no changed URL ever serves a 404.",
          },
        ],
      },
      {
        title: "Watch it land",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Coverage and impressions checked daily for the first fortnight, then weekly. This is the stage most quotes leave out.",
        lead: "What's monitored:",
        points: [
          {
            label: "Index coverage",
            body: "Anything that drops out or starts 404ing gets fixed inside the window at no extra cost, against a price fixed before the work began.",
          },
          {
            label: "Position against the baseline",
            body: "Compared with the stage-one crawl, so drift is caught in week two rather than month three.",
          },
        ],
      },
    ],
  },

  auditCta: {
    heading: "Not sure how much of your site the importer would actually take?",
    paragraph:
      "Send us the URL. We'll tell you how many posts would import cleanly, which plugins are doing real work, and what the rest would cost to rebuild.",
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
      "The parts that cost people money here aren't the rebuild. They're the blog import that looked like it worked, the plugins nobody audited before quoting, and the post URLs redirected to a single index page.",
    workSlugs: ["techtonnik"],
  },

  sources: {
    heading: "Sources",
    intro:
      "Every platform limit on this page links to the vendor's own documentation, so you can check it rather than take our word for it.",
    verified: "2026-08-19",
    items: [
      {
        label: "Wix: Request: Importing a Site Created Outside of Wix",
        href: "https://support.wix.com/en/article/request-importing-a-site-created-outside-of-wix",
        note: "Wix states importing a site created outside of Wix is not supported, with WordPress blog posts as the exception.",
      },
      {
        label: "Wix Blog: Importing Blog Posts from WordPress to the Wix Blog",
        href: "https://support.wix.com/en/article/wix-blog-importing-blog-posts-from-wordpress-to-the-wix-blog",
        note: "What the importer takes, the exclusion list covering forms, authors, tags, plugins, code, PDFs and comments, and the 5,000 per run limit.",
      },
      {
        label: "WordPress: Tools Export screen",
        href: "https://wordpress.org/documentation/article/tools-export-screen/",
        note: "The WXR file carries posts, pages, custom post types, comments, custom fields, taxonomies, users and menus, but not media, themes or plugins.",
      },
      {
        label: "Wix Blog: About blog post web addresses",
        href: "https://support.wix.com/en/article/wix-blog-about-blog-post-web-addresses-urls",
        note: "The /post/ prefix on Wix Blog URLs, which can't be removed, and why the build decision below matters.",
      },
      {
        label: "Wix: Making dynamic page URLs meaningful with prefixes",
        href: "https://dev.wix.com/docs/develop-websites/articles/databases/wix-data/dynamic-pages/making-dynamic-page-urls-meaningful-with-prefixes",
        note: "The collection name is only a suggested default prefix, and it can be edited, which is how a CMS-built blog keeps existing WordPress post paths.",
      },
      {
        label: "Wix: Importing or exporting URL redirects with a CSV file",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import, up to 500 rows at a time.",
      },
      {
        label: "Wix CMS: Importing content into a collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a collection, capped at 50,000 items per file.",
      },
      {
        label: "Google Search Central: Site moves with URL changes",
        href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
        note: "Google's guidance on URL-changing moves, and its statement that following it doesn't guarantee crawling, indexing or ranking.",
      },
    ],
  },

  faq: {
    heading: ["WordPress to Wix Studio,", "answered"],
    subhead: "The questions that come up on every one of these calls.",
    ctas,
    items: [
      {
        q: "Can I import my WordPress site into Wix Studio?",
        a: "Only the blog. Wix states that importing a site created outside of Wix isn't supported, and names WordPress blog posts as the single exception. The importer brings post text, images, video, original dates and categories across. Your pages, theme, plugins and everything they powered are rebuilt in Studio. So the honest answer is that WordPress is the one platform Wix will meet you halfway on, and halfway is the blog.",
      },
      {
        q: "What does the Wix WordPress importer leave behind?",
        a: "Wix lists the exclusions explicitly: contact forms, author names, tags, custom plugins, manually inserted HTML and CSS, PDFs and other attached documents, and comments. It also imports published posts only, so drafts and scheduled posts are copied manually, and password-protected posts need unlocking first. Wix also warns that some but possibly not all of your formatting survives, which is why posts get checked individually rather than sampled.",
      },
      {
        q: "Will I lose my Google rankings moving from WordPress to Wix Studio?",
        a: "Not if the URLs are handled deliberately, and on this move most of them don't have to change at all. Static pages keep their paths. Blog posts depend on one build decision: Wix's Blog app puts every post under a /post/ prefix that can't be removed, while a blog built on the CMS lets you set the prefix yourself, so a WordPress site already publishing at /blog/post-name can keep exactly that. The quieter risk is metadata: Yoast and Rank Math settings live in the plugin, not the post, so titles and descriptions get re-entered and diffed against the crawl before the domain moves.",
      },
      {
        q: "Will my URLs change moving from WordPress to Wix Studio?",
        a: "Mostly not, and where they do it's a choice rather than a constraint. Wix Studio imposes no path structure on standard pages, so /about stays /about. Your blog comes down to how it gets built: Wix's Blog app forces every post under a /post/ prefix, so a site with three hundred posts needs three hundred mapped redirects, while a CMS-driven blog lets you set the prefix and the slug, which is how an existing /blog/post-name structure survives the move untouched. Where redirects are needed they get mapped post by post, never a blanket rule pointing the old blog at the new index, which technically avoids 404s and quietly converts every ranking post into a bounce.",
      },
      {
        q: "How much does a WordPress to Wix Studio migration cost?",
        a: "From €1,750, quoted as a fixed price before any work starts. The number moves on your post count first, since every post gets a formatting pass after import, then on how many plugins were doing real work that has to be rebuilt rather than replaced, and whether custom post types need modelling as CMS collections. A five-page brochure site with a dormant blog sits at the bottom of that range.",
      },
      {
        q: "How long does a WordPress to Wix Studio migration take?",
        a: "Two to five weeks from kickoff to launch for most sites, then a 30-day monitoring window that runs while you're already live. The blog archive drives the number: the import itself is a day, but checking formatting across four hundred posts, one by one, is not. Your WordPress site keeps serving traffic throughout.",
      },
      {
        q: "Can I migrate my WordPress site to Wix Studio myself?",
        a: "For a small site, yes, and the blog importer genuinely helps. The trap is that it succeeds loudly while the rest of the site quietly doesn't come. A five-page site with a short blog is a reasonable weekend project. It turns when you have a few hundred posts carrying organic traffic, custom post types holding real content, WooCommerce, or plugins doing work you'd have to replace rather than drop. The reliable signal is your organic traffic: if the blog earns enquiries, the risk isn't the rebuild, it's the redirect map you can't check afterwards.",
      },
      {
        q: "What happens to my WordPress plugins on Wix Studio?",
        a: "Most of what plugins were doing is native in Wix, so the work is matching behaviour rather than porting code. Forms, SEO controls, bookings, memberships, galleries and analytics all exist without an add-on. What needs a decision is anything truly custom: a plugin doing something Wix has no equivalent for is the one thing that can make this move the wrong call, and you hear that during the audit rather than after the invoice.",
      },
      {
        q: "Can I move WooCommerce to Wix Studio?",
        a: "Wix Stores covers the same ground, but Wix documents no product import path from WordPress, so this is the row to check against your own catalogue before planning around it. Send us a product export before we quote. For a small catalogue this is straightforward. For a large store with variants, subscriptions or complex fulfilment, WooCommerce may be the reason to stay, and we'll say so.",
      },
      {
        q: "Can my WordPress site stay live while the Wix Studio site is built?",
        a: "Yes, and it should. The Studio build lives on its own staging URL while WordPress keeps serving your domain, so there's no maintenance page and no gap in enquiries. You sign off on a working site you can open on your own phone. The domain moves in a single afternoon at the end, once the redirect map has been uploaded and tested.",
      },
    ],
  },

  related: {
    heading: "Keep reading",
    intro:
      "This guide covers one source platform. The hub covers the rest, and the sibling guides go equally deep on theirs.",
    items: [
      {
        label: "Website migration",
        href: "/services/website-migration",
        desc: "The hub: what a migration to Wix Studio covers, what it costs, and every platform we move sites from.",
      },
      {
        label: "Squarespace to Wix Studio",
        href: "/services/squarespace-to-wix-studio",
        desc: "What the Squarespace export actually contains, and the page types it silently leaves behind.",
      },
      {
        label: "Wix Classic to Wix Studio",
        href: "/services/wix-classic-to-wix-studio",
        desc: "The Wix-to-Wix move, and the two documented routes Wix never reconciles.",
      },
      {
        label: "Wix Studio development",
        href: "/services/wix-studio-development",
        desc: "Custom code on Wix Studio, for the plugin functionality that has no native equivalent.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what the importer", "would actually take"],
    paragraph:
      "Send us your WordPress site. We'll tell you how many posts import cleanly, which plugins are load-bearing, and what the rebuild would cost. Free, and useful even if you decide to stay put.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "WordPress to Wix Studio migration. Blog import, plugin audit, CMS collection modelling, responsive Studio build, URL and redirect mapping, and 30 days of post-launch index monitoring. From a Wix Legend Partner.",
    priceFrom: "1750",
  },
};
