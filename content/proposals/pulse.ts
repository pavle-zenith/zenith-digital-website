import type { ProposalPage } from "./types";

/**
 * Pulse Electrical (Dundee) Ltd and Pulse Catering Equipment Ltd, Dundee.
 * Contact: Mike. Two new websites plus handover from their old developer
 * (IHTTP), Google Business Profile fix-up and a monthly care plan.
 * Findings checked 1 Oct 2026 against both live sites, ihttpdev.co.uk and
 * Google UK. Prices owner-set 1 Oct 2026.
 */
export const pulse: ProposalPage = {
  slug: "pulse",
  client: "Pulse Electrical & Pulse Catering",
  contact: "Mike",
  date: "1 October 2026",
  meta: {
    title: "Proposal | Pulse Electrical & Pulse Catering | Zenith Digital",
    description:
      "Two new websites for Pulse Electrical and Pulse Catering, what's wrong with the current ones, and how we take them back from your old developer.",
  },

  hero: {
    eyebrow: "Private proposal · Prepared for Mike · 1 October 2026",
    heading: "Two new websites for Pulse",
    lead: [
      "Twenty years of good work in Dundee deserves websites that show it. Today, Google sends people looking for Pulse Electrical to your old developer's test server, and both sites break on a phone.",
      "Here's what we found, what we'll build, and how we hand everything back to you.",
    ],
    primaryCta: { label: "See the plan", href: "#plan" },
    secondaryCta: { label: "Book a call", href: "/book-a-call" },
  },

  summary: {
    heading: "The short version",
    cards: [
      {
        title: "Google is sending customers to the wrong website",
        body: "When we searched \"Pulse Electrical Dundee\", the website Google showed was your developer's copy at ihttpdev.co.uk, not pulseelectrical.co.uk.",
      },
      {
        title: "Both sites break on a phone",
        body: "The Pulse Electrical homepage is about 48 times wider than a phone screen, and most of it shows as blank space.",
      },
      {
        title: "You don't fully control them",
        body: "The sites, the hosting and possibly the domains sit with your old developer. Taking them back is part of the project.",
      },
    ],
  },

  findings: {
    heading: "What we found",
    intro: "We went through both websites and both Google listings on 1 October 2026. Here's what matters, in plain terms.",
    items: [
      {
        id: "wrong-website",
        title: "Google sends people to your developer's site, not yours",
        severity: "critical",
        site: "Pulse Electrical",
        points: [
          "Every page tells Google the \"real\" version lives at ihttpdev.co.uk/Pulse, your developer's test server. Google has listened: that's the address it shows when people search for you.",
          "The menu does the same to visitors. Click \"About us\" and you land on ihttpdev.co.uk, a different website.",
          "The list of pages your site gives Google points at the test server too.",
          "The \"About Us\" button on the homepage leads to an error page.",
        ],
        evidence: [
          {
            src: "/proposals/pulse/google-staging-result.webp",
            alt: "Google results for Pulse Electrical Dundee showing ihttpdev.co.uk as the website result",
            caption: "Searching \"Pulse Electrical Dundee\": the website result is ihttpdev.co.uk, not your domain.",
            width: 800,
            height: 1014,
          },
        ],
      },
      {
        id: "mobile",
        title: "Both sites break on a phone",
        severity: "critical",
        site: "Both",
        points: [
          "Pulse Electrical: on a phone, the homepage is about 17,800 pixels wide on a 375-pixel screen. Visitors see a cut-off heading, then blank space.",
          "Pulse Catering: the page is wider than the screen and the main heading runs into the photo.",
          "Most people looking for an electrician search on their phone, and in an emergency almost all of them do.",
        ],
        evidence: [
          {
            src: "/proposals/pulse/electrical-mobile.webp",
            alt: "Pulse Electrical homepage on a phone, with the heading cut off and blank space below",
            caption: "Pulse Electrical on a phone.",
            width: 375,
            height: 812,
          },
          {
            src: "/proposals/pulse/catering-mobile.webp",
            alt: "Pulse Catering homepage on a phone, with the heading overlapping the photo",
            caption: "Pulse Catering on a phone.",
            width: 375,
            height: 812,
          },
        ],
      },
      {
        id: "leftovers",
        title: "Leftover, wrong and broken pages",
        severity: "high",
        site: "Both",
        points: [
          "The catering site has a published page from a coworking-space template: \"The Container. We believe in people collaborations. Book a tour.\" Two more sit behind it: \"Meet your coworkers\" and \"Pick your plan\".",
          "WordPress's default \"Hello world!\" post from December 2021 is still live on the catering site, sample comment and all.",
          "\"Get in touch\" and the Facebook link on the electrical site both go to the catering business.",
          "The email address shown is info@pulseelectrical.co.uk, but clicking it opens an email to a different address.",
          "Two About pages on the catering site, a WordPress \"Sample Page\" on the electrical site, and a 2022 copyright line.",
        ],
        evidence: [
          {
            src: "/proposals/pulse/catering-template-page.webp",
            alt: "A coworking template page published on the Pulse Catering website",
            caption: "pulsecateringequipment.co.uk/about: a coworking template, still published.",
            width: 560,
            height: 710,
          },
          {
            src: "/proposals/pulse/catering-hello-world.webp",
            alt: "The default WordPress Hello world post on the Pulse Catering website",
            caption: "The WordPress \"Hello world!\" post from 2021.",
            width: 560,
            height: 710,
          },
        ],
      },
      {
        id: "security",
        title: "Warning signs on the electrical site's server",
        severity: "high",
        site: "Pulse Electrical",
        points: [
          "The file that tells search engines where to look lists six unusual addresses, one pointing at a file called goods.php. That file exists on the server and isn't part of WordPress. This pattern is commonly linked to spam injected into WordPress sites.",
          "The site also publicly lists its WordPress user accounts.",
          "We haven't accessed your server, so we can't say more than that. It's one more reason we build fresh and carry over your content, never the old code.",
        ],
      },
      {
        id: "google-listings",
        title: "Your Google listings",
        severity: "high",
        site: "Both",
        points: [
          "Both Google Business Profiles show \"Own this business?\", so anyone can suggest edits to your details.",
          "Pulse Electrical is rated 4.9, from 36 reviews. The two electricians next to you in \"electrician Dundee\" have 177 and 114.",
          "Your listing says you close at 4:30pm, while your website offers a 24/7 emergency call-out.",
          "Your address appears three ways: 15A Ash St on Google, 13a Ash Street at Companies House, and 25-27 City Road in at least one directory. Google trusts businesses whose details match everywhere.",
        ],
      },
      {
        id: "basics",
        title: "The basics Google needs are missing",
        severity: "medium",
        site: "Both",
        points: [
          "No page descriptions on either site, so Google writes its own.",
          "No business details marked up for Google: services, area, hours, reviews.",
          "Images have no descriptions (all 6 on the electrical homepage).",
          "No blog, case studies or location pages, which is how local electricians win searches like \"EICR Perth\" or \"emergency electrician Broughty Ferry\".",
        ],
      },
    ],
    working: {
      heading: "What's already working",
      items: [
        "A real reputation: in business since 2006, NICEIC approved, 18th Edition qualified, Trusted Trader, £10m public liability.",
        "Customers who say so: Piperdam, The Delivino and Stewart's all wrote glowing words, and Google rates you 4.9.",
        "A 24/7 emergency service most competitors don't offer.",
        "You already show in Google's map results for \"electrician Dundee\". The listing just needs work to climb.",
      ],
      closing: "The raw material is excellent. The websites just aren't doing it justice.",
    },
  },

  plan: {
    heading: "The plan: two websites, each built for its business",
    intro: "Both sites are built on Wix Studio as sister brands: the same Pulse spirit, but each one designed from scratch around how its business works, with its own layout, colours and domain. Your team can edit text, photos, case studies and blog posts without calling anyone.",
    sites: [
      {
        name: "Pulse Electrical",
        domain: "pulseelectrical.co.uk",
        pages: [
          { name: "Home" },
          { name: "About" },
          { name: "Services", detail: "One page per service: EICRs, PAT testing, emergency lighting, fire alarms, landlord services, commercial, industrial and domestic work" },
          { name: "Case studies", detail: "Real jobs, added as you go" },
          { name: "Locations", detail: "A page for each area you cover: Dundee, Perth, Angus, Fife and nearby towns" },
          { name: "Emergency electrician", detail: "24/7 call-out, one tap to call" },
          { name: "Blog" },
          { name: "Testimonials" },
          { name: "Get a quote" },
        ],
      },
      {
        name: "Pulse Catering",
        domain: "pulsecateringequipment.co.uk",
        note: "Designed on its own, around how catering customers work: kitchens and venues that need breakdowns fixed fast and equipment kept running.",
        pages: [
          { name: "Home", detail: "Including the areas you cover" },
          { name: "About" },
          { name: "Services", detail: "One page per service: gas, electrical and LPG equipment, installation, servicing and repairs" },
          { name: "Recent work", detail: "Kitchens and venues you look after" },
          { name: "Emergency repairs", detail: "Breakdowns fixed fast, one tap to call" },
          { name: "Blog" },
          { name: "Testimonials" },
          { name: "Get a quote" },
        ],
      },
    ],
    builtIn: {
      heading: "Built into both",
      items: [
        "Works properly on phones, tablets and desktops",
        "Click-to-call on every page, with the emergency number always in reach on phones",
        "Quote forms that land in the right inbox for each business",
        "Page titles, descriptions and business details set up for Google and AI assistants like ChatGPT",
        "Every service and location page built to be found on its own",
        "The two sites link to each other properly, so each sends work to the other",
      ],
    },
  },

  handover: {
    heading: "Taking back control of your websites",
    intro: "Right now your old developer holds the keys. Here's exactly how we hand them back to you, in order, so nothing breaks along the way.",
    steps: [
      { title: "A short email from you", body: "We draft a polite email for you to send to IHTTP asking for access to WordPress, the hosting and your domains. They're your domains and your content, so it's a normal request." },
      { title: "A full backup first", body: "Before anything changes, we save both websites in full: every page, photo and testimonial." },
      { title: "Domains in your name", body: "If your domains are registered under your developer's account, we move them into an account you own, so nobody can hold them back again." },
      { title: "Your email keeps working", body: "We record your email settings before touching anything, so your @pulseelectrical.co.uk and @pulsecateringequipment.co.uk addresses never miss a message." },
      { title: "Old links keep working", body: "Every old page address is redirected to its new page, so Google, Facebook and old bookmarks all land in the right place." },
      { title: "Switch-over day", body: "We point both domains at the new websites. Visitors never see a gap." },
      { title: "The test copy comes down", body: "We ask IHTTP to remove the copy on ihttpdev.co.uk, and tell Google through Search Console which addresses are the real ones." },
      { title: "Old hosting cancelled", body: "Only once both new sites are live and checked, so you never pay twice, and never lose anything." },
    ],
    closing: "At the end, your domains, your websites and your Google listings are all in your name. We just look after them.",
  },

  gbp: {
    heading: "Google Business Profiles, fixed for both",
    intro: "Your Google listing is often the first thing people see, before your website. We set up both properly.",
    items: [
      "Both profiles claimed and verified in your name",
      "One address, phone number and set of hours, matching everywhere",
      "Your 24/7 emergency service shown properly",
      "The right categories and services, and real photos of your team and jobs",
      "Both linked to the new websites",
      "A review link and QR code your engineers can share after a job",
    ],
  },

  investment: {
    heading: "Investment",
    builds: [
      { name: "Pulse Electrical website", wasPrice: "£3,500", price: "£3,000" },
      { name: "Pulse Catering website", wasPrice: "£3,500", price: "£3,000" },
    ],
    total: { label: "Both websites", wasPrice: "£7,000", price: "£6,000", saving: "You save £1,000" },
    includes: "Includes everything on this page: both websites, the handover from your old developer, and the Google Business Profile fix-up for both businesses.",
    delivery: "Both sites delivered in 5 weeks.",
    paymentOptions: [
      { name: "Two payments", detail: "Half to start, half at launch", schedule: ["£3,000 to start", "£3,000 at launch"] },
      { name: "Three payments", detail: "Spread across the project", schedule: ["£2,000 to start", "£2,000 a month later", "£2,000 a month after that"] },
    ],
    care: {
      name: "Monthly care, both websites",
      price: "£150",
      priceNote: "per month, for both sites",
      items: [
        "Hosting for both websites",
        "Security and backups",
        "Unlimited updates: text, photos, new services and case studies",
        "One blog post a month for each site, written for you",
        "A monthly check on both sites and both Google profiles",
      ],
      note: "Starts at launch. No long contract.",
    },
  },

  timeline: {
    heading: "Five weeks, start to finish",
    rows: [
      { when: "Week 1", what: "Access email sent, backups taken, kick-off call, content gathered" },
      { when: "Weeks 2 to 3", what: "Pulse Electrical designed and built" },
      { when: "Weeks 3 to 4", what: "Pulse Catering designed and built" },
      { when: "Week 4", what: "Your review and changes, Google Business Profiles fixed" },
      { when: "Week 5", what: "Switch-over, redirects checked, old hosting cancelled" },
    ],
  },

  close: {
    heading: "Ready when you are, Mike",
    body: "Reply to my email or book a call. Once you say go, we'll send you the email for IHTTP the same day.",
    primaryCta: { label: "Book a call", href: "/book-a-call" },
    secondaryCta: { label: "Email Pavle", href: "mailto:hello@thezenithdigital.com?subject=Pulse%20websites" },
    signoff: "Pavle Maodus, Zenith Digital",
  },
};
