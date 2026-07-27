# MEDPHOTO — ESTADO ACTUAL DEL SITIO WEB

**Última actualización:** 26 de julio de 2026
**Mantenido por:** Claude · Actualizar al cierre de cada bloque de trabajo significativo

> **Instrucción de arranque:** leer este documento antes de iniciar cualquier sesión de trabajo sobre el sitio, tanto en Claude.ai como en Claude Code.
>
> **Ubicación canónica:** raíz del repo, versionado en Git. Debe existir también una copia en el proyecto de Claude.ai para las sesiones sin acceso al repo.

---

## 1. Stack e infraestructura

| Elemento | Valor |
|---|---|
| Framework | Next.js **16.2.4** (App Router) · React 19.2.4 · TypeScript ^5 · Tailwind CSS ^4 |
| Repositorio | `github.com/Ivan-MedPhoto/medphoto-web` |
| Rama de producción | `main` |
| Hosting | Vercel — proyecto `medphoto-web` |
| Ruta local | `~/medphoto-web/site/` |
| Alias de terminal | `medphoto` → navega a la ruta y abre Claude Code |
| Dominio | medphoto.com.co |
| Datos de producto | 96 productos hardcodeados en `src/data/products.ts` |
| Páginas generadas en build | 120 |
| URLs en sitemap | 114 (96 producto + 4 marca + 4 blog + 10 estáticas) |

### Deploy — regla crítica

**El deploy a producción se hace ÚNICAMENTE con `git push origin main`.**
El comando `vercel --prod` del CLI **no** actualiza producción.

### Autenticación de Git — cambiado el 26 jul 2026

- **Ya no se usa llave SSH.** No existe `~/.ssh/id_ed25519` en la máquina de Iván.
- Autenticación actual: **GitHub CLI (`gh`) sobre HTTPS**, configurada con `gh auth login` vía navegador.
- Remoto: `https://github.com/Ivan-MedPhoto/medphoto-web.git`
- Credenciales en el Llavero de macOS (`credential.helper osxkeychain`).
- Llave de host de GitHub verificada contra la documentación oficial y registrada en `~/.ssh/known_hosts`.

### Hosting secundario — Dongee

Dongee (Plan GO!, IP 192.99.84.39, directorio `/home/adminirp`) **ya no sirve al sitio web**, pero sigue alojando el **correo corporativo** (`contacto@medphoto.com.co`).

> **Regla:** no dar acceso SSH ni de base de datos a agentes sobre este servidor. El radio de daño incluye el correo del negocio. Todo lo necesario del WordPress legacy se obtuvo por vías públicas (ver §4).

---

## 2. Estado SEO — Lote 1 completado

**Commit en producción:** `faaec6c` · Mergeado a `main` el 26 jul 2026 · 20 archivos, 298 líneas (acumulado de los 4 commits del lote, `f443c9f..faaec6c`).

### Verificado en producción (curl en vivo)

| # | Corrección | Verificación |
|---|---|---|
| 1 | Título de producto sin duplicación | `Profoto B30 Colombia \| MedPhoto — Distribuidor Oficial` |
| 2 | `/tienda/` con metadata propia (nuevo `tienda/layout.tsx`) | `Tienda — Equipos Fotográficos Profesionales \| MedPhoto Colombia` |
| 3 | `canonical` en todas las rutas | Absoluto, con barra final |
| 4 | Twitter Card por página | Hereda de `openGraph.title` |
| 5 | OpenGraph completo en producto | + `url`, `siteName`, `locale`, `type` |
| 6 | Schema `Organization` | Válido |
| 7 | Schema `BreadcrumbList` | Válido, 4 niveles |
| 8 | Schema `BlogPosting` x4 | Implementado |
| 9 | `image` en Product schema | URL absoluta — resolvió el único error crítico |
| 10 | `availability` por marca | Ver §3 |
| 11 | H1 sin el badge de promo | `<h1>Profoto B30</h1>` |
| 12 | Sitemap: +4 páginas, prioridad `/blog/` 0.4 → 0.7 | 114 URLs |
| 13 | Páginas huérfanas enlazadas en Footer | `/guia-roi-profoto/`, `/promo-profoto/` |

### Validación Google Rich Results — 4/4 válidos

Fragmentos de productos · Fichas de comerciantes · Rutas de exploración · Organización.

Avisos no críticos descartados a propósito: `review`, `aggregateRating` (no hay sistema de reseñas), `shippingDetails`, `hasMerchantReturnPolicy` (son de Google Shopping; la venta cierra por WhatsApp).

---

## 3. Lógica implementada en `src/lib/seo.ts`

### `productTitle(name)` — fórmula B′ en cascada

