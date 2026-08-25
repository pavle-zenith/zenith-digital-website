# Revision round 2 — service pages argue the "why", founder blocks go big

Four jobs in this round. All copy is written below or already committed to
`content/` — you're building sections and pasting strings, not writing
marketing copy. House rules apply throughout: §7 tokens, §14 voice (no em
dashes in rendered copy, sentence case, no shadows, no eyebrows), everything
editable from content files.

Context for why: the service pages currently describe the services well but
argue the *need* weakly. Flow Ninja's service pages spend their first half
naming the buyer's pain and pricing the cost of staying put, before any
deliverables. This round adds that layer, without their enterprise tone.

---

## Job 1 — Founder sections: white theme everywhere, expert block on
## book-a-call and free-website-audit

`content/founder.ts` is updated; read its header spec. Summary of what changed:

1. **Every founder section renders on the light theme.** White or
   `--light-surface` section background, navy text. No navy variant exists.
   Adjust the section alternation around each placement accordingly.

2. **Book-a-call and audit do NOT get the slim signature row** originally
   planned. They get the full expert block (reference: byCrawford's
   "Hi. I'm Sam Crawford" section):
   - Left: the portrait in a rounded card. Floating over it, from
     `founderCore.photoBadges`: a review badge top-left (5 stars + "Clutch"),
     the Wix Studio mark as a small square chip mid-left, and a stat chip
     overlapping the photo's bottom-right corner ("100+ / Websites built").
     Badges are small translucent-dark chips (backdrop-blur) so they read
     over the photo; hairline borders, no glow.
   - Right: heading (`Hi, I'm Pavle` / `Your audit is done by me`), the
     paragraph, then `whyHeading` as an h3 with the `whyPoints` checklist
     below it, each point with a filled check icon in the accent color.
   - No CTA button inside the block on book-a-call (the calendar is the CTA,
     directly above). On the audit page, no CTA either; the form is adjacent.
   - Note: the Wix Studio mark in photoBadges is the white logo
     (/logos-white/wix-studio.png) sitting on a dark chip, which works on the
     light section because the chip itself is dark.

3. The four `/services/[slug]` pages keep the `founderServices` layout from
   the previous handoff (text left, portrait right, stat bar overlay), just
   confirmed light-themed.

---

## Job 2 — The "why you need this" layer: one `stakes` section per service page

**New section type.** Add to `ServicePageContent` in
`content/service-pages/types.ts`:

```ts
/** The cost-of-inaction section: why "later" is the expensive choice. */
stakes?: {
  heading: string;
  intro?: string;
  items: { title: string; body: string }[];
};
```

**Placement:** directly after `whoFor`, before `included`, on all four pages.
whoFor mirrors the reader's situation; stakes prices staying in it; included
then answers it. Design: three text-led cells (hairline grid or stacked rows,
match an existing pattern), navy or white per each page's alternation. These
are prose cards — no icons needed, the titles do the work.

**Paste this content into each page file:**

### wix-studio-website-design.ts

```ts
stakes: {
  heading: "What staying put costs",
  intro:
    "A dated site doesn't send an invoice, which is why it feels free. It isn't.",
  items: [
    {
      title: "The quiet discount",
      body: "An outdated site doesn't lose deals loudly. Prospects arrive pre-negotiated: they've seen the site, priced you as the cheap option, and opened with a lower number. You never find out what they would have paid.",
    },
    {
      title: "The comparison you don't see",
      body: "Buyers open three tabs and yours is one of them. The competitor with worse work and a better website wins the call, and no report ever tells you it happened.",
    },
    {
      title: "The head start you're gifting",
      body: "Every month the site stays as it is, somebody else's site is collecting the rankings, reviews, and referrals in your market. The gap isn't static. It accrues.",
    },
  ],
},
```

### website-migration.ts

```ts
stakes: {
  heading: "What waiting costs",
  intro:
    "Staying on the old platform feels like the safe option. Run the numbers on it.",
  items: [
    {
      title: "The bill that renews either way",
      body: "The maintenance retainer, the plugin renewals, the hosting: they invoice whether you move or not. A year of waiting costs roughly a migration, except at the end of it you still own the problem.",
    },
    {
      title: "Rankings erode in place",
      body: "The rankings you're afraid of losing in a move are already at risk where they are. Slow pages and stale content slide without anyone touching them. Staying put isn't the safe option, it's the slow version of the same loss.",
    },
    {
      title: "The pages that never ship",
      body: "Every page marketing didn't publish while waiting on a developer is a search term you don't rank for and a campaign that ran without its landing page. That backlog is invisible on any invoice, and it's the expensive part.",
    },
  ],
},
```

