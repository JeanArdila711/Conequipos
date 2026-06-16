import type { Metadata } from "next";
import { ScrollPaintText } from "@/components/scroll-paint-text";

export const metadata: Metadata = {
  title: "Experiencias",
  description:
    "Lo que dicen las obras y constructores que mantienen su producción en movimiento con Conequipos.",
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  sector: string;
  equipo: string;
  year: string;
  initials: string;
  /** Acento de la tarjeta. */
  accent?: "brand" | "hazard";
  /** Tamaño en la grilla bento (columnas de 6). */
  span?: 2 | 3 | 4;
};

// Reseña destacada — abre la sección con peso editorial.
const FEATURED: Testimonial = {
  quote:
    "Teníamos una fundida a primera hora y el vibrador nos falló la noche anterior. Llamamos a Conequipos, mandaron reemplazo a la obra antes de las 6 a.m. y no perdimos el vaciado. Eso no se paga.",
  name: "Carlos Restrepo",
  role: "Director de obra",
  location: "Edificación · Sabaneta",
  sector: "Edificación",
  equipo: "Vibrador de concreto",
  year: "2025",
  initials: "CR",
  accent: "brand",
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "La logística fue impecable. El equipo llegó a tiempo y el soporte estuvo siempre disponible. Ya vamos por el cuarto alquiler.",
    name: "Marcela Ospina",
    role: "Gerente de proyecto",
    location: "Residencial · Medellín",
    sector: "Vivienda",
    equipo: "Torregrúa + montacargas",
    year: "2025",
    initials: "MO",
    accent: "brand",
    span: 3,
  },
  {
    quote:
      "Cotizaron en minutos y resolvieron una urgencia el mismo día. Maquinaria en perfecto estado, sin sorpresas.",
    name: "Jhon Gómez",
    role: "Contratista de obra civil",
    location: "Movimiento de tierra · Itagüí",
    sector: "Infraestructura",
    equipo: "Compactador + minicargador",
    year: "2024",
    initials: "JG",
    accent: "hazard",
    span: 3,
  },
  {
    quote:
      "Nos recomendaron el equipo correcto en vez del más caro. Esa asesoría nos ahorró plata real en el presupuesto.",
    name: "Ingeniera residente",
    role: "Coordinación técnica",
    location: "Edificación · Sabaneta",
    sector: "Edificación",
    equipo: "Generador 60 kVA",
    year: "2024",
    initials: "IR",
    accent: "brand",
    span: 2,
  },
  {
    quote:
      "Cumplen lo que prometen. Disponibilidad, precio claro y entrega puntual en cada alquiler. Sin letra menuda.",
    name: "Diego Henao",
    role: "Jefe de compras",
    location: "Infraestructura · Rionegro",
    sector: "Vías",
    equipo: "Compresor + martillos",
    year: "2025",
    initials: "DH",
    accent: "brand",
    span: 4,
  },
  {
    quote:
      "Trabajamos con varios proveedores y Conequipos es el único que contesta a la primera. Para una obra, eso lo es todo.",
    name: "Laura Cardona",
    role: "Superintendente",
    location: "Comercial · Envigado",
    sector: "Comercial",
    equipo: "Plataforma de elevación",
    year: "2023",
    initials: "LC",
    accent: "hazard",
    span: 3,
  },
  {
    quote:
      "Pedimos andamiaje un viernes en la tarde y el lunes ya estaba armándose. Ese ritmo nos mantiene el cronograma.",
    name: "Andrés Mejía",
    role: "Maestro de obra",
    location: "Vivienda · La Estrella",
    sector: "Vivienda",
    equipo: "Andamios multidireccionales",
    year: "2025",
    initials: "AM",
    accent: "brand",
    span: 3,
  },
];

// Disco de iniciales — humaniza la reseña sin foto de stock.
function Avatar({
  initials,
  accent = "brand",
}: {
  initials: string;
  accent?: "brand" | "hazard";
}) {
  return (
    <span
      className={`flex size-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold tabular-nums ${
        accent === "hazard"
          ? "bg-hazard/12 text-hazard"
          : "bg-brand/12 text-brand"
      }`}
    >
      {initials}
    </span>
  );
}

