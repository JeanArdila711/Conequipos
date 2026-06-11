import Image from "next/image";
import { cn } from "@/lib/utils";

/** Logo oficial Conequipos (mark + wordmark). Escala por altura. */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/conequipos-logo.png"
      alt="Conequipos"
      width={702}
      height={193}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
}
