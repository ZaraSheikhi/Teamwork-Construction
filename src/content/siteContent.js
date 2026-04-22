export const COMPANY_NAME = "Teamwork Construction";
export const REGION = "Bremen & Umgebung";
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://teamwork-construction.de";
export const LOGO_SRC = `${import.meta.env.BASE_URL}images/brand/logo.png`;
const PROJECT_IMAGE_BASE = `${import.meta.env.BASE_URL}images/projects`;
const PROJECT_IMAGE_SOURCES = {
  project1ExteriorBefore: `${PROJECT_IMAGE_BASE}/projekt-1-vorher.jpeg`,
  project1ExteriorAfter: `${PROJECT_IMAGE_BASE}/projekt-1-nachher.jpg`,
  project1InteriorBefore: `${PROJECT_IMAGE_BASE}/projekt-1-innen-vorher.jpeg`,
  project1InteriorAfter: `${PROJECT_IMAGE_BASE}/projekt-1-innen-nachher.png`,
  project2RoomBefore: `${PROJECT_IMAGE_BASE}/projekt-2-vorher.jpeg`,
  project2RoomAfter: `${PROJECT_IMAGE_BASE}/projekt-2-nacher.jpeg`,
  project2StairsBefore: `${PROJECT_IMAGE_BASE}/projekt-2-vorher2.jpeg`,
  project2StairsAfter: `${PROJECT_IMAGE_BASE}/projekt-2-nacher2.jpeg`,
  bath1Before: `${PROJECT_IMAGE_BASE}/bad-1-vorher.jpeg`,
  bath1After: `${PROJECT_IMAGE_BASE}/bad-1-nachher.jpeg`,
  bath2Before: `${PROJECT_IMAGE_BASE}/bad-2-vorher.jpeg`,
  bath2After: `${PROJECT_IMAGE_BASE}/bad-2-nachher.jpeg`,
  bath3Before: `${PROJECT_IMAGE_BASE}/bad-3-vorher.jpeg`,
  bath3After: `${PROJECT_IMAGE_BASE}/bad-3-nachher.jpeg`,
};

export const PHONE_DISPLAY = "+49 174 4257898";
export const PHONE_TEL = "tel:+491744257898";
export const WHATSAPP_DISPLAY = "+49 174 4257898";
export const WHATSAPP_LINK = "https://wa.me/491744257898";
export const EMAIL = "kontakt@teamwork-construction.de";
export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:8787/contact"
    : "https://api.teamwork-construction.de/contact");
export const QUERY_PARAMS = {
  service: "leistung",
  location: "ort",
  source: "quelle",
};

export const BUSINESS_INFO = {
  name: COMPANY_NAME,
  legalName: "TEAMWORK CONSTRUCTION sp. z o.o.",
  url: SITE_URL,
  email: EMAIL,
  telephone: PHONE_DISPLAY,
  telephoneHref: PHONE_TEL,
  areaServed: [
    "Bremen",
    "Delmenhorst",
    "Lilienthal",
    "Osterholz-Scharmbeck",
    "Stuhr",
    "Weyhe",
  ],
  address: {},
  openingHoursSpecification: [],
};

export const LEGAL_PROFILE = {
  legalName: "TEAMWORK CONSTRUCTION sp. z o.o.",
  publicName: "Teamwork Construction",
  representative: "Adam Senske",
  branchAddressLines: ["Rekumer Wurt 8", "28777 Bremen", "Deutschland"],
  registerName: "Krajowy Rejestr Sadowy (KRS), Republik Polen",
  registerNumber: "0001069827",
  taxNumber: "5562806136",
  regon: "52697291900000",
  registeredOffice: "Ostrowo, Polen",
};

export const IMAGE_SOURCES = {
  homeHero:
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  homeStory:
    "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600",
  leistungenHero:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  projekteHero: PROJECT_IMAGE_SOURCES.project1InteriorAfter,
  ablaufHero:
    "https://images.pexels.com/photos/7512035/pexels-photo-7512035.jpeg?auto=compress&cs=tinysrgb&w=1600",
  kontaktHero:
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600",
  legalHero:
    "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export const KPIS = [
  { value: "120+", label: "Projekte begleitet" },
  { value: "24-48h", label: "Rückmeldung werktags" },
  { value: "★★★★★", label: "Kundenzufriedenheit", ariaLabel: "5 Sterne" },
];

export const SERVICES = [
  {
    id: "01",
    title: "Renovierung & Modernisierung",
    description: "Frischer Look für Ihr Zuhause – sauber, planbar und zuverlässig.",
    image:
      "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1200",
    points: [
      "Verlässliche Terminfenster",
      "Schutz der Wohnbereiche während der Arbeiten",
      "Arbeiten nach KfW-Vorgaben",
    ],
    text:
      "Wir modernisieren Räume so, dass sie wieder zu Ihrem Alltag passen. Von Oberfläche bis Detail planen wir alle Schritte, damit es am Ende nicht nur gut aussieht, sondern langfristig funktioniert. Bei geeigneten Maßnahmen integrieren wir unsere KfW-Förderberatung frühzeitig in die Planung.",
  },
  {
    id: "02",
    title: "Innenausbau",
    description:
      "Funktionale Wohnbereiche durchdacht umgesetzt – vom Konzept bis zur Ausführung.",
    image:
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1200",
    points: ["Klare Raumaufteilung", "Materialien passend zu Nutzung und Stil"],
    text:
      "Ob offene Wohnküche, Homeoffice oder Familienbereich: Wir setzen Ausbau-Lösungen um, die nicht nur optisch überzeugen, sondern Ihre Wege und Abläufe zuhause spürbar verbessern.",
  },
  {
    id: "03",
    title: "Trockenbau",
    description: "Wände, Decken, Abhängungen – schnell, sauber und flexibel.",
    image:
      "https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=1200",
    points: ["Saubere Ausführung", "Flexible Anpassung bei späteren Änderungen"],
    text:
      "Trockenbau ist ideal, wenn Räume neu strukturiert werden sollen. Wir arbeiten präzise und zügig, damit Umbauten planbar bleiben und Ihr Zuhause schnell wieder voll nutzbar ist.",
  },
  {
    id: "04",
    title: "Boden & Fliesen",
    description: "Präzise Verlegung, saubere Anschlüsse, langlebige Ergebnisse.",
    image:
      "https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=1200",
    points: ["Saubere Übergänge und Fugen", "Robuste und pflegeleichte Lösungen"],
    text:
      "Böden und Fliesen prägen den gesamten Eindruck eines Raumes. Wir legen Wert auf exakte Linienführung, hochwertige Verarbeitung und ein Ergebnis, das täglich belastbar bleibt.",
  },
  {
    id: "05",
    title: "Bad-Teilmodernisierung",
    description: "Gezielte Updates ohne Komplettumbau – effizient und sauber.",
    image:
      "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    points: [
      "Sinnvolle Maßnahmen mit hoher Wirkung",
      "Kurze Umbauzeiten",
      "Arbeiten nach KfW-Vorgaben bei relevanten Maßnahmen",
    ],
    text:
      "Nicht jedes Bad braucht eine Vollsanierung. Mit gezielten Modernisierungen schaffen wir spürbare Verbesserungen in Komfort, Optik und Alltagstauglichkeit. Unsere KfW-Förderberatung unterstützt Sie bei förderrelevanten Schritten.",
  },
  {
    id: "06",
    title: "Sanierung nach Wasserschaden",
    description: "Rückbau und Wiederaufbau, damit es schnell wieder wohnlich wird.",
    image:
      "https://images.pexels.com/photos/7937214/pexels-photo-7937214.jpeg?auto=compress&cs=tinysrgb&w=1200",
    points: [
      "Strukturierter Ablauf nach Schadensbild",
      "Schnelle Wiederherstellung von Wohnqualität",
    ],
    text:
      "Nach einem Wasserschaden zählt vor allem Tempo mit System. Wir übernehmen Rückbau, Trocknungsbegleitung und Wiederaufbau in klaren Schritten.",
  },
  {
    id: "07",
    title: "Gartenarbeit & Sportanlagen",
    description:
      "Außenbereiche funktional und sauber umgesetzt – von Gartenflächen bis Trainingszonen.",
    image:
      "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Pflege und Aufwertung von Garten- und Außenflächen",
      "Montage von Outdoor-Fitness- und Sportelementen",
    ],
    text:
      "Wir gestalten und modernisieren Außenbereiche, die alltagstauglich und langlebig sind. Ob Gartenarbeit, Sportstationen oder kombinierte Flächen: Planung und Umsetzung erfolgen strukturiert aus einer Hand.",
  },
];

