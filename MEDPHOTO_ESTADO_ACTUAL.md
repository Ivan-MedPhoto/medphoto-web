# MEDPHOTO — ESTADO ACTUAL DEL SITIO WEB

**Última actualización:** 8 de septiembre de 2026 — sesión de catálogo TetherTools:
2 cables nuevos + 4 productos huérfanos agregados, 6 redirects legacy rotos
corregidos, y ~19 ajustes de precio/disponibilidad/nombre confirmados por Iván
contra su tabla de pricing. Ver §9.
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
| Páginas generadas en build | 121 (+1: `/alquiler/`, agregada 27 ago) |
| URLs en sitemap | 114 (96 producto + 4 marca + 4 blog + 10 estáticas — `/promo-profoto/` salió, `/alquiler/` entró, el total no cambió) |

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

0. **Sección de "Alquiler de equipo" — Phase One IQ3 100 — RESUELTO y EN PRODUCCIÓN el 27 ago.** Integrado desde `PENDIENTE_INTEGRAR_WEB_2026-08-27.md` (Drive), construido en `feature/alquiler-equipo` a lo largo de toda la sesión, mergeado a `main` (fast-forward, commit `7e4c87d`) y verificado en vivo: `medphoto.com.co/alquiler/` responde 200, título `Alquiler de Equipo Fotográfico | MedPhoto Colombia`.
   - **Qué se construyó:** `src/data/rentals.ts` (interfaz `RentalItem` — slug, brand, name, hook, description, specs, useCases, whatsappMessage, status, image, includes) + `src/app/alquiler/page.tsx`. Entrada única: `phase-one-iq3-100` — no está en `products.ts` (el catálogo de venta solo tiene sistemas IQ4 150), es equipo propio de MedPhoto para alquilar.
   - **Contenido final de la página:** hook "¿Tu próximo shoot necesita 100MP?"; 4 specs técnicos (sensor 101MP 53.7×40.4mm — corregido desde 54×40mm con ficha oficial Phase One; 15 stops; ISO 50–12.800; exposiciones hasta 60 min); 6 casos de uso (moda, producto, arquitectura, campañas, reproducción de arte, fotografía de movimiento con nota de sincronización 1/1.600s); sección "Qué incluye el kit" (6 categorías, 19 ítems, inventario físico de Iván, cruzado dos veces) con nota al pie aclarando obturador de plano focal del lente Macro (sync 1/125s) vs leaf shutter de los Schneider (sync 1/1.600s); CTA "Consultar disponibilidad" por WhatsApp con mensaje pre-cargado editable (tipo de producción, fechas).
   - **Imagen hero:** `public/alquiler/phase-one-iq3-100.jpg` — iteró varias veces (frontal blanco → 3/4 blanco → negro con reflejo → negro sin reflejo → gris `#1A1A1B` amplio → gris recorte cerrado, versión final). Fondo transparente en el componente (hereda `#1A1A1B` de la card, sin wrapper propio), contenedor con altura fija (340px móvil / 460px desktop) en vez de `aspect-square` sin límite, para que el hook sea visible sin scroll.
   - **Sin tarifa/precio publicado** — sigue sin definir, tal como se decidió. CTA lleva a cotizar por WhatsApp, no a comprar.
   - **Enlazada** en el footer (`Footer.tsx`, bloque de navegación, después de "Guía ROI Profoto") y en el sitemap (`/alquiler/`, prioridad 0.7).
   - **Pendiente real restante:** avisar a marketing (`instagram-engine`) el link `https://medphoto.com.co/alquiler/` como destino del e-blast/post — eso ya no bloquea, la página está viva.

