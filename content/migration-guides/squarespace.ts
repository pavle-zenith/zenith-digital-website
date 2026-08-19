import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/squarespace-to-wix-studio
 * Targets: squarespace to wix studio · migrate off squarespace · squarespace
 * export limitations · squarespace alternative for agencies.
 *
 * THE ANGLE: the design ceiling. Squarespace sites rarely fail, they stop
 * being able to become the next thing. The technical spine of the page is
 * Squarespace's own export documentation, which is unusually specific about
 * what it leaves behind, and almost nobody writing on this topic quotes it.
 *
 * OWNER — verify before launch. Every row in the transfers table is a testable
 * claim. The Squarespace-side rows are sourced to Squarespace's help centre and
 * the Wix-side rows to Wix's, all linked in `sources` and checked 19 Aug 2026.
 * Re-check if Squarespace changes its export scope.
 *
 * Client facts: Hunting Brook Gardens was on Squarespace before the Wix Studio
 * work (owner-confirmed) and has €140k in course sales since. MindEd is cited
 * for SCALE ONLY (70+ pages, 2 languages); its source platform is deliberately
 * not stated anywhere on this page, because it hasn't been confirmed.
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
      "Squarespace's export is one WordPress XML file and it leaves more behind than it takes. Exactly what transfers, what doesn't, how the URLs change, and what the move costs. From €1,750.",
  },

  hero: {
    name: "Squarespace to Wix Studio migration",
    h1: "Squarespace to Wix Studio: what the export actually contains",
    subhead:
      "Squarespace exports one WordPress-format XML file, and its own documentation lists more things left out than taken. Here's what really moves, which URLs change, and what it costs to do it without dropping rankings.",
    chips: [
      "Every URL mapped before cutover",
      "€140k in course sales for Hunting Brook",
      "70+ page migrations delivered",
    ],
    ctas,
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
        item: "Blog posts",
        icon: "pen",
        status: "rebuilt",
        note: "Only one blog page exports. If you run more than one, Squarespace makes you pick a primary and the others are on you. The chosen blog brings its posts and up to 1,000 comments per post; drafts don't come at all.",
      },
      {
        item: "Blog post URLs",
        icon: "redirect",
        status: "lost",
        note: "Every one of them changes. Squarespace posts sit under the blog page's own slug, /blog-name/post-name, while Wix Blog puts posts under a /post/ prefix that can't be removed. There's no configuration that makes these match, so every post URL needs a mapped redirect. On a long archive this is the single biggest line of work in the project.",
      },
      {
        item: "Standard page URLs",
        icon: "transfer",
        status: "carries",
        note: "Ordinary pages keep their slugs. A page at /about stays at /about, so the redirect work concentrates on blog posts, products, and anything that lived under a page type Wix structures differently.",
      },
      {
        item: "Images and media files",
        icon: "image",
        status: "rebuilt",
        note: "The XML references images by their Squarespace URL rather than bundling the files, so media gets pulled down and re-uploaded to Wix's Media Manager. Alt text is re-applied during that pass, which is also the cheapest moment to fix the images that never had any.",
      },
      {
        item: "Index, portfolio, gallery, album, and cover pages",
        icon: "layers",
        status: "lost",
        note: "Squarespace lists all of these as not included in the export, along with info pages and calendar pages. In practice this is where a design-led Squarespace site keeps most of its personality, so it's the bulk of what gets rebuilt. Gallery pages are the one partial exception: on 7.0 they export, including York project pages.",
      },
      {
        item: "Store pages and products",
        icon: "cart",
        status: "rebuilt",
        note: "Store pages aren't in the XML and product blocks don't export with it. Products come out through a separate CSV covering physical and service products, and that CSV leaves out additional product info, customer reviews, featured images, product image alt text, and variant images. Digital products have no export at all.",
      },
      {
        item: "Orders and customer accounts",
        icon: "receipt",
        status: "lost",
        note: "Orders export for your own records and don't import anywhere. Customer accounts stay with Squarespace. The new store starts clean, so if you rely on repeat customers having a login, that's a change to communicate rather than absorb.",
      },
      {
        item: "Form submissions",
        icon: "form",
        status: "rebuilt",
        note: "Each form block exports its own submissions to CSV from its Storage tab, one file per form rather than one dataset for the site. Uploaded files aren't in the export, though the CSV carries direct links you can download from before you switch off. Forms themselves get rebuilt in Wix.",
      },
      {
        item: "Member areas and paywalled content",
        icon: "lock",
        status: "lost",
        note: "Member areas aren't part of the export, and Wix doesn't accept imported member lists in any case. Anyone with a login signs up again on the new site. If your business runs on gated content, this is the constraint that sets the launch date.",
      },
      {
        item: "Custom CSS and style settings",
        icon: "brush",
        status: "lost",
        note: "Squarespace names both explicitly as excluded, which sounds worse than it is. Custom CSS on a Squarespace site is usually there to push a template past what it was built to do. In Studio that behaviour is native, so the CSS isn't ported, it stops being necessary.",
      },
      {
        item: "SEO titles, descriptions, and redirects",
        icon: "tags",
        status: "rebuilt",
        note: "Per-page SEO fields don't ride along in the XML and get re-entered on the new site, then diffed against the old ones before cutover. Any URL mappings you've already built up in Squarespace are worth exporting first: they're a ready-made list of addresses people still reach the site through.",
      },
      {
        item: "Domain and email",
        icon: "globe",
        status: "carries",
        note: "A domain registered with Squarespace transfers out, or stays where it is and just repoints, which is faster and what we usually do. Google Workspace bought through Squarespace is a separate billing relationship to move, and it's worth handling before launch week rather than during it.",
      },
    ],
    footnote:
      "The one-line summary: your words and your standard pages come with you, your structure and your design don't, and your blog URLs all change. Everything in the project plan follows from that last one.",
  },

  steps: {
    heading: "How a Squarespace migration runs",
    intro:
      "Seven stages, three to five weeks of active work. Your Squarespace site stays live and taking bookings until the day the domain moves.",
    items: [
      {
        title: "Crawl before you export",
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
        duration: "2 days",
        body: "The map is written and tested before the domain moves, never after. Every blog post needs a row, because every blog post URL changes.",
        lead: "How cutover runs:",
        points: [
          {
            label: "One row per post, mapped by hand",
            body: "Squarespace nests posts under the blog page slug and Wix puts them under a /post/ prefix, so there's no pattern rule that does this correctly.",
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
            body: "Caught and resubmitted while we're still on the project, at no extra cost.",
          },
          {
            label: "Positions sliding on mapped URLs",
            body: "A redirect that resolves isn't proof the mapping was right. Position data over four weeks is.",
          },
        ],
      },
    ],
  },

  seoMechanics: {
    heading: "The URL problem, in detail",
    intro:
      "Almost all the SEO risk in this move sits in one place. Understanding exactly where makes the rest of the project straightforward.",
    items: [
      {
        title: "Blog URLs change and there's no way around it",
        body: "Squarespace nests posts under the blog page's slug: /journal/spring-planting. Wix Blog puts every post under a /post/ prefix that its documentation confirms can't be removed: /post/spring-planting. Neither platform lets you configure your way to a match. So on a site with two hundred posts, that's two hundred redirect rows, and there is no shortcut that doesn't cost you the archive's rankings. Anyone quoting a Squarespace migration without a per-post redirect map either hasn't looked at your blog or is planning to point it all at the homepage.",
      },
      {
        title: "Your standard pages are the easy part",
        body: "Ordinary pages keep their slugs, so /about, /contact, and /services move across unchanged. That's useful for scoping: the size of a Squarespace migration is almost entirely a function of how much you've blogged and how many products you sell, not how many pages the navigation has.",
      },
      {
        title: "Export your existing URL mappings first",
        body: "Squarespace's URL mappings feature is where previous site changes were papered over, and most long-running sites have accumulated a list. Those old addresses still have links pointing at them, and if they only survive because of a mapping on the old platform, they die the day it's switched off. Capture the list and fold it into the new redirect map, so a URL that's been redirected twice still resolves.",
      },
      {
        title: "Metadata doesn't ride along in the XML",
        body: "Titles, descriptions, and social images are per-page settings that the export doesn't carry, so they get re-entered on the new site. The failure mode is a site launching with Wix's default title pattern on forty pages and nobody noticing for a month, because the traffic decays gradually instead of dropping. We export the old metadata during the crawl specifically so there's something to diff against before cutover.",
      },
      {
        title: "Product URLs deserve their own pass",
        body: "Store pages aren't in the export and product URLs are structured differently on each platform, so every product needs mapping alongside the blog. Products also tend to attract the links you'd least like to break, from suppliers, directories, and press. Worth checking by hand rather than pattern-matching, especially where you've retired lines and the old product pages are still indexed.",
      },
    ],
  },

  mistakes: {
    heading: "Five ways a Squarespace move goes wrong",
    intro:
      "Four of these come from trusting the export. The fifth comes from rebuilding the same ceiling in a new place.",
    items: [
      {
        title: "Treating the XML as a complete backup",
        body: "It isn't, and Squarespace never claims it is. Index pages, portfolio pages, album pages, cover pages, info pages, calendar pages, store pages, audio blocks, video blocks, drafts, style settings, and custom CSS are all named as excluded. A team that exports the XML, cancels the plan, and then starts building has lost the reference for most of the site. Keep Squarespace running until the new site is live and verified.",
      },
      {
        title: "Missing the second blog",
        body: "Only one blog page exports. Sites that ran a news feed and a separate case-study or resources feed lose everything on the secondary ones from the export, and it's easy to miss because the file looks complete. If your site has more than one blog page, capture the others by crawl before you touch anything.",
      },
      {
        title: "Assuming products came across intact",
        body: "The products CSV omits additional product info, customer reviews, featured images, product image alt text, and variant images, and digital products aren't in it at all. A store that imports the CSV and calls it done ships with missing hero images and no alt text, right when product pages are the ones you most want indexed. Budget a pass to re-attach all of it.",
      },
      {
        title: "Pointing the whole blog at one page",
        body: "The lazy version of this migration redirects every /journal/* URL to the new blog index. Google treats a redirect to an irrelevant page as a soft 404, so the archive's rankings go rather than transfer. It's more work to map two hundred posts one to one, and it's the work you're actually paying a migration for.",
      },
      {
        title: "Rebuilding the template you were trying to escape",
        body: "The reason to leave is the ceiling, so recreating the same page-by-page structure in Studio spends the budget and keeps the problem. If the courses are still individual pages and the team page is still hand-laid, you've bought a redesign. Model what repeats as collections during the build, when it's a design decision, rather than afterwards, when it's a second project.",
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

  logistics: {
    heading: "Timeline and cost",
    priceFrom: "From €1,750",
    timeline: "3 to 5 weeks, plus 30 days of monitoring",
    note: "Flat pricing, the same number regardless of which platform you're leaving. What moves it on a Squarespace move specifically is the size of the blog archive, because every post needs a redirect row, and the size of the store, because the products CSV arrives incomplete and the gaps are filled by hand. Page count matters far less than either. A brochure site with a short blog sits at the bottom of the range; a multi-blog site with a catalogue behind it sits at the top.",
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
    heading: "Migrations of this shape",
    intro:
      "Hunting Brook Gardens came to us off Squarespace and now runs its course business on Wix Studio, with €140k in course sales since the work began. MindEd is here for scale rather than platform: 70+ pages across two languages, which is the size of project the redirect discipline above exists for.",
    workSlugs: ["hunting-brook-gardens", "minded"],
  },

  faq: {
    heading: ["Squarespace to Wix Studio,", "answered properly"],
    subhead:
      "What people ask on these calls once they've read the export documentation.",
    ctas,
    items: [
      {
        q: "Can I export my Squarespace site and import it into Wix?",
        a: "Partly. Squarespace gives you one .xml file in WordPress format containing your layout pages, one blog and its posts, and your text and image blocks. It leaves out index, portfolio, album, cover, info, calendar, and store pages, plus audio and video blocks, drafts, style settings, and custom CSS. So the words come across and the site doesn't. Everything the XML omits gets rebuilt, which is most of the visual design.",
      },
      {
        q: "Will I lose my Google rankings?",
        a: "Not if the redirect map is done properly, and on this move that map is the project. Standard pages keep their slugs, so /about stays /about. Blog posts all change, because Squarespace nests them under the blog page's slug and Wix puts them under a /post/ prefix that can't be removed. Every post gets a one-to-one redirect, tested against the URL inventory before the domain moves, then watched in Search Console for 30 days after.",
      },
      {
        q: "What happens to my blog if I have more than one?",
        a: "Only one exports. Squarespace prompts you to select a primary blog page and the rest aren't in the file. We capture the others by crawling the live site before anything is switched off, which works fine but has to happen while the site is still up. It's the most common thing to discover too late on this migration.",
      },
      {
        q: "Do my products transfer?",
        a: "Physical and service products come across through a separate CSV export, not through the XML. The CSV leaves out additional product information, customer reviews, featured images, product image alt text, and variant images, so budget a pass to re-attach those. Digital products have no export at all and get rebuilt by hand. Orders export for your records but can't be imported anywhere.",
      },
      {
        q: "What about my form submissions?",
        a: "Each form block exports its own submissions to CSV from its Storage tab, so a site with six forms means six files rather than one dataset. Uploaded files aren't in the export, but the CSV includes direct links, so you can pull them down before the plan lapses. New forms get built in Wix and can post to the same places the old ones did.",
      },
      {
        q: "Can I keep my domain?",
        a: "Yes. If the domain is registered with Squarespace you can transfer it out, or leave it registered there and repoint it, which is faster and what we usually do. Either way the Squarespace site stays live until the switch. Google Workspace bought through Squarespace is a separate billing relationship and worth sorting out before launch week rather than during it.",
      },
      {
        q: "How long does it take?",
        a: "Three to five weeks of active work for most sites, then a 30-day monitoring window that runs after you're already live. The blog archive is what moves that number: a site with fifteen posts and one with four hundred are different projects, because every post needs a mapped redirect either way.",
      },
      {
        q: "Why Wix Studio rather than WordPress or Webflow?",
        a: "WordPress solves the ceiling by handing you a maintenance job: plugin updates, security patching, hosting. Webflow solves it but leaves editing to whoever understands the class system, which recreates the bottleneck you're leaving. Studio gives you the responsive control and the CMS without either, and the people who write your content can publish it. If you want the custom-code answer instead, we build those too, and we'll say so if that's what your case actually calls for.",
      },
      {
        q: "Is my custom CSS lost?",
        a: "It's excluded from the export, yes, and mostly that's fine. Custom CSS on a Squarespace site is usually there to push a template past what it was designed to do. In Studio that control is native, so the CSS isn't ported across, it stops being needed. Send it over anyway before we quote: it's the fastest way to see what the site was trying to be.",
      },
      {
        q: "Can I run the two sites side by side?",
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
        label: "Wix Classic to Wix Studio",
        logo: "/platforms/wix.svg",
        href: "/services/wix-classic-to-wix-studio",
        desc: "The Wix-to-Wix move, where the URLs mostly hold and the layout has to be rebuilt anyway.",
      },
      {
        label: "Wix Harmony to Wix Studio",
        logo: "/platforms/wix.svg",
        href: "/services/wix-harmony-to-wix-studio",
        desc: "Weighing Harmony against Studio for a new build? Read this before you pick, because the choice is one-way.",
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
    priceFrom: "1750",
  },
};
