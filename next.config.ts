import type { NextConfig } from "next";
import {
  productRedirects,
  directRedirects,
  categoryRedirects,
  fallbackByBrandRedirects,
} from "@/data/legacy-redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    // Orden importa: Next.js evalua en orden de array, la primera
    // coincidencia gana. Reglas especificas primero, catch-alls al final.
    // Ver src/data/legacy-redirects.ts para el detalle de cada capa y
    // ~/.gstack/projects/Ivan-MedPhoto-medphoto-web/main-legacy-redirects-plan.md
    // para el analisis completo (/autoplan, 27 jul 2026).
    return [
      // Capa 1: producto -> producto especifico (135)
      ...productRedirects.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: true,
      })),

      // Capa 2: rutas sueltas 1:1 (6)
      ...directRedirects.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: true,
      })),

      // Capa 3+4: categorias -> marca, base + variante paginada (46 x 2 = 92)
      ...categoryRedirects.flatMap((r) => [
        { source: r.source, destination: r.destination, permanent: true },
        {
          source: r.source.replace(/\/$/, "/page/:num(\\d+)/"),
          destination: r.destination,
          permanent: true,
        },
      ]),

      // Capa 5: /etiqueta-producto/* -- sin regla, 404/410 deliberado
      // (148 tags de WooCommerce, thin content). No agregar entradas.

      // Capa 6a: productos sin match especifico, marca inferida (94)
      ...fallbackByBrandRedirects.map((r) => ({
        source: r.source,
        destination: r.destination,
        permanent: true,
      })),

      // Capa 6b: catch-alls finales (verdadero ultimo recurso, para
      // cualquier ruta legacy no capturada arriba)
      {
        source: "/producto/:slug*",
        destination: "/tienda/",
        permanent: true,
      },
      {
        source: "/categoria-producto/:slug*",
        destination: "/tienda/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