1. **Google Search Console** — **VERIFICADO Y SITEMAP ACEPTADO el 27 jul** vía propiedad de Dominio + registro TXT en Dongee (Zone Editor, sin tocar el TXT de SPF existente). Sitemap `https://medphoto.com.co/sitemap.xml` en estado **"Correcto"**, 114 páginas descubiertas — coincide exacto con el conteo documentado en §1 (96 producto + 4 marca + 4 blog + 10 estáticas). (La ruta relativa `sitemap.xml` daba "Dirección no válida" en el campo de envío — funcionó con la URL absoluta; quirk de la propiedad tipo Dominio, no problema del sitio.) Hallazgo: ya existía una propiedad vieja con el sitemap legacy de Yoast (`sitemap_index.xml`, enviado 19 abr 2024, en estado "no se ha podido obtener" — normal, ese archivo no existe en el sitio nuevo; limpieza opcional, no urgente). Pendiente real restante: esperar unos días a que Google rastree y reporte datos de indexación/errores 404 para las 230 URLs legacy — sin acción adicional por ahora.
2. **Mapa de redirecciones 301** — **EN PRODUCCIÓN desde el 27 jul** (commit `735151e`, `next.config.ts` + `src/data/legacy-redirects.ts`, 281 reglas). Auditoría manual completada por Ivan (94 aprobadas, 24 rechazadas de 118). Verificado en producción por Ivan: `/como-escoger-tu-paraguas/` → `/blog/como-elegir-paraguas-fotografia/` y `/producto/profoto-a2/` → `/tienda/profoto/profoto-a2/`, ambos correctos. **Refinamiento 5 ago** (commit `fa3976e`, mergeado a `main`): 21 redirects de flashes discontinuados (A1X, B10/B10-Plus sin "x", D2, Pro-10) movidos del fallback genérico `/tienda/profoto/` a su producto sucesor específico, cruzados contra el campo `successor` de `products.ts`. 3 slugs con página viva descontinuada (`b10x-duo-kit`, `b10x-plus-duo-kit`, `d2-kit-500-500-airttl`) auto-redirigen a esa página en vez de saltársela, igual que `b10x`/`b10x-plus`. De paso se corrigió un dato incorrecto en `products.ts`: el campo `successor` de `profoto-b10x` y `profoto-b10x-duo` apuntaba a B30 en vez de B20 (confirmado por Ivan: B10/B10X → B20, B10 Plus/B10X Plus → B30). Verificado con `curl` contra 11 URLs en producción tras el merge: 10 redirects 308 correctos + 1 404 deliberado en `/etiqueta-producto/`. Pendiente real restante: auditoría manual de las 118 filas ya está hecha — solo falta, si se quiere, el barrido completo y detallado de productos que Ivan mencionó para después (fuera de alcance de este trabajo). **Cierre 5 ago:** verificado en producción tras el merge de `fa3976e` — 10 redirects 308 correctos (a1x-canon→a10-canon, b10→b20, b10-plus→b30, b10x→b10x, d2-500→d30, d2-1000→pro-d3-1250w, pro-10→pro-11, b1x-kit-locacin→pro-b3-750, estuche-accesorios→/tienda/profoto/, categoria-producto/softbox→/tienda/profoto/) y `/etiqueta-producto/profoto/` en 404 deliberado. Nota técnica: Next.js emite **308** para `permanent: true`, no 301 — Google los trata igual.

### Media

3. **Lote 2 — script de inventario.** **Primera carga hecha el 27 jul** (ver §3 y commit `39a52fe`) — se confirmó que los SKU del Excel de Ivan **NO coincidían** con los de `products.ts` (eran de dos sistemas de numeración distintos), así que el cruce se hizo por nombre de producto y se corrigieron los 74 SKU discrepantes en el mismo commit. Pendiente real: convertir esto en un flujo recurrente (Ivan exporta CSV semanal → actualizar `stock` → `git push`) — por ahora fue una corrección puntual manual, no un script automatizado. Cadencia sugerida: semanal (lunes).
4. **Logotipo horizontal — RESUELTO el 27 jul** (commit `603e65c`). `public/logo-medphoto-horizontal.png` (380x100, wordmark oficial, traído desde el proyecto de Claude.ai) reemplaza `apple-touch-icon.png` como `logo` en el schema `Organization` (`src/app/layout.tsx:90`).
5. **GA4 — RESUELTO el 27 jul** (commit `90be3bc`). Measurement ID `G-39DGBKV73R` (propiedad ya existía en la cuenta de Ivan, nunca se había instalado en el sitio). `gtag.js` agregado en `src/app/layout.tsx` con `next/script` (`strategy="afterInteractive"`), mismo patrón que Meta Pixel y HubSpot.
6. **Redirigir productos descontinuados con página viva — DECIDIDO 5 ago, sin implementar.** Los 5 productos con `discontinued: true` y página activa (`profoto-b10x`, `profoto-b10x-plus`, `profoto-b10x-duo`, `profoto-b10x-plus-duo`, `profoto-d2-kit-500`) hoy auto-redirigen a su propia página de aviso. Decisión de Iván: redirigirlos directamente a su sucesor y excluirlos del sitemap, en vez de mantener fichas de descontinuado. Razón: el presupuesto de rastreo de Google en el dominio es bajo (7 de 96 fichas procesadas al 31 jul) y esas páginas consumen rastreo sin aportar contenido. NO eliminar de `products.ts` en el primer paso — solo redirigir y sacar del sitemap, que es reversible.
7. **Artículo de blog "Equipos Profoto descontinuados y sus reemplazos" — DECIDIDO 5 ago, sin escribir.** Sustituye a las fichas de descontinuado como forma de capturar esas búsquedas. Debe cubrir la transición del catálogo (A1/A1X→A10, B1/B1X→B3, B10/B10X→B20, B10 Plus/B10X Plus→B30, D2 500→D30, D2 1000→D3 1250, Pro-10→Pro-11) y la compatibilidad de accesorios. Pendiente de Iván: specs verificadas de los modelos descontinuados y datos de compatibilidad. Encaja en el pilar de Educación.
8. **Ajuste de precios del catálogo por baja del TRM — PENDIENTE, próxima semana (mencionado por Iván 27-28 ago).** No se tocó ningún precio en la sesión de alquiler/promo más allá de confirmar que el B30 (`10.300.000`) no cambia — el ajuste real de TRM es tarea aparte, todavía sin fecha ni alcance definido (¿todo el catálogo o productos específicos?). Pendiente de Iván antes de tocar `products.ts`.
9. **Auditoría comercial completa de Nova sobre `/alquiler/` — PROPUESTA, sin implementar a propósito.** Solo se hizo la "Opción 2" (ajustes de bajo riesgo: hero de la página, casos de uso, copy "sistema completo" vs "respaldo", tono de cierre). Quedan bloqueadas: sección "Cómo funciona" (4 pasos) y sección "Condiciones" (depósito, seguro, mínimo de días, política de daños) — ambas requieren términos de negocio reales (¿entrega a domicilio o solo recogida? ¿Bogotá o nacional? ¿quién asume el seguro?) que Iván no ha confirmado, no son solo copy. Reestructuración completa en 7 secciones (hero con comparación compra-vs-alquiler, sección de inversión) evaluada y pospuesta por decisión de Iván ("no ahora, vamos incrementando") — queda como referencia, no descartada.
10a. **Diagnóstico de indexación (268 páginas en 404) — RESUELTO el 9 sep** (commit `9376999`). Iván exportó el CSV real de Search Console; 259/267 URLs (97%) ya funcionan bien en producción (redirect o 404 deliberado) — el reporte de Google solo estaba desactualizado. Los 2 gaps reales (`/inicio-medphoto-fotografia-profesional/`, `/flash-profoto-d3/`) ya tienen redirect. Ver §10 para el detalle completo y la clasificación fila por fila.
10b. **Vincular GA4 con Search Console — BLOQUEADO, acción de ~1 min en la consola de Google.** Requiere cuenta `medphotosas@gmail.com`, no accesible desde `web`. Ver §10.
10c. **Instrumentar el botón de WhatsApp por origen — PROPUESTA, sin implementar.** Ver §10 para las dos opciones (evento GA4 vs mensaje pre-cargado distinto por página). Pendiente que Iván elija el enfoque antes de tocar `ProductCard.tsx`, `CartContent.tsx`, `alquiler/page.tsx`, etc.
10d. **`/contacto/` +507% de impresiones — NO VERIFICADO, sin causa técnica identificada en el repo.** Ver §10. No se toca nada hasta ver la cifra absoluta real en Search Console.

