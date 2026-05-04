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
- **Regla de 3 minutos:** Cada piece de contenido debe producirse en máximo 3 minutos. Si tarda más, el proceso está roto — escalar a Ivan.
- **Pipeline:** Google Sheets + Make.com + Claude API + Canva + Instagram Graph API.
- **TikTok:** Manual siempre. Audio trending requiere control humano.
- **Instagram → Facebook:** Sincronización vía Meta Business Suite (automática).

---

## 5. TOOLING STACK (Claude Code Session)

### Plugins Activos
| Plugin | Propósito |
|--------|-----------|
| claude-mem v12.4.7 | Memoria persistente entre sesiones. Worker en puerto 37701. |
| G Stack (43 skills) | /autoplan, /design-html, /qa, /review, /ship — pipeline completo de web. |
| frontend-design | UI production-grade. Sin estética genérica de IA. |
| pyright-lsp | Type checking Python activo como LSP server. |
| context7 | Documentación en tiempo real de cualquier librería o framework. |
| playwright | QA visual automatizado en browser real — /qa lo activa. |

### Reglas de Uso de Herramientas (MedPhoto)
- Usar /autoplan antes de cualquier feature nueva del sitio.
- Usar /qa antes de cualquier deploy o presentación a Ivan.
- Usar /review después de cada bloque de implementación.
- Usar context7 cuando se trabaje con librerías externas (Next.js, Vercel, Make.com API).
- Usar /careful antes de modificar pipelines de automatización activos.
- Usar /guard en sesiones que toquen archivos de configuración de Make.com o Instagram API.
- ultrathink: SOLO para lógica compleja (algoritmos de pricing, lógica de automatización no trivial).
- Para tareas mecánicas (copy, captions, HTML básico): modo normal.

---

## 6. STACK TECNOLÓGICO DEL SITIO

- Framework: Next.js (App Router) + TypeScript + Tailwind CSS
- Componentes: shadcn/ui
- Hosting: Vercel
- Fuentes: Google Fonts vía next/font/google
- Imágenes: next/image (siempre — nunca img tags directos)
- Formularios: Formspree o mailto: (sin backend propio)
- SEO: metadata export desde layout.tsx

### Deploy (Vercel)

- **Proyecto Vercel:** `medphoto-web` (ivans-projects-b1e5d1e4)
- **Configuración:** `.vercel/project.json` ya apunta al proyecto correcto
- **Comando producción:** `vercel --prod` (ejecutar desde `site/`)
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

1. Ejecutar /mem-search "[tarea actual]" para cargar contexto previo.
2. Confirmar qué feature o pipeline se va a trabajar.
3. Activar /guard si la sesión toca archivos de configuración o pipelines activos.
4. Si es trabajo de contenido: confirmar audiencia y pilar antes de escribir.