export const STEPS = [
  {
    id: "01",
    title: "Anfrage",
    description: "Telefon, WhatsApp oder Formular – kurz schildern, was ansteht.",
    image:
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1000",
    detail:
      "Sie erhalten direkt eine erste Orientierung, welche nächsten Schritte sinnvoll sind und welche Informationen wir für eine präzise Planung benötigen.",
  },
  {
    id: "02",
    title: "Check",
    description: "Wir klären Umfang, Timing und Wünsche in wenigen Fragen.",
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1000",
    detail:
      "Wir prüfen die Machbarkeit, priorisieren Maßnahmen und definieren gemeinsam den Rahmen. So entsteht von Anfang an ein realistisches Bild für Ihr Projekt.",
  },
  {
    id: "03",
    title: "Angebot",
    description: "Transparent, verständlich, auf Wunsch mit Varianten.",
    image:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1000",
    detail:
      "Sie bekommen ein klar strukturiertes Angebot mit nachvollziehbaren Positionen. Auf Wunsch zeigen wir Varianten für Budget, Material oder Ausbauumfang.",
  },
  {
    id: "04",
    title: "Umsetzung",
    description: "Sauber, termintreu, mit Updates und besenreiner Übergabe.",
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1000",
    detail:
      "Während der Ausführung halten wir Sie auf dem Laufenden. Das Ergebnis: eine saubere Umsetzung mit klaren Übergaben und einem verlässlichen Zeitrahmen.",
  },
];

export const PROJECTS = [
  {
    id: "P01",
    title: "Wohnraumerweiterung mit neuer Gartenseite",
    location: "Bremen-Schwachhausen",
    category: "Wohnraumerweiterung",
    image: PROJECT_IMAGE_SOURCES.project1InteriorAfter,
    imageAlt: "Fertiggestellter Wohn-Essbereich mit großer Glasfront zum Garten",
    summary:
      "Die Gartenfassade wurde geöffnet, mit einer neuen Schiebeanlage ausgestattet und im Innenraum zu einem hellen Wohn-Essbereich ausgebaut.",
    duration: "6 Wochen",
    highlights: [
      "Rueckbau der Bestandswand mit sauberer Vorbereitung der Oeffnung",
      "Neue Schiebeanlage zur Terrasse fuer mehr Licht und Weite",
      "Innenausbau mit klaren Oberflaechen und ruhiger Lichtfuehrung",
    ],
    beforeAfter: [
      {
        id: "P01-A",
        label: "Gartenfassade",
        before: PROJECT_IMAGE_SOURCES.project1ExteriorBefore,
        beforeAlt: "Gartenfassade waehrend des Rueckbaus vor dem Einbau der Schiebeanlage",
        after: PROJECT_IMAGE_SOURCES.project1ExteriorAfter,
        afterAlt: "Neue Gartenfassade mit grosser Schiebeanlage nach dem Umbau",
      },
      {
        id: "P01-B",
        label: "Wohn-Essbereich",
        before: PROJECT_IMAGE_SOURCES.project1InteriorBefore,
        beforeAlt: "Innenraum waehrend des Durchbruchs zur Gartenseite",
        after: PROJECT_IMAGE_SOURCES.project1InteriorAfter,
        afterAlt: "Fertiger Wohn-Essbereich mit offener Glasfront zum Garten",
      },
    ],
  },
  {
    id: "P02",
    title: "Dachgeschoss-Ausbau mit Galerie",
    location: "Bremen-Findorff",
    category: "Dachgeschoss-Ausbau",
    image: PROJECT_IMAGE_SOURCES.project2RoomAfter,
    imageAlt: "Heller Dachgeschossraum nach dem Ausbau mit neuer Galerie und Bodenbelag",
    summary:
      "Aus einem provisorischen Dachgeschossbereich entstand ein heller Wohnraum mit Galerieebene, neuer Treppe und abgestimmtem Bad.",
    duration: "5 Wochen",
    highlights: [
      "Neue Raumstruktur mit Galerieebene und klaren Laufwegen",
      "Boden, Oberflaechen und Treppenloesung aus einem Guss",
      "Wohnraum und Bad im Dachgeschoss abgestimmt modernisiert",
    ],
    beforeAfter: [
      {
        id: "P02-A",
        label: "Wohnraum",
        before: PROJECT_IMAGE_SOURCES.project2RoomBefore,
        beforeAlt: "Dachgeschossraum waehrend des Ausbaus vor dem Boden und Endfinish",
        after: PROJECT_IMAGE_SOURCES.project2RoomAfter,
        afterAlt: "Fertiger Dachgeschossraum mit neuer Galerie und Bodenbelag",
      },
      {
        id: "P02-B",
        label: "Galerie und Treppe",
        before: PROJECT_IMAGE_SOURCES.project2StairsBefore,
        beforeAlt: "Dachgeschoss mit offener Rohbausituation vor dem Einbau der Treppe",
        after: PROJECT_IMAGE_SOURCES.project2StairsAfter,
        afterAlt: "Fertige Galerie mit neuer Treppe im ausgebauten Dachgeschoss",
      },
    ],
  },
  {
    id: "P03",
    title: "Duschbad unter der Dachschraege",
    location: "Bremen-Neustadt",
    category: "Badmodernisierung",
    image: PROJECT_IMAGE_SOURCES.bath1After,
    imageAlt: "Fertiges Duschbad unter einer Dachschraege mit grauen Bodenfliesen",
    summary:
      "Aus dem rueckgebauten Bestand entstand ein helles Duschbad mit neuer Sanitärkeramik, klaren Flaechen und pflegeleichten Oberflaechen.",
    duration: "10 Tage",
    highlights: [
      "Kompletter Rueckbau des Altbestands",
      "Neue Dusche, WC und Waschplatz auf kompakter Flaeche",
      "Saubere Anpassung an die Dachschraege",
    ],
    beforeAfter: [
      {
        id: "P03-A",
        label: "Badumbau",
        before: PROJECT_IMAGE_SOURCES.bath1Before,
        beforeAlt: "Rueckgebautes Badezimmer vor der Modernisierung",
        after: PROJECT_IMAGE_SOURCES.bath1After,
        afterAlt: "Modernisiertes Duschbad nach Abschluss der Arbeiten",
      },
    ],
  },
  {
    id: "P04",
    title: "Kompaktbad mit Wandnische",
    location: "Delmenhorst-Deichhorst",
    category: "Badmodernisierung",
    image: PROJECT_IMAGE_SOURCES.bath2After,
    imageAlt: "Kleines Dachgeschossbad mit Duschkabine und integrierter Wandnische",
    summary:
      "Das kleine Dachgeschossbad wurde neu geordnet und mit Duschkabine, Wandnische und ruhigem Materialbild deutlich funktionaler umgesetzt.",
    duration: "8 Tage",
    highlights: [
      "Neuorganisation auf kleiner Grundflaeche",
      "Wandnische fuer Ablage und klare Linien",
      "Helle Fliesen kombiniert mit robustem Boden",
    ],
    beforeAfter: [
      {
        id: "P04-A",
        label: "Badumbau",
        before: PROJECT_IMAGE_SOURCES.bath2Before,
        beforeAlt: "Altes Dachgeschossbad waehrend der Entkernung",
        after: PROJECT_IMAGE_SOURCES.bath2After,
        afterAlt: "Neu aufgebautes Dachgeschossbad mit Duschkabine und Wandnische",
      },
    ],
  },
  {
    id: "P05",
    title: "Schmales Bestandsbad neu organisiert",
    location: "Lilienthal",
    category: "Sanierung im Bestand",
    image: PROJECT_IMAGE_SOURCES.bath3After,
    imageAlt: "Fertiges schmales Bad mit heller Gestaltung und Duschbereich",
    summary:
      "Ein sehr schmales Altbau-Bad wurde komplett erneuert und mit neuer Dusche, Spiegellicht und heller Oberflaeche deutlich aufgewertet.",
    duration: "7 Tage",
    highlights: [
      "Rueckbau und Neuordnung der Leitungsfuehrung",
      "Platzsparende Badloesung mit klarer Wegefuehrung",
      "Helle Oberflaechen fuer mehr Ruhe im schmalen Raum",
    ],
    beforeAfter: [
      {
        id: "P05-A",
        label: "Badumbau",
        before: PROJECT_IMAGE_SOURCES.bath3Before,
        beforeAlt: "Schmales Bestandsbad vor der Sanierung",
        after: PROJECT_IMAGE_SOURCES.bath3After,
        afterAlt: "Neu organisiertes schmales Bad nach der Sanierung",
      },
    ],
  },
];

