# Zenith Digital — Website Build Instructions (for Claude Code)

> **How to use this file:** Place it at the repo root as `CLAUDE.md`. Put the current-site screenshots in `/reference/current-site/` and the inspiration screenshots in `/reference/inspiration/`. Read §12 for exactly how to treat those images. Three companion docs (Architecture, SEO & LLM Strategy, Design & Positioning) contain deeper detail and can be attached if needed — this file is written to stand alone.

---

## 1. Mission

Rebuild Zenith Digital's website — currently on Wix Studio — as a **custom, owned, portable Next.js + Sanity site** deployed on Vercel. The owner is non-technical, so **everything editable must live in Sanity**, not hardcoded. The build must ship with a proper SEO/LLM foundation from day one (the whole point of leaving Wix). Faithfully port the existing content, apply a **meaningful visual refresh** (see the style guide, §7), and add two new page types: **individual case studies** and a **white-label / partnerships** page.

Do not over-engineer. This is a marketing site, not an app. Favor clarity, speed, and editability.

---

## 2. Positioning & voice (read before writing any copy)

**Zenith is the premium Wix Studio agency — with custom builds as the up-tier.**

- **Core wedge:** *the* results-driven Wix Studio agency (authority: **Top 1% Wix Partner**, 100+ projects, €1M+ client revenue, 5.96x avg ROAS). This owns the SEO/LLM territory.
- **Up-tier:** custom design + build (this very site is the proof) for clients who outgrow Wix.
- **The line that resolves the "why isn't your site on Wix?" question:** *"Wix Studio experts who build custom when you outgrow it — and this site is what our custom work looks like."* Put this narrative on the site (About / services), don't hide it.

**Voice:** confident, direct, specific. Lead with numbers and outcomes, never adjectives. Short punchy sentences. No corporate filler, no "we are passionate about." Think Trueform/Squareblack tone: *the adults in the room.*

**Target market:** UK + EU + US business buyers; local presence Belgrade / Edinburgh / Liverpool.

---

## 3. Tech stack

- **Next.js 15**, App Router, **TypeScript**, React Server Components by default.
- **Tailwind CSS** with design tokens defined in `globals.css` / `tailwind.config.ts` (see §7 — never hardcode hex values in components; use tokens).
- **Sanity v3** embedded Studio at `/studio`, `next-sanity` for data fetching + live/visual editing, GROQ queries.
- **Vercel** hosting. Env vars for Sanity project ID / dataset / API token.
- **Fonts** via `next/font` (self-hosted, no layout shift).
- **Forms:** server actions or a route handler → email (Resend) or a webhook; no third-party form embeds unless necessary.
- **Analytics:** PostHog (already on the Zenith org) — add the snippet but keep it behind a consent check.

**Conventions:** small, reviewable commits; typed everything; a `README.md` written for a non-technical owner explaining how to run locally, edit content in Sanity, and deploy. Accessibility and Core Web Vitals are acceptance criteria, not nice-to-haves.

---

## 4. Repo structure (suggested)

```
/app                 # routes (App Router)
  /(site)            # public site
  /studio            # embedded Sanity Studio
/components          # UI components
/sanity              # schemas, client, queries, env
  /schemas
/lib                 # utils, seo helpers, structured-data
/reference           # current-site + inspiration screenshots (input)
/public              # logos, static assets, og images
CLAUDE.md            # this file
README.md            # non-technical owner guide
```

---

## 5. Information architecture & routes

| Route | Purpose |
|---|---|
| `/` | Homepage (blueprint in §9) |
| `/case-studies` | Index grid of all case studies |
| `/case-studies/[slug]` | **NEW** individual case study (template) |
| `/services/[slug]` | Service pages — build the template now, reserve for SEO pages |
| `/industries/[slug]` | Industry pages — template now, reserve for SEO pages |
| `/partnerships` | **NEW** white-label page (currently a 404 on live site; already in footer) |
| `/pricing` | Pricing tiers |
| `/about` | Founder/team + entity/E-E-A-T anchor |
| `/free-website-audit` | Lead-magnet page (tool logic can be Phase 2) |
| `/book-a-call` | Booking (keep existing embed) |
| `/blog`, `/blog/[slug]` | Structure now, populate later |
| `/privacy`, `/terms` | Legal |

