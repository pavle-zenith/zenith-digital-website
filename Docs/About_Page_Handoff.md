# `/about` — build handoff for Claude Code

**For:** Zenith Digital website (Next.js 15 App Router, content files in `content/`)
**Written:** 17 August 2026
**Why this page exists:** it is the entity anchor. Google and LLMs currently resolve "Zenith Digital" ambiguously (brand collision, CLAUDE.md §8), and the site states its experience five different ways in five different places. This page is the one URL that says who the company is, where it is, how long it has existed, and which claims are independently checkable. It also removes a sitewide footer 404.

Build it before the site is re-indexed.

---

## 0. OWNER INPUT REQUIRED before this page ships

Three facts are not in the codebase and must not be invented. Get them from Pavle first.

| # | Question | Why it matters |
|---|---|---|
| 1 | **What year was Zenith Digital founded?** | `foundingDate` in Organization schema, and the timeline section. The site currently implies 2021 ("Wix Professionals since 2021", "100+ sites since 2021") but never states it. |
| 2 | **Registered trading entity and country of registration.** | International buyers making €2,500+ decisions look for this. Goes in the footer of the About page, not the schema, unless a `legalName` is confirmed. |
| 3 | **Is "Top 1% Wix Partner" backed by a Wix-issued source we can link to?** | If the official Wix tier label is different (e.g. "Legend Partner"), use the official label prominently and keep the percentage only where it is verifiable. The Wix Partner profile is already linked from `content/founder.ts`. |

**One inconsistency to resolve at the same time:** the site claims "in seven years we've never had a production site go down" (`content/faq.ts:144`, `content/home.ts:528`). Seven years matches Pavle's personal record from 2019. If Zenith Digital was founded in 2021, that is a founder track record, not a company one, and the copy should say so. Fix it in those two places while you are here.

---

## 1. Verified entity facts (use these exact figures)

These are now consistent across the codebase after the 17 Aug corrections. Do not restate them differently on this page.

| Fact | Value | Already used at |
|---|---|---|
| Founder | Pavle Maodus | `content/founder.ts` |
| Building websites since | **2019** (seven years) | `founder.ts`, `home.ts` |
| Wix Partner since | **2021** (five years) | `home.ts:132` |
| Wix Partner ranking | Top 1% | throughout |
| Websites shipped | 100+ | throughout |
| Tracked client revenue | €1M+ | throughout |
| Average ROAS, managed campaigns | 5.96x | throughout |
| Production downtime | None in seven years | `faq.ts:144` |
| HQ | Belgrade, Serbia | `lib/schema.ts` |
| Presence | Edinburgh, Liverpool | `llms.txt`, footer clocks |
| Markets served | UK, EU, US | `organizationSchema.areaServed` |
| Reviews | Trustpilot, **no score stated** | owner decision, Aug 2026 |
| Starting price | From €2,500 | `content/services.ts` |

**Never write:** "ten years", "10 years", "$10M raised" (Knode is *currently raising*), or any Clutch reference.

Long-standing partner relationships, if you want them on the page:

- MOD Digital, since 2023, 10+ brands shipped together
- Techtonnik, since 2023, 10+ websites and 2 web apps
- LMF HR, since 2023, 15+ websites delivered
- Wellington Web Co, since 2025, 10 projects delivered
- AdVantage (John Smyth)

---

## 2. Route and file plan

```
app/about/page.tsx          NEW  — route, metadata, JSON-LD, section composition
content/about.ts            NEW  — every visible string on the page
components/sections/AboutHero.tsx      NEW
components/sections/AboutTimeline.tsx  NEW
```

That is **two new components**. Everything else on this page must be an existing component. See §5.

---

## 3. Metadata

```ts
export const metadata: Metadata = {
  title: "About Zenith Digital: Wix Studio Web Design Agency",
  description:
    "Zenith Digital is a Wix Studio web design agency in Belgrade, run by Pavle Maodus. Top 1% Wix Partner, 100+ websites shipped for UK, EU and US clients.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About Zenith Digital: Wix Studio Web Design Agency",
    description:
      "A Wix Studio web design agency in Belgrade, run by Pavle Maodus. Top 1% Wix Partner, 100+ websites shipped.",
  },
};
```

Title is 49 characters, description 151. Brand sits at the front here, so no trailing `| Zenith Digital`.

---

## 4. Section order

Deep-navy and white alternate per CLAUDE.md §7.3. Suggested rhythm in brackets.

1. **About hero** [navy] — the entity statement
2. **Founder** [light] — reuse `FounderSection`
3. **Timeline** [light] — the dated-facts block, the SEO payload of this page
4. **Numbers** [navy] — the proof band
5. **How we work** [light] — what the company actually does and does not do
6. **Platform status and partners** [navy] — Wix Studio, Shopify Partners, agency partners
7. **Selected work** [light] — reuse `WorkStrip` or `ProjectsSlider`
8. **Testimonials** [light] — reuse `Testimonials`
9. **Entity FAQ** [navy] — reuse `Faq`
10. **CTA band** — reuse `CtaBanner`