Se eligió tras medir los 96 productos: la fórmula completa excedía 60 caracteres en 79 de 96 (82%).

| Nivel | Formato | Presupuesto de nombre | Productos |
|---|---|---|---|
| 1 | `{name} Colombia \| MedPhoto — Distribuidor Oficial` | ≤17 chars | 17 |
| 2 | `{name} Colombia \| MedPhoto` | ≤40 chars | 77 |
| 3 | `{name} \| MedPhoto` | >40 chars | 2 |

Título más largo resultante: **60 caracteres**. Ningún producto excede el límite.

**Criterio de diseño:** se sacrifica "Distribuidor Oficial" antes que "Colombia" — el modificador geográfico hace que la página coincida con la consulta; el diferenciador solo mejora el CTR una vez que ya apareces. Los 17 del nivel 1 son los productos héroe (B30, A2, A10, D3, D30, Connect); los de nivel 2 y 3 son accesorios long-tail.

### `productAvailability(brand, stock)` — disponibilidad por marca

```
stock definido en el producto  → usa ese valor (override)
brand === "phase-one"          → PreOrder
resto                          → InStock
```

**Justificación comercial:** Phase One es siempre bajo pedido (confirmado por Iván). Capture One es software sin inventario físico. Profoto y TetherTools rotan y se reponen.

El campo `stock?: "InStock" | "OutOfStock" | "PreOrder"` **ya existe en el tipo `Product`** pero **no está asignado a ningún producto todavía**. Listo para recibir el dato del script de inventario (ver §5).

---

## 4. Inventario de URLs legacy (WordPress/WooCommerce)

Recuperado el 26 jul 2026 desde el **índice público del Internet Archive (CDX API)**, sin credenciales y sin tocar Dongee.

| Fuente | Conteo |
|---|---|
| URLs crudas rastreadas (status 200) | 609 |
| Rutas de página tras filtrar assets/query/internals | 430 |
| **Productos (sitemap declarado por Yoast)** | **230** ← autoritativo |
| Productos rastreados por Wayback | 210 |
| Categorías (`/categoria-producto/`) | 50 |
| Etiquetas (`/etiqueta-producto/`) | 148 |
| Rutas sueltas | 22 |

**Archivos en la máquina de Iván:**
- `~/medphoto_legacy_paths.txt` — 430 rutas
- `~/mp_productos_legacy.txt` — 230 productos
- `~/mp_categorias_legacy.txt` — 46 categorías
- `~/mp_product_sitemap.xml`, `~/mp_category_sitemap.xml`

### Asimetría crítica

**230 productos legacy vs 96 actuales.** Más de 155 no tienen equivalente en `products.ts`. `UNRESOLVED` es el caso mayoritario, no el borde.

### Decisiones ya tomadas para el mapa de 301

- **Las 148 `/etiqueta-producto/` NO se redirigen** — son *product tags* de WooCommerce, thin content. Deben devolver 404/410. Redirigirlas manda a Google 148 señales de equivalencia falsa.
- **Default seguro:** todo `UNRESOLVED` va a la categoría de marca. Nunca al home, nunca 404.
- **Estructura en capas** en `next.config.ts` (Next.js evalúa de arriba abajo, primera coincidencia gana):
  1. Producto→producto específicos (~75 filas, auditoría manual)
  2. Rutas sueltas (6 filas, ya resueltas)
  3. Categorías → páginas de marca (46 filas)
  4. Colapso de paginación `/page/N/` (1 regla)
  5. `/etiqueta-producto/*` — sin regla, 404 deliberado
  6. Catch-all `/producto/:slug*` → `/tienda/` (red de seguridad)

  Resultado: **~81 filas auditables a mano** en vez de 430.

### Rutas sueltas con destino propuesto (sin verificar contra contenido archivado)

| Legacy | Destino |
|---|---|
| `/catalogo-productos-fotografia-iluminacion/` | `/tienda/` |
| `/nosotros-medphoto-distribuidores-2/` | `/nosotros/` |
| `/privacy-policy/` | `/politica-datos/` |
| `/terms/` | `/terminos-condiciones/` |
| `/phase-one/` | `/tienda/phase-one/` |
| `/como-escoger-tu-paraguas/` | `/blog/como-elegir-paraguas-fotografia/` |

### Riesgos identificados en el catálogo (para el mapeo)

- **Colisión de prefijo SKU:** `901300` = Profoto B30, pero `901300C/N/S/F/L/U` = Connect Pro. El match debe ser **exacto de string, nunca por prefijo**.
- **Familias casi idénticas:** `Connect` (`901400C`) vs `Connect Pro` (`901300C`) — a una palabra de distancia. Zona de alto riesgo para mapeo automático.

---

## 5. Pendientes

