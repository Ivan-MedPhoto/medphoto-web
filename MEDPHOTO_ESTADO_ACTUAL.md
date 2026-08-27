# MEDPHOTO — ESTADO ACTUAL DEL SITIO WEB

**Última actualización:** 27 de agosto de 2026 (integrado `PENDIENTE_INTEGRAR_WEB_2026-08-27.md`
vía Drive: decisión de sección de alquiler de equipo, ver §5 punto 0)
**Mantenido por:** Claude · Actualizar al cierre de cada bloque de trabajo significativo

> **Instrucción de arranque:** leer este documento antes de iniciar cualquier sesión de trabajo sobre el sitio, tanto en Claude.ai como en Claude Code.
>
> **Ubicación canónica:** raíz del repo, versionado en Git. Espejo para sesiones sin
> acceso al repo (Claude Chat / claude.ai) en Google Drive, carpeta `MedPhoto / Estado
> de Proyectos (Claude)` — reemplaza al viejo "proyecto de Claude.ai" desde el 24 ago
> 2026. Ver `PROTOCOLO_SESION_WEB.md` §1.

---

## 1. Stack e infraestructura

| Elemento | Valor |
|---|---|
| Framework | Next.js **16.2.4** (App Router) · React 19.2.4 · TypeScript ^5 · Tailwind CSS ^4 |
| Repositorio | `github.com/Ivan-MedPhoto/medphoto-web` |
| Rama de producción | `main` |
| Hosting | Vercel — proyecto `medphoto-web` |
| Ruta local | `~/medphoto-web/site/` |
| Comando de terminal | `web` → `~/medphoto-web/site` + Claude Code (**usar este**). `medphoto` → `~/Documents/MedPhoto`, NO carga las skills del sitio |
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

El campo `stock?: "InStock" | "OutOfStock" | "PreOrder"` **poblado el 27 jul** (commit `39a52fe`) cruzando los 96 productos contra el inventario real de Ivan (código + nombre + cantidad) por nombre — los SKU no coincidían entre `products.ts` y el inventario real, así que no sirvió cruzar por código. 80 productos con dato real (40 InStock, 37 OutOfStock, 3 Phase One en PreOrder explícito); 16 sin dato en el inventario, sin stock asignado (Connect básico Canon/Nikon/Sony/Fuji, Beauty Dish no-OCF, D30/B20 Duo Kit, Air Remote Universal, Connect Pro Fuji, OCF II Grid 30°, RFi Grid 40x60, OCF Gel Corrección/Efectos, TetherBoost Pro Core Controller, Tether T-Setup). De paso se corrigieron 74 SKU que estaban desalineados desde la carga inicial del catálogo (ej. A2 tenía el SKU de A10 Canon; B30 tenía el de Connect Pro; Pro-D3 single/duo con números cruzados).

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
- **Fallback de dos capas (aclarado 27 jul, vía `/autoplan`):** las líneas "default seguro → categoría de marca" y "catch-all → `/tienda/`" de este mismo documento no eran contradictorias, eran dos capas secuenciales sin cruzar entre sí. Orden correcto: (1) si el slug o la categoría legacy permite inferir marca (prefijos `profoto-`, `phase-one-`, `capture-one-`, `tethertools-`, o viene de una de las 46 categorías mapeadas) → `/tienda/{marca}/`; (2) solo si NO se puede inferir marca de ninguna forma → catch-all genérico `/tienda/` (verdadero último recurso, no el default).
- **Estructura en capas** en `next.config.ts` (Next.js evalúa de arriba abajo, primera coincidencia gana):
  1. Producto→producto específicos (41 resueltos por matching automático; 118 de las 189 UNRESOLVED restantes tienen candidato para auditoría manual — 42 alta confianza, 55 media, 21 baja; 71 sin candidato razonable. Lista completa ruta-por-ruta en el anexo del plan. Auditoría = fast-follow, no bloquea el envío inicial, ver TODOS.md)
  2. Rutas sueltas (6 filas, ya resueltas). `/contacto/` y `/carrito/` NO necesitan regla — path idéntico en ambos sitios.
  3. Categorías → páginas de marca (46 filas)
  4. Colapso de paginación `/page/N/` (1 regla)
  5. `/etiqueta-producto/*` — sin regla, 404 deliberado
  6. Fallback por marca inferida, luego catch-all `/producto/:slug*` → `/tienda/` (último recurso)

  Plan completo: `~/.gstack/projects/Ivan-MedPhoto-medphoto-web/main-legacy-redirects-plan.md`
  (aprobado 27 jul vía `/autoplan`, listo para implementación).

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

