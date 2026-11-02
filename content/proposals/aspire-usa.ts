import { founderCore } from "../founder";
import type { AuditProposalPage } from "./types";

/**
 * ASPIRE-USA (formerly Afghan Scouts Durham), aspire-usa.org, Durham, NC. A
 * review of the current Wix Studio site and a one-project proposal, for Donna.
 * Built from the owner's brief (~/Desktop/aspire-usa-proposal-brief.md) on the
 * Woodstone 024 audit template. US spelling throughout.
 *
 * Her stated priorities: slow development cycles and a complicated structure,
 * plus the rename. Owner decisions: stay on Wix Studio, build only (no care
 * plan), four weeks, $1,250 presented as a nonprofit rate.
 *
 * CHECKED AGAINST THE LIVE SITE, 2 Nov 2026. Where the brief and the site
 * disagreed, the copy follows the site:
 *   - Dropdowns add 9 distinct links, not 13 (Wix renders each submenu twice
 *     in the markup). The desktop menu says "Team"; "Staffs" is the phone
 *     menu's label, not a heading.
 *   - Financials does have a spending breakdown in percentages (30/35/20/15)
 *     and suggested gifts ($35 to $1,000). What it lacks is amounts, a working
 *     report (the Download Report button opens nothing) and a Form 990. It
 *     also carries leftover template text under "30% Educational Support".
 *   - FAQ has ten questions across four tabs, not two.
 *   - The homepage has two main headings, both "ASPIRE-USA", rather than an
 *     empty one.
 *   - The blog's 40 posts are mostly student stories, not all first-person.
 *   - Spellings on the site: ASPIRE-USA, ASPIRE USA, Aspire-USA, and "Aspire
 *     USA" in every page title.
 *   - Donorbox is headed "Supporting Afghan Scouts" and carries the old badge;
 *     "Afghan Scouts Durham" is in its tab title and tax line. It already
 *     defaults to monthly giving, and suggests $25 to $200.
 *   - Sosan's student card uses the same template photo as "James Williams".
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
    lead: "We reviewed aspire-usa.org the way a first-time donor, Google and AI assistants see it. This page covers what we found, what to fix first, and how we'd rebuild the site in four weeks with fewer pages, one clear message and a donation path that stays on your site.",
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
      "The good news: you already have what's hardest to build. Real students, real outcomes, and forty blog posts, most of them in your students' own words. The first Afghan woman to earn Eagle Scout. Students at Columbia and Swarthmore.",
      "The site makes that hard to act on. A visitor who's moved by a story has to work to find out where the money goes, and the Donate button takes them to a page with your old name. A redesign alone won't fix that. The structure, the donation path and the rename need to be solved together.",
    ],
    points: [
      "Donating sends people to a page with your old name, off your site.",
      "Ten menu items, and most of the dropdown links open the same few pages.",
      "Unfinished student profiles, and a financial report button that doesn't open a report.",
    ],
    fixesHeading: "What needs to change",
    fixes: [
      "One clear message and six pages instead of ten",
      "Donations on your own site, under the ASPIRE-USA name",
      "A finished rename, so Google and AI assistants connect ASPIRE-USA to your history",
      "A site your team can update without waiting on a designer",
    ],
  },

  stats: {
    id: "at-a-glance",
    heading: "At a glance",
    items: [
      { value: "10", label: "top-level menu items, plus 9 dropdown links that open the same pages" },
      {
        value: "2",
        label: "names on the way to a donation: ASPIRE-USA on the site, Afghan Scouts Durham on the form and email",
      },
      { value: "3", label: "placeholder student profiles live on Meet Our Students" },
      { value: "0", label: "annual reports or Form 990s you can open from the Financials page" },
      { value: "0 of 10", label: "pages with a description written for Google" },
      { value: "40", label: "posts already on your blog, most of them student stories, your strongest asset" },
    ],
  },

  findings: {
    id: "findings",
    heading: "What we found",
    intro:
      "We ordered the findings by their effect on donations and trust. Each one shows what we saw, why it matters and what we propose.",
    items: [
      {
        id: "finding-1",
        number: "Finding 1",
        title: "The donation path leaves your site, and your name",
        severity: "critical",
        tag: "Donations",
        seen: [
          "Every Donate button sends people to donorbox.org/durham-afghan-scouts. That page is headed \"Supporting Afghan Scouts\", carries the old Afghan Scouts badge and names Afghan Scouts Durham in its tax line. There's no student story. One of the homepage Donate buttons links back to the homepage instead.",
          "The first screen offers \"Meet our students\" and \"Join our newsletter\". Both link to the homepage, and neither is a way to give.",
        ],
        why: [
          "A donor who's ready to give lands on a page with a different name. That moment of \"am I in the right place?\" is where gifts get lost, and during a rename it happens on every click.",
        ],
        proposal: [
          [
            "A Donate page on aspire-usa.org with your Donorbox form embedded and renamed to ASPIRE-USA. Same Donorbox account, so existing monthly donors aren't affected.",
            "One set of suggested amounts, each tied to a real need, for example \"[$50] covers [a month of transit to classes]\". Today the form suggests $25 to $200 and the Financials page $35 to $1,000. You give us the figures.",
            "Monthly giving kept as the default and shown first, with one-time as the second option.",
            "Your EIN, donor-advised funds and IRA charitable distributions moved from Contact to the Donate page, where donors look for them.",
            "One Donate button in the header and one in the first screen. Every other button on the page leads somewhere real.",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/donorbox.webp`,
            alt: "The Donorbox page the Donate buttons lead to, headed Supporting Afghan Scouts, with the old Afghan Scouts badge and Afghan Scouts Durham in the tax line.",
            caption:
              "Where the Donate buttons lead: the old Afghan Scouts badge, no ASPIRE-USA name, and Afghan Scouts Durham in the tax line.",
            width: 1400,
            height: 1452,
          },
          {
            src: `${ASSETS}/home-hero.webp`,
            alt: "The aspire-usa.org homepage first screen with the Meet our students and Join our newsletter buttons marked.",
            caption:
              "The first screen: \"Meet our students\" and \"Join our newsletter\" both link to the homepage. Background photo blurred.",
            width: 1400,
            height: 1161,
          },
        ],
      },
      {
        id: "finding-2",
        number: "Finding 2",
        title: "Ten pages, and most of the menu leads to the same few",
        severity: "critical",
        tag: "Site structure",
        seen: [
          "The header has ten items. Their dropdowns add nine more links, such as Values, Team, Legal, Safety Net and Annual Report, but each one opens the top of a page the visitor has already seen. Annual Report opens Financials, where the Download Report button doesn't open a report.",
          "The same blog posts repeat as feeds across Programs, Afghan Scouts, Financials and Meet Our Students. \"Welcoming Our New ASPIRE Scholar!\" appears twice on Programs.",
        ],
        why: [
          "Visitors click expecting a section and land somewhere they've already been. The site feels bigger than the story, and it's harder for your team to keep ten pages current than six.",
        ],
        proposal: [
          [
            "Six pages: Home, About, Students, Programs, Impact, Stories, plus Donate as the button in the header.",
            "Afghan Scouts becomes a section of Programs and About. FAQ answers move onto the pages where the questions come up. Get Involved and Contact fold into Donate and the footer.",
            "301 redirects for every old address, so links people have shared and existing Google rankings keep working.",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/nav-dropdown.webp`,
            alt: "The aspire-usa.org Programs dropdown open, showing Self-Sufficiency, Community Work, Success Stories, Legal and Safety Net.",
            caption: "The Programs menu: five links, all opening the top of the same page.",
            width: 1600,
            height: 488,
          },
        ],
      },
      {
        id: "finding-3",
        number: "Finding 3",
        title: "Unfinished content is live",
        severity: "high",
        tag: "Trust",
        seen: [
          "Meet Our Students shows template placeholders: \"James Williams\" and \"Jessica Davis\" (twice), each with \"Universety or course\" and \"Aspire to be...\". Several real students also stop at \"Aspire to be...\", and Sosan's card uses the same template photo as James Williams.",
          "Headings carry typos: \"We Apsire\", \"Passge to the U.S.\" and \"Professional Jounrey\", and the phone menu says \"Staffs\". On Financials, \"30% Educational Support\" still carries the template's text: \"This is the space to introduce the Services section.\"",
          "A few details don't match across pages: the Eagle Scout story names the student Fifi on one page and Fatima on another, and the founder is described as a high school student next to a Swarthmore '30 card.",
        ],
        why: [
          "Donors and grant reviewers read small details as a sign of how carefully an organization runs. Placeholders on the page about your students are the first thing to go.",
        ],
        proposal: [
          [
            "Student profiles from one list your team edits: display name, school, field, what they aspire to, photo and a link to their story. Nothing shows until it's complete.",
            "Every page proofread before launch.",
            "One agreed name per student, used everywhere.",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/student-placeholders.webp`,
            alt: "Student cards on Meet Our Students: Sosan, James Williams and Jessica Davis twice, each reading Universety or course and Aspire to be.",
            caption: "Meet Our Students: template placeholders live on the page. Photos cropped.",
            width: 1600,
            height: 331,
          },
        ],
      },
      {
        id: "finding-4",
        number: "Finding 4",
        title: "The Financials page stops short of a report",
        severity: "high",
        tag: "Donor confidence",
        seen: [
          "The page is headed \"Transparency Builds Trust\" and splits spending into four percentages, but there are no amounts, the Download Report button doesn't open a report, and there's no Form 990. Its three headline numbers are about Afghan scouting and European asylum applications in 2021.",
        ],
        why: [
          "\"Where does my money go?\" is the deciding question for many donors and nearly every grant maker. Charity reviewers such as Candid look for the same information.",
        ],
        proposal: [
          [
            "An Impact page: how each dollar is spent, how many students you support, and outcomes such as universities, internships and the Eagle Scout rank.",
            "Your annual report and Form 990 to download, with your EIN and board listed.",
            "Built from your figures. We design the page and you supply the numbers.",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/financials-numbers.webp`,
            alt: "Our Story in Numbers on the Financials page: 11,000 PARSA youth scouts, 42,000 Afghan asylum applications in Europe in 2021, 0.12% of Afghan scouts evacuated.",
            caption:
              "\"Our Story in Numbers\" on Financials: about Afghan scouting and European asylum applications in 2021.",
            width: 1600,
            height: 414,
          },
        ],
      },
      {
        id: "finding-5",
        number: "Finding 5",
        title: "The name change isn't finished yet",
        severity: "high",
        tag: "Rename and AI search",
        seen: [
          "The site uses ASPIRE-USA, ASPIRE USA and Aspire-USA, and every page title says \"Aspire USA\". The email address is still info@afghanscoutsdurham.org and the donation page still says Afghan Scouts Durham. The link to your old name is one paragraph near the bottom of the homepage.",
          "\"ASPIRE\" is a crowded name. A search for ASPIRE-USA and Afghan students returns other organizations' ASPIRE programs, not your site.",
        ],
        why: [
          "Google and AI assistants treat a renamed organization as a new, unknown one unless the old and new names are connected clearly. Until then, your years as Afghan Scouts Durham don't count toward ASPIRE-USA.",
        ],
        proposal: [
          [
            "One spelling, ASPIRE-USA, everywhere.",
            "\"Formerly Afghan Scouts Durham\" on About and in the footer.",
            "Structured data that names you as a nonprofit, with your EIN, address, both names and your official profiles.",
            "A short checklist for your team: email domain, Donorbox, Candid profile, Google Business Profile and social accounts.",
          ],
        ],
      },
      {
        id: "finding-6",
        number: "Finding 6",
        title: "The first screen on a phone",
        severity: "high",
        tag: "Mobile",
        seen: [
          "On a phone, the ASPIRE-USA heading sits under the menu bar, the logo overlaps the tagline, and the tagline is cut off by the button. There's no Donate button on the first screen. At tablet width the text runs over the buttons.",
        ],
        why: [
          "Most people who click a link from an email or a social post arrive on a phone. The first screen is where they decide whether to keep reading.",
        ],
        proposal: [
          "A new first screen in Wix Studio: one sentence on who you help, a Donate button and a Meet our students link, checked on phone, tablet and desktop.",
        ],
        evidence: [
          {
            src: `${ASSETS}/home-mobile.webp`,
            alt: "The aspire-usa.org homepage on a 375 px phone screen: the heading under the menu bar, the logo over the tagline and the button cutting it off.",
            caption:
              "The first screen on a phone: the heading under the menu bar, the logo over the tagline, and no Donate button. Background photo blurred.",
            width: 750,
            height: 803,
          },
        ],
      },
      {
        id: "finding-7",
        number: "Finding 7",
        title: "Search basics",
        severity: "medium",
        tag: "Search basics",
        seen: [
          [
            "None of the ten pages has a description for Google, so Google writes its own.",
            "The homepage has two main headings, both reading \"ASPIRE-USA\". FAQ and Contact have no main heading.",
            "Images are described by their file names, such as \"Screenshot 2026-09-26 225107.png\". Screen readers read those out loud.",
            "Page titles like \"Home | Aspire USA\" don't say what you do or where.",
          ],
        ],
        why: [
          "Google can't reliably tell which page answers searches like \"support Afghan students\" or \"Afghan refugee scholarship Durham NC\".",
        ],
        proposal: [
          [
            "A title, description and one main heading for every page.",
            "Real image descriptions.",
            "Structured data for the organization, articles and FAQs.",
            "Your sitemap and robots.txt are already set up correctly, so we keep them.",
          ],
        ],
      },
      {
        id: "finding-8",
        number: "Finding 8",
        title: "Your stories are your strongest asset, and they're buried",
        severity: "medium",
        tag: "Stories and AI search",
        seen: [
          "You have forty blog posts, most of them your students' own stories, from Ramish's role in student government to Fatima's Eagle Scout project in the National Scouting Library. They mostly appear as repeated feeds at the bottom of other pages.",
        ],
        why: [
          "Specific, dated stories with real outcomes are what journalists, grant makers and AI assistants quote. Right now they're hard to find and harder to cite.",
        ],
        proposal: [
          [
            "A Stories hub with clear categories, and three featured stories on the homepage.",
            "Each story with an author, a date and a link to how readers can help.",
            "Plain answers to the questions people ask: is ASPIRE-USA a 501(c)(3), how donations are used, what happened to Afghan scouts after 2021.",
          ],
        ],
      },
    ],
  },

  mockup: {
    id: "new-structure",
    heading: "The new site, in six pages",
    body: "Fewer pages, each with one job. Every page ends with a way to help, and donations stay on aspire-usa.org.",
    image: {
      src: `${ASSETS}/structure.webp`,
      alt: "Proposed structure for aspire-usa.org: six pages and a Donate button.",
      caption: "Proposed structure for aspire-usa.org: six pages and a Donate button.",
      width: 1440,
      height: 1086,
    },
    points: [
      {
        lead: "One message on the first screen.",
        text: "Who you help, why it matters now, and a Donate button.",
      },
      {
        lead: "Donations on your own site.",
        text: "Your Donorbox form, under your new name, next to your EIN and other ways to give.",
      },
      {
        lead: "Stories at the center.",
        text: "Your students' own words lead to Students, Impact and Donate.",
      },
    ],
  },

  offer: {
    id: "proposal",
    heading: "Proposal",
    intro:
      "Everything in this review, in one project: a new ASPIRE-USA site in Wix Studio, ready in four weeks.",
    name: "New ASPIRE-USA site in Wix Studio",
    duration: "4 weeks",
    wasPrice: "$1,500",
    price: "$1,250",
    items: [
      "New design in your Wix Studio account, with your new name and logo",
      "Six pages: Home, About, Students, Programs, Impact, Stories, plus Donate",
      "Donate page with your Donorbox form embedded and renamed, suggested amounts and other ways to give",
      "Student profiles from one list your team edits",
      "Impact page built from your figures, with your annual report and Form 990",
      "All 40 posts kept at their current addresses, with categories and three stories featured on the homepage",
      "Copy edited and proofread across the site",
      "301 redirects for every old page address",
      "Rename completed on the site: one spelling, \"formerly Afghan Scouts Durham\", nonprofit structured data",
      "Titles, descriptions, headings and image descriptions on every page",
      "Google Search Console and Google Analytics connected",
      "Training and a short guide, so your team can add students, stories and updates without a designer",
    ],
    notes: [
      "Nonprofit rate. Our standard price for this scope is $1,500.",
      "Payment: 50% to start, 50% at launch, by invoice.",
      "Your Wix plan, Donorbox fees and any paid apps aren't included.",
      "This offer is valid for 30 days from the date above.",
    ],
  },

  // The score is computed from these checks (content/audits/score.ts), never
  // typed. Each one was checked on the live site on 2 Nov 2026, and each area
  // matches a finding above. Credit is given where it's due: monthly giving,
  // the published EIN, the sitemap and a steady stream of new stories pass.
  score: {
    id: "site-score",
    heading: "Your site's score today",
    intro:
      "The checks behind this review, scored. Each area matches one of the findings above.",
    todayLabel: "Today",
    stages: { poor: "Critical", fair: "Needs attention", good: "Pass" },
    method: (checks) =>
      `How it's counted: ${checks} checks, each worth 1 if it passes, half if it partly passes and 0 if it doesn't, shown out of 100. Critical is under 40, Needs attention 40 to 74, Pass 75 and up.`,
    launchNote: "The proposal above addresses every check that doesn't pass yet.",
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
        ],
      },
      {
        name: "Donor confidence",
        checks: [
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
        name: "Search basics",
        checks: [
          { label: "Every page has a description for Google", status: "fail" },
          { label: "Every page has one main heading", status: "partial" },
          { label: "Images have real descriptions", status: "partial" },
          { label: "Sitemap and robots.txt are set up", status: "pass" },
        ],
      },
      {
        name: "Stories",
        checks: [
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
      {
        what: "Kickoff and access",
        detail: "(Wix collaborator access, Donorbox, Search Console, photos)",
        when: "week 1",
      },
      { what: "Structure and design for approval", when: "weeks 1-2" },
      { what: "Build, copy, students and stories", when: "weeks 2-4" },
      { what: "Testing, redirects and launch", when: "week 4" },
    ],
  },

  needs: {
    id: "what-we-need",
    heading: "What we need from you",
    items: [
      "Collaborator access to your Wix site and Donorbox",
      "Your new logo and any brand colors",
      "Student details and photos you're comfortable publishing",
      "Your budget figures, annual report and Form 990",
      "Quick feedback at each step, from one person who can approve",
    ],
  },

  faq: {
    id: "questions",
    heading: "Questions",
    items: [
      {
        q: "Do we have to leave Wix?",
        a: "No. We rebuild inside your Wix Studio account, so you keep your domain, your plan and your blog. Your team keeps editing in the same editor.",
      },
      {
        q: "What happens to our blog posts?",
        a: "All of them stay at their current addresses, so links people have shared and your Google rankings keep working. We add categories and feature the strongest ones.",
      },
      {
        q: "Will our monthly donors be affected?",
        a: "No. We embed the same Donorbox form on your site and rename it, so recurring gifts continue as they are.",
      },
      {
        q: "Do we need our current designer for the handover?",
        a: "Only to add us as a collaborator on the Wix site. If you're the site owner, you can do that yourself in a few clicks.",
      },
      {
        q: "Will we be able to update the site ourselves?",
        a: "Yes. After launch you get training and a short guide. Adding a student, a story or an update takes minutes and doesn't need a designer.",
      },
      {
        q: "How long until the new name shows up on Google?",
        a: "The site is ready for it on launch day. Google usually updates its results over the following weeks, and the redirects and structured data help it connect ASPIRE-USA to Afghan Scouts Durham.",
      },
    ],
  },

  close: {
    id: "next-step",
    heading: "Next step",
    body: "If you have questions, email us. If not, we'll confirm exactly what's included and send the agreement. Payment is 50% to start and 50% at launch, by invoice.",
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