---

## 5. Component reuse — read this before writing any JSX

This repo has a full section and UI library. The failure mode on this page is rebuilding things that already exist. **Import, do not recreate:**

| Need | Use this, already built |
|---|---|
| Section wrapper, padding, theme | `components/ui/Section.tsx` |
| Max-width gutter | `components/ui/Container.tsx` |
| Heading + support text pair | `components/ui/SectionHeader.tsx` |
| Small uppercase label | `components/ui/Eyebrow.tsx` (§14: only where it genuinely orients) |
| Badge / tag | `components/ui/Pill.tsx` |
| Oversized number + caption | `components/ui/StatBlock.tsx` |
| Buttons | `components/ui/Button.tsx` |
| Checklist rows | `components/ui/DividedList.tsx` |
| Verified/check icon | `components/ui/VerifiedCheck.tsx` |
| Founder block | `components/sections/FounderSection.tsx` |
| Client logo marquee | `components/sections/ClientLogos.tsx` |
| Work strip / slider | `components/sections/WorkStrip.tsx`, `ProjectsSlider.tsx` |
| Testimonials | `components/sections/Testimonials.tsx` |
| FAQ accordion | `components/sections/Faq.tsx` |
| Final CTA band | `components/sections/CtaBanner.tsx` |

`AboutHero` should follow the pattern in `CaseStudiesHero.tsx` (heading + muted continuation + support + stat row). `AboutTimeline` is the only genuinely new layout.

Before writing either new component, open `CaseStudiesHero.tsx` and `components/sections/service/ServicePageProcess.tsx` and match their conventions: token classes only, no hardcoded hex, `font-display` for headings, hairline borders rather than shadows.

---

## 6. Copy (ship as written, §14-compliant)

All of this goes in `content/about.ts`. No em dashes, sentence case headings, no filler.

### 6.1 Hero

```
heading: "Zenith Digital is a Wix Studio web design agency"
headingMuted: "based in Belgrade, working with businesses across the UK, EU and US."

support: "One founder, one standard, and a public record you can check. Top 1%
Wix Partner ranking, 100+ websites shipped, and every number on this site
traceable to a named client."

stats:
  100+      Websites shipped
  Top 1%    Wix Partner ranking
  €1M+      Tracked client revenue
  Belgrade  Home base

ctas: "Book a call" (primary, /book-a-call) · "See the work" (secondary, /case-studies)
```

### 6.2 Founder

Reuse `FounderSection` with `founderServices` from `content/founder.ts`. No new copy needed. The paragraphs there were corrected on 17 Aug and already say "since 2019".

### 6.3 Timeline

Heading: `"How we got here"`
Intro: `"The dates behind the numbers, so you can check them rather than take our word for it."`

| Year | Copy |
|---|---|
| 2019 | "Pavle starts building websites for businesses. The first clients are small service companies in Serbia and the UK." |
| 2021 | "Wix Partner status. The work consolidates around Wix Studio, and the agency's positioning follows it." |
| **[FOUNDED]** | *(pending owner answer, §0)* |
| 2023 | "Long-term fulfilment partnerships begin. MOD Digital, Techtonnik and LMF HR still run today." |
| 2025 | "Top 1% Wix Partner ranking. 100+ websites shipped, €1M+ in tracked client revenue across them." |
| 2026 | "Zenith moves its own site off Wix to a custom Next.js build. The Wix Studio work continues, and this site is what the custom tier looks like." |

That last row is the answer to "why isn't your site on Wix?" (CLAUDE.md §2) and it belongs here.

### 6.4 Numbers band

Heading: `"The record, in numbers"`

```
100+    Websites shipped since 2019
€1M+    Client revenue tracked
5.96x   Average ROAS on managed campaigns
7 yrs   Without a production site going down
```

Note under the block: `"Every figure here traces to a named client in the case studies. Nothing is modelled or projected."`

### 6.5 How we work

Heading: `"What working with us actually means"`

Four items, `DividedList`:

- **You talk to the builder.** "There's no account manager. The person on your discovery call designs your pages, writes your proposal and answers when something breaks."
- **Fixed price, fixed timeline.** "You get a number and a date before we start. From €2,500, most builds live in 2 to 5 weeks."
- **Wix Studio by default, custom when you outgrow it.** "Most businesses are better served by a platform their team can edit. When that stops being true, we build custom. This site is the example."
- **The proof is public.** "Named clients, real numbers, video testimonials, and a Trustpilot profile we link to rather than quote."

### 6.6 Platform status and partners

Heading: `"Who vouches for us"`
Intro: `"Three of these you can verify without asking us."`

- Wix: Top 1% Wix Partner. Link the official partner profile: `https://www.wix.com/studio/community/partners/zenith-digital`
- Shopify Partners
- Trustpilot: `https://www.trustpilot.com/review/thezenithdigital.com` — link it, state no score
- Agency partners: MOD Digital, Techtonnik, LMF HR, Wellington Web Co, AdVantage. Reuse `ClientLogos` for the marks.

