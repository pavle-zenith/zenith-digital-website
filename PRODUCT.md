# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (≈70% weight): business owners and decision-makers** at small and mid-sized companies in the UK, EU, and US who have outgrown a template, a DIY builder, or a site that looks acceptable but does not convert. They arrive cold from search or an AI answer engine, evaluating whether this agency is credible enough to hand a website project to. They are non-technical, price-aware, and checking claims. Success for them is a booked call or a submitted free audit.

**Secondary (≈30% weight): digital agencies, consultants, and freelancers** buying white-label production or a referral arrangement. They have their own dedicated track at `/partnerships` and their own application form. Owner's rule: agency buyers can always come through the direct-client path first, so when the two audiences compete for the same page or nav real estate, the business owner wins.

**Third audience: machines.** Google and answer engines (GPTBot, ClaudeBot, PerplexityBot, Google-Extended are all explicitly allowed) are treated as a first-class reader. Resolving "Zenith Digital" to one unambiguous entity is a stated product goal, not an SEO afterthought.

## Product Purpose

The site is Zenith Digital's own marketing site and its primary lead channel. It replaces the agency's former Wix Studio site with an owned, portable Next.js codebase, both to fix the SEO/LLM foundation Wix could not deliver and to serve as the working proof of the agency's custom-build tier.

Success is measured in qualified inbound: booked calls (`/book-a-call`, Cal.com), free website audit requests (`/free-website-audit`), and partner applications (`/partnerships`). Every route exists to move one of those three forward or to make the claims behind them checkable.

## Positioning

Zenith Digital is the results-driven **Wix Studio** agency, with custom builds as the up-tier. The credential is official and verifiable: **Wix Legend Partner** (the tier that puts it in roughly the top 1% of Wix builders), 100+ websites shipped, €1M+ tracked client revenue, 5.96x average ROAS.

The line that resolves the obvious objection is stated on the site, not hidden: Wix Studio experts who build custom when you outgrow it, and this site is what the custom work looks like.

Neighboring agencies cannot truthfully copy the combination of the Legend tier, the named-client numbers, and a self-built custom site standing as the portfolio piece for the up-tier.

## Operating Context

- **Live and indexed.** The Next.js site is what visitors and crawlers see at `thezenithdigital.com`. Cutover from Wix is done. Every change ships against real indexed URLs while the site serves traffic, so no change may break them.
- **One founder, one standard.** Pavle runs the agency from Belgrade, Serbia (`hello@thezenithdigital.com`, `+381 64 97 60617`), serving the UK, EU, and US. Building websites for businesses since 2019; Zenith Digital founded 2021.
- **The buyer's evaluation path** is: land from search or an AI answer → check the work (`/case-studies`) → check the claims (`/about`, `/testimonials`) → check price (the pricing tiers on the homepage; there is no standalone `/pricing` route) → book a call or request an audit. The footer's "Ask AI about Zenith" tiles deliberately hand that verification to a third-party assistant.
- **Sales artifacts:** Cal.com embed for booking; a hand-reviewed free audit delivered as a short video walkthrough, not an auto-generated PDF; a gated full-site white-label rate card shared only after a partner applies.
- **Private sales documents** live in the same codebase as their own surfaces: per-client proposals (`/proposal/[slug]`, which notify the owner when viewed), audit reports (`/audit/[slug]`), the partner showcase (`/partner-showcase`) and the project request form (`/project-request`). Every one is `noindex` with a matching `X-Robots-Tag` header, absent from the sitemap, never linked from the public site, and never links out to a client's live site. They are excluded from cookieless page-view analytics, and the privacy policy promises the proposal view notification is the only request those pages send about a visit.

## Capabilities and Constraints

**Stack (existing, not up for re-litigation):** Next.js 15 App Router, TypeScript, React Server Components, Tailwind v4, self-hosted fonts via `next/font/local`, deployed on Vercel. Forms are server actions writing to Supabase and notifying via Resend, with an in-memory per-IP rate limit. Analytics: GA4 (Google Consent Mode v2, cookieless pings until consent), PostHog and Microsoft Clarity, all behind the cookie banner; plus Vercel Web Analytics, which is cookieless, keeps no IP address, runs outside the consent gate, and skips `/studio` and `/proposal/`. The privacy policy (`content/legal.ts`) states each of these and must change with them.

**Content model (owner-confirmed, this decision supersedes CLAUDE.md §6):** page copy lives in `content/<page>.ts` files and stays there. Components read only from content. Sanity holds **blog posts only** (`post` is the single document type, by design) and the embedded Studio at `/studio` exists for that. Future sections are built as TS content files, not Sanity schemas. Do not build toward a page-module CMS.

**Routes in service:** `/`, `/about`, `/case-studies` + `[slug]`, `/services` + `[slug]` (which also carries the migration-guide spokes), `/partnerships`, `/blog` + `[slug]`, `/testimonials`, `/faq`, `/free-website-audit`, `/book-a-call`, `/privacy`, `/terms`, `/studio`.

