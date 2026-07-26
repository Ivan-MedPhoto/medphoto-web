import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda — Equipos Fotográficos Profesionales",
  description:
    "Compra flashes Profoto, cámaras Phase One, software Capture One y accesorios TetherTools en Colombia. Distribuidor oficial con asesoría personalizada.",
  alternates: {
    canonical: "/tienda/",
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
