import Link from "next/link";
import Logo from "./Logo";
import { WHATSAPP_URL } from "@/data/products";

const brands = [
  { label: "Profoto", href: "/tienda/profoto/" },
  { label: "Phase One", href: "/tienda/phase-one/" },
  { label: "Capture One", href: "/tienda/capture-one/" },
  { label: "TetherTools", href: "/tienda/tethertools/" },
];

const pages = [
  { label: "Tienda", href: "/tienda/" },
  { label: "Nosotros", href: "/nosotros/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contacto", href: "/contacto/" },
];

const social = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/Medphoto_Colombia",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/MedPhotoColombia",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t mt-24"
      style={{ backgroundColor: "#0F0F10", borderColor: "#2a2a2b" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo size="md" showTagline />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
              Distribuidores oficiales de Profoto, Phase One, Capture One y TetherTools en Colombia.
            </p>
            <div className="mt-6 flex gap-4">
              {social.map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors hover:text-[#4CB4E7]"
                  style={{ color: "#B7B8B9" }}
                >
                  {svg}
                </a>
              ))}
              {/* TikTok icon (Lucide doesn't have it — text link) */}
              <a
                href="https://www.tiktok.com/@medphoto_colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors hover:text-[#4CB4E7]"
                style={{ color: "#B7B8B9", fontFamily: "var(--font-label)", letterSpacing: "0.05em" }}
                aria-label="TikTok"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* Marcas */}
          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Marcas
            </h3>
            <ul className="space-y-2">
              {brands.map((b) => (
                <li key={b.href}>
                  <Link
                    href={b.href}
                    className="text-sm transition-colors hover:text-[#4CB4E7]"
                    style={{ color: "#B7B8B9" }}
                  >
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Navegación
            </h3>
            <ul className="space-y-2">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm transition-colors hover:text-[#4CB4E7]"
                    style={{ color: "#B7B8B9" }}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
            >
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hola, quiero información")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[#4CB4E7]"
                  style={{ color: "#B7B8B9" }}
                >
                  +57 324 368 0862
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@medphoto.com.co"
                  className="text-sm transition-colors hover:text-[#4CB4E7]"
                  style={{ color: "#B7B8B9" }}
                >
                  contacto@medphoto.com.co
                </a>
              </li>
              <li className="text-sm" style={{ color: "#B7B8B9" }}>
                Lunes a viernes<br />8:00 am – 5:00 pm
              </li>
              <li className="text-sm" style={{ color: "#B7B8B9" }}>
                Bogotá, Colombia
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "#2a2a2b" }}
        >
          <p className="text-xs" style={{ color: "#B7B8B9" }}>
            © {new Date().getFullYear()} MedPhoto Colombia. Todos los derechos reservados.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: "Política de datos", href: "/politica-datos/" },
              { label: "Política de cookies", href: "/politica-cookies/" },
              { label: "Términos y condiciones", href: "/terminos-condiciones/" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs transition-colors hover:text-[#4CB4E7]"
                style={{ color: "#B7B8B9" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
