# Zenith Digital — SEO & LLM Visibility Strategy

Built on your Google Search Console export (last 16 months) + the live site. This document answers: *where do you actually stand, what should you target, and how do you show up in both Google and LLMs (ChatGPT, Claude, Perplexity, Google AI Overviews).*

---

## 1. The honest read of your GSC data

Over the last 16 months: **~1,057 organic clicks and ~35,800 impressions.** That sounds like a base to build on. It isn't — here's what's underneath it:

- **99.8% of clicks and ~92% of query impressions are branded** — people searching some spelling of "Zenith" (zenith digital, zenith agency, zenit digital, etc.). Your organic traffic is almost entirely people who *already know your name*.
- **Non-branded, commercial search is effectively zero.** Every non-brand query you appear for — "digital agency web design," "web design wichita ks," "digital web agency" — sits at **position 34–90 (page 4–9) with zero clicks, ever.** You are not competing for any commercial keyword today.
- **Your brand itself is diluted.** A large share of your impressions come from Google confusing you with much bigger "Zeniths": Zenith Media / ZenithOptimedia (the Publicis global media agency — "zenith media," "zenith optimedia," "zenith publicis," "zenith media new york/london"), Zenith Electronics (the TV brand — "zenith electronic"), and "Zenith Digital Vision LLC" (a different company that pulled 63 of your clicks on its own name). You're the small fish in a crowded name.
- **A few pages rank but don't convert clicks.** `/case-studies` shows at position ~5.6 with 2,416 impressions and **0 clicks** — it's appearing for the wrong (brand-collision) queries and/or has a weak title/meta. Orphan pages `/webdesign` (4,726 imp), `/marketing` (4,596), `/branding` (2,942) rank on page 2 almost entirely for brand-adjacent terms.
- **Geography is noisy.** Your biggest impression source is the US (16,142 imp) at 1% CTR — mostly people looking for the *other* Zeniths. Real engaged clicks skew to UK, India, Canada, Serbia (brand), Australia. Your actual target markets (UK/EU/US business buyers) are barely represented in non-brand search.

**Bottom line:** You are not migrating away from a strong SEO position — you have almost no non-branded SEO position to lose. That's the reframe.

---

## 2. Why this is good news

Two things follow directly, and both are favorable:

**Migration risk is low.** The scariest part of a Wix→custom move is tanking existing rankings. But you rank for your brand and essentially nothing else, and brand terms will follow you as long as we keep the domain, redirect the orphan pages, and preserve metadata (all in the architecture plan). There's very little organic equity at risk — so the downside of moving is small and the upside is large.

**You're building on a clean slate, deliberately.** Everything from here is net-new. That means we get to design the keyword and page architecture *correctly from day one* instead of untangling years of accumulated mess. The `servicePage` / `industryPage` templates reserved in Phase 1 are exactly what turns this clean slate into a scalable engine.

---

## 3. The one strategic decision this forces: your Wix positioning

Here's the tension, stated plainly. Your **most winnable SEO and LLM territory is Wix-specific** — "Wix Studio agency," "Wix Studio developer for hire," "Wix Studio migration," "best Wix Studio agencies." That's where competition is thin, intent is high, and you have a genuine authority signal almost nobody else has: **Top 1% Wix Partner.** The Wix Partner directory / Wix Marketplace listing is precisely the kind of authoritative third-party source that Google and LLMs trust and cite.

But you're moving your *own* site to custom Next.js. If you also de-emphasize Wix in your positioning, you walk away from your single best wedge.

**Recommendation:** Keep Wix Studio as your core SEO/service wedge and lead offer. Position custom (Next.js) as a *premium tier* for clients who outgrow Wix — and use your own custom site as living proof you do both. The narrative writes itself: *"We're Wix Studio experts — and when you need to go fully custom, we build that too (our own site is proof)."* This keeps your authority, keeps your winnable keywords, and turns the migration into a credibility asset instead of a contradiction. This decision drives the keyword map below, so it's the one thing to confirm.

---

## 4. Keyword strategy — four tiers

Ordered by winnability. Don't chase Tier 3/4 until Tier 1/2 is working.

