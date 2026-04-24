"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ShoppingCart, Check } from "lucide-react";
import { Product, formatPrice, whatsappProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";

const availabilityConfig = {
  available: { label: "En Stock", color: "#22c55e" },
  backorder: { label: "Disponible bajo pedido", color: "#f59e0b" },
  consult: { label: "Consultar disponibilidad", color: "#B7B8B9" },
  subject_to_availability: { label: "Stock sujeto a disponibilidad", color: "#f59e0b" },
};

const DISCONTINUED_COLOR = "#6b7280";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const avail = availabilityConfig[product.availability];
  const href = `/tienda/${product.brand}/${product.slug}/`;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article
      className="group rounded-lg overflow-hidden border transition-all duration-300 hover:border-[#4CB4E7]/50 hover:-translate-y-0.5"
      style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
    >
      {/* Image */}
      <Link href={href} className="block relative aspect-[4/3] overflow-hidden bg-[#111112]">
        {product.discontinued && (
          <div
            className="absolute top-2 left-2 z-10 text-[10px] px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#2a2a2b", color: DISCONTINUED_COLOR, fontFamily: "var(--font-label)" }}
          >
            Descontinuado
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
          >
            {product.brandLabel}
          </span>
          <span
            className="text-[10px]"
            style={{ color: product.discontinued ? DISCONTINUED_COLOR : avail.color, fontFamily: "var(--font-label)" }}
          >
            {product.discontinued ? "Descontinuado" : avail.label}
          </span>
        </div>

        <Link href={href}>
          <h3
            className="text-base font-medium leading-snug mb-3 transition-colors group-hover:text-[#4CB4E7]"
            style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-xs leading-relaxed mb-4" style={{ color: "#B7B8B9" }}>
          {product.shortDescription}
        </p>

        {product.discontinued ? (
          <Link href={href} className="text-xs hover:text-[#4CB4E7] transition-colors" style={{ color: DISCONTINUED_COLOR, fontFamily: "var(--font-label)" }}>
            Ver sucesor →
          </Link>
        ) : (
          <div>
            {/* Price row */}
            <div className="mb-3">
              {product.originalPrice && (
                <span
                  className="block text-xs line-through"
                  style={{ color: "#6b7280", fontVariantNumeric: "tabular-nums" }}
                >
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
              <span
                className="text-lg font-semibold"
                style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)", fontVariantNumeric: "tabular-nums" }}
              >
                {formatPrice(product.price, product.currency)}
              </span>
              {product.currency === "USD" && (
                <p className="text-[10px] mt-0.5" style={{ color: "#B7B8B9" }}>
                  A pedido · Importación bajo orden
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleBuy}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: added ? "#22c55e" : "#4CB4E7",
                  color: "#0F0F10",
                  fontFamily: "var(--font-label)",
                }}
                aria-label={added ? "Producto agregado al carrito" : `Agregar ${product.name} al carrito`}
              >
                {added ? <Check size={13} /> : <ShoppingCart size={13} />}
                {added ? "Agregado" : "Comprar"}
              </button>
              <a
                href={whatsappProduct(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Preguntar por WhatsApp sobre ${product.name}`}
                className="w-8 h-8 flex items-center justify-center rounded-full border transition-all hover:border-[#4CB4E7] hover:text-[#4CB4E7]"
                style={{ borderColor: "#2a2a2b", color: "#B7B8B9" }}
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
