import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "@/components/quote-form";
import { ScrollPaintText } from "@/components/scroll-paint-text";
import { Magnetic } from "@/components/magnetic";
import { WhatsAppIcon, ArrowRight } from "@/components/icons";
import { EMAIL, PHONE, WHATSAPP_DISPLAY, waLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotiza el alquiler de equipos para construcción. WhatsApp, correo y teléfono. Medellín e Itagüí, Antioquia.",
};

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
    <path d="M5 4h4l1.5 5L8 10.5a12 12 0 0 0 5.5 5.5L15 14l5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const CHANNELS: {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
}[] = [
  {
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: waLink("Hola Conequipos, quiero cotizar un equipo."),
    icon: <WhatsAppIcon className="h-5 w-5" />,
  },
  { label: "Correo", value: EMAIL, href: `mailto:${EMAIL}`, icon: MailIcon },
  {
    label: "Teléfono fijo",
    value: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
    icon: PhoneIcon,
  },
  {
    label: "Ubicación",
    value: "Itagüí, Antioquia · Colombia",
    icon: PinIcon,
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        kicker="Hablemos"
        title="Cotiza tu equipo hoy"
        description="Respondemos rápido. Cuéntanos qué necesitas y coordinamos disponibilidad, precio y entrega."
      />

      <section className="container-x grid gap-10 -mt-10 pb-16 md:-mt-20 md:pb-24 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        {/* Columna izquierda: canales + horario */}
        <div className="flex flex-col gap-6">
          {/* Canales con icono — cada uno enlaza a su acción */}
          <div data-reveal="left" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {CHANNELS.map((c) => {
              const inner = (
                <div className="group flex items-center gap-4 bg-ink-2 p-5 transition-colors hover:bg-ink-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    {c.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-mute">
                      {c.label}
                    </p>
                    <p className="truncate font-display text-lg text-bone">
                      {c.value}
                    </p>
                  </div>
                </div>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>

          {/* Horario / promesa */}
          <div
            data-reveal="left"
            className="flex flex-1 flex-col justify-between rounded-2xl border border-line bg-ink-2 p-7 md:p-8"
          >
            <div>
              <h2 className="font-display text-2xl leading-tight md:text-3xl">
                Lunes a sábado, en horario de obra
              </h2>
              <p className="mt-4 text-sm text-mute">
                Coordinamos entregas y recogidas según el ritmo de tu proyecto.
                Para urgencias, WhatsApp es el canal más rápido.
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line text-center">
              <div className="bg-ink-2 px-3 py-4">
                <dt className="text-xs font-medium text-mute">Cobertura</dt>
                <dd className="mt-1 font-display text-lg leading-tight">
                  Medellín &amp; Antioquia
                </dd>
              </div>
              <div className="bg-ink-2 px-3 py-4">
                <dt className="text-xs font-medium text-mute">Respuesta</dt>
                <dd className="mt-1 font-display text-lg leading-tight">
                  El mismo día
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Columna derecha: formulario protagonista */}
        <div data-reveal="right">
          <QuoteForm />
        </div>
      </section>

      {/* CTA — cierre fuerte */}
      <section className="container-x pb-24 md:pb-32">
        <h2 className="display-lg mb-8 text-center text-balance">Escríbenos</h2>
        <div className="relative isolate flex flex-col items-center overflow-hidden rounded-3xl border border-line bg-ink-2 px-6 py-20 text-center md:py-28">
          <div
            className="pointer-events-none absolute -bottom-1/2 left-1/2 -z-10 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-[0.12] blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-brand) 0%, transparent 65%)",
            }}
          />
          <span className="kicker">Tu obra es la próxima</span>
          <ScrollPaintText
            as="h2"
            className="display-lg mt-5 max-w-[16ch] text-balance"
            text="Pon tu obra en este muro."
          />
          <p className="mt-6 max-w-md text-balance text-lg text-mute">
            Cotiza el equipo que necesitas hoy. Sin vueltas, con respuesta el
            mismo día.
          </p>
          <Magnetic className="mt-10">
            <a
              href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Escribir por WhatsApp
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
