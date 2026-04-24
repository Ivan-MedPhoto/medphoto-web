"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export default function HubSpotForm() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const create = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "9428261",
          formId: "3518743b-004e-4084-895e-74ac98edae2f",
          target: "#hubspot-form",
        });
      }
    };

    const existing = document.querySelector('script[src*="hsforms.net"]');
    if (existing) {
      create();
      return;
    }

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.onload = create;
    document.head.appendChild(script);
  }, []);

  return (
    <div
      id="hubspot-form-container"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "white",
        borderRadius: "8px",
        padding: "32px",
      }}
    >
      <div id="hubspot-form" aria-label="Formulario de contacto" />
    </div>
  );
}
