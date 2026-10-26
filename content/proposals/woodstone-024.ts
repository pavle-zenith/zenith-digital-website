import type { AuditProposalPage } from "./types";

/**
 * Woodstone 024 (woodstone.rs), decorative garden stone, Subotica. A short
 * audit of the current site, a priority list and a phased proposal, in
 * Serbian (Latin script). Copy is the owner's brief, verbatim: do not
 * translate or rephrase it, and keep the spaced hyphens ( - ) as they are.
 *
 * The slug carries a random suffix so the URL can't be guessed. The page is a
 * private document: see the route file for the four privacy layers.
 *
 * OWNER CHANGES, 26 Oct 2026, after the first build: one offer (Novi sajt u
 * Wix Studiju, 4 nedelje, 850 EUR) in place of three phases and a price
 * table, folding in the key items of the old phases 1 and 3; a four-week
 * timeline; Hungarian alongside English everywhere; no call asked for, the
 * next step is a contract; email in place of booking links.
 *
 * SCREENSHOTS were captured from woodstone.rs on 26 Oct 2026 and annotated
 * with the finding's own words. Finding 7 is kept while the owner confirms
 * the editor version in the client's Wix dashboard.
 */

const EMAIL = { label: "Pišite nam", href: "mailto:hello@thezenithdigital.com" };
const ASSETS = "/proposals/woodstone-024";

