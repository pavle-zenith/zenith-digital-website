import type { CtaLink } from "@/lib/types";
import type { MigrationGuideContent } from "./types";

/**
 * /services/ai-website-builder-to-wix-studio
 * Targets: lovable to wix studio · bolt.new to wix · v0 to wix studio · ai
 * website builder seo · vibe coded site not ranking · move off lovable.
 *
 * THE THESIS: you own the code, and that isn't the same as owning a website.
 * All four of these tools hand you a repo. Not one of them hands you a content
 * layer, so every text change is a source-code change made by prompting, and
 * metered. That's the gap Wix Studio fills, and no sibling guide can make this
 * argument because every other platform has a CMS of some kind.
 *
 * WHAT THIS PAGE DELIBERATELY DOESN'T SAY, because the research disproved it:
 * "your code is trapped". It isn't. Lovable offers download on paid plans plus
 * two-way GitHub sync, Bolt has Export > Download and GitHub, v0 says "Export
 * the code to work locally" and Vercel states it doesn't own generated code,
 * Replit has Download as zip and a Git pane. Leading with lock-in would be
 * wrong on the facts and every reader who has used these tools would know it.
 *
 * DATE-GATE, and this is the biggest accuracy trap in the topic: Lovable moved
 * new projects to TanStack Start with SSR on 13 May 2026. The widely repeated
 * "Lovable is a client-rendered SPA that can't be indexed" line is now only
 * true of projects created before that date, which Lovable does not force-
 * migrate. The page says which era it's talking about every time.
 *
 * THE NON-OBVIOUS DETAIL WORTH THE WHOLE PAGE: Lovable's prerendered HTML is
 * served only to verified search and AI crawlers, and its own docs say
 * "Third-party SEO scanners and other unverified agents see the regular
 * single-page app". So Screaming Frog, Ahrefs and Sitebulb return an empty
 * shell on an older Lovable site. Nobody has written that down, and it is the
 * single most useful thing an agency can tell this reader.
 *
 * DROPPED CLAIM: the widely circulated "Lovable generates /page?id=123 URLs"
 * has no primary source and current docs recommend the opposite. It is most
 * likely confusion with Base44's query-parameter routing or with Lovable's
 * project editor URLs. Not on the page.
 *
 * NOT DOCUMENTED, hedged rather than asserted: what technology powers Bolt's
 * own built-in database or how you export from it, what happens to a live site
 * on outright non-payment on any of the four, and whether v0 uses the App
 * Router (inferred from the stack, never stated).
 *
 * NO PROOF BLOCK. No client on this platform yet. When one lands this is the
 * first guide to add one to, because the category is young enough that a
 * single named example would outweigh everything else on the page.
 *
 * OWNER — shortest shelf life on the site alongside Wix Harmony. These four
 * products ship changes monthly. Re-check the rendering and pricing claims
 * quarterly, and re-read Lovable's SEO docs before any edit.
 */

const ctas: CtaLink[] = [
  { label: "Book a call", href: "/book-a-call", variant: "primary" },
  {
    label: "Free website audit",
    href: "/free-website-audit",
    variant: "secondary",
  },
];

