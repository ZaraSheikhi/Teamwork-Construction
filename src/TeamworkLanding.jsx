import { useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  HashRouter,
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

const COMPANY_NAME = "Teamwork Construktion";
const REGION = "Bremen & Umgebung";
const LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`;

const PHONE_DISPLAY = "+49 174 4257898";
const PHONE_TEL = "tel:+491744257898";
const WHATSAPP_DISPLAY = "+49 174 4257898";
const WHATSAPP_LINK = "https://wa.me/491744257898";
const EMAIL = "kontakt@teamwork-construktion.de";
const QUERY_PARAMS = {
  service: "leistung",
  location: "ort",
  source: "quelle",
};

const IMAGE_SOURCES = {
  homeHero:
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  homeStory:
    "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600",
  leistungenHero:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  projekteHero:
    "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ablaufHero:
    "https://images.pexels.com/photos/7512035/pexels-photo-7512035.jpeg?auto=compress&cs=tinysrgb&w=1600",
  kontaktHero:
    "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600",
  legalHero:
    "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

const KPIS = [
  { value: "120+", label: "Projekte begleitet" },
  { value: "24-48h", label: "Rückmeldung werktags" },
  { value: "4.9/5", label: "Kundenzufriedenheit" },
];

const SERVICES = [
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
    points: ["Strukturierter Ablauf nach Schadensbild", "Schnelle Wiederherstellung von Wohnqualität"],
    text:
      "Nach einem Wasserschaden zählt vor allem Tempo mit System. Wir übernehmen Rückbau, Trocknungsbegleitung und Wiederaufbau in klaren Schritten.",
  },
  {
    id: "07",
    title: "Gartenarbeit & Sportanlagen",
    description: "Außenbereiche funktional und sauber umgesetzt – von Gartenflächen bis Trainingszonen.",
    image:
      "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?auto=format&fit=crop&w=1200&q=80",
    points: ["Pflege und Aufwertung von Garten- und Außenflächen", "Montage von Outdoor-Fitness- und Sportelementen"],
    text:
      "Wir gestalten und modernisieren Außenbereiche, die alltagstauglich und langlebig sind. Ob Gartenarbeit, Sportstationen oder kombinierte Flächen: Planung und Umsetzung erfolgen strukturiert aus einer Hand.",
  },
];

const STEPS = [
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

const PROJECTS = [
  {
    id: "P01",
    title: "Wohnzimmer-Update",
    location: "Bremen-Schwachhausen",
    image:
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary:
      "Neue Wandgestaltung, Lichtkonzept und Bodenanpassung für ein ruhiges, helles Wohngefühl.",
    duration: "2 Wochen",
  },
  {
    id: "P02",
    title: "Bad refresh",
    location: "Bremen-Horn",
    image:
      "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary:
      "Teilmodernisierung mit neuen Fliesenflächen und optimierter Aufteilung für mehr Komfort.",
    duration: "9 Tage",
  },
  {
    id: "P03",
    title: "Küchenumbau",
    location: "Bremen-Oberneuland",
    image:
      "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary:
      "Anpassung von Anschlüssen, Wandflächen und Boden für eine moderne offene Küche.",
    duration: "3 Wochen",
  },
  {
    id: "P04",
    title: "Flur & Treppe",
    location: "Bremen-Mitte",
    image:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary:
      "Robuste Oberflächen und klare Lichtführung für einen einladenden Eingangsbereich.",
    duration: "8 Tage",
  },
  {
    id: "P05",
    title: "Trockenbau DG",
    location: "Delmenhorst",
    image:
      "https://images.pexels.com/photos/6474475/pexels-photo-6474475.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary:
      "Neue Raumzonen im Dachgeschoss inklusive Dämmoptimierung und sauberem Finish.",
    duration: "2.5 Wochen",
  },
  {
    id: "P06",
    title: "Wasserschaden-Sanierung",
    location: "Lilienthal",
    image:
      "https://images.pexels.com/photos/7937214/pexels-photo-7937214.jpeg?auto=compress&cs=tinysrgb&w=1200",
    summary:
      "Strukturierter Rückbau und Wiederaufbau bis zur vollständig wohnlichen Nutzung.",
    duration: "3 Wochen",
  },
];

const BADGES = [
  "🛡️ Gewährleistung",
  "🏡 Wohnbereich-Fokus",
  "🌿 Garten- & Außenanlagen",
  "🏛️ KfW-Förderberatung",
  "📅 Termintreu",
  "🧹 Saubere Übergabe",
  "💬 Direkte Kommunikation",
  "📍 Bremen & Umgebung",
];

const STATIC_SEO = {
  home: {
    title: "Renovierung & Innenausbau in Bremen | Teamwork Construktion",
    metaDescription:
      "Teamwork Construktion ist Ihr Partner für Renovierung, Sanierung, Innenausbau sowie Gartenarbeit und Sportanlagen in Bremen & Umgebung. Jetzt unverbindlich anfragen.",
  },
  kontakt: {
    title: "Kontakt & Anfrage in Bremen | Teamwork Construktion",
    metaDescription:
      "Telefon, WhatsApp oder Formular: Kontaktieren Sie Teamwork Construktion in Bremen & Umgebung. Schnelle Rückmeldung inklusive KfW-Förderberatung.",
  },
  leistungenHub: {
    title: "Leistungen in Bremen | Teamwork Construktion",
    metaDescription:
      "Alle Leistungen im Überblick: Renovierung, Innenausbau, Trockenbau, Boden & Fliesen, Bad-Teilmodernisierung, Wasserschaden-Sanierung, Gartenarbeit und Sportanlagen.",
  },
  projekteHub: {
    title: "Projekte in Bremen & Umgebung | Teamwork Construktion",
    metaDescription:
      "Referenzen aus Bremen & Umgebung: echte Projekte mit klaren Ergebnissen, transparenter Umsetzung und termintreuer Übergabe.",
  },
  ablaufHub: {
    title: "Ablauf vom Erstkontakt bis Umsetzung | Teamwork Construktion",
    metaDescription:
      "So läuft Ihr Projekt ab: Anfrage, Check, transparentes Angebot und saubere Umsetzung mit klarer Kommunikation in Bremen & Umgebung.",
  },
};

const SERVICE_SEO_PAGES = [
  {
    serviceId: "01",
    slug: "renovierung-modernisierung-bremen",
    title: "Renovierung in Bremen | Teamwork Construktion",
    metaDescription:
      "Renovierung und Modernisierung in Bremen: sauber, termintreu und planbar. Auf Wunsch mit KfW-Förderberatung und Arbeiten nach KfW-Vorgaben.",
    headline: "Renovierung & Modernisierung in Bremen",
    intro:
      "Wir modernisieren Wohnbereiche in Bremen strukturiert und alltagstauglich. Planung, Ausführung und KfW-Förderberatung greifen sinnvoll ineinander.",
  },
  {
    serviceId: "02",
    slug: "innenausbau-bremen",
    title: "Innenausbau in Bremen | Teamwork Construktion",
    metaDescription:
      "Innenausbau in Bremen vom Konzept bis zur Ausführung: funktional, hochwertig und zuverlässig. Teamwork Construktion für private Wohnprojekte.",
    headline: "Innenausbau in Bremen",
    intro:
      "Vom Raumkonzept bis zur fertigen Umsetzung: Wir realisieren Innenausbau-Projekte in Bremen mit klaren Abläufen und festen Ansprechpartnern.",
  },
  {
    serviceId: "03",
    slug: "trockenbau-bremen",
    title: "Trockenbau in Bremen | Teamwork Construktion",
    metaDescription:
      "Trockenbau in Bremen für Wände, Decken und Raumaufteilungen. Saubere Ausführung, klare Zeitplanung und flexible Lösungen für Ihr Projekt.",
    headline: "Trockenbau in Bremen",
    intro:
      "Für neue Raumaufteilungen und effiziente Umbauten setzen wir Trockenbau in Bremen präzise, sauber und termintreu um.",
  },
  {
    serviceId: "04",
    slug: "boden-fliesen-bremen",
    title: "Boden & Fliesen in Bremen | Teamwork Construktion",
    metaDescription:
      "Boden- und Fliesenarbeiten in Bremen: präzise Verlegung, saubere Anschlüsse und langlebige Ergebnisse für Innenbereiche und Modernisierung.",
    headline: "Boden & Fliesen in Bremen",
    intro:
      "Wir verlegen Böden und Fliesen in Bremen mit hoher Präzision und robustem Finish für langfristig belastbare Wohnbereiche.",
  },
  {
    serviceId: "05",
    slug: "bad-teilmodernisierung-bremen",
    title: "Bad-Teilmodernisierung in Bremen | Teamwork Construktion",
    metaDescription:
      "Bad-Teilmodernisierung in Bremen ohne Komplettumbau: effiziente Updates, kurze Umbauzeiten und Unterstützung bei förderrelevanten Maßnahmen.",
    headline: "Bad-Teilmodernisierung in Bremen",
    intro:
      "Gezielte Modernisierungen bringen Ihr Bad schnell auf den aktuellen Stand. Wir planen die passenden Maßnahmen für Bremen und Umgebung.",
  },
  {
    serviceId: "06",
    slug: "wasserschaden-sanierung-bremen",
    title: "Wasserschaden-Sanierung in Bremen | Teamwork Construktion",
    metaDescription:
      "Sanierung nach Wasserschaden in Bremen: strukturierter Rückbau und Wiederaufbau bis zur wohnlichen Übergabe. Schnell, sauber und zuverlässig.",
    headline: "Wasserschaden-Sanierung in Bremen",
    intro:
      "Nach einem Wasserschaden zählt ein klarer Ablauf. Wir übernehmen Rückbau, Wiederaufbau und die koordinierte Umsetzung bis zur Übergabe.",
  },
  {
    serviceId: "07",
    slug: "gartenarbeit-sportanlagen-bremen",
    title: "Gartenarbeit & Sportanlagen in Bremen | Teamwork Construktion",
    metaDescription:
      "Gartenarbeit und Sportanlagen in Bremen: Aufwertung von Außenflächen und Montage von Outdoor-Fitness-Elementen aus einer Hand.",
    headline: "Gartenarbeit & Sportanlagen in Bremen",
    intro:
      "Wir gestalten Außenbereiche in Bremen funktional und langlebig, von Gartenflächen bis zur Montage von Sport- und Outdoor-Fitness-Elementen.",
  },
];

const LOCATION_SEO_PAGES = [
  {
    slug: "bremen",
    locationName: "Bremen",
    title: "Bauunternehmen in Bremen | Teamwork Construktion",
    metaDescription:
      "Teamwork Construktion in Bremen: Renovierung, Innenausbau, Sanierung, Gartenarbeit und Sportanlagen mit klaren Abläufen und festen Ansprechpartnern.",
    headline: "Bauunternehmen in Bremen",
    intro:
      "Für Projekte in Bremen bieten wir Renovierung, Innenausbau, Sanierung und Außenanlagen aus einer Hand inklusive direkter Abstimmung.",
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    slug: "delmenhorst",
    locationName: "Delmenhorst",
    title: "Bauunternehmen in Delmenhorst | Teamwork Construktion",
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
    title: "Bauunternehmen in Lilienthal | Teamwork Construktion",
    metaDescription:
      "Teamwork Construktion für Lilienthal: Innenausbau, Modernisierung, Boden- und Fliesenarbeiten sowie Außenbereiche mit sauberer Umsetzung.",
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
    title: "Bauunternehmen in Stuhr | Teamwork Construktion",
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
    title: "Bauunternehmen in Weyhe | Teamwork Construktion",
    metaDescription:
      "Teamwork Construktion in Weyhe: Modernisierung, Wasserschaden-Sanierung, Sportanlagen und Außenarbeiten mit schneller Rückmeldung.",
    headline: "Bauunternehmen in Weyhe",
    intro:
      "In Weyhe begleiten wir Wohn- und Außenprojekte zuverlässig vom Erstkontakt bis zur besenreinen Übergabe.",
    image:
      "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const SERVICE_SEO_BY_SLUG = Object.fromEntries(
  SERVICE_SEO_PAGES.map((item) => [item.slug, item])
);
const SERVICE_SEO_BY_ID = Object.fromEntries(
  SERVICE_SEO_PAGES.map((item) => [item.serviceId, item])
);
const LOCATION_SEO_BY_SLUG = Object.fromEntries(
  LOCATION_SEO_PAGES.map((item) => [item.slug, item])
);
const SERVICE_BY_ID = Object.fromEntries(SERVICES.map((item) => [item.id, item]));

const CONTACT_TRUST_POINTS = [
  "Rückmeldung werktags in 24–48h",
  "Unverbindliche Erstberatung",
  "Arbeiten nach KfW-Vorgaben",
];

const CONTACT_FAQ = [
  {
    question: "Wie schnell bekomme ich eine Rückmeldung?",
    answer: "In der Regel melden wir uns werktags innerhalb von 24–48 Stunden mit einem klaren nächsten Schritt.",
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

const HEADER_LINKS = [
  { to: "/leistungen", label: "Leistungen" },
  { to: "/projekte", label: "Projekte" },
  { to: "/ablauf", label: "Ablauf" },
  { to: "/kontakt", label: "Kontakt" },
];

const FOOTER_LINKS = [
  { to: "/impressum", label: "Impressum" },
  { to: "/datenschutz", label: "Datenschutz" },
  { to: "/cookies", label: "Cookies" },
];

const LEGAL_CONTENT = {
  impressum: {
    title: "IMPRESSUM",
    subtitle: "Verantwortliche Angaben für Teamwork Construktion",
    intro:
      "Hier finden Sie die rechtlich relevanten Basisinformationen zum Unternehmen, zur Vertretung und zu Kontaktwegen.",
    sections: [
      {
        heading: "Anbieter",
        text: "Teamwork Construktion · Bremen & Umgebung. Angaben zu Vertretung und ladungsfähiger Anschrift werden hier final gepflegt.",
      },
      {
        heading: "Kontakt",
        text: `Telefon: ${PHONE_DISPLAY} · E-Mail: ${EMAIL}. Für Projektanfragen nutzen Sie gern zusätzlich WhatsApp.`,
      },
      {
        heading: "Haftung",
        text: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für externe Inhalte. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.",
      },
    ],
  },
  datenschutz: {
    title: "DATENSCHUTZ",
    subtitle: "Transparenz zur Verarbeitung personenbezogener Daten",
    intro:
      "Datenschutz ist für uns ein fester Bestandteil unserer digitalen Kommunikation. Nachfolgend erhalten Sie einen verständlichen Überblick.",
    sections: [
      {
        heading: "Welche Daten wir verarbeiten",
        text: "Wir verarbeiten nur die Daten, die Sie uns freiwillig übermitteln – z. B. Name, Telefonnummer, E-Mail und Projektdetails.",
      },
      {
        heading: "Wofür wir Daten nutzen",
        text: "Zur Kontaktaufnahme, Angebotserstellung und Projektabstimmung. Die Verarbeitung erfolgt zweckgebunden und datensparsam.",
      },
      {
        heading: "Ihre Rechte",
        text: "Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch im Rahmen der gesetzlichen Vorgaben.",
      },
    ],
  },
  cookies: {
    title: "COOKIES",
    subtitle: "Informationen zu technischen und optionalen Cookies",
    intro:
      "Wir setzen Cookies transparent und nur im erforderlichen Umfang ein. Optionale Funktionen erfolgen ausschließlich mit Einwilligung.",
    sections: [
      {
        heading: "Technisch notwendige Cookies",
        text: "Diese sorgen für Grundfunktionen der Seite, z. B. Navigation, Session-Stabilität und Formularnutzung.",
      },
      {
        heading: "Optionale Cookies",
        text: "Optionale Dienste wie externe Medien oder Statistik können gesondert aktiviert oder deaktiviert werden.",
      },
      {
        heading: "Einstellungen ändern",
        text: "Ihre Entscheidung können Sie jederzeit anpassen. Bei Fragen erreichen Sie uns direkt über die Kontaktseite.",
      },
    ],
  },
};

const containerClass = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
const cardClass =
  "rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";
const primaryBtnClass =
  "inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";
const secondaryBtnClass =
  "inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";
const whatsappBtnClass =
  "inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2";
const MENU_ANIM_MS = 280;
const MENU_STAGGER_MS = 60;

function buildContactPath({ serviceId = "", locationName = "", source = "" } = {}) {
  const params = new URLSearchParams();

  if (serviceId && SERVICE_BY_ID[serviceId]) {
    params.set(QUERY_PARAMS.service, serviceId);
  }

  if (locationName?.trim()) {
    params.set(QUERY_PARAMS.location, locationName.trim());
  }

  if (source?.trim()) {
    params.set(QUERY_PARAMS.source, source.trim());
  }

  const query = params.toString();
  return query ? `/kontakt?${query}` : "/kontakt";
}

function buildWhatsappLink({ serviceId = "", locationName = "", source = "website" } = {}) {
  const service = serviceId ? SERVICE_BY_ID[serviceId] : null;
  const lines = [
    `Hallo ${COMPANY_NAME},`,
    "ich interessiere mich für eine unverbindliche Erstberatung.",
  ];

  if (service) {
    lines.push(`Leistung: ${service.title}`);
  }

  if (locationName?.trim()) {
    lines.push(`Ort: ${locationName.trim()}`);
  }

  if (source?.trim()) {
    lines.push(`Quelle: ${source.trim()}`);
  }

  lines.push("Bitte melden Sie sich für die nächsten Schritte.");
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function getContactPrefill(search = "") {
  const params = new URLSearchParams(search);
  const serviceId = params.get(QUERY_PARAMS.service) || "";
  const locationName = params.get(QUERY_PARAMS.location) || "";
  const source = params.get(QUERY_PARAMS.source) || "";

  return {
    service: SERVICE_BY_ID[serviceId] ? serviceId : "",
    location: locationName.trim(),
    source: source.trim(),
  };
}

function getPageContext(pathname) {
  if (pathname === "/") return { source: "startseite" };
  if (pathname === "/leistungen") return { source: "leistungen-uebersicht" };
  if (pathname === "/projekte") return { source: "projekte" };
  if (pathname === "/ablauf") return { source: "ablauf" };
  if (pathname === "/kontakt") return { source: "kontakt" };
  if (pathname === "/impressum" || pathname === "/datenschutz" || pathname === "/cookies") {
    return { source: "rechtliches" };
  }

  if (pathname.startsWith("/leistungen/")) {
    const slug = pathname.split("/")[2] || "";
    const seoPage = SERVICE_SEO_BY_SLUG[slug];
    return {
      source: seoPage ? `leistungsseite-${seoPage.serviceId}` : "leistungsseite",
      serviceId: seoPage?.serviceId || "",
    };
  }

  if (pathname.startsWith("/standorte/")) {
    const slug = pathname.split("/")[2] || "";
    const locationPage = LOCATION_SEO_BY_SLUG[slug];
    return {
      source: locationPage ? `standort-${locationPage.slug}` : "standortseite",
      locationName: locationPage?.locationName || "",
    };
  }

  return { source: "website" };
}

function copyToClipboard(value) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  if (typeof document === "undefined") {
    return Promise.reject(new Error("Clipboard nicht verfügbar"));
  }

  return new Promise((resolve, reject) => {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (successful) {
      resolve();
    } else {
      reject(new Error("Kopieren fehlgeschlagen"));
    }
  });
}

function useSeo(title, metaDescription) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (title) document.title = title;

    if (metaDescription) {
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement("meta");
        descriptionTag.setAttribute("name", "description");
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.setAttribute("content", metaDescription);
    }
  }, [title, metaDescription]);
}

function BurgerIcon({ open, reduceMotion }) {
  const lineClass = [
    "absolute left-0 h-0.5 w-6 rounded-full bg-current",
    reduceMotion ? "" : "transition-all duration-300 ease-out",
    "motion-reduce:transition-none",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className="relative block h-5 w-6" aria-hidden="true">
      <span className={`${lineClass} top-0 ${open ? "translate-y-2 rotate-45" : ""}`} />
      <span className={`${lineClass} top-2 ${open ? "translate-x-2 opacity-0" : "opacity-100"}`} />
      <span className={`${lineClass} top-4 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
    </span>
  );
}

