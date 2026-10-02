# Project request form: handoff brief

**Route:** `/project-request`
**Owner:** Pavle. **Written:** 2 October 2026.
**Read first:** `CLAUDE.md` (§7, §14, §15), `DESIGN.md`, `PRODUCT.md`, `lib/forms.ts`, `components/forms/PartnerForm.tsx`, `app/partner-showcase/layout.tsx`.

---

## 0. Division of labour

- **This brief decides:** what the page is for, every question, every option, all copy, the logic, the founder email, privacy and the definition of done. Do not rewrite copy or add questions.
- **You (Claude Code) decide:** component structure, state handling, file split inside the paths named below.
- **Impeccable decides:** spacing, rhythm, tile and progress styling, motion, inside `DESIGN.md`. Passes are listed in §11.
- **If something here conflicts with `DESIGN.md` or `CLAUDE.md`, those win.** Say so in your summary.

---

## 1. What this page is

A short intake form that Pavle sends by hand to people who are already warm (referred, met on a call, replied to outreach) but unclear about what they want. Its job is to give him enough to send a **price range and a timeline without a discovery call**, or to make the first call ten minutes.

The person filling it in is a non-technical business owner, usually on a phone, usually arriving from WhatsApp or email. They cannot answer "how many pages" or "what features". They can answer "what should people be able to find" and "what should the site be able to do". The form asks the second kind of question and the server works out the first.

### How it differs from the two forms that exist

| Page | Who it's for | Indexed | In nav |
|---|---|---|---|
| `/book-a-call` | Anyone ready to talk. Public front door. | Yes | Yes |
| `/free-website-audit` | Someone with a live site who wants it reviewed. | Yes | Yes |
| `/project-request` | Someone Pavle already spoke to. Sent as a link. | **No** | **No** |

Nothing on the site links to `/project-request`. It is a utility page, not a funnel step.

```
Homepage (/)
├── (site) group: Nav + Footer
│   ├── /book-a-call            public
│   ├── /free-website-audit     public
│   └── ...
├── /partner-showcase           private, own chrome
└── /project-request            private, own chrome   <- new
```

---

## 2. Hard rules

1. **No prices on the page except the optional budget bands in question 11.** No tier names, no "from €1,250", no live estimate.
2. **Every choice question has a "Not sure" option.** Picking it is a valid answer and never blocks progress.
3. **Nothing is typed that can be tapped.** Typed fields are: business line, current URL, liked sites, the two "something else" boxes, the fixed-date reason, the final note, and contact details. Only the business line and contact details are required.
4. **Four steps, never more.** Conditional questions appear inside a step. They never add a step.
5. **Copy rules from `CLAUDE.md` §14 apply:** no em dashes, sentence case, "Zenith Digital" never "Zenith", no banned words, no invented numbers.
6. **No file uploads, no calendar embed, no client confirmation email, no live price.** All four were considered and rejected for version one (§12).

---

## 3. Privacy: the same four layers as `/partner-showcase`

1. `robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }` in the page metadata, plus `alternates: { canonical: null }`.
2. `X-Robots-Tag: noindex, nofollow` for the exact path `/project-request` in `next.config.ts`, next to the `/partner-showcase` entry, with a one-line comment.
3. Absent from `app/sitemap.ts` (it is an allowlist, so do nothing, but confirm).
4. No link to it from any page, component, nav, footer or blog post.

Never a `robots.txt` Disallow. No JSON-LD.

---

## 4. Files

| Path | What |
|---|---|
| `app/project-request/layout.tsx` | Outside `(site)`. Logo-only header, one-line footer. No `Nav`, no `Footer`. |
| `app/project-request/page.tsx` | Metadata (§3), intro, the form. Server component. |
| `app/project-request/actions.ts` | `submitProjectRequest` server action. |
| `content/project-request.ts` | **All** copy, questions, options, validation messages. Single source of truth for the client form and the server whitelist, as `content/partnerships.ts` is for `PartnerForm`. |
| `lib/projectRequest.ts` | Pure functions: `countPages`, `suggestScope`, `buildFlags`, `buildAssumptions`. No I/O. Unit-testable. |
| `components/forms/ProjectRequestForm.tsx` | Client component. Steps, state, autosave. |
| `components/sections/project-request/RequestChrome.tsx` | `RequestHeader`, `RequestFooter`. |
| `lib/forms.ts` | Add `"project-request"` to `SubmissionSource`. Nothing else changes. |
| `lib/analytics.ts` | Add `"project-request"` to `LeadForm`. |
| `next.config.ts` | Header entry (§3). |
| `.env.example` | `PROJECT_REQUEST_TO_EMAIL=` |

