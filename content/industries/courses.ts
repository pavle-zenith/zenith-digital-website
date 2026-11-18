import { INDUSTRIES } from "@/content/case-studies";
import type { IndustryPageContent } from "./types";
import { PACKAGES, card, detail, figure, lower, metricPart } from "./proof";

/**
 * /industries/courses, written from the travel template (18 Nov 2026). Held
 * for owner review.
 *
 * One detail study: Hunting Brook Gardens (a landing page per launch, Wix
 * Courses, Typeform event sign-ups, €140k in course and event sales). That
 * figure belongs to the full system MOD Digital runs, so it is credited
 * "with MOD Digital" wherever it appears. MindEd and The House Painter's
 * Encyclopedia are scope cards: the page says what was built, never results.
 *
 * OWNER, please confirm before publishing:
 *   1. Testimonials: Flynn (MOD, video) is the only voice on record for this
 *      industry, so the section shows one card. A quote from Jimi Blake,
 *      MindEd or The House Painter's Encyclopedia would fill it.
 *   (Confirmed 18 Nov 2026: if a course already lives on another platform,
 *   we build the sales pages and link enrolment to it.)
 */

const hbg = detail("hunting-brook-gardens");
const hbgSales = figure("hunting-brook-gardens", "Course sales");
const hbgPages = figure("hunting-brook-gardens", "Landing pages built");
const minded = card("minded");
const mindedPages = metricPart("minded", /\d+\+ pages/);
const mindedLanguages = metricPart("minded", /\d+ languages/);
const hpe = card("house-painters-encyclopedia");

const { minimum, studio, landing } = PACKAGES;