### 6.7 Entity FAQ

Reuse `Faq`. These questions exist to be extracted by AI answer engines, so each answer must be self-contained and lead with the direct answer in the first sentence.

1. **What is Zenith Digital?** "Zenith Digital is a Wix Studio web design agency based in Belgrade, Serbia, working with businesses in the UK, EU and US. It builds conversion-focused websites on Wix Studio, and custom Next.js sites for clients who outgrow the platform."
2. **Who runs Zenith Digital?** "Pavle Maodus, a web designer and developer who has been building for businesses since 2019 and has been a Wix Partner since 2021. He is ranked in the top 1% of Wix Partners worldwide and runs every project personally."
3. **Where is Zenith Digital based?** "Belgrade, Serbia, with a working presence in Edinburgh and Liverpool. Most clients are in the UK, the EU and the US."
4. **How long has Zenith Digital been operating?** *(answer once §0 Q1 is confirmed)*
5. **How many websites has Zenith Digital built?** "More than 100 since 2019, across SaaS, travel, hospitality, professional services, e-commerce and marketing agencies."
6. **Is Zenith Digital an official Wix Partner?** "Yes. Zenith Digital holds Wix Partner status and is ranked in the top 1% of Wix Partners. The profile is public and linked from this page."
7. **What does a website cost?** "From €2,500 for a Wix Studio build, with landing pages from €1,250. Every project is quoted with a fixed price and a fixed timeline before work starts."
8. **How long does a build take?** "Two to five weeks for most Wix Studio sites. Landing pages go live in about a week."
9. **Does Zenith Digital only build on Wix?** "No. Wix Studio is the default because most teams can edit it themselves. When a project outgrows the platform, we build custom. Zenith's own site is a custom Next.js build for exactly that reason."
10. **Can I see reviews?** "Yes. Named client testimonials with video are on the testimonials page, and the public Trustpilot profile is linked from this page and the footer."

Emit `FAQPage` schema for these, since they render visibly.

### 6.8 CTA

Reuse `CtaBanner`. Heading: `"Want to know if we're a fit?"` Paragraph: `"A free 20-minute call. We'll tell you honestly what your site needs, whether or not that turns into a project."` Primary: Book a call. Secondary: Free website audit.

---

## 7. Structured data

This page is the strongest Person/Organization reconciliation surface on the site. Emit four nodes:

```ts
import { ORG_ID, PERSON_ID, SITE, organizationSchema, personSchema } from "@/lib/schema";
```

1. **`AboutPage`** with `mainEntity: { "@id": ORG_ID }` and `url: ${SITE}/about`
2. **`personSchema`** — already exists, import it, do not redefine
3. **`BreadcrumbList`** — Home → About
4. **`FAQPage`** — built from the §6.7 array

Do **not** create a second Organization object on this page. Reference `ORG_ID`. The whole point of the `@id` graph in `lib/schema.ts` is that there is exactly one Organization node.

Once §0 Q1 is answered, add `foundingDate` to `organizationSchema` in `lib/schema.ts` so it applies sitewide, not just here.

Do **not** add `Review` or `AggregateRating` anywhere on this page. Self-published reviews were removed from `/testimonials` and `/case-studies/[slug]` on 17 Aug for exactly that reason.

---

## 8. Internal links this page must carry

Both directions matter. From `/about`, link out to:

- `/case-studies` and at least two named studies (Knode AI, Bel'Istria)
- `/services` and the Wix Studio design service
- `/partnerships`
- `/testimonials`
- `/book-a-call` and `/free-website-audit`
- External: Wix Partner profile, Trustpilot, LinkedIn (these are the `sameAs` set)

Then add `/about` to the footer "Company" column. It is already there as of the 17 Aug fix, currently pointing at a route that does not exist. This build resolves that.

---

## 9. Definition of done

- [ ] `/about` builds and renders server-side, no client-only content
- [ ] Every visible string lives in `content/about.ts`
- [ ] Only two new components created; everything else imported from the existing library
- [ ] `AboutPage` + `Person` + `BreadcrumbList` + `FAQPage` emitted, single Organization by `@id`
- [ ] Owner's three answers from §0 filled in, no `[bracketed]` placeholders remaining
- [ ] Navy and white sections alternate; tokens only, no hardcoded hex
- [ ] Keyboard navigable, visible focus rings, alt text on the portrait and every logo
- [ ] Footer `/about` link resolves
- [ ] Added to `app/sitemap.ts`
- [ ] `npx tsc --noEmit` and `npx eslint app/ content/` both clean
- [ ] Page added to `public/llms.txt` under a Company line

---

## 10. What not to do

- No stock team photography or illustrated avatars. Real portrait only.
- No "our mission is" or "we're passionate about". The company's position is stated by dates and numbers.
- No timeline entry you cannot date.
- No second Organization schema node.
- No eyebrow label above every section (CLAUDE.md §14). The timeline and FAQ do not need one.
- No em dashes in rendered copy.
- Do not restate experience as anything other than **since 2019** and **Wix Partner since 2021**.