Reuse, do not rebuild: `rateLimited`, `isEmail`, `isPhone`, `normalizeUrl`, `storeSubmission`, `notify`, the `inputCls` treatment and the radio-tile pattern (`has-[:checked]:border-accent has-[:checked]:bg-accent-subtle`) from `PartnerForm.tsx`. No new Supabase table, no migration: answers go in the existing `payload` column.

---

## 5. Page layout

Light tone throughout (`tone-light`, `bg-light-bg`, `text-light-text`). One column.

**Header.** White, 64px, 1px `light-border` bottom rule. Wordmark on the left, linking to `/`. Nothing on the right. Not sticky. Model it on `ShowcaseHeader`, but in the page flow, not absolutely positioned.

**Intro**, above the form, max width about 640px:

- **Eyebrow:** `Project request`
- **H1:** `Tell me what you need`
- **Lead:** `Twelve short questions, mostly taps. It takes about three minutes. You don't need to know the technical side. If you're not sure about something, say so and I'll help you decide.`
- **Byline line:** `Pavle Maoduš, founder of Zenith Digital. I read every request myself.`

**Form card.** Max width about 640px, `rounded-card border border-light-border`, padding `p-6 sm:p-8`. Contains the progress row, the current step, and the Back and Next buttons.

**Footer.** One line, `text-label text-light-muted`: `Zenith Digital · Belgrade` and a link to `/privacy`.

---

## 6. The form: every question and option

Step titles show in the progress row as `Step 1 of 4 · What you need`. Question numbers below are for this brief only and are not shown.

Field keys are given in `code`. They are the form field names, the keys in `payload`, and the labels' source in `content/project-request.ts`.

### Step 1: What you need

**Q1. `need` · multi-select · required**
Label: `What do you need?`
Hint: `Pick everything that applies.`

- `A new website`
- `A redesign of the website I have`
- `An online store`
- `A single landing page for ads or one offer`
- `Moving my website to a different platform`
- `More visitors from Google`
- `Not sure yet, help me decide` (exclusive: selecting it clears the others, and selecting another clears it)

**Q2. `hasSite` · single · required**
Label: `Do you have a website now?`

- `Yes` → reveals `currentUrl`: label `What's the address?`, placeholder `yourbusiness.com`, `inputMode="url"`, `autoComplete="url"`, optional.
- `No, starting from scratch`

**Q3. `business` · one-line text · required · max 200 chars**
Label: `In one sentence, what does your business do?`
Placeholder: `Physiotherapy clinic in Novi Sad, two locations`

### Step 2: Size and features

**Q4. `find` · multi-select · required**
Label: `What should people be able to find on the site?`
Hint: `Tap everything you'd expect to see. I'll turn this into a page list.`
Shown unless Q1 is **only** `A single landing page…` and/or **only** `More visitors from Google`.

- `Home`
- `About us`
- `Services, all on one page`
- `A separate page for each service` → reveals `serviceCount`: `Roughly how many services?` · `2 to 4` / `5 to 8` / `9 or more` / `Not sure`
- `Past work or portfolio`
- `Case studies`
- `Prices`
- `Team`
- `Reviews and testimonials`
- `Locations or areas you cover`
- `Blog or articles`
- `FAQ`
- `Careers`
- `Contact`
- `Not sure, suggest what I need` (exclusive)

**Q5. `does` · multi-select · required**
Label: `What should the site be able to do?`
Hint: `Beyond showing information.`

- `Send me enquiries through a form`
- `Let people book an appointment or a call`
- `Take payments or sell products`
- `Work in more than one language` → reveals `languages`: `Which languages?`, one-line text, optional
- `Have a members area or logins`
- `Let me add blog posts or news myself`
- `Connect to tools I already use` → reveals `tools`: `Which ones?`, placeholder `Mailchimp, HubSpot, Calendly`, optional
- `WhatsApp or live chat button`
- `Something else` → reveals `doesOther`: one-line text, optional
- `Nothing special, just information` (exclusive)
- `Not sure` (exclusive)

**Conditional block A: shown when Q1 includes `An online store` or Q5 includes `Take payments or sell products`**

