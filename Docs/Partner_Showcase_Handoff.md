# Partner showcase page (`/partner-showcase`): build handoff for Claude Code + impeccable

**For:** Zenith Digital website (Next.js 15 App Router, content in `content/`)
**Written:** 2 October 2026 · **Revised:** 2 October 2026 (v2: white-label, no prices, no partner named)
**Pattern references:**

- `/proposal/[slug]` and `/audit/[slug]`: the four privacy layers, the jump bar and the mobile bar;
- `/services`: the per-service slides in `content/services.ts`;
- `/case-studies`: `CaseStudyGrid`;
- `/partnerships`: `ProjectsSlider`.

---

## 0. Division of labour: read first

**The copy in §5 is final.** Paste it as `content/partner-showcase.ts`, matching the type in §4. Don't rewrite, shorten or "improve" it. If a string doesn't fit a component, flag it and leave it as written.

Claude Code's job:

- the route, the type, the new sections and the privacy layers;
- reuse of existing components wherever one fits (§3);
- the impeccable passes in §8 before calling it done.

**Design authority:** `DESIGN.md`, `PRODUCT.md`, and CLAUDE.md §7, §14 and §15.

- No new tokens, no new fonts, no floating shadowed cards.
- The homepage is the reference implementation.

---

## 1. What this page is, and who reads it

A performance-marketing partner (he runs Meta and Google ads) is adding Zenith Digital's services to his own offer, on a white-label basis. He will show this page to his clients, on a call or as a forwarded link.

**The reader is the partner's client:** a business owner who already pays for ads. That is `PRODUCT.md`'s primary audience (business owners), not the agency audience of `/partnerships`.

**Three hard rules (owner, 2 Oct 2026):**

- **No pricing anywhere on the page.** The partner sets his own prices.
- **The partner is never named.** The page says "your ads partner" at most.
- **No route from this page to a Zenith sales step.** The client's next step is with the partner, so there is no booking button, no audit form and no site navigation.

**How it will be seen:**

- on a phone, opened from WhatsApp or email;
- on a shared screen during a call.

Both must work without anyone touching a slider.

### Decisions already made (from an owner review and a five-advisor critique)

1. **All five services stay, in a fixed order.** Landing pages and CRO comes first, because that is the problem an ads client actually feels. The other four follow.
2. **Proof sits directly under the hero**, not at the bottom.
3. **The page must never make the ads partner look bad.**
   - No "your ads aren't working" or "your page is leaking" framing.
   - The framing is that ads and pages work together.
4. **Nothing on the page competes with the ads partner.** Ad campaign management is not listed anywhere, even though the public SEO service includes it.
5. **No prices of any kind.** Not partner rates, not the public "from" prices. Client results in money ($521k, €140k, €1M+) are proof, not pricing, and stay.
6. **Every claim uses the site's own wording and attribution.** Campaign revenue is credited to the campaigns, not to the page alone.
7. **Technologies is one compact strip.** It answers "do you build on my platform?".
8. **Sliders show their first slide in full with no interaction.** No autoplay.
9. **Every button is an in-page anchor.** Nothing links to `/book-a-call`, `/free-website-audit`, `/services/*` or the homepage.

---

## 2. Privacy: the same four layers as `/proposal/`

1. **Metadata.** Route metadata: `robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }`.
2. **Header.** `X-Robots-Tag: noindex, nofollow` in `next.config.ts` `headers()` for `source: "/partner-showcase"`. Copy the comment style of the proposal entry.
3. **Sitemap.** Absent from `app/sitemap.ts` (it is an allowlist). Add the route to the doc comment that lists the private routes.
4. **No internal links** to `/partner-showcase` from anywhere. Grep before finishing.

No robots.txt Disallow, for the same reason as before.

The page uses only images that are already public elsewhere on the site, so there is no private asset folder.

---

## 3. Files, and what to reuse