### seo-aeo-ppc.ts

```ts
stakes: {
  heading: "What another quiet quarter costs",
  intro:
    "Visibility work punishes waiting more than almost any other spend, because the results compound.",
  items: [
    {
      title: "Rankings compound, in both directions",
      body: "Search is a queue you move up by being useful for months in a row. Every month outside it is a head start handed to whoever's in it, and catching up always costs more than keeping up would have.",
    },
    {
      title: "The AI answers are being written now",
      body: "Assistants are already answering your buyers' questions and citing somebody. The window where your market's AI answers are still unclaimed closes at the speed of your competitors' content calendars.",
    },
    {
      title: "Ad spend without a system leaks",
      body: "Running ads onto pages nobody optimized is paying full price for traffic and keeping a fraction of it. The spend shows up in reports as activity. The leak never reports at all.",
    },
  ],
},
```

### landing-pages.ts

```ts
stakes: {
  heading: "What the homepage is costing your campaigns",
  intro:
    "If ads are running, you already own this problem. The only question is its size.",
  items: [
    {
      title: "You're already paying for the traffic",
      body: "The click costs the same whether it lands on a page built to convert it or on your homepage. The only variable is how much of what you bought you keep.",
    },
    {
      title: "A homepage introduces, it doesn't close",
      body: "Every campaign click that lands on a general-purpose page has to find its own way to the offer it clicked for. Most don't, and the platform charges you for them anyway.",
    },
    {
      title: "Mismatch is fined at both ends",
      body: "Ad platforms reward pages that match the ad with cheaper clicks and better placement. A mismatched page pays more per click and converts fewer of them. Same budget, twice the penalty.",
    },
  ],
},
```

---

## Job 3 — The payback math on the design page

The H1 says "pays for itself" and the page never does the arithmetic. In
`wix-studio-website-design.ts`, replace the pricing `note`:

**Old:**
> The price is agreed before we start and it doesn't move unless you add
> scope. Most businesses land between the €2,500 entry build and the €4,500
> Studio tier.

**New:**
> The price is agreed before we start and it doesn't move unless you add
> scope. Most businesses land between the €2,500 entry build and the €4,500
> Studio tier. The arithmetic behind the headline is worth doing before the
> call: if a customer is worth €500 to you, the €2,500 build pays for itself
> with five enquiries the old site wasn't winning. The case studies above are
> how that plays out in practice.

(Keep it as one string in `pricing.note`; no new fields.)

---

## Job 4 — Logo marquee + work strip on the four service pages

Both reuse existing content; nothing new to write.

1. **Logo marquee:** render the existing client-logo marquee component (the
   double strip from /case-studies, fed by `clientLogos` in
   `content/case-studies.ts`) on all four service pages, directly below the
   hero. Blue marks on light. If the current marquee component is coupled to
   its page, extract it; do not fork the logo list.

2. **Work strip:** a four-card strip of the featured studies, fed by
   `caseStudies.items` from `content/case-studies.ts` (Knode, Bel'Istria,
   SLE, MOD). Compact media cards: thumb, client, one stat, linking to
   `/case-studies/[slug]`. Place it after the founder section, before the
   FAQ, on all four service pages. This is a shared sitewide strip (same
   four everywhere, like the footer), distinct from each page's `proof`
   section which stays as-is with its per-page case cards.

---

## Done when

- [ ] Founder block on book-a-call and audit matches the expert-block spec:
      badged portrait left, checklist right, light theme, no CTA.
- [ ] All founder sections sitewide are light-themed; alternation adjusted.
- [ ] `stakes` type added; section renders after whoFor on all four service
      pages with the copy above, verbatim.
- [ ] Design page pricing note carries the payback arithmetic.
- [ ] Logo marquee under all four service heroes; work strip between founder
      and FAQ; both fed from content/case-studies.ts, nothing duplicated.
- [ ] No em dashes, Title Caps, icons-for-decoration, or shadows introduced.
- [ ] `npm run build` clean; spot-check one service page, book-a-call, and
      the audit page at mobile width.