- `productCount` · single: `Roughly how many products?` · `Up to 10` / `11 to 50` / `51 to 200` / `More than 200` / `Not sure`
- `sellsNow` · single: `Do you sell online already?` · `Yes` → reveals `sellsOn`: `Where?`, placeholder `Shopify, Etsy, Instagram` / `No`

**Conditional block B: shown when Q1 includes `Moving my website…` or `A redesign…`**

- `platform` · single: `What is the current site built on?` · `WordPress` / `Wix` / `Squarespace` / `Shopify` / `Webflow` / `Something else` / `Not sure`
- `googleTraffic` · single: `Does it get visitors from Google that you'd hate to lose?` · `Yes, a lot` / `Some` / `Hardly any` / `Not sure`

**Conditional block C: shown when Q1 includes `More visitors from Google`**

- `seoGoal` · single: `What would you like more of?` · `Local customers near me` / `Enquiries from anywhere in the country` / `Online sales` / `Not sure`

### Step 3: What's ready

Intro line under the step title: `There are no wrong answers here. It tells me how much of the work is mine.`

**Q6. `text` · single · required**
Label: `The text for the site`

- `It's written and ready`
- `Some of it, and it needs polishing`
- `Nothing yet. I'd like it written for me`
- `Not sure`

**Q7. `photos` · single · required**
Label: `Photos and video`

- `I have good ones`
- `A few, mostly taken on a phone`
- `None. I'd need stock photos or a shoot`
- `Not sure`

**Q8. `brand` · single · required**
Label: `Logo and brand`

- `Logo, colours and fonts are all set`
- `Just a logo`
- `Nothing yet`
- `I have one, but I'd like it refreshed`

**Q9. `likes` · textarea, 2 rows · optional · max 500 chars**
Label: `Any websites you like the look of?`
Hint: `Optional. Paste a link or two, or name them.`

### Step 4: Timing and you

**Q10. `deadline` · single · required**
Label: `When do you need it live?`

- `As soon as possible`
- `Within a month`
- `In one to three months`
- `No rush`
- `There's a fixed date` → reveals `deadlineDate` (`type="date"`, min today) and `deadlineReason`: `What's happening on that date?`, placeholder `Opening the second clinic`, optional

**Q11. `budget` · single · optional**
Label: `Do you have a budget in mind?`
Hint: `Optional. It helps me suggest the right size of project, not a bigger one.`

- `Under €1,000`
- `€1,000 to €2,500`
- `€2,500 to €5,000`
- `More than €5,000`
- `Not sure. Tell me what it would cost`

**Hidden entirely when the link carries `?via=` with any value** (see §8).

**Q12. `note` · textarea, 3 rows · optional · max 1,500 chars**
Label: `Anything else I should know?`
Hint: `Optional.`

**Contact**

- `name` · required · label `Your name` · `autoComplete="name"`
- `company` · optional · label `Business name` · `autoComplete="organization"`
- `email` · required · label `Email` · `type="email"`, `inputMode="email"`, `autoComplete="email"`
- `phone` · optional · label `Phone or WhatsApp` · `type="tel"`, `autoComplete="tel"`
- `replyBy` · single · required · default `Email` · label `How should I reply?` · `Email` / `WhatsApp` / `A phone call`
  If `WhatsApp` or `A phone call` is chosen, `phone` becomes required.

**Consent line** (plain text above the button, not a checkbox):
`Your answers go to Pavle at Zenith Digital and are used only to prepare your quote. Privacy policy.` ("Privacy policy" links to `/privacy`, new tab.)

**Honeypot:** hidden text input named `fax`, as in `PartnerForm`.

### Buttons

- Steps 1 to 3: `Back` (secondary, hidden on step 1) and `Next`.
- Step 4: `Back` and `Send my request`. Pending label: `Sending…`

### Validation messages (in `content/project-request.ts`)

- Required choice missing: `Pick an option, or choose "Not sure".`
- `business` empty: `Add a sentence about your business.`
- `name` empty: `Add your name.`
- `email` invalid: `That doesn't look like an email address.`
- `phone` required but empty or invalid: `Add a number so I can reach you there.`
- `currentUrl` typed but invalid: `That doesn't look like a website address.`
- Rate limited: `Too many requests. Try again in a bit.`
- Both delivery legs failed: `That didn't send. Your answers are still here, so try again, or email hello@thezenithdigital.com.`

### Success state

Replaces the whole card. `role="status"`, focus moved to the heading.

