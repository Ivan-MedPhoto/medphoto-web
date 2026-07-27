# TODOS

## Auditoría manual de redirects 301 legacy (fast-follow)

Contexto: `/autoplan` — 27 jul 2026, revisión del plan de redirecciones 301
para URLs legacy (`~/.gstack/projects/Ivan-MedPhoto-medphoto-web/main-legacy-redirects-plan.md`).

El matching automático (Reglas A/B) resolvió 41 de las 230 rutas de producto.
**Corrección (27 jul):** la cifra "~34 filas restantes" era una estimación
aproximada de una sesión anterior. El análisis real de las 189 rutas UNRESOLVED
(token-overlap contra la columna `candidatos` del CSV) da: **118 con algún
candidato razonable (42 alta confianza, 55 media, 21 baja), 71 sin ningún
candidato**. Lista completa, con ruta legacy + candidato + SKU + nivel de
confianza para cada una de las 118, en el anexo "Lista de auditoría manual"
de `~/.gstack/projects/Ivan-MedPhoto-medphoto-web/main-legacy-redirects-plan.md`.
Todas quedan temporalmente en el fallback por marca (nunca 404, nunca home)
hasta que Ivan haga la auditoría manual caso por caso — empezar por la franja
"Alta", luego "Media"; "Baja" tiene más ruido que señal.

**Riesgo a tener en cuenta durante la auditoría** (ya documentado en
`MEDPHOTO_ESTADO_ACTUAL.md:159-160`, confirmado con 2 ejemplos reales en el
anexo del plan):
- Colisión de prefijo SKU: `901300` = Profoto B30, pero `901300C/N/S/F/L/U` = Connect Pro. Match debe ser exacto de string, nunca por prefijo.
- Familias casi idénticas: `Connect` (`901400C`) vs `Connect Pro` (`901300C`), o `A1X` vs `A10`, o `C1 Plus` vs `B10X Plus` — alto riesgo de mapeo automático incorrecto. El heurístico de esta sesión ya produjo 2 falsos positivos por esta razón (ver anexo del plan) — ningún candidato debe tratarse como confirmado sin revisión de Ivan.

Decisión: enviar el plan ahora con 41 resueltas + fallback por marca; esta
auditoría no bloquea la implementación inicial.