```
content/partner-showcase.ts                  §5, pasted as-is (type included)
app/partner-showcase/page.tsx                route, metadata, noindex
components/sections/partner-showcase/*       new sections only (see below)
next.config.ts                               one header entry
app/sitemap.ts                               comment only
```

| Section | Build from |
|---|---|
| Jump bar | `AuditJumpBar` (already shared with the proposal page) |
| Work slider | `ProjectsSlider`. Pass this page's heading, intro and stats; keep `pProjects.items` as the image source. If the heading is hard-wired, add optional props and default them to the current values so `/partnerships` is unchanged. |
| Service rows | **New:** `ShowcaseServices`. Reuse the slide track and square arrows from `ServiceShowcase` / the §15 slider pattern. |
| Process | `Process`. It reads `processSection` from `content/home`: add an optional `data` prop that defaults to it, so the homepage is unchanged. |
| All projects | `CaseStudyGrid`, as is, including its industry filter. |
| Close | **New:** a plain text band (no button) |
| Page chrome | **New:** logo-only header and a one-line footer, replacing the site `Nav` and `Footer` on this route only (§6.0) |

**Regression rule:** `/`, `/partnerships`, `/services`, `/case-studies` and `/proposal/pulse` must look and behave exactly as before. Any prop you add must default to today's behaviour.

---

## 4. The type

```ts
export interface ShowcaseSlide { image: string; client: string; caption: string }

export interface ShowcaseService {
  id: string;                    // anchor
  name: string;
  when: string;                  // one line: the situation this solves
  description: string;
  deliverables: string[];
  slides: ShowcaseSlide[];       // 1+; the row must look right with exactly one
}

export interface PartnerShowcase {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string; heading: string; lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  proof: { value: string; label: string; source: string }[];        // exactly 4
  work: { heading: string; intro: string; stats: string[] };
  services: { heading: string; intro: string; items: ShowcaseService[] };  // exactly 5
  together: { heading: string; steps: { title: string; body: string }[] }; // exactly 3
  tech: { heading: string; line: string; groups: { label: string; items: { name: string; logo?: string }[] }[] };
  process: { name: string; heading: string;
             steps: { step: string; label: string; heading: string; points: string[] }[] };
  projects: { heading: string; intro: string };
  close: { heading: string; paragraph: string };
}
```

**All `href`s in the content are in-page anchors.** There are no external or site links in this file.

---

## 5. Content: `content/partner-showcase.ts`

