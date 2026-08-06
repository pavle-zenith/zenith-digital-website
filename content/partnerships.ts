import type { CtaLink } from "@/lib/types";

/*
 * /partnerships — every string on the page lives here.
 *
 * OWNER — set every field in `commercials` below before launch. The current
 * values are visible [bracketed] placeholders wired into the page copy, so an
 * unset field is easy to spot on any preview. Fields to set:
 *   partnerDiscount    — white-label pricing, e.g. "20% off retail"
 *   buildSla           — standard turnaround, e.g. "a 5-page build in 3 weeks"
 *   referralCommission — e.g. "10–15%"
 *   referralPayout     — payout terms, e.g. "net 14 after the client pays"
 *   wholesaleStructure — how partner pricing works (FAQ answer)
 *   postHandover       — post-handover change terms (FAQ answer)
 *   minimumCommitment  — confirm or edit the "no minimum commitment" claim
 *   feedbackWindow     — feedback consolidation window, e.g. "3 business days"
 *   revisionPolicy     — rounds included + rate for extra rounds
 *   partnerCount       — number of agency partners (proof stats row)
 *   inHouseCost        — in-house hire cost for the hiring-math band,
 *                        e.g. "€60–90k+/year"
 *   capacityPolicy     — volume/capacity policy sentence (FAQ answer)
 *
 * Also confirm before launch (real copy, not bracketed):
 *   - the risk strip claims in pBenefits.riskStrip
 *   - add a founder photo at pApply.founder.photo (renders a monogram until set)
 */
export const commercials = {
  partnerDiscount: "[partner % off retail to set]",
  buildSla: "[SLA to set: e.g. a 5-page build in N weeks]",
  referralCommission: "[commission % to set]",
  referralPayout: "[payout terms to set]",
  wholesaleStructure: "[Wholesale pricing structure to set]",
  postHandover: "[Post-handover terms to set: included window, then rate]",
  minimumCommitment: "No minimum commitment [to confirm]",
  feedbackWindow: "[feedback window to set: e.g. 3 business days]",
  revisionPolicy:
    "[revision policy to set: N rounds included, extra rounds at €X]",
  partnerCount: "[n]",
  inHouseCost: "[in-house cost to set: e.g. €60–90k+/year]",
  capacityPolicy:
    "[Capacity policy to set: e.g. parallel partner builds you take]",
};

// 1. Hero
export const pHero = {
  eyebrow: "White-label & referral partnerships",
  heading: "You deliver. We build.",
  subhead:
    "Partner with the team behind 150+ launches. Unbranded Wix Studio and custom builds, delivered under your agency's name, with the quality your clients think you built in-house.",
  ctas: [
    {
      label: "Apply to partner",
      href: "#apply",
      variant: "primary",
    } as CtaLink,
    {
      label: "Book a call",
      href: "/book-a-call",
      variant: "secondary",
    } as CtaLink,
  ],
  trust: [
    "NDA as standard",
    "Unbranded deliverables",
    "Dedicated point of contact",
  ],
};

// 1b. Problem-first beat — the three agency situations, between hero and tracks.
export const pProblems = {
  srHeading: "Who this is for",
  items: [
    {
      title: "More demand than hands",
      body: "You're selling faster than you can build. Every new deal makes the backlog worse.",
    },
    {
      title: "Landing bigger clients",
      body: "The pitches are getting bigger than your in-house capability. You need senior build quality without the senior hires.",
    },
    {
      title: "Occasional overflow",
      body: "Your team's fine most of the time. You need a reliable release valve for the months it isn't.",
    },
  ],
  closing:
    "All three end the same way: you deliver under your brand, we build behind it.",
};

