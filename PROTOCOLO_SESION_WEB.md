# PROTOCOLO DE SESIÓN — TRABAJO WEB CON CLAUDE.AI

**Creado:** 5 de agosto de 2026
**Propósito:** cómo trabajar. NO contiene estado del proyecto.

> **Este documento NO reemplaza `MEDPHOTO_ESTADO_ACTUAL.md`.**
> Ese vive en `~/medphoto-web/site/`, lo mantiene Claude Code, y es la fuente
> de verdad sobre el estado del sitio. Este documento cubre el proceso.

---

## 1. ARRANQUE OBLIGATORIO DE SESIÓN

**Antes de cualquier otra cosa en un chat nuevo de trabajo web:**

Iván le pide a Claude Code:

```
cd ~/medphoto-web/site && git checkout main && git pull origin main
Luego pega el contenido completo de MEDPHOTO_ESTADO_ACTUAL.md
en bloques de 70 líneas usando sed -n 'X,Yp', indicando
cuántas líneas van y cuántas faltan.
```

Y pega ese contenido en el chat de Claude.ai.

**Por qué es obligatorio:** Claude.ai NO puede leer el repositorio. La copia
que exista en el panel del proyecto se desactualiza en días. Sin este paso,
Claude opera sobre un estado viejo y propone trabajo que ya está hecho.

**Esto ya falló una vez** (5 ago 2026): se perdió una sesión completa
re-proponiendo Search Console, el mapa de 301, GA4 y el logo horizontal —
todo resuelto el 27 de julio.

---

## 2. DIVISIÓN DE TRABAJO

| Situación | A quién |
|---|---|
| Dato factual dentro del repo | **Code directo** |
| Escribir código dentro de spec aprobada | **Code directo** |
| Comandos de terminal, `curl`, `dig`, `git` | **Code directo** |
| ¿Qué ve Google, la competencia, producción? | **Claude.ai** |
| Auditar output de Code cuando la decisión es costosa | **Claude.ai** |
| Cruces entre sistemas (DNS, Wayback, índice de Google) | **Claude.ai** |
| Decisiones de secuencia, prioridad, arquitectura | **Claude.ai propone, Iván decide** |

**Principio:** no usar a Claude.ai de mecanógrafo. Si la pregunta se responde
leyendo un archivo, va directo a Code.

**Asimetría clave:** Code ve el repositorio, no la historia de producción.
Claude.ai ve el exterior (Google, Wayback, HTTP en vivo), no el repositorio.
Ninguno de los dos ve el cuadro completo solo.

---

## 3. ERRORES DOCUMENTADOS DE CLAUDE.AI

Patrones reales observados en sesión, con su corrección.

### 3.1 — Datos de memoria presentados como verificados
Ocurrió dos veces el 26 jul: "Next.js 15" (era 16.2.4) y "el alias `medphoto`
abre el repo del sitio" (abre `~/Documents/MedPhoto`). Ambos escritos en
documentación con el mismo tono que datos confirmados por `curl`.

> **Regla:** cualquier dato que no venga de una verificación de la sesión
> actual va marcado como `NO VERIFICADO`. Sin excepción.

### 3.2 — Reemplazo de bloque sin inventariar qué se pierde
Ocurrió tres veces sobre `CLAUDE.md`: se perdieron la regla de "Capas de
seguridad", los comandos `/careful` y `/guard`, y la columna "Propósito" de
la tabla de plugins. Las tres eran correctas.

> **Regla:** antes de reemplazar una sección completa, listar qué contiene
> y qué se conserva. Code debe diffear contra el contenido anterior y
> reportar pérdidas ANTES de aplicar, no cuando se le pregunta.

### 3.3 — Empujar el siguiente paso sin cerrar el actual
Patrón sostenido: cerrar cada respuesta proponiendo trabajo nuevo aunque
hubiera algo en curso. Genera dispersión y mezcla frentes.