- **Heading:** `Thanks, {first name}. It's with me now.`
- **Body:** `I'll read it and reply by {email | WhatsApp | phone} within one working day, with a price range, a timeline and anything I need to check with you. If something can't be priced from the form, I'll ask you directly.`
- **Line:** `Something to add in the meantime?` with two links: `Email Pavle` (`mailto:hello@thezenithdigital.com`) and `WhatsApp` (`https://wa.me/381649760617`, read both from `content/founder.ts`, do not hardcode).

No button back to the site. No calendar.

---

## 7. Behaviour

- **One client component, one `<form>`, one server action.** Steps are sections of the same form shown one at a time. Hidden steps stay mounted so their values submit and so validation can reach them. Do not unmount.
- **Next** validates only the visible step. On failure, focus the first invalid question and announce the message.
- **Step change:** scroll the card top into view and move focus to the step heading (`tabIndex={-1}`).
- **Conditional questions** that are hidden submit nothing. Clear their value when their trigger is deselected.
- **Autosave.** After every change, write the answers to `sessionStorage` under `zd-project-request-v1`, wrapped in try/catch. On mount, restore and return to the saved step. Clear on success. This covers a backgrounded tab and the WhatsApp in-app browser reloading. No server-side partial capture.
- **Browser back button.** Push a history entry per step (`?step=2`) so the phone's back gesture goes to the previous step, not out of the form. `Back` in the form calls `history.back()`.
- **Enter key** inside a text input advances the step. It must never submit before step 4.
- **Submit failure.** Keep every answer, show the message above the button, keep the button enabled.
- **No-JS fallback.** Not required. The page is sent to known people.
- **Analytics.** `trackLead("project-request")` on success. Also fire one event per step reached, named `project_request_step` with `{ step: 1 | 2 | 3 | 4 }`, through whatever the existing analytics helper allows. If it only supports `trackLead`, add a small `trackStep` beside it and gate it on consent exactly as `trackLead` is gated.

### Accessibility and phone mechanics

- Real `<input type="radio">` and `<input type="checkbox">` inside `<label>` tiles, grouped in `<fieldset>` with a `<legend>`. Never divs with click handlers.
- Tiles are full width on phones, two columns from `sm`, minimum height 48px, at least 8px apart.
- Text inputs render at 16px or larger so iOS does not zoom.
- Selected state is border plus fill plus the native control's checked mark. Never colour alone.
- Progress row: text `Step 2 of 4 · Size and features` plus a four-segment bar with `role="progressbar"`, `aria-valuemin="1"`, `aria-valuemax="4"`, `aria-valuenow`.
- Errors: `aria-invalid`, `aria-describedby` to the message, message in `-ink` red with an icon or prefix word, per the -ink Split Rule in `DESIGN.md`.
- Revealed fields are announced: put them directly after their trigger in the DOM.
- Respect `prefers-reduced-motion`: no step slide, a plain swap.
- `Next` and `Send my request` are full width on phones.

---

## 8. The `via` parameter

`/project-request?via=<code>` lets Pavle tag where a lead came from. `<code>` is a short lowercase slug with no personal data in it, for example `ads` or `linkedin`. Validate with `/^[a-z0-9-]{1,24}$/`, otherwise ignore it.

- Stored in `payload.via` and shown in the founder email.
- **When `via` is present, question 11 (budget) is not rendered.** Leads that arrive through a partner are priced by the partner, so the form must not put euro figures in front of them.
- Read it with `useSearchParams` inside a `Suspense` boundary, as `PartnerForm` does. Keep it in a hidden input so it survives autosave and submit.

Never put a name, email or phone number in the URL.

---

## 9. Server action

`submitProjectRequest(_prev, formData)` in `app/project-request/actions.ts`, same shape as `submitPartnerApplication`.

1. Honeypot `fax` filled → return success silently.
2. `rateLimited(ip)` → error.
3. Read and trim every field. **Whitelist every choice value against `content/project-request.ts`.** Anything not in the list is dropped. Cap text lengths server-side.
4. Validate the required set from §6, including `phone` when `replyBy` needs it.
5. Compute `pages`, `scope`, `flags`, `assumptions` from `lib/projectRequest.ts` (§10).
6. `storeSubmission({ source: "project-request", name, email, phone, website: currentUrl, message: note, payload })` where `payload` holds every other answer as strings (join multi-selects with ` | `), plus `via`, `pages`, `scope`.
7. `notify({ subject, replyTo: email, to: process.env.PROJECT_REQUEST_TO_EMAIL, lines })`.
8. Success if **either** leg succeeded, as on the other forms. If both fail, log and return the error from §6.

