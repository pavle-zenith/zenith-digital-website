import { founderCore } from "../founder";
import type { AuditProposalPage } from "./types";

/**
 * ASPIRE-USA (formerly Afghan Scouts Durham), aspire-usa.org, Durham, NC. A
 * review of the current Wix Studio site and a one-project proposal, for Donna.
 * Built from the owner's brief (~/Desktop/aspire-usa-proposal-brief.md) on the
 * Woodstone 024 audit template, then condensed to about half the words
 * (~/Desktop/aspire-usa-proposal-condense.md): one idea per sentence, each
 * finding readable in ten seconds. US spelling throughout.
 *
 * Her stated priorities: slow development cycles and a complicated structure,
 * plus the rename. Owner decisions: stay on Wix Studio, build only (no care
 * plan), four weeks, $1,250 presented as a nonprofit rate.
 *
 * CHECKED AGAINST THE LIVE SITE, 2 Nov 2026. Where the brief and the site
 * disagreed, the copy follows the site:
 *   - Dropdowns add 9 distinct links, not 13 (Wix renders each submenu twice
 *     in the markup).
 *   - Financials does have a spending breakdown in percentages (30/35/20/15).
 *     What it lacks is amounts, a working report (the Download Report button
 *     opens nothing) and a Form 990.
 *   - Spellings on the site: ASPIRE-USA, ASPIRE USA, Aspire-USA, and "Aspire
 *     USA" in every page title, so four, not three.
 *   - "We Apsire" is on the homepage; the typo on Meet Our Students is
 *     "Professional Jounrey".
 *   - Donorbox is headed "Supporting Afghan Scouts" and carries the old badge;
 *     "Afghan Scouts Durham" is in its tab title and tax line.
 *
 * Screenshots in /proposals/aspire-usa/ were captured the same day. Student
 * faces are blurred or cropped out: the point of each one is the problem, not
 * the person.
 */

const EMAIL = { label: "Email us", href: "mailto:hello@thezenithdigital.com" };
const ASSETS = "/proposals/aspire-usa";

