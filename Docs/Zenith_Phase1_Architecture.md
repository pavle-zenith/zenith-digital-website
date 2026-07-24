# Zenith Digital — Phase 1 Site Architecture

**Migration:** Wix Studio → Next.js + Sanity
**Scope of this document:** the structural plan only — how the *existing* site's sections and assets map into the new stack, the content model behind it, and where the two new pages (White‑Label / Partnerships and individual Case Studies) slot in. Visual enhancement/redesign is your next step and is deliberately left open here.

---

## 1. Guiding principle for this pass

Port faithfully first, enhance second. Every section and asset that exists on the live site today gets a defined home in the new architecture before anything is redesigned. This protects two things: your SEO (nothing silently disappears) and your content (you edit it in Sanity, not in code). Once the skeleton is faithful and everything is editable, you can restyle freely without touching structure.

---

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router, TypeScript) | Industry standard, huge talent pool, great SEO, any dev/AI can maintain it |
| Styling | Tailwind CSS + design tokens | Fast to restyle; tokens hold your brand colors/fonts in one place |
| CMS | Sanity v3 (embedded Studio) | Visual editing panel for all content; you own the data, exportable anytime |
| Data layer | next-sanity (with live preview) | Edit in Studio, see changes without a developer |
| Hosting | Vercel | One-click deploys from Git, managed, ~zero ops |
| Repo | Git (GitHub), owned by you | Portability — hand it to any developer or AI later |
| Analytics | PostHog (already on your Zenith org) | Wire up in Phase 2 |

Everything above is mainstream and open. If Claude, or any single tool, ever went away, this exact stack is maintainable by essentially any web developer.

---

## 3. Sitemap: current → new

The live site's URLs are preserved wherever they exist so rankings carry over. New routes are marked **NEW**.

| Current page | New route | Notes |
|---|---|---|
| Home | `/` | Port all sections (section inventory below) |
| Case Studies (grid) | `/case-studies` | Becomes an index that links to real detail pages |
| — | `/case-studies/[slug]` | **NEW** — individual case study pages |
| Testimonials | `/testimonials` | Port; testimonials become reusable content |
| Free Website Audit | `/free-website-audit` | Port funnel page (form logic in Phase 2) |
| Get A Website / Pricing | `/pricing` (+ confirm current slug) | Port pricing tiers |
| Book a Website Call | `/book-a-call` | Port; keep booking embed |
| Partnerships (currently 404) | `/partnerships` | **NEW** — white-label page (already linked in your footer) |
| Blog | `/blog` | Structure now, populate in Phase 2 |
| Templates | `/templates` | Phase 2 |
| Privacy / Terms / Sitemap | `/privacy`, `/terms`, `/sitemap` | Port legal pages |
| — | `/services/[slug]` | **NEW (reserved in P1, populated P2)** — SEO service pages |
| — | `/industries/[slug]` | **NEW (reserved in P1, populated P2)** — SEO industry pages |

**Locked taxonomy decision:** service and industry pages use the clean, human-readable `/services/[slug]` and `/industries/[slug]` structure rather than keyword-stuffed root slugs. This is cleaner for users, better for LLM comprehension (clear topical hierarchy), and lets us build unlimited pages under a predictable pattern. The *keyword* targeting lives in the page's title/H1/content, not the URL folder — so we get SEO value without an ugly, unscalable URL scheme. (See the SEO & LLM Strategy doc for which specific service/industry pages to build.)

**Orphan pages found in Google Search Console** (not in current nav, still indexed — must be redirected): `/webdesign` (4,726 impressions), `/marketing` (4,596), `/branding` (2,942), `/contact-us` (585), `/discovery-call` (12), `/embed-test` (27). These are handled in §7.

> Action item: I'll crawl the live Wix site to produce the *complete* URL inventory (including any pages not in the nav) so the redirect map in §7 is exhaustive. The GSC export already surfaced the orphan pages above.

---

## 4. Homepage section inventory (port targets)

Every block currently on the homepage, in order, with the content it holds. Each becomes an editable module in Sanity.