export const BADGES = [
  "🛡️ Gewährleistung",
  "🏡 Wohnbereich-Fokus",
  "🌿 Garten- & Außenanlagen",
  "🏛️ KfW-Förderberatung",
  "📅 Termintreu",
  "🧹 Saubere Übergabe",
  "💬 Direkte Kommunikation",
  "📍 Bremen & Umgebung",
];

export const STATIC_SEO = {
  home: {
    title: "Renovierung & Innenausbau in Bremen | Teamwork Construction",
    metaDescription:
      "Teamwork Construction ist Ihr Partner für Renovierung, Sanierung, Innenausbau sowie Gartenarbeit und Sportanlagen in Bremen & Umgebung. Jetzt unverbindlich anfragen.",
  },
  kontakt: {
    title: "Kontakt & Anfrage in Bremen | Teamwork Construction",
    metaDescription:
      "Telefon, WhatsApp oder Formular: Kontaktieren Sie Teamwork Construction in Bremen & Umgebung. Schnelle Rückmeldung inklusive KfW-Förderberatung.",
  },
  leistungenHub: {
    title: "Leistungen in Bremen | Teamwork Construction",
    metaDescription:
      "Alle Leistungen im Überblick: Renovierung, Innenausbau, Trockenbau, Boden & Fliesen, Bad-Teilmodernisierung, Wasserschaden-Sanierung, Gartenarbeit und Sportanlagen.",
  },
  projekteHub: {
    title: "Projekte in Bremen & Umgebung | Teamwork Construction",
    metaDescription:
      "Referenzen aus Bremen & Umgebung mit echten Vorher-Nachher-Aufnahmen, klaren Ergebnissen und transparenter Umsetzung.",
  },
  ablaufHub: {
    title: "Ablauf vom Erstkontakt bis Umsetzung | Teamwork Construction",
    metaDescription:
      "So läuft Ihr Projekt ab: Anfrage, Check, transparentes Angebot und saubere Umsetzung mit klarer Kommunikation in Bremen & Umgebung.",
  },
};