function Stars({ accent = "brand" }: { accent?: "brand" | "hazard" }) {
  return (
    <div
      className={`flex gap-0.5 ${accent === "hazard" ? "text-hazard" : "text-brand"}`}
      aria-label="5 de 5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

function Meta({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-6">
      <Avatar initials={t.initials} accent={t.accent} />
      <div className="min-w-0">
        <p className="truncate font-semibold text-bone">{t.name}</p>
        <p className="truncate text-sm text-mute">{t.role}</p>
      </div>
    </figcaption>
  );
}

export default function ExperienciasPage() {
  return (
    <>
      {/* RESEÑA DESTACADA — encabezado + quote editorial */}
      <section className="container-x pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mb-12 max-w-2xl">
          <span className="kicker">Testimonios</span>
          <ScrollPaintText
            as="h2"
            className="display-lg mt-4 text-balance"
            segments={[
              { text: "No es lo que decimos." },
              { text: "Es lo que cuentan ellos.", to: "#128a3c" },
            ]}
          />
        </div>

        <figure
          data-reveal="scale"
          className="relative grid gap-10 overflow-hidden rounded-3xl border border-line bg-ink-2 p-8 md:p-14 lg:grid-cols-[1.6fr_1fr]"
        >
          {/* Comilla gigante de fondo */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-12 select-none font-display text-[16rem] leading-none text-brand/[0.06] md:text-[22rem]"
          >
            &ldquo;
          </span>

          <div className="relative">
            <Stars accent={FEATURED.accent} />
            <blockquote className="mt-6 font-display text-3xl leading-[1.15] text-balance md:text-[2.6rem]">
              {FEATURED.quote}
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <Avatar initials={FEATURED.initials} accent={FEATURED.accent} />
              <div>
                <p className="font-semibold text-bone">{FEATURED.name}</p>
                <p className="text-sm text-mute">
                  {FEATURED.role} · {FEATURED.location}
                </p>
              </div>
            </div>
          </div>

          {/* Ficha técnica de la reseña — tablero mono */}
          <div className="relative flex flex-col gap-px self-start overflow-hidden rounded-2xl border border-line bg-line">
            {[
              ["Sector", FEATURED.sector],
              ["Equipo", FEATURED.equipo],
              ["Año", FEATURED.year],
              ["Respuesta", "< 8 horas"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-4 bg-ink-2 px-5 py-4"
              >
                <span className="text-xs font-medium text-mute">
                  {k}
                </span>
                <span className="text-right text-sm font-semibold text-bone">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </figure>
      </section>

      {/* BENTO DE RESEÑAS — tamaños variados, ritmo editorial */}
      <section className="container-x pb-20 md:pb-28">
        <div className="grid grid-cols-6 gap-5">
          {TESTIMONIALS.map((t, i) => {
            const span = t.span ?? 3;
            const colClass =
              span === 4
                ? "lg:col-span-4"
                : span === 2
                  ? "lg:col-span-2"
                  : "lg:col-span-3";
            return (
              <figure
                key={i}
                data-reveal="scale"
                className={`group col-span-6 flex flex-col justify-between rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-brand/40 md:col-span-3 md:p-9 ${colClass}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Stars accent={t.accent} />
                    <span className="font-mono text-xs tabular-nums text-mute">
                      {String(i + 1).padStart(2, "0")} / {TESTIMONIALS.length}
                    </span>
                  </div>
                  <blockquote className="mt-5 font-display text-xl leading-snug text-balance text-bone md:text-2xl">
                    {t.quote}
                  </blockquote>
                </div>

                <div>
                  <Meta t={t} />
                  {/* Tags de contexto */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] font-medium text-mute">
                      {t.sector}
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] font-medium text-mute">
                      {t.equipo}
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.7rem] text-mute">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-3.5 w-3.5 text-brand"
                        aria-hidden
                      >
                        <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {t.location.split("·").pop()?.trim()}
                    </span>
                  </div>
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </>
  );
}