0. **Sección de "Alquiler de equipo" — Phase One IQ3 100 — DECIDIDO 27 ago, sin implementar. BLOQUEA marketing.** Integrado desde `PENDIENTE_INTEGRAR_WEB_2026-08-27.md` (Drive). MedPhoto arranca línea de negocio de alquiler (no solo venta). Primer producto: respaldo digital Phase One IQ3 100 — no está en `products.ts` (el catálogo de venta solo tiene sistemas IQ4 150: `phase-one-xf-iq4-150`, `phase-one-xt-iq4-150`, `phase-one-xc-iq4-150`); el IQ3 100 es equipo propio de MedPhoto para alquilar, no para vender. Secuencia acordada: **web primero** — bloquea el e-blast de HubSpot y el post de Instagram de marketing, que necesitan un link de destino antes de poder salir.
   - **Qué construir:** sección o página de alquiler para el IQ3 100 (dentro de la arquitectura de producto o aparte, a criterio de la sesión `web`).
   - **Copy/ángulo ya validado por marketing:** hook "¿Tu próximo shoot necesita 100MP?"; cuerpo sobre alquilar por días sin comprometer los $50-60M+ COP de un sistema propio; specs verificadas (CMOS 101MP formato medio 54×40mm, 15 stops, ISO 50–12.800, exposiciones hasta 60 min); CTA por WhatsApp (usar `src/components/WhatsAppButton.tsx` si aplica tal cual — confirmar número con Iván si el existente no sirve); mención breve de que vienen más equipos de alquiler después (Profoto A2, etc.), sin prometer fecha.
   - **Referencia visual:** post/story/header de e-blast ya diseñados con los tokens reales del sitio — artifact en `https://claude.ai/code/artifact/c8890f49-5eec-4d65-8e97-85d1b0a85565` (tono/ángulo, no copiar literal).
   - **Qué NO hacer todavía:** no publicar tarifa/precio (sin definir); no tocar `products.ts` como si fuera venta; no coordinar A2/B30 todavía.
   - **Al terminar:** avisar el link de la página (a Iván o en este documento) — marketing lo necesita como destino del e-blast/post.
   - Pendiente de Iván antes de escribir copy final: confirmar audiencia/tono (regla binding §2 de `CLAUDE.md`) y el número de WhatsApp a usar.

1. **Google Search Console** — **VERIFICADO Y SITEMAP ACEPTADO el 27 jul** vía propiedad de Dominio + registro TXT en Dongee (Zone Editor, sin tocar el TXT de SPF existente). Sitemap `https://medphoto.com.co/sitemap.xml` en estado **"Correcto"**, 114 páginas descubiertas — coincide exacto con el conteo documentado en §1 (96 producto + 4 marca + 4 blog + 10 estáticas). (La ruta relativa `sitemap.xml` daba "Dirección no válida" en el campo de envío — funcionó con la URL absoluta; quirk de la propiedad tipo Dominio, no problema del sitio.) Hallazgo: ya existía una propiedad vieja con el sitemap legacy de Yoast (`sitemap_index.xml`, enviado 19 abr 2024, en estado "no se ha podido obtener" — normal, ese archivo no existe en el sitio nuevo; limpieza opcional, no urgente). Pendiente real restante: esperar unos días a que Google rastree y reporte datos de indexación/errores 404 para las 230 URLs legacy — sin acción adicional por ahora.
2. **Mapa de redirecciones 301** — **EN PRODUCCIÓN desde el 27 jul** (commit `735151e`, `next.config.ts` + `src/data/legacy-redirects.ts`, 281 reglas). Auditoría manual completada por Ivan (94 aprobadas, 24 rechazadas de 118). Verificado en producción por Ivan: `/como-escoger-tu-paraguas/` → `/blog/como-elegir-paraguas-fotografia/` y `/producto/profoto-a2/` → `/tienda/profoto/profoto-a2/`, ambos correctos. **Refinamiento 5 ago** (commit `fa3976e`, mergeado a `main`): 21 redirects de flashes discontinuados (A1X, B10/B10-Plus sin "x", D2, Pro-10) movidos del fallback genérico `/tienda/profoto/` a su producto sucesor específico, cruzados contra el campo `successor` de `products.ts`. 3 slugs con página viva descontinuada (`b10x-duo-kit`, `b10x-plus-duo-kit`, `d2-kit-500-500-airttl`) auto-redirigen a esa página en vez de saltársela, igual que `b10x`/`b10x-plus`. De paso se corrigió un dato incorrecto en `products.ts`: el campo `successor` de `profoto-b10x` y `profoto-b10x-duo` apuntaba a B30 en vez de B20 (confirmado por Ivan: B10/B10X → B20, B10 Plus/B10X Plus → B30). Verificado con `curl` contra 11 URLs en producción tras el merge: 10 redirects 308 correctos + 1 404 deliberado en `/etiqueta-producto/`. Pendiente real restante: auditoría manual de las 118 filas ya está hecha — solo falta, si se quiere, el barrido completo y detallado de productos que Ivan mencionó para después (fuera de alcance de este trabajo). **Cierre 5 ago:** verificado en producción tras el merge de `fa3976e` — 10 redirects 308 correctos (a1x-canon→a10-canon, b10→b20, b10-plus→b30, b10x→b10x, d2-500→d30, d2-1000→pro-d3-1250w, pro-10→pro-11, b1x-kit-locacin→pro-b3-750, estuche-accesorios→/tienda/profoto/, categoria-producto/softbox→/tienda/profoto/) y `/etiqueta-producto/profoto/` en 404 deliberado. Nota técnica: Next.js emite **308** para `permanent: true`, no 301 — Google los trata igual.

