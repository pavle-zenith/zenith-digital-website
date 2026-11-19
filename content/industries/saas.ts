import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, figure, lower } from "./proof";

/**
 * /industries/saas, written from the travel template (18 Nov 2026). Held for
 * owner review.
 *
 * Every figure is read from content/case-studies.ts through ./proof. The two
 * detail studies are Knode AI (Wix Studio, a 10-page site in 3 weeks, into a
 * Series A raise) and Genroks AI (custom code with Sanity, 10+ ISO deals and
 * 3+ reselling consulting houses since launch). Iskra has a scope card only.
 *
 * Scope notes that shape the copy: Knode's engagement covered positioning,
 * design, build, CMS and integrations but NOT copywriting (case-study
 * techUsed); Genroks' covered brand, design, copy and SEO/AEO. The published
 * packages apply to Wix Studio and custom-code builds alike (owner,
 * 19 Nov 2026).
 *
 * OWNER, please confirm before publishing:
 *   (Resolved 19 Nov 2026: custom-code builds use the same published
 *   packages as Wix Studio.)
 *   2. Not a fit: "You need the product itself designed or built". True to
 *      the offer as published (websites, not app UI), but you know the edge
 *      cases better.
 *   3. Iskra appears in the hero and the project slider. If it's your own
 *      product rather than a client build, say so or drop it from the hero.
 */

const knode = card("knode-ai");
const knodeBuild = figure("knode-ai", "Kickoff to launch");
const knodePages = figure("knode-ai", "Pages designed and built");
const knodeRaise = figure("knode-ai", "Raise in progress");

const genroks = card("genroks-ai");
const genroksDeals = figure("genroks-ai", "ISO certification projects closed");
const genroksResellers = figure("genroks-ai", "Consulting houses");

const { minimum, studio, landing } = PACKAGES;

