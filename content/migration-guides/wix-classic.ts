import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/wix-classic-to-wix-studio
 * Targets: wix classic to wix studio · migrate wix editor to studio ·
 * wix studio branch · is wix studio better than wix.
 *
 * P0 CORRECTION (19 Aug 2026). The previous version of this file described the
 * move as a fresh rebuild in every case and stated the Premium plan simply
 * carries over. Both were wrong, and the second was wrong in a way a client
 * discovers at the point of payment.
 *
 * Wix documents TWO routes in two articles that never reference each other:
 *   1. "Creating a Studio Version of a Wix Editor Site" — a Studio branch off
 *      an eligible Premium Editor site. Shares the dashboard, so products and
 *      contacts are automatically available. Design is not carried over.
 *      Publishing requires upgrading to a Studio plan and permanently
 *      unpublishes the Editor branch.
 *   2. "Rebuilding Your Site in the Studio Editor" — a fresh Studio site,
 *      which is what you do when the branch route isn't available or wanted.
 *
 * A reader has found one article or the other and has no way to tell which
 * applies to them. Resolving that is the entire reason this page should exist,
 * and no competitor has written it.
 *
 * PREMIUM PLAN, corrected: you upgrade the Premium plan to a Studio plan.
 * Remaining value is credited pro rata, and only when the original plan was
 * bought in the same Wix account. It is not a free carry-over.
 *
 * MEMBERS, deliberately unresolved: Wix names "products, contacts, etc." as
 * shared on the branch and says only that "some parts of the site cannot be
 * transferred" without enumerating them. The separate members article governs
 * moves between distinct sites, not branches. So this page tells the reader to
 * verify it in their own account rather than guessing on their behalf. Saying
 * "check this before you commit" is more useful than a confident wrong answer,
 * and it is the honest expert position.
 *
 * VOICE. Second person, teaching. The reader is shopping around and wants to
 * understand their options. Our projects appear only to answer a question they
 * already have, never as a credentials list, never with a project count.
 *
 * FAQ RULE. Every question is a standalone natural-language query carrying
 * both platform names, because it has to survive being lifted out of the page
 * by FAQPage markup or quoted by an answer engine.
 *
 * OWNER — client facts are owner-confirmed: Bel'Istria carried 35+ pages with
 * full URL mapping and lost no rankings (257% YoY impressions after); Knode AI
 * and Katie Hailey were both on Wix Classic and were rebuilt rather than
 * carried. Re-verify the Wix constraints if Wix changes the branch workflow.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const wixClassic: MigrationGuideContent = {
  slug: "wix-classic-to-wix-studio",
  publish: true,
  platform: "Wix Classic",
  seo: {
    title: "Wix Classic to Wix Studio: Migration Guide | Zenith Digital",
    description:
      "Two ways to move from the Wix Editor to Wix Studio, what each one carries across, what your Premium plan actually costs to bring, and how long it takes. From a Wix Legend Partner.",
  },

  hero: {
    name: "Wix Classic to Wix Studio migration",
    h1: "Wix Classic to Wix Studio: the complete migration guide",
    subhead:
      "There are two routes, and Wix documents them in separate articles that never mention each other. This page explains which one applies to you, what each carries across, and what the move actually costs.",
    chips: [
      "Two routes, explained",
      "35+ pages carried for Bel'Istria",
      "0 rankings lost in that move",
    ],
    ctas,
  },

  glance: {
    heading: "Wix Classic to Wix Studio at a glance",
    intro:
      "The short answers, before the detail. Every one of these is expanded further down the page.",
    items: [
      {
        label: "Can the design be converted?",
        value:
          "No. Wix states the design is not carried over on either route, so the site is rebuilt visually.",
      },
      {
        label: "What comes with you",
        value:
          "On a Studio branch: the dashboard, so products and contacts are already there. On a fresh build: whatever you export.",
      },
      {
        label: "What happens to your URLs",
        value:
          "They can stay exactly as they are. Neither editor imposes a path structure, so redirects are usually optional.",
      },
      {
        label: "What it costs",
        value:
          "From €1,750 for the work, plus a Wix Studio plan. Remaining Premium value is credited pro rata.",
      },
      {
        label: "How long it takes",
        value:
          "Two to five weeks, plus 30 days of index monitoring after launch.",
      },
      {
        label: "DIY difficulty",
        value:
          "Medium. The build is approachable; the URL mapping and metadata transfer are where people lose traffic.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "Studio is a different product, not a newer editor. These are the capabilities that make the rebuild worth paying for, and they're the reason to move rather than the fact that it's newer.",
    items: [
      {
        title: "One layout instead of two",
        body: "Studio lays out with responsive grids and breakpoints, so a page adapts to any screen. Classic maintains a separate mobile view that drifts out of sync, and every fix gets made twice.",
      },
      {
        title: "Pages that build themselves",
        body: "Model services, locations, properties or team members as CMS collections and the twentieth page costs what the second did. Classic builds each one by hand.",
      },
      {
        title: "Change once, change everywhere",
        body: "Global text themes, colour and spacing mean a brand update propagates across the site instead of being repeated page by page.",
      },
      {
        title: "Your team can publish",
        body: "Studio supports multiple editors with real roles and permissions, so adding a case study stops being a ticket for whoever built the site.",
      },
      {
        title: "Room to grow custom",
        body: "Dev mode gives you a proper code environment with npm packages, so the site can grow features rather than hitting a ceiling and needing another platform move.",
      },
      {
        title: "SEO controls without a plugin stack",
        body: "Metadata, redirects and structured data are managed natively, including bulk redirect import, rather than assembled from third-party tools.",
      },
    ],
  },

  routes: {
    heading: "There are two ways to do this",
    intro:
      "This is the part almost nobody explains, because Wix's own help centre covers the routes in separate articles that never reference each other. Which one applies to you depends on your current plan.",
    items: [
      {
        title: "Create a Studio version of your existing site",
        navLabel: "The Studio branch route",
        eligibility: "Wix Editor sites on a Premium plan",
        body: "Wix creates a Studio branch alongside your live site. The branch shares the original's dashboard, so your business data is already there when you open it.",
        lead: "What that means in practice:",
        points: [
          {
            label: "Products and contacts are already in place",
            body: "Wix states the site's business tools and data are automatically available in the Studio version, so there's no CSV round trip for them.",
          },
          {
            label: "Your live site keeps running",
            body: "Creating the branch doesn't unpublish or affect the original, so there's no downtime and no gap in enquiries while you build.",
          },
          {
            label: "The design still gets rebuilt",
            body: "Wix is explicit that the design of the site is not carried over to the Studio branch, so this is not a conversion.",
          },
          {
            label: "Publishing is one-way",
            body: "Once you publish the Studio branch, Wix says you cannot go back and republish the original Editor branch. Plan the cutover as a decision, not an experiment.",
          },
          {
            label: "Some apps can't come",
            body: "Wix notes that some apps are unsupported in Studio and therefore cannot be added to the branch, so audit your app list before starting.",
          },
        ],
      },
      {
        title: "Build a fresh Studio site",
        navLabel: "The fresh build route",
        eligibility:
          "Any site, and often the better choice even when the branch is available",
        body: "A new Studio site with no relationship to the old one. Everything arrives by export and import, or gets rebuilt.",
        lead: "Why you'd choose this deliberately:",
        points: [
          {
            label: "You want a clean structure",
            body: "Inheriting a dashboard also means inheriting years of accumulated settings, and sometimes a fresh start is genuinely cheaper to maintain.",
          },
          {
            label: "You're not on a Premium plan",
            body: "The branch route requires one, so a site on a free plan takes this path by default.",
          },
          {
            label: "You want the old site kept",
            body: "Publishing a branch permanently retires the Editor version. A separate site leaves the original intact and unpublished as a reference.",
          },
        ],
      },
    ],
    footnote:
      "Which route you're on changes what you have to export, so it's the first thing to establish rather than something to discover mid-build. If you're not sure whether your site is eligible, that's checkable inside your Wix account in a couple of minutes and we'll do it with you on a call.",
    cta: {
      heading: "Not sure which route you're eligible for?",
      paragraph:
        "It's checkable inside your Wix account in a couple of minutes. We'll do it with you on a call and tell you which one is cheaper for your site.",
      cta: { label: "Book a call", href: "/book-a-call", variant: "primary" },
    },
  },

  fit: {
    heading: "Who should move, and who shouldn't",
    intro:
      "Studio's advantages compound through content and scale. If neither is growing, the rebuild buys you headroom you won't use, and that's worth saying before you spend anything.",
    goodFit: [
      "Your mobile view has drifted out of sync with desktop and every fix has to be made twice.",
      "You're adding pages that follow a pattern, and building each one by hand is starting to hurt.",
      "More than one person needs to edit the site, and Classic's workflow has become a scheduling problem.",
      "You're postponing a redesign, or calling a developer for changes your team should be making.",
      "The site needs to grow past what a fixed canvas holds, and every new section fights the layout.",
    ],
    notAFit: [
      "A five-page brochure site that works, ranks, and hasn't needed a change in a year.",
      "A budget that covers the rebuild and nothing after it. A Studio site nobody uses the CMS on is a Classic site that cost more.",
      "A members area you can't disrupt, until you've confirmed what happens to your member list on your chosen route.",
      "Wanting something newer. That isn't a reason, and you'll hear that from us on the call rather than after the invoice.",
    ],
    footnote:
      "The honest test: name the thing Classic is stopping you doing. If you can, the rebuild has a payback you can point at. If you can't, wait until you can.",
  },

  transfers: {
    heading: "What carries across, and what gets rebuilt",
    intro:
      "Where the answer depends on which route you're taking, the row says so. Where it doesn't, it holds either way. Starting with the good news.",
    rows: [
      {
        item: "Page URLs",
        icon: "redirect",
        status: "carries",
        note: "Neither editor imposes a path structure, so a page at /about stays at /about and a tidy site needs almost no redirect work.",
      },
      {
        item: "Images, video and files",
        icon: "image",
        status: "carries",
        note: "Your Media Manager is account-level, so everything you've uploaded is already there when the new site opens.",
      },
      {
        item: "Products and store catalogue",
        icon: "cart",
        status: "carries",
        route: "branch",
        note: "The branch shares the original's dashboard, so Wix states products are automatically available without an export.",
      },
      {
        item: "Contacts and CRM records",
        icon: "users",
        status: "carries",
        route: "branch",
        note: "Same dashboard, same contacts. This is the single biggest practical advantage of the branch route.",
      },
      {
        item: "Products and contacts",
        icon: "layers",
        status: "rebuilt",
        route: "fresh",
        note: "On a separate site there's no shared dashboard, so both move by CSV export and import and any layered automations get re-applied.",
      },
      {
        item: "CMS collections",
        icon: "server",
        status: "carries",
        note: "Collections export to CSV and import with field types intact, up to 50,000 items per file, which is why a site already on the CMS is far cheaper to move.",
      },
      {
        item: "Blog posts",
        icon: "pen",
        status: "carries",
        note: "Wix Blog runs on both editors and keeps the /post/ prefix, so post addresses survive unchanged.",
      },
      {
        item: "Existing 301 redirects",
        icon: "transfer",
        status: "carries",
        note: "Whatever you've built up in the URL Redirect Manager exports and re-imports in CSV batches, so years of tidying aren't re-derived.",
      },
      {
        item: "Your domain",
        icon: "globe",
        status: "carries",
        note: "Reassigns inside your Wix account, so there's no transfer to another registrar and no DNS gap.",
      },
      {
        item: "Your Premium plan",
        icon: "card",
        status: "rebuilt",
        note: "Not a free carry-over: you upgrade the Premium plan to a Studio plan, and remaining value is credited pro rata when the original was bought in the same Wix account.",
      },
      {
        item: "Velo custom code",
        icon: "braces",
        status: "rebuilt",
        note: "Backend and public files copy across as text and keep working; anything bound to a page element through the Properties and Events panel gets rewired by hand.",
      },
      {
        item: "SEO titles, descriptions and structured data",
        icon: "tags",
        status: "rebuilt",
        note: "These are per-page settings rather than content, so they're re-entered and then diffed field by field against the old site before cutover.",
      },
      {
        item: "Apps and their configuration",
        icon: "plug",
        status: "replaced",
        note: "Most apps carry, but Wix states some are unsupported in Studio and cannot be added at all, so the app list gets audited before anything starts.",
      },
      {
        item: "Page layouts",
        icon: "responsive",
        status: "lost",
        note: "Wix states the design is not carried over on either route, and that's the point: the rebuild is what buys you layouts that adapt rather than layouts positioned twice.",
      },
      {
        item: "The ability to go back",
        icon: "ban",
        status: "lost",
        route: "branch",
        note: "Wix states that once the Studio branch is published you cannot republish the original Editor branch, so the cutover is a one-way door.",
      },
      {
        item: "Site members",
        icon: "lock",
        status: "replaced",
        note: "Verify this one in your own account before committing. Wix names products and contacts as shared on a branch but doesn't enumerate the rest, and member lists definitively cannot move between separate sites.",
      },
    ],
    footnote:
      "The pattern underneath the rows: structured content moves, presentation gets rebuilt, and anything tied to a person's identity needs checking rather than assuming. If a row matters to your business, we check it against your actual account before quoting.",
    cta: {
      heading: "Not sure which of these apply to your site?",
      paragraph:
        "Send us the URL and we'll check your account, your app list and your page count before you commit to anything.",
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
      "Seven stages. Your Classic site stays live and taking enquiries throughout, because the Studio build happens on a separate site and only takes the domain at the very end.",
    items: [
      {
        title: "Decide what's worth carrying",
        navLabel: "Deciding what to carry",
        duration: "1 day",
        body: "The call that sets the budget, so it happens before anything gets built. The question is whether your search equity sits in a handful of pages or spreads across dozens.",
        lead: "What that means in practice:",
        points: [
          {
            label: "Pull the ranking data",
            body: "Export every URL from Search Console with its impressions, clicks and average position over the last twelve months.",
          },
          {
            label: "Find the pages with links pointing at them",
            body: "A page earning inbound links is worth carrying even when its traffic looks unremarkable.",
          },
          {
            label: "Separate earners from archive",
            body: "Most Classic sites have a short list of pages doing the work and a long tail nobody reads, and the split decides the shape of the project.",
          },
          {
            label: "Put the decision in writing",
            body: "Carrying content costs real money in mapping and validation, so it should be a choice with a reason attached rather than a default.",
          },
        ],
      },
      {
        title: "Crawl and inventory",
        navLabel: "URL inventory",
        duration: "1 to 2 days",
        body: "Every live URL exported with its traffic, position, inbound links and current metadata. Classic sites accumulate pages nobody remembers publishing, and this is where they surface.",
        lead: "The inventory captures:",
        points: [
          {
            label: "Every indexable URL",
            body: "Including the ones that never appear in your menu, which is usually where the surprises are.",
          },
          {
            label: "Current per-page metadata",
            body: "Titles, descriptions, canonicals and Open Graph images, because these are the things that don't travel with the content.",
          },
          {
            label: "App and integration inventory",
            body: "Bookings, Stores, Events, forms and anything third-party, each with its configuration noted rather than assumed.",
          },
        ],
      },
      {
        title: "Design the structure and the CMS",
        navLabel: "CMS and structure",
        duration: "2 to 4 days",
        body: "The stage that justifies the whole exercise. Anything repeating on the old site gets modelled as a collection, so publishing becomes filling in a form rather than building a page.",
        lead: "Where the gain comes from:",
        points: [
          {
            label: "Repeating pages become collections",
            body: "Services, locations, properties, team members: define the pattern once and the twentieth entry costs what the second did.",
          },
          {
            label: "A flat structure gets a hierarchy",
            body: "Bel'Istria went from a few pages competing for everything to one page per service cluster, and that restructure is where the 257% impression growth came from.",
          },
          {
            label: "Global styles get set before anything is built",
            body: "Text themes, colour and spacing defined once, so a brand change later is one edit rather than forty.",
          },
        ],
      },
      {
        title: "Build in Studio",
        navLabel: "The Studio build",
        duration: "1 to 3 weeks",
        body: "Responsive layouts with real breakpoints, collections populated from the CSV exports, apps reconfigured. You review a working site on a staging URL from your own phone, not a slide of screenshots.",
        lead: "What you get to look at:",
        points: [
          {
            label: "A staging site on a real URL",
            body: "Your live site is untouched, so there's no maintenance page and no gap in enquiries while this happens.",
          },
          {
            label: "Real content, not placeholder",
            body: "Collections are populated during the build so you're reviewing your actual pages rather than a design mockup.",
          },
          {
            label: "A timeline that scales with the site",
            body: "A tight brochure rebuild runs closer to a week and a half; ten pages with a CMS behind them is nearer three weeks.",
          },
        ],
      },
      {
        title: "Move the content and the metadata",
        navLabel: "Content and metadata",
        duration: "2 to 5 days",
        body: "Copy, posts and every per-page SEO field transferred, then checked against the stage-two inventory rather than eyeballed.",
        lead: "Checked field by field:",
        points: [
          {
            label: "Titles and meta descriptions",
            body: "Diffed against the old set, because a page launching with a blank title is the most common way this move quietly loses traffic.",
          },
          {
            label: "Canonicals, Open Graph and structured data",
            body: "Re-entered and verified, since none of it travels with the content it describes.",
          },
          {
            label: "Any URL that changed",
            body: "Added to the redirect map now, while the inventory is open, rather than discovered after launch.",
          },
        ],
      },
      {
        title: "Cut over",
        navLabel: "Cutover day",
        duration: "1 day",
        body: "Domain repointed and Premium plan reassigned from inside your Wix account. One afternoon, not a state the business sits in for a month.",
        lead: "The cutover sequence:",
        points: [
          {
            label: "Redirects go up before the domain moves",
            body: "Imported in CSV batches and tested line by line against the inventory, so no changed URL ever serves a 404.",
          },
          {
            label: "Sitemap resubmitted, tracking reconnected",
            body: "Search Console and analytics pointed at the new site the same day so the baseline isn't lost.",
          },
          {
            label: "Every form and booking flow submitted for real",
            body: "With real addresses, the same afternoon, because a silently broken enquiry form is the most expensive launch bug there is.",
          },
        ],
      },
      {
        title: "Watch it land",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Coverage and impressions checked daily for the first fortnight, then weekly. This is the stage most quotes leave out, and it's the one that decides whether a migration held.",
        lead: "What's monitored:",
        points: [
          {
            label: "Index coverage",
            body: "Anything that drops out of the index or starts 404ing gets fixed inside the window at no extra cost.",
          },
          {
            label: "Position and impressions against the baseline",
            body: "Compared with the stage-two inventory, so a drift is caught in week two rather than noticed in month three.",
          },
        ],
      },
    ],
  },

  seoMechanics: {
    heading: "What happens to your search rankings",
    intro:
      "Moving between Wix editors is unusually low-risk compared with leaving the platform. Knowing why tells you where the real risk sits, which isn't where most people look.",
    items: [
      {
        title: "Your URLs don't have to change",
        navLabel: "URLs and redirects",
        body: "Both editors run on Wix hosting and neither forces a path structure, so addresses carry unchanged. Compare that with leaving Squarespace or WordPress, where the platform's conventions guarantee a full redirect map. Here redirects exist only where you choose to restructure, which makes restructuring a deliberate decision with a visible cost rather than something the move imposes on you.",
      },
      {
        title: "The real risk is empty metadata, not broken links",
        navLabel: "Where the risk actually is",
        body: "Because URLs hold, the failure mode isn't 404s. It's a new site launching with blank SEO fields, because titles and descriptions are per-page settings that don't travel with the content. Traffic then drifts down over weeks instead of dropping on day one, which makes it far harder to diagnose. That's why a field-by-field diff before cutover is a stage in the process rather than a line on a checklist.",
      },
      {
        title: "What we can and can't promise",
        navLabel: "What we guarantee",
        body: "Nobody can guarantee an external algorithm's output, and Google says plainly that following its guidance doesn't guarantee crawling, indexing or ranking. What we can guarantee is our own work: every indexed URL mapped, redirects tested against the inventory, metadata recreated and diffed, launch validated, and search performance monitored for 30 days. If a migration-caused technical problem appears in that window, we fix it at no extra cost.",
      },
    ],
  },

  mistakes: {
    heading: "Three decisions that shape the result",
    intro:
      "The difference between a move that pays for itself and one that doesn't comes down to three choices, all made early.",
    items: [
      {
        title: "Whether you rebuild the old site or replace it",
        navLabel: "Rebuild or replace",
        body: "Recreating a fixed-canvas layout section by section inside Studio looks like diligence and produces a site that costs more and does the same things. If the structure comes across unchanged, Studio was the wrong purchase. Decide up front which repeating content becomes collections, because that's the difference between a redesign and a capability upgrade.",
      },
      {
        title: "Whether the CMS gets modelled during the build or after it",
        navLabel: "When to model the CMS",
        body: "Studio's value compounds through the CMS, and a build that defers it ships a better-looking site with the same bottleneck: marketing still can't publish without a designer. Modelling collections during the build is a design decision. Doing it later is a second project.",
      },
      {
        title: "When you publish, and what that closes off",
        navLabel: "The cutover decision",
        body: "On the branch route, publishing permanently retires the Editor version, so redirects go up and get tested against the inventory before anything goes live. On either route, keep the old site accessible afterwards. It's the only reference for what a page said or how an app was configured when something surfaces three weeks later.",
      },
    ],
  },

  auditCta: {
    heading: "Not sure if your Classic site is worth carrying?",
    paragraph:
      "Send us the URL. We'll tell you which pages are actually earning, whether they're worth mapping across, and what the rebuild would cost either way.",
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
      "Platform constraints on this page link to Wix's own documentation, so you can check them rather than take our word for it.",
    verified: "2026-08-19",
    items: [
      {
        label: "Studio Editor: Creating a Studio Version of a Wix Editor Site",
        href: "https://support.wix.com/en/article/studio-editor-creating-a-studio-version-of-a-wix-editor-site",
        note: "The branch route. Shares the dashboard, does not carry the design, and publishing permanently retires the Editor branch.",
      },
      {
        label: "Wix Editor: Rebuilding Your Site in the Studio Editor",
        href: "https://support.wix.com/en/article/wix-editor-rebuilding-your-site-in-the-studio-editor",
        note: "The fresh-build route, which Wix documents separately without reference to the branch workflow.",
      },
      {
        label: "Wix Studio: Assigning a Wix Premium Plan to a Wix Studio Site",
        href: "https://support.wix.com/en/article/wix-studio-assigning-a-wix-premium-plan-to-a-wix-studio-site",
        note: "Premium upgrades to a Studio plan, with remaining value credited pro rata in the same Wix account.",
      },
      {
        label: "CMS: Importing Content into a Collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a collection, capped at 50,000 items per file.",
      },
      {
        label: "Importing or Exporting URL Redirects with a CSV File",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import, up to 500 rows at a time.",
      },
      {
        label: "Site Members: Moving Members Between Sites",
        href: "https://support.wix.com/en/article/request-moving-members-from-one-site-to-another-in-your-wix-account",
        note: "Member lists cannot move between separate sites. Wix does not state whether a Studio branch behaves the same way, which is why this page says to verify it in your account.",
      },
      {
        label: "Copying and Deleting Coded Sites, Pages, and Elements",
        href: "https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/overview/copying-and-deleting-coded-sites-pages-and-elements",
        note: "Velo event code added via the Properties and Events panel stops working when copied to another site.",
      },
    ],
  },

  proof: {
    heading: "Wix Classic sites we've moved to Studio",
    intro:
      "One carry and two rebuilds. Bel'Istria had search equity spread across enough URLs to justify mapping 35+ pages. Knode AI and Katie Hailey were both faster and cheaper built fresh, which is the more common answer.",
    workSlugs: ["belistria", "knode-ai", "katie-hailey"],
  },

  faq: {
    heading: ["Wix Classic to Wix Studio,", "answered"],
    subhead:
      "The questions that come up on every one of these calls, including the ones with unwelcome answers.",
    ctas,
    items: [
      {
        q: "How do I migrate a Wix Classic site to Wix Studio?",
        a: "The site is rebuilt in Studio rather than converted, because the two editors use different layout engines. In practice that means: inventory the current site's URLs and rankings, decide which content is worth carrying, model the repeating pages as CMS collections, build responsively in Studio on a separate site, move the content and per-page SEO settings, then repoint the domain and import the redirects. Your Classic site stays live throughout and the switch itself takes an afternoon.",
      },
      {
        q: "Can you convert a Wix Classic site to Wix Studio automatically?",
        a: "No. Wix's own documentation states that a site created in the Wix Editor cannot be migrated to the Studio Editor and has to be rebuilt, and Wix recommends using a Wix Partner to do it. There's no conversion tool and no third-party workaround, because Classic positions elements on a fixed canvas while Studio uses responsive grids with breakpoints. Anyone offering a one-click conversion is describing something else.",
      },
      {
        q: "Is Wix Studio actually better than the Wix Classic editor?",
        a: "For a site that needs to grow, yes, and for specific reasons rather than because it's newer. Studio lays out responsively with breakpoints instead of maintaining a separate mobile version, so you stop fixing everything twice. Its CMS turns repeating pages into collections, so the twentieth service page costs what the second did. Global styles mean a brand change is one edit. Multiple people can edit with real permissions. If your site is five static pages that never change, none of that pays back and Classic is fine.",
      },
      {
        q: "Will I lose my Google rankings moving from Wix Classic to Wix Studio?",
        a: "Not if the move is handled properly, and this one starts from a better position than most migrations. Both editors run on Wix hosting and neither imposes a URL structure, so your page addresses can stay exactly as they are and there's often very little to redirect. The genuine risk is per-page SEO settings launching empty, since titles and descriptions don't travel with the content. Exporting the old metadata and diffing it against the new site before cutover is what prevents that. Bel'Istria moved 35+ pages off Classic without losing a ranking, with impressions up 257% year on year afterwards.",
      },
      {
        q: "How much does a Wix Classic to Wix Studio migration cost?",
        a: "From €1,750, quoted as a fixed price before the work starts. The number moves on whether you're carrying content across or starting fresh, how many pages hold search equity worth mapping, how much repeating content becomes CMS collections, and how much configuration sits inside apps like Bookings or Stores. A brochure rebuild sits at the bottom of that range.",
      },
      {
        q: "How long does it take to move from Wix Classic to Wix Studio?",
        a: "Two to five weeks from kickoff to launch for most sites, followed by 30 days of index monitoring. A tight brochure rebuild can run a week and a half. A larger site carrying content across with a full URL map runs longer: Bel'Istria's 35+ page move took eight weeks end to end. Your existing site stays live for all of it.",
      },
      {
        q: "Does my Wix Premium plan carry over to a Wix Studio site?",
        a: "Not as-is. You upgrade your existing Premium plan to a Wix Studio plan, and Wix credits the remaining value of the old plan against the price of the upgrade, calculated pro rata across the days left in your subscription. That credit only applies when the original plan was bought in the same Wix account as the Studio site. Your domain is simpler: it reassigns inside your account with no registrar transfer, which is why the old site can keep serving traffic right up to cutover.",
      },
      {
        q: "What happens to my site members when I move from Wix Classic to Wix Studio?",
        a: "They have to sign up again. Wix doesn't allow member lists to be exported or imported between sites and states the reason is privacy, so there's no way around it. If you run a real members area, plan for it: a heads-up email before cutover and a re-registration prompt after. Your contacts are different and do move, by CSV export and import.",
      },
      {
        q: "Do CMS collections transfer from Wix Classic to Wix Studio?",
        a: "Yes, and it's the cleanest part of the move. Collections export to CSV and import into the new site with field types intact, up to 50,000 items per file. The dynamic pages that display them get rebuilt, but the data itself makes the trip. A site already running on the CMS is meaningfully cheaper to move than one where every page was built by hand.",
      },
      {
        q: "Does Velo code still work after moving from Wix Classic to Wix Studio?",
        a: "Backend and public files copy across as text and keep working. What needs redoing is anything bound to a specific page element: Wix documents that event code added through the Properties and Events panel stops working when copied to another site, so handlers get reconnected to the new elements by hand. If your site does anything genuinely custom, send the code over before we quote so the estimate reflects it.",
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
        icon: "transfer",
        href: "/services/website-migration",
        desc: "The hub: what a migration to Wix Studio covers, what it costs, and every platform we move sites from.",
      },
      {
        label: "Wix Harmony to Wix Studio",
        logo: "/platforms/wix.svg",
        href: "/services/wix-harmony-to-wix-studio",
        desc: "The other Wix-to-Wix move, and the one with a harder constraint: Harmony ships without a CMS or multilingual.",
      },
      {
        label: "Squarespace to Wix Studio",
        logo: "/platforms/squarespace.svg",
        href: "/services/squarespace-to-wix-studio",
        desc: "What Squarespace's export actually contains, and the four things it silently leaves behind.",
      },
      {
        label: "Wix Studio website design",
        icon: "palette",
        href: "/services/wix-studio-website-design",
        desc: "Not carrying anything across? This is what a Studio build looks like starting from a blank canvas.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out whether you're", "carrying or starting fresh"],
    paragraph:
      "Send us your Wix Classic site. We'll tell you which pages are actually earning, whether they're worth mapping across, and what the rebuild would cost either way. Free, and useful even if you decide to stay put.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Wix Classic to Wix Studio migration. Responsive rebuild in Wix Studio with CMS collection design, URL and ranking inventory, content and metadata transfer, redirect mapping, and 30 days of post-launch index monitoring. From a Wix Legend Partner.",
    priceFrom: "1750",
  },
};
