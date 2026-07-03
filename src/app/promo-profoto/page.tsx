import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HubSpotForm from "@/components/HubSpotForm";

export const metadata: Metadata = {
  title: "Promo Profoto Julio–Agosto 2026 | MedPhoto Colombia",
  description:
    "B30 desde $10.300.000 + bono de $500.000. A2 Connect Kit disponible. Distribuidores oficiales Profoto en Colombia.",
};

function formatCOP(price: number): string {
  return `$${price.toLocaleString("es-CO")}`;
}

const B30_SPECS = ["500Ws", "400 disparos", "120+ modificadores"];

const WHY_MEDPHOTO = [
  {
    title: "Distribuidor Oficial",
    description: "Garantía original Profoto",
  },
  {
    title: "Soporte real",
    description: "Pre y post venta en Colombia",
  },
  {
    title: "Entrega rápida",
    description: "Stock disponible en Bogotá",
  },
];

export default function PromoProfotoPage() {
  return (
    <div style={{ backgroundColor: "#0F0F10" }}>

      {/* Volver al sitio */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center text-xs transition-colors hover:text-[#4CB4E7]"
            style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
          >
            ← Volver al sitio
          </Link>
        </div>
      </div>

      {/* 1. Hero */}
      <section className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-widest mb-6"
            style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)" }}
          >
            Promo Oficial Profoto · 1 julio – 31 agosto 2026
          </span>
          <h1
            className="text-3xl sm:text-4xl xl:text-5xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
          >
            La luz profesional ahora con bono de $500.000
          </h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#B7B8B9" }}>
            Profoto activa su promoción de verano en Colombia. Nosotros sumamos un bono
            exclusivo para que uses en lo que necesites de nuestra tienda.
          </p>
        </div>
      </section>

      {/* 2. B30 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "#2a2a2b" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: "#1A1A1B" }}>
              <Image
                src="/images/products/profoto-b30.png"
                alt="Profoto B30"
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div>
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
              >
                Producto Destacado · Stock Disponible
              </p>
              <h2
                className="text-2xl sm:text-3xl mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                Profoto B30
              </h2>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {B30_SPECS.map((spec) => (
                  <div
                    key={spec}
                    className="rounded-xl border py-3 px-2 text-center"
                    style={{ borderColor: "#2a2a2b", backgroundColor: "#1A1A1B" }}
                  >
                    <p className="text-xs sm:text-sm" style={{ color: "#F5F5F5", fontFamily: "var(--font-label)" }}>
                      {spec}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-lg line-through" style={{ color: "#B7B8B9" }}>
                  {formatCOP(12500000)}
                </span>
                <span
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {formatCOP(10300000)}
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: "#4CB4E7" }}>
                + Bono de $500.000 en productos MedPhoto
              </p>

              <div
                className="rounded-xl p-5 border mb-8"
                style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                  Con tu compra del B30 recibes $500.000 para usar en cualquier producto de
                  nuestra tienda con stock: softbox, paraguas, grid, transmisor o lo que
                  necesites para completar tu setup.
                </p>
              </div>

              <a
                href="https://wa.me/573243680862?text=Hola%20MedPhoto%2C%20me%20interesa%20el%20Profoto%20B30%20con%20el%20bono%20de%20%24500.000.%20%C2%BFEst%C3%A1%20disponible%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
              >
                Quiero el B30 → WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A2 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "#2a2a2b" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2
              className="text-2xl sm:text-3xl mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
            >
              Profoto A2
            </h2>
            <p className="text-base" style={{ color: "#B7B8B9" }}>
              El flash de cámara más potente del mundo. 100Ws, AirTTL, HSS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* A2 Solo */}
            <div
              className="rounded-2xl p-8 border"
              style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
            >
              <h3
                className="text-xl mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                A2 Solo
              </h3>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-base line-through" style={{ color: "#B7B8B9" }}>
                  {formatCOP(5450000)}
                </span>
                <span
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {formatCOP(5000000)}
                </span>
              </div>
              <p className="text-sm mb-8" style={{ color: "#4CB4E7" }}>
                + Bono $500.000 en productos MedPhoto
              </p>

              <a
                href="https://wa.me/573243680862?text=Hola%20MedPhoto%2C%20me%20interesa%20el%20Profoto%20A2%20con%20el%20bono%20de%20%24500.000."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
              >
                Quiero el A2 Solo → WhatsApp
              </a>
            </div>

            {/* A2 Connect Kit */}
            <div
              className="rounded-2xl p-8 border-2 relative"
              style={{ backgroundColor: "#1A1A1B", borderColor: "#4CB4E7" }}
            >
              <span
                className="absolute -top-3 left-8 rounded-full px-3 py-1 text-xs uppercase tracking-widest"
                style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)" }}
              >
                Recomendado
              </span>

              <h3
                className="text-xl mb-1 mt-2"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                A2 Connect Kit
              </h3>
              <p className="text-sm mb-6" style={{ color: "#B7B8B9" }}>
                A2 + Profoto Connect incluido
              </p>

              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {formatCOP(5500000)}
                </span>
              </div>
              <p className="text-sm mb-8" style={{ color: "#4CB4E7" }}>
                + Bono $500.000 en productos MedPhoto
              </p>

              <a
                href="https://wa.me/573243680862?text=Hola%20MedPhoto%2C%20me%20interesa%20el%20Profoto%20A2%20Connect%20Kit%20con%20el%20bono%20de%20%24500.000."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
              >
                Quiero el A2 Connect Kit → WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nota técnica — Sony a9 III */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "#2a2a2b" }}>
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-xl p-8 border-l-4"
            style={{ backgroundColor: "#1A1A1B", borderColor: "#4CB4E7" }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Firmware Update · Profoto + Sony
            </p>
            <h3
              className="text-xl sm:text-2xl mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
            >
              Sincronización 1/80.000s con Sony α9 III
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#B7B8B9" }}>
              Con la última actualización de firmware, toda la línea Profoto actual —
              incluyendo el A2, A10, B20, B30, D30, Pro-D3, Pro-B3 y Pro-11 — sincroniza a
              cualquier velocidad de obturación con el Sony α9 III, hasta 1/80.000s. Sin
              pérdida de potencia. La actualización es gratuita y está disponible en
              profoto.com.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Por qué MedPhoto */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "#2a2a2b" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {WHY_MEDPHOTO.map(({ title, description }) => (
              <div key={title}>
                <p
                  className="text-lg mb-1"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  ✓ {title}
                </p>
                <p className="text-sm" style={{ color: "#B7B8B9" }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Formulario HubSpot */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "#2a2a2b" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-2xl sm:text-3xl mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
          >
            ¿Te interesa alguno de estos productos?
          </h2>
          <p className="text-base mb-10" style={{ color: "#B7B8B9" }}>
            Déjanos tus datos y te contactamos con disponibilidad y precio final.
          </p>
          <HubSpotForm formId="fe713f94-46ec-45cb-987e-1e681443a2fe" />
        </div>
      </section>

      {/* 7. Urgencia */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-t" style={{ backgroundColor: "#161617", borderColor: "#2a2a2b" }}>
        <p className="text-center text-sm" style={{ color: "#ff6b6b" }}>
          Promoción válida únicamente hasta el 31 de agosto de 2026. Unidades limitadas
          sujetas a stock disponible.
        </p>
      </section>

    </div>
  );
}
