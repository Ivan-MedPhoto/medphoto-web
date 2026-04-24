import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cómo elegir el paraguas de iluminación ideal | MedPhoto Colombia",
  description:
    "Aprende cómo elegir el paraguas de iluminación perfecto para fotografía. Guía completa sobre tipos, tamaños y usos profesionales.",
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
};

export default function BlogParaguas() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <span style={styles.label}>Iluminación</span>

        <h1 style={styles.h1}>
          Cómo elegir el paraguas de iluminación ideal para fotografía profesional
        </h1>

        <p style={styles.intro}>
          Si estás empezando con iluminación artificial o quieres ampliar tu kit, el paraguas fotográfico
          es uno de los modificadores más versátiles y accesibles. Pero no todos los paraguas son
          iguales: la diferencia entre un retrato plano y uno con volumen puede estar en cuál elegiste.
        </p>

        {/* Imagen hero */}
        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_paraguas_profoto_deep_hero.jpg"
            alt="Paraguas Profoto Deep en sesión de fotografía de retrato profesional"
            width={800}
            height={500}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>¿Qué es un paraguas de fotografía y para qué sirve?</h2>

        <p style={styles.p}>
          Un paraguas fotográfico es un modificador de luz que se monta directamente sobre el flash
          o strobe. Su función es ampliar y suavizar la fuente de luz, reduciendo sombras duras y
          aportando una iluminación más envolvente. Es el modificador de entrada por excelencia:
          ligero, rápido de montar y compatible con casi cualquier sistema de flash.
        </p>
        <p style={styles.p}>
          A diferencia de un softbox, el paraguas no encierra la luz. Esto lo hace menos direccional
          pero también más práctico cuando necesitas trabajar rápido o en espacios reducidos.
        </p>

        <h2 style={styles.h2}>Los dos tipos principales: reflexivo y traslúcido</h2>

        <h3 style={styles.h3}>Paraguas reflexivo</h3>
        <p style={styles.p}>
          El flash apunta hacia adentro del paraguas y la luz rebota hacia el sujeto. El interior
          puede ser blanco (luz suave y difusa), plateado (más contraste y brillo especular) o dorado
          (tono cálido, útil para pieles). Es el más común y el que encontrarás en la mayoría de kits
          de inicio.
        </p>

        <h3 style={styles.h3}>Paraguas traslúcido (shoot-through)</h3>
        <p style={styles.p}>
          El flash apunta hacia el sujeto y la tela actúa como difusor. Produce una luz más suave y
          directa, con un catchlight circular limpio en el ojo del sujeto. Pierde más potencia que el
          reflexivo pero el resultado es más parecido a una ventana.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Deep vs. Shallow: la forma importa</h2>

        <p style={styles.p}>
          Dentro de los reflexivos, la profundidad del paraguas cambia radicalmente el resultado.
          Profoto, por ejemplo, distingue claramente entre sus modelos Deep y sus versiones estándar.
        </p>

        <h3 style={styles.h3}>Paraguas Deep (profundo)</h3>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_paraguas_profoto_deep.jpg"
            alt="Paraguas Profoto Deep XL con cubierta difusora instalada"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          El paraguas Deep tiene una curvatura más pronunciada. Esto concentra mejor la luz, reduce
          el derrame hacia los lados y produce un patrón más controlado. El resultado es una luz que
          se siente más envolvente sin perder dirección. Es la elección preferida para retratos de
          belleza, editoriales y situaciones donde necesitas precisión.
        </p>
        <ul style={styles.ul}>
          <li>Mayor control de la dirección de la luz</li>
          <li>Menos spill hacia los lados y el fondo</li>
          <li>Catchlight más definido</li>
          <li>Ideal para trabajar en interiores con paredes claras</li>
        </ul>

        <h3 style={styles.h3}>Paraguas Shallow (plano)</h3>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_paraguas_profoto_shallow.jpg"
            alt="Paraguas Profoto Shallow en set de fotografía"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          Menos profundo, con una curvatura más abierta. Distribuye la luz de forma más amplia y
          envolvente. Es la opción para grupos, fotografía de producto sobre fondo blanco o cuando
          necesitas llenar todo el set de luz suave. Más difícil de controlar en espacios reducidos.
        </p>
        <ul style={styles.ul}>
          <li>Cobertura más amplia</li>
          <li>Mejor para grupos o productos grandes</li>
          <li>Más spill, útil cuando quieres iluminar el fondo también</li>
        </ul>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Tamaños disponibles y cuándo usar cada uno</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_paraguas_profoto_tipos.jpg"
            alt="Comparativa de tamaños de paraguas Profoto: S, M, L y XL"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          El tamaño del modificador define qué tan suave es la luz. A mayor tamaño relativo al sujeto,
          más suave la transición entre luces y sombras. Profoto ofrece sus paraguas Deep en cuatro
          tamaños:
        </p>
        <ul style={styles.ul}>
          <li><strong style={{ color: "#F5F5F5" }}>S (85 cm)</strong> — retratos en primer plano, estudio pequeño, viaje</li>
          <li><strong style={{ color: "#F5F5F5" }}>M (105 cm)</strong> — retratos de medio cuerpo, el más versátil</li>
          <li><strong style={{ color: "#F5F5F5" }}>L (130 cm)</strong> — cuerpo completo, grupos pequeños, moda</li>
          <li><strong style={{ color: "#F5F5F5" }}>XL (165 cm)</strong> — grupos grandes, producto en escala, envolvente extremo</li>
        </ul>
        <p style={styles.p}>
          Para la mayoría de fotógrafos que empiezan, el M es el punto de entrada correcto.
          Suficientemente grande para producir luz suave en retratos, manejable para transportar.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Difusor vs. sin difusor</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_paraguas_difusor_softbox.jpg"
            alt="Paraguas Profoto con y sin difusor frontal comparativa de luz"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          Muchos paraguas, especialmente los Deep de Profoto, incluyen o son compatibles con una
          cubierta difusora frontal. Esta tela transforma el paraguas reflexivo en algo parecido a un
          softbox: contiene la luz, reduce el spill y produce un catchlight más uniforme y limpio.
        </p>
        <p style={styles.p}>
          Sin difusor: más potencia, luz ligeramente más contrastada, catchlight con textura de las
          varillas visibles. Con difusor: pierdes entre 1 y 1.5 stops de potencia, pero la suavidad
          y el control aumentan notablemente.
        </p>
        <p style={styles.p}>
          Si vas a fotografiar retratos de belleza o editorial, el difusor es casi obligatorio.
          Para deportes en interiores o cuando necesitas potencia máxima, prescinde de él.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>El backpanel: cuando quieres solo el fondo iluminado</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_paraguas_backpanel.jpg"
            alt="Paraguas Profoto con backpanel negro para controlar spill"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          El backpanel es una cubierta negra que se coloca en la parte trasera del paraguas. Su
          función es eliminar el spill de luz que sale por detrás y los lados cuando se usa como
          traslúcido. El resultado es una dirección de luz mucho más limpia, sin contaminar paredes
          ni fondo.
        </p>
        <p style={styles.p}>
          Es especialmente útil en estudios pequeños o cuando necesitas control total sobre la
          relación de luz entre el sujeto y el fondo. Profoto incluye el backpanel en sus kits
          de paraguas Deep, y también se vende por separado.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Resumen: ¿cuál elegir?</h2>

        <ul style={styles.ul}>
          <li><strong style={{ color: "#F5F5F5" }}>Retratos individuales en estudio</strong> — Deep M con difusor</li>
          <li><strong style={{ color: "#F5F5F5" }}>Moda o cuerpo completo</strong> — Deep L</li>
          <li><strong style={{ color: "#F5F5F5" }}>Grupos o producto grande</strong> — Shallow L o XL</li>
          <li><strong style={{ color: "#F5F5F5" }}>Viaje o exteriores</strong> — Traslúcido M con backpanel</li>
          <li><strong style={{ color: "#F5F5F5" }}>Control máximo en espacio pequeño</strong> — Deep S con difusor</li>
          <li><strong style={{ color: "#F5F5F5" }}>Primer kit, uso general</strong> — Deep M, el más versátil</li>
        </ul>

        <p style={styles.p}>
          No existe el paraguas perfecto para todo. Pero entendiendo la diferencia entre forma,
          tamaño y acabado interior, puedes tomar una decisión informada que sirva para tu flujo
          de trabajo específico. Si tienes dudas sobre compatibilidad con tu flash o sobre qué
          modelo tiene sentido para tu kit actual, escríbenos.
        </p>

        {/* CTA */}
        <div style={styles.ctaBox}>
          <p style={styles.ctaText}>¿No estás seguro cuál paraguas necesitas?</p>
          <p style={styles.ctaSub}>
            Cuéntanos qué tipo de fotografía haces y te recomendamos el modificador correcto
            para tu kit y tu presupuesto.
          </p>
          <Link
            href="/contacto"
            style={{
              display: "inline-block",
              backgroundColor: "#4CB4E7",
              color: "#0F0F10",
              padding: "14px 32px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "0.95rem",
              textDecoration: "none",
              fontFamily: "var(--font-label)",
              letterSpacing: "0.05em",
            }}
          >
            Hablar con un asesor
          </Link>
        </div>

      </div>
    </div>
  );
}
