import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByBrand, brandLabels, type Brand } from "@/data/products";
import BrandPageClient from "@/components/BrandPageClient";

type Props = {
  params: Promise<{ marca: string }>;
};

export const dynamicParams = false;

const validBrands: Brand[] = ["profoto", "phase-one", "capture-one", "tethertools"];

export function generateStaticParams() {
  return validBrands.map((marca) => ({ marca }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marca } = await params;
  if (!validBrands.includes(marca as Brand)) return {};
  const label = brandLabels[marca as Brand];
  return {
    title: `${label} Colombia — Distribuidor Oficial`,
    description: `Catálogo completo de ${label} en Colombia. Distribuidores oficiales con asesoría personalizada.`,
  };
}

export default async function BrandPage({ params }: Props) {
  const { marca } = await params;
  if (!validBrands.includes(marca as Brand)) notFound();

  const brand = marca as Brand;
  const brandProducts = getProductsByBrand(brand);
  const label = brandLabels[brand];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
        >
          Distribuidor Oficial
        </p>
        <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
          {label}
        </h1>
        <p className="mt-3 text-sm" style={{ color: "#B7B8B9" }}>
          {brandProducts.length} productos disponibles
        </p>
      </div>

      <BrandPageClient brandProducts={brandProducts} label={label} />
    </div>
  );
}
