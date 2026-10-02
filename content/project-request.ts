/**
 * content/project-request.ts: every word on /project-request, and the single
 * source of truth for both the client form and the server whitelist, as
 * content/partnerships.ts is for PartnerForm. Built from
 * Docs/Project_Request_Handoff.md §5 and §6; the copy is the brief's, word for
 * word.
 *
 * Choice values are short stable ids, never the labels. The form submits ids,
 * the server accepts only ids listed here, and lib/projectRequest.ts reasons
 * about ids, so rewording a label can never break the scope logic or let an
 * unlisted value through. Labels are what get stored and emailed.
 *
 * Additions to the brief, all found missing during the clarify pass (§11) and
 * flagged in the build summary:
 *   - `doesOther.label` and `deadlineDate.label`: the brief gives both fields
 *     no label, and a field with no visible label fails on a phone.
 *   - `errors.pickOne`: the brief's one choice error says `or choose "Not
 *     sure"`, which is wrong on the five questions that have no such option.
 *   - `errors.emailEmpty`: an empty field was told "That doesn't look like an
 *     email address", which reads as a typo they didn't make.
 */

export type ChoiceOption = {
  value: string;
  label: string;
  /** Selecting it clears the others, and selecting another clears it. */
  exclusive?: boolean;
};

export type ChoiceQuestion = {
  label: string;
  hint?: string;
  options: ChoiceOption[];
};

export type TextQuestion = {
  label: string;
  hint?: string;
  placeholder?: string;
  maxLength: number;
};

/** Option builder: keeps the lists below readable as one line per tile. */
const o = (value: string, label: string, exclusive?: boolean): ChoiceOption =>
  exclusive ? { value, label, exclusive } : { value, label };

