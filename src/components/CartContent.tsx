"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const WHATSAPP_CART = "https://wa.me/573243680862";

export default function CartContent() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p style={{ color: "#B7B8B9" }}>Cargando carrito...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingCart size={48} className="mx-auto mb-6 opacity-20" />
        <h1
          className="text-2xl mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tu carrito está vacío
        </h1>
        <p className="mb-8" style={{ color: "#B7B8B9" }}>
          Agrega productos desde la tienda para cotizarlos aquí.
        </p>
        <Link
          href="/tienda/"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          style={{
            backgroundColor: "#4CB4E7",
            color: "#0F0F10",
            fontFamily: "var(--font-label)",
          }}
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const cartText = encodeURIComponent(
    "Hola, quiero coordinar el pago de:\n" +
      items
        .map(
          (i) =>
            `• ${i.product.name} x${i.quantity} — ${formatPrice(
              i.product.price * i.quantity,
              i.product.currency
            )}`
        )
        .join("\n") +
      `\n\nTotal: ${formatPrice(totalPrice, "COP")}`
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Carrito
        </h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-sm transition-colors hover:text-[#f87171]"
          style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
        >
          <Trash2 size={14} />
          Vaciar carrito
        </button>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-10">
        {items.map(({ product, quantity }) => (
          <div
            key={product.slug}
            className="flex items-center gap-4 rounded-xl p-4 border"
            style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
          >
            <div
              className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0"
              style={{ backgroundColor: "#111112" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="80px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-xs mb-1"
                style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
              >
                {product.brandLabel}
              </p>
              <Link
                href={`/tienda/${product.brand}/${product.slug}/`}
                className="text-sm font-medium leading-snug hover:text-[#4CB4E7] transition-colors block truncate"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                {product.name}
              </Link>
              <p
                className="text-sm mt-1 font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#F5F5F5",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatPrice(product.price * quantity, product.currency)}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => updateQuantity(product.slug, quantity - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border transition-colors hover:border-[#4CB4E7] hover:text-[#4CB4E7]"
                style={{ borderColor: "#2a2a2b", color: "#B7B8B9" }}
                aria-label="Reducir cantidad"
              >
                <Minus size={12} />
              </button>
              <span
                className="w-5 text-center text-sm"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.slug, quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full border transition-colors hover:border-[#4CB4E7] hover:text-[#4CB4E7]"
                style={{ borderColor: "#2a2a2b", color: "#B7B8B9" }}
                aria-label="Aumentar cantidad"
              >
                <Plus size={12} />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(product.slug)}
              className="shrink-0 transition-colors hover:text-[#f87171]"
              style={{ color: "#B7B8B9" }}
              aria-label={`Eliminar ${product.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-base" style={{ color: "#B7B8B9" }}>
            Subtotal
          </span>
          <span
            className="text-2xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatPrice(totalPrice, "COP")}
          </span>
        </div>

        <div
          className="rounded-lg p-4 mb-4 border text-sm"
          style={{ backgroundColor: "#111112", borderColor: "#2a2a2b" }}
        >
          <p
            className="font-medium mb-1"
            style={{ color: "#F5F5F5", fontFamily: "var(--font-label)" }}
          >
            Integración con OpenPay
          </p>
          <p style={{ color: "#B7B8B9" }}>
            Escríbenos por WhatsApp para coordinar el pago con tarjeta de
            crédito, PSE, y te enviamos el link directo. También te enviaremos
            la certificación bancaria para transferencia electrónica.
          </p>
        </div>

        <a
          href={`${WHATSAPP_CART}?text=${cartText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{
            backgroundColor: "#4CB4E7",
            color: "#0F0F10",
            fontFamily: "var(--font-label)",
            letterSpacing: "0.05em",
          }}
        >
          <MessageCircle size={18} />
          Coordinar pago por WhatsApp
        </a>
      </div>
    </div>
  );
}
