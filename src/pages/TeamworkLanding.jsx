import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  BADGES,
  BUSINESS_INFO,
  COMPANY_NAME,
  CONTACT_API_URL,
  CONTACT_FAQ,
  CONTACT_TRUST_POINTS,
  EMAIL,
  FOOTER_LINKS,
  HEADER_LINKS,
  IMAGE_SOURCES,
  KPIS,
  LEGAL_CONTENT,
  LOCATION_SEO_BY_SLUG,
  LOGO_SRC,
  PHONE_DISPLAY,
  PHONE_TEL,
  PROJECTS,
  QUERY_PARAMS,
  REGION,
  SERVICE_BY_ID,
  SERVICES,
  SERVICE_SEO_BY_ID,
  SERVICE_SEO_BY_SLUG,
  SERVICE_SEO_REDIRECTS,
  SITE_URL,
  STATIC_SEO,
  STEPS,
  WHATSAPP_DISPLAY,
  WHATSAPP_LINK,
} from "../content/siteContent";

const containerClass = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
const cardClass =
  "rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";
const primaryBtnClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:min-h-0 sm:w-auto";
const secondaryBtnClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:min-h-0 sm:w-auto";
const whatsappBtnClass =
  "inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:min-h-0 sm:w-auto";
const MENU_ANIM_MS = 280;
const MENU_STAGGER_MS = 60;
const CONSENT_STORAGE_KEY = "teamwork-consent-v1";
const mobileCarouselTrackClass =
  "-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const mobileCarouselItemClass = "min-w-[88%] snap-center";
const defaultConsentContext = {
  preferences: { externalMedia: true },
  hasChoice: true,
  isReady: true,
  isBannerOpen: false,
  openSettings: () => {},
  closeSettings: () => {},
  acceptNecessaryOnly: () => {},
  acceptExternalMedia: () => {},
};
const ConsentContext = createContext(defaultConsentContext);

function isRemoteAssetUrl(value = "") {
  return /^https?:\/\//i.test(value);
}

function readStoredConsent() {
  if (typeof window === "undefined") {
    return { externalMedia: false, hasChoice: false, isReady: false };
  }

  try {
    const rawValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!rawValue) {
      return { externalMedia: false, hasChoice: false, isReady: true };
    }

    const parsedValue = JSON.parse(rawValue);
    return {
      externalMedia: Boolean(parsedValue?.externalMedia),
      hasChoice: true,
      isReady: true,
    };
  } catch {
    return { externalMedia: false, hasChoice: false, isReady: true };
  }
}

function storeConsent(externalMedia) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({
      externalMedia,
      updatedAt: new Date().toISOString(),
    })
  );
}

function useConsent() {
  return useContext(ConsentContext);
}

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
  if (
    pathname === "/impressum" ||
    pathname === "/datenschutz" ||
    pathname === "/agb" ||
    pathname === "/cookies"
  ) {
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

function useSeo(title, metaDescription, image = LOGO_SRC) {
  const location = useLocation();

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

    const canonicalUrl = `${SITE_URL}${location.pathname}`;
    const resolvedImage = image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute("href", canonicalUrl);

    const ensureMetaProperty = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    const ensureMetaName = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    ensureMetaProperty("og:title", title || document.title);
    ensureMetaProperty("og:description", metaDescription || "");
    ensureMetaProperty("og:url", canonicalUrl);
    ensureMetaProperty("og:type", "website");
    ensureMetaProperty("og:image", resolvedImage);

    ensureMetaName("twitter:card", "summary_large_image");
    ensureMetaName("twitter:title", title || document.title);
    ensureMetaName("twitter:description", metaDescription || "");
    ensureMetaName("twitter:image", resolvedImage);
  }, [image, location.pathname, metaDescription, title]);
}

function useStructuredData(id, data) {
  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("id", id);
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      const activeScript = document.getElementById(id);
      if (activeScript) activeScript.remove();
    };
  }, [data, id]);
}

