# Private proposal pages (`/proposal/[slug]`): build handoff for Claude Code

**For:** Zenith Digital website (Next.js 15 App Router, content in `content/`)
**Written:** 1 October 2026
**First client:** Pulse Electrical and Pulse Catering (`/proposal/pulse`)

**Pattern references:**
- the `/audit/[slug]` pages, built from `docs/Audit_Page_Handoff.md`: privacy layers, components, tone;
- `/p/` (privacy reasoning in `next.config.ts`).

---

## 0. Division of labour: read first

**The copy in §5 is final.** Paste it as `content/proposals/pulse.ts`, matching the type in §4. Don't rewrite, shorten or "improve" it. If a string doesn't fit a component, flag it and leave it as written.

Claude Code's job is the plumbing:

- the `ProposalPage` type and the collection module;
- the route, the components and the four noindex layers;
- **reuse of the existing audit-page components** wherever they fit;
- responsive behaviour, accessibility, typecheck and lint.

This is a **template**. Every future proposal is one new content file. Nothing client-specific goes in a component.

---

## 1. What this page is

It's a private sales proposal, sent to the prospect as a link. It works like `/audit/` but closes harder. The page:

1. **Proves the problem:** a short audit of their current sites, segmented and colour-coded by severity, with screenshots.
2. **Shows the plan:** what we build.
3. **Explains the handover:** how we take the sites back from their old developer without breaking anything.
4. **Prices it:** two websites, two payment options, a monthly care plan.
5. **Asks for the yes.**

It should take about four minutes to read. Mike (the owner of both businesses) will likely read it on his phone.

---

## 2. Privacy: same four layers as `/audit/`

Mirror exactly what `/audit/` does, including the comments.

1. **Robots metadata.** Route metadata sets `robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }`.
2. **Response headers.** Add `X-Robots-Tag: noindex, nofollow` in `next.config.ts` `headers()` for:
   - `source: "/proposal/:slug([^./]+)"`, with the same pattern style as the audit entry;
   - `source: "/proposals/:path*"` for the public assets.
3. **Sitemap.** Leave the route out of `app/sitemap.ts`. Add `/proposal/[slug]` to the doc comment that already explains why `/audit/` is absent.
4. **No internal links** to `/proposal/...` anywhere. Grep before finishing.

Also:

- **No robots.txt Disallow.** Same reasoning as the audit brief.
- **No index page.** `app/proposal/page.tsx` must not exist.
- **Unknown slugs 404.** Use `dynamicParams = false`, `generateStaticParams` from the collection, and `notFound()`.

---

## 3. Files

```
content/proposals/types.ts      ProposalPage type
content/proposals/index.ts      collection + getProposal(slug)
content/proposals/pulse.ts      §5, pasted as-is
app/proposal/[slug]/page.tsx    route, metadata, noindex
components/sections/proposal-page/*   new sections (see §6)
next.config.ts                  two header entries
app/sitemap.ts                  comment only
```

**Assets are already in the repo** at `public/proposals/pulse/`:

| File | Size |
|---|---|
| `google-staging-result.webp` | 800×1014 |
| `electrical-mobile.webp` | 375×812 |
| `catering-mobile.webp` | 375×812 |
| `catering-template-page.webp` | 560×710 |
| `catering-hello-world.webp` | 560×710 |

### Reuse from `components/sections/audit-page/`

Use these directly, or lift them into a shared folder (for example `components/sections/private-doc/`) if the props are audit-specific:

- `AuditJumpBar`
- `AuditMobileBar`
- `icons.tsx`
- the priority `Pill` colouring
- the evidence image row inside `AuditSegment`
- the dark textured offer band from `AuditOffers`

**Constraints on that refactor:**

- Don't change how `/audit/lifetime-learning-center` looks or behaves.
- If you refactor shared pieces, run the audit page's checks again.
- The audit scoring test must still pass.

---

## 4. The type

