"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  brandProducts: Product[];
  label: string;
}

export default function BrandPageClient({ brandProducts, label }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedQuery(value), 300);
  }, []);

  const q = debouncedQuery.trim();
  const isSearching = q.length > 0;

  // Modo búsqueda global: ignora la marca actual, busca en todo el catálogo
  // Modo normal: muestra solo los productos de esta marca (brandProducts)
  const filtered = useMemo(() => {
    if (!isSearching) return brandProducts;
    const lower = q.toLowerCase();
    return products.filter((p) =>
      [p.name, p.slug, p.description, p.shortDescription, p.category, p.brand]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [brandProducts, q, isSearching]);

  const categories = useMemo(
    () => Array.from(new Set(filtered.map((p) => p.category))),
    [filtered]
  );

  const noResults = isSearching && filtered.length === 0;

  return (
    <>
      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar producto (ej: B10, A2, D30...)"
          aria-label={`Buscar en ${label}`}
          style={{
            width: "100%",
            backgroundColor: "#1A1A1C",
            border: "1px solid #333",
            borderRadius: "6px",
            color: "#FFFFFF",
            padding: "12px 16px",
            fontSize: "16px",
            marginBottom: "24px",
            outline: "none",
            fontFamily: "var(--font-body)",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#4CB4E7")}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor =
              debouncedQuery ? "#4CB4E7" : "#333")
          }
        />
      </div>

      {/* Sin resultados */}
      {noResults ? (
        <div
          className="text-center py-20 px-6"
          style={{ backgroundColor: "#0F0F10" }}
        >
          <p className="mb-5 text-base" style={{ color: "#B7B8B9" }}>
            No encontramos resultados. ¿Te ayudamos a encontrarlo?
          </p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-3.5 rounded-md text-sm font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "#4CB4E7",
              color: "#0F0F10",
              fontFamily: "var(--font-label)",
              letterSpacing: "0.05em",
            }}
          >
            Ir a contacto
          </Link>
        </div>
      ) : (
        <>
          {/* CTA inicio — solo si hay más de 12 productos */}
          {brandProducts.length > 12 && (
            <div
              className="text-center mb-10 py-8 px-6 rounded-xl"
              style={{ backgroundColor: "#0F0F10" }}
            >
              <Link
                href="/contacto"
                className="inline-block px-8 py-3.5 rounded-md text-sm font-medium transition-opacity hover:opacity-85"
                style={{
                  backgroundColor: "#4CB4E7",
                  color: "#0F0F10",
                  fontFamily: "var(--font-label)",
                  letterSpacing: "0.05em",
                }}
              >
                ¿Necesitas asesoría? Contáctanos →
              </Link>
            </div>
          )}

          {/* Grid por categoría */}
          {categories.map((cat) => {
            const catProducts = filtered.filter((p) => p.category === cat);
            return (
              <div key={cat} className="mb-16">
                <h2
                  className="text-xs uppercase tracking-widest mb-6 pb-3 border-b"
                  style={{
                    color: "#4CB4E7",
                    fontFamily: "var(--font-label)",
                    borderColor: "#2a2a2b",
                  }}
                >
                  {cat}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {catProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* CTA final */}
          <div
            className="text-center mt-4 py-14 px-6"
            style={{ backgroundColor: "#0F0F10" }}
          >
            <p
              className="mb-5 text-lg"
              style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
            >
              ¿No encuentras lo que buscas? Contáctanos, te ayudamos.
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-3.5 rounded-md text-sm font-medium transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "#4CB4E7",
                color: "#0F0F10",
                fontFamily: "var(--font-label)",
                letterSpacing: "0.05em",
              }}
            >
              Ir a contacto
            </Link>
          </div>
        </>
      )}
    </>
  );
}
