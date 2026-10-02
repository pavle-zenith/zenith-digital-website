/**
 * Project request tests. Run with `npm test`.
 *
 * Node's own runner with type stripping, importing the .ts sources by
 * explicit path (the same setup as content/audits/score.test.mjs). The
 * `--import scripts/test-resolve.mjs` hook in the npm script resolves the
 * `@/` alias the sources use.
 *
 * The seven scenarios are the ones Docs/Project_Request_Handoff.md §13 asks
 * for. Tier names are read from the pricing content, never typed here, so a
 * renamed tier changes what these expect rather than breaking them.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { pricing } from "../content/home.ts";
import {
  emptyAnswers,
  firstIncompleteStep,
  parseAnswers,
  prune,
  toggle,
  validateStep,
  visibility,
} from "./projectRequestForm.ts";
import {
  buildAssumptions,
  buildFlags,
  buildPayload,
  buildQuote,
  countPages,
  emailLines,
  emailSubject,
  pagesFor,
  suggestScope,
} from "./projectRequest.ts";

const [FIRST, SECOND] = pricing.tiers.map((t) => t.name);
const TODAY = new Date(2026, 9, 2); // 2 Oct 2026, the brief's date

/** A complete, valid request with the given answers on top. */
function req(overrides = {}) {
  return prune({
    ...emptyAnswers,
    need: ["new-site"],
    hasSite: "no",
    business: "Physiotherapy clinic in Novi Sad, two locations",
    find: ["home", "contact"],
    does: ["enquiries"],
    text: "ready",
    photos: "good",
    brand: "set",
    deadline: "1-3-months",
    name: "Ana Petrović",
    email: "ana@example.com",
    ...overrides,
  });
}

function quote(a) {
  const pages = pagesFor(a);
  const scope = suggestScope(a, pages);
  return { pages, scope, flags: buildFlags(a, pages, scope, TODAY), assumptions: buildAssumptions(a) };
}

// ---------------------------------------------------------------------------
// The seven scenarios
// ---------------------------------------------------------------------------

test("landing page only: Q4 skipped, two pages, landing scope, nothing flagged", () => {
  const a = req({ need: ["landing"], find: ["home", "about"], budget: "under-1000" });
  assert.equal(visibility(a).find, false);
  assert.deepEqual(a.find, [], "a hidden question submits nothing");
  const q = quote(a);
  assert.deepEqual(q.pages, { min: 2, max: 2, list: ["Landing page", "Legal pages"] });
  assert.equal(q.scope, "Landing page");
  assert.deepEqual(q.flags, [], "under €1,000 is not below scope for a landing page");
  assert.deepEqual(q.assumptions, []);
});

test("5-page brochure site: first tier, ASAP is not tight for it", () => {
  const a = req({
    find: ["home", "about", "services-one", "contact"],
    does: ["enquiries", "chat"],
    text: "needs-writing",
    deadline: "asap",
  });
  const q = quote(a);
  assert.deepEqual(q.pages, {
    min: 5,
    max: 5,
    list: ["Home", "About us", "Services, all on one page", "Contact", "Legal pages"],
  });
  assert.equal(q.scope, FIRST);
  assert.deepEqual(q.flags, ["Copy: needs writing", "Deadline: ASAP"]);
});

test("12-page site with case studies: second tier, CMS items marked, a month is tight", () => {
  const a = req({
    find: ["home", "about", "services-one", "case-studies", "team", "reviews", "prices", "blog", "faq", "contact", "careers"],
    does: ["enquiries", "booking"],
    deadline: "month",
    budget: "1000-2500",
  });
  const q = quote(a);
  assert.equal(q.pages.min, 12);
  assert.equal(q.pages.max, 12);
  assert.ok(q.pages.list.includes("Case studies (CMS)"));
  assert.ok(q.pages.list.includes("Team (CMS)"));
  assert.ok(q.pages.list.includes("Blog or articles (CMS)"));
  assert.equal(q.scope, SECOND);
  assert.deepEqual(q.flags, ["Features: booking", "Deadline: within a month, tight for this scope"]);
});