```ts
export type Severity = "critical" | "high" | "medium";

export interface ProposalImage { src: string; alt: string; caption: string; width: number; height: number }

export interface ProposalPage {
  slug: string;
  client: string;                 // "Pulse Electrical & Pulse Catering"
  contact: string;                // "Mike"
  date: string;
  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    heading: string;
    lead: string[];
    primaryCta: { label: string; href: string };    // in-page anchor
    secondaryCta: { label: string; href: string };
  };

  summary: { heading: string; cards: { title: string; body: string }[] };   // 3 cards

  findings: {
    heading: string;
    intro: string;
    items: {
      id: string;
      title: string;
      severity: Severity;
      site: string;               // "Pulse Electrical" | "Pulse Catering" | "Both"
      points: string[];
      evidence?: ProposalImage[];
    }[];
    working: { heading: string; items: string[]; closing: string };
  };

  plan: {
    heading: string;
    intro: string;
    sites: {
      name: string;
      domain: string;             // display only, never linked
      note?: string;
      pages: { name: string; detail?: string }[];
    }[];
    builtIn: { heading: string; items: string[] };
  };

  handover: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
    closing: string;
  };

  gbp: { heading: string; intro: string; items: string[] };

  investment: {
    heading: string;
    builds: { name: string; wasPrice: string; price: string }[];
    total: { label: string; wasPrice: string; price: string; saving: string };
    includes: string;
    delivery: string;
    paymentOptions: { name: string; detail: string; schedule: string[] }[];
    care: { name: string; price: string; priceNote: string; items: string[]; note: string };
  };

  timeline: { heading: string; rows: { when: string; what: string }[] };

  close: {
    heading: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    signoff: string;
  };
}
```

---

## 5. Content: `content/proposals/pulse.ts`

```ts
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
    heading: "The plan: two websites, one system",
    intro: "Both sites are built together on Wix Studio, sharing one design system so they feel like sister brands, each with its own identity, colours and domain. Your team can edit text, photos, case studies and blog posts without calling anyone.",
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
        note: "A simpler site built on the same system.",
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
      { when: "Weeks 3 to 4", what: "Pulse Catering built on the same system" },
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
```

---

## 6. Layout, top to bottom

Build it from the existing system (CLAUDE.md §7 and §15) and the audit page's components.

- **No floating shadowed cards.** Use hairline grids, as on the audit page.
- **No new tokens or fonts.** Severity uses the signal tokens:

  | Severity | Fill | Text |
  |---|---|---|
  | critical | `--color-negative` | `--color-negative-ink` |
  | high | `--color-warning` | `--color-warning-ink` |
  | medium | muted text on a surface fill | (same) |

- **Every coloured pill also prints its word** ("Critical", "High", "Medium").

### 6.1 Hero (dark, textured, like the audit hero)

- Eyebrow, H1, lead paragraphs, the two CTAs.
- No gauge.
- The client domains are plain text. **Never link out to the client's sites or to ihttpdev.co.uk.**

### 6.2 Jump bar (reuse `AuditJumpBar`)

Links, in order:

1. What we found
2. The plan
3. Handover
4. Google
5. Investment

Use these anchors: `#findings`, `#plan`, `#handover`, `#gbp`, `#investment`.

### 6.3 The short version (light)

- Three cells in a hairline grid: 3 across from `lg`, stacked on phones.
- Each cell: a number chip, the title, the body.

### 6.4 What we found (light, `id="findings"`)

- `intro`, then one block per finding.
- **Heading row:** H3 title, the severity pill, and a small mono caption with `site`.
- **Body:** `points` as a tight list with hairline separators.
- **Evidence:** screenshots in a row, with the same image treatment and captions as the audit evidence row.
  - The tall phone screenshots sit side by side even on tablets (max 2), and never wider than 320px each.
  - The Google screenshot spans wider, about 560px max.
- **Alternate** light and light-surface backgrounds per finding, as audit segments do.
- **"What's already working"** comes after the findings:
  - a light-surface panel with green ticks (`CheckIcon`, positive ink);
  - `closing` in body-large.

