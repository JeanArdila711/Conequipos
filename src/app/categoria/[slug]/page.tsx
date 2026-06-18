import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { ArrowRight } from "@/components/icons";
import {
  categories,
  getCategory,
  productsByCategory,
} from "@/data/catalog";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, SITE_URL } from "@/lib/schema";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  const description = `Alquiler de ${c.name.toLowerCase()} para construcción en Itagüí, Medellín y Antioquia.`;
  return {
    title: c.name,
    description,
    alternates: { canonical: `/categoria/${slug}` },
    openGraph: { type: "website", url: `/categoria/${slug}`, title: c.name, description },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsByCategory(slug);

  const breadcrumb = breadcrumbSchema([
    { name: "Equipos", path: "/equipos" },
    { name: category.name, path: `/categoria/${slug}` },
  ]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/equipos/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, itemList]} />
      <PageHeader
        kicker={`${items.length} equipos disponibles`}
        title={category.name}
        description={`Maquinaria de ${category.name.toLowerCase()} certificada y lista para entregar en tu obra.`}
      />

      <section className="container-x py-16 md:py-24">
        {/* Otras categorías */}
        <div className="mb-12 flex flex-wrap gap-2">
          <Link
            href="/equipos"
            className="rounded-full border border-line px-4 py-2 text-sm text-mute transition-colors hover:border-brand/50 hover:text-bone"
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className={
                c.slug === slug
                  ? "rounded-full border border-brand bg-brand px-4 py-2 text-sm font-medium text-white"
                  : "rounded-full border border-line px-4 py-2 text-sm text-mute transition-colors hover:border-brand/50 hover:text-bone"
              }
            >
              {c.name}
            </Link>
          ))}
        </div>

        {items.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} reveal={false} />
            ))}
          </div>
        ) : (
          <p className="text-mute">Pronto sumaremos equipos a esta categoría.</p>
        )}

        <div className="mt-16">
          <Link
            href="/equipos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            Ver catálogo completo
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
