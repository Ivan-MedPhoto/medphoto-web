# Template — Artículo Espejo MedPhoto (~300 palabras)

## 1. Nombre de carpeta (slug)

Usar kebab-case, siempre en minúsculas, sin tildes, sin caracteres especiales.
Colocar en: `site/src/app/blog/{slug}/page.tsx`

Ejemplos correctos:
- `profoto-b10x-plus-vs-b3`
- `capture-one-para-fotografia-de-producto`
- `tether-tools-cableado-en-set-comercial`

---

## 2. Estructura de page.tsx

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// description: máximo 155 caracteres
export const metadata: Metadata = {
  title: "{Título del artículo} | MedPhoto Colombia",
  description: "{Descripción concisa. Máx 155 caracteres. Sin punto final.}",
  openGraph: {
    title: "{Título del artículo sin sufijo de marca}",
    description: "{Misma descripción que arriba}",
    url: "https://medphoto.com.co/blog/{slug}/",
    siteName: "MedPhoto Colombia",
    images: [
      {
        url: "https://medphoto.com.co/blog/{imagen-hero}.jpg",
        width: 1200,
        height: 630,
        alt: "{Descripción accesible de la imagen}",
      },
    ],
    locale: "es_CO",
    type: "article",
  },
};
```

---

## 3. Estructura del contenido

### Introducción — 50 palabras
Presentar el problema o la pregunta que el artículo responde.
No mencionar MedPhoto. Enganchar al lector con el conflicto real.

### Desarrollo — 200 palabras
Dividir en 2–3 bloques con `<h2>`.
- Bloque 1: contexto o comparativa (qué es, diferencias clave)
- Bloque 2: casos de uso reales para cada opción
- Bloque 3 (opcional): recomendación directa

Usar listas `<ul>` para ventajas concretas.
Nunca usar adjetivos sin respaldo técnico ("increíble", "revolucionario").

### CTA final — 50 palabras
Dos links obligatorios:
1. Enlace al producto en medphoto.com.co
2. WhatsApp `wa.me/573243680862`

```tsx
<div style={styles.ctaBox}>
  <p style={styles.ctaText}>{Pregunta de cierre}</p>
  <p style={styles.ctaSub}>{Frase de apoyo}</p>
  <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
    <Link href="/tienda/profoto/{slug-producto}/" style={styles.ctaBtn}>
      Ver precio en Colombia
    </Link>
    <a
      href="https://wa.me/573243680862?text={Mensaje pre-llenado codificado}"
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...styles.ctaBtn, backgroundColor: "#1A1A1B", color: "#4CB4E7", border: "1px solid #4CB4E730" }}
    >
      Consultar por WhatsApp
    </a>
  </div>
</div>
```

---

## 4. Añadir slug al sitemap.ts

En `site/src/app/sitemap.ts`, agregar una línea al array `blogSlugs`:

```ts
const blogSlugs: { slug: string; lastModified: Date }[] = [
  // ... artículos existentes ...
  { slug: "{slug-nuevo}", lastModified: new Date("YYYY-MM-DD") },
];
```

---

## 5. Añadir al índice del blog

En `site/src/app/blog/page.tsx`, agregar el post al array `posts`:

```ts
{
  title: "{Título visible en la card}",
  description: "{Descripción corta para la card — misma del metadata}",
  slug: "{slug-nuevo}",
  image: "/blog/{imagen-hero}.jpg",
  date: "{DD de mes, YYYY}",
  category: "{Producto | Iluminación | Retrato | Técnica | Software}",
},
```

---

## Checklist antes de hacer commit

- [ ] Carpeta nombrada en kebab-case sin tildes
- [ ] `metadata.description` ≤ 155 caracteres
- [ ] `openGraph` completo con `locale: "es_CO"` y `type: "article"`
- [ ] Introducción ~50 palabras
- [ ] Desarrollo ~200 palabras con al menos un `<h2>`
- [ ] CTA con link al producto Y link a WhatsApp
- [ ] Slug añadido a `blogSlugs` en `sitemap.ts`
- [ ] Post añadido al array `posts` en `blog/page.tsx`
- [ ] Imagen hero disponible en `public/blog/` (o documentada como pendiente)
