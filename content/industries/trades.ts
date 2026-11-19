import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, lower } from "./proof";

/**
 * /industries/trades, written from the travel template (18 Nov 2026). Held
 * for owner review.
 *
 * No trades project has a detail case study, so every project is a scope
 * card and the page claims scope, never results: Pressure Test Scotland
 * (instant-quote lead capture), BW Kitchens (projects and free-quote
 * enquiries in Worthing and Sussex) and ATW Trucking (logistics site
 * rebuild). Details beyond the card lines are read off the sites' own
 * screenshots (PTS's homepage quote form, ATW's careers page). Nothing here
 * promises rankings.
 */

const pts = card("pressure-test-scotland");
const bw = card("bw-kitchens");
const atw = card("atw-trucking");

const { minimum, studio, landing } = PACKAGES;

export const trades: IndustryPageContent = {
  slug: "trades",
  industry: "trades",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.trades,
  filterLinkLabel: "See the trades page",

  seo: {
    title: "Trades and contractor website design | Zenith Digital",
    description:
      "Websites for trades, contractors and logistics firms: a quote form on the first screen, a page per service and area, and the work and reviews that win the job.",
  },

  hero: {
    h1: "Trade websites that turn searches into quote requests",
    proof:
      "We design and build websites for trades, contractors and logistics firms that show the work, cover the area and put the quote request where people look first.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // No trades detail studies yet: the shots are the projects' own grid
    // cards.
    shots: {
      center: {
        src: "/case-studies/pressure-test-scotland/card.webp",
        alt: "Pressure Test Scotland's website in a browser window: Scotland-wide pipe pressure testing based in Ayr, with a quote form on the first screen and accreditations below",
      },
      left: {
        src: "/case-studies/bw-kitchens/card.webp",
        alt: "BW Kitchens' website in a browser window: kitchen fitters and home remodelling contractors in Worthing, with a free quote button and photos of fitted kitchens",
      },
      right: {
        src: "/case-studies/atw-trucking/card.webp",
        alt: "ATW Trucking's website in a browser window: Indiana's most trusted logistics and trucking provider, with trucking, logistics, specialty freight, cross border and heavy equipment shipping",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio or in custom code for trades, contractors and logistics firms: a quote request on the first screen, a page for every service and area you cover, and your projects, reviews and accreditations where customers decide. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among trades",
    good: [
      { icon: "wrench", text: "Trades and contractors who win work by quote" },
      { icon: "map-pin", text: "Firms covering a town, county or region" },
      { icon: "briefcase", text: "Logistics and freight companies" },
    ],
    notAFit: [
      "You need a job-management app built",
      "You have no photos of your work yet",
      "You want to rank in towns you don't serve",
    ],
  },

  familiar: {
    heading: ["You're good at the job.", "Your website doesn't show it."],
    intro:
      "Most trade websites lose the job before anyone picks up the phone. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "form",
        title: "The quote form is three clicks deep.",
        body: "We put the quote request on the first screen, asking the questions you need to price the job.",
      },
      {
        icon: "map-pin",
        title: "Customers can't tell if you cover their area.",
        body: "We name the towns and regions you work in, and give the ones that matter their own page.",
      },
      {
        icon: "image",
        title: "Your best work is on your phone, not your site.",
        body: "We build a project gallery you add to from the job, so the next customer sees the last one.",
      },
      {
        icon: "shield",
        title: "Your accreditations and reviews sit where nobody sees them.",
        body: "We put certifications and ratings next to the quote button, where a customer decides whether to trust you.",
      },
      {
        icon: "layers",
        title: "Every service is crammed onto one page.",
        body: "We give each service its own page, so the customer searching for that job lands on it.",
      },
      {
        icon: "users",
        title: "You need drivers and fitters as much as customers.",
        body: "We add a careers page and an application form, so recruiting runs through the site too.",
      },
    ],
  },

  steps: {
    heading: "How we build a trades website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Services",
        scene: "trades-services",
        title: "Map every service and the area you cover",
        body: "We list what you do, where you do it and which jobs you want more of, before any design. That map decides the pages, the quote form and the order on the homepage.",
        deliverables: [
          "Service and area map",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Quote",
        scene: "trades-quote",
        title: "Put the quote request on the first screen",
        body: "The form asks what you need to price the job: the service, the site location and a few details. On a phone, calling you is one tap away.",
        deliverables: [
          "Quote form with job details",
          "Click-to-call and email routing",
          "CRM capture",
        ],
      },
      {
        navLabel: "Proof",
        scene: "trades-proof",
        title: "Show the work, the reviews and the accreditations",
        body: "Photos of finished jobs, your rating and the schemes you're accredited with sit next to the quote request, not on a page nobody opens.",
        deliverables: [
          "Project gallery",
          "Reviews and accreditations",
          "Testimonial layout",
        ],
      },
      {
        navLabel: "Local search",
        scene: "trades-localsearch",
        title: "Give each service and area its own page",
        body: "Customers search for the job in the place. A page per service, and per area where it's worth it, lets each one answer the search made for it.",
        deliverables: [
          "Service pages",
          "Area pages",
          "On-page SEO and schema",
        ],
      },
      {
        navLabel: "Launch",
        scene: "trades-launch",
        title: "Launch without losing a week of enquiries",
        body: "We set the launch date with you and switch over without taking the site down. Your old site stays up until then, and every old page points to its new one.",
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
    heading: "What clients say",
    intro:
      "A pipe testing firm, a trucking company and other businesses we've built for, in their own words.",
    // Owner, 18 Nov 2026: industry clients first, then general ones to fill.
    items: [
      { id: "david-connel" },
      { id: "cody-atherton" },
      { id: "michael-forte" },
      { id: "erin-camp" },
      { id: "evy-hansen" },
    ],
  },

  work: {
    heading: "Trades websites we've built",
  },

  pricing: {
    heading: "What a trades website costs",
    note: "Fixed prices, agreed before we start. Choose by how many services and areas need a page of their own.",
    notes: {
      landing: "For one service, one area or a seasonal campaign, live in about a week.",
    },
  },

  faq: {
    heading: ["Trades website", "questions"],
    subhead: "Straight answers on quotes, local search, cost and timing.",
    items: [
      {
        q: "How much does a website for a trades business cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. A single service or area page is ${lower(landing.price)}, ${lower(landing.timeline)}.`,
      },
      {
        q: "What should a trades website show on the first screen?",
        a: `What you do, where you do it, a way to get a quote and a reason to trust you. ${pts.client}'s homepage opens with its service and base, a quote form asking for the site location and the service needed, and its accreditations underneath.`,
      },
      {
        q: "Will a website help me get found in my area?",
        a: "It gives you the best chance: a page for each service and each area that's worth one, your business details marked up for search engines, and the same name, address and phone everywhere. Nobody can promise a ranking, but a site that doesn't name the town rarely shows up for it.",
      },
      {
        q: "Can I add photos of finished jobs myself?",
        a: `Yes. The project gallery runs on a CMS, so you add a finished job with its photos and the area yourself, the way ${bw.client} shows its fitted kitchens around Worthing and Sussex.`,
      },
      {
        q: "Can the website help me hire drivers or fitters?",
        a: `Yes. A careers page with an application form puts recruiting on the same site customers already visit. ${atw.client}'s logistics site carries its careers page next to its services.`,
      },
      {
        q: "How quickly can you replace a website the last designer abandoned?",
        a: `${minimum.name} ships in ${minimum.timeline}. ${atw.client} came to us after its previous web designers bailed out, needing a clean site in place quickly; the old site stays up until the new one is ready.`,
      },
    ],
  },

  related: {
    heading: "More on trades websites",
    items: [
      {
        kind: "Service",
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        desc: "The design and build service behind these sites, from structure to launch.",
        icon: "palette",
      },
      {
        kind: "Article",
        label: "Why isn't my Wix website showing up on Google?",
        href: "/blog/wix-website-not-showing-on-google",
        desc: "The usual reasons a local business site doesn't appear, and how to check yours.",
        icon: "pen",
      },
      {
        kind: "Article",
        label: "Why does your website get traffic but no enquiries?",
        href: "/blog/traffic-but-no-enquiries",
        desc: "Where visitors drop off between finding you and asking for a quote.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "Wix Classic to Wix Studio",
        href: "/services/wix-classic-to-wix-studio",
        desc: "What carries over from an older Wix site, and what gets rebuilt.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Good at the job,", "short on quote requests?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way a customer with a job would, and tell you honestly what's stopping them from asking for a quote.",
  },

  schema: {
    serviceName: "Trades and contractor website design",
    description:
      "Website design and build on Wix Studio or in custom code for trades, contractors and logistics firms, with quote requests on the first screen, service and area pages, project galleries and recruiting pages.",
  },
};