test("store: custom scope, store line, budget flagged", () => {
  const a = req({
    need: ["store"],
    find: ["home", "about", "contact"],
    does: ["payments"],
    productCount: "51-200",
    sellsNow: "yes",
    sellsOn: "Etsy",
    budget: "1000-2500",
  });
  assert.equal(visibility(a).blockA, true);
  const q = quote(a);
  assert.equal(q.scope, "Custom: store. Quote by hand.");
  assert.deepEqual(q.flags, [
    "Features: payments",
    "Store: 51 to 200 products, sells on Etsy",
    "Budget below likely scope",
  ]);
});

test("payments alone shows block A and makes the scope a store", () => {
  const a = req({ does: ["enquiries", "payments"], productCount: "up-to-10", sellsNow: "no" });
  assert.equal(visibility(a).blockA, true);
  assert.equal(quote(a).scope, "Custom: store. Quote by hand.");
  assert.ok(quote(a).flags.includes("Store: Up to 10 products, not selling online yet"));
});

test("migration with Google traffic: redirect map flagged, a 3-week date is tight", () => {
  const a = req({
    need: ["migrate"],
    hasSite: "yes",
    currentUrl: "oldclinic.rs",
    find: ["home", "about", "services-one", "contact"],
    platform: "wordpress",
    googleTraffic: "a-lot",
    deadline: "fixed",
    deadlineDate: "2026-10-23",
    deadlineReason: "Opening the second clinic",
  });
  const q = quote(a);
  assert.equal(q.scope, "Custom: migration. Quote by hand.");
  assert.deepEqual(q.flags, [
    "Migration: from WordPress, Google traffic: Yes, a lot",
    "Redirect map and ranking check needed",
    "Deadline: fixed 23 Oct 2026 (Opening the second clinic), tight for this scope",
  ]);
});

test("SEO only: no pages, SEO scope, any budget under €1,000 flagged", () => {
  const a = req({ need: ["seo"], find: ["home"], seoGoal: "local", budget: "under-1000" });
  assert.equal(visibility(a).find, false);
  assert.equal(visibility(a).blockC, true);
  const q = quote(a);
  assert.deepEqual(q.pages, { min: 0, max: 0, list: [] });
  assert.equal(q.scope, "SEO only. Quote by hand.");
  assert.deepEqual(q.flags, ["Budget below likely scope"]);
  assert.ok(!emailSubject(a, q).includes("pages"), "no page count for work with no pages");
});

test('all "Not sure": every unsure answer becomes an assumption, quoted as a range', () => {
  const a = req({
    need: ["unsure"],
    find: ["unsure"],
    does: ["unsure"],
    text: "unsure",
    photos: "unsure",
    brand: "nothing",
    deadline: "no-rush",
    budget: "unsure",
  });
  assert.deepEqual(validateStep(1, a), []);
  assert.deepEqual(validateStep(2, a), []);
  assert.deepEqual(validateStep(3, a), []);
  assert.deepEqual(validateStep(4, a), []);
  const q = quote(a);
  assert.deepEqual(q.pages, { min: 5, max: 8, list: ["Not specified"] });
  assert.equal(q.scope, `${SECOND} (range: unclear answers below)`);
  assert.deepEqual(q.assumptions, [
    "Type of project not chosen: recommend one",
    "Page list not chosen: propose one",
    "Features not chosen: assume enquiry form only",
    "Copy: assume it needs writing",
    "Photos: assume stock",
  ]);
  assert.deepEqual(q.flags, ["Brand: nothing yet"]);
});