**Tier 1 — The Wix wedge (start here; highest ROI).** Thin competition, high buyer intent, your authority applies.
- `Wix Studio agency` / `Wix Studio agency UK`
- `hire Wix Studio developer` / `Wix Studio expert`
- `Wix Studio website design`
- `Wix Studio migration` / `migrate WordPress to Wix Studio`
- `Wix SEO` / `Wix Studio SEO`
- `Wix Studio ecommerce`
- `Wix Studio vs Webflow` / `vs Framer` / `vs Squarespace` / `vs WordPress` (comparison pages — double as LLM-citation bait)
- `best Wix Studio agencies` (target via directories + a listicle-style page)

**Tier 2 — Industry + Wix (your proof is strongest here).** Combine the wedge with your case-study verticals so each page ships with instant social proof.
- `SaaS website design` / `website design for startups`
- `travel & tourism website design`
- `website design for coaches / speakers`
- `online course website design`
- `multilingual website design`
- `marine / charter / booking website design`

**Tier 3 — Broad service terms (medium-term, more competitive).**
- `conversion-focused web design`, `website migration service`, `SEO agency for small business`, `web design agency [Edinburgh / UK]`

**Tier 4 — Generic head terms (long-term, don't prioritize).**
- `digital agency`, `web design agency`, `website design` — huge competition, low differentiation. Ignore until you have domain authority.

**Deprioritize entirely:** US-local terms you're accidentally appearing for ("web design wichita ks," "web design joliet il") — wrong geography, not your market.

---

## 5. Information architecture — the pages to build

This is the Phase 2 content engine, running on the Phase 1 `servicePage` / `industryPage` templates. Build in this order.

**Service pages (`/services/[slug]`) — Wix wedge first:**
1. Wix Studio Website Design
2. Wix Studio Migration (from WordPress / Squarespace / Webflow / Framer)
3. Wix Studio SEO
4. Wix Studio Ecommerce
5. Custom Website Development (the premium/Next.js tier)
6. SEO, GEO & PPC
7. Automations & Software

**Comparison pages (`/services/` or `/compare/`) — SEO + LLM double duty:**
- Wix Studio vs Webflow, vs Framer, vs Squarespace, vs WordPress
- (These rank well AND are exactly what LLMs quote when asked "should I use Wix Studio or Webflow?")

**Industry pages (`/industries/[slug]`) — each anchored to a real case study:**
- SaaS & Startups (→ Knode AI), Travel & Tourism (→ Scottish Luxury Experience, Bel'Istria), Marine & Charter (→ Fox Stays), Coaches & Speakers (→ Jim Steele), Online Courses (→ Hunting Brook Gardens), Multilingual/International (→ Stilby).

**Supporting content (`/blog`) — topic clusters that feed the service pages:**
- "How to migrate from WordPress to Wix Studio without losing rankings"
- "Wix Studio vs Webflow: honest comparison from a top-1% partner"
- "How much does a Wix Studio website cost?"
- "Is Wix Studio good for SEO?"
- Each post links up to the relevant service page (internal linking = ranking power).

---

## 6. Entity disambiguation — fix the "which Zenith?" problem

Critical for *both* Google (Knowledge Panel) and LLMs (which will otherwise merge you with Zenith Media / Zenith Electronics). The goal: make it unambiguous that **"Zenith Digital is a Wix Studio web design agency based in Belgrade, serving the UK, EU, and US."**

- **`Organization` structured data** sitewide with `legalName`, `logo`, `address`, `areaServed`, and `sameAs` links to every profile (LinkedIn, Instagram, Facebook, X, Clutch, DesignRush, Wix Partner profile, Google Business Profile).
- **Consistent NAP** (name, address, phone) identical across every platform — inconsistency is why Google can't build your entity.
- **A strong `About` page** stating exactly who you are, founders, founding year, locations, and what you do — this is your E-E-A-T anchor and what LLMs read to describe you.
- **Claim & optimize Google Business Profiles** for Edinburgh, Liverpool, and Belgrade.
- **Get listed (consistently) on** Clutch, DesignRush, The Manifest, and the Wix Marketplace/Partner directory — these are the authoritative sources both Google and LLMs lean on for "agency" entities.
- **Always pair the name with a qualifier** in titles/meta ("Zenith Digital — Wix Studio Web Design Agency") so you're not competing naked against bigger Zeniths.

---

## 7. LLM / AEO / GEO visibility plan

Showing up when someone asks Claude/ChatGPT/Perplexity "who are the best Wix Studio agencies?" comes from three things — none of which a website build alone creates, but all of which we can drive:

**a) Be ingestible (Phase 1, automatic).** Server-rendered pages, clean semantic HTML, structured data, FAQ blocks, and definitive factual statements. The Next.js migration alone is a major upgrade over Wix's JS-heavy rendering for LLM crawlers. Allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended` in robots.txt (your call — but required if you want LLM visibility).

**b) Be cited off-site (ongoing — this is where LLM ranking is actually won).** LLMs quote directories, review platforms, Reddit, and "best X" listicles far more than any single company site.
- Maximize reviews on Clutch / DesignRush / Google — volume and recency matter.
- Get into "top Wix Studio agencies / best Wix experts" listicles via light PR/outreach.
- Be genuinely helpful in communities LLMs crawl (Reddit r/wix, r/web_design; Wix forums) — not spam, real answers.
- Your **Top 1% Wix Partner** status is a strong, quotable credential — make sure it's stated on-site *and* on your Wix Partner profile.

