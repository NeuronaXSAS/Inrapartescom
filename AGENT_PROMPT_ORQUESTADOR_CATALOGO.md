# Prompt Orquestador — Integración Catálogo Completo

Rol: Eres un orquestador en VS Code encargado de integrar y mantener el catálogo completo de Inrapartes en `catalogo.html`, sincronizado con los archivos fuente `catalog/*.txt` y las imágenes en `Recursos_finales/catalogo_m_agua/`.

Objetivo
- Reemplazar e integrar TODOS los elementos de `catalog/*.txt` (6 categorías) en el catálogo web.
- Incorporar para cada producto: IMAGEN, CÓDIGO, NOMBRE, MATERIAL, MEDIDAS, CATEGORÍA.
- Usar las imágenes `.png` de `Recursos_finales/catalogo_m_agua/<CATEGORIA>/` cuyo nombre coincide con el campo IMAGEN.
- Mantener y extender el sistema de cotización: cantidades por medida, sidebar de cotización, envío por EmailJS.
- Preservar diseño y branding actual; mejorar sin romper UX.

Alcance y entregables
1) Parser de datos: leer `catalog/*.txt` y generar `catalogo-data.js` con un arreglo JSON estructurado.
2) Conexión de datos: si `window.PRODUCTOS_GENERADOS` existe, usarlo en lugar de `productosCompletos`.
3) Búsqueda y filtros: ampliar búsqueda (CÓDIGO, NOMBRE, MATERIAL, MEDIDAS, CATEGORÍA), tolerante a letras/números/símbolos; filtros de categoría (6) y medida textual.
4) UI de catálogo: renderizar 6 filas horizontales (una por categoría) tipo carrusel; cada tarjeta con imagen, código, nombre, material, medidas y botón para agregar cantidades a cotización.
5) Integración landing: barra de búsqueda en landing pages que navega a `catalogo.html?search=...`.
6) Consistencia de categorías: asegurar las mismas 6 categorías en menús y filtros en todo el sitio.

Reglas
- No inventes datos: la fuente de verdad es `catalog/*.txt`.
- Si falta una imagen, muestra placeholder y loguea advertencia.
- Mantén español y estilos de marca.
- Cambios mínimos y precisos; no agregues frameworks.

Arquitectura propuesta
- `tools/build-catalog.js`: script Node que parsea los `.txt` (bloques separados por `---`) y emite `catalogo-data.js` con objetos de la forma:
  {
    id, codigo, nombre, material, categoria, medidas: string, medidas_array: string[], imagen: string (ruta relativa)
  }
- `catalogo-productos.js`: detectar `window.PRODUCTOS_GENERADOS` y usarlo; ampliar búsqueda y filtros; soportar vista por 6 carruseles.
- `catalogo.html`: incluir `catalogo-data.js` después de `catalogo-productos.js` (o antes si se requiere) y ajustar filtros/estructura si aplica.
- `index.html` y otras landing: añadir barra de búsqueda que redirige a `catalogo.html?search=...`.

Pasos concretos
1. Crear `tools/build-catalog.js` que:
   - Lea todos los `catalog/*.txt`.
   - Parseo por bloques con claves: IMAGEN, CÓDIGO, NOMBRE, MATERIAL, MEDIDAS, CATEGORIA.
   - Normalice categoría a una de las 6 esperadas.
   - Genere ruta de imagen: `Recursos_finales/catalogo_m_agua/<CATEGORIA>/<IMAGEN>`.
   - Construya `medidas_array` separando contenido por comas; conservar `medidas` como string original.
   - Escriba `catalogo-data.js` que defina `window.PRODUCTOS_GENERADOS = [...]`.
2. Modificar `catalogo-productos.js`:
   - Si `window.PRODUCTOS_GENERADOS` existe, mapearlo a la estructura usada y asignar a `productos`.
   - Ampliar búsqueda: normalización a minúsculas y eliminar tildes; incluir `codigo`, `material`, `medidas`, `categoria`, `nombre`.
   - Añadir modo de render por carrusel: agrupar por categoría (6 filas), con navegación horizontal.
3. Ajustar `catalogo.html`:
   - Incluir `catalogo-data.js`.
   - Ajustar filtros a las 6 categorías oficiales.
   - Añadir contenedores por categoría si el render lo requiere.
4. Integrar barra de búsqueda en landing pages (`index.html`, etc.) que empuje query a `catalogo.html`.
5. Verificar sistema de cotización end-to-end: selección de medidas, cantidades, contador, sidebar, EmailJS.

Criterios de aceptación
- El catálogo muestra 6 filas horizontales por categoría, navegables.
- Cada producto muestra imagen (o placeholder), código, nombre, material, medidas.
- La búsqueda encuentra por CÓDIGO, NOMBRE, MATERIAL, MEDIDAS, CATEGORÍA con letras/números/símbolos.
- Agregar cantidades funciona por producto/medida y se refleja en el carrito; el envío por EmailJS mantiene formato actual.
- No hay regresiones en estilo ni usabilidad.

Validación local (PowerShell)
- Generar datos:
  node tools/build-catalog.js
- Levantar proyecto:
  npm start
- Abrir:
  http://localhost:8080/catalogo.html

Notas
- Si el volumen de productos es grande, aplica lazy-loading de imágenes (atributo `loading="lazy"`).
- Mantén logs discretos en consola para depuración (errores de imagen/datos).