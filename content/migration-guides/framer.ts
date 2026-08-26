import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/framer-to-wix-studio
 * Targets: framer to wix studio · migrate off framer · export framer site ·
 * framer cms limits · framer page limit.
 *
 * THE THESIS: Framer is the only platform in this set with no documented way
 * out of the design. Squarespace gives you an XML file, WordPress a WXR,
 * Webflow a full code ZIP. Framer states plainly that it does not offer HTML
 * export and that published sites "are not fully static". Everything else
 * leaves through Marketplace plugins. So this migration is measured entirely
 * by what you can carry, and the honest answer is your content and your
 * redirects, nothing else. That argument could not appear on a sibling.
 *
 * SECOND STRAND, and the reason most people actually arrive: Framer's plan
 * ceilings are low and the important ones are gated. Verified on the pricing
 * page 20 Aug 2026: Basic allows 30 pages and 2 CMS collections, and site
 * redirects are a Pro feature. A brochure site outgrows Basic quickly, and a
 * site that can't set redirects can't protect its URL history.
 *
 * VERIFICATION STATUS (20 Aug 2026). The export claim was checked directly
 * against two Framer pages rather than taken from research notes, because the
 * whole page rests on it.
 *
 * THE CONTRADICTION, and it's on the page deliberately: Framer's operational
 * article says "Framer does not provide a way to export published sites as
 * HTML files or static website bundles". A newer EU Data Act portability page
 * says "Every Framer site is published as standard HTML, CSS, JavaScript, and
 * static assets. You can download these files at any time". That second page
 * names no button, menu or method, and links back to the article that says no.
 * The guide reports both and tells the reader to check their own account,
 * which is more useful than picking a side. Re-read both before the next edit.
 *
 * ALSO WORTH KNOWING: Framer 3.0 shipped 16 June 2026 and rebuilt the CMS. The
 * official CMS Export plugin was last updated October 2024, so its behaviour
 * against the new CMS is unverified. The page says so rather than assuming.
 *
 * NOT DOCUMENTED, and hedged rather than asserted: how reference and
 * multi-reference fields serialise into an exported CSV, whether CMS image
 * fields export as Framer CDN URLs, any form-submission export or storage, and
 * the HTTP status code Framer's redirects emit.
 *
 * NO PROOF BLOCK. No Framer client. Borrowing one would discredit the sourcing
 * that makes this page worth reading.
 *
 * SIGNED OFF and published 20 Aug 2026.
 *
 * OWNER — plan limits date fast. Re-check the pricing page quarterly; the
 * numbers in `fit`, `benefits` and the CMS-limit FAQ are the ones that move.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const framer: MigrationGuideContent = {
  slug: "framer-to-wix-studio",
  publish: true,
  platform: "Framer",
  seo: {
    title: "Framer to Wix Studio | Migration Guide | Zenith Digital",
    description:
      "Framer doesn't export your site's HTML, so a move is measured by what you can carry. What comes out, what has to be rebuilt, and what it costs. From €1,250.",
  },

  hero: {
    name: "Framer to Wix Studio migration",
    h1: "Framer to Wix Studio: the complete migration guide",
    subhead:
      "Framer states plainly that it doesn't export your site's HTML. Your content and redirects come out through plugins, and the design doesn't come out at all. Here's exactly what you can carry, what gets rebuilt, and what it costs.",
    chips: [
      "Every claim linked to Framer's docs",
      "No HTML export, per Framer",
      "Your CMS content still travels",
    ],
    ctas,
  },

  glance: {
    heading: "Framer to Wix Studio, at a glance",
    intro:
      "The short answers. Every Framer limit below is its own published position, linked at the bottom of the page.",
    items: [
      {
        label: "Can the design be converted",
        value:
          "No, and unusually you can't even take the code. Framer states it doesn't provide a way to export published sites as HTML or static bundles.",
      },
      {
        label: "What comes with you",
        value:
          "Your CMS collections and your redirect list, both through Framer's own Marketplace plugins rather than a menu item.",
      },
      {
        label: "What happens to your URLs",
        value:
          "They hold. Neither Framer nor Wix Studio forces a path structure on standard pages, so slugs can be set to match.",
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
          "Harder than it looks. With no code export, a crawl of your own live site becomes the only complete record of what you built.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "Framer is a genuinely good design tool and this isn't an argument that it isn't. The reasons teams leave are ceilings: on pages, on collections, on who can edit, and on which features your plan unlocks.",
    items: [
      {
        title: "The page count stops being a design constraint",
        body: "Framer's Basic plan allows 30 pages and two CMS collections, so a growing site starts making structural decisions around a plan tier. On Wix Studio the question is what the site needs, not what the plan permits.",
      },
      {
        title: "Redirects aren't a premium feature",
        body: "Framer lists site redirects as a Pro capability. On any Wix Studio site you can map redirects and import them in bulk, which matters because your URL history is the one asset you can't rebuild later.",
      },
      {
        title: "Editors don't cost per head",
        body: "Framer bills additional editors monthly and content editors on top. In Wix Studio the number of people who can update the site is a decision about trust rather than a line on an invoice.",
      },
      {
        title: "The whole business runs on one platform",
        body: "Framer builds the site. Wix Studio also runs the store, the bookings, the members area, the email and the automations, so growth doesn't mean stitching a third-party service behind every new requirement.",
      },
      {
        title: "Your SEO and AEO controls aren't gated",
        body: "Framer puts static file hosting, which is how you'd serve a custom robots.txt or an llms.txt, on Pro and above. Getting cited by answer engines shouldn't depend on a plan tier.",
      },
      {
        title: "Animation you can actually edit later",
        body: "Studio's motion tools sit in the same interface as everything else, so the person updating the page next year can adjust the animation without needing the person who designed it.",
      },
    ],
  },

  fit: {
    heading: "Who this page is for",
    intro:
      "Framer suits a certain kind of site extremely well, and if yours is one of them the honest answer is to stay. These are the situations where it stops fitting.",
    goodFit: [
      "You've hit the page or CMS collection ceiling and the next tier still doesn't solve it.",
      "The site needs a store, bookings or a members area, and Framer is only doing the front.",
      "Every person who needs to edit the site costs another monthly seat.",
      "You're on a plan without redirects and your URL history is unprotected.",
      "The person who designed it has moved on and nobody else is confident in the canvas.",
    ],
    notAFit: [
      "The site is a beautifully art-directed brochure and nobody needs to change it often.",
      "The motion work is the point, not decoration around it.",
      "You have a designer in-house who works in Framer every week.",
      "You've just launched and haven't hit any of Framer's ceilings yet.",
    ],
    footnote:
      "One thing to weigh before you decide: because Framer doesn't export your site, the cost of leaving is the same whether you go now or in two years. What does change is how much you've built in the meantime that has to be recreated by hand.",
  },

  transfers: {
    heading: "What moves from Framer to Wix Studio",
    intro:
      "This table is shorter on good news than its siblings, and the reason is worth stating up front. Framer says it doesn't provide a way to export published sites as HTML or static bundles, so unlike a Webflow or WordPress move there's no file of your build to work from. What travels is your content.",
    rows: [
      {
        item: "Your domain",
        icon: "globe",
        status: "carries",
        note: "Point it or transfer it, with no change to the content behind it and no registrar drama either way.",
      },
      {
        item: "Page URLs",
        icon: "redirect",
        status: "carries",
        note: "Neither platform forces a path structure on standard pages, so you set the same slugs on the Studio site and /about stays /about.",
      },
      {
        item: "Your redirect list",
        icon: "transfer",
        status: "carries",
        note: "Framer's own Redirect Sync plugin exports every redirect to a single CSV, though redirects are a Pro feature, so a Basic site has none to export in the first place.",
      },
      {
        item: "CMS collection content",
        icon: "server",
        status: "rebuilt",
        note: "Framer's official CMS Export plugin writes a collection out as CSV, which imports into a Wix CMS collection modelled to match.",
      },
      {
        item: "Reference and multi-reference fields",
        icon: "layers",
        status: "rebuilt",
        note: "Framer doesn't document how these serialise into an exported CSV, so open the file and check what you actually got before planning the Wix model around it.",
      },
      {
        item: "CMS images and files",
        icon: "image",
        status: "rebuilt",
        note: "Framer documents no bulk media download and doesn't say how image fields appear in an export, so budget for pulling them by hand while the site is still live.",
      },
      {
        item: "Page copy and layout",
        icon: "type",
        status: "rebuilt",
        note: "With no code export, the copy comes from a crawl of your own live site and the design is rebuilt in Studio from what's on screen.",
      },
      {
        item: "SEO titles, descriptions and Open Graph",
        icon: "search",
        status: "rebuilt",
        note: "These live in Framer's page settings and appear in no export, so they're captured from the crawl and diffed against the new site before the domain moves.",
      },
      {
        item: "Localized content",
        icon: "languages",
        status: "rebuilt",
        note: "Framer sells localization as an add-on and the translations live inside the project, so a second language is rebuilt on Wix Multilingual rather than transferred.",
      },
      {
        item: "Forms",
        icon: "form",
        status: "replaced",
        note: "Framer routes submissions out to email, a Google Sheet or a webhook, so the form gets rebuilt natively in Wix and the destination moves with it.",
      },
      {
        item: "Animations and interactions",
        icon: "puzzle",
        status: "replaced",
        note: "Framer's motion is defined inside the project with no export path, so it gets rebuilt with Studio's own animation tools, matched to intent rather than copied.",
      },
      {
        item: "Site search",
        icon: "search",
        status: "replaced",
        note: "A Pro-tier Framer feature with a native Wix equivalent, configured during the build rather than carried across.",
      },
      {
        item: "Code components and custom code",
        icon: "code",
        status: "replaced",
        note: "React code components don't port, and analytics tags, chat widgets and JSON-LD get re-added to the Studio site deliberately rather than pasted.",
      },
      {
        item: "The site itself",
        icon: "ban",
        status: "lost",
        note: "Framer states it doesn't provide a way to export published sites as HTML files or static bundles, so there is no build to hand over and the design is recreated.",
      },
      {
        item: "Form submission history",
        icon: "users",
        status: "lost",
        note: "Framer documents no submissions inbox and no export, so whatever you have is already wherever you routed it, and anything never routed anywhere isn't recoverable.",
      },
    ],
    footnote:
      "The pattern: your content and your URLs travel, and nothing about the build does. That makes the crawl of your live site the most important artefact in the project, which is true on no other platform we migrate from.",
    cta: {
      heading: "Already started moving off Framer and stalled?",
      paragraph:
        "You don't have to restart. Send us the exports you've pulled and the Studio site you've begun, and we'll finish the CMS modelling, the rebuild and the cutover.",
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
      "Seven stages, and the first one carries more weight here than anywhere else. With no code export, the crawl is the only complete record of what you built, so it happens before anything is touched and while the Framer site is still live.",
    items: [
      {
        title: "Crawl the live site, because it's the only copy",
        navLabel: "Crawl first",
        duration: "1 to 2 days",
        body: "On every other platform the crawl double-checks an export file. Here it replaces one. Everything the rebuild works from comes out of this stage.",
        lead: "What gets captured:",
        points: [
          {
            label: "Every indexable URL with its performance",
            body: "Pulled from a crawl and Search Console together, so the redirect map is built from what actually earns traffic.",
          },
          {
            label: "Full page copy, section by section",
            body: "Because there's no HTML export, the live rendered page is the source of truth for text that has to be recreated.",
          },
          {
            label: "Metadata and structured data per page",
            body: "Titles, descriptions, Open Graph and any JSON-LD you added by hand, none of which appear in any Framer export.",
          },
          {
            label: "Your plan and its ceilings",
            body: "Pages, collections, seats and whether redirects are available. Usually where the real reason for the move gets confirmed.",
          },
        ],
      },
      {
        title: "Export what Framer actually lets you",
        navLabel: "What you can export",
        duration: "1 day",
        body: "Two plugins and a lot of manual work. This runs while the site is still paid and live, never after.",
        lead: "What comes out:",
        points: [
          {
            label: "CMS collections, via the CMS Export plugin",
            body: "Framer's own plugin writes each collection to CSV, though it was last updated before the June 2026 CMS rebuild, so the output gets opened and checked rather than trusted.",
          },
          {
            label: "Redirects, via the Redirect Sync plugin",
            body: "One CSV containing every redirect, assuming the site is on a plan that has them at all.",
          },
          {
            label: "Media, downloaded by hand",
            body: "There's no documented bulk asset download, so images come down manually before anything is cancelled.",
          },
          {
            label: "Nothing gets cancelled yet",
            body: "The Framer site stays live until the Studio site is serving the domain. It's the only copy of the design that exists.",
          },
        ],
      },
      {
        title: "Model the content in Wix",
        navLabel: "Structure and CMS",
        duration: "2 to 4 days",
        body: "Framer collections and Wix collections are the same idea, so this is translation. It's also where the ceiling you were designing around disappears.",
        lead: "What happens here:",
        points: [
          {
            label: "Collections mapped field by field",
            body: "Wix imports up to 50,000 items per CSV, so the collection count and item count Framer capped are no longer the shape of the problem.",
          },
          {
            label: "References rebuilt as real relationships",
            body: "Whatever Framer's export did with reference fields gets turned back into proper Wix references, or the connections you designed quietly vanish.",
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
        body: "Built on a staging URL while Framer keeps serving your domain. Framer sites are usually well designed, so this is a faithful rebuild rather than a redesign.",
        lead: "What the build covers:",
        points: [
          {
            label: "Matched from the live site, not from a file",
            body: "Layout, type scale and spacing rebuilt against the running Framer site, which is why it stays up throughout.",
          },
          {
            label: "A design system rather than one-off pages",
            body: "Global styles and breakpoints, so the next change is one edit rather than forty.",
          },
          {
            label: "Real content from day one",
            body: "The imported CMS content goes in during the build, so what you sign off on is the site rather than a placeholder version of it.",
          },
        ],
      },
      {
        title: "Rebuild forms, motion and anything localized",
        navLabel: "Forms and motion",
        duration: "2 to 4 days",
        body: "The three things with no export path at all. Each gets rebuilt natively and tested before the domain moves.",
        lead: "What gets rebuilt:",
        points: [
          {
            label: "Forms, pointed at the same destinations",
            body: "Whatever Framer was routing to, email, a sheet or a webhook, keeps receiving, so nothing downstream breaks on cutover day.",
          },
          {
            label: "Motion, in Studio's own animation tools",
            body: "Matched to the original intent rather than frame for frame, and editable afterwards by someone who isn't a designer.",
          },
          {
            label: "A second language, if there is one",
            body: "Rebuilt on Wix Multilingual with its own URLs and hreflang, planned during the build rather than retrofitted after.",
          },
        ],
      },
      {
        title: "Map the redirects, then cut over",
        navLabel: "Redirects and cutover",
        duration: "2 to 3 days",
        body: "Built from the crawl inventory, plus whatever the Redirect Sync export gave you. Tested before the domain moves, never after.",
        lead: "The sequence:",
        points: [
          {
            label: "Mapped one to one from the inventory",
            body: "Never a blanket rule pointing an old section at a new index page, which avoids 404s and converts every ranking page into a bounce.",
          },
          {
            label: "Uploaded in CSV batches",
            body: "Wix takes up to 500 redirect rows per file, which is how a long history gets loaded.",
          },
          {
            label: "The Framer site stays up until it answers correctly",
            body: "Because it's the only copy of the design, it isn't cancelled until the new site is live and verified.",
          },
        ],
      },
      {
        title: "Watch it land",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Daily at first, then weekly. The Framer subscription can end once this window opens clean, and not before.",
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
    heading: "Not sure whether leaving Framer is worth it?",
    paragraph:
      "Send us the URL and your current plan. We'll crawl the site, tell you what can actually be carried out of it, what it would cost to rebuild, and whether the ceiling you've hit is worth moving over. Often it isn't.",
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
      "Every Framer limit on this page is quoted from Framer's own documentation, linked so you can check it rather than take our word for it. Plan limits move, so the date below matters.",
    verified: "2026-08-20",
    items: [
      {
        label: "Framer: Can I export my website to HTML and self-host it?",
        href: "https://www.framer.com/help/articles/can-i-export-my-website-to-html-and-self-host-it/",
        note: "The claim this page rests on: Framer does not provide a way to export published sites as HTML files or static website bundles, because published sites are not fully static.",
      },
      {
        label: "Framer: Porting your data from Framer",
        href: "https://www.framer.com/help/articles/porting-your-data-from-framer/",
        note: "The EU Data Act page that says site files can be downloaded at any time, names no method for doing it, and links back to the article above. Read both.",
      },
      {
        label: "Framer: CMS Export plugin",
        href: "https://www.framer.com/marketplace/plugins/cms-export/",
        note: "Framer's own plugin for writing a CMS collection out to CSV, last updated before the June 2026 CMS rebuild.",
      },
      {
        label: "Framer: Redirect Sync plugin",
        href: "https://www.framer.com/marketplace/plugins/redirect-sync/",
        note: "Framer's own plugin for exporting and importing site redirects as a single CSV.",
      },
      {
        label: "Framer: Pricing",
        href: "https://www.framer.com/pricing",
        note: "The plan ceilings quoted on this page, including 30 pages and two CMS collections on Basic, and site redirects as a Pro feature. Checked 20 August 2026.",
      },
      {
        label: "Framer: Members, roles, and permissions",
        href: "https://www.framer.com/help/articles/member-roles-and-permissions/",
        note: "The Content Editor role and how editor seats are billed, alongside free view-only access.",
      },
      {
        label: "Framer: Setting up redirects to maintain SEO ranking",
        href: "https://www.framer.com/help/articles/how-to-setup-redirects-to-maintain-seo-ranking/",
        note: "Where redirects live, wildcard matching, and the limit that you can only redirect sub-paths within your current domain.",
      },
      {
        label: "Framer: Exporting assets",
        href: "https://www.framer.com/help/articles/exporting-assets/",
        note: "The only documented asset export is PNG or JPG at 1x to 4x from the export panel, which is not a bulk media download.",
      },
      {
        label: "Framer: How can I access the robots.txt file?",
        href: "https://www.framer.com/help/articles/how-can-i-access-the-robots-txt-file/",
        note: "Overriding robots.txt requires Static Files, which Framer documents as available on Pro and Enterprise plans.",
      },
      {
        label: "Framer: Framer 3.0",
        href: "https://www.framer.com/updates/framer-3",
        note: "The 16 June 2026 release that rebuilt the CMS, which is why the export plugin's output gets checked rather than trusted.",
      },
      {
        label: "Wix CMS: Importing content into a collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a Wix collection, capped at 50,000 items per file.",
      },
      {
        label: "Wix: Importing or exporting URL redirects with a CSV file",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import on the Wix side, up to 500 rows at a time.",
      },
    ],
  },

  faq: {
    heading: ["Framer to Wix Studio,", "answered from the docs"],
    subhead:
      "What people ask on these calls once they've discovered how little Framer lets them take with them.",
    ctas,
    items: [
      {
        q: "Can I export my Framer site and move it to Wix Studio?",
        a: "Not the site itself, and this is the thing most people don't know until they try. Framer states it doesn't provide a way to export published sites as HTML files or static website bundles, because published sites are not fully static and depend on its own infrastructure. Your content is different: CMS collections export to CSV through Framer's own plugin, and so do your redirects. So the content moves and the build is recreated. Worth knowing that a newer Framer page written for EU data portability rules says site files can be downloaded at any time, but it names no method and links back to the article saying export isn't available, so check your own account before assuming either.",
      },
      {
        q: "What happens to my Framer CMS content in Wix Studio?",
        a: "It becomes a Wix CMS collection, and the two systems line up closely enough that this is translation rather than redesign. Framer's official CMS Export plugin writes each collection to a CSV, and Wix imports up to 50,000 items per file, so volume stops being the constraint it was. Two cautions. Framer doesn't document how reference and multi-reference fields serialise into the export, so the file gets opened and inspected rather than assumed. And the plugin was last updated before Framer rebuilt its CMS in June 2026, so its output is checked against the live collection before anything is imported.",
      },
      {
        q: "Will I lose my Google rankings moving from Framer to Wix Studio?",
        a: "Not if the URLs are handled deliberately, and most of them don't need to change. Neither Framer nor Wix Studio forces a path structure on standard pages, so /about stays /about, and Wix's dynamic page prefix is editable so collection page paths can be preserved too. Where a Framer site is on a plan that includes redirects, that list exports to CSV and merges straight into the new map. The real risk is metadata: titles, descriptions and Open Graph live in Framer's page settings, appear in no export, and have to be captured from a crawl and diffed against the new site before the domain moves.",
      },
      {
        q: "Do my Framer forms and form submissions transfer to Wix Studio?",
        a: "The forms get rebuilt natively and the destinations keep working. Framer routes submissions out to email, a Google Sheet or a webhook rather than storing them in a queryable inbox, so on cutover the Wix form points at the same place and nothing downstream notices. Framer documents no submissions export and no submissions database, which means there's no historical record inside Framer to migrate. If your submissions were only ever going to an inbox, that inbox is your archive.",
      },
      {
        q: "What happens to my Framer animations in Wix Studio?",
        a: "They get rebuilt, matched to intent rather than copied frame for frame. Framer's motion is defined inside the project and there's no export path for it, so there's nothing to port even in principle. In practice this is the stage worth spending time on, because the animation is usually why the site was built in Framer. The upside is that Studio's motion tools live in the same interface as the rest of the site, so the person updating the page next year can adjust it without needing whoever designed it.",
      },
      {
        q: "I've hit Framer's page or CMS collection limit. Should I move to Wix Studio?",
        a: "It depends on whether the next tier actually solves it or just delays it. Framer's Basic plan allows 30 pages and two CMS collections, and Pro raises both, with paid add-ons above that. If you're publishing content regularly, the pattern to watch for is designing the site around the ceiling: merging pages that should be separate, or squeezing two content types into one collection. That's the point where the plan is shaping the site rather than supporting it. Check the current numbers on Framer's pricing page before deciding, because they move.",
      },
      {
        q: "Does Wix Studio have on-page editing like Framer's?",
        a: "Yes, and without the seat cost. Framer's on-page editing lets collaborators with content permissions update text, images and CMS content from the published site, with changes reviewed and published by someone with publishing rights. Framer bills additional editors monthly and content editors on top of that. On a Wix Studio site, giving someone the ability to edit content is a permissions setting rather than a purchase, which is usually the practical difference for a team where more than two or three people touch the site.",
      },
      {
        q: "Do my Framer URLs have to change moving to Wix Studio?",
        a: "Mostly not. Standard pages keep their paths because neither platform imposes a structure on them. Collection pages come down to how the Wix CMS is set up: the dynamic page prefix is a default you can edit, so an existing /blog/post-name or /work/project-name structure carries across rather than being redirected. One Framer detail worth knowing if you were planning any consolidation: Framer only lets you redirect sub-paths within your current domain, so anything cross-domain was never handled there anyway.",
      },
      {
        q: "How much does a Framer to Wix Studio migration cost, and how long does it take?",
        a: "From €1,250, quoted as a fixed price before anything starts, and two to five weeks from kickoff to launch plus a 30-day monitoring window that runs while you're already live. The number moves on page count first, because with no code export every page is rebuilt from the live site, then on how many CMS collections need modelling and how much of the motion work has to be recreated rather than simplified. Worth putting against it: your current Framer plan, any add-ons you bought to raise a ceiling, and what you pay per editor seat.",
      },
      {
        q: "Can I migrate my Framer site to Wix Studio myself?",
        a: "For a small site, yes, and the CMS export makes the content half straightforward. Where it turns is specific to Framer. There's no code export, so you're recreating every page from what's on screen rather than from a file, and anything you miss is gone once the subscription ends. Framer documents no bulk media download, so images come down by hand. Reference fields may or may not survive the export in a usable shape and you won't know until you open the CSV. And metadata across a large site has to be lifted from a crawl, which is where organic traffic actually gets lost. The reliable signal is page count: ten pages and one collection is a weekend, and sixty pages with three collections and real motion work is not. Whatever you decide, do the crawl before you cancel anything.",
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
        label: "Webflow to Wix Studio",
        logo: "/platforms/webflow.svg",
        href: "/services/webflow-to-wix-studio",
        desc: "The platform teams usually weigh against Framer, and the one that does hand you a full code export.",
      },
      {
        label: "HTML to Wix Studio",
        icon: "code",
        href: "/services/html-to-wix-studio",
        desc: "The opposite problem: no vendor, no export button, and every file already yours.",
      },
      {
        label: "Wix Studio website design",
        icon: "palette",
        href: "/services/wix-studio-website-design",
        desc: "Coming from Framer and worried the design won't hold up? This is what a Studio build involves.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what you can actually", "carry out of Framer"],
    paragraph:
      "Send us your site and your current plan. We'll crawl it, tell you what exports and what has to be rebuilt, what it would cost, and whether it's worth doing at all. Free, and sometimes the answer is that you should stay.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Framer to Wix Studio migration. Full site crawl and content capture, CMS collection export and remodelling, responsive Studio build, form and animation rebuild, redirect mapping, metadata parity, and 30 days of post-launch index monitoring. From a Wix Legend Partner.",
    priceFrom: "1250",
  },
};
