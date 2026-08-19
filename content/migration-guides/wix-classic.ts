import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/wix-classic-to-wix-studio
 * Targets: wix classic to wix studio · migrate wix editor to studio editor ·
 * is wix studio better than wix · wix studio migration.
 *
 * FRAMING (revised 19 Aug 2026). The first draft led with "this is a rebuild,
 * not a migration". Accurate, and it argued against the service: the reader
 * arrived wanting Studio and left being told it was hard and lossy. The facts
 * are unchanged here. The order isn't. Studio's capability leads, the rebuild
 * is presented as the mechanism that delivers it, and the constraints land as
 * planning guidance from someone who has run the move rather than as warnings.
 *
 * VOICE. Second person, teaching. The reader is shopping around and wants to
 * understand their options, not read about our process. Where we use our own
 * projects it is to answer a question the reader already has, never as a
 * credentials list, and never with a project count attached.
 *
 * AUTHORITY. Wix's documentation is cited for platform constraints because a
 * linked primary source is what makes a claim checkable. Everything about
 * sequencing, what to carry, and where these projects actually go wrong is
 * first-hand and appears nowhere in those docs. That split is deliberate: the
 * docs establish the facts, we supply the judgement.
 *
 * FAQ RULE. Every question is a standalone natural-language query carrying
 * both platform names, because it has to survive being lifted out of the page
 * by FAQPage markup or quoted by an answer engine. "Will I lose my rankings?"
 * matches nothing. "Will I lose my Google rankings moving from Wix Classic to
 * Wix Studio?" matches the query someone actually types.
 *
 * OWNER — verify before launch. The transfers table is a set of testable
 * technical claims and a wrong row is worse than a missing page. Rows drawn
 * from project experience rather than documentation: apps, Velo, SEO settings.
 * Client facts are owner-confirmed: Bel'Istria carried 35+ pages with full URL
 * mapping and lost no rankings (257% YoY impressions after); Knode AI and
 * Katie Hailey were both on Wix Classic and were rebuilt rather than carried.
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
      "What Wix Studio does that the Classic editor can't, what carries across when you move, what gets rebuilt, and how long it takes. A practical guide from a Wix Legend Partner.",
  },

  hero: {
    name: "Wix Classic to Wix Studio migration",
    h1: "Wix Classic to Wix Studio: the complete migration guide",
    subhead:
      "Studio replaces the fixed canvas with responsive layouts, a CMS that scales, and a design system you change once. Moving means rebuilding, and most of your content, URLs, and settings come with you. Here's exactly what happens to each part of your site.",
    chips: [
      "35+ pages carried for Bel'Istria",
      "0 rankings lost in that move",
      "Your URLs can stay exactly as they are",
    ],
    ctas,
  },

  fit: {
    heading: "What Wix Studio gives you that Classic can't",
    intro:
      "Studio isn't a newer version of the editor you're using. It's a different product with a different layout engine, built for sites that need to grow. These are the capabilities people actually move for, and the situations where staying put is the better call.",
    goodFit: [
      "A separate mobile version that keeps drifting out of sync",
      "Pages that follow a pattern, built by hand every time",
      "A layout that fights you every time the site grows",
      "More than one person needing to edit the site",
      "A redesign you keep postponing anyway",
      "Content that has outgrown a fixed canvas",
    ],
    notAFit: [
      "A five-page site that works and still ranks",
      "Budget for the rebuild but nothing after it",
      "A large members list that can't be asked to re-register",
      "No specific thing Classic is actually blocking",
      "A launch deadline inside the next fortnight",
    ],
    footnote:
      "Three of our four Wix Classic projects were rebuilt from scratch rather than carried across, because a rebuild was genuinely cheaper. We'll tell you which one you are before you commit.",
  },

  transfers: {
    heading: "What carries across, and what gets rebuilt",
    intro:
      "Studio can't open a Classic file, so the site is built new. That sounds worse than it is: most of what you own is account-level or exportable, and it comes with you. Row by row, starting with the good news.",
    rows: [
      {
        item: "Your domain and Premium plan",
        icon: "globe",
        status: "carries",
        note: "Both reassign to the new site inside your Wix account, so there's no second subscription and no registrar transfer.",
      },
      {
        item: "Page URLs",
        icon: "redirect",
        status: "carries",
        note: "Neither editor imposes a path structure, so a page at /about stays at /about and a tidy Classic site needs almost no redirect work.",
      },
      {
        item: "Images, video and files",
        icon: "image",
        status: "carries",
        note: "Your Media Manager is account-level, so everything you've uploaded is already there when the new site opens.",
      },
      {
        item: "CMS collections",
        icon: "server",
        status: "carries",
        note: "Collections export to CSV and import with field types intact, up to 50,000 items per file, which is why a site already on the CMS is far cheaper to move.",
      },
      {
        item: "Existing 301 redirects",
        icon: "transfer",
        status: "carries",
        note: "Whatever you've built up in the URL Redirect Manager exports and re-imports in CSV batches, so years of tidying aren't re-derived.",
      },
      {
        item: "Blog posts",
        icon: "pen",
        status: "carries",
        note: "Wix Blog runs on both editors and keeps the /post/ prefix, so post addresses survive the move unchanged.",
      },
      {
        item: "Contacts",
        icon: "users",
        status: "rebuilt",
        note: "The records export and import by CSV; labels, segments and automations layered on top get re-applied on the new site.",
      },
      {
        item: "Store products",
        icon: "cart",
        status: "rebuilt",
        note: "Products move by CSV using the same tool Wix documents for moving between its own stores. Digital products aren't covered and get re-created.",
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
        item: "Bookings, Events and Pricing Plans",
        icon: "calendar",
        status: "replaced",
        note: "The same apps exist in Studio, so the functionality is there on day one; services, staff, session types and plans get configured again.",
      },
      {
        item: "Page layouts",
        icon: "responsive",
        status: "lost",
        note: "Nothing about a fixed-canvas layout survives, and that's the point: the rebuild is what buys you layouts that adapt instead of layouts positioned twice.",
      },
      {
        item: "Site members",
        icon: "lock",
        status: "lost",
        note: "Wix doesn't allow member lists to move between sites, citing privacy, so members re-register and the heads-up email is planned before cutover.",
      },
      {
        item: "Order history",
        icon: "receipt",
        status: "lost",
        note: "Orders export for your records but can't be imported, so the new store starts its numbering fresh.",
      },
    ],
    footnote:
      "The pattern underneath the rows: structured content moves, presentation gets rebuilt, and identity-bound data stays behind. Two of the three losses are things you'd replace anyway.",
  },

  steps: {
    heading: "How the move runs",
    intro:
      "Seven stages. Your Classic site stays live and taking enquiries throughout, because the Studio build happens on a separate site and only takes the domain at the very end.",
    items: [
      {
        title: "Decide what's worth carrying",
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
      "Moving between Wix editors is unusually low-risk compared with leaving the platform entirely. Knowing why tells you where the real risk actually sits, which isn't where most people look.",
    items: [
      {
        title: "Your URLs don't have to change",
        body: "Both editors run on Wix hosting and neither forces a path structure, so addresses carry unchanged. Compare that with leaving Squarespace or WordPress, where the platform's conventions guarantee a full redirect map. Here, redirects exist only where you choose to restructure. That turns restructuring into a deliberate decision with a visible cost rather than something the move imposes on you.",
      },
      {
        title: "The real risk is empty metadata, not broken links",
        body: "Because URLs hold, the failure mode isn't 404s. It's a new site launching with blank SEO fields, because titles and descriptions are per-page settings that don't travel with the content. Traffic then drifts down over weeks instead of dropping on day one, which makes it far harder to diagnose. This is why the field-by-field diff is a stage in the process rather than a line on a checklist.",
      },
      {
        title: "Restructuring is where redirects earn their keep",
        body: "Most Classic sites worth rebuilding also deserve a better structure, and that's where URLs genuinely change. Each old address gets a permanent redirect to its nearest new equivalent, uploaded in CSV batches. Never a blanket rule pointing everything at the homepage, which is the fastest way to turn a ranking page into a bounce.",
      },
      {
        title: "The gain nobody prices in",
        body: "Studio sites are responsive by construction rather than by maintaining a second mobile layout. Classic's separate mobile view is a common source of mismatch between what Google indexes on mobile and what desktop visitors see. Collapsing that into one layout removes a category of ranking problem that stays invisible until someone runs a mobile usability report.",
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
        body: "Recreating a fixed-canvas layout section by section inside Studio looks like diligence and produces a site that costs more and does the same things. If the structure comes across unchanged, Studio was the wrong purchase. Decide up front which repeating content becomes collections, because that's the difference between a redesign and a capability upgrade.",
      },
      {
        title: "Whether the CMS gets modelled during the build or after it",
        body: "Studio's value compounds through the CMS, and a build that defers it ships a better-looking site with the same bottleneck: marketing still can't publish without a designer. Modelling collections during the build is a design decision. Doing it later is a second project.",
      },
      {
        title: "When the domain moves",
        body: "Redirects go up and get tested against the inventory before the domain points anywhere. Repointing first and importing redirects afterwards leaves a window where changed URLs serve 404s to visitors and crawlers alike, and that window doesn't need to be long to get a page dropped. Keep the old site unpublished afterwards too. It costs nothing and it's the only reference for what a page said when something surfaces three weeks later.",
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

  logistics: {
    heading: "Timeline and cost",
    priceFrom: "From €1,750",
    timeline: "2 to 5 weeks, plus 30 days of monitoring",
    note: "One flat starting price across every platform we migrate from. What moves the number on a Classic move is whether you're carrying content or starting fresh, how many pages hold search equity worth mapping, how much repeating content becomes CMS collections, and how much configuration lives inside Bookings, Stores or Events. A brochure rebuild sits at the bottom of that range. Bel'Istria's 35+ page carry with a full URL map ran eight weeks end to end.",
    ctas: [
      {
        label: "Get a fixed quote",
        href: "/book-a-call",
        variant: "primary",
      },
      {
        label: "See migration pricing",
        href: "/services/website-migration",
        variant: "secondary",
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
        q: "Does my Wix Premium plan and domain carry over to a Wix Studio site?",
        a: "Yes. Both reassign to the new site from inside your Wix account, so there's no second subscription to buy and no domain transfer to another registrar. It's also why your Classic site can keep serving traffic right up to the moment you cut over.",
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