### Media

3. **Lote 2 — script de inventario.** **Primera carga hecha el 27 jul** (ver §3 y commit `39a52fe`) — se confirmó que los SKU del Excel de Ivan **NO coincidían** con los de `products.ts` (eran de dos sistemas de numeración distintos), así que el cruce se hizo por nombre de producto y se corrigieron los 74 SKU discrepantes en el mismo commit. Pendiente real: convertir esto en un flujo recurrente (Ivan exporta CSV semanal → actualizar `stock` → `git push`) — por ahora fue una corrección puntual manual, no un script automatizado. Cadencia sugerida: semanal (lunes).
4. **Logotipo horizontal — RESUELTO el 27 jul** (commit `603e65c`). `public/logo-medphoto-horizontal.png` (380x100, wordmark oficial, traído desde el proyecto de Claude.ai) reemplaza `apple-touch-icon.png` como `logo` en el schema `Organization` (`src/app/layout.tsx:90`).
5. **GA4 — RESUELTO el 27 jul** (commit `90be3bc`). Measurement ID `G-39DGBKV73R` (propiedad ya existía en la cuenta de Ivan, nunca se había instalado en el sitio). `gtag.js` agregado en `src/app/layout.tsx` con `next/script` (`strategy="afterInteractive"`), mismo patrón que Meta Pixel y HubSpot.
6. **Redirigir productos descontinuados con página viva — DECIDIDO 5 ago, sin implementar.** Los 5 productos con `discontinued: true` y página activa (`profoto-b10x`, `profoto-b10x-plus`, `profoto-b10x-duo`, `profoto-b10x-plus-duo`, `profoto-d2-kit-500`) hoy auto-redirigen a su propia página de aviso. Decisión de Iván: redirigirlos directamente a su sucesor y excluirlos del sitemap, en vez de mantener fichas de descontinuado. Razón: el presupuesto de rastreo de Google en el dominio es bajo (7 de 96 fichas procesadas al 31 jul) y esas páginas consumen rastreo sin aportar contenido. NO eliminar de `products.ts` en el primer paso — solo redirigir y sacar del sitemap, que es reversible.
7. **Artículo de blog "Equipos Profoto descontinuados y sus reemplazos" — DECIDIDO 5 ago, sin escribir.** Sustituye a las fichas de descontinuado como forma de capturar esas búsquedas. Debe cubrir la transición del catálogo (A1/A1X→A10, B1/B1X→B3, B10/B10X→B20, B10 Plus/B10X Plus→B30, D2 500→D30, D2 1000→D3 1250, Pro-10→Pro-11) y la compatibilidad de accesorios. Pendiente de Iván: specs verificadas de los modelos descontinuados y datos de compatibilidad. Encaja en el pilar de Educación.

### Baja

