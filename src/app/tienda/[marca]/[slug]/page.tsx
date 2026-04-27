import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle, ChevronRight, Check, AlertTriangle } from "lucide-react";
import {
  getProductBySlug,
  getAllSlugs,
  formatPrice,
  whatsappProduct,
  brandLabels,
  WHATSAPP_URL,
  type Brand,
} from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{ marca: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map(({ marca, slug }) => ({ marca, slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { marca, slug } = await params;
  const product = getProductBySlug(marca as Brand, slug);
  if (!product) return {};

  return {
    title: `${product.name} Colombia | MedPhoto — Distribuidor Oficial`,
    description: product.description,
    openGraph: {
      title: `${product.name} | MedPhoto Colombia`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

const availabilityConfig = {
  available: { label: "En Stock", color: "#22c55e", bg: "#22c55e15" },
  backorder: { label: "Disponible bajo pedido", color: "#f59e0b", bg: "#f59e0b15" },
  consult: { label: "Consultar disponibilidad", color: "#B7B8B9", bg: "#B7B8B915" },
  subject_to_availability: { label: "Stock sujeto a disponibilidad", color: "#f59e0b", bg: "#f59e0b15" },
};

export default async function ProductPage({ params }: Props) {
  const { marca, slug } = await params;
  const product = getProductBySlug(marca as Brand, slug);
  if (!product) notFound();

  const avail = product.discontinued
    ? { label: "Descontinuado", color: "#6b7280", bg: "#6b728015" }
    : availabilityConfig[product.availability];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brandLabel,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.availability === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      seller: {
        "@type": "Organization",
        name: "MedPhoto Colombia",
      },
    },
    ...(product.sku && { sku: product.sku }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }} aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#4CB4E7] transition-colors">Inicio</Link>
          <ChevronRight size={12} />
          <Link href="/tienda/" className="hover:text-[#4CB4E7] transition-colors">Tienda</Link>
          <ChevronRight size={12} />
          <Link href={`/tienda/${product.brand}/`} className="hover:text-[#4CB4E7] transition-colors capitalize">
            {product.brandLabel}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: "#F5F5F5" }}>{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image + Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#111112" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-12"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((src, i) => (
                  <div
                    key={src}
                    className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border"
                    style={{ backgroundColor: "#111112", borderColor: i === 0 ? "#4CB4E7" : "#2a2a2b" }}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} vista ${i + 1}`}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              {product.brandLabel} · {product.category}
            </p>

            <h1
              className="text-3xl sm:text-4xl mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {product.name}
            </h1>

            {/* Availability */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6 border"
              style={{
                backgroundColor: avail.bg,
                borderColor: `${avail.color}30`,
                color: avail.color,
                fontFamily: "var(--font-label)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: avail.color }} />
              {avail.label}
            </div>

            <p className="text-base leading-relaxed mb-8" style={{ color: "#B7B8B9" }}>
              {product.description}
            </p>

            {/* Discontinued banner */}
            {product.discontinued && product.successor && (() => {
              const successorProduct = getProductBySlug(product.brand, product.successor);
              return (
                <div
                  className="rounded-xl p-4 mb-8 border flex items-start gap-3"
                  style={{ backgroundColor: "#1A1A1B", borderColor: "#f59e0b40" }}
                >
                  <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: "#f59e0b" }} />
                  <div>
                    <p className="text-sm font-medium mb-1" style={{ color: "#f59e0b", fontFamily: "var(--font-label)" }}>
                      Modelo descontinuado
                    </p>
                    <p className="text-sm" style={{ color: "#B7B8B9" }}>
                      Este producto ya no se fabrica.{" "}
                      {successorProduct ? (
                        <>
                          Te recomendamos el{" "}
                          <Link
                            href={`/tienda/${product.brand}/${product.successor}/`}
                            className="underline transition-colors hover:text-[#4CB4E7]"
                            style={{ color: "#F5F5F5" }}
                          >
                            {successorProduct.name}
                          </Link>
                          .
                        </>
                      ) : (
                        "Contáctanos para explorar alternativas disponibles."
                      )}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Price — hidden for discontinued */}
            {!product.discontinued && (
              <div className="mb-8">
                {product.originalPrice && (
                  <div
                    className="text-xl line-through mb-0.5"
                    style={{ color: "#6b7280", fontVariantNumeric: "tabular-nums" }}
                  >
                    {formatPrice(product.originalPrice, product.currency)}
                  </div>
                )}
                <div
                  className="text-4xl font-semibold"
                  style={{ fontFamily: "var(--font-heading)", fontVariantNumeric: "tabular-nums" }}
                >
                  {formatPrice(product.price, product.currency)}
                </div>
                {product.currency === "USD" && (
                  <p className="text-sm mt-1" style={{ color: "#B7B8B9" }}>
                    Precio en USD · Se importa bajo pedido · Contáctanos para cotización en COP.
                  </p>
                )}
                {product.priceBundled && (
                  <p className="text-sm mt-1" style={{ color: "#B7B8B9" }}>
                    {formatPrice(product.priceBundled, product.currency)} al comprar con equipo Profoto o Phase One.
                  </p>
                )}
              </div>
            )}

            {/* Variant selector */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-8">
                <p
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
                >
                  Compatible con
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <Link
                      key={v.slug}
                      href={`/tienda/${product.brand}/${v.slug}/`}
                      className="px-4 py-2 rounded-full text-xs border transition-all hover:border-[#4CB4E7] hover:text-[#4CB4E7]"
                      style={{
                        fontFamily: "var(--font-label)",
                        borderColor: v.slug === product.slug ? "#4CB4E7" : "#2a2a2b",
                        color: v.slug === product.slug ? "#4CB4E7" : "#B7B8B9",
                        backgroundColor: v.slug === product.slug ? "#4CB4E71a" : "transparent",
                      }}
                    >
                      {v.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — hidden for discontinued */}
            {!product.discontinued && (
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <AddToCartButton product={product} />
                <a
                  href={whatsappProduct(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium border transition-all hover:border-[#4CB4E7] hover:text-[#4CB4E7]"
                  style={{ borderColor: "#2a2a2b", color: "#B7B8B9", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
                >
                  <MessageCircle size={18} />
                  Consultar por WhatsApp
                </a>
              </div>
            )}

            {/* Features */}
            {product.features.length > 0 && (
              <div
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
              >
                <h2
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
                >
                  Características
                </h2>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#B7B8B9" }}>
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "#4CB4E7" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div
                className="rounded-xl border overflow-hidden mt-6"
                style={{ borderColor: "#2a2a2b" }}
              >
                <div
                  className="px-6 py-3 border-b"
                  style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
                >
                  <h2
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
                  >
                    Especificaciones técnicas
                  </h2>
                </div>
                <div style={{ backgroundColor: "#111112" }}>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 px-6 py-3 text-sm border-b last:border-b-0"
                      style={{
                        borderColor: "#2a2a2b",
                        backgroundColor: i % 2 === 0 ? "#111112" : "#13131400",
                      }}
                    >
                      <span style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}>{key}</span>
                      <span style={{ color: "#F5F5F5" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
