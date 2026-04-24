import type { Metadata } from "next";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "@/data/products";
import HubSpotForm from "@/components/HubSpotForm";

export const metadata: Metadata = {
  title: "Contacto — MedPhoto Colombia",
  description:
    "Contáctanos para asesoría sobre equipos Profoto, Phase One, Capture One y TetherTools. WhatsApp +57 324 368 0862 · Bogotá, Colombia.",
};

const contactMethods = [
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "+57 324 368 0862",
    href: `${WHATSAPP_URL}?text=${encodeURIComponent("Hola, quiero información sobre equipos fotográficos")}`,
    cta: "Escribir ahora",
    highlight: true,
  },
  {
    Icon: Mail,
    label: "Correo electrónico",
    value: "contacto@medphoto.com.co",
    href: "mailto:contacto@medphoto.com.co",
    cta: "Enviar correo",
    highlight: false,
  },
  {
    Icon: Clock,
    label: "Horario de atención",
    value: "Lunes a viernes\n8:00 am – 5:00 pm",
    href: null,
    cta: null,
    highlight: false,
  },
  {
    Icon: MapPin,
    label: "Ubicación",
    value: "Bogotá, Colombia\nServicio a domicilio y en tu locación",
    href: null,
    cta: null,
    highlight: false,
  },
];

const faqs = [
  {
    q: "¿Tienen tienda física?",
    a: "No. Operamos de forma remota con bodega privada. Realizamos visitas a clientes en Bogotá y enviamos a todo Colombia.",
  },
  {
    q: "¿Los precios incluyen IVA?",
    a: "Los precios de Profoto, Capture One y TetherTools están expresados en COP con IVA incluido. Los equipos Phase One se cotizan en USD por ser importación bajo pedido.",
  },
  {
    q: "¿Cómo funciona la importación de Phase One?",
    a: "Los sistemas Phase One se importan bajo orden. Contáctanos con el modelo que necesitas, te enviamos cotización en COP con el tipo de cambio del día y tiempos de entrega estimados.",
  },
  {
    q: "¿Ofrecen garantía?",
    a: "Sí. Al ser distribuidores oficiales, todos nuestros equipos incluyen garantía del fabricante. El proceso de garantía lo gestionamos directamente con la marca.",
  },
  {
    q: "¿Hacen demostraciones de equipos?",
    a: "Sí, podemos coordinar demostraciones en Bogotá. Escríbenos por WhatsApp para agendar.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="py-20" aria-label="Contacto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Estamos para ti
            </p>
            <h1
              className="text-4xl sm:text-5xl leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contáctanos
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "#B7B8B9" }}>
              ¿Tienes un proyecto en mente? Hablemos.
              Respuesta rápida por WhatsApp en horario de atención.
              Para cotizaciones de Phase One y equipos especializados,
              escríbenos con tu requerimiento específico.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {contactMethods.map(({ Icon, label, value, href, cta, highlight }) => (
              <div
                key={label}
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: "#1A1A1B",
                  borderColor: highlight ? "#4CB4E740" : "#2a2a2b",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: highlight ? "#4CB4E71a" : "#252526" }}
                >
                  <Icon size={18} style={{ color: highlight ? "#4CB4E7" : "#B7B8B9" }} />
                </div>
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
                >
                  {label}
                </p>
                <p
                  className="text-sm leading-relaxed mb-4 whitespace-pre-line"
                  style={{ color: "#F5F5F5" }}
                >
                  {value}
                </p>
                {href && cta && (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-xs font-medium transition-colors hover:opacity-80"
                    style={{
                      color: highlight ? "#4CB4E7" : "#B7B8B9",
                      fontFamily: "var(--font-label)",
                    }}
                  >
                    {cta} →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* HubSpot Contact Form */}
          <div className="mb-20">
            <div className="max-w-2xl mb-10">
              <p
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
              >
                Escríbenos
              </p>
              <h2
                className="text-2xl sm:text-3xl mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Déjanos tus datos
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                Completa el formulario y te contactamos en menos de 24 horas.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 sm:p-10 border"
              style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
            >
              <HubSpotForm />
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div
            className="rounded-2xl p-10 text-center mb-20"
            style={{
              background: "linear-gradient(135deg, #4CB4E71a 0%, #4CB4E705 50%, #4CB4E71a 100%)",
              border: "1px solid #4CB4E730",
            }}
          >
            <h2
              className="text-2xl sm:text-3xl mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              La forma más rápida de hablar con nosotros
            </h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#B7B8B9" }}>
              WhatsApp. Atendemos en horario comercial y respondemos el mismo día.
            </p>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, quiero información sobre equipos fotográficos")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: "#4CB4E7", color: "#0F0F10", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
            >
              <MessageCircle size={18} />
              Abrir WhatsApp
            </a>
          </div>

          {/* FAQ */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-8"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Preguntas frecuentes
            </p>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="py-6 border-b"
                  style={{ borderColor: "#2a2a2b" }}
                >
                  <h3
                    className="text-base mb-2"
                    style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