export const SERVICE_SEO_PAGES = [
  {
    serviceId: "01",
    slug: "renovierung-modernisierung",
    title: "Renovierung & Modernisierung in Bremen | Teamwork Construction",
    metaDescription:
      "Renovierung und Modernisierung in Bremen & Umgebung: sauber, termintreu und transparent umgesetzt. Jetzt Angebot anfragen oder per WhatsApp starten.",
    headline: "Renovierung & Modernisierung in Bremen & Umgebung",
    intro:
      "Wir modernisieren Wohnbereiche strukturiert, sauber und mit klarer Abstimmung. Von der ersten Bestandsaufnahme bis zur Übergabe behalten Sie Termine, Leistungen und Kosten im Blick.",
    leadSentence: "Wir machen Renovierung & Modernisierung in Bremen & Umgebung.",
    usps: [
      "Saubere Arbeitsweise mit Schutz Ihrer Wohnbereiche",
      "Termintreue Ausführung mit festen Zeitfenstern",
      "Transparente Angebote und nachvollziehbare Positionen",
      "Direkte Abstimmung per Telefon, WhatsApp und vor Ort",
    ],
    process: [
      {
        title: "Bestand aufnehmen",
        text: "Wir schauen uns Räume, Oberflächen und gewünschte Änderungen direkt vor Ort an und definieren den sinnvollen Umfang.",
      },
      {
        title: "Leistung sauber planen",
        text: "Sie erhalten ein klares Angebot mit Material- und Ablaufempfehlung, damit Budget und Umsetzung von Anfang an realistisch sind.",
      },
      {
        title: "Renovierung umsetzen",
        text: "Wir arbeiten strukturiert, halten Sie auf dem Laufenden und übergeben die Fläche sauber und direkt nutzbar.",
      },
    ],
    references: [
      {
        title: "Wohnzimmer-Modernisierung",
        location: "Bremen-Schwachhausen",
        summary: "Neue Wandflächen, überarbeitete Lichtpunkte und ein ruhigeres Gesamtbild für den täglichen Wohnbetrieb.",
        image:
          "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Altbau-Update im Familienhaus",
        location: "Bremen-Horn",
        summary: "Mehr Licht, klarere Oberflächen und moderne Details ohne unnötig lange Bauphase.",
        image:
          "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Flur und Übergänge neu gedacht",
        location: "Delmenhorst",
        summary: "Abgestimmte Renovierung von Eingangsbereich und Verbindungszonen für einen stimmigen ersten Eindruck.",
        image:
          "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kostet eine Renovierung oder Modernisierung?",
        answer:
          "Das hängt vor allem von Fläche, Material und Eingriffstiefe ab. Nach dem Vor-Ort-Termin bekommen Sie ein transparentes Angebot mit klaren Positionen statt pauschaler Schätzwerte.",
      },
      {
        question: "Wie lange dauert die Umsetzung?",
        answer:
          "Kleinere Renovierungen dauern oft nur wenige Tage, größere Modernisierungen mehrere Wochen. Den realistischen Zeitrahmen stimmen wir vor Start sauber mit Ihnen ab.",
      },
      {
        question: "Wie läuft das Projekt organisatorisch ab?",
        answer:
          "Wir starten mit Bestandsaufnahme und Beratung, planen anschließend Ablauf und Materialien und setzen die Arbeiten dann in klaren Bauabschnitten um.",
      },
      {
        question: "Unterstützen Sie bei der Materialauswahl?",
        answer:
          "Ja. Wir helfen bei der Auswahl von Oberflächen, Farben und robusten Materialien, damit Optik, Nutzung und Budget zusammenpassen.",
      },
    ],
    relatedServiceIds: ["02", "04", "05"],
  },
  {
    serviceId: "02",
    slug: "innenausbau",
    title: "Innenausbau in Bremen | Teamwork Construction",
    metaDescription:
      "Innenausbau in Bremen & Umgebung: funktional, sauber und termintreu umgesetzt. Jetzt Innenausbau-Angebot anfragen oder per WhatsApp Kontakt aufnehmen.",
    headline: "Innenausbau in Bremen & Umgebung",
    intro:
      "Wir schaffen funktionale Innenräume, die zu Ihrem Alltag passen. Raumaufteilung, Materialeinsatz und Ausführung werden von Anfang an so geplant, dass Sie eine klare Linie und verlässliche Umsetzung bekommen.",
    leadSentence: "Wir machen Innenausbau in Bremen & Umgebung.",
    usps: [
      "Sauberer Ausbau auch in bewohnten Immobilien",
      "Terminsichere Koordination einzelner Ausbauphasen",
      "Transparente Abstimmung zu Materialien und Ausbauumfang",
      "Ein Ansprechpartner für Planung und Umsetzung",
    ],
    process: [
      {
        title: "Raumziel klären",
        text: "Wir definieren gemeinsam, wie der Raum künftig genutzt werden soll und welche Funktionen im Alltag wirklich wichtig sind.",
      },
      {
        title: "Ausbaukonzept festlegen",
        text: "Auf Basis der Nutzung planen wir sinnvolle Aufteilungen, Oberflächen und Anschlüsse mit klarem Angebotsrahmen.",
      },
      {
        title: "Innenausbau realisieren",
        text: "Wir setzen den Ausbau sauber und schrittweise um, damit Abläufe nachvollziehbar bleiben und die Übergabe direkt nutzbar ist.",
      },
    ],
    references: [
      {
        title: "Wohnküche neu gegliedert",
        location: "Bremen-Oberneuland",
        summary: "Mehr Struktur, bessere Laufwege und ein offenerer Wohnbereich mit sauber integrierten Anschlüssen.",
        image:
          "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Homeoffice im Bestand",
        location: "Lilienthal",
        summary: "Innenausbau für konzentriertes Arbeiten mit abgestimmten Flächen, Licht und Stauraum.",
        image:
          "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Familienbereich im Dachgeschoss",
        location: "Weyhe",
        summary: "Neue Raumlogik und klarer Ausbau für ein belastbares, wohnliches Obergeschoss.",
        image:
          "https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kostet Innenausbau pro Projekt?",
        answer:
          "Der Aufwand hängt stark von Grundriss, Gewerken und Materialwunsch ab. Wir kalkulieren auf Basis Ihres konkreten Ausbauziels und zeigen transparent, welche Positionen den Preis treiben.",
      },
      {
        question: "Wie lange dauert Innenausbau im Wohnbereich?",
        answer:
          "Das reicht von wenigen Tagen bei kleineren Anpassungen bis zu mehreren Wochen bei umfangreicher Neuaufteilung. Den Ablauf legen wir vor Start in realistischen Schritten fest.",
      },
      {
        question: "Wie läuft der Innenausbau mit Ihnen ab?",
        answer:
          "Wir starten mit Bedarf und Raumkonzept, stimmen dann Materialien und Bauabschnitte ab und setzen den Ausbau anschließend sauber und planbar um.",
      },
      {
        question: "Welche Materialien empfehlen Sie?",
        answer:
          "Wir empfehlen Materialien passend zu Nutzung, Pflegeaufwand und gewünschter Wirkung. Wichtig ist für uns nicht nur die Optik, sondern die Alltagstauglichkeit im Betrieb.",
      },
    ],
    relatedServiceIds: ["01", "03", "04"],
  },
  {
    serviceId: "03",
    slug: "trockenbau",
    title: "Trockenbau in Bremen | Teamwork Construction",
    metaDescription:
      "Trockenbau in Bremen & Umgebung für Wände, Decken und Raumaufteilung. Sauber, termintreu und transparent umgesetzt. Jetzt Angebot anfragen.",
    headline: "Trockenbau in Bremen & Umgebung",
    intro:
      "Trockenbau ist ideal, wenn Räume schnell, sauber und flexibel angepasst werden sollen. Wir setzen Wände, Decken und Abhängungen präzise um und halten Aufwand und Ablauf für Sie klar nachvollziehbar.",
    leadSentence: "Wir machen Trockenbau in Bremen & Umgebung.",
    usps: [
      "Saubere Ausführung auch im bewohnten Bestand",
      "Termintreue Montage mit klaren Bauabschnitten",
      "Transparente Planung für Raumaufteilung und Anschlüsse",
      "Flexible Lösungen bei späteren Anpassungen",
    ],
    process: [
      {
        title: "Aufteilung abstimmen",
        text: "Wir klären, welche Räume, Decken oder Trennwände entstehen sollen und welche technischen Anforderungen berücksichtigt werden müssen.",
      },
      {
        title: "Konstruktion planen",
        text: "Wir definieren Aufbau, Beplankung und Details zu Dämmung, Türen oder Installationen und übersetzen das in ein klares Angebot.",
      },
      {
        title: "Trockenbau montieren",
        text: "Die Umsetzung erfolgt zügig, sauber und mit laufender Abstimmung, damit neue Räume schnell nutzbar werden.",
      },
    ],
    references: [
      {
        title: "Neue Raumzonen im Dachgeschoss",
        location: "Delmenhorst",
        summary: "Trockenbau für zusätzliche Nutzfläche mit klaren Übergängen und sauberem Finish.",
        image:
          "https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Abgehängte Decke im Wohnbereich",
        location: "Bremen-Mitte",
        summary: "Ruhigere Leitungsführung und klareres Lichtbild durch präzise Deckenlösung.",
        image:
          "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Flexible Raumtrennung im Familienhaus",
        location: "Stuhr",
        summary: "Neue Wandstrukturen für Homeoffice, Stauraum und bessere Nutzbarkeit im Alltag.",
        image:
          "https://images.pexels.com/photos/7937214/pexels-photo-7937214.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kostet Trockenbau?",
        answer:
          "Kosten entstehen vor allem durch Fläche, Konstruktionsart, Beplankung und Zusatzleistungen wie Dämmung oder Türöffnungen. Sie erhalten von uns eine nachvollziehbare Kalkulation statt unklarer Pauschalen.",
      },
      {
        question: "Wie lange dauert ein Trockenbau-Projekt?",
        answer:
          "Viele kleinere Trockenbauarbeiten sind in wenigen Tagen umsetzbar, größere Umbauten dauern entsprechend länger. Den Ablauf legen wir vorab in realistischen Etappen fest.",
      },
      {
        question: "Wie läuft Trockenbau bei Ihnen ab?",
        answer:
          "Wir stimmen zuerst die neue Raumstruktur ab, planen anschließend Konstruktion und Details und setzen danach die Montage sauber und geordnet um.",
      },
      {
        question: "Welche Materialien kommen beim Trockenbau zum Einsatz?",
        answer:
          "Je nach Einsatzbereich wählen wir passende Profile, Platten und Dämmstoffe. Entscheidend sind Nutzung, Feuchtebereich, Schallschutz und gewünschte Oberflächenqualität.",
      },
    ],
    relatedServiceIds: ["02", "06", "01"],
  },
  {
    serviceId: "04",
    slug: "boden-fliesen",
    title: "Boden & Fliesen in Bremen | Teamwork Construction",
    metaDescription:
      "Boden- und Fliesenarbeiten in Bremen & Umgebung: präzise verlegt, sauber angeschlossen und transparent geplant. Jetzt Angebot oder WhatsApp anfragen.",
    headline: "Boden & Fliesen in Bremen & Umgebung",
    intro:
      "Boden- und Fliesenarbeiten prägen den Gesamteindruck eines Raumes. Wir verlegen präzise, achten auf saubere Übergänge und stimmen Material, Belastung und Optik konsequent aufeinander ab.",
    leadSentence: "Wir machen Boden- & Fliesenarbeiten in Bremen & Umgebung.",
    usps: [
      "Saubere Verlegung mit exakten Übergängen und Fugen",
      "Termintreue Umsetzung mit klarer Vorbereitung der Flächen",
      "Transparente Material- und Verlegeempfehlungen",
      "Robuste Lösungen für Alltag, Feuchte und Nutzung",
    ],
    process: [
      {
        title: "Untergrund prüfen",
        text: "Wir prüfen Ebenheit, Anschlüsse und Anforderungen der Fläche, damit der neue Belag dauerhaft sauber funktioniert.",
      },
      {
        title: "Belag und Verlegebild abstimmen",
        text: "Gemeinsam legen wir Material, Format, Verlegerichtung und Details an Übergängen oder Sockeln fest.",
      },
      {
        title: "Boden oder Fliesen verlegen",
        text: "Wir setzen die Fläche präzise um und achten auf ein sauberes Gesamtbild, das optisch und technisch belastbar ist.",
      },
    ],
    references: [
      {
        title: "Großformat-Fliesen im Bad",
        location: "Bremen-Horn",
        summary: "Klare Fugenbilder und saubere Anschlüsse für eine ruhige, hochwertige Badoptik.",
        image:
          "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Vinyl und Übergänge im Wohnbereich",
        location: "Bremen-Schwachhausen",
        summary: "Belastbarer Boden mit sauberer Linienführung in Wohn-, Ess- und Flurbereich.",
        image:
          "https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Eingangsbereich mit robuster Oberfläche",
        location: "Osterholz-Scharmbeck",
        summary: "Pflegeleichte Lösung für stark genutzte Flächen mit präzisem Randabschluss.",
        image:
          "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kosten Boden- oder Fliesenarbeiten?",
        answer:
          "Der Preis hängt von Belag, Fläche, Untergrund und Zuschnittaufwand ab. Wir kalkulieren transparent und zeigen, ob eher Material, Untergrund oder Verlegedetail den Aufwand bestimmen.",
      },
      {
        question: "Wie lange dauert die Verlegung?",
        answer:
          "Das richtet sich nach Fläche, Untergrund und Trocknungszeiten. Kleine Räume gehen oft zügig, komplexere Flächen oder mehrere Bereiche brauchen entsprechend mehr Zeit.",
      },
      {
        question: "Wie läuft das Projekt ab?",
        answer:
          "Wir prüfen zuerst den Untergrund, stimmen dann Material und Verlegebild mit Ihnen ab und setzen die Fläche anschließend sauber und in logischer Reihenfolge um.",
      },
      {
        question: "Welches Material ist für meinen Bereich sinnvoll?",
        answer:
          "Das hängt von Nutzung, Pflegeanspruch, Feuchtigkeit und gewünschter Optik ab. Wir beraten Sie so, dass Materialwahl und Alltag wirklich zusammenpassen.",
      },
    ],
    relatedServiceIds: ["05", "01", "02"],
  },
  {
    serviceId: "05",
    slug: "bad-teilmodernisierung",
    title: "Bad-Teilmodernisierung in Bremen | Teamwork Construction",
    metaDescription:
      "Bad-Teilmodernisierung in Bremen & Umgebung ohne Komplettumbau: effizient, sauber und transparent geplant. Jetzt Angebot oder WhatsApp anfragen.",
    headline: "Bad-Teilmodernisierung in Bremen & Umgebung",
    intro:
      "Nicht jedes Bad braucht eine Vollsanierung. Mit gezielten Maßnahmen verbessern wir Funktion, Optik und Alltagstauglichkeit spürbar und halten Umbauzeiten so kurz wie sinnvoll möglich.",
    leadSentence: "Wir machen Bad-Teilmodernisierung in Bremen & Umgebung.",
    usps: [
      "Saubere Umsetzung mit möglichst kurzer Ausfallzeit",
      "Termintreue Planung für bewohnte Immobilien",
      "Transparente Auswahl sinnvoller Einzelmaßnahmen",
      "Beratung zu Materialien, Komfort und Pflege",
    ],
    process: [
      {
        title: "Bedarf im Bad prüfen",
        text: "Wir schauen uns an, welche Bereiche wirklich modernisiert werden sollen und welche Maßnahmen den größten Effekt bringen.",
      },
      {
        title: "Umbaupaket abstimmen",
        text: "Gemeinsam priorisieren wir Oberflächen, Ausstattung und technische Punkte und übersetzen das in ein klares Angebotsbild.",
      },
      {
        title: "Bad modernisieren",
        text: "Wir setzen die abgestimmten Maßnahmen sauber und zügig um, damit Ihr Bad schnell wieder vollständig nutzbar ist.",
      },
    ],
    references: [
      {
        title: "Teilmodernisierung im Bestandsbad",
        location: "Bremen-Horn",
        summary: "Neue Flächen, bessere Aufteilung und ein frischerer Gesamteindruck ohne Komplettumbau.",
        image:
          "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Duschbereich funktional erneuert",
        location: "Lilienthal",
        summary: "Gezielte Modernisierung für mehr Komfort, bessere Pflege und saubere Anschlüsse.",
        image:
          "https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Optisches Update mit hoher Wirkung",
        location: "Stuhr",
        summary: "Kleine Eingriffe mit großem Effekt für ein helleres und moderneres Badbild.",
        image:
          "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kostet eine Bad-Teilmodernisierung?",
        answer:
          "Das hängt davon ab, welche Elemente erneuert werden und ob Leitungen, Untergründe oder Anschlüsse angepasst werden müssen. Wir kalkulieren nur die Maßnahmen, die für Ihr Ziel wirklich relevant sind.",
      },
      {
        question: "Wie lange ist das Bad während der Arbeiten eingeschränkt?",
        answer:
          "Bei Teilmodernisierungen bleiben Ausfallzeiten oft deutlich kürzer als bei einer Komplettsanierung. Den genauen Ablauf besprechen wir vorab anhand des tatsächlichen Umfangs.",
      },
      {
        question: "Wie läuft eine Teilmodernisierung ab?",
        answer:
          "Wir prüfen zuerst den Bestand, definieren dann die sinnvollen Maßnahmen und setzen diese anschließend in einem klar abgestimmten Ablaufpaket um.",
      },
      {
        question: "Welche Materialien empfehlen Sie im Bad?",
        answer:
          "Wir achten auf Feuchtebeständigkeit, Pflege, Optik und Alltagstauglichkeit. Gerade im Bad ist wichtig, dass Material nicht nur gut aussieht, sondern dauerhaft belastbar bleibt.",
      },
    ],
    relatedServiceIds: ["04", "01", "06"],
  },
  {
    serviceId: "06",
    slug: "wasserschaden-sanierung",
    title: "Wasserschaden-Sanierung in Bremen | Teamwork Construction",
    metaDescription:
      "Wasserschaden-Sanierung in Bremen & Umgebung: strukturierter Rückbau und Wiederaufbau, sauber und termintreu koordiniert. Jetzt Kontakt aufnehmen.",
    headline: "Wasserschaden-Sanierung in Bremen & Umgebung",
    intro:
      "Nach einem Wasserschaden zählt vor allem ein klarer Ablauf. Wir strukturieren Rückbau und Wiederaufbau so, dass Sie schnell wieder zu einer nutzbaren, sauberen Wohnsituation kommen.",
    leadSentence: "Wir machen Wasserschaden-Sanierung in Bremen & Umgebung.",
    usps: [
      "Sauberer Rückbau mit systematischer Wiederherstellung",
      "Termintreue Koordination der nächsten Schritte",
      "Transparente Kommunikation zum Schadensumfang",
      "Schnelle Wiederherstellung der Wohnqualität",
    ],
    process: [
      {
        title: "Schadensbild aufnehmen",
        text: "Wir prüfen betroffene Bereiche, priorisieren notwendige Maßnahmen und schaffen einen klaren Sanierungsrahmen.",
      },
      {
        title: "Rückbau und Vorbereitung",
        text: "Beschädigte Bauteile werden geordnet zurückgebaut und die Fläche für die Wiederherstellung vorbereitet.",
      },
      {
        title: "Wiederaufbau umsetzen",
        text: "Anschließend stellen wir Oberflächen und Nutzbarkeit Schritt für Schritt wieder her, bis die Räume sauber übergeben werden können.",
      },
    ],
    references: [
      {
        title: "Wiederaufbau nach Feuchteschaden",
        location: "Lilienthal",
        summary: "Strukturierter Rückbau und saubere Wiederherstellung bis zur wohnlichen Nutzung.",
        image:
          "https://images.pexels.com/photos/7937214/pexels-photo-7937214.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Sanierung von Wand- und Bodenflächen",
        location: "Weyhe",
        summary: "Klare Bauabschnitte und zügige Wiederherstellung nach lokalem Wasserschaden.",
        image:
          "https://images.pexels.com/photos/6474346/pexels-photo-6474346.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Rückbau im bewohnten Bestand",
        location: "Bremen-Mitte",
        summary: "Sorgfältiges Vorgehen, damit belastete Bereiche sicher und geordnet wieder nutzbar werden.",
        image:
          "https://images.pexels.com/photos/5691633/pexels-photo-5691633.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kostet eine Wasserschaden-Sanierung?",
        answer:
          "Das hängt vom Schadensbild, dem Rückbauumfang und den betroffenen Oberflächen ab. Nach Sichtung erhalten Sie eine klare Einschätzung zu Aufwand und den nächsten Schritten.",
      },
      {
        question: "Wie lange dauert die Sanierung nach Wasserschaden?",
        answer:
          "Die Dauer richtet sich nach Schadensausmaß und notwendiger Vorbereitung. Wir strukturieren die Maßnahmen so, dass Sie einen realistischen Zeitrahmen und nachvollziehbare Zwischenstände haben.",
      },
      {
        question: "Wie läuft die Sanierung konkret ab?",
        answer:
          "Wir starten mit Sichtung und Einordnung des Schadens, führen den erforderlichen Rückbau geordnet durch und stellen die betroffenen Flächen anschließend wieder her.",
      },
      {
        question: "Welche Materialien kommen beim Wiederaufbau zum Einsatz?",
        answer:
          "Das richtet sich nach Raumtyp, Untergrund und gewünschter Nutzung. Wir wählen Materialien so aus, dass sie technisch passen und im Alltag langfristig belastbar bleiben.",
      },
    ],
    relatedServiceIds: ["05", "03", "01"],
  },
  {
    serviceId: "07",
    slug: "gartenarbeit-sportanlagen",
    title: "Gartenarbeit & Sportanlagen in Bremen | Teamwork Construction",
    metaDescription:
      "Gartenarbeit und Sportanlagen in Bremen & Umgebung: funktional geplant, sauber umgesetzt und direkt aus einer Hand betreut.",
    headline: "Gartenarbeit & Sportanlagen in Bremen & Umgebung",
    intro:
      "Wir gestalten Außenbereiche funktional und alltagstauglich, von gepflegten Gartenflächen bis zur Montage von Outdoor-Fitness- und Sportelementen.",
    leadSentence: "Wir machen Gartenarbeit & Sportanlagen in Bremen & Umgebung.",
    usps: [
      "Saubere Aufwertung von Garten- und Außenflächen",
      "Termintreue Umsetzung mit klarer Abstimmung",
      "Transparente Planung für Nutzung und Pflege",
      "Funktionale Lösungen für private Außenbereiche",
    ],
    process: [
      {
        title: "Außenfläche aufnehmen",
        text: "Wir prüfen Bestand, Nutzung und gewünschte Funktion und definieren gemeinsam den passenden Leistungsrahmen.",
      },
      {
        title: "Maßnahmen abstimmen",
        text: "Wir planen Flächen, Einbauten und Pflegeaufwand nachvollziehbar und stimmen Material sowie Aufbau mit Ihnen ab.",
      },
      {
        title: "Außenbereich umsetzen",
        text: "Die Arbeiten erfolgen sauber und strukturiert, damit Garten- oder Trainingsflächen schnell genutzt werden können.",
      },
    ],
    references: [
      {
        title: "Gartenfläche neu strukturiert",
        location: "Bremen",
        summary: "Aufgeräumter Außenbereich mit pflegeleichterer Nutzung und klarerem Aufbau.",
        image:
          "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Outdoor-Trainingszone montiert",
        location: "Delmenhorst",
        summary: "Strukturierte Einrichtung einer robusten Außenfläche für Bewegung und Training.",
        image:
          "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=1200",
      },
      {
        title: "Außenbereich mit klaren Zonen",
        location: "Stuhr",
        summary: "Bessere Nutzbarkeit durch abgestimmte Flächen und saubere Umsetzung.",
        image:
          "https://images.pexels.com/photos/589/garden-grass-lawn-green.jpg?auto=compress&cs=tinysrgb&w=1200",
      },
    ],
    faq: [
      {
        question: "Was kosten Gartenarbeit oder Sportanlagen?",
        answer:
          "Das hängt von Fläche, Material, Aufbau und gewünschter Nutzung ab. Wir erstellen ein transparentes Angebot passend zum tatsächlichen Leistungsumfang.",
      },
      {
        question: "Wie lange dauert die Umsetzung außen?",
        answer:
          "Kleinere Maßnahmen gehen oft schnell, größere Außenarbeiten brauchen mehr Vorlauf und Aufbauzeit. Den Ablauf stimmen wir mit Ihnen realistisch ab.",
      },
      {
        question: "Wie läuft ein Projekt im Außenbereich ab?",
        answer:
          "Wir schauen uns Fläche und Ziel an, stimmen Maßnahmen und Materialien ab und setzen den Außenbereich anschließend geordnet und sauber um.",
      },
      {
        question: "Welche Materialien eignen sich draußen besonders gut?",
        answer:
          "Wir achten auf Witterung, Pflegeaufwand, Nutzung und Langlebigkeit. So entsteht eine Lösung, die nicht nur gut aussieht, sondern im Außenbereich belastbar bleibt.",
      },
    ],
    relatedServiceIds: ["01", "04", "02"],
  },
];

