import type { PartnerShowcase, partnerShowcaseUi } from "./partner-showcase";
import { hero as homeHero, pricing as homePricing } from "./home";
import { showcaseSrClientLabels } from "./partner-showcase-sr-labels";

/**
 * /izrada-sajtova: the partner showcase in Serbian (Latin script), for
 * businesses in Serbia (owner, 25 Nov 2026). A separate page: the English
 * /partner-showcase is untouched.
 *
 * Same building blocks as the English page, rewritten around website design
 * and development that brings results rather than the ads-partner angle:
 * websites first, then stores, sales pages, migrations and search, with
 * pricing under the services. No before/after and no platforms section; the
 * ads-partner section, the free-audit form and the full project grid are left
 * out too, because each one leads to English pages or to the ads angle.
 *
 * Every figure keeps the wording and attribution already published on the
 * English site, translated, not restated.
 *
 * PRICES are the Serbian ones (owner, 25 Nov 2026): The Minimum from 499 EUR,
 * The Studio 1,249 EUR, a sales page (prodajna stranica, the landing page)
 * from 249 EUR. They differ from the English site's on purpose, so they are
 * set here rather than read from the homepage pricing.
 *
 * Voice: formal "vi", ekavian, as in the Woodstone 024 proposal. No dashes as
 * punctuation.
 */

const EMAIL = { label: "Pišite nam", href: "mailto:hello@thezenithdigital.com" };

const tier = (name: string) => {
  const t = homePricing.tiers.find((x) => x.name === name);
  if (!t) throw new Error(`partner-showcase-sr: no "${name}" tier in the homepage pricing`);
  return t;
};

