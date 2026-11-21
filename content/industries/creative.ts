import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, lower } from "./proof";

/**
 * /industries/creative, written from the travel template (18 Nov 2026).
 * Held for owner review.
 *
 * No creative project has a detail case study, so every project is a scope
 * card and the page claims scope, never results: LORAK Films (reel-led
 * portfolio and case studies), Creatify Collective (selected work for a
 * fashion, lifestyle and automotive studio) and Creative Native Films
 * (portfolio and quote requests). The search and AI leads line comes from
 * Josh Smith's own testimonial and is attributed to him.
 *
 * Testimonials (owner, 18 Nov 2026): industry clients first, then general
 * ones to fill the section.
 */

const lorak = card("lorak-films");
const creatify = card("creatify-collective");
const cnf = card("creative-native-films");

const { minimum, studio, landing } = PACKAGES;

export const creative: IndustryPageContent = {
  slug: "creative",
  industry: "creative",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.creative,
  filterLinkLabel: "See the creative page",

  seo: {
    title: "Film and creative studio website design | Zenith Digital",
    description:
      "Portfolio websites for film crews, video production companies and creative studios: fast reels, work clients can filter, and quote requests with a brief.",
  },

  hero: {
    h1: "Portfolio websites that turn the reel into briefs",
    proof:
      "We design and build portfolio websites for film crews, video production companies and creative studios that load fast, show the work properly and turn a good reel into a quote request.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // No creative detail studies yet: the shots are the projects' own grid
    // cards.
    shots: {
      center: {
        src: "/case-studies/creative-native-films/card.webp",
        alt: "Creative Native Films' website in a browser window: the headline Born to create, built to impact over a full-width film still, with a request a quote button",
      },
      left: {
        src: "/case-studies/lorak-films/card.webp",
        alt: "LORAK Films' website in a browser window: a full-bleed video still of a six-wheeled truck in the desert, with portfolio and case studies in the menu",
      },
      right: {
        src: "/case-studies/creatify-collective/card.webp",
        alt: "Creatify Collective's website in a browser window: the headline Where vision meets culture over a car shoot, with a selected work section below",
      },
    },
  },

  inShort: `Zenith Digital designs and builds portfolio websites on Wix Studio for film crews, video production companies and creative studios: a reel that plays fast, work clients can filter by what they need, case studies for the big projects and a quote request that arrives with a brief. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among creatives",
    good: [
      { icon: "clapperboard", text: "Film and video production companies" },
      { icon: "image", text: "Creative studios with a body of work to show" },
      { icon: "form", text: "Crews who win work by quote, not by checkout" },
    ],
    notAFit: [
      "You need a client proofing and delivery portal",
      "You want to sell stock footage or presets",
      "You don't have edited work to show yet",
    ],
  },

  familiar: {
    heading: ["The work is strong.", "The site undersells it."],
    intro:
      "Most creative portfolios lose the client between the reel and the enquiry. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "video",
        title: "The reel takes so long to load that people leave before it plays.",
        body: "We host and compress the video properly and show a still first, so the reel starts the moment someone wants it.",
      },
      {
        icon: "layout-grid",
        title: "Clients can't find work from their own industry.",
        body: "We let them filter the portfolio by sector and format, so a fashion brand sees fashion first.",
      },
      {
        icon: "form",
        title: "Enquiries arrive as \"how much for a video?\"",
        body: "We build a quote request that asks for the type, the length, the date and the budget, so you can reply with a number.",
      },
      {
        icon: "clipboard",
        title: "Your best project is one thumbnail in a grid.",
        body: "We give the big projects a case study page: the brief, the shoot, the result, with the film in the middle.",
      },
      {
        icon: "search",
        title: "Nobody finds you when they search for a crew in your city.",
        body: "We give each service and location a page, structured so search engines and AI assistants can read and cite it.",
      },
      {
        icon: "brush",
        title: "Adding last month's project means asking someone.",
        body: "We put the portfolio on a CMS, so a new project goes up the week it's delivered.",
      },
    ],
  },

  steps: {
    heading: "How we build a creative portfolio website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Work",
        scene: "creative-work",
        title: "Choose the work that wins the work you want",
        body: "A portfolio is an argument, not an archive. We pick and order the projects with you around the clients you want more of, and cut the rest from the front.",
        deliverables: [
          "Portfolio selection and order",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Video",
        scene: "creative-video",
        title: "Make the reel play fast",
        body: "Video is hosted and sized for the web, every film has a still that shows first, and playback is checked on phones, where most first looks happen.",
        deliverables: [
          "Video hosting and sizing",
          "Poster frames",
          "Mobile playback checks",
        ],
      },
      {
        navLabel: "Portfolio",
        scene: "creative-portfolio",
        title: "Build a portfolio clients can filter",
        body: "Projects live in a CMS with the sector, the format and the client, so the grid filters itself and the big ones open into a case study.",
        deliverables: [
          "Portfolio CMS",
          "Filters by sector and format",
          "Case study template",
        ],
      },
      {
        navLabel: "Enquiries",
        scene: "creative-enquiries",
        title: "Turn a compliment into a brief",
        body: "The quote request asks what you need to price the job, and the service and location pages give search engines and AI assistants something to cite.",
        deliverables: [
          "Quote request form",
          "CRM capture",
          "On-page SEO and schema",
        ],
      },
      {
        navLabel: "Launch",
        scene: "creative-launch",
        title: "Launch without a gap in the portfolio",
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
      "A production company, a creative studio, a videographer and other clients we've built for, in their own words.",
    items: [
      { id: "josh-smith" },
      { id: "nick-timaskovs" },
      { id: "blake-bowles" },
      { id: "bates-green" },
      { id: "alex-may" },
    ],
  },

  work: {
    heading: "Creative portfolios we've built",
  },

  pricing: {
    heading: "What a portfolio website costs",
    note: "Fixed prices, agreed before we start. Choose by how many projects, services and case studies need their own pages.",
    notes: {
      landing: "For one service, one campaign or a single showreel page, live in about a week.",
    },
  },

  faq: {
    heading: ["Portfolio website", "questions"],
    subhead: "Straight answers on reels, portfolios, enquiries, cost and timing.",
    items: [
      {
        q: "How much does a video production website cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}, with a CMS for the portfolio. A single showreel or service page is ${lower(landing.price)}, ${lower(landing.timeline)}.`,
      },
      {
        q: "What should a video production company's website include?",
        a: `A reel up front, work clients can filter by what you film, case studies for the big projects and a quote request that asks for the brief. ${cnf.client}'s site is built around its portfolio and a request-a-quote route, and ${lorak.client}'s pairs a reel-led portfolio with case studies.`,
      },
      {
        q: "How do you stop a showreel from slowing the website down?",
        a: "By hosting the video properly, sizing it for the screen it plays on and showing a still until someone presses play. The page loads like an image, and the film starts when it's wanted.",
      },
      {
        q: "Can a portfolio website bring in leads from Google and ChatGPT?",
        a: `It can when the pages are built for it. After we redesigned ${cnf.client}'s site, we moved on to an SEO and AEO campaign, and its co-director Josh Smith says the team is impressed by the leads coming through Google and ChatGPT.`,
      },
      {
        q: "Can one site show work across fashion, lifestyle and automotive?",
        a: `Yes, with filters and a clear lead. ${creatify.client}'s site opens with a selected work section for a studio shooting fashion, lifestyle and automotive, and lets each client go straight to their own kind of work.`,
      },
      {
        q: "Can I add new projects to my portfolio myself?",
        a: "Yes. Each project is a CMS entry with its film, stills, client and sector, so adding one puts it in the grid, the filters and its own page without a developer.",
      },
    ],
  },

  related: {
    heading: "More on portfolio websites",
    items: [
      {
        kind: "Service",
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        desc: "The design and build service behind these sites, from structure to launch.",
        icon: "palette",
      },
      {
        kind: "Comparison",
        label: "Wix Studio vs Framer",
        href: "/compare/wix-studio-vs-framer",
        desc: "The design-led builder creatives weigh, compared on what matters after launch.",
        icon: "split",
      },
      {
        kind: "Article",
        label: "Is Wix Studio good enough for a premium brand website?",
        href: "/blog/wix-studio-premium-brand",
        desc: "The platform's real limits, for studios whose site is part of the pitch.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "Squarespace to Wix Studio",
        href: "/services/squarespace-to-wix-studio",
        desc: "What carries over from Squarespace, and what has to be rebuilt.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Great reel,", "too few briefs?"],
    paragraph:
      "A free 20-minute call. We'll look at your portfolio the way a client with a budget would, and tell you honestly what's stopping them from asking for a quote.",
  },

  schema: {
    serviceName: "Film and creative studio website design",
    description:
      "Portfolio website design and build on Wix Studio for film crews, video production companies and creative studios, with fast video, filterable work, case study pages and quote requests.",
  },
};
