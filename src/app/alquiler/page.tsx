import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_URL } from "@/data/products";
import { rentals } from "@/data/rentals";

export const metadata: Metadata = {
  title: "Alquiler de Equipo Fotográfico",
  description:
    "Alquila equipo fotográfico profesional de alta gama en Colombia. Respaldo digital Phase One IQ3 100 disponible por días.",
  alternates: {
    canonical: "/alquiler/",
  },
};

export default function AlquilerPage() {
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

      {/* Hero */}
      <section className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
          >
            Nueva línea MedPhoto
          </p>
          <h1
            className="text-3xl sm:text-4xl xl:text-5xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
          >
            Alquiler de Equipo Fotográfico Profesional
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#B7B8B9" }}>
            Equipo de alta gama por los días que lo necesites, sin comprometer capital
            en un sistema propio.
          </p>
        </div>
      </section>

      {/* Items */}
      <section className="pt-4 pb-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: "#2a2a2b" }}>
        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-8 py-12">
          {rentals.map((item) => (
            <div
              key={item.slug}
              className="rounded-2xl p-8 sm:p-10 border"
              style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
            >
              <div className="relative h-[340px] sm:h-[460px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={item.image}
                  alt="Phase One IQ3 100 disponible para alquiler en Colombia"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
              >
                {item.name}
              </p>
              <h2
                className="text-2xl sm:text-3xl mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                {item.hook}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: "#B7B8B9" }}>
                {item.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {item.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-xl border py-3 px-4 text-sm"
                    style={{ borderColor: "#2a2a2b", backgroundColor: "#0F0F10", color: "#F5F5F5" }}
                  >
                    {spec}
                  </li>
                ))}
              </ul>

              <h3
                className="text-lg sm:text-xl mb-5"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                ¿Para qué lo puedes usar?
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                {item.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="rounded-xl border py-3 px-4 text-sm"
                    style={{ borderColor: "#2a2a2b", backgroundColor: "#0F0F10", color: "#F5F5F5" }}
                  >
                    {useCase}
                  </li>
                ))}
              </ul>

              <h3
                className="text-lg sm:text-xl mb-5"
                style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
              >
                Qué incluye el kit
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {item.includes.map((group) => (
                  <div
                    key={group.category}
                    className="rounded-xl border py-4 px-4"
                    style={{ borderColor: "#2a2a2b", backgroundColor: "#0F0F10" }}
                  >
                    <p
                      className="text-xs uppercase tracking-widest mb-3"
                      style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
                    >
                      {group.category}
                    </p>
                    <ul className="space-y-1.5">
                      {group.items.map((line) => (
                        <li
                          key={line}
                          className="text-sm leading-relaxed pl-4 relative"
                          style={{ color: "#B7B8B9" }}
                        >
                          <span className="absolute left-0" style={{ color: "#4CB4E7" }}>
                            •
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-xs leading-relaxed mb-8" style={{ color: "#B7B8B9" }}>
                *El lente Phase One 120mm Macro tiene obturador de plano focal —
                sincroniza flash hasta 1/125s (velocidad de obturación hasta
                1/4.000s). Los lentes Schneider 80mm y 110mm sincronizan flash
                hasta 1/1.600s.
              </p>

              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(item.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
              >
                <MessageCircle size={18} />
                Consultar disponibilidad
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