export const courses: IndustryPageContent = {
  slug: "courses",
  industry: "courses",
  publish: true,
  updated: "2026-11-18",
  name: INDUSTRIES.courses,
  filterLinkLabel: "See the courses page",

  seo: {
    title: "Online course and education website design | Zenith Digital",
    description: `Course websites and launch pages that sell every cohort, with sign-ups and lessons connected. ${hbg.client}: ${hbgSales} in course sales, with MOD Digital.`,
  },

  hero: {
    h1: "Course websites that sell every launch",
    proof:
      "We design and build websites, launch pages and searchable libraries for course creators and education businesses, with sales, sign-ups and the course itself connected.",
    ctas: [
      { label: "Book a call", href: "/book-a-call" },
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "secondary",
      },
    ],
    shots: {
      center: "hunting-brook-gardens",
      left: {
        src: "/case-studies/house-painters-encyclopedia/card.webp",
        alt: "The House Painter's Encyclopedia in a browser window: the headline Practical painting knowledge, from the surface up, a search bar, and browsing by surface, problem or technique",
      },
      right: {
        src: "/portfolio-slider/mindeed.jpg",
        alt: "MindEd's Spanish-language website in a browser window: Ayuda a tus hijos a aprender con MindEd, with a child learning on a laptop and a quiz button",
      },
    },
  },

  inShort: `Zenith Digital designs and builds websites for course creators and education businesses: a landing page for every launch, course sales and delivery on Wix Courses, searchable libraries and sites in more than one language. A full site takes ${minimum.timeline.replace(" weeks", "")} to ${studio.timeline}. Prices start ${lower(landing.price)} for a launch page and ${lower(minimum.price)} for a full site.`,

  fit: {
    heading: "Who we work best with among course creators",
    good: [
      { icon: "graduation-cap", text: "Course creators selling cohorts and launches" },
      { icon: "search", text: "Educators with a library people need to search" },
      { icon: "users", text: "Learning products sold to parents or schools" },
    ],
    notAFit: [
      "You need an LMS with graded assessments",
      "You need a native learning app built",
      "You haven't decided what the course covers",
    ],
  },

  familiar: {
    heading: ["The course is ready.", "The page isn't selling it."],
    intro:
      "Most course sites lose students between the launch email and the checkout. If two or three of these ring true, the rest of this page is for you.",
    items: [
      {
        icon: "megaphone",
        title: "Every launch goes out to the same homepage.",
        body: "We build a page for each launch or cohort, written for exactly the offer the email or ad promised.",
      },
      {
        icon: "clipboard",
        title: "People email to ask what's in the course before they'll pay.",
        body: "We put the curriculum, the sessions, who it's for and the FAQ on the page, where the question comes up.",
      },
      {
        icon: "calendar",
        title: "Start dates and places left live in your inbox, not on the page.",
        body: "We show the start date, the places left and the deadline, so the decision has a reason to happen now.",
      },
      {
        icon: "plug",
        title: "Students sign up in one tool, pay in another and learn in a third.",
        body: "We put the sales page, checkout and lessons in one system, so enrolling a student doesn't need you.",
      },
      {
        icon: "search",
        title: "Your best material is buried where nobody can search it.",
        body: "We organise it by the way people look for it, by problem, topic or technique, with search on every page.",
      },
      {
        icon: "languages",
        title: "Learners in another country can't read the course.",
        body: "We build a version per language, so a parent in Spain reads every page in Spanish.",
      },
    ],
  },

  steps: {
    heading: "How we build a course website",
    intro: "Five steps, and what you have in hand at the end of each.",
    items: [
      {
        navLabel: "Offer",
        scene: "courses-offer",
        title: "Decide what each launch sells",
        body: "A cohort, a self-paced course, a live event or a library each need a different page and a different last step. We map them before design, so every launch has a home.",
        deliverables: [
          "Launch and page plan",
          "Site map",
          "Fixed price and launch date",
        ],
      },
      {
        navLabel: "Platform",
        scene: "courses-platform",
        title: "Put sales, checkout and lessons in one place",
        body: "Where it fits, the course runs on Wix Courses, so the sales page, checkout and lessons live in one system you manage. Events that need more than a name and an email get their own sign-up flow.",
        deliverables: [
          "Course platform setup",
          "Checkout and enrolment",
          "Sign-up forms",
        ],
      },
      {
        navLabel: "Launch pages",
        scene: "courses-launchpages",
        title: "Build a page for every launch",
        body: "Each page carries what a buyer checks before paying: what they'll learn, when it starts, how many places are left, who has taken it before. The next launch reuses the structure, not the words.",
        deliverables: [
          "Launch landing page",
          "Curriculum and FAQ sections",
          "Proof and testimonial layout",
        ],
      },
      {
        navLabel: "Library",
        scene: "courses-library",
        title: "Make the material findable",
        body: "For a library or a reference, the structure is the product. We organise it by how people search, build it on a CMS and give every entry a page search engines can find.",
        deliverables: [
          "Content structure and CMS",
          "Search and filters",
          "On-page SEO and schema",
        ],
      },
      {
        navLabel: "Launch",
        scene: "courses-launch",
        title: "Go live before enrolment opens",
        body: "We set the launch date against your calendar, so the page is live before the first email goes out. Your old site stays up until the switch.",
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
      "The partner behind Hunting Brook Gardens' course launches and other clients we've built for, in their own words.",
    // Owner, 18 Nov 2026: industry voices first, then general ones to fill.
    items: [
      {
        id: "flynn-blackie",
        context: "The partner behind Hunting Brook Gardens' launches",
      },
      { id: "alex-may" },
      { id: "nick-timaskovs" },
      { id: "evy-hansen" },
      { id: "christopher-barone" },
    ],
  },

  work: {
    heading: "Course and education websites we've built",
  },

  pricing: {
    heading: "What a course website costs",
    note: "Fixed prices, agreed before we start. Choose by how many courses, launches and library pages need their own place.",
    notes: {
      landing: "For one course launch, cohort or live event, live in about a week.",
    },
  },

  faq: {
    heading: ["Course website", "questions"],
    subhead: "Straight answers on launches, platforms, libraries, cost and timing.",
    items: [
      {
        q: "How much does a course website cost?",
        a: `A launch page is ${lower(landing.price)}, ${lower(landing.timeline)}. A full site starts ${lower(minimum.price)} for ${lower(minimum.scope)} in ${minimum.timeline}, and ${studio.name} is ${studio.price} for ${lower(studio.scope)} in ${studio.timeline}. Many course businesses start with one launch page and add the rest after.`,
      },
      {
        q: "Do I need a new landing page for every course launch?",
        a: `It's what works for ${hbg.client}. Every course launch and in-person event gets its own page, ${hbgPages} so far, written for the offer the campaign promotes. Together with MOD Digital's campaigns, those launches have sold ${hbgSales} of courses and events since the collaboration began.`,
      },
      {
        q: "Which platform should I sell my online course on?",
        a: `If you want one system for the sales page, checkout and lessons, Wix Courses keeps them together: it's what ${hbg.client}'s online courses run on, and enrolling a student doesn't need a developer. If your course already lives on another platform, we build the sales pages and link enrolment to it.`,
      },
      {
        q: "Can I run in-person events and online courses from the same site?",
        a: `Yes. ${hbg.client} sells online courses on Wix Courses and in-person events through custom Typeform sign-ups that collect what each event needs ahead of time, all from pages on the same site.`,
      },
      {
        q: "Can you build a searchable library or knowledge base?",
        a: `Yes. ${hpe.client} is a searchable field reference for professional house painters, organised by surface, problem and technique, with a glossary, so a painter on site finds the answer from whatever they know first.`,
      },
      {
        q: "Can you redesign a large education site in more than one language?",
        a: `Yes. ${minded.client}, a learning app for children, moved ${mindedPages} to a redesigned education platform in ${mindedLanguages}.`,
      },
    ],
  },

  related: {
    heading: "More on course websites",
    items: [
      {
        kind: "Service",
        label: "Landing pages",
        href: "/services/landing-pages",
        desc: "Campaign and launch pages, live in about a week, the way Hunting Brook's launches run.",
        icon: "split",
      },
      {
        kind: "Article",
        label: "Is Wix Studio good for SEO?",
        href: "/blog/is-wix-studio-good-for-seo",
        desc: "What the platform handles for a large library of pages, and what you still have to do.",
        icon: "pen",
      },
      {
        kind: "Article",
        label: "Why does your website get traffic but no enquiries?",
        href: "/blog/traffic-but-no-enquiries",
        desc: "Where visitors drop off between reading about the course and signing up.",
        icon: "pen",
      },
      {
        kind: "Migration guide",
        label: "WordPress to Wix Studio",
        href: "/services/wordpress-to-wix-studio",
        desc: "What happens to plugins, posts and custom content when the stack changes.",
        icon: "transfer",
      },
    ],
  },

  finalCta: {
    heading: ["Selling a course", "from a page that doesn't?"],
    paragraph:
      "A free 20-minute call. We'll look at your next launch the way a student would, and tell you honestly what would get more of them to enrol.",
  },

  schema: {
    serviceName: "Online course and education website design",
    description:
      "Website, launch page and searchable library design and build for course creators and education businesses, with course sales, sign-ups and delivery connected, including Wix Courses and multi-language sites.",
  },
};
