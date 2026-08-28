"use client";

import { useState } from "react";
import Link from "next/link";

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative w-full py-4 px-4" style={{ backgroundColor: "#4CB4E7" }}>
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-4 flex-wrap pr-8">
        <p className="text-center" style={{ color: "#0F0F10", fontSize: "15px" }}>
          <span className="font-bold">Ahora también alquilamos equipo Phase One</span>
          <span className="hidden sm:inline">
            {" "}· Sistema completo, listo para tu próxima producción — sin comprar.
          </span>
        </p>
        <Link
          href="/alquiler/"
          className="shrink-0 rounded-md px-5 py-2 font-bold transition-all hover:opacity-90"
          style={{ backgroundColor: "#FFFFFF", color: "#0F0F10", fontFamily: "var(--font-label)" }}
        >
          Ver alquiler →
        </Link>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Cerrar banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 leading-none"
        style={{ color: "#0F0F10", background: "none", border: "none", fontSize: "18px" }}
      >
        ×
      </button>
    </div>
  );
}
