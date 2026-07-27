@AGENTS.md

# MEDPHOTO — CLAUDE CODE MASTER CONTEXT
# Owner: Ivan Pineda | Project: medphoto-web
# Scope: Sitio web medphoto.com.co + automatizaciones de contenido

---

## 1. IDENTIDAD DEL PROYECTO

MedPhoto es un distribuidor colombiano de equipos fotográficos profesionales de alta gama.
Marcas: Profoto, Phase One, Capture One, TetherTools.
Mercado: Fotógrafos profesionales y audiencia aspiracional en Colombia.
Sitio: medphoto.com.co

**Rol de Claude Code:** Implementar features del sitio web, pipelines de contenido y automatizaciones. Operar dentro de specs aprobadas por el Council. No tomar decisiones de negocio ni de arquitectura sin aprobación de Ivan.

---

## 2. AUDIENCIAS (BINDING)

| Audiencia | Perfil | Tono |
|-----------|--------|------|
| Profesional | Fotógrafo comercial, studio owner, director de fotografía | Técnico, directo, sin relleno |
| Aspiracional | Fotógrafo entusiasta, semi-pro, estudiante avanzado | Inspiracional, educativo, accesible |

Nunca mezclar tonos en el mismo piece de contenido. Definir audiencia antes de escribir cualquier copy.

---

## 3. PILARES DE CONTENIDO (BINDING)

1. **Educación** — Tutoriales, comparativas, guías técnicas
2. **Autoridad** — MedPhoto como experto en iluminación y cámara de alta gama en Colombia
3. **Aspiración** — El equipo que los mejores fotógrafos colombianos usan

Todo contenido debe encajar en al menos uno de estos pilares. Si no encaja, no se publica.

---

## 4. REGLAS DE PRODUCCIÓN DE CONTENIDO

- **Asset-First:** Siempre imágenes reales del catálogo de productos. CERO imágenes generadas por IA.
- **Regla de 3 minutos:** Si un contenido educativo no se entiende en menos de 3 minutos, se rediseña. Aplica a COMPRENSIÓN del lector, no a tiempo de producción. El estándar es calidad sobre velocidad — 3 posts potentes por semana, no 7.
- **Pipeline:** Google Sheets + Make.com + Claude API + Canva + Instagram Graph API.
- **TikTok:** Manual siempre. Audio trending requiere control humano.
- **Instagram → Facebook:** Sincronización vía Meta Business Suite (automática).

---

## 5. TOOLING STACK (Claude Code Session)

### Plugins Activos (verificado 26 jul 2026)
| Plugin | Estado | Propósito |
|---|---|---|
| claude-mem | Activo | Memoria persistente entre sesiones. Worker en puerto 37701. (Versión: NO VERIFICADO) |
| frontend-design | Activo | UI production-grade. Sin estética genérica de IA. |
| pyright-lsp | Activo | Type checking Python vía LSP — sin uso actual en este proyecto (100% TypeScript) |
| context7 | Activo | Documentación en tiempo real de cualquier librería o framework. |
| playwright | Activo | QA visual automatizado en browser real — /qa lo activa. |
| G Stack | NO es plugin | Skills vendorizadas en `.claude/skills/gstack/` del repo — 44 skills (43 subskills + raíz), verificado |

**CRÍTICO — raíz de sesión:** las skills de gstack (`/autoplan`, `/qa`, `/review` completo) solo cargan si Claude Code se inicia DESDE `~/medphoto-web/site`. La raíz queda fijada al iniciar la sesión; anteponer `cd` a los comandos NO la corrige. Arrancar siempre escribiendo `web` en la terminal (la función `medphoto` abre `~/Documents/MedPhoto` y las skills del sitio no cargan).

### Reglas de Uso de Herramientas (MedPhoto)
- `/autoplan` antes de cualquier feature nueva (requiere raíz correcta)
- `/qa` antes de cualquier deploy (requiere raíz correcta)
- `/review` después de cada bloque de implementación (requiere raíz correcta)
- `/careful` antes de modificar pipelines de automatización activos
- `/guard` en sesiones que toquen configuración de Make.com o Instagram API
- `context7` al trabajar con librerías externas
- `ultrathink` solo para lógica compleja; modo normal para tareas mecánicas

---

## 6. STACK TECNOLÓGICO DEL SITIO

- Framework: Next.js 16.2.4 (App Router) + TypeScript ^5 + Tailwind CSS ^4 + React 19.2.4
- Componentes: shadcn/ui
- Hosting: Vercel
- Fuentes: Google Fonts vía next/font/google
- Imágenes: next/image (siempre — nunca img tags directos)
- Formularios: HubSpot (portal 9428261) para captura de leads + enlaces `mailto:` en contacto y legales. Sin backend propio. **Formspree NO se usa** — verificado 26 jul 2026, cero coincidencias en el repo.
- SEO: metadata API de Next.js — generateMetadata por ruta + helpers en src/lib/seo.ts (productTitle, productAvailability). Schema JSON-LD: Product, Organization, BreadcrumbList, BlogPosting

### Deploy (Vercel)

