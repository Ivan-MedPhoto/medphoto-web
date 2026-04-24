import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fotografía de Retrato Profesional: Iluminación y Técnica | MedPhoto",
  description:
    "Aprende cómo iluminar retratos profesionales con flash. Setup, técnicas y ejemplos reales con equipos Profoto.",
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

export default function BlogRetrato() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <span style={styles.label}>Retrato</span>

        <h1 style={styles.h1}>
          Cómo lograr retratos profesionales con iluminación de estudio (guía completa)
        </h1>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_retrato_hero.jpg"
            alt="Retrato profesional con iluminación de estudio — MedPhoto Colombia"
            width={800}
            height={500}
            priority
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          La diferencia entre un retrato amateur y uno profesional no está en la cámara,
          sino en la iluminación. Un buen retrato no solo muestra a la persona, sino que
          construye una atmósfera, define volúmenes y dirige la atención exactamente donde
          el fotógrafo quiere. En esta guía te mostramos cómo lograr retratos de alto nivel
          utilizando iluminación profesional.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>¿Qué hace que un retrato sea profesional?</h2>

        <ul style={styles.ul}>
          <li>Control de luz</li>
          <li>Dirección del sujeto</li>
          <li>Consistencia en el resultado</li>
        </ul>

        <p style={styles.p}>
          La iluminación es el factor más determinante. Puedes tener el modelo perfecto,
          el fondo ideal y la cámara más cara del mercado, pero si la luz no está bien
          resuelta, el resultado no será profesional. La buena noticia es que la iluminación
          se aprende y se repite con el equipo correcto.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Setup de iluminación</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_retrato_setup.jpg"
            alt="Setup de iluminación para retrato profesional con Profoto"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          En estudio, el control lo es todo. A diferencia de la luz natural, el flash te
          permite decidir exactamente de dónde viene la luz, con qué calidad y en qué
          proporción respecto al fondo y al relleno.
        </p>

        <ul style={styles.ul}>
          <li>Luz principal (key light) — define la dirección y el carácter de la imagen</li>
          <li>Luz de relleno o contraste — controla cuánto detalle hay en las sombras</li>
          <li>Modificadores como softbox o reflectores — determinan la calidad de la luz</li>
        </ul>

        <p style={styles.p}>
          La posición y calidad de la luz define completamente el resultado final. Un softbox
          grande colocado a 45 grados produce un look editorial clásico. Una fuente más pequeña
          y lateral da dramatismo. Entender estas relaciones es lo que distingue a un fotógrafo
          que controla la luz de uno que solo la usa.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Resultado final</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_retrato_result_01.jpg"
            alt="Resultado final de retrato profesional con iluminación controlada"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <ul style={styles.ul}>
          <li>La piel se ve natural — sin brillos duros ni sombras sin intención</li>
          <li>Las sombras tienen intención — no son accidentales, construyen el volumen</li>
          <li>El sujeto destaca del fondo — sin recortar artificialmente en postproducción</li>
        </ul>

        <p style={styles.p}>
          Esto es lo que separa una foto correcta de una imagen profesional. Cuando la luz
          está bien, la postproducción se convierte en un ajuste fino, no en un rescate.
          El resultado es más limpio, más rápido y más consistente entre sesión y sesión.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Detalle y calidad de luz</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_retrato_detail.jpg"
            alt="Detalle de retrato con calidad de luz profesional — catchlight y textura"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          En retrato, los detalles importan. La diferencia entre una imagen buena y una
          imagen que detiene al espectador está en cosas que parecen pequeñas pero que
          el ojo siente inmediatamente.
        </p>

        <ul style={styles.ul}>
          <li>Textura de la piel — visible sin ser excesiva, con gradación natural</li>
          <li>Brillos en ojos — el catchlight define si el retrato tiene vida o no</li>
          <li>Transiciones de sombra — suaves o duras según la intención, nunca accidentales</li>
        </ul>

        <p style={styles.p}>
          Los modificadores de luz son clave para lograr este nivel de control. Un paraguas
          Deep con difusor produce catchlights circulares y limpios. Un octabox da una
          transición más suave. Un beauty dish concentra la luz con más carácter. Conocer
          cada herramienta te permite elegir la correcta para cada trabajo.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Retrato en locación</h2>

        <div style={styles.imageWrapper}>
          <Image
            src="/blog/medphoto_retrato_location.jpg"
            alt="Fotografía de retrato en locación exterior con flash portátil Profoto"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        <p style={styles.p}>
          La iluminación profesional no es solo para estudio. Con equipos portátiles como
          el Profoto B10 o B1X, puedes llevar el control del estudio a cualquier locación
          y trabajar con la misma consistencia que en interior.
        </p>

        <ul style={styles.ul}>
          <li>Controlar el sol — usar el flash como key light y subexponer el ambiente</li>
          <li>Equilibrar exposición — mezclar luz natural y artificial de forma intencional</li>
          <li>Crear looks consistentes — independientemente de la hora o el clima</li>
        </ul>

        <p style={styles.p}>
          Esto abre posibilidades creativas mucho más amplias. En lugar de depender de la
          hora dorada o de buscar sombra, defines tú la luz. El resultado es una firma
          visual reconocible que no cambia entre sesión y sesión.
        </p>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Errores comunes en retrato con flash</h2>

        <ul style={styles.ul}>
          <li>Usar luz plana sin dirección — iluminar desde el eje de la cámara aplana el rostro</li>
          <li>No controlar sombras — dejar que caigan donde quieran rompe la intención</li>
          <li>Depender solo de luz natural — limita horarios, locaciones y consistencia</li>
          <li>No usar modificadores — el flash desnudo es demasiado duro para retrato</li>
        </ul>

        <hr style={styles.hr} />

        <h2 style={styles.h2}>Conclusión</h2>

        <p style={styles.p}>
          La iluminación es la herramienta más poderosa en fotografía de retrato. Dominarla
          no solo mejora tus fotos, sino que transforma completamente tu trabajo: más
          consistencia, más control, más velocidad en postproducción y una firma visual
          propia que los clientes reconocen y buscan.
        </p>
        <p style={styles.p}>
          El punto de entrada no tiene que ser costoso. Entender los principios — dirección,
          calidad, contraste — es lo primero. El equipo correcto hace que aplicarlos sea
          más fácil y más repetible.
        </p>

        {/* CTA */}
        <div style={styles.ctaBox}>
          <p style={styles.ctaText}>¿Quieres llevar tus retratos al siguiente nivel?</p>
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
