import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/wix-harmony-to-wix-studio
 * Targets: wix harmony to wix studio · wix harmony vs wix studio · does wix
 * harmony have a cms · can i upgrade wix harmony later.
 *
 * THE THESIS, and it writes itself from Wix's own documentation: Harmony is
 * the only Wix editor with a documented one-way door, and its ceiling is
 * architectural rather than cosmetic. No CMS, no multilingual, and no site
 * code at all. A dozen partner blogs have written "Harmony vs Studio"
 * comparison posts; nobody has published a service page for moving off it,
 * which is the gap.
 *
 * VERIFICATION STATUS (20 Aug 2026). Every platform claim is quoted from Wix
 * and linked in `sources`. The two load-bearing ones: "Once you have created a
 * site with the Wix Harmony Editor, it is not possible to transfer the site to
 * either the Wix Editor or the Studio Editor", and the published in-development
 * list naming the CMS, Wix Multilingual, Donations, Hotels, Music and Referral
 * Programs. Wix's developer docs add the code ceiling: "Wix Harmony doesn't
 * support site code", with page code, backend code, custom CSS, HTTP
 * functions, routers, data hooks, event handlers, web modules and scheduled
 * jobs all listed as unsupported.
 *
 * NO PROOF BLOCK ON PURPOSE. Harmony is Wix's newest editor, so no agency has
 * a Harmony migration case study and pretending otherwise would be the one
 * thing that discredits the rest of the page. MindEd appears in prose only, as
 * an illustration of a site Harmony could not host (70+ pages, two languages),
 * never as a Harmony client.
 *
 * OWNER — this page has the shortest shelf life on the site. Wix lists the CMS
 * and Wix Multilingual as features it is actively adding. When either ships,
 * the ceiling argument changes and this page needs rewriting, not patching.
 * Re-check the in-development list quarterly.
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
      "Wix Harmony sites can't be transferred to Wix Studio, and Harmony has no CMS or multilingual yet. What that means, what a rebuild involves, and how to decide before you start. From €1,250.",
  },

  hero: {
    name: "Wix Harmony to Wix Studio migration",
    h1: "Wix Harmony to Wix Studio: the complete migration guide",
    subhead:
      "Wix states it plainly: once a site is built in Harmony, it can't be transferred to the Wix Editor or the Studio Editor. Harmony also ships without a CMS and without multilingual. Here's what that costs you, and how to decide before it's a rebuild.",
    chips: [
      "Harmony to Studio is a rebuild, per Wix",
      "No CMS, no multilingual, no site code",
      "Every claim linked to Wix's docs",
    ],
    ctas,
  },

  glance: {
    heading: "Wix Harmony to Wix Studio, at a glance",
    intro:
      "The short answers, taken from Wix's own documentation rather than from anyone's opinion about which editor is better.",
    items: [
      {
        label: "Can the site be converted",
        value:
          "No. Wix states a Harmony site can't be transferred to the Wix Editor or the Studio Editor, so you build a new Studio site.",
      },
      {
        label: "What comes with you",
        value:
          "Your media library, domain, Premium plan and contacts all sit at account level and follow you across.",
      },
      {
        label: "What happens to your URLs",
        value:
          "They hold. Both editors run on Wix hosting and neither forces a path structure, so /services stays /services.",
      },
      {
        label: "What it costs",
        value:
          "From €1,250, and Harmony rebuilds land at the lower end because the inventory and redirect list are short.",
      },
      {
        label: "How long it takes",
        value:
          "Two to four weeks, plus 30 days of index monitoring while you're already live.",
      },
      {
        label: "DIY difficulty",
        value:
          "The most DIY-able move we document. Nothing to export, no redirect map to speak of, and the work is the rebuild itself.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "Harmony's limits aren't design limits. Wix's automatic responsive layout does a good job. The limits are structural, and these are the ones that lift.",
    items: [
      {
        title: "A CMS, which is the whole reason most people move",
        body: "Harmony has no CMS, so every page is built by hand. In Studio, repeating content becomes one collection and one dynamic layout, and the fiftieth service page costs what the second did. That's the difference between a site targeting eight search terms and one targeting eighty.",
      },
      {
        title: "A second language with its own URLs",
        body: "Wix Multilingual is on Harmony's in-development list, so there's no native way to serve one. Studio has it, with per-language URLs and hreflang, which is why a site that needs two languages was never a Harmony site.",
      },
      {
        title: "The code ceiling disappears",
        body: "Wix's developer docs are blunt: Harmony doesn't support site code. No page code, no backend code, no custom CSS, no routers, no scheduled jobs. Studio gives you Velo, the JavaScript SDK and a real dev environment, so the day you need something custom you're not rebuilding again.",
      },
      {
        title: "Breakpoint control instead of automatic decisions",
        body: "Harmony makes the responsive calls for you and they're usually fine. Studio hands them back, which matters the moment a layout has to do something specific at one screen size and not the others.",
      },
      {
        title: "The apps Harmony doesn't carry yet",
        body: "Donations, Hotels, Music and Referral Programs are all on Wix's in-development list. In Studio they're installed and configured properly rather than worked around with a form and a manual process.",
      },
      {
        title: "No second one-way door",
        body: "This is the part worth sitting with. Studio is where the Wix ceiling actually is, so moving here ends the platform question rather than deferring it. There's no third editor above it to migrate to later.",
      },
    ],
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
      "One thing to get out of the way first: the site itself doesn't move. Wix states that a site created in the Harmony Editor can't be transferred to either the Wix Editor or the Studio Editor. So this is a rebuild, and the table below is about what survives one. More of it than you'd think.",
    rows: [
      {
        item: "Text, images, and media files",
        icon: "image",
        status: "carries",
        note: "Your Media Manager sits at account level, so every image and file you've uploaded is already available inside the new Studio site.",
      },
      {
        item: "Page URLs",
        icon: "redirect",
        status: "carries",
        note: "Both editors run on Wix hosting and neither forces a path structure on standard pages, so you set the same slugs and /services stays /services.",
      },
      {
        item: "Premium plan and domain",
        icon: "globe",
        status: "carries",
        note: "Both reassign to the new site from inside your Wix account, which is exactly what Wix points you to when it tells you a Harmony site can't be transferred.",
      },
      {
        item: "Blog posts",
        icon: "pen",
        status: "rebuilt",
        note: "Wix Blog keeps its /post/ prefix on both editors, so post addresses hold while the posts themselves are re-created with their publish dates and SEO fields.",
      },
      {
        item: "Contacts and form submissions",
        icon: "users",
        status: "rebuilt",
        note: "Contacts export as a CSV and import into the new site, which is the route Wix documents for moving contacts between sites in an account, while form submissions are worth exporting before the old site retires.",
      },
      {
        item: "Store products",
        icon: "cart",
        status: "rebuilt",
        note: "Products export and import by CSV using the same tool Wix documents for moving between its own stores, though digital products aren't covered and order history exports for your records only.",
      },
      {
        item: "CMS collections and dynamic pages",
        icon: "server",
        status: "replaced",
        note: "There's nothing to carry, because Harmony has no CMS, and the rebuild is where your hand-built repeating pages become one collection and one layout.",
      },
      {
        item: "A second language",
        icon: "languages",
        status: "replaced",
        note: "Wix lists Wix Multilingual among the apps still being added to Harmony, so there's no native multilingual layer to move and Studio's gets built during the project.",
      },
      {
        item: "Custom code and Velo",
        icon: "code",
        status: "replaced",
        note: "Wix's developer docs state Harmony doesn't support site code, so anything you achieved with embedded HTML or JavaScript snippets gets rebuilt properly in Studio's dev environment rather than ported.",
      },
      {
        item: "Accordions, tabs, audio players, glass effect, text mask",
        icon: "puzzle",
        status: "replaced",
        note: "Wix names all of these, plus hover state customization, as elements it's adding to Harmony, so any workaround you built for one gets thrown away rather than carried.",
      },
      {
        item: "Donations, Hotels, Music, and Referral Programs",
        icon: "plug",
        status: "replaced",
        note: "All four are on Wix's list of apps not yet available in Harmony, and each gets installed and configured properly on the Studio build.",
      },
      {
        item: "The Harmony site itself",
        icon: "ban",
        status: "lost",
        note: "Wix's wording is unambiguous: once you've created a site with the Harmony Editor, it can't be transferred to the Wix Editor or the Studio Editor, and you create a new site on the platform you want instead.",
      },
      {
        item: "Page layouts and design",
        icon: "responsive",
        status: "lost",
        note: "Nothing about a Harmony layout carries, which matters less than it sounds because Harmony sites are recent and you're rebuilding months of work rather than years.",
      },
      {
        item: "Site members",
        icon: "lock",
        status: "lost",
        note: "Member lists can't be exported or imported between Wix sites and Wix cites privacy as the reason, so anyone signed up re-registers, which is an argument for moving while the list is short.",
      },
    ],
    footnote:
      "Read it as two lists. Everything that lives in your Wix account (media, domain, plan, contacts) follows you. Everything that lives inside the Harmony site gets built again. The gap between those two lists is the cost of the move, and it's smaller on a young site than on any other migration we do.",
    cta: {
      heading: "Started the rebuild yourself and stalled?",
      paragraph:
        "You don't have to restart. Send us the Studio site you've begun and the Harmony one it's replacing, and we'll finish it and handle the cutover.",
      cta: {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "primary",
      },
    },
  },

  steps: {
    heading: "How a Harmony rebuild runs",
    intro:
      "Six stages, and a shorter project than most migrations because there's less history to protect. Your Harmony site stays live throughout.",
    items: [
      {
        title: "Confirm you actually need to move",
        navLabel: "Wait or move",
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
        navLabel: "Inventory",
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
        navLabel: "Structure and CMS",
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
        navLabel: "The Studio build",
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
        navLabel: "Content and cutover",
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
        navLabel: "Post-launch monitoring",
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

  sources: {
    heading: "Sources",
    intro:
      "Harmony is new enough that most of what's written about it is guesswork. Every limit on this page is Wix's own published position, linked so you can check it rather than take our word for it.",
    verified: "2026-08-20",
    items: [
      {
        label: "Wix: Introducing the Wix Harmony Editor",
        href: "https://support.wix.com/en/article/introducing-the-wix-harmony-editor",
        note: "The one-way door, in Wix's words: once you've created a site with the Harmony Editor, it can't be transferred to the Wix Editor or the Studio Editor.",
      },
      {
        label: "Wix: The difference between Wix Editor and Wix Harmony",
        href: "https://support.wix.com/en/article/wix-harmony-editor-the-difference-between-wix-editor-and-wix-harmony",
        note: "The in-development list naming the CMS, Wix Multilingual, Donations, Hotels, Music and Referral Programs, plus the accordion, tabs, audio player, glass effect, text mask and hover state elements.",
      },
      {
        label: "Wix for Developers: About Wix Harmony",
        href: "https://dev.wix.com/docs/develop-websites/articles/get-started/about-wix-harmony",
        note: "The code ceiling: Harmony doesn't support site code, and page code, backend code, custom CSS, HTTP functions, routers, data hooks, event handlers, web modules and scheduled jobs are all listed as unsupported.",
      },
      {
        label: "Wix: Assigning a Premium plan to a different site in your Wix account",
        href: "https://support.wix.com/en/article/assigning-a-premium-plan-to-a-different-site-in-your-wix-account",
        note: "How the plan moves to the new Studio site, which is the route Wix points you to when it says a Harmony site can't be transferred.",
      },
      {
        label: "Wix Contacts: Importing contacts by uploading a CSV file",
        href: "https://support.wix.com/en/article/wix-contacts-importing-contacts-by-uploading-a-csv-file",
        note: "The documented path for moving contacts between sites in the same account.",
      },
      {
        label: "Wix Stores: Updating products by exporting and importing them",
        href: "https://support.wix.com/en/article/wix-stores-updating-products-by-exporting-and-importing-them",
        note: "Product CSV transfer between Wix stores, and what it doesn't cover.",
      },
      {
        label: "Wix: Moving members from one site to another in your Wix account",
        href: "https://support.wix.com/en/article/request-moving-members-from-one-site-to-another-in-your-wix-account",
        note: "Wix's own answer on the one row with no workaround: due to privacy concerns, it isn't possible to export and import your member list.",
      },
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
        q: "Does Wix Harmony have a CMS, and does Wix Studio?",
        a: "Not yet. Wix lists the CMS among the apps it's currently adding to Harmony, alongside Wix Multilingual, Donations, Hotels, Music, and Referral Programs. Until it ships, every page on a Harmony site is built by hand, which means no dynamic pages, no collection-driven layouts, and no way to publish fifty items against one template. For a brochure site that's fine. For a directory, catalogue, or course library it's the whole problem.",
      },
      {
        q: "Should I start on Wix Harmony or Wix Studio?",
        a: "Start on Harmony if the site is small, the content doesn't repeat, one language is enough, and speed matters more than headroom. Start on Studio if you can already name something that needs a CMS, a second language, or one of the apps Harmony doesn't carry yet. The asymmetry is what should decide it: a Studio site can be simple, but a Harmony site can never become a Studio one without a rebuild.",
      },
      {
        q: "Is Wix Harmony replacing the classic Wix Editor?",
        a: "Wix hasn't said so, and its documentation points the other way: it states that existing sites aren't being migrated to Harmony and that it isn't currently possible to migrate a Wix Editor site into it. Harmony is a third editor sitting alongside the Wix Editor and Wix Studio, not a successor to either. If you're on the classic Wix Editor, Harmony isn't where you're being pushed, and our Wix Classic guide covers the move that's actually worth considering.",
      },
      {
        q: "Can I run a multilingual site on Wix Harmony, or do I need Wix Studio?",
        a: "Not natively. Wix Multilingual is on the list of apps still being added to Harmony, so there's no built-in way to serve a second language with its own URLs and hreflang. If a second language is anywhere on your roadmap, that's the clearest possible signal to build on Studio from the start, because retrofitting a language after launch means revisiting every page and doubling the URL set.",
      },
      {
        q: "Will I lose my Google rankings moving from Wix Harmony to Wix Studio?",
        a: "Less than on any other migration, for two reasons. Your page URLs can stay identical, since both editors run on Wix hosting and neither forces a path structure, and Harmony sites are young enough that there's usually limited authority to protect. We still run the full process: URL inventory, ranking baseline, mapped redirects for anything that changes, and 30 days of Search Console monitoring after cutover. On this move that discipline is mostly there to catch the metadata, not the addresses.",
      },
      {
        q: "How long does a Wix Harmony to Wix Studio rebuild take?",
        a: "Two to four weeks of active work, plus the 30-day monitoring window after you're live. It's quicker than most migrations because there's a short URL inventory, a small archive, and a media library that's already sitting in your Wix account. The variable isn't what you're leaving, it's what you're building: a multilingual site with several CMS collections takes longer than the Harmony site it replaces ever did.",
      },
      {
        q: "How much does a Wix Harmony to Wix Studio migration cost?",
        a: "From €1,250, the same flat starting figure as every other platform we migrate from. Harmony rebuilds tend to land at the lower end because of the short inventory and small redirect list. You get the number before anything starts, and it covers the inventory, the build, the redirect work, and the monitoring window.",
      },
      {
        q: "Can I migrate my Wix Harmony site to Wix Studio myself?",
        a: "More easily than from any other platform, and often yes. There's nothing to export, your media library and domain are already in your Wix account, and because both editors run on Wix hosting you can set the new slugs to match and skip most of the redirect work. What you're really taking on is the rebuild. A handful of hand-built pages moved into Studio is a genuine weekend project. It turns when the reason you're moving is structural: modelling CMS collections properly, planning a second language before launch rather than after, or a site with enough indexed pages that the metadata needs diffing rather than eyeballing. The reliable signal is whether you can name the collections your content should live in. If you can't, that's the part worth handing over, because a Studio site with an empty CMS is just a more expensive Harmony site.",
      },
      {
        q: "Should I wait for Wix to add the CMS to Harmony instead of moving to Wix Studio?",
        a: "Depends on what's blocking you. Wix publishes what it's adding, so if you're waiting on an accordion or a tabs element, waiting is free and a rebuild isn't. The CMS and Wix Multilingual are different: they're structural, there's no shipping date attached to either, and building fifty pages by hand while you wait is its own cost. If the gap is a widget, wait. If the gap is the architecture, the wait is the expensive option, and it gets more expensive every month: a Harmony site that's a few weeks old has nothing indexed long enough to matter and no archive to carry, which is the cheapest this move will ever be.",
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
        label: "Framer to Wix Studio",
        logo: "/platforms/framer.webp",
        href: "/services/framer-to-wix-studio",
        desc: "Another design-first tool with ceilings you meet later, and no way to export the site at all.",
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
    priceFrom: "1250",
  },
};
