import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, lower, metricPart } from "./proof";

/**
 * /industries/professional-services, written from the travel template
 * (18 Nov 2026). Held for owner review. Industry key "services".
 *
 * No project here has a detail case study, so every project is a scope card
 * and the page claims scope, never results: LMF HR (HR and staffing site,
 * plus 12+ client sites), Bianomics (consultancy positioning site), TKS
 * Sicherheitsdienste (German-language security company site) and Auto
 * Odšteta (Serbian-language accident claims lead site). Details beyond the
 * card lines are read off the sites' own screenshots. Client-side figures
 * shown on those sites (claims paid, staff counts) are theirs and never
 * repeated here.
 *
 * Testimonials (owner, 18 Nov 2026): industry clients first, then general
 * ones to fill the section.
 */

const lmf = card("lmf-hr");
const lmfSites = metricPart("lmf-hr", /\d+\+ client sites/);
const bianomics = card("bianomics");
const tks = card("tks-sicherheit");
const auto = card("auto-odsteta");

const { minimum, studio, landing } = PACKAGES;

export const professionalServices: IndustryPageContent = {
  slug: "professional-services",
  industry: "services",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.services,
  filterLinkLabel: "See the professional services page",

  seo: {
    title: "Professional services website design | Zenith Digital",
    description:
      "Websites for consultancies and service firms that sell expertise: a clear offer, credentials up front and one easy way to book, in English, German or Serbian.",
  },

  hero: {
    h1: "Websites for firms that sell expertise",
    proof:
      "We design and build websites for consultancies and professional service firms that explain the offer plainly, show who's behind it and make the first conversation easy to book, in English, German or Serbian.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    // No detail studies in this industry yet: the shots are the projects'
    // own grid cards.
    shots: {
      center: {
        src: "/case-studies/lmf-hr/card.webp",
        alt: "LMF HR's website in a browser window: professional HR and staffing solutions for small businesses, with a button to schedule a consultation",
      },
      left: {
        src: "/case-studies/bianomics/card.webp",
        alt: "Bianomics' website in a browser window: the headline You built something real. We make the world feel it, fund it, and remember it.",
      },
      right: {
        src: "/case-studies/tks-sicherheit/card.webp",
        alt: "TKS Sicherheitsdienste's German-language website in a browser window: professional security services for businesses, with 24/7 service and an emergency line",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites on Wix Studio for consultancies and professional service firms: the offer in your clients' words, the people and credentials behind it, and one clear way to book a consultation or call, in English, German or Serbian. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a landing page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among service firms",
    good: [
      { icon: "briefcase", text: "Consultancies selling expertise, not products" },
      { icon: "support", text: "Firms clients call when something's gone wrong" },
      { icon: "languages", text: "Businesses serving clients in their own language" },
    ],
    notAFit: [
      "You need client logins and case management",
      "You can't say yet what you offer or charge",
      "You'd rather not show who's behind the firm",
    ],
  },

  familiar: {
    heading: ["Clients trust you in person.", "Your website doesn't earn it."],
    intro:
      "Most service firm sites lose people before the first conversation. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "answer",
        title: "Prospects can't tell what you actually do from the homepage.",
        body: "We name each service in your clients' words and give it a page, so the right one is a click away.",
      },
      {
        icon: "receipt",
        title: "People want a price range before they'll call.",
        body: "We lay out packages or starting prices, so the enquiries you get are ones that can afford you.",
      },
      {
        icon: "calendar",
        title: "Nobody books the consultation.",
        body: "We make one clear first step, a consultation, a snapshot or a call, and repeat it where the decision happens.",
      },
      {
        icon: "users",
        title: "Your credentials and your team sit in a PDF.",
        body: "We put the people, the years in business and the accreditations on the page, next to the offer they back.",
      },
      {
        icon: "support",
        title: "Urgent clients need you now, and the number is in the footer.",
        body: "We put the phone line and the hours on the first screen, so someone in a hurry reaches you in one tap.",
      },
      {
        icon: "languages",
        title: "Your clients search in German or Serbian, your site answers in English.",
        body: "We build the site in the language your clients use, so the first page they land on reads naturally.",
      },
    ],
  },

  steps: {
    heading: "How we build a professional services website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Offer",
        scene: "pro-offer",
        title: "Say what you do in your client's words",
        body: "We turn the services you sell into the problems your clients bring you, and decide which ones lead. A broad offer gets one front door and clear routes behind it.",
        deliverables: [
          "Service and offer map",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Trust",
        scene: "pro-trust",
        title: "Show who's behind the firm",
        body: "Clients buy from people. The team, the experience, the accreditations and the clients you've helped sit next to the services they support.",
        deliverables: [
          "Team and credentials pages",
          "Results and client layout",
          "Testimonial layout",
        ],
      },
      {
        navLabel: "First step",
        scene: "pro-firststep",
        title: "Make the first conversation easy to start",
        body: "One clear way in: book a consultation, request a call or ring the line. Each route asks what you need to prepare, and lands with the right person.",
        deliverables: [
          "Consultation booking",
          "Enquiry forms and routing",
          "Click-to-call",
        ],
      },
      {
        navLabel: "Language",
        scene: "pro-language",
        title: "Build it in the language your clients use",
        body: "A German security company's site is written for German clients, not translated at the end. Where you serve more than one market, each gets its own version.",
        deliverables: [
          "Language versions",
          "On-page SEO per language",
          "Analytics events",
        ],
      },
      {
        navLabel: "Launch",
        scene: "pro-launch",
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
      "An HR consultancy, a business consultancy and other firms we've built for, in their own words.",
    items: [
      { id: "les-marie" },
      { id: "bianca-cervantes" },
      { id: "john-smyth" },
      { id: "alex-may" },
      { id: "evy-hansen" },
    ],
  },

  work: {
    heading: "Professional services websites we've built",
  },

  pricing: {
    heading: "What a professional services website costs",
    note: "Fixed prices, agreed before we start. Choose by how many services, languages and routes need their own pages.",
    notes: {
      landing: "For one service, one campaign or one market, live in about a week.",
    },
  },

  faq: {
    heading: ["Professional services", "website questions"],
    subhead: "Straight answers on offers, pricing, languages, cost and timing.",
    items: [
      {
        q: "How much does a website for a consultancy or service firm cost?",
        a: `A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. A single service or campaign page is ${lower(landing.price)}, ${lower(landing.timeline)}.`,
      },
      {
        q: "Should a consultancy show its prices on its website?",
        a: `Usually, at least as packages or a starting point. A range filters out enquiries that were never going to fit and tells the right clients they're in the right place. ${lmf.client}'s site has its packages in the main menu, and we publish our own prices for the same reason.`,
      },
      {
        q: "How do we explain a broad offer without a cluttered website?",
        a: `With one front door and clear routes behind it. ${bianomics.client} offers brand, PR, events, operations and workforce programmes; its site leads with what the client gets, then splits into services, with one starting step for all of them.`,
      },
      {
        q: "Can you build our website in German or Serbian?",
        a: `Yes. ${tks.client}'s site is in German, for a family-run security company in Hesse, and ${auto.client}'s is in Serbian, for drivers making road accident claims in Belgrade and Lazarevac. We're based in Belgrade, and every language version gets its own pages and search setup.`,
      },
      {
        q: "Can the website handle urgent enquiries?",
        a: `Yes, by putting the line where someone in a hurry looks first. ${tks.client}'s first screen carries its 24/7 service and emergency line, and ${auto.client}'s puts its phone number in the header and the hero.`,
      },
      {
        q: "We build websites for our own clients too. Can you help?",
        a: `Yes. Alongside its own site, we've delivered ${lmfSites} for ${lmf.client}'s consulting clients, mostly home care businesses. For firms that resell websites, our white-label partnership covers the build under your name.`,
      },
    ],
  },

  related: {
    heading: "More on professional services websites",
    items: [
      {
        kind: "Service",
        label: "Wix Studio website design",
        href: "/services/wix-studio-website-design",
        desc: "The design and build service behind these sites, from structure to launch.",
        icon: "palette",
      },
      {
        kind: "Partnerships",
        label: "White-label partnerships",
        href: "/partnerships",
        desc: "For consultancies and agencies that sell websites to their own clients.",
        icon: "handshake",
      },
      {
        kind: "Article",
        label: "Why does your website get traffic but no enquiries?",
        href: "/blog/traffic-but-no-enquiries",
        desc: "Where visitors drop off between reading about you and booking a call.",
        icon: "pen",
      },
      {
        kind: "Article",
        label: "How do you know if your business needs a new website?",
        href: "/blog/do-i-need-a-new-website",
        desc: "The signs that a refresh won't do, and what a rebuild should fix.",
        icon: "pen",
      },
    ],
  },

  finalCta: {
    heading: ["Trusted in person,", "overlooked online?"],
    paragraph:
      "A free 20-minute call. We'll look at your site the way a new client would, and tell you honestly what's stopping them from booking the first conversation.",
  },

  schema: {
    serviceName: "Professional services website design",
    description:
      "Website design and build on Wix Studio for consultancies and professional service firms, with service pages, credentials, consultation booking and urgent call routing, in English, German or Serbian.",
  },
};