**c) Publish quotable, structured content (Phase 2).** Comparison pages, "how to choose," pricing explainers, and FAQ-rich service pages give LLMs clean, extractable answers to lift — with your name attached.

**Measure it:** periodically ask ChatGPT/Claude/Perplexity your target questions ("best Wix Studio agency UK," "who can migrate my site to Wix Studio") and log whether you appear. (Tools like Otterly.ai or Peec.ai automate this if you want to track it properly later.)

---

## 8. Quick wins you can start *now* (independent of the build)

These don't require the new site and compound while we build:
1. Claim/optimize Google Business Profiles (Edinburgh, Liverpool, Belgrade).
2. Get listed on Clutch + DesignRush; start asking happy clients (Flynn Blackie, etc.) for reviews.
3. Optimize your Wix Partner / Marketplace profile with consistent NAP + the Top 1% badge.
4. Fix the `/case-studies` title/meta so it stops ranking with 0 clicks (even on the current site).
5. Standardize your name-plus-qualifier ("Zenith Digital — Wix Studio Agency") everywhere.

---

## 9. What's Phase 1 vs Phase 2 vs ongoing

| Work | When | Why there |
|---|---|---|
| SSR, clean URLs, metadata system | Phase 1 (build) | Baked into the stack; can't retrofit cheaply |
| Structured data + Organization/entity schema | Phase 1 | Needs to ship with the site |
| Redirects for orphan/legacy pages | Phase 1 (cutover) | Preserve hygiene at migration |
| `servicePage` / `industryPage` templates (empty) | Phase 1 | The reserved IA that makes P2 cheap |
| robots.txt LLM allowances + sitemap | Phase 1 | Ships with site |
| Google Business Profiles, Clutch/DesignRush, reviews | Now / ongoing | Independent of the build; compounding |
| Building the actual service/industry/comparison pages | Phase 2 | Content effort on the P1 templates |
| Blog topic clusters + internal linking | Phase 2 | Ongoing content |
| Listicle outreach, community presence, PR | Phase 2 / ongoing | Off-site, where LLM citations are won |
| GSC + LLM visibility monitoring | Ongoing | Measure and iterate |

**So to answer your original question directly:** the SEO/LLM *foundation* is Phase 1 (and non-negotiable — it's the whole point of the migration). The *growth engine* — the service/industry pages, content, and off-site citation work — is Phase 2 and ongoing. But because you're starting from near-zero, Phase 2 is where nearly all the actual traffic gains will come from. Phase 1 just makes sure the engine bolts on cleanly.

---

## 10. What I need from you to finalize this

1. **Confirm the Wix positioning call** in §3 (keep Wix as the wedge + custom as premium tier?). It drives the whole keyword map.
2. **Confirm target geographies** — I've assumed UK + EU + US business buyers, with local presence in Edinburgh/Liverpool/Belgrade. Correct?
3. Your call on whether to allow LLM crawlers (GPTBot/ClaudeBot/etc.) — recommended yes given your goal.
4. Any services or industries you want to prioritize (or exclude) that I haven't listed.