```ts
/**
 * /partner-showcase: private page a performance-marketing partner shows to
 * their own clients. Reader = a business owner already paying for ads.
 * White-label arrangement: the partner sells this under his own offer.
 * Rules (owner, 2 Oct 2026): no prices of any kind; the partner is never
 * named; no links to Zenith's booking, audit, service or pricing pages; never
 * list ad campaign management (the partner's own service); every figure uses
 * the wording and attribution already published on the site.
 */
export const partnerShowcase: PartnerShowcase = {
  meta: {
    title: "Websites and landing pages for your campaigns | Zenith Digital",
    description:
      "Websites, stores and landing pages built for the traffic your ads bring. Founder-led, and live in weeks.",
  },

  hero: {
    eyebrow: "Your website partner",
    heading: "Ads bring the right people. The page turns them into customers.",
    lead: "Zenith Digital designs and builds the websites, stores and landing pages your campaigns send people to. One founder-led team, working alongside your ads partner, live in weeks.",
    primaryCta: { label: "See the work", href: "#work" },
    secondaryCta: { label: "What you get", href: "#services" },
  },

  proof: [
    { value: "€1M+", label: "client revenue from campaigns running on 15+ landing pages we built", source: "MOD Digital" },
    { value: "$521k", label: "in bookings in 7 months through a site we built", source: "Scottish Luxury Experience" },
    { value: "€140k", label: "in course sales through our landing pages", source: "Hunting Brook Gardens" },
    { value: "257%", label: "more search impressions, year on year, after a migration", source: "Bel'Istria" },
  ],

  work: {
    heading: "A sample of what we ship",
    intro: "Websites, stores and campaign pages for businesses in the UK, EU and US.",
    stats: ["100+ websites launched", "Wix Legend Partner", "Building since 2019"],
  },

  services: {
    heading: "Five things we do, and what you get with each",
    intro: "Pick the one that matches where you are. Most ad clients start with the first.",
    items: [
      {
        id: "landing-pages",
        name: "Landing pages and CRO",
        when: "You're paying for clicks and sending them to your homepage.",
        description:
          "A dedicated page for each campaign, written and built around one action. Built so your ads partner can test versions against each other.",
        deliverables: [
          "Conversion-first copy and structure",
          "Design and build matched to your brand",
          "Form, CRM and booking integrations",
          "Speed-optimised for paid traffic",
          "Variant-ready for testing",
        ],
        slides: [
          { image: "/service-slides/landing-mod-digital.webp", client: "MOD Digital", caption: "15+ landing pages behind MOD Digital's client campaigns." },
          { image: "/service-slides/landing-hunting-brook.webp", client: "Hunting Brook Gardens", caption: "Course and event launch pages for Hunting Brook Gardens." },
        ],
      },
      {
        id: "websites",
        name: "Website development",
        when: "Your site looks fine but doesn't sell, or you've outgrown a template.",
        description:
          "A full website planned around your buyers: structure first, then copy, then design. Your team can edit everything afterwards.",
        deliverables: [
          "Structure and wireframes built around your buyers",
          "Conversion copywriting",
          "Design and build, with custom features where you need them",
          "On-page SEO fundamentals",
          "Analytics and lead capture wired in",
          "A recorded handover so your team can edit everything",
        ],
        slides: [
          { image: "/service-slides/design-sle.webp", client: "Scottish Luxury Experience", caption: "$521k in bookings in 7 months." },
          { image: "/service-slides/design-atw-trucking.webp", client: "ATW Trucking", caption: "A freight and logistics site, rebuilt end to end." },
          { image: "/service-slides/design-bianomics.webp", client: "Bianomics", caption: "Bianomics" },
          { image: "/service-slides/dev-yacht-junky.webp", client: "Yacht Junky", caption: "A boat and yacht marketplace." },
        ],
      },
      {
        id: "ecommerce",
        name: "eCommerce development",
        when: "You sell products online and the store is holding sales back.",
        description:
          "Stores on Shopify or Wix Studio, set up so products are easy to find and checkout is short. Built in more than one language when you sell across borders.",
        deliverables: [
          "Store design and build on Shopify or Wix Studio",
          "Product catalogue and collections set up",
          "Checkout, payments and shipping configured",
          "Multi-language stores for new markets",
          "Training so your team can run the store",
        ],
        slides: [
          { image: "/case-studies/stilby/card.webp", client: "Stilby", caption: "Three languages, launched in two weeks." },
          { image: "/case-studies/lepa-couture/card.webp", client: "Lepa Couture", caption: "A made-to-order couture storefront on Shopify." },
          { image: "/case-studies/notyou-brand/card.webp", client: "NotYou Brand", caption: "A drop-driven streetwear store and lookbook." },
          { image: "/case-studies/destilerija-maodus/card.webp", client: "Destilerija Maodus", caption: "A distillery brand site with gift ordering." },
        ],
      },
      {
        id: "migrations",
        name: "Website migrations",
        when: "You want off your current platform without losing your Google rankings.",
        description:
          "We move the site page by page, redirect every old address and watch Google for 30 days after launch.",
        deliverables: [
          "Full URL inventory and 1:1 redirect map",
          "Content and CMS migration",
          "Page titles, descriptions and schema carried across",
          "Speed and Core Web Vitals pass",
          "30 days of indexing monitoring after launch",
        ],
        slides: [
          { image: "/service-slides/migration-belistria.webp", client: "Bel'Istria", caption: "35+ pages moved, impressions up 257% year on year." },
          { image: "/service-slides/migration-genroks.webp", client: "Genroks AI", caption: "From a Framer template to a custom-coded site." },
          { image: "/service-slides/migration-katie-hailey.webp", client: "Katie Hailey", caption: "Katie Hailey" },
          { image: "/service-slides/migration-destilerija-maodus.webp", client: "Destilerija Maodus", caption: "Destilerija Maodus" },
        ],
      },
      {
        id: "seo",
        name: "AEO and SEO",
        when: "The site is live, but people only find you when they already know your name.",
        description:
          "We set the site up so Google and AI assistants like ChatGPT understand what you do, then build the pages that answer what your customers search for. It works alongside your ads, so you aren't paying for every visit.",
        deliverables: [
          "Technical and on-page SEO",
          "AEO: schema, structure and visibility in AI answers",
          "Keyword and content strategy",
          "Monthly reporting in plain language",
        ],
        slides: [
          { image: "/service-slides/seo-belistria.webp", client: "Bel'Istria", caption: "257% growth in search impressions, year on year." },
          { image: "/service-slides/seo-just-stay.webp", client: "Just Stay", caption: "Just Stay" },
        ],
      },
    ],
  },

  together: {
    heading: "How we work with your ads partner",
    steps: [
      { title: "They run the campaigns", body: "Targeting, creative and budget stay exactly where they are." },
      { title: "We build where the traffic lands", body: "Pages matched to each campaign's message, so the click and the page say the same thing." },
      { title: "One shared loop", body: "Your ads partner sees what converts, tells us, and we adjust the page. You don't have to translate between us." },
    ],
  },

  tech: {
    heading: "Built on the platform that fits you",
    line: "We choose the platform for your team and your budget, not the other way round.",
    groups: [
      {
        label: "Platforms",
        items: [
          { name: "Wix Studio", logo: "/logos-white/wix-studio.png" },
          { name: "Shopify", logo: "/logos-white/shopify-partners.png" },
          { name: "Framer", logo: "/platforms/framer.webp" },
        ],
      },
      { label: "Custom builds", items: [{ name: "Next.js" }, { name: "Sanity CMS" }, { name: "Vercel" }] },
      { label: "Connected to", items: [{ name: "Google Analytics 4" }, { name: "CRMs and booking tools" }, { name: "Payments" }] },
    ],
  },

  process: {
    name: "The Zenith Sprint",
    heading: "From first call to live, in five steps",
    steps: [
      { step: "Step 1", label: "Discovery", heading: "We learn your business and your campaigns first", points: ["Free strategy call", "Goals, buyers and offers mapped"] },
      { step: "Step 2", label: "Research", heading: "Competitors, keywords and what actually converts", points: ["Market and competitor teardown", "Input from your ads partner"] },
      { step: "Step 3", label: "Wireframing", heading: "Structure and copy locked before visuals", points: ["Page-by-page wireframes", "Conversion-first copywriting"] },
      { step: "Step 4", label: "Build", heading: "Designed and built, reviewed live with you", points: ["Design and build on your platform", "You review directly, we iterate"] },
      { step: "Step 5", label: "Launch", heading: "Live, tracked and handed over", points: ["QA, SEO and speed checks", "Handover so your team can edit"] },
    ],
  },

  projects: {
    heading: "All projects",
    intro: "Filter by industry to find a business like yours.",
  },

  close: {
    heading: "Ready to start?",
    paragraph: "Speak to the person who shared this page with you. They'll set up the first call and bring us in.",
  },
};
```

