"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import { WHATSAPP_URL } from "@/data/products";
import { useCart } from "@/context/CartContext";

const nav = [
  { label: "Tienda", href: "/tienda/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contacto", href: "/contacto/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header
      className="sticky top-0 z-40 w-full border-b"
      style={{ backgroundColor: "#0F0F10cc", backdropFilter: "blur(12px)", borderColor: "#2a2a2b" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo size="sm" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors hover:text-[#4CB4E7]"
                style={{ fontFamily: "var(--font-label)", letterSpacing: "0.08em", color: "#B7B8B9" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart icon */}
            <Link
              href="/carrito/"
              aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} producto${totalItems !== 1 ? "s" : ""}` : ""}`}
              className="relative p-2 rounded-full transition-colors hover:text-[#4CB4E7]"
              style={{ color: "#B7B8B9" }}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-medium px-1"
                  style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)" }}
                  suppressHydrationWarning
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.08em" }}
            >
              <MessageCircle size={14} />
              Escríbenos
            </a>
          </div>

          {/* Mobile right actions */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/carrito/"
              aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} producto${totalItems !== 1 ? "s" : ""}` : ""}`}
              className="relative p-2 rounded-full transition-colors"
              style={{ color: "#B7B8B9" }}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-medium px-1"
                  style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)" }}
                  suppressHydrationWarning
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md transition-colors"
              style={{ color: "#B7B8B9" }}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="md:hidden border-t py-4 px-4"
          style={{ backgroundColor: "#0F0F10", borderColor: "#2a2a2b" }}
        >
          <nav className="flex flex-col gap-1" aria-label="Menú móvil">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-sm rounded-md transition-colors hover:bg-[#1A1A1B]"
                style={{ color: "#B7B8B9", fontFamily: "var(--font-label)", letterSpacing: "0.08em" }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium"
              style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)" }}
            >
              <MessageCircle size={16} />
              Escríbenos por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