1. **Hero** — headline ("We create Wix Studio websites that work as hard as you do"), subhead, primary CTA (Book a Call), secondary CTA. Trust metrics: *3–4 weeks to launch*, *100+ projects*, *Top 1% Wix Partner*.
2. **Services / What we do** — four offerings: Website Design & Development; SEO, GEO & PPC; Automations & Software; Website Migration & Redesigns. Each has a title + description.
3. **Results / proof stats** — €1M+ revenue generated, 5.96x average ROAS, ~25 hrs/week saved, 5x cost reduction.
4. **Featured case studies** — highlight cards (Flynn Blackie 220% bookings, KnodeAI $10M Series A, dock rental automations).
5. **Comparison matrix** — Zenith vs agencies vs freelancers (consistent team, 24h response, no turnover, copywriting included, 30+ days support).
6. **Pricing preview** — The Minimum (€2,500), The Studio (€4,500), The Zenith (custom).
7. **Process** — 4 steps: free 20‑min call → intake form → same-day proposal → design/build/launch.
8. **Guarantees / trust** — 7-yr zero downtime, SSL/hardened infra, Zapier-ready, self-manageable content, no licensing traps, ~£150/yr hosting, AI-readable structure, clean handover docs.
9. **Testimonials** — Flynn Blackie, John Smyth, Uros Stanimirovic (+ others from the testimonials page).
10. **FAQ** — investment rationale, timeline, post-launch editing, international clients, support.
11. **Final CTA band** — book a call / free audit.
12. **Footer** — Company (Solutions, Case Studies, Partnerships, Pricing), Resources (Templates, Free Audit, Blog), Legal (Sitemap, Privacy, Terms), contact (hello@thezenithdigital.com, +381 64 97 60617), locations (Belgrade, Edinburgh, Liverpool), © 2026.

---

## 5. Asset inventory to migrate

Assets to pull off Wix and re-home (into Sanity's media library or the repo's `/public`):