export const projectRequest = {
  meta: {
    title: "Project request | Zenith Digital",
    description:
      "Twelve short questions, mostly taps. It takes about three minutes. You don't need to know the technical side.",
  },

  wordmark: "zenith digital",
  footer: { line: "Zenith Digital · Belgrade", privacy: "Privacy policy" },

  intro: {
    eyebrow: "Project request",
    heading: "Tell me what you need",
    lead: "Twelve short questions, mostly taps. It takes about three minutes. You don't need to know the technical side. If you're not sure about something, say so and I'll help you decide.",
    byline: "Pavle Maoduš, founder of Zenith Digital. I read every request myself.",
  },

  steps: [
    { title: "What you need" },
    { title: "Size and features" },
    {
      title: "What's ready",
      intro: "There are no wrong answers here. It tells me how much of the work is mine.",
    },
    { title: "Timing and you" },
  ] as { title: string; intro?: string }[],
  progressLabel: "Progress",
  progress: (step: number, total: number, title: string) => `Step ${step} of ${total} · ${title}`,
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,

  // Step 1: What you need
  need: {
    label: "What do you need?",
    hint: "Pick everything that applies.",
    options: [
      o("new-site", "A new website"),
      o("redesign", "A redesign of the website I have"),
      o("store", "An online store"),
      o("landing", "A single landing page for ads or one offer"),
      o("migrate", "Moving my website to a different platform"),
      o("seo", "More visitors from Google"),
      o("unsure", "Not sure yet, help me decide", true),
    ],
  } satisfies ChoiceQuestion,

  hasSite: {
    label: "Do you have a website now?",
    options: [o("yes", "Yes"), o("no", "No, starting from scratch")],
  } satisfies ChoiceQuestion,

  currentUrl: {
    label: "What's the address?",
    placeholder: "yourbusiness.com",
    maxLength: 300,
  } satisfies TextQuestion,

  business: {
    label: "In one sentence, what does your business do?",
    placeholder: "Physiotherapy clinic in Novi Sad, two locations",
    maxLength: 200,
  } satisfies TextQuestion,

  // Step 2: Size and features
  find: {
    label: "What should people be able to find on the site?",
    hint: "Tap everything you'd expect to see. I'll turn this into a page list.",
    options: [
      o("home", "Home"),
      o("about", "About us"),
      o("services-one", "Services, all on one page"),
      o("services-each", "A separate page for each service"),
      o("portfolio", "Past work or portfolio"),
      o("case-studies", "Case studies"),
      o("prices", "Prices"),
      o("team", "Team"),
      o("reviews", "Reviews and testimonials"),
      o("locations", "Locations or areas you cover"),
      o("blog", "Blog or articles"),
      o("faq", "FAQ"),
      o("careers", "Careers"),
      o("contact", "Contact"),
      o("unsure", "Not sure, suggest what I need", true),
    ],
  } satisfies ChoiceQuestion,

  serviceCount: {
    label: "Roughly how many services?",
    options: [o("2-4", "2 to 4"), o("5-8", "5 to 8"), o("9+", "9 or more"), o("unsure", "Not sure")],
  } satisfies ChoiceQuestion,

  does: {
    label: "What should the site be able to do?",
    hint: "Beyond showing information.",
    options: [
      o("enquiries", "Send me enquiries through a form"),
      o("booking", "Let people book an appointment or a call"),
      o("payments", "Take payments or sell products"),
      o("languages", "Work in more than one language"),
      o("members", "Have a members area or logins"),
      o("blog", "Let me add blog posts or news myself"),
      o("tools", "Connect to tools I already use"),
      o("chat", "WhatsApp or live chat button"),
      o("other", "Something else"),
      o("nothing", "Nothing special, just information", true),
      o("unsure", "Not sure", true),
    ],
  } satisfies ChoiceQuestion,

  languages: { label: "Which languages?", maxLength: 200 } satisfies TextQuestion,
  tools: {
    label: "Which ones?",
    placeholder: "Mailchimp, HubSpot, Calendly",
    maxLength: 200,
  } satisfies TextQuestion,
  doesOther: { label: "What else should it do?", maxLength: 200 } satisfies TextQuestion,

  // Conditional block A: a store, or payments
  productCount: {
    label: "Roughly how many products?",
    options: [
      o("up-to-10", "Up to 10"),
      o("11-50", "11 to 50"),
      o("51-200", "51 to 200"),
      o("200+", "More than 200"),
      o("unsure", "Not sure"),
    ],
  } satisfies ChoiceQuestion,

  sellsNow: {
    label: "Do you sell online already?",
    options: [o("yes", "Yes"), o("no", "No")],
  } satisfies ChoiceQuestion,

  sellsOn: {
    label: "Where?",
    placeholder: "Shopify, Etsy, Instagram",
    maxLength: 200,
  } satisfies TextQuestion,

  // Conditional block B: a move, or a redesign
  platform: {
    label: "What is the current site built on?",
    options: [
      o("wordpress", "WordPress"),
      o("wix", "Wix"),
      o("squarespace", "Squarespace"),
      o("shopify", "Shopify"),
      o("webflow", "Webflow"),
      o("other", "Something else"),
      o("unsure", "Not sure"),
    ],
  } satisfies ChoiceQuestion,

  googleTraffic: {
    label: "Does it get visitors from Google that you'd hate to lose?",
    options: [o("a-lot", "Yes, a lot"), o("some", "Some"), o("hardly", "Hardly any"), o("unsure", "Not sure")],
  } satisfies ChoiceQuestion,

  // Conditional block C: more visitors from Google
  seoGoal: {
    label: "What would you like more of?",
    options: [
      o("local", "Local customers near me"),
      o("national", "Enquiries from anywhere in the country"),
      o("sales", "Online sales"),
      o("unsure", "Not sure"),
    ],
  } satisfies ChoiceQuestion,

  // Step 3: What's ready
  text: {
    label: "The text for the site",
    options: [
      o("ready", "It's written and ready"),
      o("partial", "Some of it, and it needs polishing"),
      o("needs-writing", "Nothing yet. I'd like it written for me"),
      o("unsure", "Not sure"),
    ],
  } satisfies ChoiceQuestion,

  photos: {
    label: "Photos and video",
    options: [
      o("good", "I have good ones"),
      o("phone", "A few, mostly taken on a phone"),
      o("none", "None. I'd need stock photos or a shoot"),
      o("unsure", "Not sure"),
    ],
  } satisfies ChoiceQuestion,

  brand: {
    label: "Logo and brand",
    options: [
      o("set", "Logo, colours and fonts are all set"),
      o("logo-only", "Just a logo"),
      o("nothing", "Nothing yet"),
      o("refresh", "I have one, but I'd like it refreshed"),
    ],
  } satisfies ChoiceQuestion,

  likes: {
    label: "Any websites you like the look of?",
    hint: "Optional. Paste a link or two, or name them.",
    maxLength: 500,
  } satisfies TextQuestion,

  // Step 4: Timing and you
  deadline: {
    label: "When do you need it live?",
    options: [
      o("asap", "As soon as possible"),
      o("month", "Within a month"),
      o("1-3-months", "In one to three months"),
      o("no-rush", "No rush"),
      o("fixed", "There's a fixed date"),
    ],
  } satisfies ChoiceQuestion,

  deadlineDate: { label: "Which date?", maxLength: 10 } satisfies TextQuestion,

  deadlineReason: {
    label: "What's happening on that date?",
    placeholder: "Opening the second clinic",
    maxLength: 200,
  } satisfies TextQuestion,

  budget: {
    label: "Do you have a budget in mind?",
    hint: "Optional. It helps me suggest the right size of project, not a bigger one.",
    options: [
      o("under-1000", "Under €1,000"),
      o("1000-2500", "€1,000 to €2,500"),
      o("2500-5000", "€2,500 to €5,000"),
      o("5000+", "More than €5,000"),
      o("unsure", "Not sure. Tell me what it would cost"),
    ],
  } satisfies ChoiceQuestion,

  note: { label: "Anything else I should know?", hint: "Optional.", maxLength: 1500 } satisfies TextQuestion,

  name: { label: "Your name", maxLength: 120 } satisfies TextQuestion,
  company: { label: "Business name", maxLength: 120 } satisfies TextQuestion,
  email: { label: "Email", maxLength: 254 } satisfies TextQuestion,
  phone: { label: "Phone or WhatsApp", maxLength: 32 } satisfies TextQuestion,

  replyBy: {
    label: "How should I reply?",
    options: [o("email", "Email"), o("whatsapp", "WhatsApp"), o("phone", "A phone call")],
  } satisfies ChoiceQuestion,

  consent: {
    before: "Your answers go to Pavle at Zenith Digital and are used only to prepare your quote.",
    link: "Privacy policy",
    href: "/privacy",
  },

  buttons: { back: "Back", next: "Next", submit: "Send my request", pending: "Sending…" },

  errors: {
    pick: "Pick an option, or choose “Not sure”.",
    pickOne: "Pick an option.",
    business: "Add a sentence about your business.",
    name: "Add your name.",
    emailEmpty: "Add your email.",
    email: "That doesn't look like an email address.",
    phone: "Add a number so I can reach you there.",
    url: "That doesn't look like a website address.",
    rateLimited: "Too many requests. Try again in a bit.",
    failed:
      "That didn't send. Your answers are still here, so try again, or email hello@thezenithdigital.com.",
  },

  success: {
    heading: (firstName: string) => `Thanks, ${firstName}. It's with me now.`,
    body: (channel: string) =>
      `I'll read it and reply by ${channel} within one working day, with a price range, a timeline and anything I need to check with you. If something can't be priced from the form, I'll ask you directly.`,
    /** How each reply choice reads inside the body sentence. */
    channel: { email: "email", whatsapp: "WhatsApp", phone: "phone" } as Record<string, string>,
    more: "Something to add in the meantime?",
    emailLink: "Email Pavle",
    whatsappLink: "WhatsApp",
  },
};

export type ProjectRequestContent = typeof projectRequest;