10. **Revisión de persistencia del banner de alquiler — PROPUESTA, revisar en un par de semanas (~mediados sep 2026).** Hoy reaparece en cada carga de página sin excepción (decisión deliberada de dar "protagonismo por un tiempo"). Evaluar entonces cambiar a un modelo híbrido: ocultar por un período fijo (X horas) tras cerrarlo, en vez de reaparecer de inmediato. Falta que Iván confirme si quiere el cambio y qué duración prefiere — no tocar código hasta esa confirmación.

### Baja

11. **Copy único por página de marca — RESUELTO el 27 jul** (commit `d2a6648`). Las 4 páginas (`/tienda/[marca]/`) tienen párrafo indexable, tono Profesional confirmado por Ivan para las 4 marcas.
12. **Ampliar el blog de 4 a ~12-15 artículos — EN PROGRESO.** Fuente: posts técnicos que Ivan e Iván ya escribieron junto con Claude.ai para Instagram. Pendiente: Ivan debe recuperar/pasar ese material (no está en este repo ni en esta sesión) antes de poder redactar los artículos nuevos.
13. ~~Gap visual entre el banner de promo y el hero del home.~~ **OBSOLETO 28 ago** — ese banner (`PromoBanner.tsx` original de la Promo Verano) ya no existe; el componente se recreó desde cero con contenido de alquiler, arriba del hero, sin el problema de espaciado original.
14. **Contenido delgado en el home — detectado 27 jul vía auditoría externa (Seobility).** 451 palabras vs ~800 recomendadas. Requiere escribir copy adicional — pendiente definir audiencia/tono antes de tocarlo (regla binding del proyecto).
15. **H1 del home no reforzado en el cuerpo del texto — detectado 27 jul vía Seobility.** El H1 ("La luz que los mejores usan") no comparte palabras clave con el copy del cuerpo. Se resuelve junto con el punto 14 (ambos son trabajo de copywriting, no de código).
16. **Calidad de imagen en pantallas Retina — detectado 27-28 ago, no bloqueante (confirmado por Iván).** El archivo fuente de la imagen hero de `/alquiler/` es 692×555px, 118-121KB. A la altura máxima del contenedor (460px desktop) se ve ligeramente suave en pantallas 2x. Se puede resolver más adelante con una versión de mayor resolución si aparece — sin urgencia.

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

## 7. Campañas

### Alquiler de equipo — activa desde el 27 ago 2026, con presencia en la home desde el 28 ago

Primera línea de alquiler de MedPhoto, ver §5 punto 0. `/alquiler/`, sin tarifa
publicada, CTA a cotizar por WhatsApp.

**28 ago — protagonismo en la home** (decisión de Iván: el alquiler debía tener
visibilidad real, no solo vivir en su propia página). Dos piezas, ambas en producción
(commits `d3b6bfd` y `281214d`, mergeados a `main`):

- **Card "Destacado" del hero** (`src/app/page.tsx`) — mismo componente y posición que
  antes ocupaba el B30 en promoción, contenido reemplazado: badge "Nuevo" (ya no
  "Destacado"), "Phase One IQ3 100 — Alquiler", sin precio, botón "Ver alquiler" →
  `/alquiler/`. Imagen: referencia directa a `public/alquiler/phase-one-iq3-100.jpg`
  (no duplicada). `heroProduct` sigue en uso para el grid de destacados debajo, sin
  variable huérfana.
