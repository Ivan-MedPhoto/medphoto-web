import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByBrand, brandLabels, type Brand } from "@/data/products";
import BrandPageClient from "@/components/BrandPageClient";

type Props = {
  params: Promise<{ marca: string }>;
};

export const dynamicParams = false;

const validBrands: Brand[] = ["profoto", "phase-one", "capture-one", "tethertools"];

const brandCopy: Record<Brand, string> = {
  profoto:
    "Profoto diseña sistemas de iluminación de estudio y locación usados en fotografía comercial y de moda. MedPhoto es distribuidor oficial en Colombia: monolights Pro-D3 y Pro-B3 para estudio, flashes a batería B20 y B30 para locación, y el sistema Connect/Air para disparo remoto TTL y alta velocidad. Garantía oficial y stock real en Colombia.",
  "phase-one":
    "Phase One fabrica sistemas de cámara de formato medio con sensores IQ4 de hasta 150 megapíxeles, usados en fotografía de moda, producto y publicidad de alto detalle. MedPhoto es distribuidor oficial en Colombia para los sistemas XF, XT y XC, con asesoría técnica directa para la elección de cuerpo y digital back.",
  "capture-one":
    "Capture One es un software de edición y tethering con manejo de color orientado a flujos de trabajo profesionales de estudio. MedPhoto distribuye licencias oficiales de Capture One Pro en Colombia, con opción de bundle al comprar cámara o flash.",
  tethertools:
    "TetherTools fabrica cables, soportes de mesa y sistemas de bloqueo para conexiones estables de tethering en producción — evitan desconexiones accidentales entre cámara y computador durante una sesión. MedPhoto distribuye la línea completa en Colombia para estudios que trabajan con captura en vivo.",
};

export function generateStaticParams() {
  return validBrands.map((marca) => ({ marca }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marca } = await params;
  if (!validBrands.includes(marca as Brand)) return {};
  const label = brandLabels[marca as Brand];
  const title = `${label} Colombia — Distribuidor Oficial | MedPhoto`;
  const description = `Catálogo completo de ${label} en Colombia. Distribuidores oficiales con asesoría personalizada.`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/tienda/${marca}/`,
    },
    openGraph: {
      title,
      description,
      url: `/tienda/${marca}/`,
      siteName: "MedPhoto Colombia",
      locale: "es_CO",
      type: "website",
    },
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
        <p className="mt-6 max-w-3xl text-base leading-relaxed" style={{ color: "#D4D4D5" }}>
          {brandCopy[brand]}
        </p>
      </div>

      <BrandPageClient brandProducts={brandProducts} label={label} />
    </div>
  );
}
