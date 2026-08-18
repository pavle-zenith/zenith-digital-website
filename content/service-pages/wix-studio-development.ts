import type { CtaLink } from "@/lib/types";
import type { ServicePageContent } from "./types";

/**
 * /services/wix-studio-development
 * Targets: wix studio developer · wix velo developer · hire wix developer ·
 * wix custom code · wix studio development agency · wix cms development.
 *
 * The page's wedge: everyone else sells Wix as a brochure builder and quotes a
 * custom stack the moment a brief gets interesting. This page argues the
 * platform goes much further than that, and is honest about where it stops.
 * Yacht Junky is the proof: a two-sided marketplace built native.
 *
 * No new numbers were invented. Every figure here already exists elsewhere on
 * the site (Yacht Junky's platform facts, Wix Legend Partner, 100+ sites).
 *
 * OWNER — two things that would strengthen this page:
 *   1. `process.image` currently shows the finished Yacht Junky marketplace.
 *      A screenshot of the Velo editor or a CMS collection mid-build would
 *      suit the showcase layout better, the way the design page uses
 *      /services/wix-studio.webp, without repeating that photo here.
 *   2. The whoFor items use static diagnostic cards. Animated scenes would
 *      need three new entries in WhoForAnim plus matching components.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const wixStudioDevelopment: ServicePageContent = {
  slug: "wix-studio-development",
  publish: true,
  seo: {
    title: "Hire a Wix Developer | Velo & Custom Code | Zenith Digital",
    description:
      "Wix Studio development from a Wix Legend Partner: Velo code, CMS architecture, integrations, and automations, including a full marketplace build.",
  },

  hero: {
    name: "Wix Studio development",
    h1: "Custom Wix Studio development, without moving off the platform",
    subhead:
      "Velo code, CMS architecture, integrations, and automations built natively in Wix Studio. Including the multi-seller marketplace most agencies would have quoted as a custom build.",
    chips: [
      "Velo & custom code",
      "Marketplaces built native",
      "Wix Legend Partner",
    ],
    ctas,
  },

  whoFor: {
    heading: "When standard Wix runs out of road",
    intro:
      "This is the work that starts where the drag-and-drop editor stops. Three versions of that moment.",
    items: [
      {
        title: "The feature you need isn't in the editor",
        body: "Filtered search across hundreds of records, a two-sided marketplace, a members area, a quoting tool. The site does everything else you need, and then there's the one thing the editor has no button for.",
        anim: "no-button",
        card: {
          label: "Blocking feature",
          value: "Not native",
          valueNote: "No button for it in the editor",
          rows: [
            { text: "The rest of the site does its job", state: "good" },
            { text: "One requirement has no obvious route", state: "bad" },
            { text: "Workarounds are stacking up", state: "warn" },
          ],
        },
      },
      {
        title: "Someone told you it needs a custom build",
        body: "You described the idea and got quoted a full custom stack, with the hosting, maintenance, and developer retainer that comes attached. It might be the right answer. Often it's the answer that suits whoever is quoting.",
        anim: "quoted-stack",
        card: {
          label: "Quoted solution",
          value: "Custom stack",
          valueNote: "Plus hosting, upkeep, and a retainer",
          rows: [
            { text: "Ongoing cost attached to every option", state: "bad" },
            {
              text: "Nobody checked the platform's real ceiling",
              state: "warn",
            },
            { text: "The requirement itself is clear", state: "good" },
          ],
        },
      },
      {
        title: "Your team is doing work software should do",
        body: "Enquiries retyped into a CRM. A spreadsheet kept in sync by hand. The same email sent forty times a month. The site collects the information and a person moves it, every single time.",
        anim: "manual-handling",
        card: {
          label: "Manual handling",
          value: "Every enquiry",
          valueNote: "Moved by a person, not a system",
          rows: [
            { text: "Data retyped between tools", state: "bad" },
            { text: "Hours going into copy and paste", state: "bad" },
            { text: "The data is already being captured", state: "good" },
          ],
        },
      },
    ],
  },

  stakes: {
    heading: "What the wrong answer costs",
    intro:
      "Getting this decision wrong is expensive in both directions, and the bill arrives later either way.",
    items: [
      {
        icon: "transfer",
        title: "The rebuild you didn't need",
        body: "A custom stack you were talked into isn't a one-time cost. It's hosting, security patching, and a developer relationship for the life of the product. Businesses pay that for years to run features their existing platform could have carried.",
      },
      {
        icon: "support",
        title: "The hours nobody invoices",
        body: "Manual work never shows up as a line item, so it never gets compared against the cost of fixing it. Two hours a week of retyping is more than a hundred hours a year, spent by people you hired to do something else.",
      },
      {
        icon: "clipboard",
        title: "The features that stay on the list",
        body: "Assume the platform can't do it and the idea quietly goes into next year's budget. Meanwhile the competitor who asked a better question shipped it, and it turned out to be four weeks of work.",
      },
    ],
  },

  outcomes: {
    heading: "What you get out of building it native",
    intro:
      "The feature is the point. These are the things that come with getting it this way rather than the other way.",
    items: [
      {
        title: "The feature ships without a new platform",
        body: "You get the functionality you needed without migrating, without a second system to log into, and without your website and your product drifting into two different places nobody maintains together.",
        image: "/portfolio/knode.jpg",
        imageAlt: "The Knode AI site",
      },
      {
        title: "Hours come back to the people doing them",
        body: "The retyping, the copy-paste between tools, the same email sent for the fortieth time. Automations do it in the background, and the person who used to do it goes back to work that needed a human.",
        image: "/services/web-design.webp",
        imageAlt: "The ATW Trucking site",
      },
      {
        title: "Your team still runs the site",
        body: "Custom work usually ends with a site only its developer can touch. Content, records, and settings stay editable here, and the handover documents exactly which parts are code so nobody breaks something by guessing.",
        image: "/portfolio/belistria.jpg",
        imageAlt: "The Bel'Istria site",
      },
      {
        title: "No infrastructure bill attached",
        body: "No servers to pay for, no security patching, no developer retainer keeping the lights on. The thing you built runs on the platform you were already paying for, which is the whole argument for building it there.",
        image: "/portfolio/fortlauderdale.jpg",
        imageAlt: "The FoxStays dock rental site",
      },
    ],
  },

  included: {
    heading: "What we build",
    intro:
      "Development work is scoped per project, so no two engagements carry the same list. This is the range it's drawn from.",
    items: [
      {
        icon: "code",
        title: "Velo custom code",
        group: "Custom code",
        body: "JavaScript running on Wix Studio's own runtime, for the logic the editor has no setting for: conditional pricing, custom search behavior, generated documents, notifications that fire on the right event.",
      },
      {
        icon: "layers",
        title: "CMS architecture",
        group: "Data & access",
        body: "Collections designed like a database rather than a list: related records, dynamic pages generated from data, and a structure that still makes sense at ten times the current content volume.",
      },
      {
        icon: "plug",
        title: "Integrations",
        group: "Connections & handover",
        body: "Your CRM, booking system, payment provider, or internal tools connected by API so the website is part of the stack instead of a form that emails somebody.",
      },
      {
        icon: "split",
        title: "Automations",
        group: "Custom code",
        body: "The manual steps between systems removed: enquiries routed and assigned, records created and updated, follow-ups triggered by what someone actually did rather than by a person remembering.",
      },
      {
        icon: "search",
        title: "Search, filters, and directories",
        group: "Data & access",
        body: "Detailed filtering across large record sets, the kind listings and catalogues live or die on. Yacht Junky's buyers filter by the specs they actually shortlist on, running on native collections.",
      },
      {
        icon: "support",
        title: "Member areas and gated content",
        group: "Data & access",
        body: "Logins, permissions, and content only certain people can reach, for client portals, course material, partner resources, or pricing you'd rather not publish.",
      },
      {
        icon: "gauge",
        title: "Testing and handover",
        group: "Connections & handover",
        body: "Every flow tested with real submissions and real edge cases before launch, then documented so your team can run the parts they should run without calling a developer to change a label.",
      },
    ],
  },

  process: {
    heading: "How a development project runs",
    intro:
      "Custom work starts with a scoping conversation rather than a price list, because the first question is whether the platform is the right home for what you're describing.",
    // Yacht Junky, the two-sided marketplace this page's proof describes,
    // rather than a second shot of the Wix Studio editor.
    image: "/case-study-grid/yacht-junky.webp",
    imageAlt: "The Yacht Junky marketplace, built native on Wix Studio",
    cta: { label: "Book a call", href: "/book-a-call", variant: "primary" },
    steps: [
      {
        title: "Scoping call",
        focus: ["What it has to do", "Platform fit", "Honest verdict"],
        duration: "Day 1",
        body: "Twenty minutes on the requirement itself, not the solution you've been sold. If Wix Studio is the wrong home for it, you'll hear that on the call rather than after a discovery invoice.",
      },
      {
        title: "Technical proposal",
        focus: ["Architecture", "Fixed price", "Named limitations"],
        duration: "2 to 4 days",
        body: "How it would be built, what it costs, how long it takes, and what it won't do. The limitations are written down before you commit rather than discovered in week three.",
      },
      {
        title: "Data and architecture",
        focus: ["Collections", "Relationships", "Integration map"],
        duration: "Week 1",
        body: "Collections and relationships designed first, because a marketplace with the wrong data model is a rebuild, not a fix. Integrations get mapped here too, including what each system owns.",
      },
      {
        title: "Build and test",
        focus: ["Velo development", "Real-data testing", "Staging review"],
        duration: "Weeks 2 to 4",
        body: "Built on a staging URL you can use, not watch. Flows get tested with real records and deliberately awkward inputs, because the edge cases are where custom functionality actually fails.",
      },
      {
        title: "Launch and handover",
        focus: ["Go-live", "Documentation", "Loom walkthrough"],
        duration: "Launch week",
        body: "Deployed, monitored through the first real traffic, and handed over with a recorded walkthrough of everything your team controls. What's editable and what's code is stated plainly, so nobody breaks something by guessing.",
      },
    ],
  },

  // Development-flavoured work, and deliberately none of the four cases the
  // design page carries: the platform build, the integration build, the
  // events and CMS build, and the long-running fulfilment partner.
  workSlugs: ["yacht-junky", "just-stay", "katie-hailey", "techtonnik"],

  pricing: {
    heading: "What custom development costs",
    note: "A booking integration and a two-sided marketplace are different orders of work, so this is the one service without a published starting price. You get a fixed number in the technical proposal, before any work starts. Custom functionality inside a website build is part of the €4,500 Studio tier; standalone platform work is quoted on its own.",
    pullQuote:
      "The scoping call is free, and it ends with a straight answer on whether Wix Studio should be doing this at all. We've talked people out of custom builds they didn't need, and we've told others the platform genuinely isn't the right home for their idea.",
    drivers: [
      {
        title: "How much of it is genuinely custom",
        body: "Wiring a booking calendar into an existing site is a different job from building marketplace mechanics from scratch. The proposal separates what the platform already does from what has to be written.",
      },
      {
        title: "The shape of your data",
        body: "One collection with clean records is quick. Several related collections, imported legacy data, and records syncing with an external system take longer, and that work happens before anything visible gets built.",
      },
      {
        title: "How many systems have to agree",
        body: "Each integration adds an authentication path, a set of failure states, and its own testing. Two connected tools is a straightforward build. Six talking to each other is a project.",
      },
    ],
    cta: {
      label: "Scope your build",
      href: "/book-a-call",
      variant: "primary",
    },
    ctaSecondary: {
      label: "See all pricing",
      href: "/#pricing",
      variant: "secondary",
    },
  },

  unique: {
    kind: "explainer",
    heading: "What Wix Studio can actually do, and where it stops",
    intro:
      "Most opinions about the platform's ceiling were formed on a different product years ago. Here's the honest version from people who build on it every week.",
    left: {
      title: "Further than most people think",
      body: "The native CMS behaves like a real database: related collections, dynamic pages generated per record, and detailed filtering across large sets. Velo adds server-side JavaScript, scheduled jobs, external API calls, and custom logic on any event. Together that covers marketplaces, directories, member areas, client portals, booking platforms, and automation between your existing tools. Yacht Junky runs listings, filtered search, enquiry history, seller notifications, private contact routing, and currency conversion with no external services, no separate database, and no hosting bill.",
    },
    right: {
      title: "And genuinely not everything",
      body: "There's a real line. Products with heavy transactional complexity, escrow, multi-party payouts, deep seller dashboards, or thousands of concurrent users belong on a custom stack, and so does anything that needs to be a real mobile app. Extremely high record volumes with complex queries will hit limits a purpose-built backend wouldn't. When a brief crosses that line we say so and build custom instead, which is what this site runs on. Knowing where the ceiling is beats pretending it isn't there.",
    },
    closing:
      "The useful question is never whether Wix Studio can do everything. It's whether it can do the specific thing you need, at the cost and timeline of a platform build rather than a custom one. Usually it can, and the scoping call is where you find out.",
  },

  faq: {
    heading: ["Wix Studio development,", "answered technically"],
    subhead:
      "The questions that come up once a brief gets past brochure pages.",
    ctas,
    items: [
      {
        q: "What is Velo?",
        a: "Velo is Wix's development platform: JavaScript that runs on the site, both in the browser and server side. It gives a developer access to the page, the CMS collections, external APIs, scheduled jobs, and the site's own events. In practice it's the difference between a site that displays content and a site that does something with it.",
      },
      {
        q: "What can you build on Wix Studio that standard Wix can't do?",
        a: "Anything driven by data or logic rather than layout: filtered search across large record sets, marketplaces with multiple sellers, member areas with permissions, quoting and configuration tools, documents generated per submission, and automations that move information between systems. Standard Wix builds pages. Wix Studio with Velo builds behaviour.",
      },
      {
        q: "Can Wix Studio handle a marketplace or a directory?",
        a: "Yes, and we've shipped one. Yacht Junky is a two-sided boat and yacht marketplace built entirely native: sellers list, buyers filter by specification, enquiries route to private sellers without publishing contact details, sellers get notified, and prices convert between currencies. No external stack, and the team runs it without a developer on retainer.",
      },
      {
        q: "Can you build a web app on Wix Studio?",
        a: "Web applications with logins, permissions, saved records, and custom logic, yes. Native mobile apps for the App Store or Google Play, no, that's a different technology entirely. If what you're describing is really a mobile app, we'll tell you at the scoping call rather than three weeks in.",
      },
      {
        q: "When is custom code the right answer instead?",
        a: "When the product needs transactional complexity the platform doesn't cover, escrow, multi-party payouts, deep seller dashboards, when record volumes and query complexity would strain it, or when the site itself is the product rather than the front of a business. We build custom too, including this site, so the recommendation isn't a hammer looking for nails.",
      },
      {
        q: "What does Wix Studio development cost?",
        a: "It's quoted per project, and it's the only service here without a published floor. Scope varies too much between an integration and a platform for a starting number to mean anything honest. You get a fixed price in the technical proposal a few days after a free scoping call, before any work begins.",
      },
      {
        q: "How long does a custom build take?",
        a: "Most projects run two to five weeks of build after scoping, with the data architecture in week one. Yacht Junky's full marketplace took four weeks. Integrations and automations are usually faster than platform builds, because the data model already exists.",
      },
      {
        q: "Can you add features to my existing Wix site?",
        a: "Yes, and that's a common engagement. We audit what's there, work out whether the current structure supports what you want, and build onto it. If the existing CMS structure would fight the new feature, we'll say so and price the restructuring separately rather than building on a foundation that will cause problems later.",
      },
      {
        q: "What can you integrate with?",
        a: "Anything with an API, which today is nearly everything: CRMs, booking systems, payment providers, accounting tools, email platforms, and internal software. Just Stay's property list syncs from Bookeddirectly through Zapier, so what's live on the site is always what's actually bookable. Where a direct API connection is cleaner than a middleman, we build that instead.",
      },
      {
        q: "Can you automate work between our tools?",
        a: "That's often the highest-value thing we do on an existing site. Enquiries routed and assigned automatically, records created in your CRM without retyping, follow-ups triggered by behaviour, internal notifications when something needs a human. The rule of thumb: if a person does it the same way every time, it can probably be automated.",
      },
      {
        q: "Will my team still be able to edit the site?",
        a: "Yes, and protecting that is part of the design. Content, records, and settings stay editable in the normal Wix interface. What's code is documented in the handover, so everyone knows which parts are safe to change and which need a developer. Losing editability is the usual cost of custom work, and it's avoidable.",
      },
      {
        q: "What happens if the custom code breaks after launch?",
        a: "Every project includes a support window after go-live, which is when real traffic finds the edge cases testing missed. Beyond that, fixes are available as needed rather than through a mandatory retainer. Well-built Velo doesn't need constant attention, and we'd rather you call us because you want something new.",
      },
      {
        q: "Can you build member areas or gated content?",
        a: "Yes. Logins, roles, permissions, and content restricted to specific groups, whether that's a client portal, course material, partner resources, or pricing you'd rather not publish. Member data lives in the CMS like any other collection, so it's queryable and connectable to the rest of the site.",
      },
      {
        q: "Does custom code slow the site down or hurt SEO?",
        a: "Badly written code does, on any platform. Written properly, server-side logic runs before the page reaches the visitor and the pages stay indexable, which matters because dynamic CMS pages are often the ones you most want ranking. Bel'Istria runs 70+ dynamic pages generated from collections, all indexed and ranking.",
      },
      {
        q: "Can you rebuild a feature we have on WordPress?",
        a: "Usually, and it's worth asking before assuming a plugin's function has no equivalent. Most WordPress plugin functionality is either native in Wix Studio or straightforward in Velo. The migration service covers moving the site itself; this covers rebuilding what the plugins were doing.",
      },
      {
        q: "Who owns the code when it's done?",
        a: "You do. It lives in your own Wix account with the rest of the site, documented in the handover. There's no licence to renew, nothing hosted by us, and nothing that stops working if we part ways.",
      },
    ],
  },

  related: {
    heading: "Related services",
    items: [
      {
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        image: "/services/web-design.webp",
        desc: "Need the site itself as well as the functionality? The full design and build, from €2,500.",
      },
      {
        label: "Website migration",
        href: "/services/website-migration",
        beforeAfter: {
          before: "/before-after/knode-before.jpg",
          after: "/before-after/knode-after.jpg",
        },
        desc: "Moving from WordPress and wondering what happens to the plugins? This is how that goes.",
      },
      {
        label: "All services",
        href: "/services",
        desc: "The full picture, including landing pages, search campaigns, and white-label production.",
      },
    ],
  },

  finalCta: {
    heading: ["Tell us what it", "has to do"],
    paragraph:
      "A free 20-minute scoping call. Describe the requirement and you'll get a straight answer on whether Wix Studio should be building it, and what it would take.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Custom Wix Studio development from a Wix Legend Partner: Velo code, CMS architecture, API integrations, automations, member areas, and marketplace platforms built natively on Wix Studio. Scoped and fixed-priced per project.",
  },
};
