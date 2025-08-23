# 🚀 Guía de Despliegue - Inrapartes en cPanel

## 📋 Pre-requisitos
- Acceso a cPanel del hosting
- Dominio configurado
- Espacio suficiente para archivos (aprox. 2MB)

## 📁 Estructura de Archivos para Subir
```
public_html/
├── index.html              # Página principal
├── nosotros.html           # Página sobre nosotros
├── styles.css              # Estilos principales
├── script.js               # JavaScript funcional
├── .htaccess               # Configuración del servidor
├── brand/
│   ├── LOGO.png           # Logo oficial de Inrapartes
│   └── SELLO DE CALIDAD.png # Sello de calidad
└── otros archivos...
```

## 🎨 Esquema de Colores Implementado

### Paleta Principal (Gris/Amarillo)
- **Amarillo Principal:** `#FFB800` - Botones y elementos destacados
- **Amarillo Oscuro:** `#E5A500` - Hover states y sombras
- **Amarillo Suave:** `#FFF3D4` - Fondos delicados

### Escala de Grises (Protagonista)
- **Fondo Primario:** `#F8FAFC` - Reemplaza el blanco
- **Fondo Secundario:** `#F1F5F9` - Cards y secciones
- **Fondo Terciario:** `#E2E8F0` - Contacto y elementos
- **Bordes:** `#E2E8F0` - Bordes suaves
- **Texto Principal:** `#334155` - Legibilidad optimizada
- **Texto Secundario:** `#64748B` - Información complementaria

## 🖼️ Integración de Branding

### Logo Principal
- **Ubicación:** Header principal
- **Ruta:** `brand/LOGO.png`
- **Tamaño:** 60x60px con efecto hover
- **Implementación:** CSS background-image

### Sello de Calidad
- **Categorías:** Esquina superior derecha (opacidad 0.1)
- **Productos:** Esquina inferior izquierda (opacidad 0.08)
- **Footer:** Esquina superior derecha (opacidad 0.05)
- **About Hero:** Esquina superior derecha (opacidad 0.2)

## 📤 Pasos de Despliegue en cPanel

### Paso 1: Preparar Archivos
1. Comprimir todos los archivos en un ZIP
2. Verificar que la carpeta `brand/` esté incluida
3. Asegurar que `.htaccess` esté en la raíz

### Paso 2: Subir a cPanel
1. Acceder a **File Manager** en cPanel
2. Navegar a `public_html/`
3. Subir el archivo ZIP
4. Extraer en `public_html/`
5. Verificar permisos de archivos (644 para archivos, 755 para carpetas)

### Paso 3: Configuración de Dominio
1. Si es dominio principal: archivos van directamente en `public_html/`
2. Si es subdominio: crear carpeta correspondiente

### Paso 4: Verificación
1. Abrir el sitio en el navegador
2. Verificar que el logo se muestre correctamente
3. Comprobar que los colores grises/amarillos se vean bien
4. Probar responsividad en móvil

## 🔧 Configuraciones Específicas para cPanel

### .htaccess Incluido
- Cache para imágenes (1 año)
- Cache para CSS/JS (1 día)
- Compresión GZIP activada
- Redirecciones www configuradas
- Tipos MIME para imágenes
- Configuración de seguridad básica

### Rutas de Imágenes
Las rutas están configuradas como relativas:
```css
background-image: url('brand/LOGO.png');
background-image: url('brand/SELLO DE CALIDAD.png');
```

## 🎯 Puntos Clave del Diseño

### ✅ Cambios Implementados
- **Fondos blancos eliminados** → Reemplazados por grises suaves
- **Negro reducido** → Solo para textos principales
- **Grises protagonistas** → 9 tonos diferentes para armonía
- **Amarillo estratégico** → Elementos de acción y destacados
- **Logo real integrado** → En header y elementos de fondo
- **Sello de calidad** → Marca de agua en secciones clave

### 🎨 Armonía Visual
- Contraste optimizado entre grises y amarillos
- Transiciones suaves en todos los elementos
- Sombras grises sutiles en lugar de negras
- Hover effects con amarillo para interactividad

## 📱 Responsividad
- Diseño completamente responsivo
- Optimizado para móviles, tablets y desktop
- Grid systems adaptativos
- Imágenes de fondo que se ajustan

## 🔍 SEO y Performance
- HTML semántico
- Meta tags optimizados
- Imágenes con alt text
- Estructura de headings correcta
- CSS y JS minificados
- Cache configurado en .htaccess

## 📞 Soporte Post-Despliegue
- Verificar funcionamiento en diferentes navegadores
- Comprobar velocidad de carga
- Revisar que todos los enlaces funcionen
- Probar formularios de contacto

---

**🎯 Resultado:** Un sitio web con armonía visual gris/amarillo, branding corporativo integrado y optimizado para cPanel. 