8. **Copy único por página de marca — RESUELTO el 27 jul** (commit `d2a6648`). Las 4 páginas (`/tienda/[marca]/`) tienen párrafo indexable, tono Profesional confirmado por Ivan para las 4 marcas.
9. **Ampliar el blog de 4 a ~12-15 artículos — EN PROGRESO.** Fuente: posts técnicos que Ivan e Iván ya escribieron junto con Claude.ai para Instagram. Pendiente: Ivan debe recuperar/pasar ese material (no está en este repo ni en esta sesión) antes de poder redactar los artículos nuevos.
10. Gap visual entre el banner de promo y el hero del home.
11. **Contenido delgado en el home — detectado 27 jul vía auditoría externa (Seobility).** 451 palabras vs ~800 recomendadas. Requiere escribir copy adicional — pendiente definir audiencia/tono antes de tocarlo (regla binding del proyecto).
12. **H1 del home no reforzado en el cuerpo del texto — detectado 27 jul vía Seobility.** El H1 ("La luz que los mejores usan") no comparte palabras clave con el copy del cuerpo. Se resuelve junto con el punto 11 (ambos son trabajo de copywriting, no de código).

**Ya corregido de esa misma auditoría Seobility (commit `40589ab`):** título del home acortado (602px→54 caracteres, ya no queda cortado a mitad de frase), canonical agregado al home (única página que no lo tenía), espaciado del H1 corregido (se extraía como "quelos mejoresusan" sin espacios), encabezado duplicado corregido (hero repetido como H2+H3, y "Distribuidores Oficiales" repetido en dos secciones — la segunda se renombró a "Nuestras Marcas").

---

## 6. Integraciones activas

| Servicio | ID / Detalle |
|---|---|
| HubSpot | Portal `9428261` · Tracking `46114173` · Form lead magnet `fe713f94-46ec-45cb-987e-1e681443a2fe` |
| Meta Pixel | `1530931291102927` |
| Google Analytics 4 | Measurement ID `G-39DGBKV73R` (instalado 27 jul) |
| Google Search Console | Propiedad de Dominio, verificada 27 jul vía TXT en Dongee |
| Dominios autorizados en HubSpot | medphoto.com.co · medphoto.com.mx |
| WhatsApp | +57 324 368 0862 |
| Redes en schema `sameAs` | Instagram `@Medphoto_Colombia` · Facebook `MedPhotoColombia` · TikTok `@medphoto_colombia` (los tres verificados) |

---

## 7. Campañas activas

**Promo Profoto Verano 2026** (julio–agosto 2026)
- Landing `/promo-profoto/` — con canonical, título propio y en el sitemap
- `PromoBanner.tsx` en el home
- Badge "Promo Julio–Agosto" en `profoto-b30` y `profoto-a2` (ahora **fuera** del `<h1>`)
- B30 a $10.300.000 COP · Formulario HubSpot embebido

---

## 8. Aprendizajes de proceso

### 5 de agosto de 2026 — pérdida de sesión por documento desactualizado

Una sesión completa de Claude.ai se perdió re-proponiendo trabajo ya resuelto el 27 de julio (Search Console, mapa de 301, GA4, logo horizontal, copy por marca). Causa: Claude.ai operó sobre la copia del 26 de julio que tenía en el panel del proyecto, sin pedirle a Claude Code el contenido actual del repo. La regla de arranque existía escrita en este mismo documento desde el 26 de julio y no se ejecutó.

**Correcciones aplicadas:**
- `PROTOCOLO_SESION_WEB.md` creado (commit `55714b6`) — arranque y cierre obligatorios, división de trabajo, errores documentados de Claude.ai.
- Memoria persistente de Claude corregida: decía "Next.js 15" (falso) y mandaba consultar la copia del proyecto en vez del repo.
- Regla de cierre de sesión: el paso que más se olvida es subir la versión nueva al proyecto de Claude.ai; sin él las dos copias divergen.

**Otro patrón detectado:** tres pérdidas de contenido en `CLAUDE.md` por reemplazar secciones completas sin inventariar qué se perdía (regla de capas de seguridad, comandos `/careful` y `/guard`, columna "Propósito" de la tabla de plugins). Las tres restauradas el 26 de julio.

### 24 de agosto de 2026 — migración al puente de Drive

El protocolo de pegado manual (§1 arriba, "pega el contenido en bloques de 70 líneas")
queda reemplazado por lectura directa desde Google Drive — mismo puente ya probado con
el proyecto de marketing (`instagram-engine`). Ver `PROTOCOLO_SESION_WEB.md` en el repo
para el detalle actualizado del arranque y cierre de sesión.