// 2. The two tracks — the page's core decision, side by side.
export const pTracks = {
  heading: "Two ways to partner",
  tracks: [
    {
      name: "White-label production",
      forWho:
        "For agencies and freelancers with more demand than build capacity.",
      description:
        "You sell and own the client relationship. We design and build under your brand: unbranded files, your comms, our build quality. Your client never hears our name.",
      bullets: [
        "Unbranded deliverables & NDA",
        "Dedicated PM and Slack/email channel",
        `Partner pricing that protects your margin (${commercials.partnerDiscount})`,
        `Agreed turnaround SLAs (${commercials.buildSla})`,
      ],
      cta: {
        label: "Apply as a production partner",
        href: "/partnerships?track=production#apply",
        variant: "primary",
      } as CtaLink,
    },
    {
      name: "Referral partner",
      forWho:
        "For consultants, designers, and past clients who meet businesses that need a website.",
      description:
        "Send us a qualified introduction. We handle everything under the Zenith brand and you earn a commission when the project closes.",
      bullets: [
        `${commercials.referralCommission} of project value on close`,
        "No delivery involvement required",
        "Full visibility on the deal status",
        `Paid on client payment (${commercials.referralPayout})`,
      ],
      cta: {
        label: "Apply as a referral partner",
        href: "/partnerships?track=referral#apply",
        variant: "primary",
      } as CtaLink,
    },
  ],
};

// 3. How it works — simple numbered row, four steps.
export const pProcess = {
  heading: "How a white-label build runs",
  steps: [
    {
      title: "Brief",
      body: "You send the project brief and brand assets through the partner channel. We confirm scope, price, and timeline within one business day.",
    },
    {
      title: "Design direction",
      body: "We propose structure and design direction. You review it before your client ever sees anything.",
    },
    {
      title: "You present, we stay invisible",
      body: "You collect client feedback under your brand. We iterate directly with you, never with your client.",
    },
    {
      title: "Handover",
      body: "The finished site is transferred to your account with documentation. Your brand on everything, our name on nothing.",
    },
  ],
};

// 4. What partners get — dark hairline grid, six cells.
export const pBenefits = {
  heading: "Built to protect your margin and your reputation",
  items: [
    {
      icon: "gem",
      title: "Premium build quality",
      body: "The same team and standard behind Knode's $10M raise site and 220% booking growth for MOD Digital. Not template flips.",
    },
    {
      icon: "eyeOff",
      title: "Unbranded everything",
      body: "Files, previews, and staging environments carry your brand or none. NDA as standard.",
    },
    {
      icon: "percent",
      title: "Partner pricing",
      body: `${commercials.wholesaleStructure} so your margin survives the project.`,
    },
    {
      icon: "clock",
      title: "Predictable turnaround",
      body: `${commercials.buildSla}, agreed in writing before we start.`,
    },
    {
      icon: "user",
      title: "One point of contact",
      body: "A dedicated PM who knows your accounts. No ticket queues, no rotating staff.",
    },
    {
      icon: "layers",
      title: "Overflow flexibility",
      body: `Use us for one overflow project or as your standing production team. ${commercials.minimumCommitment}.`,
    },
  ],
  // The hiring-math band under the grid: in-house hire vs. partner, no scale
  // claims, EU/UK reality. The Zenith column is the highlighted one.
  hiringMath: {
    intro: `A mid-level designer plus developer in-house runs ${commercials.inHouseCost} before tools, management, and bench time. A white-label partner costs you only when there's a project.`,
    columns: ["In-house hire", "Zenith partner"],
    rows: [
      ["Salary every month", "Per-project pricing"],
      ["Bench time between projects", "Zero idle cost"],
      ["One skillset per hire", "Design, build, and SEO in one team"],
      ["Notice periods", "No commitment"],
    ],
  },
  // Risk-reduction strip — OWNER: confirm each claim before launch.
  riskStrip: [
    "No minimum commitment",
    "First project scoped within one business day",
    "NDA before you share anything",
    "Same team every project",
  ],
};

// 5. Partner expectations — the short honesty section.
export const pExpectations = {
  heading: "What we ask of partners",
  items: [
    "You own all client-facing communication",
    `Feedback consolidated in agreed windows (${commercials.feedbackWindow}) so builds stay on schedule`,
    `Revisions per scope: ${commercials.revisionPolicy}`,
  ],
  closing: "Clear terms up front so neither side burns margin on ambiguity.",
};

