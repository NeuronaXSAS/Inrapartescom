# 📋 GUÍA PASO A PASO - ORGANIZACIÓN DEL CATÁLOGO INRAPARTES

## 🎯 **OBJETIVO**
Organizar todas las fotos de productos en un catálogo digital bien estructurado para el sitio web.

---

## 📁 **PASO 1: ORGANIZAR LAS FOTOS**

### 1.1 Crear carpetas por categoría:
```
📁 fotos_racores/
├── 📁 racores_bronce/
├── 📁 valvulas/
├── 📁 acoples/
├── 📁 mangueras/
├── 📁 accesorios/
└── 📁 insertos/
```

### 1.2 Mover cada foto a su carpeta correspondiente:

**RACORES DE BRONCE** (van en `racores_bronce/`):
- B1.JPG, B2.JPG, B3.JPG, B5.JPG, B11.JPG hasta B170.JPG
- TEE 741.JPG, UNION BI.JPG
- RAC TEMPERATURA.JPG, RACOR TEMPERATURA A.JPG

**VÁLVULAS** (van en `valvulas/`):
- GRIFO 554.JPG, GRIFO 588.JPG, GRIFO 592.JPG, GRIFO RADIADOR.JPG
- VALV DESPEGUE.JPG, VALV SEGURIDAD CTA.JPG, VALV SEGURIDAD LGA.JPG, VALV SEGURIDAD MINI.JPG
- VALVULADE RETENCION KN23000.JPG, SANGRADOR.JPG

**ACOPLES** (van en `acoples/`):
- ACOPLE RAPIDO.JPG
- CONECTOR ACOPLE HEMBRA.JPG, CONECTOR ACOPLE LISO.JPG, CONECTOR ACOPLE MACHO.JPG

**MANGUERAS** (van en `mangueras/`):
- MANGUERA SAE J1402.jpg

**ACCESORIOS** (van en `accesorios/`):
- FERRUL.JPG
- INFLALLANTAS HEMBRA.JPG, inflallantas mach.JPG
- RACOR CHASIS CHEVROLET.JPG, RACOR CHASIS CTE.JPG, RACOR CHASIS TRAILER.JPG

**INSERTOS** (van en `insertos/`):
- INSERTO BRONCE.JPG, INSERTO FOSFORO.JPG, INSERTO LAMINA.JPG

---

## 📝 **PASO 2: COMPLETAR LA INFORMACIÓN EN EL ARCHIVO CSV**

### 2.1 Abrir el archivo `catalogo_productos.csv`
Este archivo ya tiene la estructura básica. Tu trabajo es:

### 2.2 Para cada producto, completa estos campos:

**🔧 DATOS TÉCNICOS:**
- `medida_principal`: Ejemplo "1/4", "3/8", "1/2"
- `medida_secundaria`: Si tiene segunda medida
- `precio`: Sin IVA, solo números
- `descripcion_tecnica`: Descripción clara del producto

**📝 EJEMPLO DE CÓMO LLENAR:**
```
Producto: B1 (RACOR BOSTER)
- medida_principal: "3/16"
- medida_secundaria: "1/2" 
- precio: 3332
- descripcion_tecnica: "Racor boster de bronce para conexión de mangueras hidráulicas"
```

### 2.3 Buscar información en el archivo original:
- Abre `LISTA PRECIOS TODOS LOS PRODUCTOS OCT 17 2024.txt`
- Busca cada código (B1, B2, B3, etc.)
- Copia: medidas, precios y descripciones
- Pégalos en el CSV en las columnas correspondientes

---

## 🖼️ **PASO 3: OPTIMIZAR LAS IMÁGENES**

### 3.1 Renombrar archivos para web:
**ANTES:** `B68 MONO.JPG`
**DESPUÉS:** `b68_mono.jpg` (minúsculas, sin espacios)

### 3.2 Tamaño recomendado:
- **Ancho:** 800px máximo
- **Calidad:** 80-90%
- **Formato:** JPG

---

## 📋 **PASO 4: VERIFICACIÓN**

### 4.1 Lista de verificación:
- [ ] Todas las fotos están organizadas en carpetas
- [ ] Todos los precios están completos
- [ ] Todas las medidas están completas
- [ ] Los nombres de archivos están en minúsculas
- [ ] No hay espacios en los nombres de archivos

### 4.2 Productos prioritarios (completar primero):
1. **Serie B (B1-B170)** - Son los más importantes
2. **Grifos y válvulas** - Productos populares
3. **Acoples rápidos** - Muy vendidos

---

## 🚀 **PASO 5: IMPLEMENTACIÓN EN EL SITIO WEB**

Una vez tengas todo organizado, yo me encargo de:
- Crear la galería de productos
- Añadir filtros por categoría
- Implementar búsqueda
- Optimizar para móviles

---

## 💡 **CONSEJOS IMPORTANTES:**

### Para ti (13 años) 🎓:
1. **Trabaja por partes:** No intentes hacer todo de una vez
2. **Empieza por los productos B1-B10:** Son los más fáciles
3. **Si no entiendes algo:** Pregúntame, para eso estoy aquí
4. **Guarda tu trabajo:** Cada 30 minutos guarda el archivo CSV

### Información técnica básica:
- **NPT:** Rosca americana (National Pipe Thread)
- **BSP:** Rosca británica (British Standard Pipe)
- **SAE:** Norma americana (Society of Automotive Engineers)
- **Medidas:** Se expresan en pulgadas (1/4", 3/8", 1/2", etc.)

---

## 📞 **¿NECESITAS AYUDA?**

Si tienes dudas sobre:
- ✅ **Categorización de productos**
- ✅ **Organización de archivos**
- ✅ **Precios o medidas**
- ✅ **Cualquier paso de esta guía**

¡Solo pregúntame! Estoy aquí para ayudarte paso a paso.

---

**¡Empezemos! 🚀** 