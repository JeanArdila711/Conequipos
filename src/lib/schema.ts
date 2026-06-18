// Datos estructurados schema.org centralizados. NAP (nombre/dirección/teléfono)
// en un solo lugar para SEO local + GEO (que los motores generativos citen bien
// quiénes somos, dónde y a quién atendemos).
import { EMAIL } from "@/lib/utils";
import type { Product } from "@/data/catalog";

export const SITE_URL = "https://conequipos.com.co";
const ORG_ID = `${SITE_URL}/#organization`;
const BIZ_ID = `${SITE_URL}/#localbusiness`;

// Teléfono fijo en formato E.164 (Colombia +57).
const TEL = "+576044441331";
const INSTAGRAM = "https://instagram.com/conequipos_";
const LOGO = `${SITE_URL}/brand/conequipos-logo.png`;

// Ciudades del Valle de Aburrá + región que cubrimos (señal local fuerte).
const AREAS = [
  "Itagüí",
  "Medellín",
  "Envigado",
  "Sabaneta",
  "La Estrella",
  "Bello",
  "Caldas",
  "Rionegro",
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Conequipos",
  legalName: "Conequipos S.A.S.",
  url: SITE_URL,
  logo: LOGO,
  image: LOGO,
  email: EMAIL,
  telephone: TEL,
  description:
    "Alquiler y venta de maquinaria y equipos para construcción en Itagüí y todo el Valle de Aburrá.",
  sameAs: [INSTAGRAM],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: TEL,
    contactType: "sales",
    email: EMAIL,
    areaServed: "CO",
    availableLanguage: ["es-CO", "es"],
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BIZ_ID,
  name: "Conequipos",
  url: SITE_URL,
  logo: LOGO,
  image: LOGO,
  email: EMAIL,
  telephone: TEL,
  priceRange: "$$",
  currenciesAccepted: "COP",
  description:
    "Alquiler de maquinaria y equipos para construcción en Itagüí y el Valle de Aburrá: concreto, compactación, elevación, generadores, compresores, andamios e iluminación. Entrega en obra y soporte técnico.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Itagüí",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.1719,
    longitude: -75.6116,
  },
  areaServed: [
    { "@type": "State", name: "Antioquia" },
    ...AREAS.map((name) => ({ "@type": "City", name })),
  ],
  // Horario estimado — confirmar y ajustar si difiere.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "12:00",
    },
  ],
  sameAs: [INSTAGRAM],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Conequipos",
  inLanguage: "es-CO",
  publisher: { "@id": ORG_ID },
};

// FAQ para GEO: que los motores generativos respondan lo esencial del negocio.
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Dónde está Conequipos y a qué zonas llega?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estamos en Itagüí, Antioquia, y llevamos equipos a toda el área metropolitana del Valle de Aburrá (Medellín, Envigado, Sabaneta, La Estrella, Bello, Caldas) y la región.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué equipos de construcción alquilan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alquilamos maquinaria para concreto, compactación, elevación, generadores, compresores de aire, andamios y formaletas, iluminación y accesorios. Todos certificados y con mantenimiento.",
      },
    },
    {
      "@type": "Question",
      name: "¿Entregan y recogen el equipo en la obra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Coordinamos la logística de entrega y recogida en tu obra, y damos soporte técnico durante todo el alquiler.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo cotizo el alquiler de un equipo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Escríbenos por WhatsApp o correo con el equipo y las fechas. Respondemos rápido con disponibilidad, precio y entrega.",
      },
    },
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function productSchema(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.slug,
    ...(p.image ? { image: [`${SITE_URL}${p.image}`] } : {}),
    description:
      p.description ||
      `Alquiler de ${p.name} para construcción en Itagüí, Medellín y el Valle de Aburrá.`,
    ...(p.categoryNames[0] ? { category: p.categoryNames[0] } : {}),
    brand: { "@type": "Brand", name: "Conequipos" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/equipos/${p.slug}`,
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
      seller: { "@id": ORG_ID },
      areaServed: { "@type": "State", name: "Antioquia" },
    },
  };
}