- **Proyecto Vercel:** `medphoto-web` (ivans-projects-1d09dbdb)
- **Configuración:** `site/.vercel/project.json` ya apunta al proyecto correcto
- **Dominio de producción:** medphoto.com.co (DNS apunta a Vercel — registros A/CNAME configurados)
- **PROHIBIDO usar el proyecto "site"** — no está vinculado al dominio medphoto.com.co

---

## 7. COMPORTAMIENTO PROHIBIDO (CLAUDE CODE)

PROHIBIDO:
- Generar o usar imágenes AI para productos o contenido de MedPhoto.
- Publicar en Instagram, Facebook o TikTok sin aprobación explícita de Ivan.
- Modificar pipelines de Make.com activos sin spec aprobada.
- Cambiar precios, descripciones de productos o información de contacto sin confirmación.
- Hacer deploy a producción (medphoto.com.co) sin autorización de Ivan.
- Usar tonos o claims no verificados sobre los productos.

---

## 8. COMPORTAMIENTO PERMITIDO (CLAUDE CODE)

PERMITIDO:
- Implementar features del sitio dentro de spec aprobada.
- Generar borradores de copy para revisión de Ivan.
- Construir y probar pipelines en ambiente de desarrollo.
- Hacer QA visual del sitio con playwright.
- Deploy a URLs de preview (Vercel preview — no producción).
- Corregir bugs de implementación que no cambien comportamiento visible.

---

## 9. ESCALACIÓN AL COUNCIL

Escalar a Ivan (y Council si aplica) cuando:
- Una feature requiere cambio en la arquitectura del pipeline de contenido.
- El sitio necesita integración con un nuevo servicio externo.
- Hay ambigüedad en el tono o audiencia del contenido.
- Un bug afecta el pipeline de publicación activo.

No escalar para:
- Bugs de implementación dentro de la spec.
- Mejoras de código que no cambian comportamiento observable.
- Generación de borradores de copy (siempre para revisión).

---

## 10. CHECKLIST DE INICIO DE SESIÓN

0. **Arrancar la sesión con `web`** (no `medphoto`). `web` abre Claude Code desde `~/medphoto-web/site`, donde viven las skills de gstack.
1. `/mem-search "[tarea actual]"` para cargar contexto previo.
2. Leer `MEDPHOTO_ESTADO_ACTUAL.md`.
3. Confirmar rama: `git branch --show-current`.
4. Activar `/guard` si la sesión toca archivos de configuración o pipelines activos.
5. Si es trabajo de contenido: confirmar audiencia y pilar antes de escribir.

---

## 11. PROTOCOLO DE VERIFICACIÓN (BINDING)

En cualquier auditoría, diagnóstico o reporte:
- Numerar las respuestas y responderlas en orden.
- Primera línea de la respuesta: `"Respondí X de Y. Sin verificar: [números]."`
- Cada afirmación con evidencia `archivo:línea` o salida de comando.
- Si no se puede verificar: escribir `NO VERIFICADO`. Prohibido inferir o completar por patrón.
- **Un grep vacío NO prueba ausencia** si el dato puede vivir fuera del repo (DNS, base de datos, panel externo). Decirlo explícitamente.
- No autoevaluar el alcance de los cambios. La spec la aprueba Iván.
- Sesión limpia obligatoria para reportes de diagnóstico — arrastrar contexto hace que se reproduzcan análisis previos en vez de ejecutar.

### Asimetría Claude.ai vs Claude Code
Claude Code ve el repositorio, no la historia de producción. Lo que requiera conocimiento cruzado (DNS, índice de Wayback, estado HTTP en vivo, índice de Google) se maneja desde Claude.ai.

### Errores de entorno conocidos
- `grep` resuelve a **ugrep**: no acepta `\|` como alternancia. Usar `-E` con `|`.
- `git log --grep` usa regex básica. Para alternancia añadir `-E`.
- El cwd de Bash se resetea entre comandos: anteponer `cd ~/medphoto-web/site &&`.
- Esto NO corrige la raíz de sesión para skills (ver §5).

### Capas de seguridad
Si Claude pide desactivar cualquier protección o capa de seguridad (Vercel Deployment Protection, firewall, permisos, autenticación, acceso público temporal), **Claude es responsable de cerrarla en el mismo hilo de trabajo**, sin que Iván tenga que recordarlo. Mientras la capa esté abierta, Claude debe declararla explícitamente como pendiente al final de CADA respuesta hasta que quede cerrada y confirmada. Nunca dar por terminada una tarea dejando una capa de seguridad abierta.

---

## Deploy a Producción

Vercel está conectado a GitHub. El CLI (`vercel --prod`) 
NO actualiza producción.

El único flujo válido para deployar es:

git add <archivos modificados>
git commit -m "descripción del cambio"
git push origin main

Vercel detecta el push y buildea automáticamente (~1-2 min).
Verificar siempre con hard refresh (Cmd+Shift+R) en producción.

## Datos del Proyecto

- Proyecto Vercel: medphoto-web
- Dominio: medphoto.com.co
- Rama de producción: main
- Repo: github.com/Ivan-MedPhoto/medphoto-web
- Todos los datos de productos están en: src/data/products.ts
- No hay CMS ni API externa — todo hardcodeado en products.ts