`PROJECT_REQUEST_TO_EMAIL` unset falls through to `AUDIT_TO_EMAIL`, which is already how `notify` behaves. Do not hardcode an address.

---

## 10. The founder email: what makes the answers quotable

The form is only as good as the email it produces. This is plain text through `notify`.

### `lib/projectRequest.ts`

**`countPages(find, serviceCount)`** returns `{ min, max, list }`.

- Each selected tile counts as 1, except:
  - `A separate page for each service`: `2 to 4` → 2 to 4, `5 to 8` → 5 to 8, `9 or more` → 9 to 12, `Not sure` → 3 to 6. Add 1 for the services index.
  - `Past work or portfolio`, `Case studies`, `Blog or articles`, `Locations or areas you cover`, `Team`: 1 page each, and mark the item as `CMS` in the list.
- `Not sure, suggest what I need` → `{ min: 5, max: 8 }`, list `Not specified`.
- Always add 1 for legal pages.

**`suggestScope(answers, pages)`** returns one string. Tier names come from `content/home.ts` `pricing.tiers[n].name`, never typed by hand, and **no prices appear in the email**.

- Q1 is only the landing page → `Landing page`
- Q1 includes store, or block A is shown → `Custom: store. Quote by hand.`
- Q1 includes moving platform → `Custom: migration. Quote by hand.`
- Q1 is only `More visitors from Google` → `SEO only. Quote by hand.`
- Otherwise, by `pages.max` and features:
  - `pages.max` ≤ 5, no CMS item, and Q5 is only the enquiry form, chat button or nothing → first tier's name
  - `pages.max` ≤ 12 → second tier's name
  - above 12, or members area, or more than one language → `Custom. Quote by hand.`
- Append ` (range: unclear answers below)` when `assumptions` is not empty.

**`buildFlags(answers, pages, scope)`** returns short lines for anything that moves the price or the date:

- `Copy: needs writing` / `Copy: partial`
- `Photos: none` / `Photos: phone quality`
- `Brand: nothing yet` / `Brand: logo only` / `Brand: refresh wanted`
- `Features: booking`, `payments`, `multilingual ({languages})`, `members area`, `integrations ({tools})`, `other ({doesOther})`
- `Store: {productCount} products, sells on {sellsOn}`
- `Migration: from {platform}, Google traffic: {googleTraffic}` and, when traffic is `Yes, a lot` or `Some`, `Redirect map and ranking check needed`
- `Deadline: ASAP` or `Deadline: within a month` when the scope is the second tier or custom → add `Tight for this scope`
- `Deadline: fixed {date} ({reason})`, with `Tight for this scope` when the date is under 5 weeks away and the scope is the second tier or custom, or under 2 weeks away for anything
- `Budget below likely scope` when: `Under €1,000` and the scope is not a landing page, or `€1,000 to €2,500` and the scope is custom

**`buildAssumptions(answers)`** returns one line per "Not sure" or exclusive-unsure answer, phrased as what Pavle should state in the quote:

- Q1 unsure → `Type of project not chosen: recommend one`
- Q4 unsure → `Page list not chosen: propose one`
- Q5 unsure → `Features not chosen: assume enquiry form only`
- `text` unsure → `Copy: assume it needs writing`
- `photos` unsure → `Photos: assume stock`
- `serviceCount`, `productCount`, `platform`, `googleTraffic`, `seoGoal` unsure → `{label}: ask`

This is the rule for unclear clients: **every "Not sure" becomes a stated assumption, and the quote goes out as a range.**

### Subject

`Project request: {name}{, company} | {scope} | {pages.min}-{pages.max} pages | {deadline short} | {budget or "no budget given"}`

### Body

```
{name}{ · company}
{business}
Reply by: {replyBy}  {email}  {phone}
WhatsApp: https://wa.me/{digits}        (only when phone is given)
Came via: {via}                         (only when present)

SUGGESTED SCOPE
{scope}
Pages: {min} to {max}

FLAGS
- {flag}
- {flag}

STATE THESE AS ASSUMPTIONS
- {assumption}

PAGE LIST
- Home
- Services (index)
- Service pages x 5 to 8
- Case studies (CMS)
- ...

ANSWERS
Needs: ...
Current site: {currentUrl or "none"}
Should do: ...
Text: ...
Photos: ...
Brand: ...
Likes: ...
Deadline: ...
Budget: ...
Note: ...
```

