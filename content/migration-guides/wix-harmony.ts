import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/wix-harmony-to-wix-studio
 * Targets: wix harmony to wix studio · wix harmony vs wix studio · does wix
 * harmony have a cms · can i upgrade wix harmony later.
 *
 * THE ANGLE, and it writes itself from Wix's own documentation: Harmony is a
 * one-way door with no CMS and no multilingual. Wix states both plainly. A
 * dozen partner blogs have written "Harmony vs Studio" comparison posts;
 * nobody has published a service page for moving off it, which is the gap.
 *
 * NO PROOF BLOCK ON PURPOSE. Harmony is Wix's newest editor, so no agency has
 * a Harmony migration case study and pretending otherwise would be the one
 * thing that discredits the rest of the page. MindEd appears in prose only, as
 * an illustration of a site Harmony could not host (70+ pages, two languages),
 * never as a Harmony client.
 *
 * OWNER — this page has the shortest shelf life on the site. Wix lists the CMS
 * and Wix Multilingual as features it is actively adding to Harmony. When
 * either ships, the ceiling argument changes and this page needs rewriting,
 * not patching. All claims were checked against Wix support docs 19 Aug 2026.
 *
 * TODO, to match the Wix Classic template: this guide has no `glance`,
 * `benefits`, `cost` or `sources` block yet, so it renders without them and
 * falls back to the sitewide pricing tiers. Harmony's claims lean hardest on
 * Wix's own documentation, so a `sources` block matters most here.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const wixHarmony: MigrationGuideContent = {
  slug: "wix-harmony-to-wix-studio",
  publish: true,
  platform: "Wix Harmony",
  seo: {
    title: "Wix Harmony to Wix Studio | Migration Guide | Zenith Digital",
    description:
      "Wix Harmony sites can't be transferred to Wix Studio, and Harmony has no CMS or multilingual yet. What that means, what a rebuild involves, and how to decide before you start. From €1,750.",
  },

  hero: {
    name: "Wix Harmony to Wix Studio migration",
    h1: "Wix Harmony to Wix Studio: the move Wix doesn't let you make",
    subhead:
      "Wix states it plainly: once a site is built in Harmony, it can't be transferred to the Wix Editor or the Studio Editor. Harmony also ships without a CMS and without multilingual. Here's what that costs you, and how to decide before it's a rebuild.",
    chips: [
      "Harmony to Studio is a rebuild, per Wix",
      "No CMS, no multilingual in Harmony",
      "Every claim linked to Wix's docs",
    ],
    ctas,
  },

  fit: {
    heading: "Who this page is for",
    intro:
      "Two readers end up here, and they need different things. One has a Harmony site and has hit a wall. The other is choosing between Harmony and Studio and hasn't started yet, which is the far better place to be standing.",
    goodFit: [
      "You need database-driven pages",
      "A second language, with no native way to run one",
      "Choosing your platform right now, before you build",
      "Donations, Hotels, Music, or Referral Programs",
      "A site that has outgrown hand-built pages",
      "A catalogue, directory, or course library",
    ],
    notAFit: [
      "A small site Harmony handles perfectly well",
      "A Harmony site a week old with no traffic yet",
      "Waiting only on accordions, tabs, or hover states",
      "You're on the classic Wix Editor, not Harmony",
      "No plans that need a CMS behind them",
    ],
    footnote:
      "If you haven't built yet, this is the part that matters: Wix can't move a site into Harmony, and can't move one out to Studio. Pick for where the site needs to be in two years.",
  },

  transfers: {
    heading: "What moves from Harmony to Studio",
    intro:
      "The honest headline first: the site itself doesn't. Wix states that a site created in the Harmony Editor can't be transferred to either the Wix Editor or the Studio Editor. So this is a rebuild, and the table below is about what survives the rebuild rather than what transfers.",
    rows: [
      {
        item: "The Harmony site itself",
        icon: "ban",
        status: "lost",
        note: "There's no conversion path in either direction. Wix's documentation is unambiguous: once you've created a site with the Harmony Editor, it can't be transferred to the Wix Editor or the Studio Editor, and you create a new site on the platform you want instead.",
      },
      {
        item: "Page layouts and design",
        icon: "responsive",
        status: "lost",
        note: "Nothing about a Harmony layout carries. In practice this matters less than it sounds: Harmony sites tend to be recent, so you're rebuilding months of work rather than years, and Studio gives you breakpoint-level control Harmony's automatic responsive behaviour doesn't expose.",
      },
      {
        item: "Text, images, and media files",
        icon: "image",
        status: "carries",
        note: "Your Media Manager sits at account level, so every image and file you've uploaded is already available inside the new Studio site. Copy moves across as content. This is the part that makes a Harmony rebuild much cheaper than it first sounds.",
      },
      {
        item: "Page URLs",
        icon: "redirect",
        status: "carries",
        note: "Both editors run on Wix hosting and neither forces a path structure on standard pages, so you set the same slugs on the new site and the addresses hold. A page at /services stays at /services, and there's little to redirect unless you're deliberately restructuring.",
      },
      {
        item: "Blog posts",
        icon: "pen",
        status: "rebuilt",
        note: "Wix Blog keeps its /post/ prefix on both, so post addresses hold. The posts themselves are re-created on the new site with their publish dates and per-post SEO fields re-entered. On a Harmony site that's usually a short archive.",
      },
      {
        item: "CMS collections and dynamic pages",
        icon: "server",
        status: "replaced",
        note: "There's nothing to carry, because Harmony doesn't have a CMS yet. Wix lists it among the apps it's currently adding. Everything on your Harmony site is a hand-built page, and the rebuild is where the repeating ones become one collection and one dynamic layout.",
      },
      {
        item: "A second language",
        icon: "languages",
        status: "replaced",
        note: "Same shape of answer. Wix lists Wix Multilingual among the apps still being added to Harmony, so there's no native multilingual layer to move. Studio has one, which is why a site that needs two languages was never a Harmony site.",
      },
      {
        item: "Accordions, tabs, audio players, glass effect, text mask",
        icon: "puzzle",
        status: "replaced",
        note: "Wix names all of these, plus hover state customization, as elements and effects it's adding to Harmony. They're native in Studio, so anything you built a workaround for in Harmony gets thrown away rather than ported.",
      },
      {
        item: "Donations, Hotels, Music, and Referral Programs",
        icon: "plug",
        status: "replaced",
        note: "All four are on Wix's list of apps not yet available in Harmony. If your business needs one of them, the app gets added and configured properly on the Studio build rather than worked around.",
      },
      {
        item: "Contacts and form submissions",
        icon: "users",
        status: "rebuilt",
        note: "Contacts export from the old site as a CSV and import into the new one, which is the route Wix documents for moving contacts between sites in an account. Forms themselves get rebuilt, and it's worth exporting submissions before the old site is retired.",
      },
      {
        item: "Site members",
        icon: "lock",
        status: "lost",
        note: "Same rule as everywhere else on Wix: member lists can't be exported or imported between sites, and Wix cites privacy as the reason. Anyone signed up re-registers on the new site. Harmony sites are young enough that this is usually a small list, which is an argument for moving sooner rather than later.",
      },
      {
        item: "Store products",
        icon: "cart",
        status: "rebuilt",
        note: "Products export from the old store as a CSV and import into the new one, the same tool Wix documents for moving products between its own stores. Digital products aren't covered by it. Order history exports for your records and can't be imported.",
      },
      {
        item: "Premium plan and domain",
        icon: "globe",
        status: "carries",
        note: "Both reassign to the new site from inside your Wix account, which is exactly what Wix points you to when it tells you a Harmony site can't be transferred. No second subscription, no registrar change, and the Harmony site stays live until you switch.",
      },
    ],
    footnote:
      "Read it as two lists. Everything that lives in your Wix account (media, domain, plan, contacts) follows you. Everything that lives inside the Harmony site gets built again. The gap between those two lists is the cost of the move, and it's smaller on a young site than on any other migration we do.",
  },

  steps: {
    heading: "How a Harmony rebuild runs",
    intro:
      "Six stages, and a shorter project than most migrations because there's less history to protect. Your Harmony site stays live throughout.",
    items: [
      {
        title: "Confirm you actually need to move",
        duration: "1 day",
        body: "The cheapest outcome of this call is that you don't. Wix publishes what it's adding to Harmony, so the question is whether your blocker is on that list.",
        lead: "How we tell the two apart:",
        points: [
          {
            label: "A missing element means wait",
            body: "Accordions, tabs, audio players, glass effect, text mask and hover state customization are all named by Wix as coming. Waiting is free; a rebuild isn't.",
          },
          {
            label: "A missing architecture means move",
            body: "The CMS and Wix Multilingual are structural, and neither has a shipping date attached. Building fifty pages by hand while you wait is its own cost.",
          },
          {
            label: "A missing app depends on the app",
            body: "Donations, Hotels, Music and Referral Programs are on the same list. Whether to wait comes down to how central that app is to how you take money.",
          },
        ],
      },
      {
        title: "Inventory the Harmony site",
        duration: "1 day",
        body: "Shorter than on any other platform, because Harmony sites are young. Often the useful finding is how little there is to protect.",
        lead: "What gets captured:",
        points: [
          {
            label: "Every page, URL and SEO field",
            body: "Small enough to go through by hand, which means nothing gets missed to a crawler's blind spot.",
          },
          {
            label: "Whatever Search Console shows",
            body: "If the site has genuinely earned positions, it gets treated like any other migration. Usually it hasn't, and that frees the rebuild to improve the structure rather than preserve it.",
          },
          {
            label: "Contacts and form submissions",
            body: "Exported to CSV before anything is retired, since contacts import into the new site and submissions don't.",
          },
        ],
      },
      {
        title: "Model what Harmony couldn't hold",
        duration: "2 to 4 days",
        body: "The reason you're moving, so it gets designed rather than assumed. This is the stage the whole project exists for.",
        lead: "What gets built into the structure:",
        points: [
          {
            label: "Collections for everything that repeats",
            body: "Services, locations, courses, properties, team. One layout serves the set, so the fiftieth entry costs what the second did.",
          },
          {
            label: "The multilingual structure, if it's coming",
            body: "Planned now rather than retrofitted. MindEd runs 70+ pages across two languages, and that shape of site is only possible on the platform you're moving to.",
          },
          {
            label: "URL slugs set to match the old ones",
            body: "Both editors run on Wix hosting and neither forces a path structure, so the addresses can carry unless you're deliberately restructuring.",
          },
        ],
      },
      {
        title: "Build in Studio",
        duration: "1 to 3 weeks",
        body: "Built on its own staging URL with the Harmony site untouched and still live. Your media library is already there, sitting at account level.",
        lead: "What the build adds:",
        points: [
          {
            label: "Breakpoint control instead of automatic behaviour",
            body: "Harmony makes the responsive decisions for you. Studio hands them back, which matters the moment a layout needs to do something specific.",
          },
          {
            label: "Collections wired to dynamic pages",
            body: "The structure from the previous stage stops being a diagram and starts being pages that publish themselves.",
          },
          {
            label: "The apps Harmony doesn't carry",
            body: "Added and configured properly rather than worked around, then tested before anything is switched.",
          },
        ],
      },
      {
        title: "Move the content, then cut over",
        duration: "2 to 3 days",
        body: "Copy placed, posts re-created with their dates, SEO fields entered and diffed. Then the domain and Premium plan reassign from inside your Wix account.",
        lead: "What cutover involves:",
        points: [
          {
            label: "A short redirect list, not a full map",
            body: "Because the slugs were set to match, only deliberate restructuring needs mapping. It still gets tested before the domain moves.",
          },
          {
            label: "Plan and domain reassigned, not repurchased",
            body: "Exactly what Wix points you to when it tells you a Harmony site can't be transferred. No second subscription, no registrar change.",
          },
          {
            label: "Contacts imported from CSV",
            body: "Members are the exception and have to sign up again, so the re-registration email goes out around now rather than after someone notices.",
          },
        ],
      },
      {
        title: "Watch the index for 30 days",
        duration: "30 days",
        body: "Daily at first, then weekly. On a young site the useful signal isn't protecting what you had, it's watching the new structure get found.",
        lead: "What we're looking for:",
        points: [
          {
            label: "Collection pages entering coverage",
            body: "Pages that couldn't exist on Harmony appearing in the index is the evidence the rebuild did what it was for.",
          },
          {
            label: "Anything that 404s or drops",
            body: "Fixed inside the window at no extra cost, as on every migration we run.",
          },
          {
            label: "Whether the second language is being served correctly",
            body: "Only relevant on multilingual builds, and worth checking properly because hreflang errors are silent until they aren't.",
          },
        ],
      },
    ],
  },

  seoMechanics: {
    heading: "What the search side looks like",
    intro:
      "This is the gentlest migration we run, and for one reason: a Harmony site hasn't been around long enough to have much to lose.",
    items: [
      {
        title: "Your equity is measured in months, not years",
        body: "Harmony is Wix's newest editor, so every Harmony site is young. A page that's been indexed for four months has a fraction of the authority of one that's been ranking for four years, which means the calculus flips. On most migrations you pay to preserve structure. Here it's usually cheaper and better to fix the structure, because there's little worth preserving and a great deal worth building. Check Search Console before deciding: if the site has genuinely earned positions, treat it like any other migration and map carefully.",
      },
      {
        title: "URLs hold, so redirects are the small job",
        body: "Both editors run on Wix hosting and neither imposes a path structure on standard pages, so you set the new site's slugs to match and the addresses carry. Blog posts keep the /post/ prefix Wix Blog uses everywhere. What's left is whatever you deliberately restructure, which on this move is usually the point rather than an accident, and it gets a mapped redirect like anything else.",
      },
      {
        title: "The CMS is the actual SEO upgrade",
        body: "The reason this move tends to grow traffic rather than just preserve it. Hand-built pages cap how many search-intent pages you'll realistically publish, because each one is a design job. Collection-driven pages don't: one layout serves fifty items, and publishing the fiftieth costs what the second did. That's the difference between a site with eight pages targeting eight terms and one with eighty targeting eighty. Bel'Istria went from a handful of pages to 70+ ranking ones on exactly that change, and impressions grew 257% year on year.",
      },
      {
        title: "Multilingual multiplies the URL set, so plan it before launch",
        body: "If a second language is coming, structure it during the build. Adding one later means every page gains a language variant, every variant needs its own URL and hreflang, and the sitemap doubles. Doing that as a retrofit is meaningfully more expensive than doing it once at the start, and it's the most common reason a site gets rebuilt twice.",
      },
    ],
  },

  mistakes: {
    heading: "Four ways this decision goes wrong",
    intro:
      "Three of these are avoidable by reading Wix's documentation before you build. The fourth is avoidable by being honest about what the site needs to become.",
    items: [
      {
        title: "Assuming you can upgrade to Studio later",
        body: "The single most expensive assumption available on this topic, and an entirely reasonable one to make: every other tier of every other tool lets you upgrade. Wix states that once a site is created in the Harmony Editor it can't be transferred to the Wix Editor or the Studio Editor. Building on Harmony because you'll move up when you outgrow it means committing to a full rebuild at the exact moment the business is busiest.",
      },
      {
        title: "Building a content-heavy site on an editor with no CMS",
        body: "Harmony has no CMS yet. Wix says so, and lists it among the apps being added. If your site is a directory, a catalogue, a course library, or anything where one layout should serve many items, you're signing up to build each item as its own page by hand. That's tolerable at five items and untenable at fifty, and the point where it becomes untenable arrives faster than anyone plans for.",
      },
      {
        title:
          "Starting on Harmony when a second language is already on the roadmap",
        body: "Wix Multilingual is on the list of apps not yet available in Harmony. Teams who know they'll need a second language within the year still start on Harmony because the first language ships faster, then rebuild. The site that eventually needed two languages was never a Harmony site, and the fast launch bought a few weeks in exchange for the whole build.",
      },
      {
        title: "Rebuilding the Harmony site page for page",
        body: "If you're paying for a rebuild, spend it on the structure rather than the appearance. Recreating the same hand-built pages in Studio delivers a site that looks similar and has the same ceiling one level up. The repeating content becomes collections during the build or it doesn't happen, and a Studio site whose CMS is empty is a more expensive Harmony site.",
      },
    ],
  },

  auditCta: {
    heading: "Not sure whether to move off Harmony yet?",
    paragraph:
      "Send us the URL. We'll tell you straight whether Wix is likely to ship the thing you're waiting for, or whether it's structural and worth rebuilding for.",
    ctas: [
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "primary",
      },
      { label: "Book a call", href: "/book-a-call", variant: "secondary" },
    ],
  },

  faq: {
    heading: ["Wix Harmony questions,", "answered from the docs"],
    subhead:
      "Harmony is new enough that most of what's written about it is guesswork. Everything below links back to what Wix has actually published.",
    ctas,
    items: [
      {
        q: "Can I upgrade my Wix Harmony site to Wix Studio later?",
        a: "No. Wix states that once you've created a site with the Harmony Editor, it isn't possible to transfer it to either the Wix Editor or the Studio Editor, and that you need to create a new site on the platform you want. Your Premium plan and domain can be reassigned to that new site, but the site itself is rebuilt. This is the single most important thing to know before choosing Harmony, because it makes the choice one-way.",
      },
      {
        q: "Does Wix Harmony have a CMS?",
        a: "Not yet. Wix lists the CMS among the apps it's currently adding to Harmony, alongside Wix Multilingual, Donations, Hotels, Music, and Referral Programs. Until it ships, every page on a Harmony site is built by hand, which means no dynamic pages, no collection-driven layouts, and no way to publish fifty items against one template. For a brochure site that's fine. For a directory, catalogue, or course library it's the whole problem.",
      },
      {
        q: "Should I start on Harmony or Wix Studio?",
        a: "Start on Harmony if the site is small, the content doesn't repeat, one language is enough, and speed matters more than headroom. Start on Studio if you can already name something that needs a CMS, a second language, or one of the apps Harmony doesn't carry yet. The asymmetry is what should decide it: a Studio site can be simple, but a Harmony site can never become a Studio one without a rebuild.",
      },
      {
        q: "Is Wix Harmony replacing the classic Wix Editor?",
        a: "Wix hasn't said so, and its documentation points the other way: it states that existing sites aren't being migrated to Harmony and that it isn't currently possible to migrate a Wix Editor site into it. Harmony is a third editor sitting alongside the Wix Editor and Wix Studio, not a successor to either. If you're on the classic Wix Editor, Harmony isn't where you're being pushed, and our Wix Classic guide covers the move that's actually worth considering.",
      },
      {
        q: "Can I run a multilingual site on Harmony?",
        a: "Not natively. Wix Multilingual is on the list of apps still being added to Harmony, so there's no built-in way to serve a second language with its own URLs and hreflang. If a second language is anywhere on your roadmap, that's the clearest possible signal to build on Studio from the start, because retrofitting a language after launch means revisiting every page and doubling the URL set.",
      },
      {
        q: "Will I lose rankings moving from Harmony to Studio?",
        a: "Less than on any other migration, for two reasons. Your page URLs can stay identical, since both editors run on Wix hosting and neither forces a path structure, and Harmony sites are young enough that there's usually limited authority to protect. We still run the full process: URL inventory, ranking baseline, mapped redirects for anything that changes, and 30 days of Search Console monitoring after cutover. On this move that discipline is mostly there to catch the metadata, not the addresses.",
      },
      {
        q: "How long does a Harmony to Studio rebuild take?",
        a: "Two to four weeks of active work, plus the 30-day monitoring window after you're live. It's quicker than most migrations because there's a short URL inventory, a small archive, and a media library that's already sitting in your Wix account. The variable isn't what you're leaving, it's what you're building: a multilingual site with several CMS collections takes longer than the Harmony site it replaces ever did.",
      },
      {
        q: "What does it cost?",
        a: "From €1,750, the same flat starting figure as every other platform we migrate from. Harmony rebuilds tend to land at the lower end because of the short inventory and small redirect list. You get the number before anything starts, and it covers the inventory, the build, the redirect work, and the monitoring window.",
      },
      {
        q: "My Harmony site is only a few weeks old. Is it too late?",
        a: "It's the best possible moment, and the opposite of too late. Nothing has been indexed long enough to matter, there's no archive to carry, and the copy and images you've already written are the expensive part and they come with you. The cost of this move only goes up from here, which is worth weighing if you already know the CMS is coming.",
      },
      {
        q: "Should I just wait for Wix to add the CMS to Harmony?",
        a: "Depends on what's blocking you. Wix publishes what it's adding, so if you're waiting on an accordion or a tabs element, waiting is free and a rebuild isn't. The CMS and Wix Multilingual are different: they're structural, there's no shipping date attached to either, and building fifty pages by hand while you wait is its own cost. If the gap is a widget, wait. If the gap is the architecture, the wait is the expensive option.",
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
        desc: "On the classic Wix Editor rather than Harmony? Different constraints, and Wix won't convert that one either.",
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
        desc: "Choosing between Harmony and Studio for a new build? This is what a Studio build involves.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out whether you need", "to move off Harmony at all"],
    paragraph:
      "Tell us what your Harmony site can't do. We'll tell you straight whether Wix is likely to fix it, or whether it's structural and worth rebuilding for, and what that would cost. Free, and the answer is often that you should wait.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Wix Harmony to Wix Studio migration. Wix does not allow a Harmony site to be transferred to the Studio Editor, so the site is rebuilt: URL inventory, CMS collection and multilingual structure design, responsive Studio build, content and metadata transfer, redirect mapping, and 30 days of post-launch index monitoring.",
    priceFrom: "1750",
  },
};
