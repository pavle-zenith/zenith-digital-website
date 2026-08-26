import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/webflow-to-wix-studio
 * Targets: webflow to wix studio · migrate off webflow · webflow editor
 * deprecated · webflow alternative for clients · export webflow site to wix.
 *
 * THE THESIS: on 4 August 2026 Webflow removed the legacy Editor, and content
 * editing moved into the Designer behind seats and roles. So the question that
 * decides this migration isn't whether Webflow builds well. It builds very
 * well. It's who on your team can safely change a page now, and what that
 * access costs per person. Every sibling guide argues capability. This one
 * argues access, and no competitor page has caught up to the date yet.
 *
 * VERIFICATION STATUS (20 Aug 2026). Everything platform-side is quoted from
 * Webflow's own help centre and linked in `sources`. The load-bearing ones:
 * "Starting August 4, 2026, the legacy Editor will no longer be available",
 * the code-export exclusion list, and the CMS export warning that image and
 * file URLs "point back to the site you exported the Collection from".
 *
 * Two Webflow deprecations already landed and both are cited as fact, not
 * speculation: User Accounts (formerly Memberships) sunset on 29 January 2026
 * with Webflow stating the data "will not be migrated to the CMS", and the
 * legacy Editor on 4 August 2026. Webflow's deprecation FAQ is still written
 * future-facing because it was last updated 2 July 2026; the dates have since
 * passed. Re-read it before the next edit in case the wording changed.
 *
 * NOT DOCUMENTED, and hedged on the page rather than asserted: whether 301
 * redirects survive code export, which Workspace tiers unlock code export,
 * which fields the Ecommerce orders CSV contains, and whether User Accounts
 * passwords were ever included in the user CSV. Each is written as "check your
 * account" instead of guessed.
 *
 * NO PROOF BLOCK. Owner confirmed Webflow is unproven for now. Borrowing
 * another platform's client here would discredit the sourcing that makes this
 * page worth reading.
 *
 * SIGNED OFF by the owner 20 Aug 2026 and published. The three hedged rows
 * (orders CSV fields, code-export redirect behaviour, Workspace tier gating)
 * ship as "check your account" rather than as claims, which is the intended
 * state, not an outstanding task.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const webflow: MigrationGuideContent = {
  slug: "webflow-to-wix-studio",
  publish: true,
  platform: "Webflow",
  seo: {
    title: "Webflow to Wix Studio | Migration Guide | Zenith Digital",
    description:
      "Webflow retired the legacy Editor in August 2026 and content editing now sits behind seats and roles. What exports, what doesn't, and what a move to Wix Studio involves. From €1,250.",
  },

  hero: {
    name: "Webflow to Wix Studio migration",
    h1: "Webflow to Wix Studio: the complete migration guide",
    subhead:
      "Webflow builds beautifully. The question most teams land on isn't build quality, it's who can safely change a page. On 4 August 2026 Webflow removed the legacy Editor and moved content editing into the Designer behind seats and roles. Here's what moves, what doesn't, and what it costs.",
    chips: [
      "Every claim linked to Webflow's docs",
      "CMS, products and redirects all export",
      "Your editors don't need a seat",
    ],
    ctas,
  },

  glance: {
    heading: "Webflow to Wix Studio, at a glance",
    intro:
      "The short answers. Every platform limit below is Webflow's own published position, linked at the bottom of the page.",
    items: [
      {
        label: "Can the design be converted",
        value:
          "No. Wix doesn't import sites built elsewhere, and Webflow's code export produces HTML and CSS, not a Studio site. The design gets rebuilt.",
      },
      {
        label: "What comes with you",
        value:
          "More than on most moves. CMS collections, products, orders, form submissions and your entire 301 redirect list all export to CSV.",
      },
      {
        label: "What happens to your URLs",
        value:
          "You keep them. Webflow exports every redirect you've already built, and Wix Studio imposes no path structure on standard pages.",
      },
      {
        label: "What it costs",
        value:
          "From €1,250, quoted as a fixed price once the page count and CMS collections are known.",
      },
      {
        label: "How long it takes",
        value:
          "Two to five weeks, plus 30 days of index monitoring after launch.",
      },
      {
        label: "DIY difficulty",
        value:
          "The exports are the easy part. The trap is that your CMS images export as Webflow URLs that break the day you cancel the site.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "Webflow isn't a design problem. It's one of the best design tools there is. The reasons teams leave are about access, cost per person, and how much of the stack they're now maintaining around it.",
    items: [
      {
        title: "Editing stops being a permissions question",
        body: "Webflow retired the legacy Editor on 4 August 2026 and content editing now lives in the Designer under roles like Content editor and Marketer. In Wix Studio the person who writes the copy opens the site and changes the copy. There's no role matrix to consult first.",
      },
      {
        title: "No seat maths",
        body: "Webflow's new editing model is built on client seats and limited seats, so the number of people who can touch the site is a line item. Adding a fifth person to your Wix Studio site is a decision about trust, not budget.",
      },
      {
        title: "Forms work without wiring in a third party",
        body: "Webflow states that form submissions aren't processed on exported sites, and that content editors can view and export submissions but can't edit form settings. On Wix, forms, submissions, notifications and follow-up automations are native and editable by the people who need them.",
      },
      {
        title: "One platform instead of a growing stack",
        body: "When Webflow sunset User Accounts in January 2026 it pointed customers at Outseta and Memberstack. Members, bookings, a store and email all ship inside Wix Studio, so gated content doesn't mean a second vendor and a second bill.",
      },
      {
        title: "Structural changes don't need the person who built it",
        body: "Content editors can't rename pages, change slugs, add custom code or create CMS collections. On a Studio site those are ordinary admin tasks, which is the difference between a site your team runs and a site that needs a retainer to change.",
      },
      {
        title: "Animation that survives the handover",
        body: "Webflow interactions live in the JavaScript bundle and break if it's removed. Studio's animations are native and editable in the same interface as everything else, so the motion doesn't become the thing nobody dares touch.",
      },
    ],
  },

  fit: {
    heading: "Who this page is for",
    intro:
      "This is the migration where the honest answer is most often 'stay'. Webflow is genuinely good, and the reason to leave is usually organisational rather than technical.",
    goodFit: [
      "The legacy Editor change broke how your team publishes.",
      "Editing the site means paying for another seat, or asking the agency that built it.",
      "You're maintaining Memberstack or Outseta because Webflow retired User Accounts.",
      "Nobody in-house is confident in the Designer, and the person who was has left.",
      "You're paying a Workspace plan, a Site plan and two add-ons for a brochure site.",
      "The May 2026 plan restructure moved your bill and you're rethinking the whole thing.",
    ],
    notAFit: [
      "You have a designer in-house who works in Webflow every week.",
      "The animation work is the product, not decoration around it.",
      "You're on Enterprise with Localize, Optimize or Analyze doing real work.",
      "Your site is a small brochure that nobody needs to edit often.",
    ],
    footnote:
      "Worth saying plainly: nothing here is an argument that Webflow builds worse sites. It doesn't. The move is worth making when the cost of changing the site has drifted away from the value of having built it well.",
  },

  transfers: {
    heading: "What moves from Webflow to Wix Studio",
    intro:
      "Better news than most migrations, because Webflow exports almost all of your content as CSV and hands you your redirect map on the way out. What doesn't come is the build itself: Wix states that importing a site created outside of Wix isn't supported, so the design is rebuilt.",
    rows: [
      {
        item: "Your domain",
        icon: "globe",
        status: "carries",
        note: "Point it or transfer it, with no change to the content behind it and no registrar drama either way.",
      },
      {
        item: "Your 301 redirect map",
        icon: "redirect",
        status: "carries",
        note: "Webflow exports every redirect you've already built to CSV, which means years of accumulated URL history arrives as a file rather than as archaeology.",
      },
      {
        item: "Form submissions to date",
        icon: "form",
        status: "carries",
        note: "Webflow lists pre-existing submissions as separately exportable, so pull them before anything is cancelled and your enquiry history survives the move.",
      },
      {
        item: "CMS collection content",
        icon: "server",
        status: "rebuilt",
        note: "Each collection exports to its own CSV with rich text as HTML and multi-reference fields as comma-separated text, then imports into a Wix CMS collection modelled to match.",
      },
      {
        item: "CMS images and files",
        icon: "image",
        status: "rebuilt",
        note: "The one that catches people: Webflow warns that image and file URLs in a CMS export point back at the original site, so they break the moment you delete it and the files have to be pulled down first.",
      },
      {
        item: "Products and variants",
        icon: "cart",
        status: "rebuilt",
        note: "Webflow exports products, variants and categories to CSV using its own import schema, which maps cleanly onto Wix Stores once the fields are matched.",
      },
      {
        item: "Orders and customer history",
        icon: "receipt",
        status: "rebuilt",
        note: "Orders back up to CSV, though Webflow doesn't document which fields the file contains and there's no separate customer export, so check what yours actually gives you before planning around it.",
      },
      {
        item: "Page copy and layout",
        icon: "type",
        status: "rebuilt",
        note: "Copy moves as content and the design is rebuilt in Studio, which is where a Webflow site's structure usually gets tightened rather than reproduced.",
      },
      {
        item: "SEO titles, descriptions and Open Graph",
        icon: "search",
        status: "rebuilt",
        note: "These live in Webflow's page settings rather than in any export, so they get pulled from a crawl and re-entered, then diffed against the old site before the domain moves.",
      },
      {
        item: "Forms",
        icon: "form",
        status: "replaced",
        note: "Rebuilt as native Wix forms, which is an upgrade on the exported-site situation where Webflow states submissions aren't processed at all.",
      },
      {
        item: "Interactions and animations",
        icon: "puzzle",
        status: "replaced",
        note: "Webflow's interactions depend on its own JavaScript bundle, so the motion gets rebuilt with Studio's native animations rather than ported.",
      },
      {
        item: "Site search and password protection",
        icon: "lock",
        status: "replaced",
        note: "Both are Webflow-hosting features that it documents as non-functional once a site leaves, and both have native Wix equivalents configured during the build.",
      },
      {
        item: "User Accounts and gated content",
        icon: "users",
        status: "lost",
        note: "Webflow sunset User Accounts on 29 January 2026 and stated the data would not be migrated to the CMS, so most teams arriving here are already on Memberstack or Outseta and moving off it too.",
      },
      {
        item: "Your class system and custom code",
        icon: "code",
        status: "lost",
        note: "The class naming, the style system and any custom code embeds don't transfer, and Webflow's own export note is that manual edits to exported files may break its components.",
      },
      {
        item: "The Webflow site itself",
        icon: "ban",
        status: "lost",
        note: "Wix states that importing a site created outside of Wix isn't supported, so this is a rebuild in Studio rather than a conversion of what you have.",
      },
    ],
    footnote:
      "The shape of it: your content and your URL history travel unusually well, and the build doesn't travel at all. That's a better trade than it sounds, because the build is the part you were paying someone else to change.",
    cta: {
      heading: "Already started moving off Webflow and stalled?",
      paragraph:
        "You don't have to restart. Send us the exports you've pulled and the Studio site you've begun, and we'll finish the CMS modelling, the redirects and the cutover.",
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
      "Seven stages. Your Webflow site keeps serving traffic through all of them, and the order matters more here than on any other platform because two of Webflow's exports stop working once the site is gone.",
    items: [
      {
        title: "Crawl the live site and count the seats",
        navLabel: "Crawl and audit",
        duration: "1 to 2 days",
        body: "Two inventories, not one. What's on the site, and what it currently costs to change it.",
        lead: "What gets captured:",
        points: [
          {
            label: "Every indexable URL with its performance",
            body: "Pulled from a crawl and Search Console together, so the redirect map is built from what actually earns traffic.",
          },
          {
            label: "Current metadata per page",
            body: "Titles, descriptions and Open Graph live in Webflow's page settings and appear in no export, so they come from the crawl.",
          },
          {
            label: "Who can edit, and on what plan",
            body: "The Workspace plan, the seats in use and the roles assigned. This is usually where the real number behind the move shows up.",
          },
        ],
      },
      {
        title: "Export everything while the site is still alive",
        navLabel: "Export while it's live",
        duration: "1 day",
        body: "The stage people get wrong, and it's unrecoverable. Webflow's CMS export writes image and file links that point back at the site you exported from, so they die with it.",
        lead: "What comes out, in this order:",
        points: [
          {
            label: "Every CMS collection, one CSV each",
            body: "Rich text arrives as HTML and multi-reference fields as comma-separated text, both of which need handling on import rather than pasting.",
          },
          {
            label: "The media, downloaded by hand",
            body: "Webflow documents no bulk asset download, so CMS images get pulled before anything is cancelled and re-uploaded to Wix.",
          },
          {
            label: "Redirects, products, orders and submissions",
            body: "All four export to CSV. The redirect file is the valuable one, because it's the URL history you'd otherwise have to reconstruct.",
          },
          {
            label: "Nothing gets cancelled yet",
            body: "The Webflow site stays live and paid until the new one is serving the domain, which is the cheapest insurance on this project.",
          },
        ],
      },
      {
        title: "Model the CMS in Wix",
        navLabel: "Structure and CMS",
        duration: "2 to 4 days",
        body: "Webflow collections and Wix collections are the same idea, so this is a translation rather than a redesign. It's also the moment to fix whatever the original modelling got wrong.",
        lead: "What happens here:",
        points: [
          {
            label: "Collections mapped field by field",
            body: "Wix imports up to 50,000 items per CSV, so volume is rarely the constraint. Field types and reference fields are.",
          },
          {
            label: "References rebuilt as real relationships",
            body: "Comma-separated text out of Webflow becomes proper reference fields in Wix, or the connections you designed are quietly lost.",
          },
          {
            label: "URL structure decided before anything is built",
            body: "Wix's dynamic page prefix is editable, so existing collection page paths can be preserved rather than redirected.",
          },
        ],
      },
      {
        title: "Rebuild the design in Studio",
        navLabel: "The Studio build",
        duration: "1 to 3 weeks",
        body: "Built on a staging URL while Webflow keeps serving your domain. Webflow sites tend to be well designed, so this is usually a faithful rebuild rather than a redesign.",
        lead: "What the build covers:",
        points: [
          {
            label: "A real design system, not a class list",
            body: "Studio's breakpoints and global styles do the job Webflow's class naming was doing, and they're legible to whoever inherits the site.",
          },
          {
            label: "Collections wired to dynamic pages",
            body: "The imported content stops being rows in a table and starts being pages that publish themselves.",
          },
          {
            label: "Real content from day one",
            body: "The imported CMS content goes in during the build, so what you sign off on is the site, not a placeholder version of it.",
          },
        ],
      },
      {
        title: "Rebuild forms, motion and anything gated",
        navLabel: "Forms and motion",
        duration: "2 to 4 days",
        body: "The three things that don't port. Each gets rebuilt natively rather than approximated, and each is tested before the domain moves.",
        lead: "What gets rebuilt:",
        points: [
          {
            label: "Forms, with their notifications and automations",
            body: "Rebuilt native, so submissions land in the same place your team already works rather than in a third-party inbox.",
          },
          {
            label: "Interactions, in Studio's own animation tools",
            body: "Matched to the original intent rather than copied frame for frame, and editable afterwards by someone who isn't a developer.",
          },
          {
            label: "Members and gated content",
            body: "If you moved to Memberstack or Outseta after the User Accounts sunset, this is where that subscription stops being necessary.",
          },
        ],
      },
      {
        title: "Map the redirects, then cut over",
        navLabel: "Redirects and cutover",
        duration: "2 to 3 days",
        body: "Shorter than most migrations because Webflow handed you the existing map. It still gets tested against the crawl before the domain moves.",
        lead: "The sequence:",
        points: [
          {
            label: "Your Webflow redirects merged with the new ones",
            body: "Years of accumulated history plus whatever this move changes, reconciled into one file rather than two.",
          },
          {
            label: "Uploaded in CSV batches",
            body: "Wix takes up to 500 redirect rows per file, which is how a long history gets loaded.",
          },
          {
            label: "Tested before the domain points anywhere",
            body: "So no changed URL ever serves a 404, and the old site stays live until the new one answers correctly.",
          },
        ],
      },
      {
        title: "Watch it land",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Daily at first, then weekly. The Webflow site can be cancelled once this window opens clean, and not before.",
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
    heading: "Not sure whether leaving Webflow is worth it?",
    paragraph:
      "Send us the URL and your current plan. We'll tell you what it would take to move, what it would cost, and whether the seat change is actually worth rebuilding over. Often it isn't.",
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
      "Every Webflow limit on this page is quoted from Webflow's own documentation, linked so you can check it rather than take our word for it.",
    verified: "2026-08-20",
    items: [
      {
        label: "Webflow: Legacy Editor deprecation FAQ",
        href: "https://help.webflow.com/hc/en-us/articles/48412420902675-Legacy-Editor-deprecation-FAQ",
        note: "The change this page is built around: starting 4 August 2026 the legacy Editor is no longer available, replaced by client and limited seats with Marketer, Content editor and Reviewer roles.",
      },
      {
        label: "Webflow: Edit site content as a content editor",
        href: "https://help.webflow.com/hc/en-us/articles/33961251014931-Edit-site-content-as-a-content-editor",
        note: "What a content editor can't do: design changes, page names and slugs, custom code, CMS settings, or creating collections.",
      },
      {
        label: "Webflow: How do I export my Webflow site code?",
        href: "https://help.webflow.com/hc/en-us/articles/33961386739347-How-do-I-export-my-Webflow-site-code",
        note: "Code export is a Workspace plan feature, and CMS, User Accounts, Ecommerce, form processing, site search, password protection and localized content are all excluded from it.",
      },
      {
        label: "Webflow: Import and export Collection content",
        href: "https://help.webflow.com/hc/en-us/articles/33961290794771-Import-export-Collection-content",
        note: "The CMS export format, and the warning that image and file URLs point back to the site you exported from and break if you delete it.",
      },
      {
        label: "Webflow: Collect form submissions on exported sites",
        href: "https://help.webflow.com/hc/en-us/articles/33961341546899-Collect-form-submissions-on-exported-sites",
        note: "Webflow doesn't process form submissions on exported sites, so a third-party form service has to be wired in.",
      },
      {
        label: "Webflow: User Accounts sunset",
        href: "https://help.webflow.com/hc/en-us/articles/36046006227731-User-Accounts-sunset",
        note: "User Accounts ended on 29 January 2026, with Webflow stating the data would not be migrated to the CMS.",
      },
      {
        label: "Webflow: Import and export 301 redirects",
        href: "https://help.webflow.com/hc/en-us/articles/33961211526291-Import-export-301-redirects",
        note: "Redirects export to CSV, and a new import overwrites every existing redirect on the site.",
      },
      {
        label: "Webflow: Import and export Ecommerce products and variants",
        href: "https://help.webflow.com/hc/en-us/articles/33961361857811-Import-export-Ecommerce-products-and-variants",
        note: "Products, variants and categories export to CSV, with the same asset-URL warning as the CMS export.",
      },
      {
        label: "Webflow: Updated pricing and simplified plans for May 2026",
        href: "https://help.webflow.com/hc/en-us/articles/51059955082387-Updated-pricing-and-simplified-plans-for-May-2026",
        note: "The 13 May 2026 restructure: CMS and Business merged into Premium, Basic increased, and the renewal dates existing sites moved on.",
      },
      {
        label: "Wix: Request: Importing a site created outside of Wix",
        href: "https://support.wix.com/en/article/request-importing-a-site-created-outside-of-wix",
        note: "Wix states importing a site created outside of Wix is not supported, which is why this is a rebuild.",
      },
      {
        label: "Wix CMS: Importing content into a collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a Wix collection, capped at 50,000 items per file.",
      },
      {
        label: "Wix: Making dynamic page URLs meaningful with prefixes",
        href: "https://dev.wix.com/docs/develop-websites/articles/databases/wix-data/dynamic-pages/making-dynamic-page-urls-meaningful-with-prefixes",
        note: "The collection name is only a suggested default prefix and can be edited, which is how existing Webflow collection page paths are preserved.",
      },
      {
        label: "Wix: Importing or exporting URL redirects with a CSV file",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import on the Wix side, up to 500 rows at a time.",
      },
    ],
  },

  faq: {
    heading: ["Webflow to Wix Studio,", "answered from the docs"],
    subhead:
      "What people ask on these calls once they've worked out what the seat change means for their team.",
    ctas,
    items: [
      {
        q: "Can I export my Webflow site and import it into Wix Studio?",
        a: "No, and it's worth understanding why so you don't lose time trying. Webflow's code export produces HTML, CSS, JavaScript and your Assets panel images. Wix states that importing a site created outside of Wix isn't supported, so there's nothing to import that file into. Your content is a different story: CMS collections, products, orders, form submissions and your full 301 redirect list all export to CSV and all import into Wix. The design gets rebuilt, the content gets moved.",
      },
      {
        q: "What happened to the Webflow Editor, and does it affect my site?",
        a: "Webflow removed the legacy Editor on 4 August 2026. Content editing now happens inside the Designer under roles assigned to seats, with existing Editor users migrated to a free client seat or limited seat and given the Content editor role. If your team published through the old Editor and the workflow changed under them this month, that's why. It affects every Webflow site with a non-designer publishing content, and for a lot of teams it's the reason they started looking.",
      },
      {
        q: "Webflow changed its pricing in 2026. Does that make Wix Studio cheaper?",
        a: "It depends which plan you were on, and Webflow's own announcement is worth reading before you decide. From 13 May 2026 it merged the CMS and Business Site plans into a single Premium plan and, in its words, \u201cthe yearly plan is increasing to $15/month, the monthly plan increases to $25/month\u201d for Basic, with the static page limit doubling to 300. Former CMS customers pay slightly more. Former Business customers pay less at the base price but get half the bandwidth, 50GB instead of 100GB, so restoring it costs an add-on. Existing sites moved at their first renewal on or after 29 June 2026, or 16 November 2026 on Freelancer and Agency Workspaces. The bigger number is usually not the Site plan at all: it's the editor seats, since Webflow bills additional editors and content editors separately. Compare total cost of ownership rather than the headline plan price.",
      },
      {
        q: "Will I lose my Google rankings moving from Webflow to Wix Studio?",
        a: "This is the migration where you're best placed to avoid it, because Webflow hands you your own redirect map on the way out. Every 301 you've built exports to CSV, so the URL history you'd normally have to reconstruct arrives as a file. Wix Studio imposes no path structure on standard pages, so most addresses can stay identical, and CMS page paths can be preserved because Wix's dynamic page prefix is editable. The real risk is metadata: titles, descriptions and Open Graph live in Webflow's page settings and appear in no export, so they're pulled from a crawl and diffed against the new site before the domain moves.",
      },
      {
        q: "Do my Webflow URLs have to change moving to Wix Studio?",
        a: "Mostly not. Standard pages keep their paths, because neither platform forces a structure on them. Collection pages come down to how the Wix CMS is set up: the dynamic page prefix is a default you can edit, so an existing /blog/post-name or /projects/project-name structure can be carried across rather than redirected. Where something does change, it gets a mapped redirect merged into the file Webflow exported, never a blanket rule pointing an old section at a new index page.",
      },
      {
        q: "What happens to my Webflow CMS collections in Wix Studio?",
        a: "They become Wix CMS collections, and the concepts line up closely enough that this is translation rather than redesign. Each Webflow collection exports as its own CSV; Wix imports up to 50,000 items per file, so volume is rarely the issue. Two things need handling rather than pasting. Rich text exports as HTML, and multi-reference fields export as comma-separated text, which has to be rebuilt into real reference fields in Wix or the relationships you designed quietly disappear.",
      },
      {
        q: "What happens to my Webflow CMS images when I move to Wix Studio?",
        a: "This is the single most expensive mistake available on this move. Webflow states that image and file URLs in a CMS export point back to the site you exported the collection from, and that if you delete that site those assets and links break, including images inside rich text. Webflow documents no bulk asset download, so the files come down by hand before anything is cancelled. Practical rule: keep the Webflow site paid and live until the Wix site is serving your domain and the 30-day monitoring window has opened clean.",
      },
      {
        q: "Do my Webflow forms and animations work after moving to Wix Studio?",
        a: "They get rebuilt, not ported, and in the case of forms that's an improvement on what Webflow itself offers off-platform. Webflow doesn't process form submissions on exported sites and points you at a third-party form service. On Wix, forms, submissions, notifications and follow-up automations are native. Interactions depend on Webflow's own JavaScript bundle, so the motion is rebuilt with Studio's animation tools, matched to intent rather than copied frame for frame. Your existing submissions export separately and come with you.",
      },
      {
        q: "I moved to Memberstack after Webflow retired User Accounts. Does Wix Studio replace it?",
        a: "You can usually drop it. Webflow sunset User Accounts on 29 January 2026 and stated the data wouldn't be migrated to the CMS, which pushed a lot of sites onto Memberstack or Outseta. Wix has native members, gated content and access groups, so the gating gets rebuilt inside the platform and the extra subscription stops being necessary. Your member list is the part to plan for: it comes from your current provider's export, not from Webflow, so pull it before you cancel anything.",
      },
      {
        q: "How much does a Webflow to Wix Studio migration cost, and how long does it take?",
        a: "From €1,250, quoted as a fixed price before anything starts, and two to five weeks from kickoff to launch plus a 30-day monitoring window that runs while you're already live. The number moves on how many CMS collections need modelling, how much interaction work has to be rebuilt rather than simplified, and whether there's a store. A brochure site with one collection sits at the bottom of that range. Worth putting against it: what you currently pay for Webflow plans and seats, plus anything you added after the User Accounts sunset.",
      },
      {
        q: "Can I migrate my Webflow site to Wix Studio myself?",
        a: "The exports are genuinely easy, and for a small site this is doable. Webflow gives you clean CSVs for collections, products, orders, submissions and redirects, and Wix imports all of it. Where it turns is specific. Pulling every CMS image down by hand before the URLs die is tedious and unforgiving. Rebuilding multi-reference fields from comma-separated text is fiddly and silent when it goes wrong. Re-entering metadata across a large site from a crawl is where organic traffic actually gets lost. And the design rebuild is the real work, because a Webflow site is usually well built and matching it takes more than approximating it. The reliable signal is your CMS: one collection and a handful of pages is a weekend. Four collections, a store, and a redirect file with hundreds of rows is not.",
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
        label: "HTML to Wix Studio",
        icon: "code",
        href: "/services/html-to-wix-studio",
        desc: "Already exported your Webflow site to static files? This is what moving from raw markup involves.",
      },
      {
        label: "Framer to Wix Studio",
        logo: "/platforms/framer.webp",
        href: "/services/framer-to-wix-studio",
        desc: "The other design-led platform, and the one that doesn't hand you a code export at all.",
      },
      {
        label: "Wix Studio development",
        icon: "code",
        href: "/services/wix-studio-development",
        desc: "Coming from Webflow and worried about the ceiling? This is what custom work on Wix Studio actually looks like.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what leaving Webflow", "would actually cost you"],
    paragraph:
      "Send us your site and your current plan. We'll tell you what moves, what has to be rebuilt, what it would cost, and whether it's worth doing at all. Free, and sometimes the answer is that you should stay.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Webflow to Wix Studio migration. CMS collection export and remodelling, product and order transfer, redirect map import, responsive Studio build, form and interaction rebuild, metadata parity, and 30 days of post-launch index monitoring. From a Wix Legend Partner.",
    priceFrom: "1250",
  },
};