export const SERVICE_SEO_REDIRECTS = {
  "renovierung-modernisierung-bremen": "renovierung-modernisierung",
  "innenausbau-bremen": "innenausbau",
  "trockenbau-bremen": "trockenbau",
  "boden-fliesen-bremen": "boden-fliesen",
  "bad-teilmodernisierung-bremen": "bad-teilmodernisierung",
  "wasserschaden-sanierung-bremen": "wasserschaden-sanierung",
  "gartenarbeit-sportanlagen-bremen": "gartenarbeit-sportanlagen",
};

export const LOCATION_SEO_PAGES = [
  {
    slug: "bremen",
    locationName: "Bremen",
    title: "Bauunternehmen in Bremen | Teamwork Construction",
    metaDescription:
      "Teamwork Construction in Bremen: Renovierung, Innenausbau, Sanierung, Gartenarbeit und Sportanlagen mit klaren Abläufen und festen Ansprechpartnern.",
    headline: "Bauunternehmen in Bremen",
    intro:
      "Für Projekte in Bremen bieten wir Renovierung, Innenausbau, Sanierung und Außenanlagen aus einer Hand inklusive direkter Abstimmung.",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "delmenhorst",
    locationName: "Delmenhorst",
    title: "Bauunternehmen in Delmenhorst | Teamwork Construction",
    metaDescription:
      "Leistungen in Delmenhorst: Renovierung, Trockenbau, Bad-Teilmodernisierung und Sanierung nach Wasserschaden inkl. KfW-Förderberatung.",
    headline: "Bauunternehmen in Delmenhorst",
    intro:
      "In Delmenhorst begleiten wir Modernisierungen und Sanierungen mit klarer Planung, termintreuer Ausführung und transparenter Kommunikation.",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "lilienthal",
    locationName: "Lilienthal",
    title: "Bauunternehmen in Lilienthal | Teamwork Construction",
    metaDescription:
      "Teamwork Construction für Lilienthal: Innenausbau, Modernisierung, Boden- und Fliesenarbeiten sowie Außenbereiche mit sauberer Umsetzung.",
    headline: "Bauunternehmen in Lilienthal",
    intro:
      "Wir setzen Projekte in Lilienthal sauber und strukturiert um, von Wohnraummodernisierung bis Außenbereich und Gartenarbeit.",
    image:
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "osterholz-scharmbeck",
    locationName: "Osterholz-Scharmbeck",
    title: "Bauunternehmen in Osterholz-Scharmbeck | Teamwork",
    metaDescription:
      "Renovierung und Sanierung in Osterholz-Scharmbeck: verlässliche Ausführung, transparente Angebote und direkte Kommunikation.",
    headline: "Bauunternehmen in Osterholz-Scharmbeck",
    intro:
      "In Osterholz-Scharmbeck liefern wir Renovierung und Sanierung mit nachvollziehbaren Angeboten und sauberer Übergabe.",
    image:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "stuhr",
    locationName: "Stuhr",
    title: "Bauunternehmen in Stuhr | Teamwork Construction",
    metaDescription:
      "Bau- und Sanierungsleistungen in Stuhr: von Innenausbau bis Gartenarbeit, termintreu umgesetzt und auf Wunsch nach KfW-Vorgaben geplant.",
    headline: "Bauunternehmen in Stuhr",
    intro:
      "Für Stuhr realisieren wir Bau- und Sanierungsleistungen mit klarer Terminstruktur, direkter Abstimmung und KfW-orientierter Planung.",
    image:
      "https://images.pexels.com/photos/7512035/pexels-photo-7512035.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "weyhe",
    locationName: "Weyhe",
    title: "Bauunternehmen in Weyhe | Teamwork Construction",
    metaDescription:
      "Teamwork Construction in Weyhe: Modernisierung, Wasserschaden-Sanierung, Sportanlagen und Außenarbeiten mit schneller Rückmeldung.",
    headline: "Bauunternehmen in Weyhe",
    intro:
      "In Weyhe begleiten wir Wohn- und Außenprojekte zuverlässig vom Erstkontakt bis zur besenreinen Übergabe.",
    image:
      "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const SERVICE_SEO_BY_SLUG = Object.fromEntries(
  SERVICE_SEO_PAGES.map((item) => [item.slug, item])
);
export const SERVICE_SEO_BY_ID = Object.fromEntries(
  SERVICE_SEO_PAGES.map((item) => [item.serviceId, item])
);
export const LOCATION_SEO_BY_SLUG = Object.fromEntries(
  LOCATION_SEO_PAGES.map((item) => [item.slug, item])
);
export const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((item) => [item.id, item]));