export const saas: IndustryPageContent = {
  slug: "saas",
  industry: "saas",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.saas,
  filterLinkLabel: "See the SaaS and AI page",

  seo: {
    title: "SaaS and AI startup website design | Zenith Digital",
    description: `Websites for SaaS and AI startups that explain the product fast and book demos. ${genroks.client}: ${genroksDeals} ISO deals closed since launch.`,
  },

  hero: {
    h1: "SaaS and AI websites that explain the product in one screen",
    proof:
      "We design and build marketing sites for SaaS and AI startups that make a complex product clear, look ready for investors, and turn visitors into booked demos.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // Two SaaS studies have detail pages; the third shot is Iskra's own grid
    // card, real work rather than a borrowed study from another industry.
    shots: {
      center: "genroks-ai",
      left: "knode-ai",
      right: {
        src: "/case-studies/iskra/card.webp",
        alt: "Iskra quit-smoking app website in a browser window: an orange hero with an email sign-up for early access and the app's progress screen on a phone",
      },
    },
  },

  inShort: `Zenith Digital designs and builds marketing websites for SaaS and AI startups, on Wix Studio or in custom code with Sanity CMS, with demo booking and lead capture connected to the tools you already use. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a launch landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among SaaS and AI teams",
    good: [
      { icon: "rocket", text: "Startups heading into a raise or a launch" },
      { icon: "sparkles", text: "AI products that are hard to explain in a line" },
      { icon: "users", text: "Teams that want to edit pages without a developer" },
    ],
    notAFit: [
      "You need the product itself designed or built",
      "You can't show any real product screens yet",
      "You want a template site with no positioning work",
    ],
  },

  familiar: {
    heading: ["Your product moved on.", "Your website didn't."],
    intro:
      "Most SaaS and AI sites lose people on the first screen, long before anyone books a demo. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "answer",
        title: "Visitors can't tell what the product does from the first screen.",
        body: "We lead with the job it does and real product UI, not an abstract gradient and a slogan.",
      },
      {
        icon: "chart",
        title: "Investors open the site before they open the deck.",
        body: "We structure it for two readers at once: buyers judging the product, and investors judging the company.",
      },
      {
        icon: "send",
        title: "Your sales team sends the link mid-deal, and it argues against you.",
        body: "We design and write the site as the credibility check between a good call and a signed contract.",
      },
      {
        icon: "layers",
        title: "The site still describes the product you sold last year.",
        body: "We build it on a CMS, so your team ships new pages, features and customer stories without a developer.",
      },
      {
        icon: "form",
        title: "Demo requests arrive with no idea who's asking.",
        body: "We add intake questions that qualify a lead before the call, and route it to your CRM and calendar.",
      },
      {
        icon: "radar",
        title: "Buyers ask AI assistants which tool to use, and you're not named.",
        body: "We structure pages, answers and schema so search engines and AI assistants can read what you do and cite it.",
      },
    ],
  },

  steps: {
    heading: "How we build a SaaS or AI website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Positioning",
        scene: "saas-positioning",
        title: "Say what it does, and for whom, in one screen",
        body: "Before any design we agree the one sentence the homepage has to land, who it's for, and what each reader needs next: a buyer wants proof it works, an investor wants proof it's a company.",
        deliverables: [
          "Positioning and messaging",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Platform",
        scene: "saas-platform",
        title: "Choose Wix Studio or custom code on purpose",
        body: "Wix Studio when your team needs to edit and ship pages fast; custom code with a headless CMS when the brand needs interactions a platform can't do. Knode runs on Wix Studio, Genroks on custom code with Sanity.",
        deliverables: [
          "Platform recommendation",
          "CMS structure",
          "Integrations plan",
        ],
      },
      {
        navLabel: "Design",
        scene: "saas-design",
        title: "Put the real product on screen",
        body: "Screenshots and UI from your product do more than any illustration, so the site reads as a continuation of what you ship. We design every page around them, and write or shape the copy that goes with them.",
        deliverables: [
          "Wireframes and copy",
          "Product UI visuals",
          "The site, built in Wix Studio or code",
        ],
      },
      {
        navLabel: "Conversion",
        scene: "saas-conversion",
        title: "Turn interest into booked demos",
        body: "Demo booking, trial sign-up or waitlist, whichever your sales motion needs, with intake questions that qualify the lead and send it to the tools your team already uses.",
        deliverables: [
          "Demo, trial or waitlist flow",
          "Form and CRM routing",
          "Analytics events",
        ],
      },
      {
        navLabel: "Launch",
        scene: "saas-launch",
        title: "Launch to your raise or release date",
        body: "We set the launch against the date that matters to you: the first investor meeting, the product release, the conference. Your old site stays up until the switch.",
        deliverables: [
          "Redirects and domain",
          "Analytics and Search Console",
          "Handover walkthrough",
          "30 days of support",
        ],
      },
    ],
  },

  testimonials: {
    heading: "What SaaS and AI clients say",
    intro:
      "Founders, a go-to-market lead and the tech companies we build for, in their own words.",
    // Owner's picks, 18 Nov 2026: Dragan (NotixIT), Stevan (Techtonnik) and
    // Ben (Capacity) join the two SaaS clients.
    items: [
      { id: "uros-stanimirovic" },
      { id: "gemma-sole" },
      { id: "dragan-gavric" },
      { id: "stevan-radovanovic" },
      { id: "ben-hall" },
    ],
  },

  work: {
    heading: "SaaS and AI websites we've built",
  },

  pricing: {
    heading: "What a SaaS website costs",
    note: "Fixed prices, agreed before we start, and the same whether we build on Wix Studio or in custom code.",
    notes: {
      landing: "For a launch, a waitlist or one campaign, live in about a week.",
    },
  },

  faq: {
    heading: ["SaaS website", "questions"],
    subhead: "Straight answers on platforms, speed, cost and who edits the site.",
    items: [
      {
        q: "How much does a SaaS website cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. A launch landing page is ${lower(landing.price)}, ${lower(landing.timeline)}. The prices are the same on Wix Studio and in custom code, like ${genroks.client}'s Next.js site with Sanity.`,
      },
      {
        q: "Should a SaaS startup build on Wix Studio, Webflow or custom code?",
        a: `Wix Studio if your marketing team needs to edit and ship pages fast without a developer; custom code with a headless CMS if the brand depends on interactions a platform can't do. ${knode.client} runs on Wix Studio. ${genroks.client} is custom code with Sanity CMS, because it positions itself as agent-native and a template look would undercut that. We compare Wix Studio and Webflow in a separate article.`,
      },
      {
        q: "How fast can you launch a SaaS website before a fundraise or launch?",
        a: `${minimum.name} ships in ${minimum.timeline} and ${studio.name} in ${studio.timeline}; a single landing page is ${lower(landing.timeline)}. ${knode.client}'s ${knodePages}-page site went from kickoff to live in ${knodeBuild}, in time for its ${knodeRaise} conversations.`,
      },
      {
        q: "Can our team update the website without a developer?",
        a: `Yes. ${knode.client}'s site runs on a Wix Studio CMS, so the team ships new pages and customer stories without us. ${genroks.client}'s custom-coded site has Sanity behind it, so the team edits and publishes without touching the codebase.`,
      },
      {
        q: "Do you write the copy, or do we?",
        a: `Either. ${studio.name} includes copywriting. On ${genroks.client} we wrote every page as part of the rebrand; on ${knode.client} we set the positioning and structure and the team wrote its own copy.`,
      },
      {
        q: "What happens to our current site and its URLs when we rebuild?",
        a: `Your old site stays live until launch day, and every URL that matters is mapped to its new page with a redirect, so links and search traffic follow. ${knode.client} moved from Wix Classic to Wix Studio, and ${genroks.client} replaced a Framer template its sales process had outgrown. Since launch, ${genroks.client} has closed ${genroksDeals} ISO certification projects and signed ${genroksResellers} consulting houses to resell its software.`,
      },
    ],
  },

  related: {
    heading: "More on SaaS and AI websites",
    items: [
      {
        kind: "Service",
        label: "Wix Studio development",
        href: "/services/wix-studio-development",
        desc: "Custom code, CMS architecture and integrations, for sites that outgrow the defaults.",
        icon: "code",
      },
      {
        kind: "Article",
        label: "Why isn't your AI-built website getting any enquiries?",
        href: "/blog/ai-built-website-no-enquiries",
        desc: "What a site built with an AI tool usually misses, and how to tell if yours does.",
        icon: "pen",
      },
      {
        kind: "Comparison",
        label: "Wix Studio vs Webflow: which should you build on?",
        href: "/compare/wix-studio-vs-webflow",
        desc: "The platform choice most SaaS teams weigh, compared on what matters after launch.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "Wix Classic to Wix Studio",
        href: "/services/wix-classic-to-wix-studio",
        desc: "The move Knode AI made, with what carries over and what gets rebuilt.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Raising, launching or", "outgrowing your site?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way a buyer and an investor would, and tell you honestly what to fix first.",
  },

  schema: {
    serviceName: "SaaS and AI website design",
    description:
      "Marketing website design and build for SaaS and AI startups, on Wix Studio or in custom code with Sanity CMS, with demo booking and lead capture connected to the client's own tools.",
  },
};
