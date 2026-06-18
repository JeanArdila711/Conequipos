import type { Metadata } from "next";
import { EquiposHero } from "@/components/equipos-hero";
import { CatalogGrid } from "@/components/catalog-grid";
import { categories, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Equipos para construcción",
  description:
    "Catálogo completo de maquinaria para alquiler: elevación, compactación, concreto, generadores, compresores y más.",
  alternates: { canonical: "/equipos" },
};

export default async function EquiposPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const initialCategory = categories.some((c) => c.slug === categoria)
    ? categoria
    : undefined;

  return (
    <>
      <EquiposHero />
      <section className="container-x py-16">
        <CatalogGrid
          products={products}
          categories={categories}
          initialCategory={initialCategory}
        />
      </section>
    </>
  );
}
