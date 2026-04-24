import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Award, HeadphonesIcon, Package } from "lucide-react";
import { getFeaturedProducts, whatsappProduct, formatPrice, WHATSAPP_URL } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "MedPhoto Colombia — Distribuidores Oficiales Profoto, Phase One",
  description:
    "Distribuidores oficiales de Profoto, Phase One, Capture One y TetherTools en Colombia. Equipos fotográficos de alta gama con asesoría personalizada.",
};

const brands = [
  {
    name: "Profoto",
    slug: "profoto",
    logo: "/images/brands/logo-profoto.png",
    tagline: "La luz perfecta, siempre.",
    description: "Flashes y accesorios profesionales para estudio y locación. El estándar de la industria fotográfica mundial.",
    color: "#4CB4E7",
  },
  {
    name: "Phase One",
    slug: "phase-one",
    logo: "/images/brands/logo-phaseone.png",
    tagline: "Formato medio. Sin compromisos.",
    description: "Sistemas de cámara de formato medio de hasta 150 megapíxeles. El pináculo de la calidad de imagen.",
    color: "#B7B8B9",
  },
  {
    name: "Capture One",
    slug: "capture-one",
    logo: "/images/brands/logo-captureone.svg",
    tagline: "El software que los profesionales eligen.",
    description: "Edición RAW con la mejor reproducción de color del mercado. Tethering en tiempo real.",
    color: "#4CB4E7",
  },
  {
    name: "TetherTools",
    slug: "tethertools",
    logo: "/images/brands/logo-tethertools.png",
    tagline: "Conecta. Organiza. Crea.",
    description: "Cables, mesas y accesorios de tethering para sets organizados y flujos de trabajo sin interrupciones.",
    color: "#B7B8B9",
  },
];

