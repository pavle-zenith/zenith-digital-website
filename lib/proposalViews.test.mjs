/**
 * Proposal-view notification tests. Run with `npm test`.
 *
 * The user agents are real ones, so a change to the bot list that starts
 * catching people (or stops catching scanners) fails here first.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  countryName,
  deviceType,
  isBot,
  throttleKey,
  viewEmail,
} from "./proposalViews.ts";

const PEOPLE = {
  chromeMac:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  safariIphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  androidTablet:
    "Mozilla/5.0 (Linux; Android 14; SM-X710) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  cubotPhone:
    "Mozilla/5.0 (Linux; Android 12; CUBOT KingKong 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  linkedinInApp:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [LinkedInApp]/9.30.1",
  facebookInApp:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/480.0.0.0]",
  edgeWindows:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
};

const MACHINES = {
  googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  headless:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/130.0.0.0 Safari/537.36",
  slack: "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
  facebook: "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  whatsapp: "WhatsApp/2.23.20.0 A",
  teams: "Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5",
  office: "Microsoft Office/16.0 (Windows NT 10.0; Microsoft Outlook 16.0.17928; Pro)",
  bingPreview: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) BingPreview/1.0b",
  curl: "curl/8.7.1",
  python: "python-requests/2.32.3",
  lighthouse:
    "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse",
};

test("real browsers, including in-app ones, are people", () => {
  for (const [name, ua] of Object.entries(PEOPLE)) assert.equal(isBot(ua), false, name);
});

test("crawlers, link previews and scanners are bots", () => {
  for (const [name, ua] of Object.entries(MACHINES)) assert.equal(isBot(ua), true, name);
});

test("a missing or stub user agent counts as a bot", () => {
  assert.equal(isBot(null), true);
  assert.equal(isBot(""), true);
  assert.equal(isBot("Mozilla"), true);
});

test("device type", () => {
  assert.equal(deviceType(PEOPLE.chromeMac), "Desktop");
  assert.equal(deviceType(PEOPLE.chromeMac, true), "Tablet"); // iPadOS Safari
  assert.equal(deviceType(PEOPLE.safariIphone), "Phone");
  assert.equal(deviceType(PEOPLE.cubotPhone), "Phone");
  assert.equal(deviceType(PEOPLE.androidTablet), "Tablet");
  assert.equal(deviceType(PEOPLE.edgeWindows, true), "Desktop"); // touch laptop
});

test("one throttle key per slug per clock hour", () => {
  const t = Date.UTC(2026, 10, 9, 14, 5);
  assert.equal(throttleKey("a", t), throttleKey("a", t + 50 * 60 * 1000));
  assert.notEqual(throttleKey("a", t), throttleKey("a", t + 60 * 60 * 1000));
  assert.notEqual(throttleKey("a", t), throttleKey("b", t));
});

test("country names, and no guess when the header is missing or unknown", () => {
  assert.equal(countryName("DE"), "Germany");
  assert.equal(countryName("CH"), "Switzerland");
  assert.equal(countryName(null), null);
  assert.equal(countryName("XX"), null);
  assert.equal(countryName("T1"), null);
  assert.equal(countryName("de"), null);
});

test("email subject and body", () => {
  const { subject, text } = viewEmail({
    client: "SalesWings",
    slug: "saleswings-fe50n",
    url: "https://www.thezenithdigital.com/proposal/saleswings-fe50n",
    now: Date.UTC(2026, 10, 9, 15, 42),
    country: "Switzerland",
    device: "Desktop",
  });
  assert.equal(subject, "Proposal opened: SalesWings – saleswings-fe50n");
  // ICU builds differ on the joiner (", " or " at "), so only pin the parts.
  assert.match(text, /Time: Mon, 9 November 2026(,| at) 16:42 \(Belgrade time\)/);
  assert.match(text, /Country: Switzerland/);
  assert.match(text, /Device: Desktop/);
  assert.doesNotMatch(text, /\d+\.\d+\.\d+\.\d+/); // no IP address
});