- **`PromoBanner.tsx` recreado** — el componente se había borrado al apagar la Promo
  Verano; se reconstruyó a partir del último commit antes del borrado
  (`git show b137d41^:src/components/PromoBanner.tsx`), mismo esqueleto visual (fondo
  `#4CB4E7`, layout responsive), contenido nuevo ("Ahora también alquilamos equipo
  Phase One · Sistema completo, listo para tu próxima producción — sin comprar." + CTA
  "Ver alquiler →"), reinsertado **debajo del hero** (antes vivía arriba, decisión
  deliberada de Iván esta vez). **28 ago, ajuste de persistencia:** el cierre del
  banner ya no se guarda en `localStorage` — el estado vive solo en `useState` local,
  así que reaparece en cada carga/recarga de la home aunque el usuario lo haya
  cerrado antes. Verificado en producción: el texto del banner ya sale en el HTML
  servido por el servidor (antes solo aparecía tras hidratación en cliente).

**28 ago — dos ajustes finales, ambos en producción:**

- **Banner: de vuelta arriba del hero** (commit `96e7a81`). El `<PromoBanner />` había
  quedado debajo del hero por instrucción explícita anterior; se movió de vuelta a la
  posición original (primer elemento de la página, antes de todo). Solo cambia la
  posición en `page.tsx` — copy, estilos y comportamiento intactos. Verificado en
  producción: `"Ahora también alquilamos"` aparece en el HTML antes que
  `"Distribuidor Oficial — Colombia"` (badge del hero).
- **Mensaje de WhatsApp reescrito** (commit `b7785c0`). Nuevo texto en los dos lugares
  donde vivía: `whatsappMessage` de `rentals.ts` (CTA "Consultar disponibilidad" en
  `/alquiler/`) y el mapa `WHATSAPP_MESSAGES` de `WhatsAppButton.tsx` (botón flotante
  en esa misma página) — estaban desincronizados desde antes (el flotante seguía
  diciendo "respaldo" en vez de "sistema completo"), quedaron iguales. Texto final:
  *"Hola, estoy interesado en alquilar el sistema Phase One IQ3 100. ¿Me pueden
  confirmar disponibilidad y cotizarlo para mi proyecto? Lo necesitaría del [fecha]
  al [fecha]. Gracias"*. Verificado en producción decodificando el `href` real de
  ambos botones — coincide letra por letra.

### Promo Profoto Verano 2026 — APAGADA el 27 ago (julio–agosto 2026)

Decisión de Iván: apagar la campaña en todo el sitio, sin reemplazo definido todavía
(el espacio de la home lo ocupó después el alquiler, ver arriba). Verificado en producción tras merge a `main` (commit
`db7735e`):

- **Home:** `PromoBanner.tsx` quitado del render y **borrado** (solo se usaba ahí).
  Card "Destacado" del hero: quitados precio tachado `$12.500.000`, "Ahorras
  $2.200.000" y las dos líneas de bono — queda solo `$10.300.000`. CTA "Ver oferta"
  (→ `/promo-profoto/`) cambiado a "Ver producto" (→ `/tienda/profoto/profoto-b30/`,
  ruta real). Badge "Destacado" (indicador de featured, no de promo) intacto.
- **Fichas de producto (B30/A2):** badge "Promo Julio–Agosto" y línea "+ Bono de
  $500.000 en productos MedPhoto" apagados — arrays `PROMO_BADGE_SLUGS` y
  `PROMO_BONO_SLUGS` vaciados en `tienda/[marca]/[slug]/page.tsx` (mecanismo
  reversible, no se borró el JSX, listo para la próxima campaña).
- **`/promo-profoto/`:** **preservada como plantilla**, contenido sin tocar —
  solo se le agregó `robots: {index: false, follow: false}` y se sacó del
  `sitemap.ts`. Sin links entrantes desde el resto del sitio (se quitó del array
  `pages` del footer, que era el único link saliente real). Verificado en
  producción: responde 200, `<meta name="robots" content="noindex, nofollow">`
  presente, contenido idéntico al original.
- **Precio real del B30 en `products.ts` sin cambios** en todo el proceso:
  `10.300.000` — ajuste de TRM pendiente para más adelante, no tocado ahora.

**Aprendizaje de proceso:** `feature/alquiler-equipo` y `feature/apagar-promo-verano`
nacieron del mismo commit de `main` (ramas hermanas, no una fusionada en la otra).
Al fusionar la segunda después de la primera, `Footer.tsx` y `sitemap.ts` tuvieron
conflicto real de merge porque ambas ramas habían tocado la misma región del archivo
(una agregando `/alquiler/`, la otra quitando `/promo-profoto/`) — resueltos a mano,
verificados visualmente en preview antes de aprobar el segundo merge a `main`.

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

### 27-28 de agosto de 2026 — sesión de alquiler/Promo Verano: tres lecciones de proceso

