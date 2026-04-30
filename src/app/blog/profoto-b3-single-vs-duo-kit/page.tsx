import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profoto B3: ¿Single o Duo Kit? Cómo elegir según tu forma de trabajar | MedPhoto",
  description:
    "750 Ws de batería en campo. Comparativa real entre el Profoto B3 Single y el Duo Kit para elegir según tu flujo de trabajo.",
  openGraph: {
    title: "Profoto B3: ¿Single o Duo Kit? Cómo elegir según tu forma de trabajar",
    description:
      "750 Ws de batería en campo. Comparativa real entre el Profoto B3 Single y el Duo Kit para elegir según tu flujo de trabajo.",
    url: "https://medphoto.com.co/blog/profoto-b3-single-vs-duo-kit/",
    siteName: "MedPhoto Colombia",
    images: [
      {
        url: "https://medphoto.com.co/blog/medphoto_profoto_b3_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Profoto B3 en set de fotografía de exteriores — Single vs Duo Kit",
      },
    ],
    locale: "es_CO",
    type: "article",
  },
};

const styles = {
  page: {
    backgroundColor: "#0F0F10",
    minHeight: "100vh",
    padding: "60px 0 80px",
  } as React.CSSProperties,
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 24px",
  } as React.CSSProperties,
  label: {
    color: "#4CB4E7",
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    marginBottom: "16px",
    display: "block",
    fontFamily: "var(--font-label)",
  },
  h1: {
    color: "#F5F5F5",
    fontSize: "2rem",
    lineHeight: 1.3,
    marginBottom: "24px",
    fontFamily: "var(--font-heading)",
  } as React.CSSProperties,
  intro: {
    color: "#B7B8B9",
    fontSize: "1.1rem",
    lineHeight: 1.8,
    marginBottom: "40px",
  } as React.CSSProperties,
  h2: {
    color: "#4CB4E7",
    fontSize: "1.4rem",
    lineHeight: 1.4,
    marginTop: "48px",
    marginBottom: "16px",
    fontFamily: "var(--font-heading)",
  } as React.CSSProperties,
  h3: {
    color: "#F5F5F5",
    fontSize: "1.1rem",
    lineHeight: 1.4,
    marginTop: "32px",
    marginBottom: "12px",
    fontFamily: "var(--font-heading)",
  } as React.CSSProperties,
  p: {
    color: "#B7B8B9",
    lineHeight: 1.8,
    fontSize: "1rem",
    marginBottom: "16px",
  } as React.CSSProperties,
  ul: {
    color: "#B7B8B9",
    lineHeight: 1.8,
    fontSize: "1rem",
    paddingLeft: "20px",
    marginBottom: "16px",
  } as React.CSSProperties,
  imageWrapper: {
    margin: "24px 0",
    borderRadius: "8px",
    overflow: "hidden",
  } as React.CSSProperties,
  hr: {
    borderColor: "#333",
    borderStyle: "solid" as const,
    borderTopWidth: 1,
    margin: "40px 0",
  },
  ctaBox: {
    backgroundColor: "#1A1A1B",
    border: "1px solid #2a2a2b",
    borderRadius: "12px",
    padding: "40px 32px",
    textAlign: "center" as const,
    marginTop: "56px",
  },
  ctaText: {
    color: "#F5F5F5",
    fontSize: "1.25rem",
    marginBottom: "8px",
    fontFamily: "var(--font-heading)",
  } as React.CSSProperties,
  ctaSub: {
    color: "#B7B8B9",
    fontSize: "0.95rem",
    marginBottom: "28px",
  } as React.CSSProperties,
  ctaBtn: {
    display: "inline-block",
    backgroundColor: "#4CB4E7",
    color: "#0F0F10",
    padding: "14px 28px",
    borderRadius: "6px",
    fontWeight: "bold" as const,
    fontSize: "0.9rem",
    textDecoration: "none",
    fontFamily: "var(--font-label)",
    letterSpacing: "0.05em",
  } as React.CSSProperties,
};

