import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface LegalPageProps {
  label: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalPage({ label, title, updatedAt, children }: LegalPageProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs mb-10 transition-colors hover:text-[#4CB4E7]"
          style={{ color: "#B7B8B9", fontFamily: "var(--font-label)", letterSpacing: "0.06em" }}
        >
          <ChevronLeft size={14} />
          Inicio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
          >
            {label}
          </p>
          <h1
            className="text-3xl sm:text-4xl leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h1>
          <p className="text-xs" style={{ color: "#B7B8B9" }}>
            {updatedAt}
          </p>
        </div>

        {/* Divider */}
        <div className="mb-12 h-px" style={{ backgroundColor: "#2a2a2b" }} />

        {/* Content */}
        <div className="legal-content">
          {children}
        </div>

        {/* Footer nav */}
        <div
          className="mt-16 pt-8 border-t flex flex-wrap gap-4"
          style={{ borderColor: "#2a2a2b" }}
        >
          {[
            { label: "Política de datos", href: "/politica-datos/" },
            { label: "Política de cookies", href: "/politica-cookies/" },
            { label: "Términos y condiciones", href: "/terminos-condiciones/" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs transition-colors hover:text-[#4CB4E7]"
              style={{ color: "#B7B8B9", fontFamily: "var(--font-label)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