function Header({ menuOpen, onMenuToggle, isScrolled, isHeaderHidden, reduceMotion, whatsappHref }) {
  const headerClass = [
    "fixed inset-x-0 top-0 z-50 backdrop-blur",
    isScrolled
      ? "border-b border-red-200 bg-white/98 shadow-lg shadow-red-100/60"
      : "border-b border-gray-200 bg-white/95",
    isScrolled && !reduceMotion ? "anim-header-shadow" : "",
    !reduceMotion ? "anim-header-enter transition-all duration-300" : "",
    isHeaderHidden && !menuOpen ? "-translate-y-full sm:translate-y-0" : "translate-y-0",
    reduceMotion ? "" : "motion-reduce:transition-none",
  ]
    .filter(Boolean)
    .join(" ");

  const headerHeightClass = isScrolled ? "h-16 sm:h-20" : "h-20 sm:h-24";
  const logoSizeClass = isScrolled ? "h-11 sm:h-16" : "h-14 sm:h-20";

  return (
    <header className={headerClass}>
      <div className={`${containerClass} flex ${headerHeightClass} items-center justify-between gap-3 sm:gap-4`}>
        <Link
          to="/"
          className={`inline-flex items-center gap-3 rounded-lg px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
            reduceMotion ? "" : "transition-all duration-300"
          }`}
        >
          <img src={LOGO_SRC} alt={`${COMPANY_NAME} Logo`} className={`${logoSizeClass} w-auto`} />
          <span className="hidden sm:inline text-base font-black tracking-tight text-red-600 lg:text-lg">
            TEAMWORK
          </span>
          <span className="hidden sm:inline text-base font-semibold tracking-tight text-gray-600 lg:text-lg">
            CONSTRUKTION
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-6 lg:flex">
          {HEADER_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative pb-1 text-sm font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-red-600 after:transition-all after:duration-300 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "anim-underline-reveal text-red-700 after:w-full"
                    : "text-gray-600 after:w-0 hover:text-red-600 hover:after:w-full"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a href={PHONE_TEL} className={secondaryBtnClass}>
            Anrufen
          </a>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className={whatsappBtnClass}>
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onMenuToggle}
          className={`inline-flex items-center justify-center rounded-xl border p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 lg:hidden ${
            menuOpen
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          <BurgerIcon open={menuOpen} reduceMotion={reduceMotion} />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ open, onNavigate, isScrolled, reduceMotion, whatsappHref }) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimerRef = useRef(null);
  const topOffsetClass = isScrolled ? "top-16 sm:top-20" : "top-20 sm:top-24";
  const panelDurationMs = reduceMotion ? 1 : MENU_ANIM_MS;
  const itemDurationMs = reduceMotion ? 1 : 220;
  const ctaDelayMs = 80 + HEADER_LINKS.length * MENU_STAGGER_MS + 30;
  const easing = reduceMotion ? "linear" : "cubic-bezier(0.22,1,0.36,1)";

  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setIsMounted(true);
      const frameId = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    setIsVisible(false);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsMounted(false);
      closeTimerRef.current = null;
    }, panelDurationMs);

    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [open, panelDurationMs]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  if (!isMounted) return null;

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-x-0 z-40 border-b border-red-100 bg-white/98 shadow-lg shadow-red-100/50 transition-all lg:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
      } ${topOffsetClass}`}
      style={{ transitionDuration: `${panelDurationMs}ms`, transitionTimingFunction: easing }}
      role="dialog"
      aria-label="Mobiles Menü"
    >
      <div className={`${containerClass} space-y-4 py-5`}>
        <nav className="grid gap-2" aria-label="Mobile Navigation">
          {HEADER_LINKS.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isActive ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50"
                } ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`
              }
              style={{
                transitionDuration: `${itemDurationMs}ms`,
                transitionTimingFunction: easing,
                transitionDelay: isVisible ? `${80 + index * MENU_STAGGER_MS}ms` : "0ms",
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div
          className={`grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 transition-all ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{
            transitionDuration: `${itemDurationMs}ms`,
            transitionTimingFunction: easing,
            transitionDelay: isVisible ? `${ctaDelayMs}ms` : "0ms",
          }}
        >
          <a href={PHONE_TEL} className={secondaryBtnClass} onClick={onNavigate}>
            Anrufen
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={whatsappBtnClass}
            onClick={onNavigate}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileActionBar({ hidden, whatsappHref }) {
  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-red-200 bg-white/95 backdrop-blur sm:hidden">
      <div
        className={`${containerClass} grid grid-cols-2 gap-2 py-2`}
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={PHONE_TEL}
          className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Jetzt anrufen
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`anim-cta-glow ${whatsappBtnClass}`}
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function DesktopActionBar({ whatsappHref }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center lg:flex">
      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-red-200 bg-white/95 p-2 shadow-lg shadow-red-100/70 backdrop-blur">
        <a href={PHONE_TEL} className={secondaryBtnClass}>
          Anrufen
        </a>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className={whatsappBtnClass}>
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-600">{label}</p>
      <h1 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <div className="mt-4 h-1.5 w-16 rounded-full bg-red-600" aria-hidden="true" />
      {subtitle ? <p className="mt-4 max-w-3xl text-base text-gray-600 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function CardGrid({ items, gridClassName, renderItem }) {
  return <div className={`grid gap-4 sm:gap-6 ${gridClassName}`}>{items.map(renderItem)}</div>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-800 ease-out motion-reduce:transition-none ${
        isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.98] opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function HeroSplit({ eyebrow, title, subtitle, image, alt, primaryCta, secondaryCta, chips }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-white pb-14 pt-28 sm:pb-16 sm:pt-36">
      <div
        className="anim-float-red pointer-events-none absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-red-200/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="anim-float-red pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-red-100 blur-3xl"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      />
      <div
        className="anim-float-red pointer-events-none absolute right-[-5%] top-1/2 h-40 w-40 rounded-full bg-red-300/40 blur-3xl sm:hidden"
        style={{ animationDelay: "0.6s" }}
        aria-hidden="true"
      />

      <div className={`${containerClass} relative grid gap-8 lg:grid-cols-12 lg:items-end`}>
        <Reveal className="anim-hero-enter lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{eyebrow}</p>
          <div className="mt-4 h-1.5 w-14 rounded-full bg-red-600" aria-hidden="true" />
          <h1 className="mt-5 text-[2.35rem] font-black leading-[1.06] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-gray-600 sm:text-lg">{subtitle}</p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
            {primaryCta}
            {secondaryCta}
          </div>

          {chips ? (
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="whitespace-nowrap rounded-full border border-red-100 bg-white px-3 py-1 text-xs font-medium text-gray-600"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </Reveal>

        <Reveal className="lg:col-span-5" delay={130}>
          <div className={`${cardClass} overflow-hidden`}>
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="h-[320px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[420px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatBar() {
  return (
    <div className={`${cardClass} border-red-200 p-5 sm:p-6`}>
      <div className="grid gap-4 border-b border-gray-100 pb-5 sm:grid-cols-3">
        {KPIS.map((item) => (
          <div key={item.label} className="rounded-xl border border-red-100 bg-red-50/60 p-4">
            <p className="text-3xl font-black tracking-tight text-red-700 sm:text-4xl">{item.value}</p>
            <p className="mt-1 text-sm font-medium text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {BADGES.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center rounded-full border border-red-100 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ value, className = "" }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    },
    []
  );

  const handleCopy = async () => {
    try {
      await copyToClipboard(value);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${className}`}
    >
      {copied ? "Kopiert" : "Kopieren"}
    </button>
  );
}

function ContactForm({ prefill = { service: "", location: "", source: "" } }) {
  const emptyData = useMemo(
    () => ({
      name: "",
      phone: "",
      email: "",
      service: "",
      location: "",
      message: "",
      wantsKfw: false,
    }),
    []
  );

  const [formData, setFormData] = useState({ ...emptyData, service: prefill.service, location: prefill.location });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setFormData({ ...emptyData, service: prefill.service, location: prefill.location });
    setErrors({});
    setSuccess(false);
    setStep(1);
  }, [emptyData, prefill.location, prefill.service]);

  const validateStepOne = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Bitte Namen eingeben.";
    if (!formData.phone.trim()) nextErrors.phone = "Bitte Telefonnummer eingeben.";
    if (!formData.service.trim()) nextErrors.service = "Bitte Leistung auswählen.";
    return nextErrors;
  };

  const validateStepTwo = () => {
    const nextErrors = {};
    if (!formData.email.trim()) {
      nextErrors.email = "Bitte E-Mail eingeben.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      nextErrors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }
    if (!formData.location.trim()) nextErrors.location = "Bitte Ort/PLZ eingeben.";
    if (!formData.message.trim()) nextErrors.message = "Bitte Nachricht eingeben.";
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (success) setSuccess(false);
  };

  const handleNextStep = () => {
    const nextErrors = validateStepOne();
    if (Object.keys(nextErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...nextErrors }));
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 1) {
      handleNextStep();
      return;
    }

    const nextErrors = { ...validateStepOne(), ...validateStepTwo() };

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccess(false);
      if (nextErrors.name || nextErrors.phone || nextErrors.service) {
        setStep(1);
      }
      return;
    }

    setSuccess(true);
    setErrors({});
    setFormData(emptyData);
    setStep(1);
  };

  const inputBaseClass =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500";

  return (
    <form onSubmit={handleSubmit} noValidate className={`${cardClass} p-5 sm:p-6`}>
      <h3 className="text-lg font-semibold text-gray-900">Projektanfrage senden</h3>
      <p className="mt-1 text-sm text-gray-600">
        Wir melden uns mit einem klaren nächsten Schritt. Fragen zur KfW-Förderberatung können Sie direkt angeben.
      </p>

      <div className="mt-4 rounded-xl border border-red-100 bg-red-50/60 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-700">
          <span className={step === 1 ? "rounded-full bg-red-600 px-2 py-0.5 text-white" : "rounded-full bg-white px-2 py-0.5 text-red-700"}>1</span>
          Kontaktdaten
          <span className="text-gray-400">/</span>
          <span className={step === 2 ? "rounded-full bg-red-600 px-2 py-0.5 text-white" : "rounded-full bg-white px-2 py-0.5 text-red-700"}>2</span>
          Projektdetails
        </div>
      </div>

      {prefill.source ? (
        <p className="mt-3 text-xs text-gray-500">Anfragekontext: {prefill.source.replace(/-/g, " ")}</p>
      ) : null}

      {step === 1 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">
            Name *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputBaseClass}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <span className="mt-1 block text-xs text-red-600">{errors.name}</span> : null}
          </label>

          <label className="text-sm font-medium text-gray-700">
            Telefon *
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputBaseClass}
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone}</span> : null}
          </label>

          <label className="text-sm font-medium text-gray-700 sm:col-span-2">
            Leistung *
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputBaseClass}
              aria-invalid={Boolean(errors.service)}
            >
              <option value="">Bitte auswählen</option>
              {SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.service ? <span className="mt-1 block text-xs text-red-600">{errors.service}</span> : null}
          </label>
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              E-Mail *
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputBaseClass}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}
            </label>

            <label className="text-sm font-medium text-gray-700">
              Ort / PLZ *
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputBaseClass}
                aria-invalid={Boolean(errors.location)}
              />
              {errors.location ? <span className="mt-1 block text-xs text-red-600">{errors.location}</span> : null}
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Nachricht *
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={inputBaseClass}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? <span className="mt-1 block text-xs text-red-600">{errors.message}</span> : null}
          </label>

          <label className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/50 px-3 py-2.5 text-sm text-gray-700">
            <input
              type="checkbox"
              name="wantsKfw"
              checked={formData.wantsKfw}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span>KfW-Förderberatung gewünscht</span>
          </label>
        </>
      )}

      <p className="mt-3 text-xs text-gray-500">
        Hinweis: Für förderrelevante Projekte unterstützen wir mit KfW-Förderberatung und Arbeiten nach KfW-Vorgaben.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {step === 1 ? (
          <button type="button" onClick={handleNextStep} className={primaryBtnClass}>
            Weiter
          </button>
        ) : (
          <>
            <button type="button" onClick={() => setStep(1)} className={secondaryBtnClass}>
              Zurück
            </button>
            <button type="submit" className={primaryBtnClass}>
              Anfrage senden
            </button>
          </>
        )}
        <a href={PHONE_TEL} className={secondaryBtnClass}>
          Lieber direkt anrufen
        </a>
      </div>

      {success ? (
        <p
          className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
          aria-live="polite"
        >
          Danke! Wir melden uns werktags innerhalb von 24–48 Stunden.
        </p>
      ) : null}
    </form>
  );
}

function HomePage() {
  useSeo(STATIC_SEO.home.title, STATIC_SEO.home.metaDescription);
  const homeServicePreview = SERVICES;
  const homeProjectPreview = PROJECTS.slice(0, 3);
  const homeWhatsappHref = buildWhatsappLink({ source: "startseite" });

  return (
    <>
      <HeroSplit
        eyebrow={`${COMPANY_NAME} · ${REGION}`}
        title="Wir schaffen Räume, in denen man gerne lebt."
        subtitle="Ob gezielte Modernisierung, umfangreiche Sanierung oder Außenbereich: Wir begleiten Ihr Projekt mit einem klaren Ablauf, transparenten Angeboten und hochwertiger Ausführung."
        image={IMAGE_SOURCES.homeHero}
        alt="Modernes, helles Wohnzimmer nach einer Renovierung"
        primaryCta={<Link to={buildContactPath({ source: "startseite-hero" })} className={primaryBtnClass}>Projekt anfragen</Link>}
        secondaryCta={<a href={PHONE_TEL} className={secondaryBtnClass}>{PHONE_DISPLAY}</a>}
        chips={["Unverbindliche Erstberatung", "Termintreu", "KfW-Förderberatung", "WhatsApp Direktkontakt", "Bremen & Umgebung"]}
      />

      <section className="pb-14 sm:pb-16">
        <div className={containerClass}>
          <Reveal className="mb-5">
            <div className="rounded-xl border border-red-100 bg-red-50/70 px-4 py-3">
              <p className="text-sm font-medium text-red-800">
                KfW-Förderberatung inklusive: Wir planen Maßnahmen energieeffizient und setzen Arbeiten nach KfW-Vorgaben um.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  to="/leistungen/renovierung-modernisierung-bremen"
                  className="text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                >
                  Mehr zur KfW-Förderberatung
                </Link>
                <Link
                  to={buildContactPath({ serviceId: "01", source: "kfw-box-startseite" })}
                  className="text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                >
                  KfW-Beratung anfragen
                </Link>
                <Link
                  to="/standorte/bremen"
                  className="text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                >
                  Leistungen in Bremen
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <StatBar />
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-14 sm:py-16">
        <div className={`${containerClass} grid gap-8 lg:grid-cols-12 lg:items-center`}>
          <Reveal className="lg:col-span-5">
            <div className={`${cardClass} overflow-hidden`}>
              <img
                src={IMAGE_SOURCES.homeStory}
                alt="Werkzeuge und Materialien für den Innenausbau"
                loading="lazy"
                className="h-[320px] w-full object-cover transition duration-700 hover:scale-[1.03] sm:h-[420px]"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <SectionHeading
              label="Unser Anspruch"
              title={
                <>
                  SAUBER GEPLANT,
                  <br />
                  SAUBER UMGESETZT
                </>
              }
              subtitle="Wir arbeiten strukturiert, halten Sie regelmäßig auf dem Laufenden und liefern ein Ergebnis, das im Alltag überzeugt – inklusive KfW-Förderberatung und Arbeiten nach KfW-Vorgaben."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <article className={`${cardClass} p-5`}>
                <h3 className="text-lg font-semibold text-gray-900">Transparente Kommunikation</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Sie wissen jederzeit, was als Nächstes passiert. Entscheidungen werden verständlich vorbereitet und klar abgestimmt.
                </p>
              </article>
              <article className={`${cardClass} border-red-100 bg-red-50/50 p-5`}>
                <h3 className="text-lg font-semibold text-gray-900">Wohnbereich im Fokus</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Unser Schwerpunkt liegt auf privaten Wohnprojekten. Das sieht man in unseren Lösungen, Abläufen und Details.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <SectionHeading
              label="Leistungen auf einen Blick"
              title={
                <>
                  STARKE LEISTUNGEN
                  <br />
                  FÜR INNEN & AUSSEN
                </>
              }
              subtitle="Auf der Startseite erhalten Sie bereits einen klaren Überblick. Alle Details finden Sie anschließend auf der Leistungsseite."
            />
          </Reveal>

          <div className="sm:hidden">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {homeServicePreview.map((service, index) => {
                const serviceSeoPage = SERVICE_SEO_BY_ID[service.id];
                const serviceDetailPath = serviceSeoPage ? `/leistungen/${serviceSeoPage.slug}` : "/leistungen";

                return (
                  <Reveal key={service.id} delay={index * 80} className="min-w-[85%] snap-start">
                    <article className={`${cardClass} overflow-hidden`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-44 w-full object-cover transition duration-700 hover:scale-[1.03]"
                      />
                      <div className="p-5">
                        <p className="font-mono text-3xl font-bold leading-none text-red-600">{service.id}</p>
                        <h3 className="mt-3 text-lg font-semibold text-gray-900">{service.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
                        <Link
                          to={serviceDetailPath}
                          className="mt-4 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                        >
                          Mehr auf der Leistungsseite
                        </Link>
                        <Link
                          to={buildContactPath({ serviceId: service.id, source: "startseite-leistungskarte" })}
                          className="mt-2 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                        >
                          Direkt anfragen
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="hidden sm:block">
            <CardGrid
              items={homeServicePreview}
              gridClassName="sm:grid-cols-2 lg:grid-cols-3"
              renderItem={(service, index) => {
                const serviceSeoPage = SERVICE_SEO_BY_ID[service.id];
                const serviceDetailPath = serviceSeoPage ? `/leistungen/${serviceSeoPage.slug}` : "/leistungen";

                return (
                  <Reveal key={service.id} delay={index * 70}>
                    <article className={`${cardClass} overflow-hidden`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-40 w-full object-cover transition duration-700 hover:scale-[1.03]"
                      />
                      <div className="p-5">
                        <p className="font-mono text-3xl font-bold leading-none text-red-600">{service.id}</p>
                        <h3 className="mt-3 text-lg font-semibold text-gray-900">{service.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
                        <Link
                          to={serviceDetailPath}
                          className="mt-4 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                        >
                          Mehr auf der Leistungsseite
                        </Link>
                        <Link
                          to={buildContactPath({ serviceId: service.id, source: "startseite-leistungskarte" })}
                          className="mt-2 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                        >
                          Direkt anfragen
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                );
              }}
            />
          </div>

          <Reveal delay={140} className="mt-8">
            <div className="rounded-2xl border border-red-200 bg-red-50/70 p-5 sm:p-6">
              <p className="text-sm font-medium text-red-800">
                Sie sind unsicher, welche Leistung passt? Über WhatsApp können Sie uns direkt Bilder schicken und wir geben eine erste Einschätzung.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={homeWhatsappHref} target="_blank" rel="noreferrer" className={whatsappBtnClass}>
                  WhatsApp Anfrage starten
                </a>
                <Link to="/leistungen/renovierung-modernisierung-bremen" className={secondaryBtnClass}>
                  KfW-Förderberatung ansehen
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-red-50/80 via-white to-white py-14 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <SectionHeading
              label="Ablauf kompakt"
              title={
                <>
                  SO LÄUFT IHR PROJEKT
                  <br />
                  SCHRITT FÜR SCHRITT
                </>
              }
              subtitle="Auch auf der Startseite sehen Sie direkt, wie wir zusammenarbeiten: klar, nachvollziehbar und strukturiert."
            />
          </Reveal>

          <div className="md:hidden">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {STEPS.map((step, index) => (
                <Reveal key={step.id} delay={index * 80} className="min-w-[82%] snap-start">
                  <article className={`${cardClass} border-red-100 p-5`}>
                    <p className="font-mono text-4xl font-black leading-none text-red-600">{step.id}</p>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <CardGrid
              items={STEPS}
              gridClassName="md:grid-cols-2 lg:grid-cols-4"
              renderItem={(step, index) => (
                <Reveal key={step.id} delay={index * 80}>
                  <article className={`${cardClass} border-red-100 p-5`}>
                    <p className="font-mono text-4xl font-black leading-none text-red-600">{step.id}</p>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </article>
                </Reveal>
              )}
            />
          </div>

          <Reveal delay={140} className="mt-6 flex flex-wrap gap-3">
            <Link to="/ablauf" className={primaryBtnClass}>
              Detaillierten Ablauf ansehen
            </Link>
            <Link to={buildContactPath({ source: "startseite-ablauf" })} className={secondaryBtnClass}>
              Direkt Projekt besprechen
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <SectionHeading
              label="Projekt-Teaser"
              title={
                <>
                  ECHTE REFERENZEN
                  <br />
                  AUS BREMEN & UMGEBUNG
                </>
              }
              subtitle="Auf der Projektseite finden Sie weitere Details, Zeiten und zusätzliche Einblicke zu vergleichbaren Vorhaben."
            />
          </Reveal>

          <div className="md:hidden">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {homeProjectPreview.map((project, index) => (
                <Reveal key={project.id} delay={index * 80} className="min-w-[86%] snap-start">
                  <article className={`${cardClass} overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-52 w-full object-cover transition duration-700 hover:scale-[1.03]"
                    />
                    <div className="space-y-3 p-5">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                          {project.title}
                        </span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                          {project.location}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{project.summary}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dauer: {project.duration}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <CardGrid
              items={homeProjectPreview}
              gridClassName="md:grid-cols-2 lg:grid-cols-3"
              renderItem={(project, index) => (
                <Reveal key={project.id} delay={index * 80}>
                  <article className={`${cardClass} overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-48 w-full object-cover transition duration-700 hover:scale-[1.03]"
                    />
                    <div className="space-y-3 p-5">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                          {project.title}
                        </span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                          {project.location}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{project.summary}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dauer: {project.duration}</p>
                    </div>
                  </article>
                </Reveal>
              )}
            />
          </div>

          <Reveal delay={140} className="mt-6">
            <Link to="/projekte" className={primaryBtnClass}>
              Alle Projekte ansehen
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className={containerClass}>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-red-300 bg-gradient-to-r from-red-600 to-red-700 p-6 text-white shadow-lg sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-100">Kontakt</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl">
                STARTSEITE GESEHEN.
                <br />
                NÄCHSTER SCHRITT: ANFRAGE.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-red-50 sm:text-base">
                Telefon, WhatsApp oder Formular: Wir melden uns werktags innerhalb von 24-48 Stunden und besprechen mit Ihnen den sinnvollsten Startpunkt.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={PHONE_TEL} className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600">
                  {PHONE_DISPLAY}
                </a>
                <a href={homeWhatsappHref} target="_blank" rel="noreferrer" className={whatsappBtnClass}>
                  WhatsApp schreiben
                </a>
                <Link to={buildContactPath({ source: "startseite-final" })} className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600">
                  Zum Kontaktformular
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function LeistungenPage() {
  useSeo(STATIC_SEO.leistungenHub.title, STATIC_SEO.leistungenHub.metaDescription);

  return (
    <>
      <HeroSplit
        eyebrow="Leistungen"
        title="Für Innen- und Außenbereiche die passende Lösung"
        subtitle="Von der ersten Idee bis zur finalen Übergabe bündeln wir alle Arbeitsschritte in einem klaren Prozess."
        image={IMAGE_SOURCES.leistungenHero}
        alt="Innenraum in Renovierung mit klarer Linienführung"
        primaryCta={<Link to={buildContactPath({ source: "leistungen-hero" })} className={primaryBtnClass}>Leistung anfragen</Link>}
        secondaryCta={<Link to="/ablauf" className={secondaryBtnClass}>Ablauf ansehen</Link>}
      />

      <section className="bg-gray-50 py-14 sm:py-16">
        <div className={containerClass}>
          <CardGrid
            items={SERVICES}
            gridClassName="md:grid-cols-2 lg:grid-cols-3"
            renderItem={(service) => {
              const serviceSeoPage = SERVICE_SEO_BY_ID[service.id];
              const serviceDetailPath = serviceSeoPage ? `/leistungen/${serviceSeoPage.slug}` : "/leistungen";

              return (
                <article key={service.id} className={`${cardClass} overflow-hidden`}>
                  <img src={service.image} alt={service.title} loading="lazy" className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <p className="font-mono text-3xl font-bold leading-none text-red-600">{service.id}</p>
                    <h3 className="mt-3 text-xl font-semibold text-gray-900">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{service.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{service.text}</p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-red-600" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={serviceDetailPath}
                      className="mt-4 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                    >
                      Zur Leistungsseite
                    </Link>
                    <Link
                      to={buildContactPath({ serviceId: service.id, source: "leistungen-karte" })}
                      className="mt-3 inline-flex text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                    >
                      Direkt dafür anfragen
                    </Link>
                  </div>
                </article>
              );
            }}
          />

          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/70 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-700">KfW-Förderberatung</p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              Förderrelevante Maßnahmen klar vorbereitet
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Wir unterstützen Sie bei Maßnahmendefinition, Unterlagen und Abstimmung bis zur Antragseinreichung.
              Parallel planen wir die Ausführung von Beginn an mit Arbeiten nach KfW-Vorgaben.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/leistungen/renovierung-modernisierung-bremen" className={primaryBtnClass}>
                KfW-Leistungsseite ansehen
              </Link>
              <Link to={buildContactPath({ serviceId: "01", source: "kfw-box-leistungen" })} className={secondaryBtnClass}>
                KfW-Beratung anfragen
              </Link>
              <Link to="/standorte/bremen" className={secondaryBtnClass}>
                Standort Bremen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjektePage() {
  useSeo(STATIC_SEO.projekteHub.title, STATIC_SEO.projekteHub.metaDescription);

  return (
    <>
      <HeroSplit
        eyebrow="Projekte"
        title="Referenzen mit klaren Ergebnissen"
        subtitle="Jedes Projekt erzählt eine eigene Geschichte – immer mit Fokus auf Qualität, Tempo und Wohnkomfort."
        image={IMAGE_SOURCES.projekteHero}
        alt="Saniertes Wohnhaus mit moderner Fassade"
        primaryCta={<Link to={buildContactPath({ source: "projekte-hero" })} className={primaryBtnClass}>Ähnliches Projekt planen</Link>}
        secondaryCta={<Link to="/leistungen" className={secondaryBtnClass}>Leistungen entdecken</Link>}
      />

      <section className="bg-gradient-to-b from-gray-50 to-white py-14 sm:py-16">
        <div className={containerClass}>
          <CardGrid
            items={PROJECTS}
            gridClassName="sm:grid-cols-2 lg:grid-cols-3"
            renderItem={(project) => (
              <article key={project.id} className={`${cardClass} overflow-hidden`}>
                <img src={project.image} alt={project.title} loading="lazy" className="h-44 w-full object-cover" />
                <div className="space-y-3 p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                      {project.title}
                    </span>
                    <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                      {project.location}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{project.summary}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Dauer: {project.duration}
                  </p>
                </div>
              </article>
            )}
          />

          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/60 p-5 sm:p-6">
            <p className="text-sm font-medium text-red-800">
              Vorher/Nachher-Material und zusätzliche Detailfotos stellen wir gern projektbezogen auf Anfrage bereit.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function AblaufPage() {
  useSeo(STATIC_SEO.ablaufHub.title, STATIC_SEO.ablaufHub.metaDescription);

  return (
    <>
      <HeroSplit
        eyebrow="Ablauf"
        title="So wird Ihr Projekt planbar und entspannt"
        subtitle="Unser Vier-Schritte-Prozess sorgt für Klarheit in jedem Abschnitt – von der Anfrage bis zur Übergabe."
        image={IMAGE_SOURCES.ablaufHero}
        alt="Teamabstimmung auf einer Baustelle"
        primaryCta={<Link to={buildContactPath({ source: "ablauf-hero" })} className={primaryBtnClass}>Jetzt starten</Link>}
        secondaryCta={<Link to="/projekte" className={secondaryBtnClass}>Projekte ansehen</Link>}
      />

      <section className="py-14 sm:py-16">
        <div className={`${containerClass} grid gap-6 lg:grid-cols-12`}>
          <aside className="lg:col-span-4">
            <div className={`${cardClass} p-5 sm:p-6 lg:sticky lg:top-28`}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Projektführung</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight text-gray-900">
                Klare Schritte
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-gray-700">
                <li>Ein fester Ansprechpartner pro Projekt</li>
                <li>Verständliche Angebote statt unklarer Positionen</li>
                <li>Regelmäßige Updates zum Baufortschritt</li>
                <li>Saubere Übergabe mit klaren Ergebnissen</li>
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <CardGrid
              items={STEPS}
              gridClassName="md:grid-cols-2"
              renderItem={(step) => (
                <article key={step.id} className={`${cardClass} overflow-hidden`}>
                  <img src={step.image} alt={`Schritt ${step.id}: ${step.title}`} loading="lazy" className="h-36 w-full object-cover" />
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-3xl font-bold leading-none text-red-600">{step.id}</p>
                    <h3 className="mt-3 text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.detail}</p>
                  </div>
                </article>
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function KontaktPage() {
  useSeo(STATIC_SEO.kontakt.title, STATIC_SEO.kontakt.metaDescription);
  const currentLocation = useLocation();
  const prefill = useMemo(() => getContactPrefill(currentLocation.search), [currentLocation.search]);
  const kontaktWhatsappHref = useMemo(
    () =>
      buildWhatsappLink({
        source: prefill.source || "kontakt",
        serviceId: prefill.service,
        locationName: prefill.location,
      }),
    [prefill.location, prefill.service, prefill.source]
  );

  return (
    <>
      <HeroSplit
        eyebrow="Kontakt"
        title="Sprechen wir über Ihr Projekt"
        subtitle="Telefon, WhatsApp oder Formular: Schildern Sie kurz Ihr Vorhaben und wir melden uns mit einem klaren nächsten Schritt. Fragen zur KfW-Förderberatung beantworten wir direkt mit."
        image={IMAGE_SOURCES.kontaktHero}
        alt="Heller Wohnraum als Kontaktmotiv"
        primaryCta={<a href={PHONE_TEL} className={primaryBtnClass}>Direkt anrufen</a>}
        secondaryCta={<a href={kontaktWhatsappHref} target="_blank" rel="noreferrer" className={whatsappBtnClass}>WhatsApp öffnen</a>}
      />

      <section className="py-14 sm:py-16">
        <div className={containerClass}>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <article className="rounded-2xl border border-red-200 bg-red-50/70 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700">KfW-Förderberatung</p>
                <p className="mt-2 text-sm leading-relaxed text-red-900">
                  Fragen zur Förderung? Wir beraten Sie zu passenden Maßnahmen und planen die Umsetzung mit Arbeiten nach KfW-Vorgaben.
                </p>
                <div className="mt-3 space-y-2">
                  <Link
                    to={buildContactPath({ serviceId: "01", source: "kfw-box-kontakt" })}
                    className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                  >
                    KfW-Beratung anfragen
                  </Link>
                  <Link
                    to="/leistungen/renovierung-modernisierung-bremen"
                    className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                  >
                    Zur KfW-Leistungsseite
                  </Link>
                  <Link
                    to="/standorte/bremen"
                    className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                  >
                    Einsatzgebiet Bremen
                  </Link>
                </div>
              </article>

              <article className={`${cardClass} p-5 sm:p-6`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Telefon</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-xl font-semibold text-gray-900">{PHONE_DISPLAY}</p>
                  <CopyButton value={PHONE_DISPLAY} />
                </div>
                <p className="mt-2 text-sm text-gray-600">Für schnelle Rückfragen und erste Einschätzung.</p>
                <a href={PHONE_TEL} className={`mt-4 w-full ${secondaryBtnClass}`}>
                  Anrufen
                </a>
              </article>

              <article className={`${cardClass} p-5 sm:p-6`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">WhatsApp</p>
                <p className="mt-2 text-xl font-semibold text-gray-900">{WHATSAPP_DISPLAY}</p>
                <p className="mt-2 text-sm text-gray-600">Fotos und kurze Projektinfos direkt senden.</p>
                <a href={kontaktWhatsappHref} target="_blank" rel="noreferrer" className={`mt-4 w-full ${whatsappBtnClass}`}>
                  WhatsApp starten
                </a>
              </article>

              <article className={`${cardClass} overflow-hidden`}>
                <img src={IMAGE_SOURCES.kontaktHero} alt="Kontaktmotiv Teamwork Construktion" loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">E-Mail</p>
                    <CopyButton value={EMAIL} />
                  </div>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-2 inline-flex text-sm font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-red-600"
                  >
                    {EMAIL}
                  </a>
                </div>
              </article>
            </div>

            <div className="space-y-6 lg:col-span-8">
              <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Ihr Vorteil</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {CONTACT_TRUST_POINTS.map((point) => (
                    <p key={point} className="rounded-xl border border-red-100 bg-red-50/50 px-3 py-2 text-sm font-medium text-gray-700">
                      {point}
                    </p>
                  ))}
                </div>
              </article>

              <ContactForm prefill={prefill} />

              <article className={`${cardClass} p-5 sm:p-6`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Mini-FAQ</p>
                <div className="mt-4 space-y-3">
                  {CONTACT_FAQ.map((item) => (
                    <details key={item.question} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                      <summary className="cursor-pointer text-sm font-semibold text-gray-900">{item.question}</summary>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LegalPage({ pageKey }) {
  const page = LEGAL_CONTENT[pageKey];
  if (!page) return <Navigate to="/" replace />;
  useSeo(`${page.title} | ${COMPANY_NAME}`, page.subtitle);

  return (
    <>
      <HeroSplit
        eyebrow="Rechtliches"
        title={page.title}
        subtitle={page.subtitle}
        image={IMAGE_SOURCES.legalHero}
        alt="Dokumente und Vertragsunterlagen"
        primaryCta={<Link to={buildContactPath({ source: `rechtliches-${pageKey}` })} className={primaryBtnClass}>Frage stellen</Link>}
        secondaryCta={<Link to="/" className={secondaryBtnClass}>Zur Startseite</Link>}
      />

      <section className="bg-gray-50 py-14 sm:py-16">
        <div className={containerClass}>
          <div className={`${cardClass} p-6 sm:p-8`}>
            <p className="text-base leading-relaxed text-gray-700">{page.intro}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {page.sections.map((section) => (
                <article key={section.heading} className="rounded-xl border border-gray-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-gray-900">{section.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{section.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SeoTemplatePage({
  eyebrow,
  title,
  subtitle,
  image,
  alt,
  overviewTitle,
  overviewText,
  bulletPoints,
  primaryCta,
  secondaryCta,
  relatedLinks,
}) {
  return (
    <>
      <HeroSplit
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        image={image}
        alt={alt}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />

      <section className="bg-gray-50 py-14 sm:py-16">
        <div className={containerClass}>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <article className={`${cardClass} p-6 sm:p-8`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-600">Leistungsdetails</p>
                <h2 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight text-gray-900 sm:text-3xl">
                  {overviewTitle}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">{overviewText}</p>
                <ul className="mt-5 space-y-3 text-sm text-gray-700">
                  {bulletPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-red-600" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <aside className="lg:col-span-4">
              <div className={`${cardClass} border-red-200 bg-red-50/70 p-5 sm:p-6 lg:sticky lg:top-28`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700">Nächste Schritte</p>
                <div className="mt-4 grid gap-3">
                  {primaryCta}
                  {secondaryCta}
                </div>

                {relatedLinks?.length ? (
                  <div className="mt-5 border-t border-red-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">
                      Weitere Seiten
                    </p>
                    <div className="mt-3 space-y-2">
                      {relatedLinks.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceSeoPage() {
  const { slug } = useParams();
  const seoPage = slug ? SERVICE_SEO_BY_SLUG[slug] : null;
  if (!seoPage) return <Navigate to="/leistungen" replace />;

  const service = SERVICES.find((item) => item.id === seoPage.serviceId);
  if (!service) return <Navigate to="/leistungen" replace />;

  useSeo(seoPage.title, seoPage.metaDescription);

  const relatedLinks = [
    { to: "/leistungen", label: "Alle Leistungen" },
    { to: "/standorte/bremen", label: "Leistungen in Bremen" },
    {
      to: buildContactPath({ serviceId: service.id, source: `seo-links-${seoPage.slug}` }),
      label: "Direkt anfragen",
    },
  ];

  if (seoPage.slug !== "renovierung-modernisierung-bremen") {
    relatedLinks.splice(1, 0, {
      to: "/leistungen/renovierung-modernisierung-bremen",
      label: "KfW-Förderberatung",
    });
  }

  return (
    <SeoTemplatePage
      eyebrow={`Leistung · ${REGION}`}
      title={seoPage.headline}
      subtitle={seoPage.intro}
      image={service.image}
      alt={`${service.title} in ${REGION}`}
      overviewTitle={`${service.title} im Detail`}
      overviewText={`${service.description} ${service.text}`}
      bulletPoints={[...service.points, "KfW-Förderberatung bei förderrelevanten Vorhaben"]}
      primaryCta={<Link to={buildContactPath({ serviceId: service.id, source: `seo-${seoPage.slug}` })} className={`w-full ${primaryBtnClass}`}>Angebot anfragen</Link>}
      secondaryCta={<a href={PHONE_TEL} className={`w-full ${secondaryBtnClass}`}>Direkt anrufen</a>}
      relatedLinks={relatedLinks}
    />
  );
}

function LocationSeoPage() {
  const { slug } = useParams();
  const locationPage = slug ? LOCATION_SEO_BY_SLUG[slug] : null;
  if (!locationPage) return <Navigate to="/" replace />;

  useSeo(locationPage.title, locationPage.metaDescription);

  const locationBullets = [
    `Einsatzgebiet: ${locationPage.locationName} und Umgebung`,
    "Renovierung, Innenausbau und Sanierung aus einer Hand",
    "KfW-Förderberatung sowie Arbeiten nach KfW-Vorgaben",
    "Direkte Abstimmung per Telefon, WhatsApp und Formular",
  ];

  return (
    <SeoTemplatePage
      eyebrow={`Standort · ${locationPage.locationName}`}
      title={locationPage.headline}
      subtitle={locationPage.intro}
      image={locationPage.image}
      alt={`${COMPANY_NAME} in ${locationPage.locationName}`}
      overviewTitle={`${locationPage.locationName}: Leistungen vor Ort`}
      overviewText={`Als Bauunternehmen für ${locationPage.locationName} und Umgebung setzen wir Wohn- und Außenprojekte mit klarer Planung und verlässlicher Ausführung um. Unsere Teams begleiten Sie von der Anfrage bis zur Übergabe, inklusive KfW-Förderberatung.`}
      bulletPoints={locationBullets}
      primaryCta={<Link to={buildContactPath({ locationName: locationPage.locationName, source: `standort-${locationPage.slug}` })} className={`w-full ${primaryBtnClass}`}>Projekt in {locationPage.locationName} anfragen</Link>}
      secondaryCta={<a href={PHONE_TEL} className={`w-full ${secondaryBtnClass}`}>Telefonische Erstberatung</a>}
      relatedLinks={[
        { to: "/leistungen/renovierung-modernisierung-bremen", label: "Renovierung in Bremen" },
        { to: "/leistungen/gartenarbeit-sportanlagen-bremen", label: "Gartenarbeit & Sportanlagen" },
        { to: "/leistungen", label: "Leistungsübersicht" },
      ]}
    />
  );
}

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const location = useLocation();
  const pageContext = useMemo(() => getPageContext(location.pathname), [location.pathname]);
  const whatsappHref = useMemo(
    () =>
      buildWhatsappLink({
        source: pageContext.source,
        serviceId: pageContext.serviceId,
        locationName: pageContext.locationName,
      }),
    [pageContext.locationName, pageContext.serviceId, pageContext.source]
  );
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = (event) => setReduceMotion(event.matches);
    applyMotionPreference(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", applyMotionPreference);
      return () => mediaQuery.removeEventListener("change", applyMotionPreference);
    }

    mediaQuery.addListener(applyMotionPreference);
    return () => mediaQuery.removeListener(applyMotionPreference);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHeaderState = () => {
      tickingRef.current = false;
      const currentY = Math.max(window.scrollY || 0, 0);
      const isMobile = window.innerWidth < 640;
      const delta = currentY - lastScrollYRef.current;

      setIsScrolled(currentY > 24);

      if (!isMobile || menuOpen || currentY < 80) {
        setIsHeaderHidden(false);
      } else if (delta > 6) {
        setIsHeaderHidden(true);
      } else if (delta < -4) {
        setIsHeaderHidden(false);
      }

      lastScrollYRef.current = currentY;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setIsHeaderHidden(false);
    setIsScrolled(false);
    lastScrollYRef.current = 0;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [location.pathname, reduceMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) setIsHeaderHidden(false);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        isScrolled={isScrolled}
        isHeaderHidden={isHeaderHidden}
        reduceMotion={reduceMotion}
        whatsappHref={whatsappHref}
      />
      <MobileMenu
        open={menuOpen}
        onNavigate={() => setMenuOpen(false)}
        isScrolled={isScrolled}
        reduceMotion={reduceMotion}
        whatsappHref={whatsappHref}
      />
      <DesktopActionBar whatsappHref={whatsappHref} />
      <MobileActionBar hidden={menuOpen} whatsappHref={whatsappHref} />

      <main className="pb-24 sm:pb-0">
        <Outlet />
      </main>

      <footer className="border-t border-red-100 bg-gray-50 py-8">
        <div className={`${containerClass} flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between`}>
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt={`${COMPANY_NAME} Logo`} className="h-14 w-auto sm:h-16" />
            <p>© {new Date().getFullYear()} {COMPANY_NAME}. Alle Rechte vorbehalten.</p>
          </div>
          <nav aria-label="Footer Links" className="flex flex-wrap gap-4">
            {FOOTER_LINKS.map((item) => (
              <NavLink key={item.to} to={item.to} className="transition hover:text-red-700">
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default function TeamworkLanding() {
  const useHashRouter = import.meta.env.PROD;
  const RouterComponent = useHashRouter ? HashRouter : BrowserRouter;

  return (
    <RouterComponent>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/leistungen" element={<LeistungenPage />} />
          <Route path="/leistungen/:slug" element={<ServiceSeoPage />} />
          <Route path="/standorte/:slug" element={<LocationSeoPage />} />
          <Route path="/projekte" element={<ProjektePage />} />
          <Route path="/ablauf" element={<AblaufPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
          <Route path="/impressum" element={<LegalPage pageKey="impressum" />} />
          <Route path="/datenschutz" element={<LegalPage pageKey="datenschutz" />} />
          <Route path="/cookies" element={<LegalPage pageKey="cookies" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </RouterComponent>
  );
}
