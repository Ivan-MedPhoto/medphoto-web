import type { Brand } from "./products";

export interface RentalItem {
  slug: string;
  brand: Brand;
  name: string;
  hook: string;
  description: string;
  specs: string[];
  whatsappMessage: string;
  status: "active" | "coming-soon";
}

export const rentals: RentalItem[] = [
  {
    slug: "phase-one-iq3-100",
    brand: "phase-one",
    name: "Phase One IQ3 100",
    hook: "¿Tu próximo shoot necesita 100MP?",
    description:
      "Alquila el respaldo digital Phase One IQ3 100 por los días que lo necesites, sin comprometer los $50-60M+ COP que cuesta un sistema Phase One propio.",
    specs: [
      "Sensor CMOS 101MP formato medio 54×40mm",
      "15 stops de rango dinámico",
      "ISO 50–12.800",
      "Exposiciones largas hasta 60 minutos",
    ],
    whatsappMessage: "Hola, quiero cotizar el alquiler del respaldo Phase One IQ3 100",
    status: "active",
  },
];