Omit any section that is empty. `replyTo` is the client's email, so Reply goes straight to them.

---

## 11. Impeccable passes

Run in this order and fix what each raises before the next.

1. `/impeccable layout` on the form card and tile grids at 360px, 390px and 768px. Target: no horizontal scroll, the primary button reachable without scrolling past more than two questions on a 390 × 844 screen for steps 3 and 4.
2. `/impeccable clarify` on every label, hint and error. The reader is a clinic owner on a phone. No jargon: the words CMS, integration, SEO, hosting, responsive and platform-specific terms must not appear in anything the visitor reads, apart from the platform names in block B.
3. `/impeccable harden`: empty states, long text, a 200-character business line, a URL with spaces, double submit, slow network, storage unavailable, back and forward gestures.
4. `/impeccable audit` for accessibility: keyboard only, VoiceOver through all four steps, 200% zoom, contrast on both light grounds.
5. `/impeccable critique` last, against `DESIGN.md`. Flat, hairline borders, no shadows, the accent only on selected state, focus and the primary button.

---

## 12. Considered and rejected for version one

Do not build these. They are listed so nobody adds them back without asking.

- **Live price estimate on the last screen.** A number computed from "not sure" answers anchors the quote before copy, brand and deadline are weighed, and it is wrong for stores and migrations.
- **One question per screen.** Twelve transitions on a weak connection, and more state to keep. Four steps keeps the short feel.
- **File upload for logos.** No upload infrastructure exists. He asks for files in his reply.
- **Calendar on the thank-you screen.** The point is to quote without a call.
- **Confirmation email to the client.** The reply from Pavle is the confirmation.
- **Server-side partial capture.** He knows who he sent the link to and can follow up by name.
- **A Serbian version.** The site is English. Revisit if drop-off shows it matters.
- **A public cost calculator.** A different product.

---

## 13. Definition of done

- [ ] `/project-request` renders with the logo-only white header, the intro, the four-step form and the one-line footer. No site `Nav` or `Footer`.
- [ ] All four privacy layers are in place. `curl -sI` on the deployed URL shows `x-robots-tag: noindex, nofollow`. The page source has the robots meta tag and no canonical. `grep -rn "project-request"` finds no link in `app/(site)`, `components/layout` or `content`, apart from its own content file.
- [ ] Every question, option, hint and message matches §6 word for word, and lives in `content/project-request.ts`.
- [ ] Every choice question can be answered with a "Not sure" style option and the form can be completed with those alone, plus `business`, `name` and `email`.
- [ ] Conditional blocks A, B and C and each revealed field appear and disappear as specified, and hidden values are not submitted.
- [ ] With `?via=ads`, the budget question is absent and `Came via: ads` is in the email.
- [ ] Reloading mid-form restores answers and step. The phone back gesture moves one step back.
- [ ] A test submission creates a `form_submissions` row with `source = 'project-request'` and a full `payload`, and an email arrives at `PROJECT_REQUEST_TO_EMAIL` with subject, scope, page range, flags, assumptions, page list and answers. Reply goes to the submitter.
- [ ] With `RESEND_API_KEY` unset the row is still stored and the visitor sees success. With both legs failing, the visitor sees the error and keeps their answers.
- [ ] Unit tests for `countPages`, `suggestScope`, `buildFlags`, `buildAssumptions` cover: landing page only, 5-page brochure site, 12-page site with case studies, store, migration with Google traffic, SEO only, and an all-"Not sure" submission.
- [ ] No euro figure appears anywhere except the four budget options. No tier price in the email.
- [ ] `npx tsc --noEmit` and `npx eslint .` clean. No em dashes in rendered copy.
- [ ] The five impeccable passes in §11 are done and their findings fixed or listed.
- [ ] Delete the test row from Supabase afterwards and say so.

---

## 14. For the owner, before or after the build

1. **Set `PROJECT_REQUEST_TO_EMAIL` in Vercel** to the full `pavlem.dev@…` address. Until it is set, requests go to the same inbox as the audit form.
2. **Budget question:** it is optional and hidden for `?via=` links. Say if you want it removed for everyone.
3. **Add-on prices:** the email flags copywriting, brand, booking, multilingual and rush deadlines, but puts no numbers on them. If you keep a private list of what each adds, quotes from this form take two minutes.
4. **Partner clients:** this page carries the Zenith Digital wordmark. If white-label clients should never see it, they need a different intake route.