export const CONTACT_TRUST_POINTS = [
  "Rückmeldung werktags in 24–48h",
  "Unverbindliche Erstberatung",
  "Arbeiten nach KfW-Vorgaben",
];

export const CONTACT_FAQ = [
  {
    question: "Wie schnell bekomme ich eine Rückmeldung?",
    answer:
      "In der Regel melden wir uns werktags innerhalb von 24–48 Stunden mit einem klaren nächsten Schritt.",
  },
  {
    question: "Kann ich auch nur eine Teilmodernisierung anfragen?",
    answer:
      "Ja. Viele Projekte starten mit gezielten Maßnahmen, z. B. Bad-Teilmodernisierung oder einzelnen Ausbauabschnitten.",
  },
  {
    question: "Unterstützen Sie bei KfW-relevanten Projekten?",
    answer:
      "Ja. Wir bieten KfW-Förderberatung und planen die Ausführung nach KfW-Vorgaben, ohne Förderbewilligungen zu versprechen.",
  },
  {
    question: "Was soll ich für die Erstanfrage vorbereiten?",
    answer:
      "Ein kurzer Überblick reicht: gewünschte Leistung, Ort und Zeitrahmen. Fotos können Sie gern direkt per WhatsApp senden.",
  },
];

export const HEADER_LINKS = [
  { to: "/leistungen", label: "Leistungen" },
  { to: "/projekte", label: "Projekte" },
  { to: "/ablauf", label: "Ablauf" },
  { to: "/kontakt", label: "Kontakt" },
];