export default function BlogProfotoB3SingleVsDuo() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <span style={styles.label}>Producto · Profoto</span>

        <h1 style={styles.h1}>
          Profoto B3: ¿Single o Duo Kit? Cómo elegir según tu forma de trabajar
        </h1>

        {/* Introducción — ~50 palabras */}
        <p style={styles.intro}>
          El Profoto B3 entrega 750 Ws de potencia de batería en campo, con la duración de flash
          más corta de su categoría. Viene en dos versiones: una sola cabeza o un kit de dos.
          Elegir mal puede dejarte corto en un set exigente o pagando por capacidad que no usas.
        </p>

        {/* Imagen hero */}
        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_profoto_b3_hero.jpg"
            alt="Profoto B3 en exteriores — Single vs Duo Kit"
            width={800}
            height={500}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <hr style={styles.hr} />

        {/* Desarrollo — ~200 palabras */}
        <h2 style={styles.h2}>Cómo funciona el sistema B3</h2>

        <p style={styles.p}>
          El B3 es un flash de batería monoblock: generador y cabeza de flash integrados en una
          sola unidad. El Single es exactamente eso — una unidad completa con 750 Ws disponibles
          al 100% de potencia. El Duo Kit incluye dos cabezas que comparten el mismo generador
          de batería, dividiendo la potencia entre ambas cuando se usan de forma simultánea.
        </p>
        <p style={styles.p}>
          Esto significa que en modo Duo, cada cabeza tiene acceso a hasta 750 Ws pero el banco
          de energía es compartido. La velocidad de recarga baja cuando las dos trabajan en
          ráfaga. Para la mayoría de los sets, no es un problema — pero es un dato que importa
          en shootings de alta cadencia.
        </p>

        <h2 style={styles.h2}>Cuándo elegir el Single</h2>

        <ul style={styles.ul}>
          <li>Trabajas con una sola fuente de luz principal más relleno natural o reflector</li>
          <li>Ya tienes otro flash como B10X o A10 para complementar</li>
          <li>Shooting de retrato individual en exteriores con modificador portátil</li>
          <li>Presupuesto de entrada: el Single cuesta significativamente menos que el Duo Kit</li>
          <li>Quieres escalar el sistema más adelante añadiendo una segunda unidad</li>
        </ul>

        <h2 style={styles.h2}>Cuándo elegir el Duo Kit</h2>

        <ul style={styles.ul}>
          <li>Necesitas key y fill del mismo sistema para consistencia de temperatura de color</li>
          <li>Fotografía de moda o publicidad con set iluminado en dos puntos de forma constante</li>
          <li>Eventos o bodas donde no puedes depender de dos baterías independientes</li>
          <li>Producto o editorial con luz principal y luz de fondo simultáneas en campo</li>
          <li>El costo por cabeza del Duo Kit es menor que comprar dos Singles por separado</li>
        </ul>

        <p style={styles.p}>
          La pregunta concreta: ¿cuántos puntos de luz del mismo sistema necesitas activos al
          mismo tiempo en tus sets habituales? Si la respuesta es uno, el Single es suficiente.
          Si la respuesta es dos con regularidad, el Duo Kit paga la diferencia en la primera
          temporada de trabajo.
        </p>

        <hr style={styles.hr} />

        {/* CTA final — ~50 palabras */}
        <div style={styles.ctaBox}>
          <p style={styles.ctaText}>¿Cuál B3 tiene sentido para tu kit?</p>
          <p style={styles.ctaSub}>
            Consulta precios actualizados en Colombia y disponibilidad inmediata de ambas versiones.
            Si tienes dudas sobre cuál encaja mejor con tu equipo actual, escríbenos.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/tienda/profoto/profoto-pro-b3-750/"
              style={styles.ctaBtn}
            >
              Ver Profoto B3 Single
            </Link>
            <Link
              href="/tienda/profoto/profoto-pro-b3-750-duo/"
              style={{ ...styles.ctaBtn, backgroundColor: "#1A1A1B", color: "#4CB4E7", border: "1px solid #4CB4E730" }}
            >
              Ver Profoto B3 Duo Kit
            </Link>
          </div>
          <div style={{ marginTop: "16px" }}>
            <a
              href={`https://wa.me/573243680862?text=${encodeURIComponent("Hola, quiero saber cuál Profoto B3 me conviene según mi flujo de trabajo")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4CB4E7", fontSize: "0.875rem", fontFamily: "var(--font-label)" }}
            >
              Consultar por WhatsApp →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
