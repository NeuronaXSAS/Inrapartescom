# Reglas de Responsividad Mobile para Inrapartescom

Este documento define las reglas y lineamientos que deben respetar el estado actual del proyecto y asegurar una responsividad efectiva en dispositivos móviles, sin afectar la experiencia en desktop/web. Todas las recomendaciones están basadas en el análisis detallado de la codebase y los problemas observados en la versión mobile.

---

## 1. Estructura General y Breakpoints
- **Breakpoint principal:** Usar 768px como referencia para mobile (tablets y teléfonos). Se recomienda también considerar 480px para teléfonos pequeños.
- **Media Queries:** Todas las reglas de responsividad deben implementarse usando media queries en `styles.css`.
- **Mobile First:** Priorizar el diseño mobile y escalar hacia desktop.

---

## 2. Menú de Navegación
- **Botón Hamburguesa (`.mobile-menu-btn`):**
  - Debe ser visible solo en pantallas ≤768px.
  - Al hacer clic, debe abrir un menú lateral (off-canvas) con las mismas opciones del menú principal (`.main-nav`).
  - El menú lateral debe cubrir la pantalla y permitir scroll si el contenido es extenso.
  - El menú debe cerrarse al tocar fuera del área o al presionar un botón de cierre.
- **Menú Principal (`.main-nav`):**
  - Ocultar en mobile y mostrar solo el menú lateral.
  - Los dropdowns deben convertirse en listas expandibles/touch-friendly.

---

## 3. Proporciones y Elementos Visuales
- **Logo (`.logo`, `.logo-circle`):**
  - El tamaño del logo debe ser proporcional al ancho de la pantalla.
  - Usar `max-width: 120px` en mobile y ajustar el alto automáticamente.
  - El header debe reducir su altura en mobile (ej: `height: 56px`).
- **Sello de Calidad:**
  - Debe escalar proporcionalmente en mobile (ej: `max-width: 80px`).
  - Ubicación: Preferiblemente debajo del logo o en una posición visible pero no dominante.

---

## 4. Banner y Hero Section
- **Hero Stats (`.hero-stats`):**
  - Los elementos deben apilarse verticalmente en mobile.
  - El texto debe ser legible, con `font-size` mínimo de 16px.
  - Evitar que la información quede oculta por otros elementos.
- **Banner:**
  - Imágenes y textos deben escalar y reubicarse para evitar solapamientos.
  - Usar `padding` y `margin` adecuados para mantener la jerarquía visual.

---

## 5. Sección de Categorías y Carrusel
- **Categories Carousel (`.categories-carousel`, `.category-card`):**
  - Las tarjetas deben ser táctiles: toda la tarjeta debe ser clickable, no solo el botón.
  - En mobile, mostrar 1 tarjeta por vista y permitir swipe horizontal.
  - Los botones de navegación deben ser grandes y fáciles de tocar.
  - El texto debe ser legible y no debe quedar oculto.
  - Usar `overflow-x: auto` para permitir scroll horizontal.

---

## 6. Grilla de Productos
- **Product Grid:**
  - En mobile, mostrar los productos en una sola columna.
  - El texto de información general debe ser visible y legible.
  - Imágenes deben escalar proporcionalmente y no desbordar el contenedor.

---

## 7. Accesibilidad y Usabilidad
- **Tamaño de botones y áreas táctiles:**
  - Mínimo 44x44px para elementos interactivos.
- **Evitar hover-only:**
  - Todas las interacciones deben funcionar con touch.
- **Scroll y overflow:**
  - Evitar que elementos importantes queden fuera de la vista o requieran scroll horizontal innecesario.

---

## 8. Buenas Prácticas
- **No ocultar información relevante en mobile.**
- **Evitar el uso de `!important` salvo casos críticos.**
- **Testear en múltiples dispositivos y resoluciones.**
- **Mantener la coherencia visual entre mobile y desktop, pero priorizar la usabilidad en mobile.**

---

## 9. Ejemplo de Media Query Base
```css
@media (max-width: 768px) {
  .main-nav { display: none; }
  .mobile-menu-btn { display: block; }
  .logo { max-width: 120px; }
  header { height: 56px; }
  .category-card { width: 90vw; }
  .hero-stats { flex-direction: column; }
  /* ...más reglas específicas... */
}
```

---

## 10. Implementación
- Todas las reglas deben implementarse en `styles.css` y, si es necesario, en `script.js` para la funcionalidad del menú lateral y el carrusel táctil.
- Documentar cualquier excepción o ajuste específico en este archivo.

---

**Este documento debe ser actualizado si se realizan cambios estructurales o de diseño que afecten la responsividad.**