Integrado desde `PENDIENTE_INTEGRAR_WEB_2026-08-27_v2.md` y `_v3.md` (Drive, generados
por Chat0). Tres patrones detectados durante la sesión larga de construir `/alquiler/` y
apagar la Promo Verano:

- **Un patch perdido varias veces en el paso manual Chat0 → Code.** La corrección de
  "el respaldo digital IQ3 100" → "el sistema completo Phase One 645DF+ con respaldo
  IQ3 100" (en la descripción del producto y el mensaje de WhatsApp) se propuso más de
  una vez desde Chat0 sin llegar a aplicarse — el texto se perdía en el copy/paste
  intermedio. Terminó corregido y verificado en producción, pero es un punto ciego real
  del puente actual: no hay forma de que Chat0 confirme que un patch propuesto
  efectivamente llegó al código, más allá de pedirle a Code que lo verifique en la
  siguiente sesión.
- **Efecto secundario no anticipado al limpiar un array compartido.** Al sacar
  `/promo-profoto/` del array `pages` del footer, se quitó por accidente el link
  "Alquiler de Equipo" que vivía en el mismo array (agregado por una rama hermana sin
  fusionar todavía en ese momento). Se detectó y restauró en el mismo ciclo de trabajo,
  pero confirma el patrón ya visto con `Footer.tsx`/`sitemap.ts`: cuando dos líneas de
  trabajo tocan el mismo archivo compartido de forma independiente, un "limpiar lo que
  ya no sirve" puede llevarse por delante algo que sí sirve. Vale la pena revisar el
  array completo, no solo la línea que se está quitando, cada vez que se edita uno de
  estos archivos "de configuración compartida".
- **Verificar con medición real, no con inspección visual.** En un punto de la sesión,
  Chat0 afirmó que dos imágenes de preview eran "idénticas, pixel por pixel" sin
  medirlas — resultaron ser archivos distintos (341×341 cuadrada vs. 230×185
  panorámica). El error se corrigió al verificar con JavaScript real en el navegador
  (leer dimensiones/bytes) en vez de solo comparar capturas de pantalla a ojo — mismo
  principio que ya aplica Code en esta sesión (zoom + lectura de metadata antes de dar
  por buena una imagen).

Ambos `PENDIENTE_INTEGRAR_WEB` (v2 y v3, la v3 reemplaza a la v2) y la nota
`NOTA_banner_alquiler_revision_futura_2026-08-27.md` (contenido absorbido en el punto
10 de §5, Media) archivados en `Integrados/` tras esta integración.

---

## 9. Catálogo TetherTools — auditoría y corrección de precios/links (8 sep 2026)

Iván pidió publicar 2 cables TetherPro que ya tenía en stock. Durante la revisión
de la URL del primero (`/producto/adaptador-rock-solid-baby-ballhead/`) apareció un
redirect apuntando a un producto equivocado, lo que llevó a auditar toda la tabla de
pricing/links de Iván (23 SKU) contra `products.ts` y `legacy-redirects.ts`. Sesión
completa en `main`, sin rama aparte — cada cambio se compiló (`tsc --noEmit` +
`next build`), se verificó el HTML generado localmente, y se verificó de nuevo en
producción con `curl` tras cada push antes de reportarlo a Iván.

### Productos nuevos (6 en total)

- **Commit `937defb`** — 3 cables TetherPro USB (2.0 Mini-B 5-Pin, 3.0 Micro-B,
  2.0 Mini-B 8-Pin), 4.6m, Naranja Alta Visibilidad. SKU/precio/specs tomados de
  tethertools.com, imágenes provistas por Iván (Descargas).
- **Commit `d009404`** — 4 más, encontrados durante la auditoría de redirects (ver
  abajo): TetherPro USB-C a 2.0 Mini-B 5-Pin (`CUC2415-ORG`), JerkStopper Extension
  Lock 3-Pack (`JS026ORG3`), Rock Solid Baby Ballhead Adapter (`RS623-B`), Rock Solid
  4-Head Tripod Cross Bar (`RSTAA4`). Imágenes: ya existían en
  `public/images/products/` desde el pull de assets original (commit
  `477bd21`, "producción lista"), solo sin usar — no hizo falta descargar nada
  nuevo.

### Redirects legacy rotos — 6 encontrados y corregidos (commit `d009404`)

Cada uno devolvía **308** (no 404) pero aterrizaba en un producto o marca que no
correspondía — el tipo de bug más difícil de detectar porque el link "funciona":

| Redirect legacy | Antes (incorrecto) | Ahora |
|---|---|---|
| `/producto/adaptador-rock-solid-baby-ballhead/` | → Rock Solid Low Boy Roller | → producto propio nuevo |
| `/producto/rock-solid-4-head-tripod-cross-bar/` | → Rock Solid Tripod Roller | → producto propio nuevo |
| `/producto/tetherpro-usb-c-to-2-0-mini-b-5-pin/` | → TetherPro USB3 Micro-B Right Angle | → producto propio nuevo |
| `/producto/tetherpro-usb-c-to-3-0-micro-b-right-angle.../` | → TetherPro USB-C a USB-C (producto distinto) | → `tetherpro-usbc-microb-4-6m` (el correcto, ya existía) |
| `/producto/tetherpro-usb-c-to-usb-c-31-9-4m-straight.../` | → cable de 4.6m equivocado | → `tetherpro-usbc-usbc-9-4m` (el de 9.4m correcto) |
| `/producto/jerkstopper-extension-lock-...-3-pack/` | → `/tienda/profoto/` (**marca equivocada**) | → producto propio nuevo, movido de Capa 6a (fallback de marca) a Capa 1 (match específico) |

