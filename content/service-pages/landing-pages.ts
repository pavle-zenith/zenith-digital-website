import type { CtaLink } from "@/lib/types";
import type { ServicePageContent } from "./types";

/**
 * /services/landing-pages
 * Targets: landing page design agency · wix landing page · campaign landing
 * pages.
 *
 * PUBLISHED Aug 2026. Retail price set by owner: €1,250 fixed per page, with
 * the partner rate on /partnerships moved down to €1,000 in the same decision,
 * so the retail floor sits above the partner rate as designed.
 *
 * Testimonial note: the handoff asked for a second Flynn pull here, but there
 * is only one real Flynn quote on record and page 3 uses it. Rather than split
 * or reword a client's actual words, this page carries John Smyth's real quote,
 * which also matches the agency-overflow buyer named in `whoFor`.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const landingPages: ServicePageContent = {
  slug: "landing-pages",
  publish: true,
  seo: {
    title: "Wix Landing Page Design | Live in a Week | Zenith Digital",
    description:
      "Conversion-first Wix landing pages designed, written, and live in about a week, from €1,250. 15+ built for MOD Digital's campaigns.",
  },

  hero: {
    name: "Landing pages",
    h1: "Landing pages built to convert the traffic you're already paying for",
    subhead:
      "Conversion-first campaign pages designed, written, and live in about a week. 15+ built for MOD Digital's campaigns, driving €1M+ in client revenue.",
    chips: [
      "15+ campaign pages for MOD",
      "€1M+ campaign revenue",
      "Live in about a week",
    ],
    ctas,
  },

  whoFor: {
    heading: "Who needs a dedicated page",
    intro:
      "If any of these describe your current setup, a campaign page will out-earn the homepage you're pointing at now.",
    items: [
      {
        title: "Your ads point at the homepage",
        body: "The ad promised one specific thing and the page that opens offers eleven. Visitors who clicked with intent land somewhere general and have to hunt for what brought them there.",
        anim: "ad-mismatch",
        card: {
          label: "Ad destination",
          value: "Homepage",
          valueNote: "Eleven offers, one promise",
          rows: [
            { text: "The ad promised one specific thing", state: "warn" },
            { text: "Visitors hunt for what brought them there", state: "bad" },
            { text: "The intent is there on arrival", state: "good" },
          ],
        },
      },
      {
        title: "You're launching an offer or a campaign",
        body: "A new product, a seasonal push, a webinar, or a lead magnet. It needs a page of its own with a single argument, and it needs it before the campaign date, not after.",
        anim: "campaign-date",
        card: {
          label: "Campaign date",
          value: "Fixed",
          valueNote: "The page has to exist before it",
          rows: [
            { text: "A launch, a seasonal push, or a webinar", state: "warn" },
            { text: "Needs a single argument, not a menu", state: "warn" },
            { text: "The offer itself is decided", state: "good" },
          ],
        },
      },
      {
        title: "You're an agency short on build capacity",
        body: "Client campaigns are booked and the build queue is full. We produce pages under your brand at partner rates, which is covered properly on the partnerships page.",
        anim: "build-queue",
        card: {
          label: "Build queue",
          value: "Full",
          valueNote: "Client campaigns already booked",
          rows: [
            { text: "More demand than production capacity", state: "warn" },
            { text: "Pages produced under your brand", state: "good" },
            {
              text: "Partner rates, covered on the partnerships page",
              state: "good",
            },
          ],
        },
      },
    ],
  },
  stakes: {
    heading: "What the homepage is costing your campaigns",
    intro:
      "If ads are running, you already own this problem. The only question is its size.",
    items: [
      {
        icon: "card",
        title: "You're already paying for the traffic",
        body: "The click costs the same whether it lands on a page built to convert it or on your homepage. The only variable is how much of what you bought you keep.",
      },
      {
        icon: "split",
        title: "A homepage introduces, it doesn't close",
        body: "Every campaign click that lands on a general-purpose page has to find its own way to the offer it clicked for. Most don't, and the platform charges you for them anyway.",
      },
      {
        icon: "gauge",
        title: "Mismatch is fined at both ends",
        body: "Ad platforms reward pages that match the ad with cheaper clicks and better placement. A mismatched page pays more per click and converts fewer of them. Same budget, twice the penalty.",
      },
    ],
  },

  outcomes: {
    heading: "What a dedicated page does for the campaign",
    intro:
      "Same ads, same budget, same audience. The page is the only variable that changes.",
    items: [
      {
        title: "You keep more of the traffic you already bought",
        body: "The click costs what it costs whether it lands somewhere built to convert it or on a homepage offering eleven other things. This is the cheapest lever in the whole campaign, and it's usually the one nobody pulled.",
        image: "/portfolio/knode.jpg",
        imageAlt: "The Knode AI site",
      },
      {
        title: "The campaign launches on its date",
        body: "About a week from brief to live means the page is ready before the ads are, rather than the ads waiting or running to a placeholder. Campaign calendars stop bending around the build queue.",
        image: "/portfolio/fortlauderdale.jpg",
        imageAlt: "The FoxStays dock rental site",
      },
      {
        title: "Every offer gets its own argument",
        body: "One page, one promise, matched to the ad that sent them. Visitors stop having to work out which part of your business the thing they clicked on lives in.",
        image: "/services/web-design.webp",
        imageAlt: "The ATW Trucking site",
      },
      {
        title: "Testing stops being a project",
        body: "A new headline or offer is a duplicated page and a swapped block, not a rebuild. The second campaign is faster and cheaper than the first, and so is the fifth.",
        image: "/portfolio/scottishluxury.jpg",
        imageAlt: "The Scottish Luxury Experience site",
      },
    ],
  },

  included: {
    heading: "What you get",
    intro:
      "Six things, priced as one page. There's no separate copy invoice at the end.",
    items: [
      {
        icon: "type",
        title: "Conversion copy and structure",
        group: "Copy & design",
        body: "Written around one action, in the order a sceptical visitor needs it: the promise, the proof, the objection handling, then the ask. Headline language matched to the ad that sent them.",
      },
      {
        icon: "palette",
        title: "Design matched to your brand",
        group: "Copy & design",
        body: "Built to look like it belongs to your business, not to a page builder. Existing brand assets are used where they exist, and where they don't we work from the site you already have.",
      },
      {
        icon: "gauge",
        title: "Build and speed pass",
        group: "Build & integrations",
        body: "Assembled in Wix Studio and compressed hard. Paid traffic is the least patient traffic you buy, and a page that loads slowly wastes the click before anyone reads it.",
      },
      {
        icon: "plug",
        title: "Form, CRM, and booking integrations",
        group: "Build & integrations",
        body: "Submissions land where your team already works, whether that's a CRM, an inbox, a spreadsheet, or a booking calendar. Tested with real submissions before the page goes live.",
      },
      {
        icon: "chart",
        title: "Analytics events",
        group: "Measure & test",
        body: "Conversion tracking wired for Google and Meta so the campaign can optimise against actual leads instead of clicks, and so you can see which section people stop at.",
      },
      {
        icon: "split",
        title: "Variant-ready structure",
        group: "Measure & test",
        body: "Sections built to be swapped, so testing a different headline or offer means duplicating a page and changing one block rather than starting again.",
      },
    ],
  },

  process: {
    heading: "One week, day by day",
    intro:
      "The whole point of this service is speed, so the timeline is published in days rather than phases.",
    image: "/services/landing-pages.webp",
    imageAlt: "A campaign page built for Hunting Brook Gardens, top to bottom",
    cta: { label: "Book a call", href: "/book-a-call", variant: "primary" },
    steps: [
      {
        title: "Brief",
        focus: ["The offer", "Traffic source", "What counts as a conversion"],
        duration: "Day 1",
        body: "Thirty minutes on the offer, the audience, the traffic source, and what counts as a conversion. If you have ad copy already, we work backward from it.",
      },
      {
        title: "Copy and wireframe",
        focus: ["Conversion copy", "Greyscale layout", "Your sign-off"],
        duration: "Days 2 to 3",
        body: "The argument gets written and laid out in greyscale for your sign-off. Changing the pitch is cheap here and expensive once it's designed.",
      },
      {
        title: "Design and build",
        focus: ["Wix Studio build", "Integrations", "Speed pass"],
        duration: "Days 4 to 6",
        body: "Designed and built straight into Wix Studio on a live staging URL, with integrations connected and the speed pass done as part of the build.",
      },
      {
        title: "Live and tracked",
        focus: ["Your domain", "Tracking verified", "Traffic the same day"],
        duration: "Day 7",
        body: "Published on your domain with tracking verified end to end. You send traffic the same day and see conversions attributed correctly from the first click.",
      },
    ],
  },

  // Case-study rows: four per page, each with real stats and a distinct
  // client voice (see the wix-studio page's note). Katie Hailey returns
  // once a quote from her is on record.
  workSlugs: ["mod-digital", "knode-ai", "belistria", "just-stay"],

  pricing: {
    heading: "What a landing page costs",
    from: "From €1,250",
    fromNote: "fixed, per page",
    note: "One page, one fixed number, agreed before the brief call ends. Agencies reselling under their own brand pay the partner rate published on the partnerships page instead.",
    drivers: [
      {
        title: "Length of the page",
        body: "A single-offer page with four sections and a long-form sales page with twelve are different amounts of writing and design. Most campaigns need the short one.",
      },
      {
        title: "Copy from scratch or supplied",
        body: "We can write the argument from the brief or build around copy your team already has. Supplied copy takes a day out of the timeline and comes off the price.",
      },
      {
        title: "Integrations and tracking",
        body: "A form to an inbox is simple. Routing to a CRM with lifecycle stages, a booking calendar, and multi-platform conversion tracking takes longer to wire and test.",
      },
    ],
    cta: {
      label: "Brief a landing page",
      href: "/book-a-call",
      variant: "primary",
    },
    ctaSecondary: {
      label: "Partner rates for agencies",
      href: "/partnerships",
      variant: "secondary",
    },
  },

  unique: {
    kind: "explainer",
    heading: "Why campaign traffic converts on a page of its own",
    intro:
      "The homepage and the landing page are answering different questions, which is why sending paid clicks to the first one leaks money.",
    left: {
      title: "A homepage introduces the company",
      body: "It has to serve everyone at once: the buyer comparing options, the candidate reading about the team, the existing client hunting for a phone number. So it opens with who you are, offers a navigation bar full of exits, and asks for several different things. That's the correct job for organic visitors who arrived curious. It's the wrong job for someone who clicked a specific promise thirty seconds ago.",
    },
    right: {
      title: "A landing page closes one argument",
      body: "It repeats the exact promise from the ad in the first line, so the visitor knows immediately they're in the right place. It removes the navigation, because every other link is a way to leave. It carries one call to action, repeated, and orders proof to answer objections in the sequence they occur. Fewer choices, one path, and every section pushing the same way.",
    },
    closing:
      "Three things do most of the work: message match between ad and headline, a single action instead of a menu, and a page fast enough that the click isn't wasted before it renders. None of them require a bigger budget, only a page built for the job.",
  },

  faq: {
    heading: ["Landing pages,", "answered quickly"],
    subhead: "Fittingly, given the whole service is measured in days.",
    ctas,
    items: [
      {
        q: "How fast can a landing page go live?",
        a: "About a week from brief to live, and that's the working timeline rather than a best case. Day one is the brief, days two and three are copy and wireframe, days four to six are design and build, and day seven is launch with tracking verified.",
      },
      {
        q: "What does a landing page cost?",
        a: "One fixed price per page, quoted before the brief call ends, with length, copy scope, and integrations the three things that move it. Agencies reselling under their own brand pay the partner rate listed on the partnerships page.",
      },
      {
        q: "Do you write the copy?",
        a: "Yes, and it's included rather than an add-on. If your team already has the messaging, we'll build around it instead, which takes a day out of the timeline and comes off the price.",
      },
      {
        q: "Can it live on my existing domain?",
        a: "Yes. Most pages go live as a path on your main domain, which keeps the domain authority and the tracking in one place. A subdomain or a separate domain also works if the campaign calls for it.",
      },
      {
        q: "Do you A/B test?",
        a: "Pages are built variant-ready, so testing a new headline or offer means duplicating the page and swapping one block. Running and reading the tests can sit inside a campaign engagement, or your team can run them.",
      },
      {
        q: "What if I need five of them?",
        a: "That's the normal shape of this work rather than an exception. MOD Digital has run 15+ pages with us against a campaign calendar. Multiple pages share a design system, so pages two onward are faster and cheaper than the first.",
      },
    ],
  },

  related: {
    heading: "Related services",
    items: [
      {
        label: "SEO, AEO & PPC",
        href: "/services/seo-aeo-ppc",
        image: "/services/seo-aeo.webp",
        desc: "The campaigns that send traffic to the page, managed alongside it.",
      },
      {
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        image: "/services/web-design.webp",
        desc: "When the whole site needs the treatment, not just one campaign page.",
      },
      {
        label: "White-label for agencies",
        href: "/partnerships",
        desc: "Partner pricing, unbranded deliverables, and a dedicated channel.",
      },
    ],
  },

  finalCta: {
    heading: ["Stop paying for clicks", "that land nowhere"],
    paragraph:
      "Tell us the offer and where the traffic comes from. We'll tell you what the page needs and what it costs, on a 20-minute call.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "Conversion-first campaign landing page design and build on Wix Studio. Copy, design, integrations, analytics events, and a speed pass, live in about a week.",
    priceFrom: "1250",
  },
};