export const partnerShowcaseSr: Omit<PartnerShowcase, "together" | "tech" | "projects"> = {
  meta: {
    title: "Izrada sajtova koji donose rezultate | Zenith Digital",
    description:
      "Dizajn i izrada sajtova, online prodavnica i prodajnih stranica za firme koje žele više upita i prodaje. Fiksne cene, sajt objavljen za nekoliko nedelja.",
  },

  hero: {
    eyebrow: "Dizajn i izrada sajtova",
    heading: "Sajtovi koji donose klijente, a ne samo posete.",
    lead: "Zenith Digital dizajnira i izrađuje sajtove, online prodavnice i prodajne stranice za firme koje žele rezultate: više upita, više prodaje i bolju vidljivost na Google-u. Jedan tim koji vodi osnivač, a sajt je objavljen za nekoliko nedelja.",
    primaryCta: { label: "Pogledajte radove", href: "#work" },
    secondaryCta: { label: "Pogledajte cene", href: "#pricing" },
  },

  work: {
    heading: "Naši uspešni projekti",
    intro: "Sajtovi, online prodavnice i prodajne stranice za firme u Srbiji, Velikoj Britaniji, EU i SAD.",
    stats: ["100+ objavljenih sajtova", "Wix Legend Partner", "Shopify Partner", "Sajtove pravimo od 2019."],
  },

  services: {
    heading: "Pet usluga kroz koje vam donosimo više klijenata",
    intro: "Svaka usluga rešava jedan problem koji vas košta upita ili prodaje. Krenite od onog koji vas sada najviše koči.",
    items: [
      {
        id: "sajtovi",
        name: "Dizajn i izrada sajta",
        when: "Sajt vam je zastareo, ne donosi upite ili mu godinama nemate pristup.",
        description:
          "Kompletan sajt planiran oko vaših kupaca: prvo struktura, zatim tekst, pa dizajn. Posle predaje vaš tim sam menja sav sadržaj.",
        deliverables: [
          "Struktura i skice stranica zasnovane na vašim kupcima",
          "Tekstovi pisani tako da prodaju",
          "Dizajn i izrada, sa posebnim funkcijama gde su potrebne",
          "Osnovna SEO optimizacija svake stranice",
          "Analitika i prikupljanje upita povezani od prvog dana",
          "Snimljena obuka, da vaš tim sam menja sav sadržaj",
        ],
        slides: [
          { image: "/case-studies/scottish-luxury-experience/card.webp", client: "Scottish Luxury Experience", caption: "$521k u rezervacijama za 7 meseci." },
          { image: "/case-studies/atw-trucking/card.webp", client: "ATW Trucking", caption: "Sajt za prevoz i logistiku, izrađen ponovo od početka do kraja." },
          { image: "/case-studies/bianomics/card.webp", client: "Bianomics", caption: "Sajt konsultantske firme koji objedinjuje brend, PR, događaje, operacije i programe za zaposlene u jednu ponudu." },
          { image: "/case-studies/yacht-junky/card.webp", client: "Yacht Junky", caption: "Online tržište za kupovinu i prodaju brodova i jahti." },
        ],
      },
      {
        id: "prodavnice",
        name: "Izrada online prodavnice",
        when: "Prodajete proizvode online, a prodavnica koči prodaju.",
        description:
          "Prodavnice na Shopify-ju ili Wix Studiju, postavljene tako da se proizvodi lako pronalaze, a kupovina brzo završava. Na više jezika kada prodajete i van granica.",
        deliverables: [
          "Dizajn i izrada prodavnice na Shopify-ju ili Wix Studiju",
          "Katalog proizvoda i kolekcije",
          "Podešena naplata, plaćanje i dostava",
          "Prodavnice na više jezika za nova tržišta",
          "Obuka, da vaš tim sam vodi prodavnicu",
        ],
        slides: [
          { image: "/case-studies/stilby/card.webp", client: "Stilby", caption: "Tri jezika, objavljeno za dve nedelje." },
          { image: "/case-studies/lepa-couture/card.webp", client: "Lepa Couture", caption: "Shopify prodavnica za couture haljine rađene po porudžbini." },
          { image: "/case-studies/notyou-brand/card.webp", client: "NotYou Brand", caption: "Streetwear prodavnica i lookbook za brend koji prodaje kroz kolekcije u ograničenom izdanju." },
          { image: "/case-studies/destilerija-maodus/card.webp", client: "Destilerija Maodus", caption: "Sajt brenda destilerije sa poručivanjem poklona." },
        ],
      },
      {
        id: "prodajne-stranice",
        name: "Prodajne stranice i optimizacija za marketing kampanje",
        when: "Imate ponudu, kampanju ili događaj, a ljude šaljete na početnu stranu.",
        description:
          "Posebna stranica za svaku ponudu, napisana i izrađena oko jedne akcije: upita, prijave ili kupovine. Spremna za testiranje više verzija.",
        deliverables: [
          "Struktura i tekst pisani za konverziju",
          "Dizajn i izrada u skladu sa vašim brendom",
          "Povezivanje formi, CRM-a i zakazivanja",
          "Optimizovana brzina učitavanja",
          "Spremna za testiranje više verzija",
        ],
        slides: [
          { image: "/case-studies/mod-digital/card.webp", client: "MOD Digital", caption: "15+ prodajnih stranica za kampanje klijenata MOD Digitala." },
          { image: "/case-studies/hunting-brook-gardens/card.webp", client: "Hunting Brook Gardens", caption: "Stranice za upis na kurseve i događaje za Hunting Brook Gardens." },
          { image: "/case-studies/jim-steele/card.webp", client: "Jim Steele", caption: "Prezentacijska stranica i sistem za prikupljanje upita za britanskog motivacionog govornika." },
          { image: "/case-studies/iskra/card.webp", client: "Iskra", caption: "Prodajna stranica i tok kupovine za aplikaciju koja pomaže da ostavite pušenje." },
        ],
      },
      {
        id: "migracije",
        name: "Prelazak na novu platformu",
        when: "Želite da promenite platformu, a da svaka stara adresa i dalje vodi na pravo mesto.",
        description:
          "Sajt prenosimo stranicu po stranicu, preusmeravamo svaku staru adresu i 30 dana posle objave pratimo kako ga Google indeksira.",
        deliverables: [
          "Popis svih adresa (URL) i mapa preusmeravanja 1:1",
          "Prenos sadržaja i CMS-a",
          "Prenos naslova stranica, opisa i strukturisanih podataka (schema)",
          "Provera brzine i Core Web Vitals pokazatelja",
          "30 dana praćenja indeksiranja posle objave",
        ],
        slides: [
          { image: "/case-studies/katie-hailey/card.webp", client: "Katie Hailey", caption: "Joga, zvučno isceljenje i rezervacije retreata za britansku instruktorku, od Figma dizajna do objave za 1,5 nedelju." },
          { image: "/case-studies/belistria/supporting-1.webp", client: "Bel'Istria", caption: "35+ prenetih stranica, a prikazivanja u pretrazi veća za 257% u odnosu na prethodnu godinu." },
          { image: "/case-studies/genroks-ai/card.webp", client: "Genroks AI", caption: "Sa Framer šablona na sajt izrađen u kodu." },
          { image: "/case-studies/destilerija-maodus/card.webp", client: "Destilerija Maodus", caption: "Ilustrovani sajt brenda i poručivanje poklona za destileriju rakije." },
        ],
      },
      {
        id: "seo",
        name: "Optimizacija za pretragu i AI",
        when: "Sajt je objavljen, ali vas pronalaze samo oni koji već znaju vaše ime.",
        description:
          "Podešavamo sajt tako da Google i AI asistenti poput ChatGPT-a razumeju čime se bavite, a zatim pravimo stranice koje odgovaraju na ono što vaši kupci pretražuju. Tako vas novi kupci pronalaze sami, bez plaćanja svake posete.",
        deliverables: [
          "Tehnički SEO i optimizacija stranica",
          "AEO: schema, struktura i vidljivost u AI odgovorima",
          "Strategija ključnih reči i sadržaja",
          "Mesečni izveštaj, jasnim jezikom",
        ],
        slides: [
          { image: "/case-studies/belistria/supporting-2.webp", client: "Bel'Istria", caption: "Prikazivanja u pretrazi veća za 257% u odnosu na prethodnu godinu." },
          { image: "/case-studies/just-stay/card.webp", client: "Just Stay", caption: "Sistem za rezervacije kratkoročnog smeštaja i pridobijanje stanodavaca za britanskog Airbnb superhosta." },
          { image: "/case-studies/genroks-ai/card.webp", client: "Genroks AI", caption: "Novi brend izrađen u kodu i AEO za AI startap iz oblasti usklađenosti poslovanja." },
        ],
      },
    ],
  },

  process: {
    name: "The Zenith Sprint",
    heading: "Od prvog razgovora do objave, u pet koraka",
    steps: [
      { step: "Korak 1", label: "Upoznavanje", heading: "Prvo upoznajemo vaš posao i vaše kupce", points: ["Besplatan uvodni razgovor", "Ciljevi, kupci i ponude na jednom mestu"] },
      { step: "Korak 2", label: "Istraživanje", heading: "Konkurencija, ključne reči i šta zaista donosi upite", points: ["Analiza tržišta i konkurencije", "Pitanja koja vaši kupci postavljaju"] },
      { step: "Korak 3", label: "Skice", heading: "Struktura i tekst pre dizajna", points: ["Skice svake stranice", "Tekstovi pisani tako da prodaju"] },
      { step: "Korak 4", label: "Izrada", heading: "Dizajn i izrada, uz vaš pregled uživo", points: ["Dizajn i izrada na vašoj platformi", "Pregledate direktno, mi doterujemo"] },
      { step: "Korak 5", label: "Objava", heading: "Objavljeno, povezano sa analitikom i predato vama", points: ["Provera kvaliteta, SEO-a i brzine", "Obuka, da vaš tim sam menja sadržaj"] },
    ],
  },

  close: {
    heading: "Spremni da počnemo?",
    paragraph: "Napišite nam šta vaš sajt treba da postigne. Odgovaramo predlogom sa fiksnom cenom i rokom.",
  },
};