Verificado con `curl -w "%{redirect_url}"` contra los 6 en producción tras el
deploy — los 6 aterrizan donde deben.

### Precios y disponibilidad — cronología de ajustes confirmados por Iván

La tabla de pricing de Iván pasó por varias rondas de confirmación en la misma
sesión; el estado **final** en producción (no los valores intermedios) es el que
importa para cualquier sesión futura:

| SKU | Producto | Precio final actual | Disponibilidad |
|---|---|---|---|
| CU5451-ORG | TetherPro USB 2.0 a Mini-B 5-Pin 4.6m | $200.000 | En Stock |
| CU5454-ORG | TetherPro USB 3.0 a Micro-B 4.6m | $230.000 | En Stock |
| CU61RT15-ORG | TetherPro USB 3.0 a Micro-B Right Angle 4.6m | $270.000 | En Stock |
| CU8015-ORG | TetherPro USB 2.0 a Mini-B 8-Pin 4.6m | $200.000 | En Stock |
| CUC15RT2RT-ORG | TetherPro USB-C a USB-C Right Angle 4.6m | $290.000 | Sin stock (backorder) |
| CUC2415-ORG | TetherPro USB-C a 2.0 Mini-B 5-Pin 4.6m | $200.000 | En Stock |
| CUC31R-ORG | TetherBoost Pro (9.4m) USB-C to 3.0 Micro-B Cable System (Straight to Straight) | $600.000 | **En Stock (badge) pero `stock: OutOfStock` en el dato** — desync sin corregir, ver nota técnica |
| CUC31RT2-ORG | TetherPro USB-C a USB-C 9.4m | **$650.000** (ajustado 8 sep, después del round inicial de $600.000) | En Stock |
| CUC3215-ORG | TetherPro USB 3.0 a USB-C 4.6m | $230.000 | En Stock |
| CUC33R15-ORG | TetherPro USB-C a Micro-B Right Angle 4.6m | $270.000 | En Stock |
| JS026ORG3 | JerkStopper Extension Lock (Paquete de 3 unidades) | $155.000 | En Stock |
| RS623-B | Rock Solid Baby Ballhead Adapter | $230.000 | En Stock |
| RSDL012 | Rock Solid Tripod Roller | $430.000 | En Stock |
| RSLBR81 | Rock Solid Low Boy Roller | $1.250.000 | Sin stock (backorder) |
| RSTAA2 | Rock Solid 2-Head Cross Bar Side Arm | $450.000 | En Stock |
| RSTAA4 | Rock Solid 4-Head Tripod Cross Bar | $700.000 | En Stock |
| TB-QR-004G | TetherBlock Arca Graphite | $550.000 | Sin stock (backorder) |
| TBPRO3-ORG | TetherBoost Pro USB-C Core Controller Extension Cable | $390.000 | En Stock (badge) — sin campo `stock` definido en el dato |
| TG-LLP | TetherGuard LeverLock Plate | $550.000 | Sin stock (backorder) |
| TG098 | TetherGuard Tethering Support Kit | $151.000 | En Stock |
| TTA1SBLK | Tether Table Aero Standard | **$1.250.000** (ajustado 8 sep, desde $1.251.000) | En Stock |
| LLPC31RT2-ORG | TetherGuard LeverLock & Cable Kit | $1.014.000 | **Sin stock (backorder)** — marcado 8 sep, antes decía "En Stock" |
| TTSET | Tether T-Setup | **$1.100.000** (ajustado 8 sep, desde $1.312.000) | **En Stock** — marcado 8 sep, antes decía "Disponible bajo pedido" |

Nota técnica encontrada de paso: el campo `availability` (badge visible: "En
Stock" / "Disponible bajo pedido" / etc.) y el campo `stock` (solo alimenta el
JSON-LD de SEO, no se renderiza en pantalla) pueden quedar desincronizados si se
edita uno sin el otro. Pasó con Low Boy Roller (corregido esta sesión, ver tabla
arriba) y **sigue sin corregir en dos productos, detectados al escribir esta
nota pero no confirmados con Iván todavía:**
- `tetherboost-pro-9-4m` (CUC31R-ORG): `stock: "OutOfStock"` pero
  `availability: "available"` — el sitio muestra badge "En Stock", el schema le
  dice a Google que está agotado. Preexistente, no se tocó en esta sesión más
  que el precio y el nombre.
- `tetherboost-pro-core-controller` (TBPRO3-ORG): no tiene campo `stock` en
  absoluto (el resto del catálogo sí lo tiene). Badge dice "En Stock".

Al tocar disponibilidad de cualquier producto, revisar los dos campos juntos —
y sería buena idea que Iván confirme el estado real de estos dos antes de que
alguien asuma que "En Stock" en pantalla es el dato completo.