export const FOOTER_LINKS = [
  { to: "/impressum", label: "Impressum" },
  { to: "/datenschutz", label: "Datenschutz" },
  { to: "/agb", label: "AGB" },
];

export const LEGAL_CONTENT = {
  impressum: {
    title: "Impressum",
    subtitle: "Pflichtangaben nach § 5 DDG",
    metaDescription:
      "Impressum von Teamwork Construction mit Anbieterangaben, Kontaktwegen und offiziellen Registerdaten.",
    intro:
      "Die nachfolgenden Angaben gelten für diese Website und die darüber angebotenen Bau-, Ausbau-, Renovierungs- und Sanierungsleistungen in Bremen & Umgebung.",
    sections: [
      {
        heading: "Anbieterin",
        paragraphs: [
          `${LEGAL_PROFILE.legalName} ist die Anbieterin dieser Website. Die Gesellschaft ist in Polen eingetragen und tritt in Deutschland über ihre Niederlassung bzw. Geschäftsadresse in Bremen auf.`,
        ],
      },
      {
        heading: "Deutsche Niederlassung / Geschäftsadresse",
        list: LEGAL_PROFILE.branchAddressLines,
      },
      {
        heading: "Vertretung",
        paragraphs: [`Vertreten durch ${LEGAL_PROFILE.representative}.`],
      },
      {
        heading: "Register- und Steuerangaben",
        list: [
          `${LEGAL_PROFILE.registerName}: ${LEGAL_PROFILE.registerNumber}`,
          `Sitz der Gesellschaft: ${LEGAL_PROFILE.registeredOffice}`,
          `Polnische Steueridentifikationsnummer (NIP): ${LEGAL_PROFILE.taxNumber}`,
          `REGON: ${LEGAL_PROFILE.regon}`,
        ],
      },
      {
        heading: "Kontakt",
        list: [
          `Telefon: ${PHONE_DISPLAY}`,
          `E-Mail: ${EMAIL}`,
          `WhatsApp: ${WHATSAPP_DISPLAY}`,
        ],
      },
      {
        heading: "Verantwortlich für Inhalte",
        paragraphs: [`Verantwortlich für den Inhalt dieser Website ist ${LEGAL_PROFILE.representative}, Anschrift wie oben.`],
      },
      {
        heading: "Verbraucherstreitbeilegung",
        paragraphs: [
          "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
      {
        heading: "Haftung für Inhalte und Links",
        paragraphs: [
          "Die Inhalte dieser Website wurden mit der gebotenen Sorgfalt erstellt. Eine Gewähr für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir jedoch nur im Rahmen der gesetzlichen Vorschriften.",
          "Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar.",
        ],
      },
    ],
  },
  datenschutz: {
    title: "Datenschutz",
    subtitle: "Hinweise zur Verarbeitung personenbezogener Daten",
    metaDescription:
      "Datenschutzhinweise von Teamwork Construction zu Hosting, Kontaktformular, WhatsApp und eingesetzten Dienstleistern.",
    intro:
      "Nachfolgend informieren wir Sie darüber, welche personenbezogenen Daten beim Besuch dieser Website und bei einer Kontaktaufnahme verarbeitet werden.",
    sections: [
      {
        heading: "Verantwortlicher",
        paragraphs: [
          `Verantwortlich für die Datenverarbeitung auf dieser Website ist ${LEGAL_PROFILE.legalName}.`,
          `Telefon: ${PHONE_DISPLAY} · E-Mail: ${EMAIL}. Die Postanschrift der deutschen Niederlassung finden Sie im Impressum.`,
        ],
      },
      {
        heading: "Hosting und technische Zugriffsdaten",
        paragraphs: [
          "Beim Aufruf der Website werden technisch erforderliche Verbindungsdaten verarbeitet. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte Seite, Referrer, Browsertyp und Betriebssystem gehören.",
          "Das Frontend wird über GitHub Pages bereitgestellt. Ergänzende technische Infrastruktur, DNS- und Sicherheitsfunktionen sowie Kontaktendpunkte können über Cloudflare verarbeitet werden.",
          "Die Verarbeitung erfolgt zur sicheren und stabilen Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.",
        ],
      },
      {
        heading: "Kontaktformular",
        paragraphs: [
          "Wenn Sie das Kontaktformular nutzen, verarbeiten wir die von Ihnen eingegebenen Angaben, insbesondere Name, Telefonnummer, E-Mail-Adresse, gewünschte Leistung, Ort beziehungsweise PLZ, Nachricht und optionale Angaben zur KfW-Förderberatung.",
          "Die Verarbeitung erfolgt zur Bearbeitung Ihrer Anfrage und zur Durchführung vorvertraglicher Maßnahmen nach Art. 6 Abs. 1 lit. b DSGVO; bei allgemeinen Anfragen beruht sie ergänzend auf Art. 6 Abs. 1 lit. f DSGVO.",
        ],
      },
      {
        heading: "E-Mail-Versand über Cloudflare Worker und Resend",
        paragraphs: [
          "Formularanfragen werden über einen Cloudflare Worker entgegengenommen und anschließend über den Dienst Resend als E-Mail an uns zugestellt. Diese Dienstleister erhalten die für Transport, Spam-Schutz und Zustellung erforderlichen Daten.",
          "Soweit dabei eine Verarbeitung außerhalb der EU beziehungsweise des EWR stattfindet, erfolgt sie nur auf Grundlage geeigneter Garantien des jeweiligen Anbieters oder eines einschlägigen Angemessenheitsbeschlusses, soweit anwendbar.",
        ],
      },
      {
        heading: "Telefon, E-Mail und WhatsApp",
        paragraphs: [
          "Wenn Sie uns per Telefon, E-Mail oder WhatsApp kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten zur Bearbeitung Ihrer Anfrage und zur weiteren Projektabstimmung.",
          "Beim Anklicken des WhatsApp-Links verlassen Sie diese Website und nutzen einen Dienst von WhatsApp beziehungsweise Meta. Für die dortige Datenverarbeitung gelten die Datenschutzbestimmungen des jeweiligen Anbieters.",
        ],
      },
      {
        heading: "Extern eingebundene Medien",
        paragraphs: [
          "Bildmaterial von externen Quellen wie Pexels und Unsplash wird erst nach Ihrer ausdrücklichen Einwilligung geladen. Erst dann kann es zu einer Übermittlung Ihrer IP-Adresse und technischer Verbindungsdaten an diese Anbieter kommen.",
          "Rechtsgrundlage für das Laden dieser externen Medien ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.",
        ],
      },
      {
        heading: "Cookies und ähnliche Technologien",
        paragraphs: [
          "Nach aktuellem Stand setzen wir keine eigenen Analyse- oder Marketing-Cookies ein.",
          "Um Ihre Auswahl zu externen Medien zu speichern, verwenden wir eine technisch erforderliche lokale Speicherung in Ihrem Browser. Diese Einstellung können Sie jederzeit erneut über die Cookie-Einstellungen auf der Website anpassen.",
          "Technisch bedingte Speicherungen durch Browser, Hosting- oder Sicherheitsdienste können dennoch stattfinden, soweit dies für den Betrieb der Website erforderlich ist.",
        ],
      },
      {
        heading: "Empfänger",
        list: [
          "GitHub Pages für das Hosting des Frontends",
          "Cloudflare für DNS-, Sicherheits- und Worker-Infrastruktur",
          "Resend für den Versand von Formularbenachrichtigungen",
          "Pexels und Unsplash nur nach erteilter Einwilligung für externe Medien",
          "WhatsApp beziehungsweise Meta nur, wenn Sie den WhatsApp-Kontakt aktiv nutzen",
        ],
      },
      {
        heading: "Speicherdauer",
        paragraphs: [
          "Anfrage- und Kommunikationsdaten speichern wir nur so lange, wie dies für die Bearbeitung Ihrer Anfrage, die Anschlusskommunikation und gesetzliche Aufbewahrungspflichten erforderlich ist.",
          "Soweit keine gesetzlichen Pflichten oder berechtigten Interessen entgegenstehen, löschen oder anonymisieren wir Daten nach Wegfall des Verarbeitungszwecks.",
        ],
      },
      {
        heading: "Ihre Rechte",
        list: [
          "Auskunft über die zu Ihrer Person gespeicherten Daten",
          "Berichtigung unrichtiger oder unvollständiger Daten",
          "Löschung Ihrer Daten im Rahmen von Art. 17 DSGVO",
          "Einschränkung der Verarbeitung",
          "Widerspruch gegen Datenverarbeitungen auf Grundlage berechtigter Interessen",
          "Datenübertragbarkeit, soweit die gesetzlichen Voraussetzungen vorliegen",
        ],
      },
      {
        heading: "Beschwerderecht",
        paragraphs: [
          "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.",
        ],
      },
      {
        heading: "Stand",
        paragraphs: ["Stand dieser Datenschutzhinweise: April 2026."],
      },
    ],
  },
  agb: {
    title: "AGB",
    subtitle: "Allgemeine Geschäftsbedingungen für Leistungen von Teamwork Construction",
    metaDescription:
      "AGB von Teamwork Construction für Bau-, Ausbau-, Renovierungs- und Sanierungsleistungen für Privat- und Geschäftskunden.",
    intro:
      "Die nachfolgenden Bedingungen gelten für Verträge über Bau-, Ausbau-, Renovierungs-, Modernisierungs- und Sanierungsleistungen mit Privatkunden und Unternehmen, soweit nicht im Einzelfall etwas anderes schriftlich vereinbart wird.",
    sections: [
      {
        heading: "1. Geltungsbereich",
        paragraphs: [
          "Diese AGB gelten gegenüber Verbrauchern und Unternehmern. Verbraucherschützende Vorschriften bleiben unberührt.",
          "Individuelle Angebote, Leistungsbeschreibungen, Nachträge und Auftragsbestätigungen gehen diesen AGB vor, soweit sie abweichende Regelungen enthalten.",
        ],
      },
      {
        heading: "2. Kein Vertragsschluss über die Website",
        paragraphs: [
          "Die Website dient ausschließlich der Information und Kontaktaufnahme. Über die Website selbst kommt kein Vertrag zustande.",
          "Ein Vertrag kommt erst durch unsere schriftliche Auftragsbestätigung, eine ausdrückliche Annahmeerklärung oder den Beginn der Ausführung zustande.",
        ],
      },
      {
        heading: "3. Angebote und Aufwandspauschalen",
        paragraphs: [
          "Standardanfragen, Vor-Ort-Termine und einfache Angebote sind grundsätzlich unverbindlich, soweit nicht ausdrücklich etwas anderes erklärt wird.",
          "Für umfangreiche, mehrstündige oder planerisch besonders aufwendige Angebotserstellungen können wir vorab eine gesonderte Aufwandspauschale vereinbaren. Eine solche Pauschale fällt nur an, wenn sie vor Beginn der Angebotserstellung ausdrücklich angekündigt und vom Kunden bestätigt wurde.",
        ],
      },
      {
        heading: "4. Leistungsumfang und Mehrleistungen",
        paragraphs: [
          "Der konkrete Leistungsumfang ergibt sich aus dem Angebot, dem Leistungsverzeichnis und der Auftragsbestätigung.",
          "Werden während der Arbeiten zusätzliche oder verdeckte Umstände erkennbar, die bei Besichtigung, Aufmaß oder üblicher Prüfung nicht zuverlässig erkennbar waren, können hieraus Mehrleistungen, zusätzlicher Materialbedarf und Terminverschiebungen folgen.",
          "Wir informieren den Kunden darüber unverzüglich. Zusätzliche Vergütung fällt nur für tatsächlich erforderliche und freigegebene Zusatzleistungen an; unaufschiebbare Sicherungsmaßnahmen bleiben hiervon unberührt.",
        ],
      },
      {
        heading: "5. Preise, Anzahlung und Abschlagszahlungen",
        list: [
          "Wir können vor Ausführungsbeginn eine angemessene Anzahlung verlangen, insbesondere für Materialbestellungen, Projektvorbereitung oder reservierte Kapazitäten.",
          "Bei größeren Projekten können Abschlagsrechnungen nach Baufortschritt oder nach abgeschlossenen Projektabschnitten gestellt werden.",
          "Rechnungen sind, soweit nichts anderes vereinbart wurde, innerhalb von 7 Kalendertagen ab Zugang ohne Abzug fällig.",
          "Zahlungen können bar, per Karte oder per Überweisung erfolgen.",
          "Anfahrtskosten werden nur berechnet, wenn dies ausdrücklich vereinbart wurde.",
        ],
      },
      {
        heading: "6. Termine und Ausführung",
        paragraphs: [
          "Angegebene Ausführungs- und Fertigstellungstermine sind nur verbindlich, wenn sie ausdrücklich als verbindlich bestätigt wurden.",
          "Witterung, Lieferengpässe, fehlende Mitwirkung des Kunden, behördliche Vorgaben oder nicht erkennbare Befunde in der Bausubstanz können Termine angemessen verschieben.",
        ],
      },
      {
        heading: "7. Mitwirkung des Kunden",
        list: [
          "Der Kunde sorgt für Zugang zu den Arbeitsbereichen und für erforderliche Freigaben.",
          "Bekannte Leitungen, Vorschäden, Besonderheiten der Bausubstanz oder sonstige Risiken sind vor Arbeitsbeginn mitzuteilen.",
          "Vom Kunden bereitgestellte Materialien, Maße, Pläne oder Vorleistungen Dritter müssen für die beauftragte Leistung geeignet sein.",
        ],
      },
      {
        heading: "8. Material",
        paragraphs: [
          "Sofern nichts anderes vereinbart ist, beschaffen wir das für die Leistung erforderliche Material.",
          "Vom Kunden gewünschtes oder bereitgestelltes Material verarbeiten wir nur nach gesonderter Abstimmung. Für Verzögerungen, Mängel oder Folgeschäden, die auf kundenseitig bereitgestelltes Material zurückgehen, gelten die gesetzlichen Regeln; eine Haftung für dessen Eignung übernehmen wir nur bei ausdrücklicher schriftlicher Zusage.",
        ],
      },
      {
        heading: "9. Abnahme",
        paragraphs: [
          "Nach Fertigstellung hat der Kunde die Leistung zeitnah abzunehmen, soweit die Leistung im Wesentlichen vertragsgemäß erbracht wurde.",
          "Wesentliche Teilabschnitte können gesondert abgenommen werden, wenn dies nach Art und Umfang der Arbeiten sachgerecht ist.",
        ],
      },
      {
        heading: "10. Gewährleistung",
        paragraphs: ["Es gelten die gesetzlichen Mängelrechte."],
      },
      {
        heading: "11. Haftung",
        paragraphs: [
          "Wir haften unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit.",
          "Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten haften wir nur auf den vertragstypischen, vorhersehbaren Schaden. Die Haftung nach zwingenden gesetzlichen Vorschriften bleibt unberührt.",
        ],
      },
      {
        heading: "12. Schlussbestimmungen",
        paragraphs: [
          "Gesetzliche Verbraucherrechte, insbesondere bei außerhalb von Geschäftsräumen geschlossenen Verträgen, bleiben unberührt.",
          "Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Regelungen unberührt.",
          "Individuelle Vereinbarungen in Angebot, Nachtrag oder Auftragsbestätigung gehen diesen AGB vor.",
        ],
      },
    ],
  },
};