test("unsure conditional answers are asked about, by name", () => {
  const a = req({
    need: ["migrate", "store", "seo"],
    find: ["services-each"],
    serviceCount: "unsure",
    does: ["payments"],
    productCount: "unsure",
    sellsNow: "no",
    platform: "unsure",
    googleTraffic: "unsure",
    seoGoal: "unsure",
  });
  assert.deepEqual(buildAssumptions(a), [
    "Number of services: ask",
    "Number of products: ask",
    "Current platform: ask",
    "Google traffic worth keeping: ask",
    "What they want more of from Google: ask",
  ]);
  assert.deepEqual(countPages(a.find, a.serviceCount), {
    min: 5,
    max: 8,
    list: ["Services (index)", "Service pages x 3 to 6", "Legal pages"],
  });
});

// ---------------------------------------------------------------------------
// Scope edges
// ---------------------------------------------------------------------------

test("members area or a second language makes even a small site custom", () => {
  assert.equal(quote(req({ does: ["members"] })).scope, "Custom. Quote by hand.");
  assert.equal(quote(req({ does: ["languages"], languages: "Serbian, English" })).scope, "Custom. Quote by hand.");
  assert.ok(
    quote(req({ does: ["languages"], languages: "Serbian, English" })).flags.includes(
      "Features: multilingual (Serbian, English)",
    ),
  );
});

test("more than 12 pages is custom; a CMS item lifts a small site to the second tier", () => {
  const big = req({ find: ["home", "services-each"], serviceCount: "9+" });
  assert.deepEqual([pagesFor(big).min, pagesFor(big).max], [12, 15]);
  assert.equal(quote(big).scope, "Custom. Quote by hand.");
  assert.equal(quote(req({ find: ["home", "blog"] })).scope, SECOND);
});

test("a fixed date under two weeks is tight for anything; five weeks only for large scopes", () => {
  const soon = req({ deadline: "fixed", deadlineDate: "2026-10-12" });
  assert.equal(quote(soon).scope, FIRST);
  assert.ok(quote(soon).flags.at(-1).endsWith("tight for this scope"));
  const month = req({ deadline: "fixed", deadlineDate: "2026-10-30" });
  assert.ok(!quote(month).flags.at(-1).endsWith("tight for this scope"));
  const noDate = req({ deadline: "fixed" });
  assert.deepEqual(quote(noDate).flags, ["Deadline: fixed, date not given"]);
});

// ---------------------------------------------------------------------------
// The form rules
// ---------------------------------------------------------------------------

test("exclusive options clear the others, and the others clear them", () => {
  assert.deepEqual(toggle("need", ["new-site", "store"], "unsure"), ["unsure"]);
  assert.deepEqual(toggle("need", ["unsure"], "store"), ["store"]);
  assert.deepEqual(toggle("does", ["nothing"], "unsure"), ["unsure"]);
  assert.deepEqual(toggle("does", ["enquiries"], "enquiries"), []);
});

test("validation names the missing answers in screen order, with the right message", () => {
  const blank = { ...emptyAnswers };
  assert.deepEqual(validateStep(1, blank), [
    ["need", "Pick an option, or choose “Not sure”."],
    ["hasSite", "Pick an option."],
    ["business", "Add a sentence about your business."],
  ]);
  assert.deepEqual(validateStep(1, req({ hasSite: "yes", currentUrl: "my clinic" }))[0], [
    "currentUrl",
    "That doesn't look like a website address.",
  ]);
  assert.deepEqual(validateStep(4, req({ email: "" }))[0], ["email", "Add your email."]);
  assert.deepEqual(validateStep(4, req({ email: "ana@", replyBy: "whatsapp" })), [
    ["email", "That doesn't look like an email address."],
    ["phone", "Add a number so I can reach you there."],
  ]);
  assert.equal(firstIncompleteStep(req({ text: "" }), 4), 3);
  // A space in the domain fails everywhere; one in the path is fine.
  for (const bad of ["my clinic.com", "my clinic .com", "https://my clinic.com/x"]) {
    assert.equal(validateStep(1, req({ hasSite: "yes", currentUrl: bad }))[0]?.[0], "currentUrl", bad);
  }
  assert.deepEqual(validateStep(1, req({ hasSite: "yes", currentUrl: "myclinic.com/about us" })), []);
});

