"use client";

import { useState } from "react";

const PORTAL_ID = "9428261";
const FORM_ID = "fe713f94-46ec-45cb-987e-1e681443a2fe";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadMagnetForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const firstname = (form.elements.namedItem("firstname") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const lead_origin = (form.elements.namedItem("lead_origin") as HTMLInputElement).value;

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: firstname },
              { objectTypeId: "0-1", name: "email", value: email },
              { objectTypeId: "0-1", name: "lead_origin", value: lead_origin },
            ],
            context: {
              pageUri: "https://medphoto.com.co/guia-roi-profoto/",
              pageName: "Guía ROI Profoto — MedPhoto Colombia",
            },
          }),
        }
      );

      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-10 text-center border"
        style={{ backgroundColor: "#1A1A1B", borderColor: "#4CB4E740" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "#4CB4E71a" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#4CB4E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="text-xl mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "#F5F5F5" }}
        >
          ¡Listo! Revisa tu correo
        </h3>
        <p className="text-sm" style={{ color: "#B7B8B9" }}>
          Te enviamos la guía a tu email. Si no aparece en bandeja principal, revisa spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="lm-firstname"
            className="block text-xs uppercase tracking-widest mb-2"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-label)" }}
          >
            Nombre
          </label>
          <input
            id="lm-firstname"
            name="firstname"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Tu nombre"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#9CA3AF]"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D1D5DB",
              color: "#1A1A1A",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#4CB4E7")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
          />
        </div>

        <div>
          <label
            htmlFor="lm-email"
            className="block text-xs uppercase tracking-widest mb-2"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-label)" }}
          >
            Email
          </label>
          <input
            id="lm-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@email.com"
            className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#9CA3AF]"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D1D5DB",
              color: "#1A1A1A",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#4CB4E7")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
          />
        </div>

        <input type="hidden" name="lead_origin" value="lead_magnet_profoto_b3" />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-lg px-6 py-4 text-sm font-medium transition-all hover:opacity-90 disabled:opacity-60"
          style={{
            backgroundColor: "#4CB4E7",
            color: "#0F0F10",
            fontFamily: "var(--font-label)",
            letterSpacing: "0.05em",
          }}
        >
          {status === "submitting" ? "Enviando..." : "Descargar guía gratuita"}
        </button>

        {status === "error" && (
          <p className="text-xs text-center" style={{ color: "#f87171" }}>
            Hubo un error. Inténtalo de nuevo o escríbenos por WhatsApp.
          </p>
        )}

        <p className="text-xs text-center" style={{ color: "#555" }}>
          Sin spam. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </form>
  );
}