**Slide captions that equal the client name** (Bianomics, Katie Hailey, Destilerija Maodus, Just Stay) are deliberate. No outcome claim is confirmed for those shots. Render the client name once, not twice.

---

## 6. Layout, top to bottom

### 6.0 Page chrome (this route only)

- **Header:** the Zenith Digital logo, not linked, on the hero's dark ground. No nav links, no "Book a call" button, no services menu.
- **Footer:** one line: "© 2026 Zenith Digital". No link columns, no "Ask AI" tiles, no contact details.
- **How:** the site `Nav` and `Footer` come from the root layout. Suppress them for this route without changing any other route. Prefer a route group with its own layout; if the root layout makes that awkward, gate them on the pathname. Say which you chose.
- **Why:** the site nav leads to public pricing and to the booking form, and both break the three hard rules in §1.
- The cookie banner and analytics stay as they are.

### 6.1 Hero (dark, textured, same treatment as `AuditPageHero` on `/free-website-audit`)

- **Text:** eyebrow, H1, lead, the two CTAs. Both are in-page anchors.
- **No hero image.** The work slider directly below is the visual.

### 6.2 Proof strip (dark, directly under the hero, top rule only)

- Four cells in a hairline grid: 2×2 on phones, 4 across from `md`.
- Each cell:
  - `value` in the display face;
  - `label` in muted text;
  - `source` in the mono caption style.
