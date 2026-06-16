"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@/components/icons";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  {
    src: "/videos/obra-1.mp4",
    kicker: "Alquiler de equipos · Medellín & Antioquia",
    line1: "Maquinaria que",
    line2: "no para tu obra.",
    sub: "Equipos certificados y mantenidos, listos para producir desde el primer día.",
    cta: true,
  },
  {
    src: "/videos/obra-2.mp4",
    kicker: "Logística en obra",
    line1: "Entregamos",
    line2: "donde estés.",
    sub: "Llevamos y recogemos el equipo en tu obra. Tú no mueves un dedo.",
    cta: false,
  },
];

export function VideoScrolly() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    // Con reduced-motion el pin y el cambio de escenas SIGUEN funcionando
    // (es contenido, no decoracion); solo se suaviza el movimiento.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shift = reduce ? 0 : 40;

    const ctx = gsap.context((self) => {
      const panels = self.selector!(".vs-panel") as HTMLElement[];
      const videos = self.selector!(".vs-video") as HTMLVideoElement[];
      const scenes = self.selector!(".vs-scene") as HTMLElement[];

      // Posicion inicial via GSAP (unica fuente de transform — un inline
      // translateY se apilaria con el yPercent del tween).
      gsap.set(panels.slice(1), { yPercent: 100, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.8,
          // Pausa solo cuando el pin (toda la seccion) sale de vista —
          // no a mitad de las escenas.
          onLeave: () => videos.forEach((v) => v.pause()),
          onLeaveBack: () => videos.forEach((v) => v.pause()),
          onEnter: () => videos.forEach((v) => v.play().catch(() => {})),
          onEnterBack: () => videos.forEach((v) => v.play().catch(() => {})),
        },
      });

      // Cada transicion: el panel siguiente SUBE desde abajo y se superpone,
      // con parallax interno del video. Lenta y pausada (0.85 de 1 unidad).
      for (let i = 1; i < SCENES.length; i++) {
        const at = i;
        tl.fromTo(
          panels[i],
          { yPercent: 100 },
          { yPercent: 0, duration: 0.85, ease: "power2.inOut" },
          at - 0.85
        )
          // parallax interno: el video llega "frenando" dentro del panel
          .fromTo(
            videos[i],
            { yPercent: -10 },
            { yPercent: 0, duration: 0.85, ease: "power2.inOut" },
            at - 0.85
          )
          .to(
            scenes[i - 1],
            { autoAlpha: 0, y: -shift, duration: 0.3, ease: "power1.in" },
            at - 0.8
          )
          .fromTo(
            scenes[i],
            { autoAlpha: 0, y: shift },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            at - 0.4
          );
      }
      // respiro corto al final
      tl.to({}, { duration: 0.4 });

      // Arranca todos reproduciendo (muted = autoplay permitido)
      videos.forEach((v) => v.play().catch(() => {}));
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-video-hero
      className="relative isolate h-svh overflow-hidden bg-black"
    >
      {/* Paneles de video apilados — los siguientes arrancan abajo (CSS, no JS) */}
      {SCENES.map((s, i) => (
        <div
          key={s.src}
          className="vs-panel absolute inset-0 overflow-hidden will-change-transform"
          style={{ zIndex: i, ...(i > 0 ? { visibility: "hidden" } : {}) }}
        >
          <video
            className="vs-video h-full w-full scale-[1.18] object-cover will-change-transform"
            src={s.src}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />
        </div>
      ))}

      {/* Scrims para legibilidad (sobre los paneles) */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[5] h-28 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Escenas de texto — apiladas, solo la 1 visible por defecto */}
      <div className="container-x relative z-10 h-full">
        {SCENES.map((s, i) => (
          <div
            key={i}
            className="vs-scene absolute inset-x-0 bottom-16 md:bottom-24"
            style={i > 0 ? { opacity: 0, visibility: "hidden" } : undefined}
          >
            <h2 className="font-display font-bold text-white display-lg">
              <span className="block">{s.line1}</span>
              <span className="block text-brand-glow">{s.line2}</span>
            </h2>
            <p className="mt-5 max-w-md text-balance text-white/75">{s.sub}</p>

            {s.cta && (
              <div className="mt-9">
                <Link
                  href="/equipos"
                  className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-brand py-2.5 pl-8 pr-2.5 text-base font-bold text-white shadow-[0_12px_45px_-12px] shadow-black/40 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-brand-deep md:text-lg"
                >
                  {/* Brillo sutil que barre al hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-full" />
                  {/* Label con roll vertical */}
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-400 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-full">
                      Ver catálogo
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 block translate-y-full transition-transform duration-400 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-y-0"
                    >
                      Ver catálogo
                    </span>
                  </span>
                  {/* Flecha en circulo que se impulsa */}
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hint de scroll */}
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-[0.7rem] font-medium tracking-wide text-white/50">
        Scroll
      </div>
    </section>
  );
}