Commits de esta ronda de precios/nombres/disponibilidad, en orden: `cb60898`
(8 ajustes de accesorios), `1e554b1` (USB-C a USB-C 9.4m a $650.000), `598efbc`
(nombre TetherBoost Pro 9.4m), `338b428` (nombre JerkStopper en español), `040689e`
(Low Boy Roller sin stock), `b4cf948` (Tether Table Aero a $1.250.000), `ba58253`
(Tether T-Setup a $1.100.000), `d6449e0` (Tether T-Setup en stock), `9d9a35c`
(TetherGuard LeverLock sin stock). Todos verificados en producción con `curl` tras
cada deploy antes de reportar a Iván.

**Aprendizaje de proceso:** el bug que arrancó la auditoría (Baby Ballhead → Low Boy
Roller) no daba 404 — daba 308 a una página que carga perfecto, solo que es la
equivocada. Un chequeo de solo status-code (200/404) sobre un mapa de redirects no
detecta este tipo de error; hace falta comparar el *destino* contra el SKU/nombre
esperado, no solo confirmar que el destino carga.

---

## 10. Diagnóstico "sistema de ventas" — indexación y atribución (9 sep 2026)

Integrado desde `PENDIENTE_INTEGRAR_WEB_2026-09-09.md` (Drive), escrito por la sesión
`marketing`/`instagram-engine` a partir de capturas de Search Console y GA4 que mandó
Iván. Diagnóstico arrancado por Chat0 el 9 sept 2026 — el análisis de datos (GA4/Search
Console) vive en `marketing`; la corrección técnica del sitio es trabajo de `web`. Ver
`MEDPHOTO_ESTADO_ACTUAL_MARKETING.md` §9 (Drive) para la narrativa completa.

### DATO — Indexación de `medphoto.com.co` (Search Console, capturas de Iván, 9 sep 2026)

De 589 páginas rastreadas: **90 indexadas, 499 sin indexar**.

| Motivo | Fuente | Páginas |
|---|---|---|
| No se ha encontrado (404) | Sitio web | **268** |
| Rastreada: actualmente sin indexar | Sistemas de Google | 130 |
| Excluida por etiqueta "noindex" | Sitio web | 66 |
| Página con redirección | Sitio web | 13 |
| Descubierta: actualmente sin indexar | Sistemas de Google | 15 |
| Página alternativa con canónica adecuada | Sitio web | 4 |
| Duplicada, sin canónica indicada | Sitio web | 2 |
| Bloqueada (403) | Sitio web | 1 |

Los 66 "noindex" probablemente incluyen intencionales (`/promo-profoto/`, marcado
`noindex` a propósito el 28 ago, ver §5 punto 9 histórico / estado `marketing` §5
ítem 5) — no alarmante sin ver el detalle completo.

