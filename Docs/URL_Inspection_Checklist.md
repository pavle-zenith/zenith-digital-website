# URL Inspection submission list — thezenithdigital.com

23 indexable URLs, pulled from `app/sitemap.ts` on 17 Aug 2026. All use the `www` host, which is what every canonical on the site points at. Submitting the non-www version wastes a request.

**Quota:** Google caps "Request Indexing" at roughly 10 to 12 URLs per property per day. Submitting more just silently fails, so this is split across three days in priority order. If a day's batch gets rejected early, stop and resume the next day rather than retrying.

Sitemap is already submitted, so these requests are only to accelerate discovery on the pages that matter commercially. Google will find the rest on its own.

---

## Day 1 — commercial core (10 URLs)

```
https://www.thezenithdigital.com/
https://www.thezenithdigital.com/services
https://www.thezenithdigital.com/services/wix-studio-website-design
https://www.thezenithdigital.com/services/website-migration
https://www.thezenithdigital.com/services/wix-studio-development
https://www.thezenithdigital.com/services/seo-aeo-ppc
https://www.thezenithdigital.com/services/landing-pages
https://www.thezenithdigital.com/case-studies
https://www.thezenithdigital.com/about
https://www.thezenithdigital.com/partnerships
```

- [ ] `/` — homepage
- [ ] `/services` — hub
- [ ] `/services/wix-studio-website-design` — strongest commercial page, primary "Wix Studio website design" target
- [ ] `/services/website-migration` — "Wix Studio migration"
- [ ] `/services/wix-studio-development` — "Wix developer / Velo developer", newest page
- [ ] `/services/seo-aeo-ppc` — "Wix SEO agency"
- [ ] `/services/landing-pages` — "Wix landing page design"
- [ ] `/case-studies` — hub, new H1
- [ ] `/about` — new route, entity anchor, highest value of anything new
- [ ] `/partnerships` — white-label

## Day 2 — proof pages, strongest first (10 URLs)

```
https://www.thezenithdigital.com/case-studies/belistria
https://www.thezenithdigital.com/case-studies/knode-ai
https://www.thezenithdigital.com/case-studies/mod-digital
https://www.thezenithdigital.com/case-studies/scottish-luxury-experience
https://www.thezenithdigital.com/case-studies/yacht-junky
https://www.thezenithdigital.com/testimonials
https://www.thezenithdigital.com/faq
https://www.thezenithdigital.com/free-website-audit
https://www.thezenithdigital.com/book-a-call
https://www.thezenithdigital.com/case-studies/hunting-brook-gardens
```

- [ ] `/case-studies/belistria` — the AEO flagship, migration + rankings evidence
- [ ] `/case-studies/knode-ai` — corrected Series A wording, submit only after the fix is deployed
- [ ] `/case-studies/mod-digital` — partnership attribution model
- [ ] `/case-studies/scottish-luxury-experience` — $521k
- [ ] `/case-studies/yacht-junky` — the Velo/development proof asset
- [ ] `/testimonials` — Review schema removed
- [ ] `/faq`
- [ ] `/free-website-audit`
- [ ] `/book-a-call`
- [ ] `/case-studies/hunting-brook-gardens`

## Day 3 — remaining case studies (3 URLs)

```
https://www.thezenithdigital.com/case-studies/katie-hailey
https://www.thezenithdigital.com/case-studies/just-stay
https://www.thezenithdigital.com/case-studies/genroks-ai
```

- [ ] `/case-studies/katie-hailey`
- [ ] `/case-studies/just-stay`
- [ ] `/case-studies/genroks-ai`

---

## Do NOT submit these

The six legacy Wix URLs. They are 301s or intentional 404s, and requesting indexing on them tells Google to index a redirect, which is the opposite of what you want.

| Legacy URL | Status | What to do instead |
|---|---|---|
| `/webdesign` | 301 → `/services/wix-studio-website-design` | Test live URL only |
| `/marketing` | 301 → `/services/seo-aeo-ppc` | Test live URL only |
| `/branding` | 301 → `/services/wix-studio-website-design` | Test live URL only |
| `/contact-us` | 301 → `/book-a-call` | Test live URL only |
| `/discovery-call` | 301 → `/book-a-call` | Test live URL only |
| `/white-label-partnerships` | 301 → `/partnerships` | Confirm it existed in GSC first |
| `/embed-test` | 404 by design | Leave it. Let it drop out. |

Run **Test live URL** on two or three of these once, confirm the response is a 301 to the right destination, then leave them alone. They resolve through the redirect map, not through indexing requests.

Also do not submit `/privacy` or `/terms`. Those routes still do not exist and are linked from the footer.

---

## Before you submit anything

1. Deploy the 17 Aug fixes. Submitting `/case-studies/knode-ai` before the "currently raising" correction is live means Google caches the contradiction.
2. Run `npm run build` locally and confirm it passes. `tsc` and `eslint` are clean but the full build has not run in this environment (no network access to fetch the Linux SWC binary).
3. Spot-check the 301s in a browser or with `curl -I`.
4. Run **Test live URL** on one page per template before batch-submitting: one service page, one case study, `/about`. If a template has a rendering or schema problem, you find it once instead of ten times.
5. Confirm `/about` returns 200 and appears in `sitemap.xml`.

## After

Watch the Pages report rather than resubmitting. Requesting indexing twice on the same URL does nothing. If a page is still unindexed after 10 to 14 days, that is a content or internal-linking signal, not a submission problem.