**Taxonomy is locked:** service/industry pages use clean `/services/[slug]` and `/industries/[slug]`. Keyword targeting lives in the page title/H1/content, not the URL folder.

**Nav (borrow Flow Ninja's buyer-journey structure):** Work (Case Studies) · Services · Industries · Pricing · Partnerships · About · **Book a call** (primary CTA button). Footer carries the full link set + contact + locations.

---

## 6. Sanity content model

Implement these document types. Everything visible on the site that could change must be a field here.

**Singletons:** `siteSettings` (logo light/dark, nav, footer, contact, locations, socials, default SEO/OG), `homePage` (ordered module array — see §9).

**Documents:**
- `caseStudy` — `title`, `slug`, `client`, `industry`, `logo`, `heroImage`, `liveUrl`, `engagementType`, `timeline`, `challenge` (rich text), `approach` (rich text), `results[]` (`{label, value}`), `gallery[]`, `techUsed`, `testimonial` (ref), `featured` (bool), `publishedAt`, `seo`.
- `testimonial` — `quote`, `name`, `role`, `company`, `avatar`, `link`, `featured`.
- `service` — `title`, `icon`, `shortDescription`, `slug`.
- `servicePage` — `title`, `slug`, `h1`, `intro` (rich text), `whatYouGet[]`, `process`, `relatedCaseStudies[]` (refs), `faqs[]` (refs), `seo`, module builder. *(SEO growth enabler — lets the owner publish keyword pages with zero code.)*
- `industryPage` — same shape as `servicePage`, verticalized.
- `pricingTier` — `name`, `price`, `summary`, `features[]`, `deliveryTime`, `supportPeriod`, `cta`, `highlighted`.
- `partnerTrack` — `name`, `forWho`, `howItWorks`, `whatYouGet[]`, `pricing/turnaround`, `commercials`.
- `faq` — `question`, `answer`, `category`.
- `teamMember` — `name`, `role`, `photo`, `bio`, `socials`.
- `post` (blog) — standard fields.
- `page` — generic flexible page (audit, legal) via module builder.

**Shared modules** (for `homePage`/`page`/`servicePage` builders): hero, logoStrip, servicesGrid, statsBand, caseStudyShowcase, comparisonTable, pricingBlock, processSteps, guarantees, testimonials, teamBlock, faqBlock, ctaBand, richText.

---

## 7. Style guide & design system

**Design principles**
1. **Premium minimalism** — restraint over decoration. No gradient soup, no drop-shadow clutter.
2. **Type is the hero** — large bold headlines carry each section; generous whitespace; short copy blocks.
3. **Deep navy + white, alternating** — high-contrast premium minimal (DesignMe / Trueform lineage): deep-navy dark sections alternating with clean white ones. Neither is "primary" — the rhythm between them is the design.
4. **Motion shows the work** — smooth scroll reveals, autoplay muted case-study video/screenshots, subtle hover states. Animation demonstrates craft; it never decorates for its own sake. Respect `prefers-reduced-motion`.
5. **Specificity as design** — metrics, badges, review counts, client logos are first-class visual elements.
6. **One signature accent** — used sparingly for CTAs, active states, key numbers. Helps Zenith stand out from the monochrome competitors *and* strengthens brand recognition (fights the "which Zenith?" brand-collision problem seen in Search Console).

### Color tokens (deep navy + white, one accent)

Direction: premium minimal, high-contrast — **deep-navy dark sections alternating with clean white ones** (DesignMe / Trueform lineage). Keep the system to **a dark, a white, and a single accent**, plus **faint tints** of each for polish. The final accent is TBD ("we'll see") — **sample it from the logo in `/reference/current-site/`**; the value below is a placeholder that reads well on navy.

```css
/* Dark (deep navy) — primary dark sections */
--bg:            #0A1020;   /* deep navy base */
--surface:       #111A2E;   /* cards / elevated */
--surface-2:     #1A2540;   /* nested / hover */
--border:        rgba(255,255,255,.09);  /* hairlines on dark */
--text:          #F6F8FC;   /* near-white */
--text-muted:    #97A3BC;   /* cool grey-blue */

/* Light (white) — alternating sections */
--light-bg:      #FFFFFF;
--light-surface: #F4F6FA;
--light-text:    #0A1020;   /* the navy */
--light-muted:   #59637A;
--light-border:  #E6E9F1;

/* Accent (single) + faint variants — PLACEHOLDER, finalize from brand */
--accent:        #4E7CFF;   /* CTAs, active states, one key metric per section */
--accent-hover:  #6E93FF;
--accent-ink:    #08101F;   /* text on accent fills */
--accent-subtle: rgba(78,124,255,.12);  /* faint wash behind featured cards */
--accent-line:   rgba(78,124,255,.30);  /* faint accent hairline */

/* Feedback */
--positive:      #35C88C;   /* “results up” metrics */
```

Use the accent **sparingly** — CTAs, active nav, and one key number per section. Everything else is navy / white / greys. The faint `--accent-subtle` / `--accent-line` plus the surface tints are the **polish layer** (soft washes, hairline dividers, subtle elevation) — never bold fills. Verify contrast once the real accent is chosen.

### Typography

- **Display / headings:** **Saans** (self-hosted — owner has the font files). Load via `next/font/local`, map to `--font-display`, use for hero + all section headings. Place files in `/app/fonts/` (or `/public/fonts/`); never CDN-load (avoids FOUT/layout shift).
- **Body / UI:** **Inter** — use **Inter Display** (optical size) for large subheads/lead paragraphs and **Inter** for body + UI. Self-host or load via `next/font`.
- **Eyebrow labels / stat captions:** Saans or Inter, uppercase, letter-spacing ~.08em. (A mono is optional if you want a technical accent — not required.)

**Type scale (fluid, `clamp()`):**
```
display   clamp(2.75rem, 6vw, 5.5rem)   /* hero */
h1        clamp(2.25rem, 4.5vw, 3.75rem)
h2        clamp(1.75rem, 3vw, 2.5rem)
h3        1.5rem
body-lg   1.125rem
body      1rem
label     0.8125rem  (mono, uppercase, letter-spacing .08em)
```
Tight leading on display (1.05–1.1), comfortable on body (1.6). Max text measure ~68ch.

### Spacing, layout, shape
- Spacing scale: 4px base → `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Section vertical padding: `clamp(72px, 10vw, 160px)`.
- Container max-width `1280px`, gutter `24px`; full-bleed media may extend to ~`1440px` / viewport with inset.
- Radius: `--radius: 14px` (cards), `10px` (buttons), pills fully rounded.
- Borders: 1px hairlines using `--border`; avoid heavy shadows — use subtle elevation (`surface` vs `bg`) instead.

### Components
- **Primary button:** accent fill, `--accent-ink` text, radius 10px, medium weight, subtle scale/brightness on hover.
- **Secondary button:** transparent with `--border` outline, text `--text`; hover fills `--surface-2`.
- **Badge/pill:** small mono-label pill for "Top 1% Wix Partner", industry tags, service tags. Outline or `surface` fill.
- **Stat block:** oversized number (display or mono) in `--text` or `--accent`, small mono label beneath. Used in hero + proof band + case studies.
- **Case study card:** media-forward (screenshot/video), client logo, one headline metric, industry tag, hover reveal.
- **Nav:** sticky, slim, translucent-blur over dark; collapses to a clean mobile drawer.
- **Section rhythm:** deliberately alternate deep-navy and white sections down the page; sections lead with a bold Saans headline and concise support text. Use an eyebrow label only when it genuinely aids orientation, never by default (see §14).

### Accessibility
- Body text contrast ≥ 4.5:1, large text ≥ 3:1 (verify accent-on-dark and text-on-accent).
- Full keyboard nav, visible focus rings (accent), semantic landmarks, alt text on all media, `prefers-reduced-motion` disables non-essential motion.

---

## 8. SEO & LLM foundation (non-negotiable — ships with the build)

- **Server-render everything** (SSG/ISR). No client-only content for anything that should be indexed.
- **Per-page metadata** via Next `generateMetadata` — title, description, canonical, OG/Twitter (each editable in Sanity `seo` fields; sensible defaults from `siteSettings`).
- **Structured data (JSON-LD):** `Organization` + `WebSite` sitewide (include `sameAs` for LinkedIn, Instagram, Clutch, Wix Partner profile, Google Business Profile); `Service` on service pages; `Review`/`AggregateRating` on testimonials; a case-study schema per detail page; `FAQPage` where FAQs appear; `BreadcrumbList`.
- **Entity clarity (fixes the brand-collision problem):** the About page and Organization schema must unambiguously state *"Zenith Digital is a Wix Studio web design agency based in Belgrade, serving the UK, EU, and US."* Always pair the name with a qualifier in titles ("Zenith Digital — Wix Studio Agency").
- **`sitemap.xml`** (auto from Sanity content) and **`robots.txt`** — **allow** `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` (LLM visibility is a stated goal).
- **301 redirects** in `next.config` — preserve URL equity. Known orphan pages from Search Console to redirect:
  - `/webdesign` → `/services/wix-studio-website-design`
  - `/marketing` → `/services/seo-geo-ppc`
  - `/branding` → `/services/[branding-or-nearest]`
  - `/contact-us` → `/contact`  ·  `/discovery-call` → `/book-a-call`  ·  `/embed-test` → drop
  - Keep 1:1 slugs (`/case-studies`, `/testimonials`) identical.
- **Performance:** target Lighthouse ≥ 95 across the board; optimized `next/image`; lazy-load below-the-fold media.

---

## 9. Homepage blueprint

Ordered modules (each a Sanity module in `homePage`):
1. **Hero** — bold display headline stating the Wix-Studio-agency positioning + "Top 1% Wix Partner" badge + trust metrics (100+ projects · 3–4 wk launch) + primary "Book a call".
2. **Client logo strip** — monochrome, auto-scroll.
3. **Why Zenith** — the comparison-matrix content reframed as a confident stance (vs agencies/freelancers).
4. **Services, productized** — Wix Studio design / migration / SEO+GEO / automations, each with scope + timeline; custom build shown as the premium up-tier.
5. **Featured case studies** — media-led cards, one hard metric each, industry visible.
6. **Named process** — the 4 steps, branded (give the process a name).
7. **Proof band** — €1M+ revenue · 5.96x ROAS · 7yr zero downtime · review count.
8. **Pricing preview** — three tiers with timelines, "from €2,500".
9. **Founder / team** — faces + the human story (new; from DesignMe/Crawford/Squareblack).
10. **Testimonials** — headshots + outcomes.
11. **Free audit** — lead-magnet callout.
12. **FAQ → final CTA band → footer.**

---

## 10. Case study pages

- **Index (`/case-studies`)** — grid of all `caseStudy` docs, filterable by industry; each card links to the detail page (keep the live-site link *inside* the detail page).
- **Detail (`/case-studies/[slug]`)** — hero (client, logo, one-line result) → challenge → approach/what we did → **results block (hard numbers)** → visual gallery/screenshots → embedded testimonial → tech used → "view live site" + "book a call" CTAs. Fully driven by the `caseStudy` schema. Content will be supplied by the owner per case study.

---

## 11. White-label / Partnerships page

Model the **structure** on allioo's proven white-label page, but position **a tier up** (premium builds + real results, not template flips). Sections in order:
1. **Hero** — "Partner with the team behind 150+ launches. You deliver. We build." + "Apply to partner" CTA.
2. **How it works** — 4 steps (brief → design direction → agency reviews wireframe/stays invisible → build handed off under partner's brand).
3. **Two tracks** (from `partnerTrack`): **White-Label Production Partner** (agencies resell Zenith builds under their brand — unbranded deliverables, NDA, dedicated PM, SLAs, partner pricing) and **Referral Partner** (send a lead, earn a commission; Zenith delivers under its own brand).
4. **What partners get** — white-label deliverables, fast turnaround, protected margin, dedicated contact.
5. **Partner expectations** — clear terms (feedback windows, revisions, comms ownership).
6. **Proof** — partner testimonials (e.g. John Smyth / AdVantage) + results.
7. **FAQ** (with `FAQPage` schema).
8. **Application form** — agency name, contact, site, track/tier interest, use case → email/CRM.

All commercial terms (prices, margins, turnarounds, revision limits) are **placeholders** for the owner to set; make them Sanity fields.

---

## 12. How to use the provided screenshots

- **`/reference/current-site/` (Zenith's live Wix site):** the **source of truth for content and brand.** Extract exact copy, metrics, service descriptions, testimonials, and case-study references. **Sample the brand accent color and logo** here and reconcile the §7 color tokens to the real brand. (Fonts are already decided — Saans display + Inter body — so no need to sample type.) Faithfully port every section (see §9 and the companion Architecture doc for the full section inventory).
- **`/reference/inspiration/` (Trueform, DesignMe, Flow Ninja, by Crawford, Squareblack, allioo):** the **aesthetic North Star** — emulate the *qualities* (type scale, whitespace, restraint, motion that shows work, metric-forward layouts, productized service tiers), **not** the exact layouts. Do not clone any single site; synthesize Zenith's own premium-minimal identity from the §7 system.

---

## 13. Definition of done

- [ ] All routes in §5 build and render, server-side, with real Sanity content.
- [ ] Every visible content string is editable in Sanity (nothing marketing-facing hardcoded).
- [ ] Design tokens (§7) implemented; accent reconciled to the real brand; deep-navy + white alternating sections; Saans (self-hosted) + Inter wired via `next/font`.
- [ ] Case study index + detail template working from `caseStudy` docs.
- [ ] White-label page complete with two tracks + application form.
- [ ] `service`/`industry` page templates exist (even if unpopulated).
- [ ] SEO foundation (§8): metadata, JSON-LD, sitemap, robots (LLM bots allowed), 301 redirects, Lighthouse ≥ 95.
- [ ] Responsive + accessible (keyboard, contrast, reduced-motion).
- [ ] `README.md` for a non-technical owner (run, edit, deploy).
- [ ] Deployed to Vercel on `thezenithdigital.com` (or a preview domain pre-cutover).

## 14. What NOT to do

**Build rules**
- Don't hardcode content that should be in Sanity.
- Don't clone any inspiration site pixel-for-pixel.
- Don't ship client-rendered content that needs to be indexed.
- Don't invent case-study metrics. Use only owner-supplied real data; leave clear placeholders otherwise.
- Don't drop or 404 existing indexed URLs. Redirect them (§8).
- Don't reach for heavy animation libraries or page builders that fight the owner's ability to edit in Sanity.

**Design anti-patterns (avoid the generic AI / template look)**
- **No heavy or glowy drop shadows.** Elevation comes from surface tints and 1px hairline borders, not shadows. If a shadow is ever needed, one barely-perceptible token only.
- **No decorative gradients.** No multi-stop or purple/blue "AI" gradients, no gradient text, no mesh gradients, no glowing orbs/blobs, no aurora or starfield backgrounds, no glassmorphism. Flat, confident color from the token set. A single-hue, very faint wash (`--accent-subtle`) is the only permitted gradient-like effect.
- **No stock-AI visual clichés:** floating 3D shapes, isometric illustrations, neon grids, generic stock hero photography, emoji used as icons. Use real client work, real logos, real team photos.
- **No reflexive eyebrows.** Don't slap a small label above every section. Use one only when it truly orients the reader; most sections are stronger with just the headline. Never filler eyebrows like "Our Services" over a services section.
- **No repetitive card-grid monotony:** not every section is three equal cards or icon-in-a-rounded-square rows. Vary composition; use editorial asymmetry, not centered-everything.
- **No bubbly over-rounded UI** and no default radius on everything. Keep radii restrained per §7.
- **No over-animation:** no scroll-jacking, no parallax on everything, no letter-by-letter text reveals. Motion is subtle, purposeful, and respects `prefers-reduced-motion`.
- **No purple dark-mode drift.** Stay in the navy / white / single-accent system.

**Copy anti-patterns (no "AI voice")**
- **No em dashes.** Rewrite with periods, commas, or shorter sentences.
- **No AI filler or clichés:** "in today's fast-paced digital landscape," "elevate," "unlock/unleash," "take your business to the next level," "we're passionate about," "seamless," "cutting-edge," "robust," "leverage," "empower," "delve," "game-changer," "bespoke/tailored solutions," "one-stop shop," "at the end of the day."
- **No hollow superlatives.** Every claim is backed by a number or a named client, or it's cut.
- **No hedging** ("we strive to," "we aim to"). Say it plainly and confidently.
- **No hype punctuation.** Skip exclamation marks and peppy energy; confident, not cheerful.
- **No forced rule-of-three cadence** ("faster, smarter, better") on everything. It's a tell.
- **No Title Case Everywhere.** Sentence case for headings and human phrasing throughout.
- **No emoji in body copy**, no "Lorem ipsum" or invented figures shipped to production. Contractions are welcome; write like a sharp human, not a brochure.
