# Inrapartes - Portal Web de Cotizaciones

Portal web profesional para **Inrapartes**, empresa colombiana especializada en fabricación y comercialización de racores, acoples y piezas personalizadas para sistemas hidráulicos y neumáticos.

## 🚀 Características Principales

### ✨ Diseño y Experiencia de Usuario
- **Diseño Moderno**: Inspirado en el sitio de referencia con colores corporativos negro, amarillo y grises
- **Tipografía Century Gothic**: Fuente moderna y profesional según especificaciones del cliente
- **Responsive Design**: Optimizado para dispositivos móviles, tablets y desktop
- **Animaciones Suaves**: Transiciones y efectos visuales que mejoran la experiencia

### 🎯 Banner Hero Deslizante
- **Slide 1**: Presentación de la empresa con 35+ años de experiencia
- **Slide 2**: Enfoque específico en "Piezas a tu Medida"
- **Auto-rotación**: Cambio automático cada 5 segundos
- **Navegación Manual**: Botones de navegación e indicadores clickeables
- **Pausa Inteligente**: Se pausa al hacer hover para mejor UX

### 🛠️ Líneas de Producto (6 Categorías)
1. **Racores Nacionales e Importados**
2. **Válvulas y Cheques**
3. **Acoples Plásticos**
4. **Acoples Hidráulicos**
5. **Mangueras Ensambladas**
6. **Tubería Flexible de Cobre**

### 📋 Sistema de Cotización Avanzado
- **Carrito de Cotización**: Reemplaza el carrito de compras tradicional
- **Almacenamiento Local**: Persistencia de datos en localStorage
- **Modal de Cotización**: Formulario profesional para solicitudes
- **Validación de Campos**: Verificación en tiempo real
- **Notificaciones**: Confirmaciones visuales de acciones
- **Simulación de Envío**: Sistema preparado para integración con backend

### 🏭 Sección "Piezas a tu Medida"
- **Landing Page Dedicada**: `piezas-medida.html` completamente especializada
- **Proceso de 5 Pasos**: Desde consulta inicial hasta entrega
- **Capacidades Técnicas**: 6 áreas de especialización detalladas
- **Galería de Proyectos**: Ejemplos visuales de trabajos realizados
- **Formulario Especializado**: Cotización específica para fabricación personalizada

### 📱 Funcionalidades de Contacto
- **WhatsApp Flotante**: Botón siempre visible con animación de pulso
- **Información de Contacto Real**: Datos actualizados de Inrapartes Bogotá
- **Horarios de Atención**: Lun-Vie: 6 AM–12:30 PM, 1–4 PM
- **Redes Sociales**: Enlaces a plataformas digitales

## 📁 Estructura del Proyecto

```
inrapartescom/
├── index.html                 # Página principal
├── piezas-medida.html        # Landing page para fabricación personalizada
├── styles.css               # Estilos principales con Century Gothic
├── script.js                # JavaScript con todas las funcionalidades
├── README.md                # Documentación completa
└── LISTA PRECIOS TODOS LOS PRODUCTOS OCT 17 2024.pdf
```

## 🎨 Productos Destacados (Fácil Actualización)

El sitio incluye 3 productos destacados que se pueden actualizar fácilmente:

### Productos Actuales:
1. **Racor Hidráulico SAE R2** - "Más Vendido" - Desde $45.000
2. **Válvula de Seguridad Industrial** - "Recomendado" - Desde $125.000  
3. **Acople Freno de Aire** - "Nuevo" - Desde $87.000

### Para Actualizar Productos:
```javascript
// Usar la utilidad global en la consola del navegador
window.InrapartesUtils.updateFeaturedProducts([
    {
        id: '1',
        name: 'Nuevo Producto 1',
        description: 'Descripción del producto...',
        price: 'Desde $XX.XXX',
        image: 'URL_de_imagen',
        badge: 'Nuevo',
        badgeType: 'new' // 'new', 'recommended', o ''
    },
    // ... otros 2 productos
]);
```

## 🚀 Funcionalidades JavaScript

### 1. Hero Slider
- Auto-rotación configurable
- Navegación manual
- Indicadores interactivos
- Pausa en hover

### 2. Sistema de Cotización
- Agregar/remover productos
- Persistencia local
- Modal profesional
- Validaciones

### 3. Animaciones
- Intersection Observer para elementos
- Smooth scrolling
- Transiciones CSS3
- Efectos hover

### 4. Navegación
- Dropdown dinámico
- Enlaces internos
- Búsqueda (preparada para implementación)

## 📋 Información de la Empresa

### Datos de Contacto Reales:
- **Dirección**: Cra 27 #22-60, Bogotá
- **Teléfono**: (601) 5342186
- **WhatsApp**: +57 315 602 2208
- **Horarios**: Lun-Vie: 6 AM–12:30 PM, 1–4 PM

### Especialización:
- 35+ años de experiencia
- Fabricación en bronce, latón, acero 12L12 y acero inoxidable
- Mecanizados CNC de precisión
- Laminado de roscas especializado
- Exportación internacional
- Estándares: SAE, DIN, BSP, JIC, ORFS

## 🔧 Configuración y Deployment

### Requisitos:
- Servidor web (Apache, Nginx, o servidor estático)
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

### Instalación:
1. Subir archivos al servidor web
2. Configurar dominio/subdirectorio
3. Verificar funcionamiento de formularios
4. Integrar sistema de email (opcional)

### Para Integración de Email:
El proyecto está preparado para integración con:
- **EmailJS** (recomendado para frontend)
- **Formspree** (alternativa simple)
- **Backend personalizado** (Node.js, PHP, etc.)

## 📈 Próximos Desarrollos

### Catálogo de Productos:
- Integración de la lista de productos del PDF
- Sistema de filtros y búsqueda
- Categorización avanzada
- Imágenes de productos

### Funcionalidades Avanzadas:
- Sistema de usuarios
- Historial de cotizaciones
- Calculadora de especificaciones
- Chat en línea
- Blog/Noticias

## 🎯 Optimizaciones SEO

- Meta tags optimizados
- Estructura semántica HTML5
- URLs amigables preparadas
- Schema markup preparado
- Sitemap.xml (pendiente)

## 📱 Responsive Design

### Breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### Optimizaciones Móviles:
- Menú hamburguesa (implementado)
- Touch-friendly buttons
- Optimización de imágenes
- Carga rápida

## 🔒 Seguridad y Performance

- Validación de formularios client-side
- Sanitización preparada para backend
- Optimización de imágenes
- CSS/JS minificación preparada
- Lazy loading preparado

## 🎨 Personalización de Colores

### Paleta Principal:
- **Negro Principal**: #1A1A1A
- **Amarillo Corporativo**: #FFD700
- **Amarillo Acento**: #FFA500
- **Gris Claro**: #F8F8F8
- **Gris Medio**: #E8E8E8
- **Blanco**: #FFFFFF

## 📞 Soporte y Mantenimiento

### Para Actualizaciones de Contenido:
1. **Productos**: Usar utilidad JavaScript documentada
2. **Información**: Editar archivos HTML directamente
3. **Estilos**: Modificar variables CSS en styles.css

### Para Nuevas Funcionalidades:
- El código está modularizado para fácil extensión
- Documentación inline en JavaScript
- Estructura CSS escalable

---

**Desarrollado para Inrapartes** - Portal especializado en cotizaciones de sistemas hidráulicos y neumáticos.

*Más de 35 años optimizando los sistemas de conducción de gases y fluidos.* 