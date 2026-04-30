import type { Metadata } from "next";
import LeadMagnetForm from "@/components/LeadMagnetForm";

export const metadata: Metadata = {
  title: "¿Vale la pena invertir en Profoto en Colombia? Análisis real de ROI | MedPhoto",
  description:
    "Guía gratuita: desglose de costos, retorno real y análisis honesto sobre invertir en iluminación Profoto en Colombia. Descarga sin compromiso.",
  openGraph: {
    title: "¿Vale la pena invertir en Profoto en Colombia? Análisis real de ROI",
    description:
      "Guía gratuita: desglose de costos, retorno real y análisis honesto sobre invertir en iluminación Profoto en Colombia.",
    url: "https://medphoto.com.co/guia-roi-profoto/",
    siteName: "MedPhoto Colombia",
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const bullets = [
  "Precios reales de Profoto en Colombia (COP con IVA incluido)",
  "Comparativa de costo vs. alternativas del mercado local",
  "Cómo calcular el retorno sobre tu inversión en iluminación",
  "Cuándo tiene sentido comprar vs. alquilar equipo",
  "Qué modelos tienen mejor relación precio/rendimiento para el mercado colombiano",
];

export default function GuiaROIProfotoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F0F10" }}>

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: copy */}
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
              >
                Guía gratuita · Profoto Colombia
              </p>

              <h1
                className="text-3xl sm:text-4xl xl:text-5xl leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                ¿Vale la pena invertir en Profoto en Colombia?
                <span style={{ color: "#4CB4E7" }}> Análisis real de ROI</span>
              </h1>

              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: "#B7B8B9" }}
              >
                Un análisis honesto sobre cuánto cuesta realmente un sistema Profoto en Colombia,
                qué retorno puedes esperar y en qué punto la inversión se paga sola.
                Sin marketing, con números reales.
              </p>

              <div
                className="rounded-xl p-6 border mb-8"
                style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
                >
                  Qué incluye la guía
                </p>
                <ul className="space-y-3">
                  {bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-0.5 shrink-0"
                      >
                        <circle cx="8" cy="8" r="7" stroke="#4CB4E7" strokeWidth="1.5" />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke="#4CB4E7"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#4CB4E71a", border: "1px solid #4CB4E730" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v6M7 7l3-3M7 7L4 4" stroke="#4CB4E7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 10v1a2 2 0 002 2h8a2 2 0 002-2v-1" stroke="#4CB4E7" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-xs" style={{ color: "#B7B8B9" }}>
                  Descarga gratuita · PDF · Disponible de inmediato
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:sticky lg:top-8">
              <div
                className="rounded-2xl p-8 border"
                style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
              >
                <h2
                  className="text-xl mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  Recibe la guía en tu correo
                </h2>
                <p className="text-sm mb-6" style={{ color: "#B7B8B9" }}>
                  Gratis. Sin compromisos.
                </p>
                <LeadMagnetForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section
        className="py-12 px-4 border-t"
        style={{ borderColor: "#2a2a2b" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { label: "Distribuidores oficiales", value: "Profoto en Colombia" },
              { label: "Análisis basado en", value: "precios reales COP" },
              { label: "Asesoría", value: "pre y post venta" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  className="text-lg mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {value}
                </p>
                <p className="text-xs uppercase tracking-widest" style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
