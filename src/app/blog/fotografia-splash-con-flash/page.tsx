import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fotografía Splash con Flash: Guía Profesional | MedPhoto",
  description:
    "Aprende cómo hacer fotografía splash profesional con iluminación de alta velocidad. Técnicas, equipo y setup explicado paso a paso.",
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
  h2: {
    color: "#4CB4E7",
    fontSize: "1.4rem",
    lineHeight: 1.4,
    marginTop: "48px",
    marginBottom: "16px",
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
  ol: {
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
    marginBottom: "28px",
    fontFamily: "var(--font-heading)",
  } as React.CSSProperties,
};

export default function BlogSplash() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <span style={styles.label}>Producto</span>

        <h1 style={styles.h1}>
          Cómo hacer fotografía splash profesional con flash (guía completa)
        </h1>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_splash_hero.jpg"
            alt="Fotografía splash profesional con flash — MedPhoto Colombia"
            width={800}
            height={500}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          La fotografía splash es una de las técnicas más impactantes dentro de la fotografía
          de producto. Congelar líquidos, polvo o partículas en el aire requiere precisión,
          control de iluminación y el equipo adecuado. En esta guía te mostramos cómo lograr
          resultados profesionales utilizando iluminación de alta velocidad con flash.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>¿Qué es la fotografía splash?</h2>

        <p style={styles.p}>
          La fotografía splash consiste en capturar el momento exacto en el que un objeto
          interactúa con un líquido o partículas, generando una explosión visual controlada.
          No es suerte — es el resultado de una configuración precisa y muchas repeticiones.
        </p>

        <ul style={styles.ul}>
          <li>Publicidad de bebidas</li>
          <li>Fotografía de producto</li>
          <li>Campañas de alto impacto visual</li>
        </ul>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Equipo necesario</h2>

        <ul style={styles.ul}>
          <li>Flash profesional (idealmente Profoto)</li>
          <li>Modificadores de luz (softbox o reflectores)</li>
          <li>Triggers de alta precisión</li>
          <li>Superficie de trabajo controlada</li>
          <li>Cámara con control manual</li>
        </ul>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Setup de iluminación</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_splash_setup.jpg"
            alt="Setup de iluminación para fotografía splash con flash Profoto"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          El setup es clave. En este tipo de fotografía, cada elemento de la iluminación
          cumple una función específica y no hay margen para la improvisación.
        </p>

        <ul style={styles.ul}>
          <li>La iluminación define la textura del splash</li>
          <li>El ángulo de la luz controla los reflejos</li>
          <li>La potencia del flash determina la congelación</li>
        </ul>

        <p style={styles.p}>
          Se recomienda usar flashes con duración de destello corta. Profoto diseña sus
          generadores y monoblocks con t0.1 y t0.5 documentados precisamente para este
          tipo de aplicaciones. Cuanto más corta la duración del destello, más limpia
          la congelación del movimiento.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Cómo hacer fotografía splash paso a paso</h2>

        <ol style={styles.ol}>
          <li>Preparar el escenario — fondo, superficie y contención del líquido</li>
          <li>Configurar cámara en manual — velocidad de sincronización, ISO bajo, apertura media</li>
          <li>Ajustar potencia del flash — priorizar duración de destello corta sobre potencia máxima</li>
          <li>Sincronizar el disparo — trigger físico o sensor de sonido según el setup</li>
          <li>Repetir múltiples veces hasta lograr el resultado — el splash es impredecible por naturaleza</li>
        </ol>

        <p style={styles.p}>
          La consistencia es clave en este proceso. Cada variable que puedas controlar —
          altura de la caída, cantidad de líquido, posición del objeto — reduce la cantidad
          de disparos necesarios para obtener la imagen que buscas.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Iluminación profesional</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_splash_lighting.jpg"
            alt="Iluminación profesional Profoto para fotografía splash de alta velocidad"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          El uso de iluminación profesional permite resultados que son imposibles de lograr
          con luz continua o flash de cámara. La diferencia no es solo estética — es técnica.
        </p>

        <ul style={styles.ul}>
          <li>Congelar movimiento extremo — gotas individuales nítidas a alta velocidad</li>
          <li>Controlar sombras y volumen — dar tridimensionalidad al splash</li>
          <li>Obtener resultados consistentes — misma exposición, misma calidad, disparo tras disparo</li>
        </ul>

        <p style={styles.p}>
          Equipos como Profoto están diseñados específicamente para este tipo de aplicaciones.
          La capacidad de ajustar la potencia en fracciones de stop y la velocidad de reciclaje
          hacen posible trabajar con fluidez en sesiones de alto volumen de disparos.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Resultado final</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_splash_result.jpg"
            alt="Resultado final de fotografía splash profesional con flash"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          El resultado final es una imagen con alto impacto visual, donde cada gota y cada
          partícula está perfectamente definida. Este tipo de imágenes elevan inmediatamente
          la percepción de cualquier producto. Una botella con splash bien ejecutado comunica
          frescura, calidad y dinamismo de una forma que ninguna otra técnica puede igualar.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Errores comunes</h2>

        <ul style={styles.ul}>
          <li>Usar luz continua en lugar de flash — no congela el movimiento con suficiente nitidez</li>
          <li>No controlar los reflejos — superficies reflectivas sin bandera producen hotspots no deseados</li>
          <li>Falta de repetición en el proceso — el primer disparo raramente es el definitivo</li>
          <li>No ajustar correctamente la potencia del flash — más potencia no siempre es mejor congelación</li>
        </ul>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Conclusión</h2>

        <p style={styles.p}>
          La fotografía splash combina técnica, paciencia y equipo profesional. No es la
          especialidad más sencilla, pero el resultado justifica el proceso. Con el setup
          adecuado, puedes lograr imágenes que destacan inmediatamente en cualquier campaña
          y que posicionan tu trabajo en una categoría diferente.
        </p>
        <p style={styles.p}>
          Si ya trabajas con producto y quieres dar el siguiente paso, el splash es una de
          las habilidades con mayor retorno en términos de diferenciación visual.
        </p>

        {/* CTA */}
        <div style={styles.ctaBox}>
          <p style={styles.ctaText}>¿Quieres lograr este tipo de resultados en tus proyectos?</p>
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
            Hablar con MedPhoto
          </Link>
        </div>

      </div>
    </div>
  );
}