/** The close's one action: email, as on the Woodstone 024 proposal. */
export const partnerShowcaseSrCta = EMAIL;

/**
 * Pricing under the services: the three build packages, websites first (The
 * Minimum, The Studio, then a sales page). The Zenith retainer is left out:
 * it centres on ad campaigns, the angle this page moves away from. The
 * featured tier and the structure come from the site's own packages; the
 * prices are the Serbian ones (see the top of this file) and the words are
 * translated.
 */
export const partnerShowcaseSrPricing = {
  heading: "Transparentne, fiksne cene",
  intro: "Fiksan obim, fiksna cena, fiksan rok. Bez skrivenih troškova i bez iznenađenja na računu.",
  cta: EMAIL,
  tiers: [
    {
      ...tier("The Minimum"),
      price: "Od 499 €",
      priceNote: "jednokratno, u 2 rate",
      summary: "Čist i pouzdan sajt za firme koje žele brzo da krenu.",
      timeline: "Isporuka za 2 nedelje",
      featuresLabel: "Osnovne funkcije",
      features: [
        "Do 5 stranica",
        "Dizajn i izrada na Wix Studiju ili u kodu",
        "Prilagođeno telefonima",
        "Osnovna SEO optimizacija",
        "1 krug izmena",
        "30 dana besplatne podrške posle objave",
      ],
      cta: EMAIL,
      badge: "",
    },
    {
      ...tier("The Studio"),
      price: "1.249 €",
      priceNote: "jednokratno, u 2 rate",
      summary: "Posebne funkcije, CMS kojim vaš tim sam upravlja i kompletan SEO i tekstovi.",
      timeline: "Isporuka za 5 nedelja",
      featuresLabel: "Sve iz paketa The Minimum, plus:",
      features: [
        "Do 12 stranica",
        "Posebne funkcije i CMS",
        "Integracije i automatizacije",
        "Kompletan SEO, AEO i copywriting",
        "3 kruga izmena",
        "30 dana besplatne podrške posle objave",
      ],
      cta: EMAIL,
      badge: "Najpopularniji",
    },
    {
      name: "Prodajna stranica",
      icon: "split",
      price: "Od 249 €",
      priceNote: "fiksno, do 2 stranice",
      summary: "Stranica za kampanju ili ponudu, osmišljena, napisana i objavljena za oko nedelju dana.",
      timeline: "Objava za oko nedelju dana",
      featuresLabel: "Šta je uključeno",
      features: [
        "Struktura i tekst za konverziju",
        "Dizajn u skladu sa vašim brendom",
        "Izrada i optimizacija brzine",
        "Povezivanje formi, CRM-a i zakazivanja",
        "Praćenje događaja u analitici",
        "Struktura spremna za testiranje verzija",
      ],
      cta: EMAIL,
      highlighted: false,
      badge: "",
    },
  ],
};

/**
 * The page's labels: chrome, jump bar and slider microcopy, the Serbian
 * counterparts of the English page's (same keys, so the shared components
 * take either).
 */
export const partnerShowcaseSrUi: typeof partnerShowcaseUi = {
  ...showcaseSrClientLabels,
  wordmark: "zenith digital",
  /** The homepage hero's three Wix badges, with Serbian alt text. */
  badges: homeHero.certifications.map((badge, i) => ({
    ...badge,
    alt: [
      "Wix Studio sertifikovani developer, nivo Expert, 2025",
      "Wix Studio sertifikovani veb dizajner, nivo Expert, 2025",
      "Wix partner, nivo Legend",
    ][i] ?? badge.alt,
  })),
  footer: "© 2026 Zenith Digital",
  jumpLabel: "Delovi stranice",
  jump: [
    { id: "work", name: "Radovi" },
    { id: "services", name: "Usluge" },
    { id: "process", name: "Proces" },
  ],
  firstServicePill: "Naša glavna usluga",
  moreTools: "i još",
};

/** The jump bar's set-apart last stop: the prices. */
export const partnerShowcaseSrJumpTrailing = { id: "pricing", name: "Cene" };
