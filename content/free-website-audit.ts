/**
 * /free-website-audit — low-intent conversion endpoint. Book-a-call catches
 * visitors ready to talk; this catches everyone else. URL + email in, a
 * hand-recorded video walkthrough out. All copy lives here (nothing
 * marketing-facing hardcoded in JSX). Hero copy ported from the live site.
 */

// 1. Hero + audit form (dark, left/right split: proof + heading + client
// logos left, the white form card right)
export const auditHero = {
  proof: {
    label: "97+ websites analyzed",
    avatars: [
      "/avatars/ivan-belobrajdic.jpg",
      "/avatars/flynn-blackie.jpg",
      "/avatars/gemma-sole.jpg",
    ],
  },
  heading: "Find out what your website is actually costing you.",
  subhead:
    "We'll review your site by hand (not a bot, not a checklist) and send you a video walkthrough of exactly what's working, what isn't, and what to fix first. No pitch, no strings attached.",
  clientsLabel: "Clients we initially helped with an audit:",
  clients: [
    { src: "/logos-white/stilby.png", alt: "Stilby", className: "h-5" },
    { src: "/logos-white/belistria.png", alt: "Bel'Istria", className: "h-6" },
    { src: "/logos-white/genroks.png", alt: "Genroks", className: "h-5" },
    { src: "/logos-white/capacity.png", alt: "Capacity", className: "h-5" },
    { src: "/logos-white/techtonnik.png", alt: "Techtonnik", className: "h-5" },
  ],
  // Short trust checks under the form card
  checks: [
    "Real person review",
    "No commitment",
    "Delivered within 2 business days",
  ],
};

// The form (white card in the hero; the closing banner anchors back to it)
export const auditForm = {
  cardTitle: "Free website audit",
  fields: {
    website: { label: "Your website", placeholder: "yourwebsite.com" },
    email: { label: "Your email", placeholder: "you@company.com" },
    note: {
      label: "Anything specific you want us to look at?",
      placeholder:
        "e.g. the pricing page, why nobody fills the contact form...",
    },
  },
  submit: "Get my free audit",
  success: (site: string) =>
    `Got it. We'll take a look at ${site} and send the walkthrough to your inbox within 2 business days.`,
  errorFallback: "Email us instead: hello@thezenithdigital.com",
  altText: "Already know what you need?",
  altCta: { label: "Book a call instead", href: "/book-a-call" },
};

// 2. What you'll get (light, six cards)
export const auditCovers = {
  heading: "Six things costing you the most, explained on video",
  support:
    "Every audit covers the same ground an agency kickoff would, compressed into a walkthrough you can act on the same day.",
  items: [
    {
      icon: "leaks",
      title: "Conversion leaks",
      body: "The specific pages and patterns quietly costing you leads: unclear CTAs, trust gaps, friction in the paths that matter.",
    },
    {
      icon: "seo",
      title: "Search & AI visibility",
      body: "Structural issues holding you back in Google and in AI-generated answers: metadata, structure, and how readable your site is to machines.",
    },
    {
      icon: "speed",
      title: "Speed & performance",
      body: "Where your site is slow, what's causing it, and which fixes actually matter for visitors and rankings.",
    },
    {
      icon: "design",
      title: "Design & trust",
      body: "Whether the site reads as credible where it counts: first impressions, proof, and the details that make visitors trust you.",
    },
    {
      icon: "copy",
      title: "Copy & positioning",
      body: "What your headlines and page copy say to a first-time visitor, and where the message loses them.",
    },
    {
      icon: "proposal",
      title: "The fix order",
      body: "Not a list of 40 issues. The three changes we'd make first, ranked by impact, so you know exactly where to start.",
    },
  ],
};

// 3. Who it's for (dark, three upright image-background cards; copy ported
// from the live site)
export const auditWhoFor = {
  heading: "Who this serves best",
  items: [
    {
      image: "/audit/founders.jpg",
      title: "Business owners",
      body: "You have a website. It just isn't working hard enough. You're getting traffic but not enquiries. You've tweaked things yourself but nothing's moved the needle.",
    },
    {
      image: "/audit/marketing.jpg",
      title: "Businesses planning a redesign",
      body: "You know a redesign is coming. You've had quotes from agencies but don't know what to prioritise. You just want an honest baseline before the project starts.",
    },
    {
      image: "/audit/agencies.jpg",
      title: "Agencies & white-label partners",
      body: "You need a second opinion (or a team to deliver what you've already sold). You're pitching a client on a redesign and need the case built properly.",
      link: { label: "See partnerships", href: "/partnerships" },
    },
  ],
};

// 4. Example audit (light; sticky mock report left, before/after column right)
export const auditExample = {
  heading: "What an audit actually looks like",
  caption:
    "A real walkthrough runs 5 to 10 minutes and covers your site specifically, not a template.",
  // Mock report with findings written the way we'd say them on the call.
  report: {
    label: "Site audit",
    score: "62",
    scoreLabel: "Performance score",
    delta: "18 issues found",
    findings: [
      { text: '"Get a quote" button leads to a dead end', severity: "high" },
      { text: "The homepage never says who the site is for", severity: "high" },
      { text: "Over 4 seconds to load on a phone", severity: "med" },
      { text: "No reviews or client proof above the fold", severity: "med" },
      { text: "Google can't read half the page", severity: "med" },
      { text: "Contact details buried three clicks deep", severity: "low" },
    ],
  },
};

// 5. FAQ (ported from the live site) + FAQPage JSON-LD
export const auditFaq = {
  heading: ["Fair questions,", "straight answers"],
  subhead: "The things people wonder before they hand over a URL.",
  ctas: [],
  items: [
    {
      q: "Is it actually free? What's the catch?",
      a: 'Yes. No hidden costs, no "free tier" with a paid upgrade. We review your site, record a Loom walkthrough, and send it over. That\'s the whole thing.',
    },
    {
      q: "What happens after I get the audit?",
      a: "Nothing, unless you want it to. You'll get the review, you can implement the feedback yourself, pass it to your developer, or reach out to us if you'd like help with any of it. No automatic follow-up sequence, no pressure.",
    },
    {
      q: "How soon can I see the results?",
      a: "We deliver within 2 business days of receiving your submission. If we're at capacity we'll let you know upfront.",
    },
    {
      q: "Who actually does the audit?",
      a: "Pavle, the founder of Zenith Digital. Not a tool, not a junior hire running a script. The same person you'd be working with if you became a client.",
    },
    {
      q: "Do you only review Wix websites?",
      a: "No, we'll review any site regardless of platform. That said, if the audit leads to a project, Wix Studio is our primary build platform.",
    },
    {
      q: "I run an agency. Can I submit a website?",
      a: "Absolutely. Just mention that in the form and we'll frame the feedback accordingly. Useful for your pitch or your internal brief.",
    },
  ],
};

// 6. Closing CTA banner (anchors back up to the hero form)
export const auditCta = {
  heading: [
    "Most websites we review have at least",
    "three fixable problems. Let's find yours.",
  ],
  paragraph:
    "Get a free, honest review from someone who builds websites every day. Find out exactly what to focus on first.",
  checks: ["No commitment", "No pitch", "Delivered within 2 business days"],
  cta: { label: "Review my website", href: "#audit-form" },
  image: "/textures/bg-texture-invert.jpg",
};
