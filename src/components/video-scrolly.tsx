import Link from "next/link";
import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { HeroStage } from "@/components/hero-stage";
import { waLink } from "@/lib/utils";

export function VideoScrolly() {
  return (
    <section className="container-x flex min-h-svh flex-col justify-center pt-28 pb-12 md:pt-32">
      {/* ---------- Mobile: apilado simple ---------- */}
      <div className="md:hidden">
        <h1 className="font-display font-bold display-lg">
          Maquinaria que <span className="text-brand">no para tu obra.</span>
        </h1>
        <p className="mt-5 text-lg text-mute">
          Equipos certificados y mantenidos, listos para producir desde el
          primer día. Alquiler en Itagüí y todo el Valle de Aburrá.
        </p>
        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl border border-line bg-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/obra-1.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/equipos"
            className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            Ver catálogo
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href={waLink("Hola Conequipos, quiero cotizar el alquiler de un equipo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-semibold transition-colors hover:border-brand"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {/* ---------- Desktop: composición hero214 con playlist (cada 5s) ---------- */}
      <HeroStage />
    </section>
  );
}
