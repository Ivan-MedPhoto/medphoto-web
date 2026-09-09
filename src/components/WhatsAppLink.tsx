"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import type { WhatsAppOrigin } from "@/data/products";

interface WhatsAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  origin: WhatsAppOrigin;
  product?: string;
}

// Envoltorio de <a> para los CTA de WhatsApp: dispara el evento GA4
// `whatsapp_click` con el origen (página/sección) antes de dejar navegar
// el link normalmente. Usable desde server components (se importa como
// client component hijo) sin convertir la página entera a "use client".
export default function WhatsAppLink({
  origin,
  product,
  onClick,
  children,
  ...rest
}: WhatsAppLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackWhatsAppClick(origin, product);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
