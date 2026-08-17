/**
 * content/legal.ts — /privacy and /terms.
 *
 * DRAFTED, NOT LAWYERED (17 Aug 2026). Every statement here was written
 * against what this codebase actually does, so it is accurate rather than
 * generic: the processors listed are the ones the site really calls, the
 * retention periods match the code, and nothing claims a practice we don't
 * have. It still needs a review by someone qualified in Serbian and EU/UK data
 * law before launch.
 *
 * KEEP IN SYNC. If any of these change, this file changes with them:
 *   - a new form field                → §"What we collect"
 *   - a new third-party service       → the processors table
 *   - PostHog switched on             → processors table + analytics section
 *   - the Supabase project or region  → "Where your data is held"
 *   - the rate-limit window           → the anti-spam row (currently 1 hour,
 *                                       lib/forms.ts WINDOW_MS)
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDocument = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const ENTITY =
  "MILORAD MAODUS PR RACUNARSKO PROGRAMIRANJE ZENITH DIGITAL KANJIZA";
const EMAIL = "hello@thezenithdigital.com";

export const privacyPolicy: LegalDocument = {
  title: "Privacy policy",
  updated: "17 August 2026",
  intro:
    "This policy explains what this website collects, why, and what you can do about it. It covers thezenithdigital.com and the enquiry forms on it. It is written to be read, not to be survived.",
  sections: [
    {
      heading: "Who is responsible for your data",
      blocks: [
        {
          type: "p",
          text: `Zenith Digital is the trading name of ${ENTITY}, registered in Serbia. We decide what happens to the personal data described here, which makes us the data controller for it.`,
        },
        {
          type: "p",
          text: `For anything in this policy, including any request about your own data, write to ${EMAIL} and a person will answer.`,
        },
      ],
    },
    {
      heading: "What we collect, and when",
      blocks: [
        {
          type: "p",
          text: "We collect the following, and nothing else. There is no account system, no newsletter, and no advertising or profiling on this site.",
        },
        {
          type: "table",
          head: ["When", "What", "Why"],
          rows: [
            [
              "You send the contact form",
              "Name, email, message, and optionally phone and website",
              "To answer your enquiry",
            ],
            [
              "You request a free website audit",
              "Website address, email, and an optional note",
              "To review your site and send you the audit",
            ],
            [
              "You apply to partner with us",
              "Agency name, your name, email, website, the track you want, and an optional note",
              "To assess and answer the application",
            ],
            [
              "You book a call",
              "Whatever you enter in the Cal.com booking form",
              "To schedule the call. Cal.com handles this under its own policy",
            ],
            [
              "You submit any form",
              "Your IP address, held in memory for up to one hour",
              "To rate-limit submissions and block spam",
            ],
            [
              "You accept analytics cookies",
              "Pages viewed, approximate location, device and browser, referring site",
              "To see which pages earn their place",
            ],
            [
              "Any visit",
              "Standard server logs, including IP address, kept by our host",
              "Security and keeping the site running",
            ],
          ],
        },
      ],
    },
    {
      heading: "Cookies and analytics",
      blocks: [
        {
          type: "p",
          text: "This site sets no analytics cookies until you accept them. Google Analytics loads with consent defaulted to denied, which means it sends anonymous, cookieless signals only. If you accept, it sets its usual cookies. If you decline, it never does.",
        },
        {
          type: "p",
          text: "Advertising and personalisation storage stay switched off permanently, whatever you choose, because this site runs no ad products.",
        },
        {
          type: "p",
          text: "Your answer is remembered in your browser's local storage under the key zd-analytics-consent. Clearing your browser storage for this site makes the banner ask again.",
        },
      ],
    },
    {
      heading: "Who else touches your data",
      blocks: [
        {
          type: "p",
          text: "We use a small number of established providers. They process data on our instructions and for no purpose of their own.",
        },
        {
          type: "table",
          head: ["Provider", "What it does", "Where"],
          rows: [
            [
              "Vercel",
              "Hosts the site and keeps server logs",
              "Global edge network",
            ],
            [
              "Supabase",
              "Stores form submissions in a Postgres database",
              "Frankfurt, Germany (EU)",
            ],
            ["Resend", "Delivers the notification email to us", "EU and US"],
            [
              "Google Analytics",
              "Website analytics, only after you accept",
              "Google infrastructure, EU and US",
            ],
            [
              "Cal.com",
              "The booking calendar embedded on the book a call page",
              "EU and US",
            ],
          ],
        },
        {
          type: "p",
          text: "We do not sell your data, share it with advertisers, or pass it to anyone else. Serbia sits outside the EEA and the UK, so data reaching us is transferred to a third country. Where that happens we rely on the appropriate safeguards available under the relevant law, and the volume involved is limited to the enquiry data above.",
        },
      ],
    },
    {
      heading: "Why we are allowed to hold it",
      blocks: [
        {
          type: "list",
          items: [
            "Enquiry and application data: we process it to take steps at your request before entering a contract, and because we have a legitimate interest in answering people who contact us.",
            "Analytics: your consent, given through the banner and withdrawable at any time.",
            "Server logs and rate limiting: our legitimate interest in keeping the site available and free of spam.",
          ],
        },
      ],
    },
    {
      heading: "How long we keep it",
      blocks: [
        {
          type: "list",
          items: [
            "Enquiries, audit requests and partner applications: kept while the conversation is live, and for up to 24 months afterwards so we can pick up where we left off. Ask us to delete yours sooner and we will.",
            "Rate-limiting records: up to one hour, and they are lost whenever the site redeploys.",
            "Analytics: retained by Google under the retention period set on the property.",
            "Server logs: retained by our host under its own schedule.",
          ],
        },
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: "If you are in the UK or the EU, the GDPR gives you the rights below. If you are in Serbia, the Law on Personal Data Protection gives you equivalent ones. We apply them to everyone who asks, wherever you are, because maintaining two standards is not worth anyone's time.",
        },
        {
          type: "list",
          items: [
            "Ask what we hold about you, and get a copy.",
            "Have anything wrong corrected.",
            "Have it deleted.",
            "Object to processing, or ask us to restrict it.",
            "Receive your data in a portable format.",
            "Withdraw consent for analytics at any time, without affecting anything processed before.",
          ],
        },
        {
          type: "p",
          text: `Email ${EMAIL} and we will action it within 30 days. If you think we have handled your data badly, you can complain to your national data protection authority, or in Serbia to the Commissioner for Information of Public Importance and Personal Data Protection.`,
        },
      ],
    },
    {
      heading: "Children",
      blocks: [
        {
          type: "p",
          text: "This site sells business services and is not intended for children. We do not knowingly collect data from anyone under 16.",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          type: "p",
          text: "If this policy changes, the date at the top changes with it. Material changes to how we use existing data will be told to anyone affected directly, not buried here.",
        },
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  title: "Terms of service",
  updated: "17 August 2026",
  intro:
    "These terms cover using this website. Client projects are governed by the written proposal you sign, which takes precedence over anything here.",
  sections: [
    {
      heading: "Who you are dealing with",
      blocks: [
        {
          type: "p",
          text: `Zenith Digital is the trading name of ${ENTITY}, registered in Serbia. In these terms, "we" and "us" mean that company, and "you" means anyone using this website.`,
        },
      ],
    },
    {
      heading: "Using this site",
      blocks: [
        {
          type: "p",
          text: "You may read, print and share this site freely. You may not scrape it at a volume that degrades it for other people, attempt to break into any part of it, or copy its design or written content to pass off as your own.",
        },
        {
          type: "p",
          text: "Automated agents and AI crawlers are welcome to read and cite this site. That is a deliberate choice and our robots.txt says so.",
        },
      ],
    },
    {
      heading: "What the content on this site is, and is not",
      blocks: [
        {
          type: "p",
          text: "Everything here is provided for information. Prices are starting points, timelines are typical rather than promised, and nothing on this site is an offer capable of acceptance. A binding engagement starts when we both sign a proposal.",
        },
        {
          type: "p",
          text: "The results shown in the case studies are real and belong to the named clients. They describe what happened for those businesses, in their markets, at that time. They are not a prediction or a guarantee of what will happen for you. Any figure on this site that we could not trace to a named client was cut rather than estimated.",
        },
      ],
    },
    {
      heading: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "The design, code, text and images on this site belong to us, except for client logos, client site screenshots and client testimonials, which belong to those clients and appear with their permission.",
        },
        {
          type: "p",
          text: "Work we produce for a client transfers to that client on full payment, as set out in their proposal. Unless we agree otherwise in writing, we keep the right to show that work publicly as a portfolio piece.",
        },
      ],
    },
    {
      heading: "Projects, quotes and payment",
      blocks: [
        {
          type: "p",
          text: "Every project is quoted individually with a fixed price and a fixed timeline before work starts. Scope, payment schedule, revision rounds, support window and everything else commercial live in that proposal, not on this page.",
        },
        {
          type: "p",
          text: "Timelines assume you come back to us on feedback within the windows the proposal sets. Where a project runs late because feedback did not arrive, the delivery date moves by the same amount.",
        },
      ],
    },
    {
      heading: "Third-party platforms",
      blocks: [
        {
          type: "p",
          text: "We build on platforms we do not control, including Wix Studio, Vercel and various hosting and analytics providers. Your use of those platforms is governed by their terms, and their availability and pricing are theirs to set. We will tell you plainly when a platform's limits affect what you asked for.",
        },
        {
          type: "p",
          text: "This site links to other sites. We are not responsible for what is on them.",
        },
      ],
    },
    {
      heading: "Liability",
      blocks: [
        {
          type: "p",
          text: "This website is provided as it is. We do not warrant that it will be uninterrupted or error-free, and we are not liable for any loss arising from relying on information published here.",
        },
        {
          type: "p",
          text: "For client work, our liability is limited to the fees paid for the project in question, and we are not liable for indirect or consequential losses such as lost profit or lost data. Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited.",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          type: "p",
          text: "We may update these terms. The date at the top shows when they last changed, and the version live at the time you use the site is the one that applies.",
        },
      ],
    },
    {
      heading: "Law and disputes",
      blocks: [
        {
          type: "p",
          text: "These terms are governed by the law of the Republic of Serbia, and the courts of Serbia have jurisdiction over any dispute about them. If you are a consumer in the UK or the EU, this does not remove protections you have under the law of the country you live in.",
        },
        {
          type: "p",
          text: `Before anything reaches a court, email ${EMAIL}. Most things resolve in a conversation.`,
        },
      ],
    },
  ],
};
