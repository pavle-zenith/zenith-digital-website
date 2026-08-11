/**
 * THE testimonial source of truth. Every quote on the site resolves back to an
 * entry here, so a client's words exist in exactly one place and can't drift
 * between the homepage tabs, the wall, a case study, and a service page.
 *
 * Wording is the client's own, transcribed from the owner-supplied batch.
 * The only edits made were mechanical: fixing mangled apostrophes and quote
 * marks, collapsing double spaces, and replacing a few stray hyphens used
 * mid-sentence with commas (CLAUDE.md §14 keeps dashes off the site). No
 * sentence was reworded, shortened, or invented.
 *
 * OWNER — headshots: 27 of the 31 use their real photo, copied out of
 * "site asset dump/client headshots" into /public/avatars and renamed to match
 * the ids below. Four have no usable photo and fall back to
 * PLACEHOLDER_AVATAR: Marko Georgievski, Christopher Barone, Tom H, and
 * Bates Green (his file in the dump is 0 bytes). To fix one, drop the image
 * at /public/avatars/<id>.<ext> and point `avatar` at it.
 */

/** Neutral avatar used wherever we don't have the client's real photo. */
export const PLACEHOLDER_AVATAR = "/avatars/placeholder.svg";

export type Testimonial = {
  /** Stable key. Other content files reference quotes by this. */
  id: string;
  name: string;
  /** Empty when the person isn't attached to a company (e.g. a speaker). */
  company: string;
  role: string;
  quote: string;
  avatar: string;
  /** White mark for dark surfaces. */
  logo?: string;
  /** Dark-ink mark for light surfaces. */
  logoDark?: string;
  /** Video testimonials play in the wall's lightbox. */
  video?: string;
  poster?: string;
};

