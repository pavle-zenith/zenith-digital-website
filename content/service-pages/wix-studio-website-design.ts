import type { CtaLink } from "@/lib/types";
import type { ServicePageContent } from "./types";

/**
 * /services/wix-studio-website-design
 * Targets: wix studio website design · wix studio agency · hire wix studio
 * designer · wix studio expert.
 *
 * Every figure here already exists elsewhere on the site (Top 1% Wix Partner,
 * 100+ sites, €2,500 floor, Knode's raise, Scottish Luxury's pipeline). No new
 * numbers were invented for this page.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const wixStudioWebsiteDesign: ServicePageContent = {
  slug: "wix-studio-website-design",
  publish: true,
  seo: {
    title: "Wix Studio Website Design Services | Zenith Digital",
    description:
      "Custom Wix Studio website design from a Top 1% Wix Partner. Conversion-first builds launched in 2 to 5 weeks, from €2,500 fixed. 100+ sites shipped.",
  },

  hero: {
    name: "Wix Studio website design",
    h1: "Wix Studio website design that pays for itself",
    subhead:
      "Custom-designed, conversion-first Wix Studio websites from a Top 1% Wix Partner. Launched in 2 to 5 weeks, from €2,500 fixed.",
    chips: ["Top 1% Wix Partner", "100+ sites shipped", "3 to 4 week launch"],
    ctas,
  },

  whoFor: {
    heading: "Who this is for",
    intro:
      "Three situations bring people to this page. If one of them is yours, the call is worth twenty minutes.",
    items: [
      {
        title: "You've outgrown the template",
        body: "The DIY build got the business online and did its job. Now every change is a workaround, the layout fights the content you actually have, and the design is recognisably the same one a few hundred other companies bought.",
        anim: "template",
        card: {
          label: "Current build",
          value: "Template",
          valueNote: "Bought by a few hundred other companies",
          rows: [
            { text: "Every layout change is a workaround", state: "bad" },
            {
              text: "Design fights the content you actually have",
              state: "bad",
            },
            { text: "It did get the business online", state: "good" },
          ],
        },
      },
      {
        title: "The last agency burned you",
        body: "Weeks of silence, a launch date that kept sliding, and a finished site nobody on your team can edit. What you want now is a fixed scope, a fixed price, and a reply inside a working day.",
        anim: "agency",
        card: {
          label: "Last engagement",
          value: "Overran",
          valueNote: "Launch date moved more than once",
          rows: [
            { text: "Weeks of silence between updates", state: "bad" },
            { text: "Nobody in-house can edit the result", state: "bad" },
            { text: "Scope and price were never fixed", state: "warn" },
          ],
        },
      },
      {
        title: "You're launching and it has to look established",
        body: "A new company, a raise in progress, or a first serious product. The site has to carry more credibility than the founding date does, and it has to be live before the conversations start.",
        anim: "launch",
        card: {
          label: "Company age",
          value: "New",
          valueNote: "Site has to outrank the founding date",
          rows: [
            {
              text: "A raise in progress or a first serious product",
              state: "warn",
            },
            {
              text: "Conversations start before the site is ready",
              state: "bad",
            },
            { text: "Credibility is the whole job", state: "warn" },
          ],
        },
      },
    ],
  },
  stakes: {
    heading: "What staying put costs",
    intro:
      "A dated site doesn't send an invoice, which is why it feels free. It isn't.",
    items: [
      {
        icon: "card",
        title: "The quiet discount",
        body: "An outdated site doesn't lose deals loudly. Prospects arrive pre-negotiated: they've seen the site, priced you as the cheap option, and opened with a lower number. You never find out what they would have paid.",
      },
      {
        icon: "layers",
        title: "The comparison you don't see",
        body: "Buyers open three tabs and yours is one of them. The competitor with worse work and a better website wins the call, and no report ever tells you it happened.",
      },
      {
        icon: "gauge",
        title: "The head start you're gifting",
        body: "Every month the site stays as it is, somebody else's site is collecting the rankings, reviews, and referrals in your market. The gap isn't static. It accrues.",
      },
    ],
  },

  outcomes: {
    heading: "What actually changes once the site is live",
    intro:
      "Not the deliverables list. The things you notice in the months afterwards.",
    items: [
      {
        title: "You stop apologising for your website",
        body: "Sending the link becomes something you do early in a conversation instead of late, without the caveat about how a redesign is coming. The site does the introduction it was supposed to be doing all along.",
        image: "/services/web-design.webp",
        imageAlt: "The ATW Trucking site Zenith built",
      },
      {
        title: "The same traffic starts converting",
        body: "Nothing about your marketing has to change for this to work. The visitors you already get land on pages built to move them toward one action, and more of them take it.",
        image: "/services/landing-pages.webp",
        imageAlt: "A campaign page built around a single action",
      },
      {
        title: "Your team can change things without you",
        body: "A new service page, a swapped photo, an updated price. Same day, by whoever needs it done, on your own Wix account. No developer, no ticket, no waiting for someone to have a free afternoon.",
        image: "/before-after/huntingbrook-after.jpg",
        imageAlt: "The Hunting Brook site after its rebuild",
      },
      {
        title: "You look established to people who've never heard of you",
        body: "Cold prospects, investors, and partners arrive with no context and decide fast. A site built to carry your actual credibility means that decision goes your way before you've said a word.",
        image: "/portfolio/fortlauderdale.jpg",
        imageAlt: "The FoxStays dock rental site",
      },
    ],
  },

  included: {
    heading: "What's included",
    intro:
      "Every build ships with all eight. Nothing here is an upsell you discover halfway through.",
    items: [
      {
        icon: "compass",
        title: "Strategy and structure",
        group: "Strategy & design",
        body: "We work out who is buying, what they need to see, and the order they need to see it in before anyone opens a design file. The sitemap comes out of that conversation rather than out of a template's page list.",
      },
      {
        icon: "type",
        title: "Conversion copywriting",
        group: "Strategy & design",
        body: "Words written to sell rather than to fill a layout, included from The Studio tier upward. Bring your own copy if you have it and we'll structure the design around it instead.",
      },
      {
        icon: "palette",
        title: "Custom Wix Studio design",
        group: "Strategy & design",
        body: "Designed from a blank canvas in Wix Studio. No purchased theme, no reskinned template, so a competitor can't buy the same starting point you did.",
      },
      {
        icon: "responsive",
        title: "Responsive build",
        group: "Build & search",
        body: "Laid out for phones first, where most of your traffic already is, then scaled up through tablet and desktop breakpoints and checked on real devices before launch.",
      },
      {
        icon: "search",
        title: "On-page SEO and schema",
        group: "Build & search",
        body: "Titles, meta descriptions, heading hierarchy, internal links, and structured data set on every page before you go live, so the site is indexable on day one instead of month three.",
      },
      {
        icon: "chart",
        title: "Analytics and lead capture",
        group: "Build & search",
        body: "Forms, booking, and conversion events wired into your CRM and analytics, so you can see which pages produce enquiries and which ones only produce traffic.",
      },
      {
        icon: "video",
        title: "Loom handover",
        group: "After launch",
        body: "A recorded walkthrough of your own site: editing pages, swapping images, publishing changes. Your team runs the site after we step away, without a support ticket.",
      },
      {
        icon: "support",
        title: "30 to 60 days of support",
        group: "After launch",
        body: "We stay on after launch to fix anything that surfaces once real traffic and real users arrive, because that's when the edge cases show up.",
      },
    ],
  },

  process: {
    heading: "How a build runs",
    intro:
      "Five stages, most of them measured in days. You'll know at every point what's happening and what we need from you.",
    // The showcase layout: the editor mid-build on the left, stages right.
    image: "/services/wix-studio.webp",
    imageAlt: "The Wix Studio editor during a Zenith build",
    cta: { label: "Book a call", href: "/book-a-call", variant: "primary" },
    steps: [
      {
        title: "Discovery call",
        focus: ["Goals and fit", "Current-site review", "Twenty minutes"],
        duration: "Day 1",
        body: "Twenty free minutes on what the site has to do, who it's selling to, and what's failing on the current one. If we're not the right fit we say so on the call.",
      },
      {
        title: "Proposal",
        focus: ["Fixed scope", "Fixed price", "Launch date in writing"],
        duration: "Same day",
        body: "Scope, fixed price, and launch date in writing, sent the same day as the call. No multi-week discovery invoice before you can see a number.",
      },
      {
        title: "Wireframes and copy",
        focus: ["Structure first", "Conversion copy", "Greyscale sign-off"],
        duration: "Week 1",
        body: "Structure and words first, greyscale, no visual polish to hide behind. Signing off at this stage is what keeps the design phase from turning into rounds of opinion.",
      },
      {
        title: "Design and build",
        focus: ["Designed in Wix Studio", "Reviewed on a live URL"],
        duration: "Weeks 2 to 4",
        body: "Design and build happen in Wix Studio directly, so what you review is the real site on a real URL rather than a flat mockup that still has to be rebuilt.",
      },
      {
        title: "Launch and handover",
        focus: ["Domain and redirects", "Analytics setup", "Loom walkthrough"],
        duration: "Week 5",
        body: "Domain, redirects, analytics, and search console set up, then the Loom walkthrough. The site is yours, on your own Wix account, from that day.",
      },
    ],
  },

  // Case-study rows: four per page, each with real stats and a distinct
  // client voice. Flynn's is the only quote on the four MOD-partnership
  // builds, so a page carries at most one of those studies.
  workSlugs: [
    "scottish-luxury-experience",
    "knode-ai",
    "belistria",
    "genroks-ai",
  ],

  pricing: {
    heading: "Wix Studio website pricing",
    from: "From €2,500",
    fromNote: "fixed, one-time",
    note: "The price is agreed before we start and it doesn't move unless you add scope. Most businesses land between the €2,500 entry build and the €4,500 Studio tier.",
    // The H1 promises "pays for itself", so the pull quote does the
    // arithmetic rather than leaving the reader to take it on faith.
    pullQuote:
      "The arithmetic behind the headline is worth doing before the call: if a customer is worth €500 to you, the €2,500 build pays for itself with five enquiries the old site wasn't winning. The case studies above are how that plays out in practice.",
    drivers: [
      {
        title: "Page count",
        body: "A five-page site and a fifteen-page site are different jobs. Page count is the single biggest lever on the number you're quoted.",
      },
      {
        title: "Custom functionality",
        body: "Booking flows, CMS collections, member areas, and integrations add build time. A brochure site with a contact form does not.",
      },
      {
        title: "Copywriting scope",
        body: "Writing every page from scratch costs more than editing copy you already have. Both are fine, and we'll tell you which one your project needs.",
      },
    ],
    cta: {
      label: "Get a fixed quote",
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
    kind: "comparison",
    heading: "Why a Top 1% Wix Partner instead of a freelancer or a template",
    intro:
      "All three options put a website on your domain. They differ on what happens in month six.",
    columns: [
      {
        name: "A template",
        note: "Cheapest, fastest, most replaceable",
        points: [
          "Design shared with everyone else who bought it",
          "Your content bends to fit the layout",
          "SEO basics left to you to configure",
          "No one to call when it breaks",
        ],
      },
      {
        name: "A freelancer",
        note: "Cheaper, until availability changes",
        points: [
          "Quality varies with who you happen to hire",
          "One person is one point of failure",
          "Copy, design, SEO rarely all in one skill set",
          "Handover depends on them still being around",
        ],
      },
      {
        name: "Zenith",
        note: "Fixed price, fixed date, named team",
        points: [
          "Designed from scratch, no theme underneath",
          "Copy, design, build, and SEO in one engagement",
          "Fixed price agreed before work starts",
          "30 to 60 days of support, then a site you can run",
        ],
      },
    ],
    footnote: {
      title: "What Top 1% Wix Partner actually means",
      body: "Wix ranks its partner agencies on delivered work and client outcomes, and publishes the tiers. Top 1% is the highest band. It isn't a badge you buy or apply for, which is exactly why it's worth checking on any agency that claims platform expertise, including ours.",
    },
  },

  faq: {
    heading: ["Wix Studio design,", "answered straight"],
    subhead: "The questions that come up on nearly every discovery call.",
    ctas,
    items: [
      {
        q: "How much does a Wix Studio website cost?",
        a: "From €2,500 for a build of up to five pages, and €4,500 for the twelve-page Studio tier with custom functionality and full copywriting. The figure is fixed before we start, so the number in the proposal is the number you pay.",
      },
      {
        q: "How long does a Wix Studio website take?",
        a: "Two to five weeks from kickoff, depending on page count and how quickly copy and feedback come back. Knode AI's ten-page SaaS site went from nothing to live in three weeks while the company was raising.",
      },
      {
        q: "Is Wix Studio good for SEO?",
        a: "Yes, and the platform stopped being the limiting factor years ago. Wix Studio gives you control over titles, meta descriptions, heading structure, canonical tags, redirects, robots directives, and structured data. What actually decides whether you rank is whether someone configured all of that properly and wrote pages worth ranking.",
      },
      {
        q: "Can I edit the site myself after launch?",
        a: "That's the point of building on Wix Studio. You get the site on your own account plus a recorded Loom walkthrough of how to edit pages, swap images, and publish. No developer, no monthly fee to change a headline.",
      },
      {
        q: "What's the difference between Wix and Wix Studio?",
        a: "Wix is the consumer drag-and-drop builder. Wix Studio is the professional environment on top of it, with a responsive layout engine, CSS-grid-style control, reusable components, a proper CMS, and custom code. Same underlying infrastructure, a different tool for the person building.",
      },
      {
        q: "Do you use templates?",
        a: "No. Every build starts from a blank Wix Studio canvas and a sitemap written for your business. We use our own component patterns to move quickly, which is not the same as starting from a theme somebody else can also buy.",
      },
    ],
  },

  related: {
    heading: "Related services",
    items: [
      {
        label: "Website migration",
        href: "/services/website-migration",
        // The migration card always uses the drag-to-compare widget, same as
        // the homepage: a static shot can't show a before and an after.
        beforeAfter: {
          before: "/before-after/foxstays-before.jpg",
          after: "/before-after/foxstays-after.jpg",
        },
        desc: "Already have a site with rankings worth protecting? Move it across without losing them.",
      },
      {
        label: "SEO, AEO & PPC",
        href: "/services/seo-aeo-ppc",
        image: "/services/seo-aeo.webp",
        desc: "Once the site is live, the campaigns and search work that bring people to it.",
      },
      {
        label: "All services",
        href: "/services",
        desc: "The full picture, including Wix Studio development and white-label production.",
      },
    ],
  },

  finalCta: {
    heading: ["Get a fixed price", "before you commit"],
    paragraph:
      "A free 20-minute call, then scope, price, and a launch date in writing the same day. If a rebuild isn't what you need, we'll tell you that instead.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Custom Wix Studio website design and build from a Top 1% Wix Partner. Strategy, conversion copywriting, responsive build, on-page SEO and schema, analytics, and handover. Launched in 2 to 5 weeks from €2,500 fixed.",
    priceFrom: "2500",
  },
};