const reasons = [
  {
    Icon: Award,
    title: "Distribuidores Oficiales",
    description:
      "Somos el canal oficial de Profoto, Phase One, Capture One y TetherTools en Colombia. Garantías originales y actualizaciones directas del fabricante.",
  },
  {
    Icon: HeadphonesIcon,
    title: "Asesoría Pre y Post Venta",
    description:
      "\"Siempre contigo\" no es solo un tagline. Estamos antes de la compra para ayudarte a elegir, y después para que tu equipo funcione perfecto.",
  },
  {
    Icon: Package,
    title: "Importación a Pedido",
    description:
      "Accede a cualquier producto del catálogo global. Si no está en stock, lo traemos. Phase One y equipos especializados, sin fronteras.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);
  const heroProduct = featured.find((p) => p.isHero) ?? featured[0];

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#4CB4E7 1px, transparent 1px), linear-gradient(90deg, #4CB4E7 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Lifestyle background */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <Image
            src="/images/products/profoto-lifestyle-sara.jpg"
            alt="Fotografía profesional con Profoto"
            fill
            className="object-cover object-center"
            style={{ opacity: 0.25 }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, #0F0F10 0%, #0F0F1080 40%, transparent 100%)",
            }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, #4CB4E70a 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6 border"
                style={{
                  backgroundColor: "#4CB4E71a",
                  borderColor: "#4CB4E740",
                  color: "#4CB4E7",
                  fontFamily: "var(--font-label)",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4CB4E7] animate-pulse" />
                Distribuidor Oficial — Colombia
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                La luz que<br />
                <span style={{ color: "#4CB4E7" }}>los mejores</span><br />
                usan.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "#B7B8B9" }}>
                Profoto, Phase One, Capture One y TetherTools. Los equipos que definen
                el trabajo profesional, ahora disponibles en Colombia con asesoría real.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tienda/"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
                >
                  Ver catálogo
                </Link>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, quiero asesoría sobre equipos fotográficos")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border transition-all hover:border-[#4CB4E7] hover:text-[#4CB4E7]"
                  style={{ borderColor: "#2a2a2b", color: "#B7B8B9", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
                >
                  <MessageCircle size={15} />
                  Pedir asesoría
                </a>
              </div>
            </div>

            {/* Right: featured product */}
            {heroProduct && (
              <div className="flex flex-col items-center lg:items-end">
                <div
                  className="relative w-full max-w-sm rounded-2xl overflow-hidden border p-8"
                  style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
                >
                  <div
                    className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full border"
                    style={{
                      backgroundColor: "#4CB4E71a",
                      borderColor: "#4CB4E740",
                      color: "#4CB4E7",
                      fontFamily: "var(--font-label)",
                    }}
                  >
                    Destacado
                  </div>
                  <div className="relative aspect-square">
                    <Image
                      src={heroProduct.image}
                      alt={heroProduct.name}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 80vw, 400px"
                    />
                  </div>
                  <div className="mt-6">
                    <p
                      className="text-xs uppercase tracking-widest mb-1"
                      style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
                    >
                      {heroProduct.brandLabel}
                    </p>
                    <h2
                      className="text-xl mb-2"
                      style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                    >
                      {heroProduct.name}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: "#B7B8B9" }}>
                      {heroProduct.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-2xl"
                            style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5", fontVariantNumeric: "tabular-nums" }}
                          >
                            $ 10.300.000
                          </span>
                          <span
                            className="text-sm line-through"
                            style={{ color: "#666", fontVariantNumeric: "tabular-nums" }}
                          >
                            $ 12.500.000
                          </span>
                        </div>
                        <p className="text-xs mt-1" style={{ color: "#B7B8B9" }}>
                          IVA incluido · Ahorras $2.200.000
                        </p>
                      </div>
                      <a
                        href={whatsappProduct(heroProduct.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
                        style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)" }}
                      >
                        <MessageCircle size={14} />
                        Pedir
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section
        className="py-20 border-y"
        style={{ borderColor: "#2a2a2b" }}
        aria-label="Marcas"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="text-xs uppercase tracking-widest text-center mb-12"
            style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
          >
            Distribuidores Oficiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#2a2a2b" }}>
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/tienda/${brand.slug}/`}
                className="group flex flex-col p-8 transition-colors hover:bg-[#1A1A1B]"
                style={{ backgroundColor: "#0F0F10" }}
              >
                <div className="mb-3 h-10 flex items-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={160}
                    height={40}
                    className="object-contain object-left"
                    style={{
                      maxHeight: "40px",
                      width: "auto",
                      filter: brand.slug === "capture-one" ? "brightness(0) invert(1)" : undefined,
                    }}
                  />
                </div>
                <p
                  className="text-xs uppercase tracking-wider mb-3"
                  style={{ color: brand.color, fontFamily: "var(--font-label)" }}
                >
                  {brand.tagline}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                  {brand.description}
                </p>
                <span
                  className="mt-4 text-xs inline-flex items-center gap-1 transition-colors group-hover:text-[#4CB4E7]"
                  style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
                >
                  Ver catálogo →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20" aria-label="Productos destacados">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
              >
                Selección
              </p>
              <h2
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Equipos destacados
              </h2>
            </div>
            <Link
              href="/tienda/"
              className="hidden sm:inline-flex text-sm transition-colors hover:text-[#4CB4E7]"
              style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/tienda/"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#4CB4E7]"
              style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY MEDPHOTO ── */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "#2a2a2b" }}
        aria-label="Por qué elegirnos"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Por qué MedPhoto
            </p>
            <h2
              className="text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              No solo vendemos.<br />
              <span style={{ color: "#4CB4E7" }}>Te acompañamos.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map(({ Icon, title, description }) => (
              <div key={title} className="flex flex-col">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#4CB4E71a" }}
                >
                  <Icon size={20} style={{ color: "#4CB4E7" }} />
                </div>
                <h3
                  className="text-lg mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 border-t"
        style={{ borderColor: "#2a2a2b" }}
        aria-label="Contacto"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, #4CB4E71a 0%, #4CB4E705 50%, #4CB4E71a 100%)",
              border: "1px solid #4CB4E730",
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              siempre contigo
            </p>
            <h2
              className="text-3xl sm:text-4xl mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ¿Dudas sobre qué equipo elegir?
            </h2>
            <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#B7B8B9" }}>
              Escríbenos. Conocemos cada producto a fondo y te ayudamos a elegir
              el equipo que realmente necesitas, sin sobrecosto ni presión.
            </p>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, necesito asesoría para elegir un equipo fotográfico")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
