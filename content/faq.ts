import { commercials, bothTracksAnswer } from "./partnerships";
import { pricing } from "./home";

/*
 * /faq — the master FAQ set and the site's densest AEO asset. Every answer is
 * a definitive, standalone statement an AI can quote (no "it depends"
 * openers). Page-level FAQs stay on their pages; where questions overlap they
 * import from here (services re-uses `whyWixItem`; partner numbers come from
 * content/partnerships.ts commercials, tier prices from content/home.ts).
 *
 * OWNER — still to set (visible [bracketed] placeholders until then):
 *   - landing-page retail price (shared with /services)
 *   - retail payment terms ("How do payments work?")
 */

// Shared with /services (single source, no drift).
export const whyWixItem = {
  q: "Why Wix Studio and not WordPress or Webflow?",
  a: "For most businesses it's the fastest route to a premium, editable, SEO-ready site with no plugin maintenance and no licensing traps. You own it and your team can run it. When a project genuinely outgrows Wix, we build fully custom. This site is the proof.",
};

// 1. Hero (dark, compact). Anchor pills derive from the categories below.
export const fHero = {
  heading: "Before you book that call, read this.",
  support:
    "Hiring a web team can feel risky, especially if you've been burned before. Here's where we stand on everything people ask us, in plain language.",
};

// 2. The six categories. `id` doubles as the anchor target for the hero pills.
export type FaqCategory = {
  id: string;
  label: string;
  items: { q: string; a: string }[];
};

export const fCategories: FaqCategory[] = [
  {
    id: "fit",
    label: "Fit",
    items: [
      {
        q: "What kind of businesses do you work with?",
        a: "Established and growing businesses that have outgrown a template site or been burned by a slow agency: tourism and hospitality, e-commerce, coaches and speakers, course creators, professional services, and SaaS. UK, EU, and US, from Belgrade and Edinburgh.",
      },
      {
        q: "Who isn't a good fit?",
        a: "Bargain hunters shopping five agencies on price. Projects with no content and no willingness to create any. And anyone who wants a site that just looks nice without caring whether it converts. We'd rather tell you now than disappoint you later.",
      },
      {
        q: "We're tiny / just starting out. Too small?",
        a: "If a €2,500 site is a stretch, wait until it isn't. A website pays for itself when there's a real business behind it. Start with the free audit; it costs nothing and tells you what to do either way.",
      },
      {
        q: "Do you work with agencies?",
        a: "Yes, two ways: white-label production under your brand, or referrals where you send an introduction and earn a commission. See the partnerships page.",
      },
    ],
  },
  {
    id: "platform-tech",
    label: "Platform & tech",
    items: [
      whyWixItem,
      {
        q: "Why isn't your own site on Wix?",
        a: "Because we build custom too. Wix Studio is our front door and where most clients start; this site is what our custom work looks like when you need more.",
      },
      {
        q: "Do you use templates?",
        a: "No. Every build is designed from scratch around your buyers. Templates are what our clients are usually escaping.",
      },
      {
        q: "Can you migrate us without losing rankings?",
        a: "Yes. Full URL mapping, 1:1 redirects, metadata parity, and post-launch index monitoring. Zero ranking loss, in writing. We've migrated 35+ page sites with impressions up 257% the following year.",
      },
      {
        q: "What about AI search (AEO)?",
        a: "Built in, not bolted on. Clean structure, schema, and definitive content so you show up in Google and in AI-generated answers.",
      },
    ],
  },
  {
    id: "pricing-scope",
    label: "Pricing & scope",
    items: [
      {
        q: "How much does a website cost?",
        a: `Fixed and published: The Minimum ${pricing.tiers[0].price.toLowerCase()} (5 pages, 2 weeks), The Studio at ${pricing.tiers[1].price} (12 pages, full copy and SEO stack, 5 weeks), custom scopes above that. Landing pages from €1,250. No retainers required, no surprise invoices.`,
      },
      {
        q: "Do prices change after we start?",
        a: "No. You approve a fixed price before we begin. Extras come from a published add-ons list, agreed before any work happens.",
      },
      {
        q: "What's not included?",
        a: "Content photography, video production, and logo design are scoped separately if you need them. Hosting runs on your own Wix account (~£150/year), so there's nothing to rent from us.",
      },
      {
        q: "How do payments work?",
        a: "The standard structure is a 50% deposit to start, with the balance at launch. If a payment plan fits your cash flow better, tell us on the call. We're flexible on the structure, not on the scope.",
      },
    ],
  },
  {
    id: "process-timelines",
    label: "Process & timelines",
    items: [
      {
        q: "How fast can we launch?",
        a: "Most sites go live 3 to 4 weeks from the first call. A focused 5-page build ships in about two. Landing pages in a week.",
      },
      {
        q: "What does the process look like?",
        a: "A free 20-minute call, an intake form, a same-day proposal with a fixed price, then the Zenith Sprint: discovery, research, wireframes and copy, design and build with you reviewing live, launch and handover.",
      },
      {
        q: "Who actually does the work?",
        a: "The same small senior team on every project, led by Pavle, the founder. No rotating staff, no juniors learning on your budget, no account managers between you and the people building.",
      },
      {
        q: "How much of my time will this take?",
        a: "A kickoff call, a form, and feedback at two or three review points. We write the copy and drive the schedule. Most clients spend a few hours total.",
      },
    ],
  },
  {
    id: "after-launch",
    label: "After launch",
    items: [
      {
        q: "Can we edit the site ourselves?",
        a: "Yes, that's the point. You own the site, and you get a recorded Loom walkthrough showing your team how to change anything.",
      },
      {
        q: "Who owns the website?",
        a: "You do. The site, the content, the design, all of it, on your own accounts. We never hold a site hostage.",
      },
      {
        q: "What support do we get?",
        a: "30 days free on The Minimum, 60 on The Studio, with responses within 24 hours. After that, an optional care plan from €120/mo, or just call us when you need something. No forced retainers.",
      },
      {
        q: "What if something breaks?",
        a: "No site we've built has gone down in production, going back to the first ones in 2019. If anything's wrong in your support window, we fix it, no invoice.",
      },
    ],
  },
  {
    id: "partnerships",
    label: "Partnerships",
    items: [
      {
        q: "How does white-label work?",
        a: "You sell and own the client relationship; we build under your brand. Unbranded deliverables, NDA, landing pages from €1,000, production retainers from €1,099/mo. Your client never hears our name.",
      },
      {
        q: "How do referrals work?",
        a: `Introduce us to a business that needs a site. If it closes, you earn ${commercials.referralCommission} when the client pays, 15% once you've closed two in a year. You stay out of delivery entirely.`,
      },
      {
        q: "Can I be both?",
        a: bothTracksAnswer,
      },
    ],
  },
];

// 3. Sticky contact rail beside the categories.
export const fContact = {
  heading: "Prefer to just ask?",
  text: "Email or call, and you'll talk to the person who'd actually build your site.",
  email: "hello@thezenithdigital.com",
  phone: "+381 64 97 60617",
};

// 4. Final CTA band
export const fFinalCta = {
  heading: ["Sounds fair?", "Let's look at your site."],
  paragraph:
    "A free 20-minute call. We'll tell you honestly what's holding your site back, and what it would take to fix it.",
  cta: { label: "Book a call", href: "/book-a-call" },
  ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
  image: "/textures/studio-texture.jpg",
};