**RESUELTO 9 sep.** El acceso directo a Search Console desde esta sesión (`web`) estaba
bloqueado — la cuenta de Chrome activa es `ivanpb77@gmail.com`, la propiedad pertenece a
`medphotosas@gmail.com` ("Oops, you don't have access to this property"), y no se
intentó iniciar sesión con otra cuenta (requeriría contraseña, fuera de lo permitido).
Iván exportó el listado manualmente (Search Console → Indexación → Páginas → fila "No se
ha encontrado (404)" → Exportar → CSV) y lo pasó como archivo
(`medphoto.com.co-Coverage-Drilldown-2026-09-09/Tabla.csv`, 267 filas de datos).

**Clasificación de las 267 URLs (por patrón de path) + verificación en vivo con `curl`
contra producción (40+ muestras al azar, todas consistentes dentro de su categoría):**

| Patrón | Filas | Estado real en producción (curl, 9 sep) |
|---|---|---|
| `/producto/*` | 179 | **308**, redirige bien (específico o fallback de marca) |
| `/categoria-producto/*` | 22 | **308**, redirige bien |
| `/etiqueta-producto/*` | 58 | **404 deliberado** — decisión ya tomada en §4, sin acción |
| `/nosotros-medphoto-distribuidores-2/`, `/catalogo-productos-fotografia-iluminacion/`, `/como-escoger-tu-paraguas/`, `/terms/`, `/phase-one/` | 5 | **308**, ya cubiertas por Capa 2 (rutas sueltas) |
| `/inicio-medphoto-fotografia-profesional/` | 1 | Era 404 real → **corregido** (ver abajo) |
| `/flash-profoto-d3/` | 1 | Era 404 real → **corregido** (ver abajo) |
| `/mi-cuenta/` | 1 | 404 — sin sistema de cuentas en el sitio actual, no hay destino real |
| `/?taxonomy=product_shipping_class&term=envio-1/feed/` | 1 | 404 — feed de taxonomía de WooCommerce, basura, sin contenido real |

**Hallazgo principal: el reporte de Search Console está desactualizado, no refleja la
producción actual.** 259 de las 267 URLs (97%) ya funcionan bien hoy (redirect 308 o 404
deliberado por diseño) — el mapa de redirects está vigente desde el 27 jul y no cambió
para ninguna de estas rutas desde entonces (`git log` confirma cero commits a
`next.config.ts`/`legacy-redirects.ts` entre el 5 ago y el 8 sep, salvo los cables
TetherTools del 8 sep que no tocan estas URLs). El "Último rastreo" del reporte muestra
fechas de 3–4 sep, pero el estado ya era correcto en esas fechas también — consistente
con lo ya documentado en §5 punto 1 sobre presupuesto de rastreo bajo (7 de 96 fichas
procesadas al 31 jul): Google recrawlea despacio y el reporte de Coverage tarda en
reflejar cambios, incluso de hace más de un mes.

**Corregido (commit `9376999`):** los únicos 2 gaps reales encontrados, agregados a
`directRedirects` en `src/data/legacy-redirects.ts`:
- `/inicio-medphoto-fotografia-profesional/` → `/` (alias legacy del home)
- `/flash-profoto-d3/` → `/tienda/profoto/` (página suelta del sitio viejo, no
  `/producto/`; sin SKU específico identificable — single/duo, 750W/1250W — así que se
  usó el fallback de marca, mismo criterio que la Capa 6 para productos sin match)

`/mi-cuenta/` y el feed de shipping-class quedan en 404 a propósito — no hay página
equivalente en el sitio actual ni tiene sentido crear una solo para capturar el rastreo.

**GA4 — 7 vistas en "Página no encontrada" (ventana 2–8 sep):** no se pudo confirmar el
origen exacto (interno vs. backlink externo) porque GA4 tampoco es accesible desde este
Chrome (misma cuenta `medphotosas@gmail.com`). Dado que solo 2 URLs además de
`/mi-cuenta/` y el feed daban 404 real en ese período, es razonable que esas vistas
vengan de ahí (marcadores o backlinks viejos a `/inicio-medphoto-fotografia-profesional/`
o `/flash-profoto-d3/`) — **NO VERIFICADO**, hipótesis consistente con los datos
disponibles, no confirmación directa.

### DATO — Rendimiento en Search Console (ventana 26 jul–6 sep, 3 meses)

36 clics totales, 1.480 impresiones, CTR medio 2,4%, posición media 6,3. Top consultas:
"medphoto" (marca propia) 4 clics/242 impresiones — CTR bajo incluso en búsqueda de
marca; "profoto" 3/78; "phase one xf iq4 150mp" 2/20; "camara phase one" 2/11. Ningún
término genérico de categoría entre las consultas principales.

`/contacto/` tuvo **+507%** de impresiones recientes (recomendación de Google en Search
Console). **NO VERIFICADO — causa.** Revisé el repo: `/contacto/` está enlazado desde
Header y Footer (nav global) desde el lanzamiento del sitio — no hay commit reciente que
agregue un enlace nuevo hacia esa página (`git log -- "*contacto*"` solo muestra los dos
commits del lote SEO de julio). Con un total de apenas 1.480 impresiones en 3 meses para
todo el sitio, un +507% en una página individual puede ser una base tan chica (unas
pocas impresiones antes → algunas más después) que el porcentaje no signifique nada —
pero no puedo confirmar los números absolutos sin Search Console en vivo. Sin evidencia
de causa técnica en el sitio; no se toca nada hasta ver la cifra real.

### DATO — GA4 y Search Console siguen sin vincular

La recomendación "Vincula tu propiedad de Search Console" sigue apareciendo en el home
de GA4 (cuenta `medphotosas@gmail.com`, propiedad "Medphoto Colombia"). Configuración de
~1 minuto según la propia UI de Google. **NO EJECUTADO** — es una acción dentro de la
consola de Google (Admin → Vinculaciones de productos), no en el repo, y requiere la
cuenta `medphotosas@gmail.com` que no está logueada en este Chrome. Debe hacerlo Iván
directamente o vía Claude.ai con esa cuenta.

### PENDIENTE — Botón de WhatsApp sin trazabilidad de origen

Todo el contacto entrante (web orgánico, Instagram, e-blast) converge en el mismo botón
de WhatsApp (`+57 324 368 0862`, ver `src/data/products.ts` `WHATSAPP`) sin diferenciar
canal — ningún lead es atribuible hoy a su origen real. Ya registrado en
`MEDPHOTO_ESTADO_ACTUAL.md` de `instagram-engine` §4 ítem 12; la implementación es
trabajo de `web`. Los CTA de WhatsApp del sitio ya usan mensaje pre-cargado
(`whatsappProduct()` en `src/data/products.ts`, más casos a mano en `alquiler/page.tsx`,
`promo-profoto/page.tsx`, `CartContent.tsx`) pero ninguno identifica la página/sección de
origen. Dos formas de resolverlo, no excluyentes: (a) evento GA4 (`gtag`, ya instalado)
al hacer click, con parámetro de origen — atribución real sin depender de que Iván lea el
texto del chat; (b) prefijo distinto en el mensaje pre-cargado por página/sección —
visible a simple vista en WhatsApp. **Sin implementar** — cambia el comportamiento
visible del flujo de contacto en varias páginas, así que se consulta el enfoque con Iván
antes de tocar el código (ver §5 pendientes).

Ambos `PENDIENTE_INTEGRAR_WEB` de esta fecha archivados en `Integrados/` tras esta
integración.