// 6. Proof — one real white-label testimonial, full width. No padding with
// off-topic quotes; partner-relationship logos only.
export const pProof = {
  quote:
    "Even though I didn't have a crystal-clear vision of how a white-label partnership looked, Zenith was able to overdeliver on every front imaginable.",
  name: "John Smyth",
  role: "CEO, AdVantage Media Marketing",
  logo: "/logos-white/advantage.png",
  logoAlt: "AdVantage Media Marketing",
  stats: [
    { value: commercials.partnerCount, label: "agency partners" },
    { value: "10+", label: "websites delivered for Techtonnik since 2023" },
    { value: "15+", label: "landing pages for MOD Digital" },
    {
      value: "Dozens",
      label: "of client sites managed for AdVantage since 2024",
    },
  ],
  logos: [
    { src: "/logos-white/mod.png", alt: "MOD Digital" },
    { src: "/logos-white/techtonnik.png", alt: "Techtonnik" },
    { src: "/logos-white/capacity.png", alt: "Capacity" },
    { src: "/logos-white/advantage.png", alt: "AdVantage Media Marketing" },
  ],
};

// 7. FAQ — feeds the shared Faq section + FAQPage JSON-LD on the page.
export const pFaq = {
  heading: ["Partner questions,", "answered straight"],
  subhead: "If it's not covered here, ask us on a call.",
  ctas: [
    {
      label: "Book a call",
      href: "/book-a-call",
      variant: "secondary",
    } as CtaLink,
  ],
  items: [
    {
      q: "Will my client ever know Zenith was involved?",
      a: "Not from us. Deliverables are unbranded, comms run through you, and an NDA is standard. The only way they find out is if you tell them.",
    },
    {
      q: "What platforms do you build on?",
      a: "Wix Studio is our primary platform, with fully custom builds (like this site) when a project needs it. If your client is on something else, ask us about migration.",
    },
    {
      q: "How is partner pricing structured?",
      a: `${commercials.wholesaleStructure}. You set your own client pricing on top; your margin is your business.`,
    },
    {
      q: "What if my client requests changes after handover?",
      a: `${commercials.postHandover}.`,
    },
    {
      q: "Can I white-label your SEO and campaign work too?",
      a: "Yes. Design, build, SEO/AEO, and automations can all run under your brand. Scope it in the brief.",
    },
    {
      q: "How do referral commissions work?",
      a: `You introduce, we close and deliver, you get ${commercials.referralCommission} when the client pays. You can see deal status at any point. No cap on introductions.`,
    },
    {
      q: "What happens if I send you more work than you can handle?",
      a: `We tell you before you commit, not after. We'd rather cap intake than miss a partner deadline. ${commercials.capacityPolicy}`,
    },
  ],
};

// 8. Application form — founder-fronted close (no sales-team framing).
export const pApply = {
  heading: "Apply to partner",
  founder: {
    note: "Applications come straight to Pavle, the founder. No sales team, no account managers, no queue. If we're a fit, you'll know within one business day.",
    name: "Pavle Maoduš",
    role: "Founder, Zenith Digital",
    // OWNER: add a real founder photo (e.g. /team/pavle.jpg). A monogram tile
    // renders until this is set.
    photo: "",
  },
  fields: {
    agency: { label: "Agency / company name", placeholder: "Your agency" },
    name: { label: "Your name", placeholder: "First and last name" },
    email: { label: "Email", placeholder: "you@youragency.com" },
    website: { label: "Website", placeholder: "youragency.com" },
    track: {
      label: "Which track?",
      options: ["White-label production", "Referral", "Not sure yet"],
    },
    need: {
      label: "What do you need?",
      placeholder:
        "e.g. 2–3 overflow builds per quarter, or a standing production partner...",
    },
  },
  submit: "Send application",
  success:
    "Application received. We'll come back to you within one business day.",
  errorFallback: "Or email us directly at hello@thezenithdigital.com.",
};