export const allTestimonials: Testimonial[] = [
  {
    id: "jack-shorrock",
    name: "Jack Shorrock",
    company: "Just Stay",
    role: "Director",
    quote:
      "We've worked with Pavle and Zenith on multiple projects from Wix to Bubble to custom code. I guarantee that they can make anything happen.",
    avatar: "/avatars/jack-shorrock.jpg",
    logoDark: "/logos-blue/juststay.png",
    video: "/testimonials/jack-shorrock.mp4",
    poster: "/avatars/jack-shorrock.jpg",
  },
  {
    id: "uros-stanimirovic",
    name: "Uros Stanimirovic",
    company: "Genroks AI",
    role: "Co-Founder",
    quote:
      "We hired Zenith to help us rebrand our site. Conversion skyrocketed. We saw what it takes to be one of the top professionals in the field.",
    avatar: "/avatars/uros-stanimirovic.jpg",
    logo: "/logos-white/genroks.png",
    logoDark: "/logos-dark/genroks.png",
    video: "/testimonials/uros.mov",
    poster: "/avatars/uros-stanimirovic.jpg",
  },
  {
    id: "john-smyth",
    name: "John Smyth",
    company: "AdVantage Media",
    role: "Director",
    quote:
      "Even though I didn't have a crystal-clear vision of how a white-label partnership looked, Zenith was able to overdeliver on every front imaginable.",
    avatar: "/avatars/john-smyth.jpg",
    logo: "/logos-white/advantage.png",
    logoDark: "/logos-blue/advantage.avif",
    video: "/testimonials/john.mov",
  },
  {
    id: "bates-green",
    name: "Bates Green",
    company: "NotYou Brand",
    role: "Entrepreneur",
    quote:
      "The Zenith crew are one of the most hardworking, loyal and trustworthy people I've ever worked with. They always go above and beyond and are extremely responsive.",
    // OWNER: "BatesGreen - NotYou Brand.jpg" in the asset dump is a 0-byte
    // file, so there's nothing to use. Re-export it and point this at it.
    avatar: PLACEHOLDER_AVATAR,
    logoDark: "/logos-blue/notyou.avif",
    video: "/testimonials/bates-green.mov",
  },
  {
    id: "alex-may",
    name: "Alex May",
    company: "Evolve Your Brand",
    role: "Director",
    quote:
      "I had the pleasure of working with Pavle and was blown away by his expertise and attention to detail in website consulting. I felt like I had a true partner in improving our client projects.",
    avatar: "/avatars/alex-may.jpg",
  },
  {
    id: "gemma-sole",
    name: "Gemma Sole",
    company: "Knode AI",
    role: "GTM Manager",
    quote:
      "They made an impression on me right from the beginning, it's incredibly easy to communicate with their team and even easier to work with them.",
    avatar: "/avatars/gemma-sole.jpg",
    logo: "/logos-white/knode.png",
    logoDark: "/logos-dark/knode.png",
  },
  {
    id: "ivan-belobrajdic",
    name: "Ivan Belobrajdic",
    company: "Bel'Istria",
    role: "Director",
    quote:
      "Our collaboration on redesigning Bel'Istria was the beginning of a long-term partnership. Their composure and communication exceeded all standards.",
    avatar: "/avatars/ivan-belobrajdic.jpg",
    logo: "/logos-white/belistria.png",
    logoDark: "/logos-dark/belistria-white.png",
  },
  {
    id: "jim-steele",
    name: "Jim Steele",
    company: "",
    role: "Public speaker",
    quote:
      "Our site now feels like a true extension of our brand, and we owe that to Zenith's expertise. Leads come in pre-sold from the first contact.",
    avatar: "/avatars/jim-steele.jpg",
    logo: "/logos-white/jimsteele.png",
    logoDark: "/logos-blue/jimsteele.avif",
  },
  {
    id: "nick-timaskovs",
    name: "Nick Timaskovs",
    company: "Creatify Collective",
    role: "Entrepreneur",
    quote:
      "Patient, professional, and creative throughout the process. Everyone who's seen the site has been praising it.",
    avatar: "/avatars/nick-timaskovs.jpg",
    logoDark: "/logos-blue/creatify.avif",
  },
  {
    id: "stevan-radovanovic",
    name: "Stevan Radovanovic",
    company: "Techtonnik",
    role: "CEO",
    quote:
      "Their high standard of work, paired with a consistently positive and professional attitude, made a real difference on every project we worked on together.",
    avatar: "/avatars/stevan-radovanovic.jpg",
    logo: "/logos-white/techtonnik.png",
    logoDark: "/logos-dark/techtonnik.png",
  },
  {
    id: "flynn-blackie",
    name: "Flynn Blackie",
    company: "MOD Digital",
    role: "Director",
    quote:
      "Zenith redefined what hard work means to me. They treat every website project with pride, enthusiasm and extreme passion.",
    avatar: "/avatars/flynn-blackie.jpg",
    logo: "/logos-white/mod.png",
    logoDark: "/logos-dark/mod.png",
    poster: "/testimonials/flynn.jpg",
  },
  {
    id: "finlay-wellington",
    name: "Finlay A. Wellington",
    company: "Wellington Web Co",
    role: "Director",
    quote:
      "When I booked the introductory call, I never would have guessed that Zenith and WWCo would go on to create dozens of local business websites throughout Scotland. Amazing at what they do and I trust Pavle to always deliver.",
    avatar: "/avatars/finlay-wellington.png",
    video: "/testimonials/finlay-wellington.mp4",
    poster: "/testimonials/finlay-wellington-poster.png",
  },
  {
    id: "dragan-gavric",
    name: "Dragan Gavric",
    company: "NotixIT",
    role: "Co-Founder",
    quote:
      "One of the core traits that stands out in business is their social ability to communicate and resonate with the people they talk to. They are a truly outstanding listener, with a keen ability to creatively guide your ideas.",
    avatar: "/avatars/dragan-gavric.jpg",
  },
  {
    id: "les-marie",
    name: "Les Marie",
    company: "LMFHR",
    role: "Director",
    quote:
      "Pavle and Zenith have delivered over 12 home care websites for our consulting clients throughout 2024/2025. I can always rely on them to have web, email and IT covered.",
    avatar: "/avatars/les-marie.jpg",
    logoDark: "/logos-blue/lmfhr.avif",
  },
  {
    id: "marko-georgievski",
    name: "Marko Georgievski",
    company: "Lepa Couture",
    role: "Marketing Manager",
    quote:
      "We booked a call, got a quote and had a prestige Shopify site delivered in a few weeks. I'm still impressed by the look and we'll definitely work together again.",
    avatar: PLACEHOLDER_AVATAR,
  },
  {
    id: "erin-camp",
    name: "Erin Camp",
    company: "SA Party Rental",
    role: "Owner",
    quote:
      "Pavle was excellent to work with and really went above and beyond with what we asked him to do. Thank you again, Pavle.",
    avatar: "/avatars/erin-camp.webp",
  },
  {
    id: "evy-hansen",
    name: "Evy Hansen",
    company: "Leap Marketing",
    role: "Director",
    quote:
      "Great experience working with Pavle. Excellent communication and a quick turnaround of high-quality work. Will hire again for more projects.",
    avatar: "/avatars/evy-hansen.jpg",
  },
  {
    id: "christopher-barone",
    name: "Christopher Barone",
    company: "RibbonFoldedPeptides",
    role: "Entrepreneur",
    quote:
      "What stood out most was that Pavle and the Zenith team didn't just do the job, they went above and beyond. They anticipated needs I hadn't even considered, brought forward creative solutions, and always took the time to explain options clearly so I could make informed decisions.",
    avatar: PLACEHOLDER_AVATAR,
  },
  {
    id: "ben-hall",
    name: "Ben Hall",
    company: "Capacity",
    role: "Entrepreneur",
    quote:
      "Zenith runs our design and development operations end to end. Reliable, fast, and genuinely invested in the outcome.",
    avatar: "/avatars/ben-hall.jpg",
    logo: "/logos-white/capacity.png",
    logoDark: "/logos-dark/capacity.png",
  },
  {
    id: "joshua-christie",
    name: "Joshua Christie",
    company: "Alluring Endeavours",
    role: "Head of Marketing",
    quote:
      "I was amazed by the service I received from Zenith. The team did a great job at explaining the current flaws with my website and how they could be omitted with a redesign.",
    avatar: "/avatars/joshua-christie.jpg",
  },
  {
    id: "bianca-cervantes",
    name: "Bianca Cervantes",
    company: "Bianomics",
    role: "Director",
    quote:
      "They are skilled, trustworthy and genuinely care about delivering high quality work. I'd highly recommend them to anyone looking for web design or development help, you'll be in safe hands whether that's your business or your clients.",
    avatar: "/avatars/bianca-cervantes.png",
  },
  {
    id: "michael-forte",
    name: "Michael Forte",
    company: "Outlaws & Executives",
    role: "Vehicle Specialist",
    quote:
      "I commend Zenith for their unwavering dedication to excellence and attentive customer service, advising me on changes that allow me to differentiate my website from the templates I was using.",
    avatar: "/avatars/michael-forte.jpg",
    video: "/testimonials/michael-forte.mp4",
    poster: "/avatars/michael-forte.jpg",
  },
  {
    id: "david-opavski",
    name: "David Opavski",
    company: "Stilby SRO",
    role: "EU Branch Director",
    quote:
      "Two modern websites for our real estate and architecture groups, the right baseline for us to grow and expand to new markets.",
    avatar: "/avatars/david-opavski.jpg",
    logo: "/logos-white/stilby.png",
    logoDark: "/logos-dark/stilby.png",
  },
  {
    id: "traci-alexander",
    name: "Traci Alexander",
    company: "Touch Of Hope",
    role: "Entrepreneur",
    quote:
      "I've commissioned two sites from Zenith so far; one for my home care company and one for my life coaching business. I can always rely on Pavle to support my digital operations.",
    avatar: "/avatars/traci-alexander.jpg",
  },
  {
    id: "josh-smith",
    name: "Josh Smith",
    company: "CreativeNativeFilms",
    role: "Co-Director",
    quote:
      "Zenith handled our website redesign and we're now working on an AEO and SEO campaign, genuinely impressed by the leads we're getting through Google and ChatGPT.",
    avatar: "/avatars/josh-smith.jpg",
  },
  {
    id: "cody-atherton",
    name: "Cody Atherton",
    company: "ATW Trucking",
    role: "President",
    quote:
      "We needed a quick website redesign to go in place since our last web designers bailed out on us. Pavle and Zenith swooped the floors with a clean looking site for our logistics firm. Will work with them again.",
    avatar: "/avatars/cody-atherton.jpg",
  },
  {
    id: "tom-h",
    name: "Tom H",
    company: "Tripiiart Clothing",
    role: "Entrepreneur",
    quote:
      "I am grateful for Pavle's hard work and effort, especially after I had an awful experience with somebody else, who had no idea what they were doing, prior to getting into contact with Pavle. I'm super excited to soon launch my website and make it public.",
    avatar: PLACEHOLDER_AVATAR,
  },
  {
    id: "blake-bowles",
    name: "Blake Bowles",
    company: "CBWorld",
    role: "Videographer",
    quote:
      "Always incredible work and extremely helpful throughout the process of each project I have worked with them on. Always go above and beyond to produce high quality work and design. Thanks Pavle.",
    avatar: "/avatars/blake-bowles.jpg",
  },
  {
    id: "kayla-bloom",
    name: "Kayla Bloom",
    company: "Wlcm2Wtvr",
    role: "Entrepreneur",
    quote:
      "Their professionalism and expertise have been instrumental in the growth of my business, and I can confidently give them a rating of 10/10.",
    avatar: "/avatars/kayla-bloom.jpg",
    video: "/testimonials/kayla-bloom.mov",
    poster: "/testimonials/kayla-bloom-poster.jpg",
  },
  {
    id: "luka-stojakovic",
    name: "Luka Stojakovic",
    company: "SuperStan",
    role: "Manager",
    quote:
      "The main part I'd like to highlight in our collaboration with Zenith was the communication, always available, always reliable. My highest recommendations.",
    avatar: "/avatars/luka-stojakovic.avif",
  },
  {
    id: "ivana-lesevic",
    name: "Ivana Lesevic",
    company: "Destilerija Gorska",
    role: "Head of Sales",
    quote:
      "It's all about style and efficiency for us. Gorska is no ordinary rakija, so we needed an extraordinary team. That team happens to be the Zenith team.",
    avatar: "/avatars/ivana-lesevic.avif",
  },
];

const byId = new Map(allTestimonials.map((t) => [t.id, t]));

/** Look up a testimonial, failing loudly rather than rendering a blank quote. */
export function testimonial(id: string): Testimonial {
  const t = byId.get(id);
  if (!t) throw new Error(`Unknown testimonial id: "${id}"`);
  return t;
}

/** "Director - MOD Digital", or just the role when there's no company. */
export function attribution(t: Testimonial): string {
  return t.company ? `${t.role} - ${t.company}` : t.role;
}

/**
 * The shape most sections want: quote plus attribution. `role` can be
 * overridden where a section has historically used a fuller title.
 */
export function quoteOf(id: string, roleOverride?: string) {
  const t = testimonial(id);
  return {
    quote: t.quote,
    name: t.name,
    role: roleOverride ?? attribution(t),
    avatar: t.avatar,
  };
}
