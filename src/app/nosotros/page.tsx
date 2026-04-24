import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Award, Users, Zap } from "lucide-react";
import { WHATSAPP_URL } from "@/data/products";

export const metadata: Metadata = {
  title: "Nosotros — MedPhoto Colombia",
  description:
    "Distribuidores oficiales de Profoto, Phase One, Capture One y TetherTools en Colombia desde 2021. Asesoría pre y post venta para fotógrafos profesionales.",
};

const brands = [
  { name: "Profoto", slug: "profoto", logo: "/images/brands/logo-profoto.png", year: "2021", desc: "Flashes y accesorios para estudio y locación." },
  { name: "Phase One", slug: "phase-one", logo: "/images/brands/logo-phaseone.png", year: "2021", desc: "Sistemas de cámara de formato medio." },
  { name: "Capture One", slug: "capture-one", logo: "/images/brands/logo-captureone.svg", year: "2021", desc: "Software de edición RAW profesional." },
  { name: "TetherTools", slug: "tethertools", logo: "/images/brands/logo-tethertools.png", year: "2021", desc: "Accesorios de tethering para sets organizados." },
];

const values = [
  {
    Icon: Award,
    title: "Distribución oficial",
    description:
      "No somos revendedores. Somos el canal directo autorizado en Colombia para cada una de nuestras marcas. Eso significa garantías originales, precios competitivos y acceso al catálogo completo.",
  },
  {
    Icon: Users,
    title: "Asesoría de verdad",
    description:
      "Conocemos cada producto que vendemos. Antes de tu compra te ayudamos a elegir el equipo correcto para tu trabajo. Después, seguimos contigo si algo no funciona como esperabas.",
  },
  {
    Icon: Zap,
    title: "Acceso sin fronteras",
    description:
      "Colombia tiene talento fotográfico de primer nivel. Ahora tiene también acceso a los mejores equipos del mundo. Importamos bajo pedido lo que no está en stock.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden" aria-label="Historia">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#4CB4E7 1px, transparent 1px), linear-gradient(90deg, #4CB4E7 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Desde 2021
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Siempre contigo.<br />
              <span style={{ color: "#4CB4E7" }}>Desde el primer clic.</span>
            </h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#B7B8B9" }}>
              MedPhoto nació en 2021 con una convicción: los fotógrafos colombianos
              merecen acceso a los mejores equipos del mundo, con el servicio que
              se merecen.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#B7B8B9" }}>
              No somos una tienda online más. Somos distribuidores oficiales que
              entienden tu trabajo porque compartimos tu pasión por la fotografía.
              Cada consulta, cada compra, cada problema técnico: estamos.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "#2a2a2b" }}
        aria-label="Nuestros valores"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            className="text-xs uppercase tracking-widest mb-12"
            style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
          >
            Cómo trabajamos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map(({ Icon, title, description }) => (
              <div key={title}>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#4CB4E71a" }}
                >
                  <Icon size={20} style={{ color: "#4CB4E7" }} />
                </div>
                <h2
                  className="text-xl mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {title}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "#2a2a2b" }}
        aria-label="Marcas que distribuimos"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p
            className="text-xs uppercase tracking-widest mb-12"
            style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
          >
            Distribuidores oficiales desde 2021
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
              >
                <div className="h-10 flex items-center mb-4">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={140}
                    height={40}
                    className="object-contain object-left"
                    style={{
                      maxHeight: "40px",
                      width: "auto",
                      filter: brand.slug === "capture-one" ? "brightness(0) invert(1)" : undefined,
                    }}
                  />
                </div>
                <p className="text-xs mb-3" style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}>
                  Distribuidor oficial desde {brand.year}
                </p>
                <p className="text-sm" style={{ color: "#B7B8B9" }}>
                  {brand.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "#2a2a2b" }}
        aria-label="Contacto"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¿Hablamos?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#B7B8B9" }}>
            Si tienes un proyecto, una duda técnica, o simplemente quieres saber
            qué equipo se adapta mejor a tu trabajo, escríbenos.
          </p>
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, quiero saber más sobre MedPhoto y sus equipos")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
          >
            <MessageCircle size={18} />
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
