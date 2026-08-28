import type { Brand } from "./products";

export interface RentalItem {
  slug: string;
  brand: Brand;
  name: string;
  hook: string;
  description: string;
  specs: string[];
  useCases: string[];
  whatsappMessage: string;
  status: "active" | "coming-soon";
  image: string;
  includes: { category: string; items: string[] }[];
}

export const rentals: RentalItem[] = [
  {
    slug: "phase-one-iq3-100",
    brand: "phase-one",
    name: "Phase One IQ3 100",
    hook: "¿Tu próximo shoot necesita 100MP?",
    image: "/alquiler/phase-one-iq3-100.jpg",
    description:
      "Alquila el sistema completo Phase One 645DF+ con respaldo digital IQ3 100 por los días que lo necesites, sin comprometer los $50-60M+ COP que cuesta un sistema Phase One propio.",
    specs: [
      "Sensor CMOS 101MP formato medio 53.7×40.4mm",
      "15 stops de rango dinámico",
      "ISO 50–12.800",
      "Exposiciones largas hasta 60 minutos",
    ],
    useCases: [
      "Moda y belleza de alta resolución",
      "Producto y still life",
      "Arquitectura e interiorismo",
      "Campañas publicitarias",
      "Reproducción de arte y patrimonio",
      "Fotografía de movimiento con flash de alta velocidad — sincronización hasta 1/1.600s con los lentes Schneider (80mm y 110mm)",
    ],
    whatsappMessage:
      "Hola, estoy interesado en alquilar el sistema Phase One IQ3 100. ¿Me pueden confirmar disponibilidad y cotizarlo para mi proyecto? Lo necesitaría del [fecha] al [fecha]. Gracias",
    status: "active",
    includes: [
      {
        category: "Cuerpo y respaldo",
        items: [
          "Cuerpo de cámara Phase One 645DF+",
          "Respaldo digital Phase One IQ3 100",
          "Grip vertical",
        ],
      },
      {
        category: "Óptica",
        items: [
          "Lente Schneider 80mm",
          "Lente Schneider 110mm",
          "Lente Phase One 120mm Macro*",
        ],
      },
      {
        category: "Energía",
        items: [
          "2 baterías IQ",
          "Cargador de baterías IQ",
          "Cable para cargador de carro de baterías IQ",
          "Batería de litio para 645",
          "Cargador de batería 645 con cable de corriente",
          "Cassette de pilas AA para 645",
        ],
      },
      {
        category: "Almacenamiento y transferencia",
        items: [
          "Tarjeta CF 32GB SanDisk Extreme PRO",
          "Lector de tarjeta con cable",
          "2 cables USB 3",
          "Cable Mini HDMI",
        ],
      },
      {
        category: "Accesorios",
        items: [
          "Anillo de extensión #2",
          "Paquete de tarjetas de gris QP Card",
        ],
      },
      {
        category: "Transporte",
        items: ["Maleta Pelican Phase One con maletín interno Phase One"],
      },
    ],
  },
];
