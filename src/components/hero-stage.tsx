"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";

// Shape exacta del bloque hero214 (SVG mask).
const SHAPE =
  "url(\"data:image/svg+xml,%3Csvg width='1528' height='700' viewBox='0 0 1528 700' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M0.589399 112.279C0.589402 82.1213 25.037 57.6738 55.1946 57.6738H335.688C350.06 57.6738 361.712 46.0226 361.712 31.6502C361.712 14.2835 375.79 0.205078 393.157 0.205078H949.833C983.496 0.205078 1010.78 27.4941 1010.78 61.1568C1010.78 89.0156 1033.37 111.6 1061.23 111.6H1472.74C1502.9 111.6 1527.35 136.047 1527.35 166.205V629.438C1527.35 659.596 1502.9 684.044 1472.74 684.044H639.176C619.635 684.044 603.794 668.203 603.794 648.662C603.794 629.122 587.954 613.281 568.413 613.281H55.1945C25.0369 613.281 0.589358 588.833 0.58936 558.676L0.589399 112.279Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")";

const maskStyle: React.CSSProperties = {
  WebkitMaskImage: SHAPE,
  maskImage: SHAPE,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

// Playlist del hero: el item activo se reproduce/muestra en la shape grande;
// las cards satélite muestran solo el poster (frame) de los siguientes.
type Item = {
  kind: "video" | "img";
  big: string;
  poster: string;
  alt: string;
};

const ITEMS: Item[] = [
  {
    kind: "video",
    big: "/videos/obra-1.mp4",
    poster: "/pexels-construccion-total-2464540-6106878.jpg",
    alt: "Obra en construcción",
  },
  {
    kind: "video",
    big: "/videos/obra-3.mp4",
    poster: "/pexels-rahibyaqubov-23978113.jpg",
    alt: "Maquinaria en obra",
  },
  {
    kind: "img",
    big: "/pexels-mehmet-aksoy-374584031-16764815.jpg",
    poster: "/pexels-mehmet-aksoy-374584031-16764815.jpg",
    alt: "Grúa torre en obra",
  },
  {
    kind: "img",
    big: "/pexels-construccion-total-2464540-14466335.jpg",
    poster: "/pexels-construccion-total-2464540-14466335.jpg",
    alt: "Equipo en obra",
  },
];

function Big({ item }: { item: Item }) {
  if (item.kind === "video") {
    return (
      <video
        key={item.big}
        src={item.big}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover [animation:fadeIn_0.6s_var(--ease-out-expo)]"
      />
    );
  }
  return (
    <Image
      key={item.big}
      src={item.big}
      alt={item.alt}
      fill
      sizes="80vw"
      priority
      className="object-cover [animation:fadeIn_0.6s_var(--ease-out-expo)]"
    />
  );
}

function Thumb({ item, className = "" }: { item: Item; className?: string }) {
  return (
    <div
      className={`relative aspect-square flex-1 overflow-hidden rounded-[2rem] bg-ink-2 shadow-2xl ${className}`}
    >
      <Image
        key={item.poster}
        src={item.poster}
        alt={item.alt}
        fill
        sizes="160px"
        className="object-cover [animation:fadeIn_0.6s_var(--ease-out-expo)]"
      />
    </div>
  );
}

export function HeroStage() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ITEMS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const n = ITEMS.length;
  const next1 = ITEMS[(i + 1) % n];
  const next2 = ITEMS[(i + 2) % n];

  return (
    <div className="relative mx-auto hidden aspect-[960/560] w-[132vh] max-w-full md:block">
      {/* Media grande enmascarado con la shape — reproduce el item activo */}
      <div
        className="absolute inset-x-0 top-[21.43%] h-[78.57%]"
        style={maskStyle}
      >
        <Big item={ITEMS[i]} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Titular — arriba-izquierda, "obra." metido en el hueco de la shape */}
      <div className="absolute left-0 top-[6%] z-10 max-w-[70%]">
        <h1 className="font-display font-bold leading-[0.95] text-5xl lg:text-6xl">
          Maquinaria que <span className="text-brand">no para tu obra.</span>
        </h1>
      </div>

      {/* Dos cards satélite (frames, no reproducen) — rotan cada 5s */}
      <div className="absolute right-0 top-[5%] z-20 flex w-[31%] items-start gap-3">
        <Thumb item={next1} />
        <Thumb item={next2} />
      </div>

      {/* Botón — un solo pill, en el notch inferior-izquierda */}
      <Link
        href="/equipos"
        className="group absolute bottom-0 left-0 z-20 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg transition-colors hover:bg-brand-deep"
      >
        Ver catálogo
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