### 6.5 The plan (light, `id="plan"`)

- `intro`, then two site panels side by side from `md`, stacked on phones (Electrical first).
- **Each panel:**
  - site name (H3);
  - domain in the mono caption style;
  - `note` if present;
  - the page list as rows: page name in medium weight, `detail` in muted text.
- **Below the panels:** "Built into both" as a two-column tick list.

### 6.6 Handover (dark band, `id="handover"`)

- This section carries the most trust. Give it room.
- `intro`, then the 8 steps as a numbered vertical sequence: number chip, title, body.
  - Two columns from `lg`, numbered down the first column, then the second.
  - One column on phones.
- `closing` in display face at H3 size, white.

### 6.7 Google Business Profiles (light, `id="gbp"`)

`intro`, then a tick list in two columns from `md`.

### 6.8 Investment (dark, textured, the same backdrop as `AuditOffers`, `id="investment"`)

- **Builds table:** each build is a row with the name, the struck-through `wasPrice` (`<s>` with an accessible label, "was £3,500") and the `price`.
  - Then the total row in larger type, with the `saving` in a positive-ink pill.
- **Under it:** `includes` and `delivery` in body text.
- **Payment options:** two cells side by side from `md`. Each has the name, detail, and the schedule as a short list. Don't mark either as recommended.
- **Care plan:** a white-filled panel (the same treatment as the recommended audit offer card).
  - Name, price (display face) with `priceNote`, items as a tick list, then `note`.
  - Visually separate it from the one-time build price so they're never confused.

### 6.9 Timeline (light)

- A real `<table>` (or a definition list) with two columns: `when` | `what`.
- Hairline rows.

### 6.10 Close (light)

- Heading, body, both CTAs, then the signoff in the mono caption style.

### 6.11 Mobile bottom bar (reuse `AuditMobileBar`)

- Label: "See the price". Target: `#investment`.
- Hide it once `#investment` is in view.

**Global:**

- Keep the site Nav and Footer.
- No JsonLd.
- Default OG image. OG title = `meta.title`.
- No share buttons.

---

## 7. Behaviour and accessibility

- **Headings:**
  - One H1.
  - Section headings are H2.
  - Finding titles, site names and handover step titles are H3.
- **Colour is never the only signal.**
- **Contrast:**
  - Status text uses the `-ink` tokens.
  - Check muted text on both dark bands.
- **Struck-through prices** must read correctly to screen readers: "was £3,500, now £3,000".
- **Anchors:** set `scroll-margin-top` to the height of the nav plus the jump bar.
- **`mailto:` CTA:** a plain link, no JS.
- **Analytics:** PostHog pageview as is, nothing extra.
- **Motion:** none beyond the shared components.

---

## 8. Definition of done

**Routing and privacy**

- [ ] `/proposal/pulse` renders.
- [ ] `/proposal` and unknown slugs return 404.
- [ ] `curl -I` on the page and on one asset in `/proposals/pulse/` shows `X-Robots-Tag: noindex, nofollow`.
- [ ] The page HTML has the robots meta.
- [ ] `/sitemap.xml` has no `/proposal` URL.
- [ ] robots.txt is unchanged.
- [ ] Grep finds no internal links to `/proposal/`.
- [ ] There are no links out to the client domains or to ihttpdev.co.uk.

**Audit page unaffected**

- [ ] `/audit/lifetime-learning-center` is unchanged.
- [ ] The audit score test still passes.

**Copy**

- [ ] Copy matches §5 exactly.
- [ ] No em dashes, no banned words (CLAUDE.md §14).

**Layout**

- [ ] Checked at 375, 768 and 1280.
- [ ] Phone screenshots never render wider than 320px.
- [ ] The mobile bar hides at `#investment`.

**Template and build**

- [ ] A second proposal needs only a new content file plus one line in `content/proposals/index.ts`.
- [ ] `npx tsc --noEmit`, `npx eslint .` and `next build` are clean.