export const woodstone024: AuditProposalPage = {
  kind: "audit",
  slug: "woodstone-024-a77hw",
  client: "Woodstone 024",
  lang: "sr-Latn",
  meta: {
    title: "Woodstone 024 - Analiza sajta i predlog saradnje | Zenith Digital",
    description:
      "Pregledali smo woodstone.rs iz ugla kupca, Google pretrage i AI asistenata.",
    ogTitle: "Woodstone 024: od kataloga do sajta koji prodaje",
    ogLocale: "sr_RS",
  },

  labels: {
    jump: "Sadržaj",
    severity: { critical: "Kritično", high: "Visok", medium: "Srednji" },
    seen: "Šta smo videli",
    why: "Zašto je važno",
    proposal: "Predlog",
    duration: "Trajanje",
    price: "Cena",
    mobileBar: "Pogledajte predlog",
    missingImage: "[MOCKUP POČETNE STRANE]",
  },

  hero: {
    eyebrow: "Analiza sajta i predlog saradnje",
    heading: "Woodstone 024: od kataloga do sajta koji prodaje",
    lead: "Pregledali smo woodstone.rs iz ugla kupca, Google pretrage i AI asistenata. Na ovoj stranici su najvažniji nalazi, redosled prioriteta i predlog kako da sajt postane alat koji donosi upite iz Srbije i inostranstva.",
    meta: [
      { label: "Pripremljeno za", value: "Woodstone 024, Subotica" },
      { label: "Datum", value: "26. oktobar 2026." },
      { label: "Pripremio", value: "Pavle Maodus, Zenith Digital" },
    ],
    primaryCta: { label: "Pogledajte predlog", href: "#predlog-saradnje" },
    secondaryCta: EMAIL,
  },

  summary: {
    id: "ukratko",
    heading: "Ukratko",
    body: [
      "Dobra vest: imate ono što je najteže - sopstvenu proizvodnju, konkurentne cene i jasan asortiman. Problem nije u proizvodu, već u tome što sajt kupcu ne daje sledeći korak.",
      "Posetilac vidi cenu, ali ne može da poruči, ne zna koliko kamena mu treba i ne vidi da isporučujete na veliko i u inostranstvo. Zato SEO sam po sebi ne bi rešio problem. Prvo treba popraviti put od posete do upita, a zatim dovoditi više posetilaca.",
    ],
    points: [
      "Stranica proizvoda nema dugme za porudžbinu ni upit.",
      "Engleska i mađarska verzija sajta ne postoje.",
      "Sajt ne odgovara na pitanja koja kupci postavljaju Google-u i AI asistentima.",
    ],
    fixes: [
      "Redizajniran sajt sa modernijim sekcijama i sadržajem za bolju prodaju",
      "Optimizovan za AI i SEO",
      "Višejezičan, kako bi strani kupci dobili uvid u Woodstone",
    ],
  },

  stats: {
    id: "brzi-pregled",
    heading: "Brzi pregled",
    items: [
      { value: "0", label: "dugmadi za porudžbinu ili upit na stranicama proizvoda" },
      { value: "0", label: "stranica na engleskom i mađarskom jeziku" },
      { value: "3", label: "različite adrese firme na sajtu" },
      { value: "29 od 38", label: "slika na početnoj strani bez opisa (alt teksta)" },
      { value: "2", label: "prazne kategorije koje Google indeksira" },
      { value: "3", label: "statičke stranice: Početna, O nama, Kontakt" },
    ],
  },

  findings: {
    id: "nalazi",
    heading: "Šta smo pronašli",
    intro:
      "Nalaze smo poređali po uticaju na prodaju. Uz svaki navodimo šta smo videli, zašto je važno i šta predlažemo.",
    items: [
      {
        id: "nalaz-1",
        number: "Nalaz 1",
        title: "Kupac nema sledeći korak",
        severity: "critical",
        tag: "Konverzija",
        seen: [
          "Na stranici proizvoda postoje cena i izbor varijante, ali nema dugmeta za porudžbinu, upit ili poziv. Broj telefona je napisan u opisu kao običan tekst, pa se na mobilnom ne može pozvati jednim dodirom.",
          "Važno pravilo je skriveno u opisu proizvoda: za porudžbine ispod 500 kg cena se uvećava za 100 RSD po džaku. Tamo je skrivena i mogućnost pakovanja u Big Bag vreće. Na mobilnom telefonu prvi ekran početne strane je crveni blok teksta, bez slike proizvoda i bez dugmeta.",
        ],
        why: [
          "Svaki posetilac koji je spreman da kupi mora sam da traži kontakt. Deo njih odustane i ode kod konkurencije, a vi to nikada ne vidite.",
        ],
        proposal: [
          [
            "Dugme \"Zatraži ponudu\" na svakom proizvodu, sa količinom u džakovima ili tonama, Big Bag pakovanjem i mestom isporuke.",
            "Dugme za poziv i WhatsApp/Viber uvek vidljivo na mobilnom.",
            "Jasno istaknute cene na veliko i malo.",
            "Kalkulator \"Koliko kamena mi treba\".",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/product-page.webp`,
            alt: "Stranica proizvoda Oblutak BELI 3-5cm 25kg na woodstone.rs: cena i izbor varijante, broj telefona u opisu, i ispod toga nema dugmeta.",
            caption: "Stranica proizvoda: cena i izbor varijante, ali nema dugmeta za porudžbinu, upit ili poziv.",
            width: 1400,
            height: 1531,
          },
          {
            src: `${ASSETS}/home-mobile.webp`,
            alt: "Prvi ekran početne strane woodstone.rs na mobilnom telefonu: crveni blok teksta preko celog ekrana.",
            caption: "Početna strana na mobilnom: crveni blok teksta, bez slike proizvoda i bez dugmeta.",
            width: 780,
            height: 1326,
          },
        ],
      },
      {
        id: "nalaz-2",
        number: "Nalaz 2",
        title: "Engleska i mađarska verzija ne postoje",
        severity: "critical",
        tag: "Međunarodni SEO",
        seen: [
          "Adresa woodstone.rs/en vraća grešku 404, a promena jezika prikazuje isti sadržaj na srpskom. Uz to, sajt Google-u šalje signal da je ceo sadržaj na engleskom jeziku, iako je na srpskom. Ne postoji stranica namenjena veleprodaji i izvozu.",
        ],
        why: [
          "Kupac iz inostranstva trenutno nema šta da pročita, a Google nema šta da prikaže u pretragama van Srbije. Pogrešna oznaka jezika dodatno otežava pravilno rangiranje i na srpskom.",
        ],
        proposal: [
          [
            "Engleska i mađarska verzija preko Wix Multilingual, sa ispravnim jezičkim oznakama (hreflang).",
            "Posebna stranica Veleprodaja i izvoz. Na njoj su paletno i Big Bag pakovanje, minimalne količine, rokovi, organizacija transporta i tehnički listovi.",
            "Mađarska verzija je posebno važna, s obzirom na blizinu granice.",
          ],
        ],
      },
      {
        id: "nalaz-3",
        number: "Nalaz 3",
        title: "Struktura sajta i katalog",
        severity: "high",
        tag: "Arhitektura sajta",
        seen: [
          [
            "Stavka BEHATON u meniju nije stranica, već poziva broj telefona.",
            "Kategorije \"Lomljeni kamen Grčka Kavala\" i \"Granitne kocke (kaldrma)\" su prazne, a Google ih indeksira.",
            "Adrese proizvoda se ne poklapaju sa nazivima. Na primer, adresa \"oblutak-beli-25kg\" vodi na proizvod \"Oblutak Granit\".",
            "Nazivi proizvoda imaju greške i nedosledna velika slova.",
            "Stranice Veleprodaja i Galerija ne postoje.",
          ],
        ],
        why: [
          "Prazne i zbunjujuće stranice umanjuju poverenje i kod kupaca i kod Google-a. Jasna struktura je temelj na kome se gradi sve ostalo.",
        ],
        proposal: [
          [
            "Nova struktura menija i kategorija: Oblutak, Drobljeni kamen, Teraco zrno, Veleprodaja i izvoz, Galerija, O nama, Kontakt.",
            "Uređeni nazivi i adrese proizvoda.",
            "Preusmerenja (301) za sve stare adrese, uključujući kategoriju Kamen štanglice koju izbacujete iz ponude, kako ne biste izgubili postojeće pozicije.",
          ],
        ],
        evidence: [
          {
            src: `${ASSETS}/nav-behaton.webp`,
            alt: "Glavni meni woodstone.rs sa označenom stavkom BEHATON.",
            caption: "Glavni meni: stavka BEHATON nije stranica, već poziva broj telefona.",
            width: 1600,
            height: 215,
          },
          {
            src: `${ASSETS}/empty-category.webp`,
            alt: "Kategorija Granitne kocke (kaldrma) na woodstone.rs sa porukom No products here yet.",
            caption: "Kategorija Granitne kocke (kaldrma): prazna, a Google je indeksira.",
            width: 1600,
            height: 534,
          },
        ],
      },
      {
        id: "nalaz-4",
        number: "Nalaz 4",
        title: "Osnovna SEO optimizacija",
        severity: "high",
        tag: "On-page SEO",
        seen: [
          [
            "Glavni naslov početne strane (H1) čine samo četiri reči, jedna ispod druge.",
            "Strana ima oko 400 reči i samo jedan podnaslov (\"Kontakt\").",
            "Stranice kategorija nemaju glavni naslov ni uvodni tekst.",
            "Opis početne strane za Google ima oko 400 karaktera, a preporuka je do 160.",
            "Naslov za deljenje na društvenim mrežama pominje laminat.",
            "Većina slika nema opis.",
          ],
        ],
        why: [
          "Google ne može pouzdano da razume za koje pretrage je koja stranica relevantna, na primer \"beli oblutak cena\" ili \"teraco zrno za dvorište\".",
        ],
        proposal: [
          [
            "Naslovi, opisi i podnaslovi za svaku stranicu.",
            "Uvodni tekstovi kategorija.",
            "Opisi slika i proizvoda pisani za pretrage koje kupci zaista koriste.",
          ],
        ],
      },
      {
        id: "nalaz-5",
        number: "Nalaz 5",
        title: "Neusklađeni podaci o firmi",
        severity: "medium",
        tag: "Lokalni SEO",
        seen: [
          "Na sajtu se pojavljuju tri različite adrese:",
          [
            "Senćanski put 55 (Kontakt)",
            "Segedinski put 53 (naslov za deljenje)",
            "Lošinjska 23 (podaci o proizvodu)",
          ],
        ],
        why: [
          "Google upoređuje naziv, adresu i telefon na sajtu, na Google mapama i u imenicima. Neslaganje smanjuje poverenje i vidljivost u lokalnim pretragama, kao što je \"dekorativni kamen Subotica\".",
        ],
        proposal: [
          [
            "Jedna zvanična adresa za preuzimanje robe na celom sajtu.",
            "Uređen Google Business profil.",
            "Strukturisani podaci (schema) sa lokacijom, radnim vremenom i društvenim mrežama.",
          ],
        ],
      },
      {
        id: "nalaz-6",
        number: "Nalaz 6",
        title: "Vidljivost u AI pretrazi",
        severity: "medium",
        tag: "AEO / GEO",
        seen: [
          "Sajt ne odgovara ni na jedno od pitanja koja kupci najčešće postavljaju:",
          [
            "koliko kamena treba po kvadratnom metru,",
            "koja granulacija za stazu, a koja za cvetnu leju,",
            "da li ide geotekstil ispod,",
            "koja je razlika između oblutka, teraco zrna i drobljenog kamena,",
            "koliko košta isporuka.",
          ],
          "Strana O nama nema konkretne podatke (godine rada, kapacitet, poreklo kamena). U podacima o proizvodima kao brend je upisano \"Oblutak\".",
        ],
        why: [
          "Sve više kupaca pita ChatGPT, Gemini ili Google AI odgovore umesto da sami pretražuju sajtove. Ovi alati citiraju sajtove koji daju jasne i konkretne odgovore. Ko prvi pokrije ova pitanja na srpskom, postaje izvor koji AI preporučuje.",
        ],
        proposal: [
          [
            "Vodič i odgovori na česta pitanja za svaku kategoriju.",
            "Kalkulator potrošnje.",
            "Konkretni podaci o firmi i proizvodnji.",
            "Ispravni strukturisani podaci za proizvode i firmu.",
          ],
        ],
      },
      // Kept while the owner confirms the editor version in the client's Wix
      // dashboard, before the page is sent.
      {
        id: "nalaz-7",
        number: "Nalaz 7",
        title: "Mobilni prikaz i platforma",
        severity: "high",
        tag: "Tehnika",
        seen: [
          "Sajt je izrađen u starijem Wix editoru (Wix Classic), sa fiksnom širinom za računar i posebno sklopljenom mobilnom verzijom. Brzina učitavanja je solidna, ali raspored na mobilnom ne vodi kupca ka akciji.",
        ],
        why: [
          "Većina posetilaca dolazi sa telefona. Wix Studio omogućava pravi responzivni dizajn i jednostavnije održavanje.",
        ],
        proposal: [
          "Novi sajt u Wix Studiju. Ostajete na Wix platformi i zadržavate domen i proizvode, a dobijate moderan, brz sajt prilagođen svim uređajima.",
        ],
      },
    ],
  },

  mockup: {
    id: "predlog-pocetne",
    heading: "Vaš predlog početne strane",
    body: "Pogledali smo predlog početne strane koji ste poslali i slažemo se sa pravcem. Jasan naslov, kategorije sa dugmadima, priča o proizvodnji i blok za veleprodaju su upravo ono što sajtu nedostaje. Koristićemo ga kao polazište, uz tri izmene:",
    image: {
      src: `${ASSETS}/mockup.webp`,
      alt: "Predlog početne strane za woodstone.rs koji ste poslali: naslov, kategorije sa dugmadima, priča o proizvodnji i blok za veleprodaju.",
      caption: "Predlog početne strane koji ste poslali.",
      width: 820,
      height: 1919,
    },
    points: [
      {
        lead: "Prave fotografije umesto AI slika.",
        text: "Fotografije vašeg pogona, paleta, Big Bag vreća i kamiona su najjači dokaz da ste proizvođač, a ne preprodavac. Kupci i Google to prepoznaju.",
      },
      {
        lead: "Asortiman usklađen sa ponudom.",
        text: "Kamen štanglice izbacujemo, a behaton prikazujemo samo ako ga prodajete.",
      },
      {
        lead: "Kalkulator i dugme za upit na vidljivom mestu,",
        text: "odmah ispod naslova.",
      },
    ],
  },

  offer: {
    id: "predlog-saradnje",
    heading: "Predlog saradnje",
    intro:
      "Sve iz ove analize, u jednom projektu: novi sajt u Wix Studiju, gotov za četiri nedelje.",
    name: "Novi sajt u Wix Studiju",
    duration: "4 nedelje",
    price: "850 EUR",
    items: [
      "Dizajn po vašem predlogu, sa pravim fotografijama",
      "Nova struktura: Oblutak, Drobljeni kamen, Teraco zrno, Veleprodaja i izvoz, Galerija, O nama, Kontakt",
      "Stranica za svaku kategoriju, sa vodičem i čestim pitanjima",
      "Sistem upita \"Zatraži ponudu\", sa količinom, pakovanjem i mestom isporuke",
      "Kalkulator \"Koliko kamena mi treba\" (površina × debljina sloja → kilogrami → broj džakova)",
      "Dugme za poziv i WhatsApp/Viber na mobilnom",
      "Engleska i mađarska verzija sajta",
      "Prenos svih proizvoda, sa uređenim nazivima i opisima, i preusmerenje starih adresa",
      "Ujednačavanje adrese i kontakt podataka na celom sajtu",
      "Tehnička SEO i AI optimizacija od prvog dana, sa ispravnim strukturisanim podacima za proizvode i firmu",
      "Postavljanje i uređivanje Google Business profila",
      "Povezivanje Google Search Console i Google Analytics, za praćenje upita i pozicija",
      "Obuka za samostalno dodavanje proizvoda i izmenu cena",
    ],
    notes: [
      "Cena je konačna - nismo u sistemu PDV-a.",
      "Plaćanje: 50% unapred, a preostalih 50% po lansiranju, putem eFakture.",
      "Wix pretplata i eventualne dodatne aplikacije nisu uključeni u cenu.",
      "Ponuda važi 30 dana od datuma izrade.",
    ],
  },

  timeline: {
    id: "saradnja",
    heading: "Kako izgleda saradnja",
    rows: [
      {
        what: "Uvodni razgovor i pristupi",
        detail: "(Wix, Search Console, fotografije)",
        when: "nedelja 1",
      },
      { what: "Struktura i dizajn na odobrenje", when: "nedelje 1-2" },
      { what: "Izrada, sadržaj, engleska i mađarska verzija", when: "nedelje 2-4" },
      { what: "Testiranje, prenos i lansiranje", when: "nedelja 4" },
    ],
  },

  needs: {
    id: "potrebno",
    heading: "Šta nam treba od vas",
    items: [
      "Fotografije proizvoda",
      "Odgovori na pitanja",
      "Ažurne povratne informacije",
      "Pristup trenutnom sajtu i analitikama",
      "Logistički podaci o poslovanju (cenovnici, uslovi, količine, politike poslovanja i slično)",
    ],
  },

  faq: {
    id: "pitanja",
    heading: "Česta pitanja",
    items: [
      {
        q: "Da li moramo da pređemo sa Wix-a?",
        a: "Ne. Ostajete na Wix platformi i zadržavate domen. Wix Studio je novija i naprednija verzija Wix editora, a vi i dalje sami upravljate proizvodima i cenama.",
      },
      {
        q: "Šta se dešava sa našom postojećom Wix pretplatom?",
        a: "Postojeću pretplatu prebacujemo na novi sajt u Wix Studiju, tako da ne gubite novac koji ste već platili. Wix Studio pretplata je čak i povoljnija.",
      },
      {
        q: "Šta se dešava sa postojećim pozicijama na Google-u?",
        a: "Sve stare adrese preusmeravamo na nove odgovarajuće stranice, tako da Google prenosi postojeću vrednost na novi sajt.",
      },
      {
        q: "Da li ćemo moći sami da menjamo cene i proizvode?",
        a: "Da. Nakon lansiranja dobijate obuku i kratko uputstvo, pa izmene cena, dodavanje proizvoda i fotografija radite sami.",
      },
      {
        q: "Kada mogu da se očekuju rezultati?",
        a: "Više upita sa postojećih poseta vidi se odmah nakon lansiranja, jer sajt konačno vodi kupca ka akciji. Rast pozicija na Google-u i u AI odgovorima gradi se postepeno, obično u periodu od tri do šest meseci.",
      },
    ],
  },

  close: {
    id: "sledeci-korak",
    heading: "Sledeći korak",
    body: "Ako imate pitanja, pišite nam. Ako nemate, potvrđujemo šta tačno ulazi u isporuku i šaljemo vam ugovor. Plaćanje je 50% unapred, a preostalih 50% po lansiranju, putem eFakture.",
    primaryCta: EMAIL,
    signature: ["Pavle Maodus", "Osnivač, Zenith Digital"],
  },
};