### Alta prioridad

1. **Google Search Console** — nunca revisado. Tres métodos de verificación descartados con evidencia (DNS TXT, meta tag, archivo en `public/`), pero no se ha entrado al panel. Su reporte de 404 ordenaría las 230 URLs legacy por equity real en vez de tratarlas como lista plana.
2. **Mapa de redirecciones 301** — el problema más caro abierto. Bloqueado por: (a) las 230 rutas nunca llegaron completas a Claude.ai, (b) falta criterio de Iván sobre los ~155 productos sin equivalente.

### Media

3. **Lote 2 — script de inventario.** Iván tiene un sistema propio en Excel con el inventario real. Flujo propuesto: exportar CSV (SKU + disponible) → script actualiza campo `stock` en `products.ts` → `git push` → Vercel redespliega. Cadencia semanal (lunes). **Pendiente confirmar: ¿los SKU del Excel coinciden con los de `products.ts`?** (`901300`, `254703`, `CU3C4BLK`, `IQ4-150`). Si no, hay que mapear 96 productos primero.
4. **Logotipo horizontal.** El schema `Organization` usa `apple-touch-icon.png` (isotipo cuadrado 180x180). No existe logotipo horizontal en `public/`. Google usa ese campo para el Knowledge Panel. Fuente: `Logotipo_Principal.png` en el proyecto de Claude.ai.
5. **GA4** — no instalado. Confirmado por grep: cero referencias a `gtag` o `G-`. Solo Meta Pixel (`1530931291102927`) y HubSpot (`46114173`).

### Baja

6. Copy único por página de marca (`/tienda/[marca]/`) — hoy solo grid, sin texto indexable. Requiere definir audiencia y tono antes de escribir.
7. Ampliar el blog de 4 a ~12-15 artículos. Cada post técnico de Instagram debería convertirse en artículo indexable.
8. Gap visual entre el banner de promo y el hero del home.

---

## 6. Reglas operativas

### Verificación en sesiones de Claude Code

- Preguntas numeradas con línea de reconciliación obligatoria **al inicio**: `"Respondí X de Y. Sin verificar: [números]."`
- Evidencia `archivo:línea` o salida de comando en cada afirmación.
- `NO VERIFICADO` explícito cuando no se pueda confirmar. Prohibido inferir.
- **Un grep vacío NO prueba ausencia** si el dato puede vivir fuera del repo (DNS, base de datos, panel externo).
- Code no autoevalúa el alcance de sus cambios. La spec la aprueba Iván.
- **Sesión limpia obligatoria** para reportes de diagnóstico — Code reproduce análisis previos si arrastra contexto.

### Asimetría Claude.ai vs Claude Code

Claude Code **ve el repositorio, no ve la historia de producción**. Los 404 legacy no aparecen en ningún grep porque vivían en una base de datos que ya no alimenta el sitio. Todo lo que requiera conocimiento cruzado (DNS, índice de Wayback, estado HTTP en vivo, índice de Google) se maneja desde Claude.ai.

### Capas de seguridad

Si Claude pide desactivar cualquier protección (Vercel Deployment Protection, firewall, permisos), **Claude es responsable de cerrarla en el mismo hilo**, declarándola como pendiente al final de cada respuesta hasta confirmar el cierre.

### Errores de entorno conocidos

- El `grep` de la máquina de Iván resuelve a **`ugrep`**, que no acepta `\|` como alternancia. Usar siempre `-E` con `|`.
- `git log --grep` usa regex básica por defecto. Para alternancia hay que añadir `-E`.
- El directorio de trabajo de Claude Code **se resetea entre comandos**. Anteponer `cd ~/medphoto-web/site &&` a cada uno.

---

## 7. Integraciones activas

| Servicio | ID / Detalle |
|---|---|
| HubSpot | Portal `9428261` · Tracking `46114173` · Form lead magnet `fe713f94-46ec-45cb-987e-1e681443a2fe` |
| Meta Pixel | `1530931291102927` |
| Dominios autorizados en HubSpot | medphoto.com.co · medphoto.com.mx |
| WhatsApp | +57 324 368 0862 |
| Redes en schema `sameAs` | Instagram `@Medphoto_Colombia` · Facebook `MedPhotoColombia` · TikTok `@medphoto_colombia` (los tres verificados) |

---

## 8. Campañas activas

**Promo Profoto Verano 2026** (julio–agosto 2026)
- Landing `/promo-profoto/` — con canonical, título propio y en el sitemap
- `PromoBanner.tsx` en el home
- Badge "Promo Julio–Agosto" en `profoto-b30` y `profoto-a2` (ahora **fuera** del `<h1>`)
- B30 a $10.300.000 COP · Formulario HubSpot embebido