test("the server keeps only listed values and drops hidden answers", () => {
  const form = new FormData();
  const set = (k, v) => form.append(k, v);
  set("need", "landing");
  set("need", "hack");
  set("hasSite", "maybe");
  set("business", "x".repeat(400));
  set("find", "home");
  set("does", "nothing");
  set("does", "unsure");
  set("productCount", "11-50");
  set("budget", "under-1000");
  set("via", "Ads Team");
  set("deadline", "fixed");
  set("deadlineDate", "not-a-date");
  set("name", "Ana\r\nBcc: x@example.com");
  set("note", "Line one\nLine two");
  const a = parseAnswers(
    (k) => String(form.get(k) ?? ""),
    (k) => form.getAll(k).map(String),
  );
  assert.deepEqual(a.need, ["landing"]);
  assert.equal(a.hasSite, "");
  assert.equal(a.business.length, 200);
  assert.deepEqual(a.find, [], "Q4 is hidden for a landing page alone");
  assert.deepEqual(a.does, ["nothing"], "two exclusives keep the first");
  assert.equal(a.productCount, "", "block A is hidden");
  assert.equal(a.via, "", "a via that isn't a slug is ignored");
  assert.equal(a.budget, "under-1000");
  assert.equal(a.deadlineDate, "");
  assert.equal(a.name, "Ana Bcc: x@example.com", "no line break survives in a one-line answer");
  assert.equal(a.note, "Line one\nLine two", "the textareas keep theirs");
});

test("a via link hides the budget, and the email says where it came from", () => {
  const a = req({ via: "ads", budget: "under-1000" });
  assert.equal(visibility(a).budget, false);
  assert.equal(a.budget, "", "the budget is dropped, not just hidden");
  const q = buildQuote(a, TODAY);
  const body = emailLines(a, q).join("\n");
  assert.ok(body.includes("Came via: ads"));
  assert.ok(emailSubject(a, q).endsWith("| no budget given"));
  assert.equal(buildPayload(a, q).via, "ads");
});

test("the email carries no price except a chosen budget band", () => {
  const a = req({ need: ["new-site", "store"], does: ["payments", "booking"], productCount: "200+", sellsNow: "no" });
  const q = buildQuote(a, TODAY);
  const text = [emailSubject(a, q), ...emailLines(a, q)].join("\n");
  assert.ok(!text.includes("€"), "no euro figure without a budget answer");
  // "Custom" is a tier's price label and also a scope word, so only the
  // numeric prices are checked.
  for (const { price } of pricing.tiers) {
    const figure = price.match(/[\d,]+/)?.[0];
    if (figure) assert.ok(!text.includes(figure), `tier price ${price} leaked`);
  }
});

test("subject and body follow the brief's shape", () => {
  const a = req({
    company: "Fizio Plus",
    phone: "+381 64 123 4567",
    replyBy: "whatsapp",
    find: ["home", "about", "contact"],
    budget: "1000-2500",
  });
  const q = buildQuote(a, TODAY);
  assert.equal(
    emailSubject(a, q),
    `Project request: Ana Petrović, Fizio Plus | ${FIRST} | 4 pages | 1 to 3 months | €1,000 to €2,500`,
  );
  const body = emailLines(a, q);
  assert.equal(body[0], "Ana Petrović · Fizio Plus");
  assert.equal(body[2], "Reply by: WhatsApp  ana@example.com  +381 64 123 4567");
  assert.equal(body[3], "WhatsApp: https://wa.me/381641234567");
  assert.ok(!body.includes("FLAGS"), "an empty section is left out");
  assert.ok(body.includes("PAGE LIST"));
});