- Not a marquee and not animated.

### 6.3 Jump bar (sticky)

Reuse `AuditJumpBar`, with these labels and anchors:

| Label | Anchor |
|---|---|
| Work | `#work` |
| Services | `#services` |
| Platforms | `#platforms` |
| Process | `#process` |
| All projects | `#projects` |

### 6.4 Work slider (`id="work"`)

`ProjectsSlider` with this page's `work` heading, intro and stats.

### 6.5 Five services (`id="services"`, light)

**Section header:** `services.heading` and `services.intro`.

**Rows:**

- Five full-width rows under shared hairlines.
- **Alternating:** odd rows have text left and media right; even rows have media left and text right.
- On phones, every row stacks **media first, then text**. Do not alternate.
- Each row has its own anchor (`id`), with `scroll-margin-top` for the nav plus the jump bar.

**Text column, in order:**

1. A two-digit index ("01"), in the mono caption style.
2. `name` as an H3.
3. `when`, in italic muted text.
4. `description`.
5. `deliverables` as a tick list (inline Lucide check, positive ink) with hairline separators.

**Media column:**

- **Slide track:** a snap-scroll track (§15 slider pattern) with square arrows and a solid section-fill behind them.
- **Slide:** the image at 4:3, `object-cover`, radius 6, with a thin border.
- **Caption bar:** below the image. Client in medium weight, caption in muted text.
- **No autoplay.**
- **Counter:** show "1 / 4" in the mono caption style beside the arrows.
- **One slide:** render no arrows and no counter.
- **Mixed sources:** the `/case-studies/*/card.webp` images and the `/service-slides/*` images have different native crops. Both must sit in the same 4:3 box with no letterboxing.
- **Looping:** the track does not loop. Disable the arrow at each end (`aria-disabled`).

**First-row emphasis:** the first row (Landing pages and CRO) carries a small "Most ad clients start here" `Pill` beside its index. No other row is styled differently.

### 6.6 How we work with your ads partner (light, `surface` tint)

- Three numbered cells in a hairline grid: 3 across from `lg`, stacked on phones.
- Each cell: number chip, title, body.

### 6.7 Platforms (`id="platforms"`, light)

- Heading and `line`.
- Then the three groups in a hairline grid: 3 columns from `md`.
- **Items with a logo:** render the logo at a fixed height. The logo files are white marks, so place them on a navy chip (`bg-bg`) or use `/logos-dark` equivalents if they exist. Check contrast.
- **Items without a logo:** render as text chips in the same box size, so the grid stays even.
- This is a compact strip. It must fit in one screen on desktop.

### 6.8 Process (`id="process"`)