export const aiBuilders: MigrationGuideContent = {
  slug: "ai-website-builder-to-wix-studio",
  publish: true,
  platform: "AI builders",
  seo: {
    title: "AI Builder to Wix Studio | Lovable, Bolt, v0 | Zenith Digital",
    description:
      "Moving a site built with Lovable, Bolt, v0 or Replit to Wix Studio. What exports, why SEO tools see an empty page, and what a rebuild costs. From €1,750.",
  },

  hero: {
    name: "AI website builder to Wix Studio migration",
    h1: "AI website builders to Wix Studio: the complete migration guide",
    subhead:
      "Lovable, Bolt, v0 and Replit all hand you the code. None of them hands you a content layer, so every text change is a source-code change made by prompting. Here's what moves, what doesn't, and how to tell whether you built a website or an app.",
    chips: [
      "Every claim linked to the vendors' docs",
      "Your code exports from all four",
      "Why your SEO tools see an empty page",
    ],
    ctas,
  },

  glance: {
    heading: "AI builders to Wix Studio, at a glance",
    intro:
      "The short answers, taken from each platform's own documentation rather than from anyone's opinion about vibe coding.",
    items: [
      {
        label: "Can the site be converted",
        value:
          "No. Wix doesn't import sites built elsewhere, and a React codebase isn't a Studio site, so the front end is rebuilt.",
      },
      {
        label: "What comes with you",
        value:
          "Everything, as code. All four export: Lovable and Bolt to GitHub or a download, v0 to Vercel, Replit as a zip.",
      },
      {
        label: "What happens to your URLs",
        value:
          "You decide. Nothing about an AI-scaffolded route structure is governed by a content model, so audit the real routes first.",
      },
      {
        label: "What it costs",
        value:
          "From €1,750, quoted as a fixed price once the page count and the content model are known.",
      },
      {
        label: "How long it takes",
        value:
          "Two to five weeks, plus 30 days of index monitoring after launch.",
      },
      {
        label: "DIY difficulty",
        value:
          "Getting the code out is easy. The hard part is that there's nothing on the other side to import a codebase into.",
      },
    ],
  },

  benefits: {
    heading: "What you get on Wix Studio",
    intro:
      "These tools are genuinely good at getting something real on screen in an afternoon. What they don't give you is the layer that makes a site maintainable by someone who isn't prompting it.",
    items: [
      {
        title: "An actual content layer",
        body: "This is the whole argument. None of these four ships a CMS. They ship visual editors that rewrite source code, so there's no content model, no draft and publish, no scheduling, and no way to roll back a wording change without touching the build.",
      },
      {
        title: "Editing that doesn't consume credits",
        body: "Lovable meters inline text edits above a daily allowance and treats element selection as chat usage. Replit sends larger edits to its agent. On Wix Studio, changing a paragraph costs nothing and needs no prompt.",
      },
      {
        title: "The person who owns the site can change it",
        body: "Right now the answer to any wording change is either a prompt or a developer. Studio hands that back to whoever noticed the typo, which is the difference between a site a business runs and one it commissions.",
      },
      {
        title: "Search engines see the page without a workaround",
        body: "Both Bolt and Lovable bolt prerendering onto a JavaScript app to make it crawlable. Studio server-renders as a matter of course, so indexing isn't a feature you enable and monitor.",
      },
      {
        title: "Your SEO tools work again",
        body: "Prerendering that only answers verified crawlers means Screaming Frog and Ahrefs see an empty shell, so nobody can audit the site properly. On a Studio build every tool sees what Google sees.",
      },
      {
        title: "The business runs on the site, not beside it",
        body: "Forms, bookings, a store, members, email and automations are native. On an AI-built site each of those is another service, another key and another thing that breaks when the credits run out.",
      },
    ],
  },

  fit: {
    heading: "Who this page is for",
    intro:
      "One question decides this, and it isn't about code quality. Did you build a website or an application? These tools are used for both, and only one of them belongs on Wix Studio.",
    goodFit: [
      "You prompted your way to a marketing site and now it needs to rank and convert.",
      "Nobody can update the copy without opening the tool that generated it.",
      "You validated an idea fast and now a real business runs on it.",
      "Your agency ran an SEO crawl and it came back nearly empty.",
      "You're paying for credits mainly so someone can change text occasionally.",
    ],
    notAFit: [
      "It's genuinely an application, with logic and state that a marketing platform can't host.",
      "You're technical, the repo suits you, and publishing is already fast.",
      "It's a prototype or an internal tool, not the front door to a business.",
      "The interactive part is the product, and the pages around it are incidental.",
    ],
    footnote:
      "Worth saying plainly, because most agencies won't: if what you built is an app, moving it to Wix Studio is the wrong advice and we'll tell you so on the call. The common answer is a split, where the marketing site moves and the app stays where it is and gets linked to.",
  },

  transfers: {
    heading: "What moves from an AI builder to Wix Studio",
    intro:
      "Unusually good news at the top of this table. Every one of these platforms lets you take your code, so nothing here is a hostage negotiation. What doesn't move is the thing you never had: a content layer, which is why the destination is a rebuild rather than an import.",
    rows: [
      {
        item: "Your source code",
        icon: "code",
        status: "carries",
        note: "All four export, though Lovable gates the direct download to paid plans, so a free-tier project comes out through GitHub sync instead.",
      },
      {
        item: "Your domain",
        icon: "globe",
        status: "carries",
        note: "Point it or transfer it, and on v0 in particular it's an ordinary Vercel project, so there's nothing unusual to unpick.",
      },
      {
        item: "Copy, images and assets",
        icon: "image",
        status: "carries",
        note: "It's all in the repo you just exported, in plain files, with no CDN URL that expires when the account closes.",
      },
      {
        item: "A standard Postgres database",
        icon: "server",
        status: "carries",
        note: "Replit's database and any Supabase instance you connected yourself are ordinary Postgres, so a normal dump gets your data out cleanly.",
      },
      {
        item: "Lovable Cloud or Bolt's built-in database",
        icon: "layers",
        status: "rebuilt",
        note: "Lovable documents no one-click migration off Cloud and tells you to export before continuing, so this comes out by hand and goes into Wix CMS collections.",
      },
      {
        item: "Page content",
        icon: "type",
        status: "rebuilt",
        note: "Copy currently living inside components becomes CMS fields, which is the change that makes the site editable by someone who isn't prompting it.",
      },
      {
        item: "Repeating content",
        icon: "server",
        status: "rebuilt",
        note: "Anything the AI scaffolded as an array in a file becomes one collection and one layout, so adding the next item stops being a code change.",
      },
      {
        item: "SEO titles, descriptions and structured data",
        icon: "search",
        status: "rebuilt",
        note: "Whatever the model happened to generate gets audited rather than assumed, since duplicate titles and canonicals pointing at the homepage are the two most common findings.",
      },
      {
        item: "Page layout and design",
        icon: "responsive",
        status: "rebuilt",
        note: "Rebuilt in Studio against the live site, and this is usually the stage where the layout gets tightened rather than reproduced exactly.",
      },
      {
        item: "Forms",
        icon: "form",
        status: "replaced",
        note: "Rebuilt as native Wix forms with logged submissions and notifications, rather than a handler wired to whatever service the prompt picked.",
      },
      {
        item: "User accounts and gated content",
        icon: "users",
        status: "replaced",
        note: "Auth built on a provisioned backend is replaced by native Wix members, and the user list has to be exported from that backend before anything is switched off.",
      },
      {
        item: "Prerendering and SEO add-ons",
        icon: "puzzle",
        status: "replaced",
        note: "Bolt's SEO Boost and Lovable's crawler prerendering exist to make a JavaScript app indexable, and a server-rendered Studio site doesn't need the workaround.",
      },
      {
        item: "Hosting and your credit balance",
        icon: "receipt",
        status: "replaced",
        note: "A Wix plan replaces per-request hosting and the credit meter, so the site stops being something that can pause when a balance runs down.",
      },
      {
        item: "Application logic",
        icon: "ban",
        status: "lost",
        note: "If the thing you built genuinely does work rather than presents information, none of it moves, which is why deciding what you actually have comes before anything else.",
      },
      {
        item: "Your prompt history and project context",
        icon: "pen",
        status: "lost",
        note: "The conversation that produced the site doesn't transfer anywhere, so undocumented decisions live only in the code from the day you leave.",
      },
      {
        item: "Anything built on Wix Vibe",
        icon: "lock",
        status: "lost",
        note: "Wix's own answer is blunt: it isn't currently possible to move or convert a Wix Vibe site to the Wix Editor or Studio Editor, and it's filed as an open feature request.",
      },
    ],
    footnote:
      "The shape of it: you leave with everything except the two things that mattered, which are a way for a non-developer to change the site and a structure that search engines can read without a workaround. Those get built, and building them is the project.",
    cta: {
      heading: "Not sure whether yours is a website or an app?",
      paragraph:
        "Send us the URL and the repo if you have it. We'll tell you which parts belong on Wix Studio, which should stay where they are, and whether the move is worth making at all.",
      cta: {
        label: "Free migration check",
        href: "/free-website-audit",
        variant: "primary",
      },
    },
  },

  steps: {
    heading: "How the move runs",
    intro:
      "Seven stages, and the first one can end the project. On no other platform do we start by asking whether the thing you built belongs on Wix Studio at all.",
    items: [
      {
        title: "Decide whether you built a website or an app",
        navLabel: "Website or app?",
        duration: "1 day",
        body: "These tools are used for both, and the honest answer changes everything that follows. This is a conversation, not an audit.",
        lead: "How we tell them apart:",
        points: [
          {
            label: "Does it present, or does it do?",
            body: "Pages that inform and convert belong on Studio. Logic, state and user-specific workflows don't, and forcing them across is how projects go wrong.",
          },
          {
            label: "Who is signing in, and why",
            body: "A gated resource library is a Wix members area. A dashboard where every user sees different data is an application.",
          },
          {
            label: "The split is a normal outcome",
            body: "Marketing site on Studio, app stays where it is, linked from the nav. Often the right answer and rarely the one people expect.",
          },
        ],
      },
      {
        title: "Export everything while it's still running",
        navLabel: "Export while it's live",
        duration: "1 day",
        body: "Straightforward on all four, with one gate and one trap worth knowing before you start clicking.",
        lead: "What comes out:",
        points: [
          {
            label: "The code, by download or GitHub",
            body: "Lovable's direct download needs a paid plan, so a free-tier project comes out through GitHub sync instead.",
          },
          {
            label: "The database, on its own terms",
            body: "Replit and a self-connected Supabase dump normally. Lovable Cloud has no one-click path off it, so that export is manual and happens first.",
          },
          {
            label: "Don't disconnect anything yet",
            body: "Bolt states that disconnecting a project is permanent and can't be reversed, and on shared projects only the owner can manage the GitHub link.",
          },
        ],
      },
      {
        title: "Find out what Google actually sees",
        navLabel: "What crawlers see",
        duration: "1 day",
        body: "The stage that surprises people. An AI-built site can look perfect in a browser and return almost nothing to the tools an agency audits with.",
        lead: "What gets checked:",
        points: [
          {
            label: "Whether your crawl comes back empty",
            body: "Lovable's prerendered HTML answers verified search and AI crawlers only, so third-party scanners see the single-page app instead.",
          },
          {
            label: "Search Console rather than a crawler",
            body: "URL Inspection shows the rendered page Google holds, which on these sites is the only reliable read of what's actually indexed.",
          },
          {
            label: "Which era your project is from",
            body: "Lovable moved new projects to server-side rendering in May 2026 and didn't force older ones across, so the answer depends on when yours was created.",
          },
          {
            label: "The usual generated-metadata faults",
            body: "Duplicate titles across routes and canonicals pointing at the homepage are the two findings that come up most often.",
          },
        ],
      },
      {
        title: "Model the content in Wix",
        navLabel: "Structure and CMS",
        duration: "2 to 4 days",
        body: "The stage that doesn't exist on your current platform, and the reason the move is worth making. Content stops being strings in components.",
        lead: "What happens here:",
        points: [
          {
            label: "Copy lifted out of the code",
            body: "Everything a non-developer might want to change becomes a CMS field or an editable section rather than a line in a component.",
          },
          {
            label: "Arrays become collections",
            body: "Wix imports up to 50,000 items per CSV, so whatever the model scaffolded as a hard-coded list becomes real, editable content.",
          },
          {
            label: "URL structure decided deliberately",
            body: "Wix's dynamic page prefix is editable, so routes get chosen rather than inherited from whatever the AI happened to scaffold.",
          },
        ],
      },
      {
        title: "Rebuild the design in Studio",
        navLabel: "The Studio build",
        duration: "1 to 3 weeks",
        body: "Built on a staging URL while the current site stays live. Generated designs are usually competent and generic, so this is where the brand arrives.",
        lead: "What the build covers:",
        points: [
          {
            label: "A design system rather than generated components",
            body: "Global styles and breakpoints, so the site stops looking like every other site produced from the same prompt.",
          },
          {
            label: "Collections wired to dynamic pages",
            body: "The extracted content stops being rows in a table and starts being pages that publish themselves.",
          },
          {
            label: "Server-rendered by default",
            body: "No prerendering layer to configure, no crawler allowlist to reason about, and no SEO feature to keep switched on.",
          },
        ],
      },
      {
        title: "Map the redirects, then cut over",
        navLabel: "Redirects and cutover",
        duration: "1 to 3 days",
        body: "Usually the shortest version of this stage in the set, because these sites are young and the route list is small. It still gets tested first.",
        lead: "The sequence:",
        points: [
          {
            label: "Built from the real route list",
            body: "Taken from the code rather than a sitemap, since a generated sitemap and the actual routes are often out of sync.",
          },
          {
            label: "Uploaded in CSV batches and tested",
            body: "Wix takes up to 500 redirect rows per file, checked against the inventory before the domain points anywhere.",
          },
          {
            label: "Nothing gets cancelled yet",
            body: "The old deployment stays up until the Studio site is serving the domain, and the backend stays alive until its data is verified in Wix.",
          },
        ],
      },
      {
        title: "Watch it land",
        navLabel: "Post-launch monitoring",
        duration: "30 days",
        body: "Daily at first, then weekly. On these sites the window usually shows pages entering the index that were never really in it.",
        lead: "What we're watching:",
        points: [
          {
            label: "Index coverage against the route list",
            body: "Every real route either indexed or redirecting correctly, which is often the first time anyone has checked.",
          },
          {
            label: "Position against the baseline",
            body: "Taken before cutover, so the comparison is a measurement rather than a memory.",
          },
          {
            label: "Anything that 404s or drops",
            body: "Fixed inside the window at no extra cost, as on every migration we run.",
          },
        ],
      },
    ],
  },

  auditCta: {
    heading: "Built it with AI and now it won't rank?",
    paragraph:
      "Send us the URL. We'll tell you what Google is actually seeing, whether it's a rendering problem or a content problem, and what it would take to fix either.",
    ctas: [
      {
        label: "Free website audit",
        href: "/free-website-audit",
        variant: "primary",
      },
      { label: "Book a call", href: "/book-a-call", variant: "secondary" },
    ],
  },

  sources: {
    heading: "Sources",
    intro:
      "These four products ship changes monthly, so everything below is dated and linked to the vendor's own documentation. Check the date before relying on any of it.",
    verified: "2026-08-20",
    items: [
      {
        label: "Lovable: Optimize your app for SEO and AI search",
        href: "https://docs.lovable.dev/features/seo-aeo",
        note: "The crawler behaviour that breaks agency SEO tools: prerendered HTML goes to verified crawlers, while third-party scanners see the single-page app.",
      },
      {
        label: "Lovable: Building apps using TanStack Start",
        href: "https://lovable.dev/blog/building-apps-using-tanstack-start",
        note: "The 13 May 2026 change to server-side rendering for new projects, which is why the rendering answer depends on when your project was created.",
      },
      {
        label: "Lovable: Cloud",
        href: "https://docs.lovable.dev/features/cloud",
        note: "The built-in backend, and the documented absence of a one-click migration off it, which is why that export happens first and by hand.",
      },
      {
        label: "Lovable: Sync your project with GitHub",
        href: "https://docs.lovable.dev/integrations/github",
        note: "Two-way GitHub sync, and the paid-plan gate on downloading your code directly.",
      },
      {
        label: "Lovable: Edit from the preview",
        href: "https://docs.lovable.dev/features/design",
        note: "Visual Edits, including the daily allowance on inline text edits and element selection counting as chat usage.",
      },
      {
        label: "Bolt: SEO Boost",
        href: "https://support.bolt.new/cloud/hosting/seo",
        note: "Bolt's own admission that most Bolt sites are built with JavaScript that crawlers and social platforms can't run directly, plus the documented Next.js noindex issue.",
      },
      {
        label: "Bolt: Manage your projects",
        href: "https://support.bolt.new/building/using-bolt/projects-files",
        note: "Export and download, and the warning that disconnecting a project is permanent.",
      },
      {
        label: "v0: FAQs",
        href: "https://v0.app/docs/faqs",
        note: "Code export to work locally, and Vercel's statement that it doesn't own the code generated from your prompts.",
      },
      {
        label: "Replit: Improve your app's SEO",
        href: "https://docs.replit.com/build/improve-seo",
        note: "The SEO Agent's scope, including its statement that it covers technical SEO and doesn't write content or build topical authority.",
      },
      {
        label: "Replit: Projects and files",
        href: "https://docs.replit.com/help/projects-and-files",
        note: "Download as zip and the Git pane, which is how a Replit project comes out.",
      },
      {
        label: "Wix: Moving your Vibe site to the Wix Editor or Studio Editor",
        href: "https://support.wix.com/en/article/wix-vibe-request-moving-your-vibe-site-to-the-wix-editor-or-studio-editor",
        note: "Wix's own position on its own AI builder: it isn't currently possible to move or convert a Wix Vibe site to another editor.",
      },
      {
        label: "Wix: Acquisition of Base44",
        href: "https://www.wix.com/press-room/home/post/wix-further-expands-into-vibe-coding-with-acquisition-of-base44-a-hyper-growth-startup-that-simplif",
        note: "The 18 June 2025 acquisition, around $80 million in cash plus earn-outs through 2029 and $25 million in retention bonuses.",
      },
      {
        label: "Wix CMS: Importing content into a collection",
        href: "https://support.wix.com/en/article/cms-formerly-content-manager-importing-content-into-a-collection",
        note: "CSV import into a Wix collection, capped at 50,000 items per file.",
      },
      {
        label: "Wix: Importing or exporting URL redirects with a CSV file",
        href: "https://support.wix.com/en/article/importing-or-exporting-url-redirects-with-a-csv-file",
        note: "Bulk redirect import on the Wix side, up to 500 rows at a time.",
      },
    ],
  },

  faq: {
    heading: ["AI builders to Wix Studio,", "answered from the docs"],
    subhead:
      "What founders ask once the site is built, live, and not doing anything in search.",
    ctas,
    items: [
      {
        q: "Can I move my Lovable site to Wix Studio?",
        a: "Yes, as a rebuild rather than an import. Wix states that importing a site created outside of Wix isn't supported, and a React codebase isn't something Wix Studio can ingest anyway. What moves is the content: your copy, images and data come out of the repo and the database, and go into Wix CMS collections where someone can actually edit them. The same answer applies to Bolt, v0 and Replit. The design gets rebuilt, and on most AI-generated sites that's the part people wanted changed regardless.",
      },
      {
        q: "Can I export my code from Lovable, Bolt, v0 or Replit before moving to Wix Studio?",
        a: "All four, yes, and this is worth saying because the internet keeps claiming otherwise. Lovable offers a direct download on paid plans plus two-way GitHub sync. Bolt has Export then Download, and a GitHub integration. v0 says you can export the code to work locally, and Vercel states it doesn't own code generated from your prompts. Replit has Download as zip and a Git pane. Two cautions: Lovable's direct download is paid-plan only, so free-tier projects come out through GitHub, and Bolt warns that disconnecting a project is permanent, so don't disconnect anything until the export is verified.",
      },
      {
        q: "Why does my Lovable site look empty in Screaming Frog or Ahrefs?",
        a: "Because it probably is, to them. Lovable's documentation says prerendered HTML is served only to verified search and AI crawlers, and that third-party SEO scanners and other unverified agents see the regular single-page app. So your agency's crawler gets a shell while Google gets a rendered page, and the site looks catastrophically broken in every audit tool while ranking normally. The reliable check is Search Console's URL Inspection, which shows what Google actually holds. This alone is worth knowing before anyone panics or pays to fix a problem that isn't there.",
      },
      {
        q: "Do AI-built websites rank on Google, or do I need to move to Wix Studio?",
        a: "They can, and whether yours does depends heavily on which platform and which era. Lovable moved new projects to server-side rendering in May 2026 and didn't force older projects across, so a project's creation date decides how it renders. Bolt states plainly that most Bolt sites are built with JavaScript that crawlers and social platforms can't run directly, and offers prerendering as an add-on, which its own docs say to switch off for Next.js projects because of a noindex issue. So indexing on these platforms is a feature you enable, verify and keep working. Ranking is a separate problem again, and no platform solves that one.",
      },
      {
        q: "What happens to my Lovable Cloud database when I move to Wix Studio?",
        a: "It comes out by hand, and it comes out first. Lovable documents no one-click migration from its built-in Cloud backend to your own Supabase project, and tells you to export your database and download any storage files before continuing. Removing Cloud permanently deletes the instance. Bolt's built-in database is a bigger unknown: Bolt doesn't document what powers it or how you export from it, so open a support ticket before you plan around it. Replit's database is standard Postgres and a self-connected Supabase instance is too, so both dump normally. Whatever the source, the content that belongs on the marketing site becomes Wix CMS collections.",
      },
      {
        q: "Can my client edit an AI-built website without prompting the AI?",
        a: "Not really, and this is the reason most of these projects come to us. None of these four ships a CMS. What they ship is a visual editor that rewrites source code: Lovable's Visual Edits, Replit's Element Editor, v0's Design mode. There's no content model, no draft and publish, no scheduling, and no roles. Lovable meters inline text edits above a daily allowance and counts element selection as chat usage, and Replit routes larger edits back through its agent, which consumes credits. So editing a sentence is a build change with a running meter. On Wix Studio it's a permissions setting.",
      },
      {
        q: "My site is on Wix Vibe. Can I move it to Wix Studio?",
        a: "Not currently, and the source for that is Wix. Its own help centre states it isn't possible to move or convert a site created with Wix Vibe to another editor such as the Wix Editor or Studio Editor, and files the request as an open feature request collecting votes. Worth knowing before you start, because Wix bought Base44 in June 2025 for around $80 million in cash plus earn-outs, so Vibe is not a side project and the one-way door is a deliberate current state rather than an oversight. If you're choosing where to build now and you can already name something Vibe won't do, build on Studio.",
      },
      {
        q: "Should I move my AI-built site to Wix Studio, or is it actually an app?",
        a: "This is the first question we ask, and sometimes the answer means we tell you not to hire us. If your pages present information and persuade people, that belongs on Wix Studio. If your product does work, holds state, or shows every user something different, it doesn't, and moving it would be a downgrade dressed as a migration. The common outcome is a split: the marketing site moves to Studio so it can be edited and found, and the application stays where it is and gets linked from the navigation. That gets you a site your team can run without touching the thing that actually needs a developer.",
      },
      {
        q: "How much does an AI builder to Wix Studio migration cost, and how long does it take?",
        a: "From €1,750, quoted as a fixed price before anything starts, and two to five weeks from kickoff to launch plus a 30-day monitoring window that runs while you're already live. These are usually the fastest migrations we do, because the sites are young, the route list is short and there's rarely much indexed history to protect. The variables are how much content has to be lifted out of components into a CMS, and whether there's a provisioned backend whose data needs to come with you. Worth weighing against it: what you currently spend on credits and hosting.",
      },
      {
        q: "Can I migrate my AI-built site to Wix Studio myself?",
        a: "The export half is genuinely easy, easier than any other platform we migrate from, because all four hand you the code. Where it turns is that having the code doesn't help you: there's nothing on the Wix side to import a React repo into, so the front end is rebuilt regardless of what you're holding. The parts people underestimate are lifting copy out of components into a content model that someone can actually maintain, getting a provisioned database out cleanly, and auditing what search engines see rather than what the browser shows. The reliable signal is whether you can name the collections your content should live in. If you can't, that's the part worth handing over, because rebuilding the same hard-coded pages in Studio just moves the problem.",
      },
    ],
  },

  related: {
    heading: "Keep reading",
    intro:
      "One source platform per guide. The hub covers the rest, and the siblings go equally deep on theirs.",
    items: [
      {
        label: "Website migration",
        icon: "transfer",
        href: "/services/website-migration",
        desc: "The hub: what a migration to Wix Studio covers, what it costs, and every platform we move sites from.",
      },
      {
        label: "HTML to Wix Studio",
        icon: "code",
        href: "/services/html-to-wix-studio",
        desc: "Exported the code and now hosting it yourself? This covers moving from raw markup you own.",
      },
      {
        label: "Framer to Wix Studio",
        logo: "/platforms/framer.webp",
        href: "/services/framer-to-wix-studio",
        desc: "The other design-led route, and the one platform that won't let you export the site at all.",
      },
      {
        label: "Wix Studio development",
        icon: "code",
        href: "/services/wix-studio-development",
        desc: "Need real custom functionality on the new site? This is what development on Wix Studio involves.",
      },
    ],
  },

  finalCta: {
    heading: ["Find out what your AI-built site", "is actually doing in search"],
    paragraph:
      "Send us the URL. We'll tell you what Google sees, what your content model would need to look like, whether it's a website or an app, and what a move would cost. Free, and sometimes the answer is that you should stay put.",
    cta: { label: "Book a call", href: "/book-a-call" },
    ctaSecondary: { label: "Free website audit", href: "/free-website-audit" },
    image: "/textures/studio-texture.jpg",
  },

  schema: {
    description:
      "AI website builder to Wix Studio migration, covering Lovable, Bolt, v0 and Replit. Rendering and index audit, content extraction into a Wix CMS content model, database migration, responsive Studio build, form rebuild, redirect mapping, and 30 days of post-launch index monitoring. From a Wix Legend Partner.",
    priceFrom: "1750",
  },
};