**Hard constraints:**
- Indexed URLs must never be dropped. 301s in `next.config.ts` preserve the Wix-era paths; `/embed-test` is a deliberate 404.
- Structured data is load-bearing: one sitewide `Organization` and `WebSite` node, plus per-page schema. The entity description ("a Wix Studio web design agency based in Belgrade, Serbia, serving the UK, EU, and US") exists to defeat a real brand-collision problem seen in Search Console and must stay consistent everywhere it appears.
- Everything indexable is server-rendered. No client-only content that needs to be found.
- Unpublished migration guides stay authored in-repo behind `publish: false`, excluded from routing and the sitemap, rather than shipping as thin doorway pages.
- Numbers are dated and stated once. A fact confirmed on one page may not be restated differently on another.

**Undecided / owner-pending:** nothing open as of 17 November 2026. The build start window, the `/partnerships` risk-strip claims and the partner-story placeholders are all settled.

## Brand Commitments

- **Name and entity:** Zenith Digital. Always paired with a qualifier in titles ("Zenith Digital — Wix Studio Agency"). Meta titles use `|` as the separator.
- **Credential language:** "Wix Legend Partner" is the official, checkable label and leads; "top 1%" is the derived phrasing and is secondary.
- **Voice:** confident, direct, specific. Lead with numbers and outcomes, never adjectives. Short sentences, sentence case, contractions welcome. Banned outright: em dashes, AI filler ("elevate", "seamless", "cutting-edge", "leverage", "bespoke solutions", "in today's fast-paced digital landscape"), hollow superlatives, hedging ("we strive to"), exclamation marks, forced rule-of-three cadence, Title Case Everywhere, emoji in body copy.
- **Every claim is backed by a number or a named client, or it is cut.** Metrics may never be invented; owner-pending values ship as visible `[bracketed]` placeholders.
- Full build conventions and the design anti-pattern list live in `CLAUDE.md` (§7, §14, §15); the homepage is the reference implementation.

## Evidence on Hand

**Real, owner-supplied, usable:**
- Client results: Scottish Luxury Experience $521k in 7 months · Bel'Istria 257% more impressions · Knode AI raising a $10M Series A · Fort Lauderdale Dock Rentals 30+ warm leads.
- Aggregate: 100+ websites shipped, €1M+ tracked client revenue, 5.96x average ROAS, 3–4 week average launch, zero downtime since 2019.
- Named clients and logos: Knode, Techtonnik, MOD Digital, Capacity, Genroks, Stilby (`/public/logos-dark`, `/public/logos-white`).
- Real testimonials with real names, roles, companies and headshots, centralized in `content/testimonials-data.ts` and referenced everywhere else. Partner quotes on `/partnerships` come from this same source.
- Long-term fulfilment partnerships running since 2023: MOD Digital, Techtonnik, LMF HR.
- Screenshots of client work in `/public/portfolio-blocky`, served as WebP. The two leftover source PNGs there are unreferenced.
- Published case-study results beyond the four above (for example Hunting Brook Gardens and Genroks AI) live in `content/case-studies.ts`, the single source of truth for every client figure.
- Pricing, final and public: The Minimum from €1,250 (5 pages, 2 weeks) · The Studio €2,350 (12 pages, 5 weeks) · The Zenith custom/monthly. Landing pages from €750 retail (set 26 August 2026). Most builds start within a week of the call.
- Partner commercials, final: referral commission of 10%, paid when the client pays, rising to 15% after a partner's second closed deal in a year (retainers pay 10% of the first 3 months); 3-business-day feedback window; 2 revision rounds included, extra rounds €250; no minimum commitment; first project scoped within one business day; NDA before anything is shared; the same team on every project; up to four partner builds in parallel.
- Partner entry prices, public by owner decision: landing pages from €600 and production retainers from €1,099/month (30 hours). These are the only partner figures that ship.

**Deliberately absent, never to be fabricated:** the full-site white-label wholesale rate card (internal, shared only after a partner applies, must not appear in any content file or rendered page); unverified migration transfer tables.

## Product Principles

1. **Checkable beats impressive.** Every claim carries a number, a named client, or a link a stranger can verify. If it cannot be checked, it does not ship.
2. **Machines are a reader, not a channel.** Server-rendered content, consistent entity facts, and structured data are product requirements, because answer engines are a real acquisition path.
3. **The site is the portfolio.** This codebase is the proof for the custom-build tier, so its own craft and performance are commercial arguments, not internal polish.
4. **Owned and portable.** Content lives in the repo, in code the owner controls. Nothing meaningful gets locked into a vendor again.
5. **Two buyers, one priority.** Business owners lead at roughly 70/30; agency partners get a complete, self-contained track that never competes with the main pitch.

## Accessibility & Inclusion

Accessibility is an acceptance criterion, not a nice-to-have: body text contrast ≥ 4.5:1 and large text ≥ 3:1, full keyboard navigation with visible focus rings, semantic landmarks, alt text on all media, and `prefers-reduced-motion` disabling non-essential motion. Target Lighthouse ≥ 95 across all categories. Analytics and marketing storage stay denied until the visitor consents.