`Process` with `data={partnerShowcase.process}`. This page passes no CTA, so the component must render without its button when `cta` is absent.

### 6.9 All projects (`id="projects"`)

- This page's heading and intro, then `CaseStudyGrid`.
- **Card links:** cards normally link to `/case-studies/[slug]` or the live client site. On this page, link every card to the **live client site** in a new tab where one exists, and render it unlinked otherwise. Never link to `/case-studies/*`, because those pages carry the full site navigation. Add this as an optional prop that defaults to today's behaviour.

### 6.10 Close (light)

- `close.heading` as an H2 and `close.paragraph`, centred, max width about 56ch.
- No button and no form.

### Global

- No `JsonLd`.
- Default OG image. OG title = `meta.title`.
- No mobile bottom bar on this page.

---

## 7. Behaviour and accessibility

### Accessibility

- **Headings:** one H1. Section headings are H2. Service names, step titles and group labels are H3.
- **Sliders:**
  - each track is a labelled region ("{service name} examples");
  - arrows are real buttons with accessible names;
  - slides are reachable by keyboard and by swipe.
- **Tick lists** are real lists.
- **Contrast:**
  - Check muted text on both dark bands.
  - Check the logo chips.
- **Motion:** none added. Existing components keep their reduced-motion behaviour.
- **Images:**
  - Use `next/image` with correct `sizes`.
  - The first service slide is not lazy if it is above the fold on desktop.
  - All other images are lazy.

---

## 8. Impeccable passes (required before done)

Run these against `/partner-showcase` once it renders, and fix what they raise:

1. **`/impeccable critique`** on `app/partner-showcase/page.tsx`. Fix every P0 and P1. List any P2 you leave, with a reason.
2. **`/impeccable layout`** if the critique flags rhythm or density, especially the five service rows on phones.
3. **`/impeccable clarify`** only for labels and microcopy you added (slider counters, aria names). **It must not touch §5 copy.**
4. **`/impeccable harden`** for these edge cases:
   - one-slide rows;
   - missing logos;
   - long client names;
   - a project card with no live site.
5. **`/impeccable audit`** last. It must pass for accessibility and performance at 375, 768 and 1280.

Keep the critique output in `.impeccable/critique/` as usual.

---

## 9. Definition of done

**Privacy**

- [ ] `/partner-showcase` renders.
- [ ] `curl -I` shows `X-Robots-Tag: noindex, nofollow`.
- [ ] The HTML has the robots meta.
- [ ] `/sitemap.xml` has no entry for it.
- [ ] robots.txt is unchanged.
- [ ] Grep finds no internal link to the route.

**Content**

- [ ] Copy matches §5 exactly.
- [ ] No em dashes, no banned words (CLAUDE.md §14).
- [ ] Service order is: landing pages, websites, eCommerce, migrations, SEO.

**Layout**

- [ ] Rows alternate on desktop.
- [ ] On phones, media comes first in every row.
- [ ] Every slider shows its first slide complete with no interaction.
- [ ] A one-slide row shows no arrows.
- [ ] Checked at 375, 768 and 1280.

**The three hard rules**

- [ ] No price appears: the strings "From €", "€750", "€1,250", "€600", "€1,099", "pricing" and "Fixed price" are absent from the rendered page.
- [ ] The strings "Stefan" and "Campaign management" are absent.
- [ ] No link on the page points to `/book-a-call`, `/free-website-audit`, `/services`, `/case-studies`, `/partnerships` or `/`.
- [ ] The site nav and footer are not rendered here, and are unchanged on every other route.

**Regression**

- [ ] `/`, `/partnerships`, `/services`, `/case-studies`, `/audit/lifetime-learning-center` and `/proposal/pulse` are unchanged.
- [ ] The audit score test passes.

**Build**

- [ ] `npx tsc --noEmit`, `npx eslint .` and `next build` are clean.
- [ ] The impeccable audit passes.