- Zenith logo (light/dark variants), favicon, any wordmark.
- Client logos for all case studies: Knode AI, Scottish Luxury Experience, Bel'Istria, Fox Stays / Fort Lauderdale Dock Rental, Techtonnik, Jim Steele, Hunting Brook Gardens, Stilby, Capacity.
- Testimonial headshots: Flynn Blackie, John Smyth, Uros Stanimirovic, Jack Shorrock, and any others.
- Partner/"industry-leading companies" logo strip.
- Hero and section imagery/graphics, icons for the four services, process illustrations.
- Any brand fonts and the exact brand color palette (I'll extract the current hex values + typefaces during scaffolding so tokens match before you restyle).
- OG/social share images per page.

> Action item: I'll produce an asset checklist during the crawl so we can confirm nothing is missed and flag anything that needs a higher-res re-export.

---

## 6. Sanity content model

Document types (what you'll edit in Studio) and the key fields each holds.

**Singletons (one of each):**
- `siteSettings` — logo, nav links, footer columns, contact info, locations, social links, default SEO/OG.
- `homePage` — ordered list of the section modules from §4 (a page-builder array, so you can reorder/toggle sections without code).

**Reusable documents (many):**
- `caseStudy` — `title`, `slug`, `client`, `industry`, `logo`, `heroImage`, `liveUrl`, `engagementType`, `timeline`, `challenge` (rich text), `approach` (rich text), `results` (array of `{metric label, value}`), `gallery` (images), `techUsed`, related `testimonial` (reference), `featured` (boolean for homepage), `publishedAt`, SEO fields.
- `testimonial` — `quote`, `name`, `role`, `company`, `avatar`, optional link, `featured`.
- `service` — `title`, `icon`, `description`, optional detail.
- `pricingTier` — `name`, `price`, `summary`, `features[]`, `deliveryTime`, `supportPeriod`, `ctaLabel/href`, `highlighted`.
- `faq` — `question`, `answer`, `category`.
- `partnerTrack` — for the white-label page: `name`, `who it's for`, `how it works`, `whatYouGet[]`, `commercials` (placeholder terms).
- `servicePage` — **the SEO growth enabler.** `title` (keyword-targeted), `slug`, `h1`, `intro` (rich text), `whatYouGet[]`, `process`, `relatedCaseStudies` (references), `faqs` (references), `seo` fields, module builder for flexibility. Lets you publish a new keyword-targeted service page from Sanity with zero developer involvement.
- `industryPage` — same shape as `servicePage` but for verticals (SaaS, travel, marine, etc.), with `relatedCaseStudies` filtered to that industry for instant proof.
- `page` — generic flexible page (audit, legal, templates) using the same module system.

> The `servicePage` / `industryPage` templates are built in Phase 1 (empty), so the entire Phase 2 content engine is "fill in a form in Sanity," not "hire a developer for each page." This is the single most important architecture decision for your SEO goal.

**Shared modules** (used inside `homePage`/`page` builders): hero, servicesGrid, statsBand, caseStudyShowcase, comparisonTable, pricingBlock, processSteps, guarantees, testimonialsBlock, faqBlock, ctaBand, logoStrip, richText.

This model captures 100% of the current site as data. Restyling later = editing components/tokens; the content stays put.

---

## 7. SEO / redirect migration plan

You publicly promise clients "zero indexing surprises," so this one has to be textbook.

1. **Full URL inventory** — crawl the live Wix site to list every indexed URL (nav pages + any orphan/blog/landing pages). GSC already revealed live-but-orphaned pages: `/webdesign`, `/marketing`, `/branding`, `/contact-us`, `/discovery-call`, `/embed-test`.
2. **Redirect map** — every old URL → new URL as a **301** in `next.config`. Keep slugs identical where a page maps 1:1 (`/case-studies`, `/testimonials`, etc.). Orphan mappings: `/webdesign` → `/services/[web-design]`, `/marketing` → `/services/[marketing]`, `/branding` → `/services/[branding]`, `/contact-us` → `/contact`, `/discovery-call` → `/book-a-call`, `/embed-test` → drop (test page, no redirect needed). **Note:** the impressions on these orphan pages are almost entirely brand-collision noise, so preserving them is about hygiene, not lost traffic (see Strategy doc).
3. **Metadata parity** — carry over each page's `<title>`, meta description, and canonical; set per-page OG/Twitter images.
4. **Structured data** — `Organization` + `WebSite` sitewide; `Review`/`AggregateRating` on testimonials; a case-study schema per detail page.
5. **Sitemap + robots** — auto-generated `sitemap.xml` and `robots.txt`.
6. **Cutover** — keep the domain `thezenithdigital.com`, switch DNS to Vercel, submit the new sitemap in Google Search Console, and watch coverage/redirects for 2–4 weeks.

---

## 8. New page — Case Studies (index + detail)

**Index (`/case-studies`)** — port the current grid (all 9 clients), each card linking to a real detail page instead of straight out to the client's live site (keep the live-site link *inside* the detail page as a CTA).

**Detail (`/case-studies/[slug]`)** — a repeatable template driven by the `caseStudy` schema: hero (client, logo, one-line result), the challenge, the approach/what Zenith did, a results block (the hard numbers), a visual gallery/screenshots, the client's testimonial, tech used, and a "view the live site" + "book a call" CTA.

You said you'll provide the real data — §10 is the intake template so you know exactly what to gather per client.

---

## 9. New page — White-Label / Partnerships (proposed model)

You asked me to shape this. Here's a two-track structure that fits what your site already implies (the John Smyth / AdVantage relationship reads as white-label today):

**Track A — White-Label Production Partner (for agencies).** Marketing, SEO, design, or dev shops resell Zenith builds under *their* brand. Zenith is the invisible production team: unbranded deliverables, NDA, a dedicated PM/comms channel, agreed turnaround SLAs, and partner (wholesale) pricing so they keep margin and the client relationship. Best fit: agencies with demand but no web-build capacity, or overflow needs.

**Track B — Referral Partner (for freelancers/consultants/past clients).** Send a qualified lead, earn a commission on close (e.g., 10–15% of project value — placeholder, you set it). Zenith delivers under the Zenith brand. Best fit: brand designers, photographers, consultants, happy past clients.

**Page structure:** hero ("Partner with the team behind 150+ launches") → how it works (3 steps) → the two tracks side by side → what partners get (white-label deliverables, fast turnaround, dedicated contact, protected margin) → proof (John Smyth quote + any partner results) → FAQ → apply CTA (form → Phase 2). All commercial terms above are placeholders for you to confirm.

---

## 10. Case study data intake template

For each of the 9 case studies, gather:

| Field | What to provide |
|---|---|
| Client name & logo | Company name + high-res logo file (SVG/PNG) |
| Industry | e.g. SaaS/AI, Travel, Marine |
| Live URL | Current site link |
| Engagement type | New build / migration / redesign / ongoing |
| Timeline | e.g. "3 weeks to launch" |
| The challenge | 2–4 sentences on the starting problem |
| What we did | Scope — build, SEO, automations, migration, etc. |
| Results (hard numbers) | Before/after metrics with real figures (bookings, revenue, ROAS, impressions, pipeline) |
| Screenshots / visuals | 2–5 images of the work |
| Client quote | Testimonial + name, role, company, headshot |
| Tech / features | CMS, booking, multilingual, integrations |
| Permission | OK to publish name + numbers? |

---

## 11. Suggested build sequence (after you approve this architecture)

1. **Foundation** — Next.js + Sanity + Vercel scaffold, brand tokens extracted from the live site, Studio deployed.
2. **Content model** — implement the §6 schemas so you can start entering content immediately.
3. **Port pages** — homepage sections, testimonials, pricing, audit, book-a-call, legal (faithful, un-enhanced).
4. **New pages** — case study index + detail template; white-label page.
5. **Content population** — you supply case study data via §10; enter into Sanity.
6. **SEO cutover** — redirects, metadata, sitemap, DNS switch, Search Console.
7. **Handover** — repo access + a plain-English README on how to run and edit everything.

**Then Phase 2 (your enhancement + growth):** the redesign pass, blog, Free Website Audit tool, lead-capture forms, templates library, and PostHog analytics.

---

## 12. What I need from you to proceed

- Confirm this architecture is faithful — anything on the live site I've missed or mis-mapped?
- Access plan: a GitHub account/org to own the repo, and whether you want me to create the Sanity project now (I can, via the connected Sanity tools).
- The nine case studies' real data (template in §10) — can trickle in; not a blocker to scaffolding.
- Your call on the white-label commercial terms (or leave them as placeholders for launch).
