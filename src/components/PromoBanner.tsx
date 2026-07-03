"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "promo_banner_closed";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="relative w-full" style={{ backgroundColor: "#4CB4E7", padding: "10px 16px" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-4 flex-wrap pr-8">
        <p className="text-center" style={{ color: "#0F0F10", fontSize: "13px" }}>
          <span className="hidden sm:inline">
            🔥 Promo Profoto Julio–Agosto · B30 desde $10.300.000 + Bono $500.000
          </span>
          <span className="sm:hidden">
            🔥 B30 desde $10.300.000 + Bono $500.000
          </span>
        </p>
        <Link
          href="/promo-profoto"
          className="shrink-0 rounded-full px-4 py-1.5 font-medium transition-all hover:opacity-90"
          style={{ backgroundColor: "#0F0F10", color: "#4CB4E7", fontSize: "13px", fontFamily: "var(--font-label)" }}
        >
          Ver oferta →
        </Link>
      </div>
      <button
        onClick={close}
        aria-label="Cerrar banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 leading-none text-xl"
        style={{ color: "#0F0F10", background: "none", border: "none" }}
      >
        ×
      </button>
    </div>
  );
}