export const aspireUsa: AuditProposalPage = {
  kind: "audit",
  slug: "aspire-usa-g8aj6",
  client: "ASPIRE-USA",
  lang: "en",
  meta: {
    title: "ASPIRE-USA - Website review and proposal | Zenith Digital",
    description:
      "We reviewed aspire-usa.org from a donor's point of view, and from Google's and AI assistants'.",
    ogTitle: "ASPIRE-USA: a clearer site that turns visitors into supporters",
    ogLocale: "en_US",
  },

  labels: {
    jump: "Contents",
    severity: { critical: "Critical", high: "High", medium: "Medium" },
    seen: "What we saw",
    why: "Why it matters",
    proposal: "What we propose",
    duration: "Duration",
    price: "Price",
    mobileBar: "See the proposal",
    missingImage: "[PROPOSED SITE STRUCTURE]",
  },

  hero: {
    eyebrow: "Website review and proposal",
    heading: "ASPIRE-USA: a clearer site that turns visitors into supporters",
    lead: "What a first-time donor, Google and AI assistants see on aspire-usa.org today, and how we'd fix it in four weeks.",
    meta: [
      { label: "Prepared for", value: "Donna, ASPIRE-USA (formerly Afghan Scouts Durham)" },
      { label: "Date", value: "2 November 2026" },
      { label: "Prepared by", value: "Pavle Maodus, Zenith Digital" },
    ],
    primaryCta: { label: "See the proposal", href: "#proposal" },
    secondaryCta: EMAIL,
  },

  summary: {
    id: "summary",
    heading: "In short",
    body: [
      "You already have what's hardest to build: real students, real outcomes and forty stories. The site just makes them hard to act on.",
    ],
    points: [
      "Donating leads to your old name, off your site.",
      "Most menu links open the same few pages.",
      "Placeholder profiles and no financial report.",
    ],
    fixesHeading: "What changes",
    fixes: [
      "Six clear pages and one message",
      "Donations on your own site",
      "A site your team updates without a designer",
    ],
  },

  stats: {
    id: "at-a-glance",
    heading: "At a glance",
    items: [
      { value: "2", label: "names on the way to a donation" },
      { value: "9", label: "menu links that open a page you've already seen" },
      { value: "3", label: "placeholder student profiles" },
      { value: "0 of 10", label: "pages with a Google description" },
    ],
  },

  findings: {
    id: "findings",
    heading: "What we found",
    intro: "Ordered by effect on donations.",
    items: [
      {
        id: "finding-1",
        number: "Finding 1",
        title: "Donating takes people off your site, to your old name",
        severity: "critical",
        tag: "Donations",
        seen: [
          "Every Donate button opens a Donorbox page with the old Afghan Scouts badge and name. Both hero buttons, and one Donate button, link back to the homepage.",
        ],
        why: ["A donor who isn't sure they're in the right place doesn't give."],
        proposal: [
          [
            "Your Donorbox form on your own Donate page, renamed",
            "Suggested amounts tied to real needs, monthly first",
            "EIN, donor-advised fund and IRA giving on the same page",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/donorbox.webp`,
            alt: "The Donorbox page the Donate buttons lead to, headed Supporting Afghan Scouts, with the old Afghan Scouts badge and Afghan Scouts Durham in the tax line.",
            caption: "Where Donate leads today: the old name and badge.",
            width: 1400,
            height: 1452,
          },
          {
            src: `${ASSETS}/home-hero.webp`,
            alt: "The aspire-usa.org homepage first screen with the Meet our students and Join our newsletter buttons marked.",
            caption: "Both hero buttons link back to the homepage.",
            width: 1400,
            height: 1161,
          },
        ],
      },
      {
        id: "finding-2",
        number: "Finding 2",
        title: "Ten pages, and most menu links open the same page",
        severity: "critical",
        tag: "Site structure",
        seen: [
          "Nine dropdown links, from Values to Annual Report, open the top of a page you've already seen. The same blog posts repeat across four pages.",
        ],
        why: ["Visitors stop exploring, and ten pages are harder to keep current than six."],
        proposal: [
          ["Six pages, each with one job", "Redirects from every old address, so nothing breaks"],
        ],
        evidence: [
          {
            src: `${ASSETS}/nav-dropdown.webp`,
            alt: "The aspire-usa.org Programs dropdown open, showing Self-Sufficiency, Community Work, Success Stories, Legal and Safety Net.",
            caption: "Five Programs links, one page.",
            width: 1600,
            height: 488,
          },
        ],
      },
      {
        id: "finding-3",
        number: "Finding 3",
        title: "Placeholders where donors check the details",
        severity: "high",
        tag: "Trust",
        seen: [
          "Meet Our Students shows template profiles like \"James Williams\" and typos like \"Professional Jounrey\". Financials has percentages but no amounts, and Download Report doesn't open a report.",
        ],
        why: [
          "Donors and grant makers judge how you run by the small details and by where the money goes.",
        ],
        proposal: [
          [
            "Student profiles from one list your team edits",
            "An Impact page with your figures, annual report and Form 990",
            "Every page proofread",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/student-placeholders.webp`,
            alt: "Student cards on Meet Our Students: Sosan, James Williams and Jessica Davis twice, each reading Universety or course and Aspire to be.",
            caption: "Template profiles live on Meet Our Students.",
            width: 1600,
            height: 331,
          },
          {
            src: `${ASSETS}/financials-numbers.webp`,
            alt: "Our Story in Numbers on the Financials page: 11,000 PARSA youth scouts, 42,000 Afghan asylum applications in Europe in 2021, 0.12% of Afghan scouts evacuated.",
            caption: "Financials: percentages, no amounts.",
            width: 1600,
            height: 414,
          },
        ],
      },
      {
        id: "finding-4",
        number: "Finding 4",
        title: "The name change isn't finished",
        severity: "high",
        tag: "Rename",
        seen: [
          "The site uses four spellings of ASPIRE-USA, the email is still on the old domain, and Donorbox shows the old name. Searches for ASPIRE-USA return other ASPIRE programs.",
        ],
        why: [
          "Google and AI assistants won't link ASPIRE-USA to your history until the two names are connected.",
        ],
        proposal: [
          [
            "One spelling everywhere, plus \"formerly Afghan Scouts Durham\"",
            "Nonprofit structured data with both names and your EIN",
          ],
        ],
      },
      {
        id: "finding-5",
        number: "Finding 5",
        title: "The first screen on a phone",
        severity: "high",
        tag: "Mobile",
        seen: [
          "The heading hides under the menu, the logo overlaps the tagline, and there's no Donate button.",
        ],
        why: ["Most visitors from email and social media arrive on a phone."],
        proposal: ["One message and a Donate button, tested on every screen size."],
        evidence: [
          {
            src: `${ASSETS}/home-mobile.webp`,
            alt: "The aspire-usa.org homepage on a 375 px phone screen: the heading under the menu bar, the logo over the tagline and the button cutting it off.",
            caption: "The first screen on a phone today.",
            width: 750,
            height: 803,
          },
        ],
      },
      {
        id: "finding-6",
        number: "Finding 6",
        title: "Your 40 stories are hard to find",
        severity: "medium",
        tag: "Search and stories",
        seen: [
          "No page has a Google description, images are described by their file names, and the stories mostly appear as repeated feeds.",
        ],
        why: ["Specific student stories are what Google, AI assistants and journalists quote."],
        proposal: [
          [
            "A Stories hub, with three featured on the homepage",
            "Titles, descriptions and image text on every page",
          ],
        ],
      },
    ],
  },

  mockup: {
    id: "new-structure",
    heading: "The new site, in six pages",
    body: "Six pages, each with one job, and donations on your own site.",
    image: {
      src: `${ASSETS}/structure.webp`,
      alt: "Proposed structure for aspire-usa.org: six pages and a Donate button.",
      caption: "Proposed structure for aspire-usa.org: six pages and a Donate button.",
      width: 1440,
      height: 1086,
    },
    points: [
      { lead: "One message first.", text: "Who you help, and a Donate button." },
      { lead: "Give on your own site.", text: "Your Donorbox form, under your new name." },
      { lead: "Stories at the center.", text: "They lead to Students, Impact and Donate." },
    ],
  },

  offer: {
    id: "proposal",
    heading: "Proposal",
    intro: "Everything above, in one project.",
    name: "New ASPIRE-USA site in Wix Studio",
    duration: "4 weeks",
    wasPrice: "$1,500",
    price: "$1,250",
    items: [
      "New design in your Wix Studio account, with your new name",
      "Six pages plus an on-site Donate page",
      "Student profiles and an Impact page your team can edit",
      "All 40 posts kept, with redirects for every old address",
      "Copy proofread and the rename completed",
      "SEO and AI search setup, with Search Console and Analytics",
      "Training and a short guide for your team",
    ],
    notes: [
      "Nonprofit rate. Standard price for this scope: $1,500.",
      "50% to start, 50% at launch, by invoice. Wix plan and Donorbox fees not included.",
      "Valid until December 31, 2026.",
    ],
  },

  // The score is computed from these checks (content/audits/score.ts), never
  // typed. Each one was checked on the live site on 2 Nov 2026, and each area
  // matches a finding above. Credit is given where it's due: monthly giving,
  // the published EIN, the sitemap and a steady stream of new stories pass.
  score: {
    id: "site-score",
    heading: "Your site's score today",
    todayLabel: "Today",
    stages: { poor: "Critical", fair: "Needs attention", good: "Pass" },
    method: (checks) => `${checks} checks behind this review, scored out of 100.`,
    areas: [
      {
        name: "Donations",
        checks: [
          { label: "Donate buttons open a form on your own site", status: "fail" },
          { label: "The donation form carries the ASPIRE-USA name", status: "fail" },
          { label: "First-screen buttons lead somewhere real", status: "fail" },
          { label: "Monthly giving is offered", status: "pass" },
        ],
      },
      {
        name: "Site structure",
        checks: [
          { label: "Every menu link opens a new section", status: "fail" },
          { label: "Each post appears once on a page", status: "fail" },
        ],
      },
      {
        name: "Trust",
        checks: [
          { label: "No template placeholders are live", status: "fail" },
          { label: "Headings are free of typos", status: "fail" },
          { label: "Each student goes by one name across pages", status: "partial" },
          { label: "Spending is broken down", status: "partial" },
          { label: "An annual report and Form 990 can be downloaded", status: "fail" },
          { label: "Your EIN and other ways to give are published", status: "pass" },
        ],
      },
      {
        name: "Rename",
        checks: [
          { label: "One spelling of the name everywhere", status: "fail" },
          { label: "The email and the donation form use the new name", status: "fail" },
          { label: "The old name is connected to the new one", status: "partial" },
        ],
      },
      {
        name: "Mobile",
        checks: [
          { label: "The first screen reads cleanly on a phone", status: "fail" },
          { label: "A Donate button is on the first screen", status: "fail" },
        ],
      },
      {
        name: "Search and stories",
        checks: [
          { label: "Every page has a description for Google", status: "fail" },
          { label: "Every page has one main heading", status: "partial" },
          { label: "Images have real descriptions", status: "partial" },
          { label: "Sitemap and robots.txt are set up", status: "pass" },
          { label: "New stories are published regularly", status: "pass" },
          { label: "Stories are easy to find", status: "partial" },
        ],
      },
    ],
  },

  timeline: {
    id: "how-it-works",
    heading: "How the project runs",
    rows: [
      { what: "Kickoff and access", when: "week 1" },
      { what: "Structure and design for approval", when: "weeks 1-2" },
      { what: "Build, copy, students and stories", when: "weeks 2-4" },
      { what: "Testing and launch", when: "week 4" },
    ],
  },

  needs: {
    id: "what-we-need",
    heading: "What we need from you",
    items: [
      "Wix and Donorbox collaborator access",
      "Your logo and brand colors",
      "Student details and photos you're happy to publish",
      "Your budget figures and annual report",
    ],
  },

  faq: {
    id: "questions",
    heading: "Questions",
    items: [
      {
        q: "Do we have to leave Wix?",
        a: "No. We rebuild in your Wix Studio account, and you keep your domain, plan and blog.",
      },
      {
        q: "Will monthly donors be affected?",
        a: "No. It's the same Donorbox form, just on your own site.",
      },
      {
        q: "Can we update the site ourselves?",
        a: "Yes. You get training and a short guide, so updates take minutes.",
      },
      {
        q: "Do we need our current designer?",
        a: "Only to add us as a collaborator, which you can also do yourself.",
      },
    ],
  },

  close: {
    id: "next-step",
    heading: "Next step",
    body: "Reply with any questions. If there are none, we'll send the agreement.",
    primaryCta: EMAIL,
    // Two figures for the concerns Donna named (a slow designer, a
    // complicated structure), both from the offer above, then two about us,
    // as the site already states them (content/founder.ts).
    stats: [
      { value: "4 weeks", label: "from kickoff to launch, fixed scope and price" },
      { value: "6 pages", label: "instead of ten, each with one job" },
      { value: "100+", label: "websites built and launched by Zenith Digital" },
      { value: "Legend", label: "certified Wix Partner, the program's top tier" },
    ],
    photo: { src: founderCore.image, alt: "Pavle Maodus, founder of Zenith Digital" },
    signature: ["Pavle Maodus", "Founder, Zenith Digital"],
  },
};
