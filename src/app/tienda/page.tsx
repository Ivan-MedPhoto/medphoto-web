"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Brand } from "@/data/products";
import { products, brandLabels } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const allBrands: (Brand | "all")[] = ["all", "profoto", "phase-one", "capture-one", "tethertools"];

const brandNames: Record<Brand | "all", string> = {
  all: "Todos",
  profoto: "Profoto",
  "phase-one": "Phase One",
  "capture-one": "Capture One",
  tethertools: "TetherTools",
};

const sinonimos: Record<string, string[]> = {
  bateria: ["battery", "b10", "b20", "b30", "b3"],
  estudio: ["studio", "d3", "d30", "pro"],
  camara: ["camera", "canon", "nikon", "sony", "fuji"],
  flash: ["flash", "strobe", "light"],
  cable: ["cable", "tether", "usb"],
  software: ["software", "capture", "one"],
  soporte: ["stand", "support", "grip"],
  modificador: ["modifier", "softbox", "umbrella", "beauty"],
};

function getTerms(q: string): string[] {
  const base = q.toLowerCase().trim();
  const extra = sinonimos[base] ?? [];
  return [base, ...extra];
}

export default function TiendaPage() {
  const [activeBrand, setActiveBrand] = useState<Brand | "all">("all");
  const [activeCategory, setActiveCategory] = useState("all");
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

  // Modo búsqueda global: ignora marca y categoría activas
  // Modo normal: filtra por marca y categoría seleccionadas
  const displayed = (() => {
    if (isSearching) {
      const terms = getTerms(q);
      return products.filter((p) => {
        const haystack = [p.name, p.slug, p.description, p.shortDescription, p.category, p.brand]
          .join(" ")
          .toLowerCase();
        return terms.some((t) => haystack.includes(t));
      });
    }
    const byBrand = activeBrand === "all" ? products : products.filter((p) => p.brand === activeBrand);
    return activeCategory === "all" ? byBrand : byBrand.filter((p) => p.category === activeCategory);
  })();

  const brandFiltered =
    activeBrand === "all" ? products : products.filter((p) => p.brand === activeBrand);
  const categories = ["all", ...Array.from(new Set(brandFiltered.map((p) => p.category)))];

  const noResults = isSearching && displayed.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
        >
          Catálogo
        </p>
        <h1
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tienda
        </h1>
      </div>

      {/* Brand filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => {
              setActiveBrand(brand);
              setActiveCategory("all");
            }}
            className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
            style={{
              fontFamily: "var(--font-label)",
              letterSpacing: "0.05em",
              backgroundColor: activeBrand === brand ? "#4CB4E7" : "transparent",
              color: activeBrand === brand ? "#0F0F10" : "#B7B8B9",
              borderColor: activeBrand === brand ? "#4CB4E7" : "#2a2a2b",
            }}
          >
            {brandNames[brand]}
          </button>
        ))}
      </div>

      {/* Category sub-filters */}
      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-full text-xs border transition-all"
              style={{
                fontFamily: "var(--font-label)",
                letterSpacing: "0.05em",
                backgroundColor: activeCategory === cat ? "#1A1A1B" : "transparent",
                color: activeCategory === cat ? "#F5F5F5" : "#B7B8B9",
                borderColor: activeCategory === cat ? "#4CB4E7" : "#2a2a2b",
              }}
            >
              {cat === "all" ? "Todas las categorías" : cat}
            </button>
          ))}
        </div>
      )}

      {/* Barra de búsqueda */}
      <input
        type="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar producto (ej: B10, A2, D30...)"
        aria-label="Buscar productos"
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
        onBlur={(e) => (e.currentTarget.style.borderColor = debouncedQuery ? "#4CB4E7" : "#333")}
      />

      {/* Count */}
      <p className="text-xs mb-8" style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}>
        {displayed.length} {displayed.length === 1 ? "producto" : "productos"}
      </p>

      {/* CTA inicio — solo si hay más de 12 productos */}
      {!noResults && displayed.length > 12 && (
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

      {/* Grid / sin resultados */}
      {noResults ? (
        <div className="text-center py-20 px-6" style={{ backgroundColor: "#0F0F10" }}>
          <p className="mb-5 text-base" style={{ color: "#B7B8B9" }}>
            No encontramos resultados. ¿Te ayudamos?
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
      ) : displayed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p style={{ color: "#B7B8B9" }}>No hay productos en esta categoría.</p>
        </div>
      )}

      {/* CTA final */}
      <div
        className="text-center mt-16 py-14 px-6"
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
    </div>
  );
}