> **Regla:** si hay algo en ejecución o una pregunta sin responder, la
> respuesta termina ahí. No se proponen siguientes pasos.

### 3.4 — Mezclar frentes de trabajo
Ocurrió el 26 jul: en una sesión de SEO web se arrastró una corrección de
marketing (§4 de `CLAUDE.md`) sin justificación ni permiso.

> **Regla:** una sesión, un frente. Web, contenido y automatización son
> sesiones distintas.

### 3.5 — Modificar `CLAUDE.md` sin petición explícita
`CLAUDE.md` es el archivo raíz que Code carga automáticamente. Se editó como
efecto secundario de una pregunta informativa.

> **Regla:** `CLAUDE.md` solo se toca cuando Iván lo pide explícitamente.
> Nunca como consecuencia de otra conversación.

---

## 4. LO QUE SÍ FUNCIONÓ

Reglas que atraparon errores reales. Mantener.

- **Línea de reconciliación al inicio del reporte de Code:**
  `"Respondí X de Y. Sin verificar: [números]."`
  Detecta en dos segundos si Code ejecutó el prompt o reprodujo contexto viejo.
- **`NO VERIFICADO` obligatorio** — expuso los datos de memoria falsos.
- **Trampas plantadas** en tareas de mapeo: incluir ítems que deben resultar
  `UNRESOLVED`. Si vuelven resueltos, el lote está inventado.
- **Verificación contra producción con `curl`**, no contra el reporte de Code.
- **Rama separada + preview antes de merge** para cambios estructurales.
- **Pipeline por pasos con conteo tras cada uno** — un fallo temprano no
  contamina los pasos siguientes en silencio.

---

## 5. CAPAS DE SEGURIDAD

Si Claude pide desactivar cualquier protección (Vercel Deployment Protection,
firewall, permisos, acceso público temporal):

- **Claude es responsable de cerrarla en el mismo hilo**, sin que Iván tenga
  que recordarlo.
- Mientras esté abierta, se declara explícitamente como pendiente al final de
  **cada** respuesta.
- Nunca dar por terminada una tarea con una capa abierta.

**Credenciales:** nunca en chat, nunca a agentes. Ni tokens de GitHub, ni
bypass tokens de Vercel, ni acceso SSH a Dongee (ese servidor aloja el correo
corporativo — el radio de daño incluye el canal de contacto del negocio).

---

## 6. ERRORES DE ENTORNO CONOCIDOS

- `grep` en la máquina de Iván resuelve a **`ugrep`**: no acepta `\|` como
  alternancia. Usar `-E` con `|`.
- `git log --grep` usa regex básica por defecto. Para alternancia, añadir `-E`.
- El cwd de Bash en Code **se resetea entre comandos**: anteponer
  `cd ~/medphoto-web/site &&` a cada uno.
- Eso **no** corrige la raíz de sesión para skills. Claude Code debe arrancarse
  con `web` (no `medphoto`) o las skills de gstack no cargan.
- Los pegados largos desde Code **se cortan**. Pedir bloques de 70 líneas con
  `sed -n 'X,Yp'` y conteo explícito de cuántas van y cuántas faltan.

---

## 7. FORMATO DE PROMPTS PARA CODE

- **Completos y autocontenidos.** Iván no debe tener que agregar, sustituir ni
  completar nada dentro del prompt.
- **Un solo pegado.** Si hay que partirlo, el prompt lo dice explícitamente.
- **Compuertas** en tareas de varios pasos: `"Si falla, pega el error y
  detente. No improvises fixes."`
- **Línea de cierre obligatoria** con conteo verificable.
- **Verificaciones antes de las ediciones**, no después.
- **Prohibiciones explícitas** cuando aplique: no tocar `products.ts`, no
  hacer merge a `main`, no modificar `package.json`.

---

*Mantenido por Claude · Actualizar cuando aparezca un patrón nuevo*