function buildBusinessStructuredData() {
  const resolvedLogo = LOGO_SRC.startsWith("http")
    ? LOGO_SRC
    : `${SITE_URL}${LOGO_SRC.startsWith("/") ? LOGO_SRC : `/${LOGO_SRC}`}`;
  const address = BUSINESS_INFO.address || {};
  const hasAddress =
    address.streetAddress ||
    address.postalCode ||
    address.addressLocality ||
    address.addressRegion ||
    address.addressCountry;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Contractor"],
    name: BUSINESS_INFO.name,
    ...(BUSINESS_INFO.legalName ? { legalName: BUSINESS_INFO.legalName } : {}),
    url: BUSINESS_INFO.url,
    image: resolvedLogo,
    logo: resolvedLogo,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    areaServed: BUSINESS_INFO.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  if (hasAddress) {
    schema.address = {
      "@type": "PostalAddress",
      ...(address.streetAddress ? { streetAddress: address.streetAddress } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      ...(address.addressLocality ? { addressLocality: address.addressLocality } : {}),
      ...(address.addressRegion ? { addressRegion: address.addressRegion } : {}),
      ...(address.addressCountry ? { addressCountry: address.addressCountry } : {}),
    };
  }

  if (BUSINESS_INFO.openingHoursSpecification?.length) {
    schema.openingHoursSpecification = BUSINESS_INFO.openingHoursSpecification;
  }

  return schema;
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

  const headerHeightClass = isScrolled ? "h-[4.25rem] sm:h-20" : "h-[4.75rem] sm:h-24";
  const logoSizeClass = isScrolled ? "h-10 sm:h-16" : "h-12 sm:h-20";

  return (
    <header className={headerClass}>
      <div className={`${containerClass} flex ${headerHeightClass} items-center justify-between gap-2 sm:gap-4`}>
        <Link
          to="/"
          className={`inline-flex max-w-[calc(100%-4.5rem)] items-center gap-2 rounded-lg px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
            reduceMotion ? "" : "transition-all duration-300"
          }`}
        >
          <img src={LOGO_SRC} alt={`${COMPANY_NAME} Logo`} className={`${logoSizeClass} w-auto`} />
          <span className="hidden sm:inline text-base font-black tracking-tight text-red-600 lg:text-lg">
            TEAMWORK
          </span>
          <span className="hidden sm:inline text-base font-semibold tracking-tight text-gray-600 lg:text-lg">
            CONSTRUCTION
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
          className={`inline-flex items-center justify-center rounded-xl border p-2.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 lg:hidden ${
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
  const topOffsetClass = isScrolled ? "top-[4.25rem] sm:top-20" : "top-[4.75rem] sm:top-24";
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
      className={`fixed inset-x-0 bottom-0 z-40 overflow-hidden rounded-t-3xl border-t border-red-100 bg-white/98 shadow-2xl shadow-red-100/60 transition-all lg:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
      } ${topOffsetClass}`}
      style={{ transitionDuration: `${panelDurationMs}ms`, transitionTimingFunction: easing }}
      role="dialog"
      aria-label="Mobiles Menü"
    >
      <div
        className={`${containerClass} max-h-[calc(100dvh-5.5rem)] space-y-5 overflow-y-auto py-5`}
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">Navigation</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
            onClick={onNavigate}
          >
            WhatsApp direkt
          </a>
        </div>
        <nav className="grid gap-2" aria-label="Mobile Navigation">
          {HEADER_LINKS.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `rounded-2xl border px-4 py-3.5 text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  isActive
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
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
          className={`grid gap-2 border-t border-gray-100 pt-4 min-[420px]:grid-cols-2 transition-all ${
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
    <div className="fixed inset-x-3 bottom-3 z-[60] sm:hidden">
      <div
        className="grid grid-cols-2 gap-2 rounded-2xl border border-red-200 bg-white/95 p-2 shadow-2xl shadow-red-100/70 backdrop-blur"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={PHONE_TEL}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm font-bold text-red-700 shadow-sm transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Anrufen
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

function SectionHeading({ label, title, subtitle, as: Tag = "h2" }) {
  return (
    <div className="mb-7 sm:mb-10">
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-red-600 sm:text-xs sm:tracking-widest">
        {label}
      </p>
      <Tag className="text-[1.9rem] font-black uppercase leading-[1.02] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      <div className="mt-3 h-1.5 w-14 rounded-full bg-red-600 sm:mt-4 sm:w-16" aria-hidden="true" />
      {subtitle ? <p className="mt-3 max-w-3xl text-[0.97rem] leading-relaxed text-gray-600 sm:mt-4 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function CardGrid({ items, gridClassName, renderItem }) {
  return <div className={`grid gap-4 sm:gap-6 ${gridClassName}`}>{items.map(renderItem)}</div>;
}

function BeforeAfterPair({ pair, compact = false }) {
  const imageClassName = compact ? "h-24 sm:h-28" : "h-36 sm:h-44";

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-3">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gray-500">{pair.label}</p>
      <div className={`mt-3 grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        <figure className="space-y-2">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gray-500">
            Vorher
          </span>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <ConsentImage src={pair.before} alt={pair.beforeAlt} loading="lazy" className={`${imageClassName} w-full object-cover`} />
          </div>
        </figure>
        <figure className="space-y-2">
          <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-green-700">
            Nachher
          </span>
          <div className="overflow-hidden rounded-xl border border-green-200 bg-white">
            <ConsentImage src={pair.after} alt={pair.afterAlt} loading="lazy" className={`${imageClassName} w-full object-cover`} />
          </div>
        </figure>
      </div>
    </div>
  );
}

function ProjectCard({ project, compact = false }) {
  const pairs = compact ? project.beforeAfter.slice(0, 1) : project.beforeAfter;

  return (
    <article className={`${cardClass} overflow-hidden`}>
      <ConsentImage
        src={project.image}
        alt={project.imageAlt || project.title}
        loading="lazy"
        className={`${compact ? "h-44 sm:h-48" : "h-52 sm:h-60"} w-full object-cover`}
      />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">{project.category}</span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
            {project.location}
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">
            Dauer: {project.duration}
          </span>
        </div>

        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gray-500">Projekt {project.id}</p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900">{project.title}</h3>
        </div>

        <p className="text-sm leading-relaxed text-gray-600">{project.summary}</p>

        {!compact && project.highlights?.length ? (
          <ul className="space-y-2 text-sm text-gray-700">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-red-600" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="space-y-3">
          {pairs.map((pair) => (
            <BeforeAfterPair key={pair.id} pair={pair} compact={compact} />
          ))}
        </div>

        {compact && project.beforeAfter.length > 1 ? (
          <p className="text-xs font-medium text-gray-500">+ {project.beforeAfter.length - 1} weiteres Vorher/Nachher auf der Projektseite</p>
        ) : null}
      </div>
    </article>
  );
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

function ConsentImage({ src, alt, className = "", loading = "lazy" }) {
  const { preferences } = useConsent();
  const requiresConsent = isRemoteAssetUrl(src);

  if (!requiresConsent || preferences.externalMedia) {
    return <img src={src} alt={alt} loading={loading} className={className} />;
  }

  return (
    <div
      role="img"
      aria-label={`${alt}. Bild wird erst nach Ihrer Einwilligung zu externen Medien geladen.`}
      className={`relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-red-50 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_42%)]"
        aria-hidden="true"
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center">
        <img src={LOGO_SRC} alt="" aria-hidden="true" className="h-12 w-auto opacity-90 sm:h-14" />
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-700 sm:text-xs sm:tracking-widest">
          Externe Medien blockiert
        </p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">
          Dieses Bild wird erst nach Ihrer Zustimmung zu externen Medien geladen.
        </p>
      </div>
    </div>
  );
}

function ConsentBanner() {
  const {
    hasChoice,
    isBannerOpen,
    isReady,
    acceptNecessaryOnly,
    acceptExternalMedia,
    closeSettings,
  } = useConsent();

  if (!isReady || !isBannerOpen) return null;

  const neutralButtonClass =
    "inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";
  const accentButtonClass =
    "inline-flex min-h-12 items-center justify-center rounded-xl border border-red-600 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/80 backdrop-blur sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">Cookie-Einstellungen</p>
            <h2 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
              Externe Medien erst nach Einwilligung
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              Diese Website setzt aktuell keine Analyse- oder Marketing-Cookies ein. Externe Bilder von
              Pexels und Unsplash laden wir aber nur nach Ihrer Einwilligung, weil dabei personenbezogene
              Daten wie Ihre IP-Adresse an Drittanbieter übertragen werden können.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-center">
            <button type="button" onClick={acceptNecessaryOnly} className={neutralButtonClass}>
              Nur notwendige
            </button>
            <button type="button" onClick={acceptExternalMedia} className={accentButtonClass}>
              Externe Medien akzeptieren
            </button>
            <NavLink
              to="/datenschutz"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              onClick={closeSettings}
            >
              Datenschutz
            </NavLink>
            {hasChoice ? (
              <button
                type="button"
                onClick={closeSettings}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Schließen
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentSettingsButton() {
  const { hasChoice, isReady, openSettings } = useConsent();

  if (!isReady || !hasChoice) return null;

  return (
    <button
      type="button"
      onClick={openSettings}
      className="fixed bottom-24 left-3 z-[65] inline-flex min-h-11 items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-lg shadow-gray-200/80 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:bottom-6 sm:left-6 sm:text-sm"
    >
      Cookie-Einstellungen
    </button>
  );
}

function HeroSplit({ eyebrow, title, subtitle, image, alt, primaryCta, secondaryCta, chips }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-white pb-12 pt-24 sm:pb-16 sm:pt-36">
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

      <div className={`${containerClass} relative grid gap-6 lg:grid-cols-12 lg:items-end`}>
        <Reveal className="anim-hero-enter lg:col-span-7">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gray-500 sm:text-xs sm:tracking-widest">
            {eyebrow}
          </p>
          <div className="mt-3 h-1.5 w-12 rounded-full bg-red-600 sm:mt-4 sm:w-14" aria-hidden="true" />
          <h1 className="mt-4 text-[2rem] font-black leading-[1.02] tracking-tight text-gray-900 min-[390px]:text-[2.2rem] sm:mt-5 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-gray-600 sm:mt-5 sm:text-lg">{subtitle}</p>

          <div className="mt-6 grid gap-2.5 sm:mt-7 sm:flex sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">
            {primaryCta}
            {secondaryCta}
          </div>

          {chips ? (
            <div className="mt-5 flex flex-wrap gap-2 sm:overflow-x-auto sm:pb-1 sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-red-100 bg-white px-3 py-1.5 text-[0.72rem] font-medium text-gray-600 sm:whitespace-nowrap sm:text-xs"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </Reveal>

        <Reveal className="lg:col-span-5" delay={130}>
          <div className={`${cardClass} overflow-hidden`}>
            <ConsentImage
              src={image}
              alt={alt}
              loading="lazy"
              className="h-[250px] w-full object-cover transition duration-700 hover:scale-[1.03] min-[420px]:h-[300px] sm:h-[420px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatBar() {
  return (
    <div className={`${cardClass} border-red-200 p-4 sm:p-6`}>
      <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-4 sm:gap-4 sm:pb-5">
        {KPIS.map((item) => (
          <div key={item.label} className="rounded-xl border border-red-100 bg-red-50/60 p-3 sm:p-4">
            <p
              aria-label={item.ariaLabel || item.value}
              className="text-xl font-black tracking-tight text-red-700 min-[420px]:text-2xl sm:text-4xl"
            >
              {item.value}
            </p>
            <p className="mt-1 text-[11px] leading-tight font-medium text-gray-600 sm:text-sm">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
        {BADGES.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center rounded-full border border-red-100 bg-white px-2.5 py-1.5 text-[11px] font-medium text-gray-700 sm:px-3 sm:text-xs"
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
      website: "",
    }),
    []
  );

  const [formData, setFormData] = useState({ ...emptyData, service: prefill.service, location: prefill.location });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setFormData({ ...emptyData, service: prefill.service, location: prefill.location });
    setErrors({});
    setSuccess(false);
    setSubmitting(false);
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
    setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step === 1) {
      handleNextStep();
      return;
    }

    if (submitting) return;

    const nextErrors = { ...validateStepOne(), ...validateStepTwo() };

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSuccess(false);
      if (nextErrors.name || nextErrors.phone || nextErrors.service) {
        setStep(1);
      }
      return;
    }

    const serviceLabel = SERVICES.find((service) => service.id === formData.service)?.title || formData.service;
    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      service: serviceLabel,
      location: formData.location.trim(),
      message: formData.message.trim(),
      wantsKfw: Boolean(formData.wantsKfw),
      source: prefill.source || "website",
      website: formData.website.trim(),
    };

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Versand fehlgeschlagen. Bitte telefonisch oder per WhatsApp anfragen.");
      }

      setSuccess(true);
      setErrors({});
      setFormData({ ...emptyData, service: prefill.service, location: prefill.location });
      setStep(1);
    } catch (error) {
      setSuccess(false);
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : "Versand fehlgeschlagen. Bitte telefonisch oder per WhatsApp anfragen.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const inputBaseClass =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:py-2.5 sm:text-sm";
  const primaryActionClass = `${primaryBtnClass} disabled:pointer-events-none disabled:opacity-60`;
  const secondaryActionClass = `${secondaryBtnClass} disabled:pointer-events-none disabled:opacity-60`;

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting} className={`${cardClass} p-4 sm:p-6`}>
      <h3 className="text-lg font-semibold text-gray-900">Projektanfrage senden</h3>
      <p className="mt-1 text-sm text-gray-600">
        Wir melden uns mit einem klaren nächsten Schritt. Fragen zur KfW-Förderberatung können Sie direkt angeben.
      </p>

      <div className="mt-4 rounded-xl border border-red-100 bg-red-50/60 p-3">
        <div className="grid grid-cols-2 gap-2">
          <div className={`rounded-xl border px-3 py-2 ${step === 1 ? "border-red-200 bg-white text-red-700" : "border-red-100 bg-transparent text-gray-500"}`}>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${step === 1 ? "bg-red-600 text-white" : "bg-white text-red-700"}`}>
              1
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]">Kontaktdaten</p>
          </div>
          <div className={`rounded-xl border px-3 py-2 ${step === 2 ? "border-red-200 bg-white text-red-700" : "border-red-100 bg-transparent text-gray-500"}`}>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${step === 2 ? "bg-red-600 text-white" : "bg-white text-red-700"}`}>
              2
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]">Projektdetails</p>
          </div>
        </div>
      </div>

      {prefill.source ? (
        <p className="mt-3 text-xs text-gray-500">Anfragekontext: {prefill.source.replace(/-/g, " ")}</p>
      ) : null}

      <label className="sr-only" aria-hidden="true">
        Website
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          className="sr-only"
        />
      </label>

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

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {step === 1 ? (
          <button type="button" onClick={handleNextStep} className={primaryActionClass} disabled={submitting}>
            Weiter
          </button>
        ) : (
          <>
            <button type="button" onClick={() => setStep(1)} className={secondaryActionClass} disabled={submitting}>
              Zurück
            </button>
            <button type="submit" className={primaryActionClass} disabled={submitting}>
              {submitting ? "Wird gesendet..." : "Anfrage senden"}
            </button>
          </>
        )}
        <a href={PHONE_TEL} className={secondaryBtnClass}>
          Lieber direkt anrufen
        </a>
      </div>

      {errors.submit ? (
        <p
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          aria-live="assertive"
        >
          {errors.submit}
        </p>
      ) : null}

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
                  to="/leistungen/renovierung-modernisierung"
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
              <ConsentImage
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
            <div className={mobileCarouselTrackClass}>
              {homeServicePreview.map((service, index) => {
                const serviceSeoPage = SERVICE_SEO_BY_ID[service.id];
                const serviceDetailPath = serviceSeoPage ? `/leistungen/${serviceSeoPage.slug}` : "/leistungen";

                return (
                  <Reveal key={service.id} delay={index * 80} className={mobileCarouselItemClass}>
                    <article className={`${cardClass} overflow-hidden`}>
                      <ConsentImage
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-40 w-full object-cover transition duration-700 hover:scale-[1.03]"
                      />
                      <div className="p-4">
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
                      <ConsentImage
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
                <Link to="/leistungen/renovierung-modernisierung" className={secondaryBtnClass}>
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
            <div className={mobileCarouselTrackClass}>
              {STEPS.map((step, index) => (
                <Reveal key={step.id} delay={index * 80} className={mobileCarouselItemClass}>
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
              subtitle="Die Vorschau zeigt echte Vorher/Nachher-Projekte. Auf der Projektseite sehen Sie weitere Umbauten mit Bildpaaren, Zeitrahmen und kurzem Leistungsumfang."
            />
          </Reveal>

          <div className="md:hidden">
            <div className={mobileCarouselTrackClass}>
              {homeProjectPreview.map((project, index) => (
                <Reveal key={project.id} delay={index * 80} className={mobileCarouselItemClass}>
                  <ProjectCard project={project} compact />
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
                  <ProjectCard project={project} compact />
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
            <div className="relative overflow-hidden rounded-2xl border border-red-300 bg-gradient-to-r from-red-600 to-red-700 p-5 text-white shadow-lg sm:p-8">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-widest text-red-100">Kontakt</p>
              <h2 className="mt-3 max-w-3xl text-[1.9rem] font-black uppercase leading-tight tracking-tight sm:text-4xl">
                STARTSEITE GESEHEN.
                <br />
                NÄCHSTER SCHRITT: ANFRAGE.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-red-50 sm:text-base">
                Telefon, WhatsApp oder Formular: Wir melden uns werktags innerhalb von 24-48 Stunden und besprechen mit Ihnen den sinnvollsten Startpunkt.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                  <ConsentImage
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
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
              <Link to="/leistungen/renovierung-modernisierung" className={primaryBtnClass}>
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
        subtitle="Echte Vorher/Nachher-Aufnahmen aus unseren Projekten, mit unterschiedlichen Ausgangslagen und sauber dokumentierten Ergebnissen."
        image={IMAGE_SOURCES.projekteHero}
        alt="Fertiggestellter Wohnbereich mit neuer Glasfront zum Garten"
        primaryCta={<Link to={buildContactPath({ source: "projekte-hero" })} className={primaryBtnClass}>Ähnliches Projekt planen</Link>}
        secondaryCta={<Link to="/leistungen" className={secondaryBtnClass}>Leistungen entdecken</Link>}
      />

      <section className="bg-gradient-to-b from-gray-50 to-white py-14 sm:py-16">
        <div className={containerClass}>
          <CardGrid
            items={PROJECTS}
            gridClassName="lg:grid-cols-2"
            renderItem={(project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <ProjectCard project={project} />
              </Reveal>
            )}
          />

          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/60 p-5 sm:p-6">
            <p className="text-sm font-medium text-red-800">
              Jede Referenz zeigt echte Projektbilder mit klaren Vorher/Nachher-Paaren. Ort und Zeitrahmen sind bewusst kompakt gehalten, damit die bauliche Veraenderung im Vordergrund steht.
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
                  <ConsentImage
                    src={step.image}
                    alt={`Schritt ${step.id}: ${step.title}`}
                    loading="lazy"
                    className="h-36 w-full object-cover"
                  />
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
                    to="/leistungen/renovierung-modernisierung"
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

              <article className={`${cardClass} p-4 sm:p-6`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Telefon</p>
                <div className="mt-2 flex flex-col items-start gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                  <p className="text-lg font-semibold text-gray-900 min-[420px]:text-xl">{PHONE_DISPLAY}</p>
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
                <ConsentImage
                  src={IMAGE_SOURCES.kontaktHero}
                  alt="Kontaktmotiv Teamwork Construction"
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col items-start gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
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
              <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
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
  useSeo(`${page.title} | ${COMPANY_NAME}`, page.metaDescription || page.subtitle);
  const pdfHref =
    pageKey === "datenschutz"
      ? `${import.meta.env.BASE_URL}documents/datenschutz.pdf`
      : pageKey === "agb"
        ? `${import.meta.env.BASE_URL}documents/agb.pdf`
        : null;

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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <p className="text-base leading-relaxed text-gray-700">{page.intro}</p>
              {pdfHref ? (
                <a href={pdfHref} className={secondaryBtnClass} download>
                  PDF herunterladen
                </a>
              ) : null}
            </div>
            <div className="mt-6 space-y-4">
              {page.sections.map((section) => (
                <article key={section.heading} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">{section.heading}</h2>
                  <div className="mt-3 space-y-3">
                    {(section.paragraphs || (section.text ? [section.text] : [])).map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                        {paragraph}
                      </p>
                    ))}
                    {section.list?.length ? (
                      <ul className="space-y-2">
                        {section.list.map((item) => (
                          <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
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
  const redirectedSlug = slug ? SERVICE_SEO_REDIRECTS[slug] : "";
  if (redirectedSlug) {
    return <Navigate to={`/leistungen/${redirectedSlug}`} replace />;
  }

  const seoPage = slug ? SERVICE_SEO_BY_SLUG[slug] : null;
  if (!seoPage) return <Navigate to="/leistungen" replace />;

  const service = SERVICES.find((item) => item.id === seoPage.serviceId);
  if (!service) return <Navigate to="/leistungen" replace />;

  useSeo(seoPage.title, seoPage.metaDescription, service.image);

  const faqStructuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seoPage.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
    [seoPage.faq]
  );
  useStructuredData("service-faq-schema", faqStructuredData);

  const serviceRequestPath = buildContactPath({
    serviceId: service.id,
    source: `seo-${seoPage.slug}`,
  });
  const serviceWhatsappHref = buildWhatsappLink({
    serviceId: service.id,
    source: `seo-${seoPage.slug}`,
  });
  const relatedServiceLinks = (seoPage.relatedServiceIds || [])
    .map((serviceId) => {
      const relatedSeoPage = SERVICE_SEO_BY_ID[serviceId];
      const relatedService = SERVICE_BY_ID[serviceId];
      if (!relatedSeoPage || !relatedService) return null;

      return {
        to: `/leistungen/${relatedSeoPage.slug}`,
        label: `${relatedService.title} in Bremen`,
      };
    })
    .filter(Boolean);

  return (
    <>
      <HeroSplit
        eyebrow={`Leistung · ${REGION}`}
        title={seoPage.headline}
        subtitle={seoPage.intro}
        image={service.image}
        alt={`${service.title} in ${REGION}`}
        primaryCta={
          <Link to={serviceRequestPath} className={primaryBtnClass}>
            Angebot anfragen
          </Link>
        }
        secondaryCta={
          <a href={serviceWhatsappHref} target="_blank" rel="noreferrer" className={whatsappBtnClass}>
            WhatsApp
          </a>
        }
        chips={seoPage.usps}
      />

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <div className={`${cardClass} border-red-200 bg-red-50/70 p-6 sm:p-8`}>
              <p className="text-xs font-semibold uppercase tracking-widest text-red-700">Klarer Fokus</p>
              <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-3xl">
                {seoPage.leadSentence}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
                {service.description} {service.text}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {seoPage.usps.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-red-100 bg-white px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600">Ablauf</p>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                In 3 Schritten zu Ihrem {service.title}
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                Sie wissen jederzeit, was als Nächstes passiert und worauf wir den Fokus legen.
              </p>
            </div>
          </Reveal>

          <CardGrid
            items={seoPage.process}
            gridClassName="lg:grid-cols-3"
            renderItem={(step, index) => (
              <Reveal key={step.title} delay={index * 80}>
                <article className={`${cardClass} h-full p-5 sm:p-6`}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
                    Schritt {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.text}</p>
                </article>
              </Reveal>
            )}
          />
        </div>
      </section>

      <section className="bg-gray-50 py-12 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600">Referenzen</p>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Typische Projekte und Bildbeispiele
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                Drei typische Einsätze, wie diese Leistung in Bremen und Umgebung umgesetzt wird.
              </p>
            </div>
          </Reveal>

          <CardGrid
            items={seoPage.references}
            gridClassName="lg:grid-cols-3"
            renderItem={(reference, index) => (
              <Reveal key={`${reference.title}-${reference.location}`} delay={index * 90}>
                <article className={`${cardClass} h-full overflow-hidden`}>
                  <ConsentImage
                    src={reference.image}
                    alt={`${reference.title} in ${reference.location}`}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      {reference.location}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{reference.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{reference.summary}</p>
                  </div>
                </article>
              </Reveal>
            )}
          />
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className={`${containerClass} grid gap-6 lg:grid-cols-12`}>
          <div className="lg:col-span-8">
            <Reveal>
              <div className="mb-8 flex flex-col gap-3 sm:mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-600">FAQ</p>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                  Häufige Fragen zu {service.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                  Kosten, Dauer, Ablauf und Material beantworten wir frühzeitig, damit Sie schneller entscheiden können.
                </p>
              </div>
            </Reveal>

            <div className="space-y-3">
              {seoPage.faq.map((item, index) => (
                <Reveal key={item.question} delay={index * 70}>
                  <details className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-900 sm:text-base">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={120} className="lg:sticky lg:top-28">
              <aside className={`${cardClass} border-red-200 bg-red-50/70 p-5 sm:p-6`}>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700">Anfrage starten</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-gray-900">
                  Angebot oder WhatsApp
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Wenn Sie schon Fotos, Maße oder eine kurze Beschreibung haben, können wir schneller einschätzen, was sinnvoll ist.
                </p>
                <div className="mt-5 grid gap-3">
                  <Link to={serviceRequestPath} className={`w-full ${primaryBtnClass}`}>
                    Angebot anfragen
                  </Link>
                  <a
                    href={serviceWhatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full ${whatsappBtnClass}`}
                  >
                    WhatsApp starten
                  </a>
                </div>
                <div className="mt-5 space-y-2 border-t border-red-200 pt-4">
                  <p className="text-sm font-medium text-gray-700">Werktags Rückmeldung meist in 24-48h</p>
                  <p className="text-sm font-medium text-gray-700">Direkte Abstimmung ohne unnötige Schleifen</p>
                  <p className="text-sm font-medium text-gray-700">Einsatzgebiet: Bremen und Umgebung</p>
                </div>
                <div className="mt-5 border-t border-red-200 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Mehr Übersicht</p>
                  <div className="mt-3 space-y-2">
                    <Link
                      to="/leistungen"
                      className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                    >
                      Alle Leistungen ansehen
                    </Link>
                    <Link
                      to="/projekte"
                      className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                    >
                      Projekte ansehen
                    </Link>
                    <Link
                      to="/kontakt"
                      className="block text-sm font-semibold text-red-700 underline decoration-red-300 underline-offset-4 hover:text-red-800"
                    >
                      Kontaktseite öffnen
                    </Link>
                  </div>
                </div>
                {relatedServiceLinks.length ? (
                  <div className="mt-5 border-t border-red-200 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Weitere Leistungen in Bremen & Umgebung
                    </p>
                    <div className="mt-3 space-y-2">
                      {relatedServiceLinks.map((item) => (
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
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-red-600 py-12 sm:py-16">
        <div className={containerClass}>
          <Reveal>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl shadow-red-900/20 backdrop-blur sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-red-100">Nächster Schritt</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {seoPage.leadSentence}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-red-50 sm:text-base">
                Senden Sie uns kurz Ihr Vorhaben. Wenn Sie möchten, direkt mit Fotos per WhatsApp.
              </p>
              <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                <Link
                  to={serviceRequestPath}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-50"
                >
                  Angebot anfragen
                </Link>
                <a
                  href={serviceWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
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
        { to: "/leistungen/renovierung-modernisierung", label: "Renovierung in Bremen" },
        { to: "/leistungen/gartenarbeit-sportanlagen", label: "Gartenarbeit & Sportanlagen" },
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
  const [consentState, setConsentState] = useState({
    externalMedia: false,
    hasChoice: false,
    isReady: false,
  });
  const [consentSettingsOpen, setConsentSettingsOpen] = useState(false);
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
  const businessStructuredData = useMemo(() => buildBusinessStructuredData(), []);
  useStructuredData("business-schema", businessStructuredData);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const showConsentBanner =
    consentState.isReady && (!consentState.hasChoice || consentSettingsOpen);
  const applyConsentChoice = (externalMedia) => {
    storeConsent(externalMedia);
    setConsentState({
      externalMedia,
      hasChoice: true,
      isReady: true,
    });
    setConsentSettingsOpen(false);
  };
  const consentContextValue = useMemo(
    () => ({
      preferences: { externalMedia: consentState.externalMedia },
      hasChoice: consentState.hasChoice,
      isReady: consentState.isReady,
      isBannerOpen: showConsentBanner,
      openSettings: () => setConsentSettingsOpen(true),
      closeSettings: () => setConsentSettingsOpen(false),
      acceptNecessaryOnly: () => applyConsentChoice(false),
      acceptExternalMedia: () => applyConsentChoice(true),
    }),
    [consentState.externalMedia, consentState.hasChoice, consentState.isReady, showConsentBanner]
  );

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    setConsentState(readStoredConsent());
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
    <ConsentContext.Provider value={consentContextValue}>
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
        {!showConsentBanner ? <DesktopActionBar whatsappHref={whatsappHref} /> : null}
        <MobileActionBar hidden={menuOpen || showConsentBanner} whatsappHref={whatsappHref} />
        <ConsentSettingsButton />
        <ConsentBanner />

        <main className="pb-32 sm:pb-0">
          <Outlet />
        </main>

        <footer className="border-t border-red-100 bg-gray-50 py-8 pb-28 sm:pb-8">
          <div className={`${containerClass} flex flex-col gap-4 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left`}>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <img src={LOGO_SRC} alt={`${COMPANY_NAME} Logo`} className="h-14 w-auto sm:h-16" />
              <p>© {new Date().getFullYear()} {COMPANY_NAME}. Alle Rechte vorbehalten.</p>
            </div>
            <nav aria-label="Footer Links" className="flex flex-wrap justify-center gap-4 sm:justify-start">
              {FOOTER_LINKS.map((item) => (
                <NavLink key={item.to} to={item.to} className="transition hover:text-red-700">
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </footer>
      </div>
    </ConsentContext.Provider>
  );
}

export default function TeamworkLanding() {
  return (
    <BrowserRouter>
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
          <Route path="/agb" element={<LegalPage pageKey="agb" />} />
          <Route path="/cookies" element={<Navigate to="/datenschutz" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
