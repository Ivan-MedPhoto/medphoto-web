# Legacy migration — datos fuente

Insumos crudos de la migración WordPress → Next.js y del diagnóstico de 404
de julio 2026 (25-26 jul). Encontrados sueltos en `~/` — el repo entonces
todavía no existía en su ubicación actual — y movidos aquí el 10 sep 2026
para que queden versionados en vez de perdidos en el home.

Son la fuente documentada de `src/data/legacy-redirects.ts` (ver su
cabecera): ese archivo generado el 27 jul 2026 vía `/autoplan` cita
`mp_mapeo_pasada1.csv` + auditoría manual (`redirects-auditoria-manual.xlsx`,
no incluido acá) + `MEDPHOTO_ESTADO_ACTUAL.md` §4 como fuentes.

También es la base detrás de la decisión de que `/etiqueta-producto/*` sean
404 intencionales (ver memoria de sesión, "/etiqueta-producto/\* intentional
404s are architectural design, not a verification gap", 9 sep 2026).

## Archivos

- `medphoto_legacy_raw.txt` / `medphoto_legacy_paths.txt` — crawl/listado
  crudo de rutas del sitio WordPress anterior.
- `mp_product_sitemap.xml` / `mp_category_sitemap.xml` — sitemaps XML
  originales de WordPress (productos y categorías), fuente para extraer URLs
  legacy.
- `mp_productos_legacy.txt` / `mp_categorias_legacy.txt` — listados
  depurados de rutas legacy de producto y categoría.
- `mp_mapeo_pasada1.csv` — primera pasada de mapeo ruta legacy → slug/SKU
  destino, con columna `candidatos` para las filas `UNRESOLVED`.

No se sirven en el sitio (no viven en `public/`) — son material de
referencia para auditar o reconstruir el redirect map si hace falta.
