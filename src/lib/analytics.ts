import type { WhatsAppOrigin } from "@/data/products";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Evento GA4 al hacer click en cualquier CTA de WhatsApp del sitio.
// Ver MEDPHOTO_ESTADO_ACTUAL.md §10 — todo el contacto entrante convergía
// en el mismo número sin diferenciar canal/página de origen.
export function trackWhatsAppClick(origin: WhatsAppOrigin, product?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "whatsapp_click", {
    origin,
    ...(product ? { product } : {}),
  });
}
